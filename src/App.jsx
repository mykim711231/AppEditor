import { useEffect, useRef } from 'react'
import { useStore } from './store'
import TopBar from './components/TopBar'
import Tabs from './components/Tabs'
import Editor from './components/Editor'
import FileExplorer from './components/FileExplorer'
import AISelector from './components/AISelector'
import QuestionBar from './components/QuestionBar'
import Settings from './components/Settings'
import Snippets from './components/Snippets'
import History from './components/History'
import SearchModal from './components/SearchModal'
import DialogHost from './components/DialogHost'

export default function App() {
  const init = useStore((s) => s.init)
  const loaded = useStore((s) => s.loaded)
  const sidebarOpen = useStore((s) => s.sidebarOpen)
  const barsHidden = useStore((s) => s.barsHidden)
  const aiPanelOpen = useStore((s) => s.aiPanelOpen)
  const setAiPanel = useStore((s) => s.setAiPanel)
  const setSidebar = useStore((s) => s.setSidebar)
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleBars = useStore((s) => s.toggleBars)
  const setCodeSelection = useStore((s) => s.setCodeSelection)
  const activeModal = useStore((s) => s.activeModal)
  const openModal = useStore((s) => s.openModal)
  const notice = useStore((s) => s.notice)
  const clearNotice = useStore((s) => s.clearNotice)

  const touchStart = useRef(null)

  useEffect(() => {
    init()
  }, [init])

  // 토스트 자동 사라짐
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(clearNotice, 2800)
    return () => clearTimeout(t)
  }, [notice, clearNotice])

  // 외부 키보드 단축키: Cmd/Ctrl+B 사이드바, Cmd/Ctrl+P 검색, Esc 집중 모드
  useEffect(() => {
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey
      if (mod && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSidebar()
      } else if (mod && (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'k')) {
        e.preventDefault()
        openModal('search')
      } else if (e.key === 'Escape') {
        toggleBars()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleSidebar, toggleBars, openModal])

  // 스와이프 위/아래로 AI 패널 표시·숨김 — 단, 에디터 내부 터치는 제외(스크롤 보호)
  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return
    if (e.target.closest?.('.cm-editor')) {
      touchStart.current = null
      return
    }
    touchStart.current = { y: e.touches[0].clientY, x: e.touches[0].clientX }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const dx = Math.abs(e.changedTouches[0].clientX - touchStart.current.x)
    if (Math.abs(dy) > 60 && dx < 50) {
      if (dy < 0) setAiPanel(true)
      else setAiPanel(false)
    }
    touchStart.current = null
  }

  if (!loaded) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-900 text-slate-300">
        <div className="text-center">
          <div className="mb-2 text-4xl">⌨️</div>
          <p className="text-sm">로딩 중…</p>
        </div>
      </div>
    )
  }

  const showQuestionBar = !barsHidden || aiPanelOpen
  const showSidebar = sidebarOpen && !barsHidden

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900">
      <TopBar />

      <div className="relative flex min-h-0 flex-1">
        {/* 사이드바: 작은 화면에선 오버레이 + 백드롭, md 이상은 인라인 */}
        {showSidebar && (
          <>
            <div
              className="absolute inset-0 z-30 bg-black/40 md:hidden"
              onClick={() => setSidebar(false)}
            />
            <aside className="safe-left absolute inset-y-0 left-0 z-40 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-slate-50 shadow-xl dark:border-slate-700 dark:bg-slate-800 md:static md:z-auto md:w-64 md:max-w-none md:shadow-none">
              <div className="min-h-0 flex-1 overflow-hidden">
                <FileExplorer />
              </div>
              <AISelector />
            </aside>
          </>
        )}

        {/* 메인 편집 영역 */}
        <main
          className="flex min-w-0 flex-1 flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Tabs />
          <div className="min-h-0 flex-1">
            <Editor onSelectionChange={setCodeSelection} />
          </div>
          {showQuestionBar && <QuestionBar />}
        </main>
      </div>

      {/* 집중 모드에서 질의 바가 숨겨졌을 때: 어디서든 질의 바 호출 */}
      {barsHidden && !aiPanelOpen && (
        <button
          onClick={() => setAiPanel(true)}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg active:scale-95"
          title="AI에게 질문 (질의 바 열기)"
          aria-label="질의 바 열기"
        >
          💬
        </button>
      )}

      {/* 모달 */}
      {activeModal === 'settings' && <Settings />}
      {activeModal === 'snippets' && <Snippets />}
      {activeModal === 'history' && <History />}
      {activeModal === 'search' && <SearchModal />}

      {/* 인앱 다이얼로그 + 전역 토스트 */}
      <DialogHost />
      {notice && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 z-[55] -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-xs text-white shadow-lg dark:bg-slate-700">
          {notice}
        </div>
      )}
    </div>
  )
}
