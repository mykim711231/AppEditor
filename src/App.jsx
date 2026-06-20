import { useEffect, useRef } from 'react'
import { useStore } from './store'
import TopBar from './components/TopBar'
import Tabs from './components/Tabs'
import Editor from './components/Editor'
import MarkdownView from './components/MarkdownView'
import FileExplorer from './components/FileExplorer'
import AISelector from './components/AISelector'
import QuestionBar from './components/QuestionBar'
import Settings from './components/Settings'
import History from './components/History'
import SearchModal from './components/SearchModal'
import GitHubModal from './components/GitHubModal'
import OracleModal from './components/OracleModal'
import TemplatesModal from './components/TemplatesModal'
import DocsModal from './components/DocsModal'
import DialogHost from './components/DialogHost'
import { MessageSquare, Eye, CheckCircle2, XCircle, AlertTriangle, Info } from 'lucide-react'

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
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const mdPreview = useStore((s) => s.mdPreview)
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

  // 외부 키보드 단축키: Cmd/Ctrl+B 사이드바, Cmd/Ctrl+P 검색, Esc(다이얼로그>모달>메뉴>집중모드)
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
        const s = useStore.getState()
        if (s.dialog) s.resolveDialog(s.dialog.kind === 'prompt' ? null : false)
        else if (s.activeModal) s.closeModal()
        else if (s.menuOpen) s.closeMenu()
        else toggleBars()
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
  const activeFile = nodes.find((n) => n.id === activeTab)
  const isMdPreview =
    mdPreview && activeFile && /\.(md|markdown)$/i.test(activeFile.name)

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-white dark:bg-slate-900">
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
            {isMdPreview ? (
              <MarkdownView content={activeFile.content} />
            ) : (
              <Editor onSelectionChange={setCodeSelection} />
            )}
          </div>
          {showQuestionBar && <QuestionBar />}
        </main>
      </div>

      {/* 집중 모드: 해제 버튼(우상단) + 질의 바 호출(우하단) */}
      {barsHidden && (
        <button
          onClick={toggleBars}
          className="safe-top fixed right-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white shadow-lg active:scale-95 dark:bg-slate-700/90"
          title="집중 모드 해제"
          aria-label="집중 모드 해제"
        >
          <Eye size={18} />
        </button>
      )}
      {barsHidden && !aiPanelOpen && (
        <button
          onClick={() => setAiPanel(true)}
          className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg active:scale-95"
          title="AI에게 질문 (질의 바 열기)"
          aria-label="질의 바 열기"
        >
          <MessageSquare size={22} />
        </button>
      )}

      {/* 모달 */}
      {activeModal === 'settings' && <Settings />}
      {activeModal === 'history' && <History />}
      {activeModal === 'search' && <SearchModal />}
      {activeModal === 'github' && <GitHubModal />}
      {activeModal === 'oracle' && <OracleModal />}
      {activeModal === 'templates' && <TemplatesModal />}
      {activeModal === 'docs' && <DocsModal />}

      {/* 인앱 다이얼로그 + 전역 토스트 */}
      <DialogHost />
      {notice && (
        <div
          className={`pointer-events-none fixed bottom-24 left-1/2 z-[55] flex max-w-[90vw] -translate-x-1/2 items-center gap-2 rounded-lg px-4 py-2.5 text-xs text-white shadow-lg ${
            { success: 'bg-green-600', error: 'bg-red-600', warn: 'bg-amber-500', info: 'bg-slate-900 dark:bg-slate-700' }[
              notice.type
            ] || 'bg-slate-900 dark:bg-slate-700'
          }`}
        >
          {notice.type === 'success' && <CheckCircle2 size={16} className="shrink-0" />}
          {notice.type === 'error' && <XCircle size={16} className="shrink-0" />}
          {notice.type === 'warn' && <AlertTriangle size={16} className="shrink-0" />}
          {(!notice.type || notice.type === 'info') && <Info size={16} className="shrink-0" />}
          <span>{notice.text}</span>
        </div>
      )}
    </div>
  )
}
