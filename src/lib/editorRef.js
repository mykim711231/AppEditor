// 현재 활성 CodeMirror EditorView 참조 (모듈 스코프 — 리렌더 영향 없음)
// 모달 등 외부에서 에디터 커서 위치에 코드를 삽입할 때 사용.
let _view = null

export function setEditorView(v) {
  _view = v
}

export function hasEditor() {
  return !!_view
}

// 커서 위치(선택이 있으면 대체)에 텍스트 삽입
export function insertSnippet(text) {
  if (!_view) return false
  const sel = _view.state.selection.main
  const insert = text.endsWith('\n') ? text : text + '\n'
  _view.dispatch({
    changes: { from: sel.from, to: sel.to, insert },
    selection: { anchor: sel.from + insert.length },
    scrollIntoView: true,
  })
  _view.focus()
  return true
}
