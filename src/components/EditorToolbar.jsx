import {
  Undo2,
  Redo2,
  MessageSquare,
  CaseUpper,
  CaseLower,
  CaseSensitive,
  ListOrdered,
  IndentIncrease,
  Replace,
} from 'lucide-react'
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

// 에디터 동작 툴바 (모바일 버튼 접근). 파일은 자동저장.
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

  const Btn = ({ onClick, title, icon: Icon, label }) => (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="flex h-11 shrink-0 items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 text-xs text-slate-700 active:scale-95 active:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:active:bg-slate-700"
    >
      <Icon size={16} />
      {label && <span>{label}</span>}
    </button>
  )

  const Sep = () => <span className="mx-0.5 h-5 w-px shrink-0 bg-slate-300 dark:bg-slate-600" />

  return (
    <div className="relative border-b border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-1 overflow-x-auto bg-slate-50 px-1.5 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:bg-slate-800/60">
        <Btn onClick={run(undo)} title="실행취소 (Ctrl+Z)" icon={Undo2} />
        <Btn onClick={run(redo)} title="다시실행 (Ctrl+Y)" icon={Redo2} />
        <Btn onClick={run(toggleComment)} title="주석 토글 (Ctrl+/)" icon={MessageSquare} label="주석" />
        <Sep />
        <Btn onClick={run(toUpper)} title="대문자" icon={CaseUpper} />
        <Btn onClick={run(toLower)} title="소문자" icon={CaseLower} />
        <Btn onClick={run(toCamel)} title="camelCase 변환" icon={CaseSensitive} label="camel" />
        <Sep />
        <Btn onClick={run(numberLines)} title="선택 줄 번호 매기기" icon={ListOrdered} label="번호" />
        <Btn onClick={onInsertLine} title="선택 줄머리에 문자 넣기" icon={IndentIncrease} label="줄머리" />
        <Btn onClick={run(openSearchPanel)} title="찾기·바꾸기 (Ctrl+F)" icon={Replace} label="바꾸기" />
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-slate-50 dark:from-slate-800" />
    </div>
  )
}
