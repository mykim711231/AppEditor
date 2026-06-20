import { linter } from '@codemirror/lint'
import { syntaxTree } from '@codemirror/language'
import { useStore } from '../store'

// 현재 활성 파일명 (언어 판별용)
function activeFileName() {
  const s = useStore.getState()
  const f = s.nodes.find((n) => n.id === s.activeTab)
  return (f?.name || '').toLowerCase()
}

// 공통: 로드된 Lezer 파서의 오류 노드 → 진단
function lezerDiagnostics(view) {
  const diagnostics = []
  const len = view.state.doc.length
  let count = 0
  syntaxTree(view.state)
    .cursor()
    .iterate((node) => {
      if (count >= 100) return
      if (node.type.isError && node.from < len) {
        const to = node.to <= node.from ? Math.min(node.from + 1, len) : node.to
        diagnostics.push({ from: node.from, to, severity: 'error', message: '문법 오류 — 구문을 확인하세요' })
        count++
      }
    })
  return diagnostics
}

// ---- JSON: 정밀 메시지 (@codemirror/lang-json) ----
let _jsonLinter
async function jsonDiagnostics(view) {
  if (!_jsonLinter) {
    const mod = await import('@codemirror/lang-json')
    _jsonLinter = mod.jsonParseLinter()
  }
  return _jsonLinter(view)
}

// ---- JS/JSX: ESLint (lazy) ----
let _eslint
async function getEslint() {
  if (!_eslint) {
    const mod = await import('eslint-linter-browserify')
    _eslint = new mod.Linter()
  }
  return _eslint
}

// 환경(globals) 없이도 유효한, 노이즈 적은 규칙 위주
const ESLINT_CONFIG = [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off', // 전역 환경 설정 없이는 노이즈가 커서 비활성
      eqeqeq: 'warn',
      'no-unreachable': 'warn',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-redeclare': 'warn',
      'no-cond-assign': 'warn',
      'no-constant-condition': 'warn',
      'no-debugger': 'warn',
      'no-empty': 'warn',
      'no-extra-semi': 'warn',
      'valid-typeof': 'error',
      'use-isnan': 'error',
      'no-self-compare': 'warn',
    },
  },
]

async function eslintDiagnostics(view) {
  const eslint = await getEslint()
  const doc = view.state.doc
  let messages = []
  try {
    messages = eslint.verify(doc.toString(), ESLINT_CONFIG)
  } catch {
    return lezerDiagnostics(view)
  }
  return messages.slice(0, 100).map((m) => {
    const lineNo = Math.min(Math.max(m.line || 1, 1), doc.lines)
    const line = doc.line(lineNo)
    const from = Math.min(line.from + Math.max((m.column || 1) - 1, 0), doc.length)
    let to = from + 1
    if (m.endLine && m.endColumn) {
      const el = doc.line(Math.min(m.endLine, doc.lines))
      to = Math.min(el.from + (m.endColumn - 1), doc.length)
    }
    if (to <= from) to = Math.min(from + 1, doc.length)
    return {
      from,
      to,
      severity: m.fatal || m.severity === 2 ? 'error' : 'warning',
      message: m.message + (m.ruleId ? ` (${m.ruleId})` : ''),
    }
  })
}

// ---- Python: 들여쓰기(탭/공백 혼용) + 구문 ----
function pythonDiagnostics(view) {
  const diags = lezerDiagnostics(view)
  const doc = view.state.doc
  for (let i = 1; i <= doc.lines && diags.length < 200; i++) {
    const line = doc.line(i)
    const indent = /^[ \t]*/.exec(line.text)[0]
    if (indent.includes(' ') && indent.includes('\t')) {
      diags.push({
        from: line.from,
        to: line.from + indent.length,
        severity: 'warning',
        message: '들여쓰기에 탭과 공백이 혼용되었습니다 (Python)',
      })
    }
  }
  return diags
}

// 언어별 디스패처 (비동기 lint 소스)
export const codeLinter = linter(
  async (view) => {
    const name = activeFileName()
    if (/\.json$/.test(name)) return jsonDiagnostics(view)
    if (/\.(js|jsx|mjs|cjs)$/.test(name)) return eslintDiagnostics(view)
    if (/\.py$/.test(name)) return pythonDiagnostics(view)
    return lezerDiagnostics(view)
  },
  { delay: 500 }
)
