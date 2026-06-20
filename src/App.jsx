import { useEffect, useRef, useState } from 'react'
import { useStore } from './store'
import TopBar from './components/TopBar'
import Tabs from './components/Tabs'
import Editor from './components/Editor'
import FileExplorer from './components/FileExplorer'
import AIBar from './components/AIBar'
import Settings from './components/Settings'
import Snippets from './components/Snippets'
import History from './components/History'

export default function App() {
  const init = useStore((s) => s.init)
  const loaded = useStore((s) => s.loaded)
  const sidebarOpen = useStore((s) => s.sidebarOpen)
  const barsHidden = useStore((s) => s.barsHidden)
  const aiPanelOpen = useStore((s) => s.aiPanelOpen)
  const setAiPanel = useStore((s) => s.setAiPanel)
  const toggleSidebar = useStore((s) => s.toggleSidebar)
  const toggleBars = useStore((s) => s.toggleBars)
  const activeModal = useStore((s) => s.activeModal)

  const [selection, setSelection] = useState('')
  const touchStart = useRef(null)

  useEffect(() => {
    init()
  }, [init])

  // 외부 키보드 단축키: Cmd/Ctrl+B 사이드바, Esc 집중 모드
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        toggleSidebar()
      } else if (e.key === 'Escape') {
        toggleBars()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggleSidebar, toggleBars])

  // 스와이프 위/아래로 AI 패널 표시·숨김 (터치 기기)
  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return
    touchStart.current = { y: e.touches[0].clientY, x: e.touches[0].clientX }
  }
  const onTouchEnd = (e) => {
    if (!touchStart.current) return
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const dx = Math.abs(e.changedTouches[0].clientX - touchStart.current.x)
    if (Math.abs(dy) > 60 && dx < 50) {
      if (dy < 0) setAiPanel(true) // 위로 스와이프 → 표시
      else setAiPanel(false) // 아래로 스와이프 → 숨김
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

  // AI 바 표시 여부: 집중 모드가 아니거나 스와이프로 강제로 열린 경우
  const showAIBar = !barsHidden || aiPanelOpen

  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-900">
      <TopBar />

      <div className="flex min-h-0 flex-1">
        {/* 사이드바 (파일 탐색기) */}
        {sidebarOpen && !barsHidden && (
          <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 md:w-64">
            <FileExplorer />
          </aside>
        )}

        {/* 메인 편집 영역 */}
        <main
          className="flex min-w-0 flex-1 flex-col"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <Tabs />
          <div className="min-h-0 flex-1">
            <Editor onSelectionChange={setSelection} />
          </div>
          {showAIBar && <AIBar selection={selection} />}
        </main>
      </div>

      {/* 집중 모드에서 AI 바가 숨겨졌을 때: 어디서든 AI 호출 (스와이프 대체) */}
      {barsHidden && !aiPanelOpen && (
        <button
          onClick={() => setAiPanel(true)}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl text-white shadow-lg active:scale-95"
          title="AI에게 질문 (패널 열기)"
          aria-label="AI 패널 열기"
        >
          💬
        </button>
      )}

      {/* 모달 */}
      {activeModal === 'settings' && <Settings />}
      {activeModal === 'snippets' && <Snippets />}
      {activeModal === 'history' && <History />}
    </div>
  )
}
