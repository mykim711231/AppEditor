import { languages } from '@codemirror/language-data'

// 파일 확장자 → CodeMirror 언어 자동 감지
// @codemirror/language-data 의 LanguageDescription 배열을 사용해
// 확장자/파일명으로 매칭한 뒤 비동기 로딩한다.
const _cache = new Map()

export function detectLanguageDesc(filename = '') {
  const name = filename.toLowerCase()
  const ext = name.includes('.') ? name.slice(name.lastIndexOf('.') + 1) : ''

  // 파일명 전체 매칭 우선 (예: Dockerfile)
  for (const lang of languages) {
    if (lang.filename && lang.filename.test(filename)) return lang
  }
  if (!ext) return null
  for (const lang of languages) {
    if (lang.extensions && lang.extensions.includes(ext)) return lang
  }
  return null
}

// 확장자에 해당하는 CodeMirror LanguageSupport 확장을 비동기 로드
export async function loadLanguageExtension(filename) {
  const desc = detectLanguageDesc(filename)
  if (!desc) return null
  if (_cache.has(desc.name)) return _cache.get(desc.name)
  try {
    const support = await desc.load()
    _cache.set(desc.name, support)
    return support
  } catch {
    return null
  }
}

export function languageLabel(filename) {
  const desc = detectLanguageDesc(filename)
  return desc ? desc.name : 'Plain Text'
}
