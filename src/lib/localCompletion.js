// 로컬 파싱 기반 자동완성
// 현재 파일에서 심벌(변수·함수·클래스 등)을 추출하고
// 언어별 키워드 목록과 합쳐 CodeMirror CompletionSource 를 반환한다.

import { autocompletion } from '@codemirror/autocomplete'

// ── 언어별 키워드 ──────────────────────────────────────────────────────────
const KEYWORDS = {
  javascript: [
    'const','let','var','function','class','return','if','else','for','while',
    'do','switch','case','break','continue','import','export','default','from',
    'async','await','try','catch','finally','throw','new','delete','typeof',
    'instanceof','in','of','void','yield','this','super','extends','static',
    'null','undefined','true','false','NaN','Infinity',
    'console','Promise','Array','Object','String','Number','Boolean','Map','Set',
    'JSON','Math','Date','Error','setTimeout','setInterval','fetch',
  ],
  typescript: [
    'const','let','var','function','class','return','if','else','for','while',
    'do','switch','case','break','continue','import','export','default','from',
    'async','await','try','catch','finally','throw','new','typeof','instanceof',
    'in','of','void','yield','this','super','extends','static','implements',
    'interface','type','enum','namespace','abstract','readonly','declare',
    'as','keyof','infer','satisfies','override','accessor',
    'null','undefined','true','false',
    'string','number','boolean','any','void','never','unknown','object','symbol',
    'Record','Partial','Required','Pick','Omit','Readonly','Array','Promise',
  ],
  python: [
    'def','class','return','if','elif','else','for','while','import','from',
    'as','try','except','finally','raise','with','lambda','yield','pass',
    'break','continue','in','not','and','or','is','del','global','nonlocal',
    'async','await','assert','match','case',
    'None','True','False','self','cls',
    'print','len','range','list','dict','set','tuple','str','int','float',
    'bool','type','isinstance','issubclass','hasattr','getattr','setattr',
    'super','property','staticmethod','classmethod','enumerate','zip',
    'map','filter','sorted','reversed','open','input','repr','format',
  ],
  java: [
    'public','private','protected','static','final','abstract','synchronized',
    'volatile','transient','native','strictfp',
    'class','interface','extends','implements','enum','record',
    'return','if','else','for','while','do','switch','case','default',
    'break','continue','try','catch','finally','throw','throws','new',
    'this','super','import','package','instanceof','null','true','false',
    'void','int','long','double','float','boolean','char','byte','short',
    'String','List','Map','Set','ArrayList','HashMap','HashSet',
    'Optional','Stream','Override','Deprecated','FunctionalInterface',
  ],
  go: [
    'func','var','const','type','struct','interface','map','chan',
    'go','defer','select','return','if','else','for','range',
    'switch','case','default','break','continue','fallthrough','goto',
    'import','package','nil','true','false','iota',
    'make','new','len','cap','append','copy','delete','close',
    'panic','recover','print','println',
    'string','int','int8','int16','int32','int64',
    'uint','uint8','uint16','uint32','uint64','uintptr',
    'float32','float64','complex64','complex128',
    'bool','byte','rune','error','any',
  ],
  csharp: [
    'public','private','protected','internal','static','readonly','const',
    'virtual','override','abstract','sealed','partial','extern','unsafe',
    'class','struct','interface','enum','delegate','record','namespace',
    'using','return','if','else','for','foreach','while','do',
    'switch','case','default','break','continue','try','catch','finally',
    'throw','new','this','base','null','true','false','is','as','in',
    'async','await','yield','ref','out','params','typeof','sizeof','nameof',
    'string','int','long','double','float','decimal','bool','char',
    'byte','object','dynamic','var','void','Task','IEnumerable','List',
    'Dictionary','HashSet','Action','Func','Linq',
  ],
  sql: [
    'SELECT','FROM','WHERE','JOIN','INNER','LEFT','RIGHT','FULL','OUTER','CROSS',
    'ON','USING','GROUP','BY','ORDER','HAVING','LIMIT','OFFSET','UNION','ALL',
    'INSERT','INTO','VALUES','UPDATE','SET','DELETE','MERGE','TRUNCATE',
    'CREATE','TABLE','VIEW','INDEX','ALTER','DROP','ADD','COLUMN',
    'AS','DISTINCT','CASE','WHEN','THEN','ELSE','END','EXISTS','NOT',
    'IN','LIKE','BETWEEN','IS','NULL','AND','OR','ASC','DESC',
    'COUNT','SUM','AVG','MAX','MIN','COALESCE','NULLIF','CAST',
    'WITH','RECURSIVE','OVER','PARTITION','RANK','ROW_NUMBER',
    'BEGIN','COMMIT','ROLLBACK','TRANSACTION','CONSTRAINT','PRIMARY','FOREIGN',
    'KEY','REFERENCES','UNIQUE','CHECK','DEFAULT','AUTO_INCREMENT',
  ],
  powershell: [
    'function','param','begin','process','end','return','if','elseif','else',
    'foreach','for','while','do','switch','try','catch','finally','throw',
    'break','continue','exit','class','enum','using','namespace',
    'true','false','null','this',
    'Write-Host','Write-Output','Write-Error','Write-Warning','Write-Verbose',
    'Get-Item','Set-Item','Remove-Item','New-Item','Copy-Item','Move-Item',
    'Get-Content','Set-Content','Add-Content','Get-ChildItem',
    'Invoke-WebRequest','Invoke-Command','Start-Process','Stop-Process',
    'Get-Command','Get-Help','Get-Member','Select-Object','Where-Object',
    'ForEach-Object','Sort-Object','Group-Object','Format-Table','Format-List',
    '$_','$PSItem','$true','$false','$null','$env','$args','$input',
    '$ErrorActionPreference','$VerbosePreference',
  ],
  bash: [
    'if','then','elif','else','fi','for','in','do','done','while','until',
    'case','esac','function','return','exit','break','continue','local',
    'echo','printf','read','source','export','unset','shift','eval',
    'true','false','null',
    'ls','cd','pwd','mkdir','rm','mv','cp','cat','grep','sed','awk',
    'find','chmod','chown','ln','tar','zip','unzip','curl','wget',
    'git','npm','pip','python3','node','bash','sh','sudo','apt','yum',
  ],
}

// ── 심벌 추출 패턴 ─────────────────────────────────────────────────────────
const PATTERNS = [
  // const/let/var x, const { a, b } =
  { re: /\b(?:const|let|var)\s+\{([^}]+)\}/g, multi: true, type: 'variable' },
  { re: /\b(?:const|let|var)\s+(\w+)/g, type: 'variable' },
  // function / async function
  { re: /\bfunction\s*\*?\s*(\w+)/g, type: 'function' },
  // arrow/assigned: name = () =>  or  name = async () =>
  { re: /\b(\w+)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/g, type: 'function' },
  // class
  { re: /\bclass\s+(\w+)/g, type: 'class' },
  // Python def
  { re: /\bdef\s+(\w+)/g, type: 'function' },
  // Go func (including method receiver)
  { re: /\bfunc\s+(?:\(\w+\s+\*?\w+\)\s+)?(\w+)/g, type: 'function' },
  // type / interface / struct / enum
  { re: /\b(?:type|interface|struct|enum|record)\s+(\w+)/g, type: 'type' },
  // import { a, b as c } 의 로컬 이름
  { re: /import\s+\{([^}]+)\}/g, multi: true, type: 'variable' },
  // import defaultName from
  { re: /import\s+(\w+)\s+from/g, type: 'variable' },
  // PowerShell $variable
  { re: /\$(\w+)/g, type: 'variable' },
]

function extractSymbols(code) {
  const symbols = new Map()

  for (const { re, type, multi } of PATTERNS) {
    re.lastIndex = 0
    let m
    while ((m = re.exec(code)) !== null) {
      if (multi) {
        m[1].split(',').forEach((part) => {
          // "a as b" → take b; "  x " → x
          const name = part.trim().split(/\s+as\s+/).pop().trim()
          if (isValidSymbol(name) && !symbols.has(name)) symbols.set(name, 'variable')
        })
      } else {
        const name = m[1]
        if (isValidSymbol(name) && !symbols.has(name)) symbols.set(name, type)
      }
    }
  }

  return symbols
}

function isValidSymbol(name) {
  return name && name.length >= 2 && /^\w+$/.test(name) && !/^\d/.test(name)
}

// ── 파일명 → 키워드 목록 매핑 ──────────────────────────────────────────────
function keywordsFor(filename) {
  const ext = (filename || '').toLowerCase().split('.').pop()
  const map = {
    js: 'javascript', mjs: 'javascript', cjs: 'javascript',
    ts: 'typescript', tsx: 'typescript', mts: 'typescript',
    jsx: 'javascript',
    py: 'python',
    java: 'java',
    go: 'go',
    cs: 'csharp',
    sql: 'sql', pls: 'sql', plsql: 'sql',
    ps1: 'powershell', psm1: 'powershell', psd1: 'powershell',
    sh: 'bash', bash: 'bash', zsh: 'bash',
  }
  return KEYWORDS[map[ext]] ?? []
}

// ── CompletionSource ────────────────────────────────────────────────────────
function makeSource(filename) {
  const keywords = keywordsFor(filename)

  return (context) => {
    const word = context.matchBefore(/\$?\w+/)
    if (!word || (word.from === word.to && !context.explicit)) return null
    const prefix = word.text
    if (prefix.replace('$', '').length < 2) return null

    const code = context.state.doc.toString()
    const symbols = extractSymbols(code)
    const options = []
    const seen = new Set([prefix]) // 현재 입력 단어 자체는 제외

    // 1) 파일 내 사용자 정의 심벌 (우선순위 높음)
    for (const [label, type] of symbols) {
      if (label.startsWith(prefix) && !seen.has(label)) {
        seen.add(label)
        options.push({ label, type, boost: 2 })
      }
    }

    // 2) 언어 키워드
    for (const kw of keywords) {
      if (kw.toLowerCase().startsWith(prefix.toLowerCase()) && !seen.has(kw)) {
        seen.add(kw)
        options.push({ label: kw, type: 'keyword' })
      }
    }

    return options.length ? { from: word.from, options } : null
  }
}

// ── 외부 API ────────────────────────────────────────────────────────────────
export function makeLocalCompletion(filename) {
  return autocompletion({
    override: [makeSource(filename)],
    activateOnTyping: true,
    maxRenderedOptions: 60,
  })
}
