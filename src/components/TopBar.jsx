import { useEffect, useRef } from 'react'
import { useStore } from '../store'
import { languageLabel } from '../lib/languages'

// 좌상단 툴바 (Claude Desktop 스타일): ≡ 메뉴 / ▭ 사이드 토글 / 🔍 검색
export default function TopBar() {
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleBars = useStore((s) => s.toggleBars)
  const openModal = useStore((s) => s.openModal)
  const menuOpen = useStore((s) => s.menuOpen)
  const toggleMenu = useStore((s) => s.toggleMenu)
  const closeMenu = useStore((s) => s.closeMenu)
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const file = nodes.find((n) => n.id === activeTab)
  const menuRef = useRef(null)

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu()
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [menuOpen, closeMenu])

  const btn =
    'flex h-11 w-11 items-center justify-center rounded-lg text-lg hover:bg-slate-200 dark:hover:bg-slate-700'

  return (
    <div className="safe-top relative flex items-center gap-0.5 border-b border-slate-200 bg-slate-100 px-1.5 py-1 dark:border-slate-700 dark:bg-slate-800">
      {/* ≡ 메뉴 */}
      <div ref={menuRef} className="relative">
        <button onClick={toggleMenu} className={btn} title="메뉴" aria-label="메뉴">
          ≡
        </button>
        {menuOpen && (
          <div className="absolute left-0 top-12 z-50 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {[
              ['search', '🔍 검색', 'search'],
              ['snippets', '🧩 스니펫', 'snippets'],
              ['history', '🕘 AI 히스토리', 'history'],
              ['settings', '⚙️ 설정', 'settings'],
            ].map(([key, label, modal]) => (
              <button
                key={key}
                onClick={() => openModal(modal)}
                className="flex w-full items-center px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ▭ 사이드 토글 */}
      <button onClick={toggleSidebar} className={btn} title="사이드바 토글 (Cmd+B)" aria-label="사이드바">
        ▭
      </button>

      {/* 🔍 검색 */}
      <button onClick={() => openModal('search')} className={btn} title="검색 (Cmd+P)" aria-label="검색">
        🔍
      </button>

      {/* 파일명 */}
      <div className="flex min-w-0 flex-1 flex-col px-1 leading-tight">
        <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
          {file ? file.name : '모바일 코드 에디터'}
        </span>
        {file && <span className="text-[10px] text-slate-400">{languageLabel(file.name)}</span>}
      </div>

      {/* 👁 집중 모드 */}
      <button onClick={toggleBars} className={btn} title="집중 모드 (Esc)" aria-label="집중 모드">
        👁
      </button>
    </div>
  )
}
