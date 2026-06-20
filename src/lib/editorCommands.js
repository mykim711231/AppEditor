import { undo, redo, toggleComment } from '@codemirror/commands'
import { openSearchPanel } from '@codemirror/search'

export { undo, redo, toggleComment, openSearchPanel }

// 선택 영역(없으면 커서 단어)에 문자열 변환 적용
function mapSelections(view, transform) {
  const state = view.state
  const changes = []
  for (const range of state.selection.ranges) {
    let { from, to } = range
    if (from === to) {
      const w = state.wordAt(from)
      if (w) {
        from = w.from
        to = w.to
      }
    }
    if (from !== to) changes.push({ from, to, insert: transform(state.sliceDoc(from, to)) })
  }
  if (changes.length) view.dispatch({ changes })
  view.focus()
}

export const toUpper = (view) => mapSelections(view, (s) => s.toUpperCase())
export const toLower = (view) => mapSelections(view, (s) => s.toLowerCase())

// java 변수처럼 camelCase 변환 (구분자: 공백/_/-)
export const toCamel = (view) =>
  mapSelections(view, (s) =>
    s
      .trim()
      .split(/[\s_-]+/)
      .filter(Boolean)
      .map((w, i) =>
        i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join('')
  )

// 선택된 줄들의 줄 번호 집합
function selectedLines(state) {
  const set = new Set()
  for (const r of state.selection.ranges) {
    const a = state.doc.lineAt(r.from).number
    const b = state.doc.lineAt(r.to).number
    for (let l = a; l <= b; l++) set.add(l)
  }
  return [...set].sort((x, y) => x - y)
}

// 열 에디터: 선택한 각 줄 머리에 번호 매기기 (1. 2. 3. …)
export const numberLines = (view) => {
  const state = view.state
  const lines = selectedLines(state)
  const changes = lines.map((ln, i) => ({ from: state.doc.line(ln).from, insert: `${i + 1}. ` }))
  if (changes.length) view.dispatch({ changes })
  view.focus()
}

// 열 에디터: 선택한 각 줄 머리에 동일 문자열 삽입
export const insertAtLineStart = (view, text) => {
  if (!text) return
  const state = view.state
  const lines = selectedLines(state)
  const changes = lines.map((ln) => ({ from: state.doc.line(ln).from, insert: text }))
  if (changes.length) view.dispatch({ changes })
  view.focus()
}
