import { useStore, uiPrompt } from '../store'
import {
  undo,
  redo,
  toggleComment,
  openSearchPanel,
  toUpper,
  toLower,
  toCamel,
  numberLines,
  insertAtLineStart,
} from '../lib/editorCommands'

// 에디터 동작 툴바 (모바일 버튼 접근). viewRef 로 CodeMirror 명령 실행.
export default function EditorToolbar({ viewRef, onSave }) {
  const notify = useStore((s) => s.notify)

  const run = (cmd) => () => {
    const view = viewRef.current
    if (!view) return
    cmd(view)
    view.focus()
  }

  const onInsertLine = async () => {
    const view = viewRef.current
    if (!view) return
    const text = await uiPrompt({ title: '줄머리에 문자 넣기', placeholder: '예: // 또는 - ' })
    if (text != null && text !== '') insertAtLineStart(view, text)
  }

  const onSaveClick = () => {
    onSave?.()
    notify('저장됨')
  }

  const Btn = ({ onClick, title, children }) => (
    <button
      onClick={onClick}
      title={title}
      className="flex h-9 shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
    >
      {children}
    </button>
  )

  return (
    <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 bg-slate-50 px-1.5 py-1 dark:border-slate-700 dark:bg-slate-800/60">
      <Btn onClick={onSaveClick} title="저장 (자동저장 됨)">
        💾 저장
      </Btn>
      <span className="mx-0.5 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      <Btn onClick={run(undo)} title="실행취소 (Ctrl+Z)">
        ↩︎
      </Btn>
      <Btn onClick={run(redo)} title="다시실행 (Ctrl+Y)">
        ↪︎
      </Btn>
      <Btn onClick={run(toggleComment)} title="주석 토글 (Ctrl+/)">
        주석
      </Btn>
      <span className="mx-0.5 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      <Btn onClick={run(toUpper)} title="대문자">
        A↑
      </Btn>
      <Btn onClick={run(toLower)} title="소문자">
        a↓
      </Btn>
      <Btn onClick={run(toCamel)} title="camelCase 변환">
        cC
      </Btn>
      <span className="mx-0.5 h-5 w-px bg-slate-300 dark:bg-slate-600" />
      <Btn onClick={run(numberLines)} title="선택 줄 번호 매기기">
        1. 번호
      </Btn>
      <Btn onClick={onInsertLine} title="선택 줄머리에 문자 넣기">
        ⌶ 줄머리
      </Btn>
      <Btn onClick={run(openSearchPanel)} title="찾기·바꾸기 (Ctrl+F)">
        🔍 바꾸기
      </Btn>
    </div>
  )
}
