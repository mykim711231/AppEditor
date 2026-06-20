import { useStore } from '../store'
import { languageLabel } from '../lib/languages'

export default function TopBar() {
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleBars = useStore((s) => s.toggleBars)
  const openModal = useStore((s) => s.openModal)
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const file = nodes.find((n) => n.id === activeTab)

  return (
    <div className="safe-top flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-2 py-2 dark:border-slate-700 dark:bg-slate-800">
      <button
        onClick={toggleSidebar}
        className="rounded p-1.5 text-lg hover:bg-slate-200 dark:hover:bg-slate-700"
        title="파일 사이드바 토글 (Cmd+B)"
      >
        ≡
      </button>
      <div className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {file ? file.name : '모바일 코드 에디터'}
        </span>
        {file && (
          <span className="text-[10px] text-slate-400">{languageLabel(file.name)}</span>
        )}
      </div>
      <button
        onClick={() => openModal('snippets')}
        className="rounded p-1.5 text-base hover:bg-slate-200 dark:hover:bg-slate-700"
        title="스니펫"
      >
        🧩
      </button>
      <button
        onClick={() => openModal('history')}
        className="rounded p-1.5 text-base hover:bg-slate-200 dark:hover:bg-slate-700"
        title="AI 질문 히스토리"
      >
        🕘
      </button>
      <button
        onClick={() => openModal('settings')}
        className="rounded p-1.5 text-base hover:bg-slate-200 dark:hover:bg-slate-700"
        title="설정"
      >
        ⚙️
      </button>
      <button
        onClick={toggleBars}
        className="rounded p-1.5 text-base hover:bg-slate-200 dark:hover:bg-slate-700"
        title="집중 모드 (파일바·AI바 숨김)"
      >
        👁
      </button>
    </div>
  )
}
