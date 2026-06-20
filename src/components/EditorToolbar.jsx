import { uiPrompt } from '../store'
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
// 파일은 자동저장이므로 별도 저장 버튼은 없음.
export default function EditorToolbar({ viewRef }) {
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

  const Btn = ({ onClick, title, children }) => (
    <button
      onClick={onClick}
      title={title}
      className="flex h-11 shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-xs text-slate-700 active:scale-95 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:active:bg-slate-700"
    >
      {children}
    </button>
  )

  return (
    <div className="relative border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-1 overflow-x-auto bg-slate-50 px-1.5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-slate-800/60">
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
      {/* 오른쪽 스크롤 가능 표시 */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-slate-50 dark:from-slate-800" />
    </div>
  )
}
