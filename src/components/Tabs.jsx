import { useStore } from '../store'

export default function Tabs() {
  const nodes = useStore((s) => s.nodes)
  const openTabs = useStore((s) => s.openTabs)
  const activeTab = useStore((s) => s.activeTab)
  const setActiveTab = useStore((s) => s.setActiveTab)
  const closeTab = useStore((s) => s.closeTab)

  if (openTabs.length === 0) return null

  return (
    <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
      {openTabs.map((id) => {
        const node = nodes.find((n) => n.id === id)
        if (!node) return null
        const active = id === activeTab
        return (
          <div
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex min-h-[44px] shrink-0 items-center gap-1 border-r border-slate-200 pl-3 pr-1 text-xs dark:border-slate-700 ${
              active
                ? 'bg-white text-slate-900 dark:bg-slate-900 dark:text-white'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className="max-w-[120px] truncate">{node.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeTab(id)
              }}
              className="ml-1 flex h-9 w-9 items-center justify-center rounded text-slate-400 hover:bg-slate-300 hover:text-slate-700 dark:hover:bg-slate-600 dark:hover:text-white"
              aria-label="탭 닫기"
            >
              ×
            </button>
          </div>
        )
      })}
    </div>
  )
}
