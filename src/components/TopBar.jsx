import { useEffect, useRef } from 'react'
import { Menu, PanelLeft, Eye, BookOpen, Search, Database, GitBranch, History, Settings, Library } from 'lucide-react'
import { useStore } from '../store'
import { languageLabel } from '../lib/languages'

// 좌상단 툴바: 메뉴 / 사이드 토글 / 파일명 / (MD 미리보기) / 집중 모드
export default function TopBar() {
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleBars = useStore((s) => s.toggleBars)
  const openModal = useStore((s) => s.openModal)
  const menuOpen = useStore((s) => s.menuOpen)
  const toggleMenu = useStore((s) => s.toggleMenu)
  const closeMenu = useStore((s) => s.closeMenu)
  const mdPreview = useStore((s) => s.mdPreview)
  const toggleMdPreview = useStore((s) => s.toggleMdPreview)
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const file = nodes.find((n) => n.id === activeTab)
  const isMd = file && /\.(md|markdown)$/i.test(file.name)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [menuOpen, closeMenu])

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200 active:bg-slate-300 dark:text-slate-200 dark:hover:bg-slate-700 dark:active:bg-slate-600'

  const menuItems = [
    ['search', '검색', Search],
    ['docs', '언어 공식 문서', Library],
    ['oracle', 'Oracle 템플릿', Database],
    ['github', 'GitHub 연동', GitBranch],
    ['history', 'AI 히스토리', History],
    ['settings', '설정', Settings],
  ]

  return (
    <div className="safe-top relative flex items-center gap-0.5 border-b border-slate-200 bg-slate-100 px-1.5 py-1 dark:border-slate-700 dark:bg-slate-800">
      {/* 메뉴 */}
      <div ref={menuRef} className="relative">
        <button onClick={toggleMenu} className={btn} title="메뉴" aria-label="메뉴">
          <Menu size={20} />
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {menuItems.map(([key, label, Icon]) => (
              <button
                key={key}
                onClick={() => openModal(key)}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Icon size={16} className="shrink-0 text-slate-500 dark:text-slate-400" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 사이드 토글 */}
      <button onClick={toggleSidebar} className={btn} title="사이드바 토글 (Cmd+B)" aria-label="사이드바">
        <PanelLeft size={20} />
      </button>

      {/* 파일명 */}
      <div className="flex min-w-0 flex-1 flex-col px-1 leading-tight">
        <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {file ? file.name : '모바일 코드 에디터'}
        </span>
        {file && <span className="text-[11px] text-slate-500 dark:text-slate-400">{languageLabel(file.name)}</span>}
      </div>

      {/* MD 미리보기 (.md 파일일 때만) */}
      {isMd && (
        <button
          onClick={toggleMdPreview}
          className={`${btn} ${mdPreview ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200' : ''}`}
          title="마크다운 미리보기"
          aria-label="마크다운 미리보기"
        >
          <BookOpen size={20} />
        </button>
      )}

      {/* 집중 모드 */}
      <button onClick={toggleBars} className={btn} title="집중 모드 (Esc)" aria-label="집중 모드">
        <Eye size={20} />
      </button>
    </div>
  )
}
