import { create } from 'zustand'
import { uid } from './lib/id'
import * as db from './lib/db'
import { DEFAULT_AIS, sendToAI } from './lib/ai'

// ---- localStorage 헬퍼 ----
const LS = {
  get(key, fallback) {
    try {
      const v = localStorage.getItem(key)
      return v == null ? fallback : JSON.parse(v)
    } catch {
      return fallback
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      // 저장 용량 초과 등 — 조용히 삼키지 않고 사용자에게 알림
      try {
        useStore.getState().notify('저장 공간 부족 — 일부 설정이 저장되지 않았습니다.', 'error')
      } catch {
        /* 무시 */
      }
      return false
    }
  },
}

const DEFAULT_SETTINGS = {
  theme: 'dark', // 'dark' | 'light'
  font: 'Fira Code',
  fontSize: 14,
  storageMode: 'indexeddb', // 'indexeddb' | 'local' | 'gdrive'
  googleClientId: '', // Google Drive OAuth 클라이언트 ID (설정에서 입력)
  driveAutoBackup: false, // 편집 시 Drive 자동 백업
  github: { token: '', repo: '', branch: 'main' }, // GitHub 연동 설정
}

// Drive 자동 백업 디바운스 타이머 (모듈 스코프 — 리렌더 방지)
let _driveBackupTimer = null

const SAMPLE = `// 모바일 코드 에디터에 오신 것을 환영합니다 👋
function greet(name) {
  console.log(\`안녕하세요, \${name}님!\`)
}

greet('개발자')
`

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f8fafc')
}

export const useStore = create((set, get) => ({
  // ---- 상태 ----
  nodes: [], // 파일·폴더 노드 배열
  openTabs: [], // 열린 파일 id 배열
  activeTab: null, // 현재 활성 파일 id
  loaded: false,

  settings: { ...DEFAULT_SETTINGS, ...LS.get('settings', {}) },
  ais: LS.get('ais', DEFAULT_AIS),
  // ---- AI 질의 공유 상태 (질문 바: 하단 / AI 선택: 사이드바) ----
  aiQuestion: '',
  aiScope: 'selection', // 'selection' | 'all'
  codeSelection: '', // 에디터에서 선택된 텍스트
  selectedAiId: null, // 사이드바 콤보박스에서 고른 AI (null이면 첫 번째)

  // UI 상태
  sidebarOpen: typeof window !== 'undefined' ? window.innerWidth >= 768 : true,
  barsHidden: false, // 👁 집중 모드
  aiPanelOpen: false,
  activeModal: null, // 'settings' | 'history' | 'search' | 'github' | null
  menuOpen: false, // 좌상단 ≡ 메뉴
  mdPreview: false, // 마크다운 미리보기 토글
  dialog: null, // 인앱 다이얼로그 (prompt/confirm/alert)
  notice: null, // 전역 토스트 알림 { text, type }

  // ---- 초기화 ----
  async init() {
    applyTheme(get().settings.theme)
    // Google Drive 리다이렉트 복귀 토큰 처리
    try {
      const { consumeRedirect } = await import('./lib/gdrive')
      if (consumeRedirect()) set({ notice: { text: 'Google Drive 연결됨', type: 'success' } })
    } catch {
      /* 무시 */
    }
    // IndexedDB 영구 저장 요청 (iOS ITP 7일 제거·스토리지 압박 대비)
    try {
      if (navigator.storage?.persist) await navigator.storage.persist()
    } catch {
      /* 무시 */
    }
    let nodes = await db.loadAllNodes()
    if (nodes.length === 0) {
      // 첫 실행: 샘플 파일 생성
      const sample = {
        id: uid(),
        name: 'welcome.js',
        type: 'file',
        parentId: null,
        content: SAMPLE,
        order: 0,
      }
      await db.putNode(sample)
      nodes = [sample]
      set({ openTabs: [sample.id], activeTab: sample.id })
    }
    set({ nodes, loaded: true })
  },

  // ---- 파일·폴더 ----
  async createFile(name, parentId = null) {
    const siblings = get().nodes.filter((n) => n.parentId === parentId)
    const node = {
      id: uid(),
      name,
      type: 'file',
      parentId,
      content: '',
      order: siblings.length,
    }
    await db.putNode(node)
    set((s) => ({ nodes: [...s.nodes, node] }))
    get().openFile(node.id)
    get().scheduleDriveBackup()
    return node
  },

  async createFolder(name, parentId = null) {
    const siblings = get().nodes.filter((n) => n.parentId === parentId)
    const node = {
      id: uid(),
      name,
      type: 'folder',
      parentId,
      order: siblings.length,
      expanded: true,
    }
    await db.putNode(node)
    set((s) => ({ nodes: [...s.nodes, node] }))
    get().scheduleDriveBackup()
    return node
  },

  async renameNode(id, name) {
    const node = get().nodes.find((n) => n.id === id)
    if (!node) return
    const updated = { ...node, name }
    await db.putNode(updated)
    set((s) => ({ nodes: s.nodes.map((n) => (n.id === id ? updated : n)) }))
    get().scheduleDriveBackup()
  },

  async deleteNode(id) {
    // 폴더면 하위 노드까지 재귀 삭제
    const all = get().nodes
    const toDelete = []
    const collect = (nid) => {
      toDelete.push(nid)
      all.filter((n) => n.parentId === nid).forEach((c) => collect(c.id))
    }
    collect(id)
    await db.deleteNodes(toDelete)
    set((s) => ({
      nodes: s.nodes.filter((n) => !toDelete.includes(n.id)),
      openTabs: s.openTabs.filter((t) => !toDelete.includes(t)),
      activeTab: toDelete.includes(s.activeTab)
        ? s.openTabs.filter((t) => !toDelete.includes(t))[0] || null
        : s.activeTab,
    }))
    get().scheduleDriveBackup()
  },

  toggleFolder(id) {
    const node = get().nodes.find((n) => n.id === id)
    if (!node) return
    const updated = { ...node, expanded: !node.expanded }
    db.putNode(updated)
    set((s) => ({ nodes: s.nodes.map((n) => (n.id === id ? updated : n)) }))
  },

  // dnd 정렬 결과 반영 (같은 parent 내 순서)
  async reorderNodes(parentId, orderedIds) {
    const updates = []
    set((s) => {
      const nodes = s.nodes.map((n) => {
        if (n.parentId === parentId) {
          const idx = orderedIds.indexOf(n.id)
          if (idx !== -1 && n.order !== idx) {
            const u = { ...n, order: idx }
            updates.push(u)
            return u
          }
        }
        return n
      })
      return { nodes }
    })
    if (updates.length) await db.putNodes(updates)
  },

  // ---- 탭 ----
  openFile(id) {
    set((s) => ({
      openTabs: s.openTabs.includes(id) ? s.openTabs : [...s.openTabs, id],
      activeTab: id,
      codeSelection: '', // 다른 파일로 전환 시 이전 선택 초기화
    }))
  },

  closeTab(id) {
    set((s) => {
      const openTabs = s.openTabs.filter((t) => t !== id)
      let activeTab = s.activeTab
      if (s.activeTab === id) activeTab = openTabs[openTabs.length - 1] || null
      return { openTabs, activeTab }
    })
  },

  setActiveTab(id) {
    set({ activeTab: id, codeSelection: '' })
  },

  // 편집 내용 저장 (자동 저장)
  async updateContent(id, content) {
    const node = get().nodes.find((n) => n.id === id)
    if (!node) return
    const updated = { ...node, content }
    set((s) => ({ nodes: s.nodes.map((n) => (n.id === id ? updated : n)) }))
    await db.putNode(updated)
    get().scheduleDriveBackup()
  },

  // ---- 설정 ----
  updateSettings(patch) {
    set((s) => {
      const settings = { ...s.settings, ...patch }
      LS.set('settings', settings)
      if (patch.theme) applyTheme(patch.theme)
      return { settings }
    })
  },

  // ---- AI 질의 입력 ----
  setAiQuestion: (v) => set({ aiQuestion: v }),
  setAiScope: (v) => set({ aiScope: v }),
  setCodeSelection: (v) => set({ codeSelection: v }),
  setSelectedAiId: (id) => set({ selectedAiId: id }),

  // 선택된 범위/질문/AI로 전송 (클립보드 복사 + 새 탭 + 히스토리 저장)
  async sendQuestion(ai) {
    const { aiQuestion, aiScope, codeSelection, nodes, activeTab } = get()
    const file = nodes.find((n) => n.id === activeTab)
    const code = aiScope === 'all' ? file?.content || '' : codeSelection || file?.content || ''
    const res = await sendToAI(ai, { question: aiQuestion, code, scope: aiScope })
    await db.addHistory({
      id: uid(),
      ai: ai.name,
      question: aiQuestion,
      code,
      scope: aiScope,
      createdAt: Date.now(),
    })
    return res
  },

  // ---- AI 목록 ----
  addAI(ai) {
    let created
    set((s) => {
      created = { ...ai, id: uid() }
      const ais = [...s.ais, created]
      LS.set('ais', ais)
      return { ais, selectedAiId: created.id }
    })
    return created
  },
  removeAI(id) {
    set((s) => {
      const ais = s.ais.filter((a) => a.id !== id)
      LS.set('ais', ais)
      const selectedAiId = s.selectedAiId === id ? ais[0]?.id ?? null : s.selectedAiId
      return { ais, selectedAiId }
    })
  },
  // 실수로 지운 기본 AI 복원 (커스텀 AI는 보존, 빠진 기본만 추가)
  restoreDefaultAIs() {
    const s = get()
    const ids = new Set(s.ais.map((a) => a.id))
    const names = new Set(s.ais.map((a) => a.name.toLowerCase()))
    const missing = DEFAULT_AIS.filter(
      (d) => !ids.has(d.id) && !names.has(d.name.toLowerCase())
    )
    if (missing.length) {
      const ais = [...s.ais, ...missing]
      LS.set('ais', ais)
      set({ ais, selectedAiId: s.selectedAiId || ais[0]?.id || null })
    }
    return missing.length
  },
  reorderAIs(orderedIds) {
    set((s) => {
      const map = new Map(s.ais.map((a) => [a.id, a]))
      const ais = orderedIds.map((id) => map.get(id)).filter(Boolean)
      LS.set('ais', ais)
      return { ais }
    })
  },

  // ---- 백업 스냅샷 (Google Drive 연동용) ----
  // 현재 파일/AI 목록을 하나의 JSON 객체로 직렬화
  getSnapshot() {
    const s = get()
    return {
      app: 'appeditor',
      version: 1,
      exportedAt: Date.now(),
      nodes: s.nodes,
      ais: s.ais,
    }
  },

  // 스냅샷으로 현재 상태를 덮어쓰기 (Drive 복원)
  async applySnapshot(data) {
    if (!data || !Array.isArray(data.nodes)) {
      throw new Error('백업 데이터 형식이 올바르지 않습니다.')
    }
    // 실패 대비 롤백 스냅샷
    const backupNodes = get().nodes
    try {
      await db.clearFiles()
      await db.putNodes(data.nodes)
    } catch (e) {
      // 복원 실패 시 기존 데이터 되돌리기
      try {
        await db.clearFiles()
        await db.putNodes(backupNodes)
      } catch {
        /* 무시 */
      }
      throw new Error('복원 실패 — 기존 파일을 되돌렸습니다. (' + e.message + ')')
    }
    const firstFile = data.nodes.find((n) => n.type === 'file')
    set({
      nodes: data.nodes,
      openTabs: firstFile ? [firstFile.id] : [],
      activeTab: firstFile ? firstFile.id : null,
    })
    if (Array.isArray(data.ais) && data.ais.length) {
      LS.set('ais', data.ais)
      set({ ais: data.ais })
    }
  },

  // 자동 백업 예약 (storageMode=gdrive + 자동백업 ON + 클라이언트 ID 있을 때만)
  scheduleDriveBackup() {
    const { settings, getSnapshot } = get()
    if (settings.storageMode !== 'gdrive') return
    if (!settings.driveAutoBackup || !settings.googleClientId) return
    if (_driveBackupTimer) clearTimeout(_driveBackupTimer)
    _driveBackupTimer = setTimeout(async () => {
      try {
        const { uploadBackup } = await import('./lib/gdrive')
        await uploadBackup(settings.googleClientId, JSON.stringify(getSnapshot()))
      } catch {
        /* 자동 백업 실패는 조용히 무시 (수동 백업으로 보완) */
      }
    }, 3000)
  },

  // ---- 인앱 다이얼로그 (네이티브 prompt/confirm/alert 대체) ----
  openDialog(cfg) {
    return new Promise((resolve) => set({ dialog: { ...cfg, resolve } }))
  },
  resolveDialog(value) {
    const d = get().dialog
    set({ dialog: null })
    if (d) d.resolve(value)
  },

  // 전역 토스트 (type: 'info' | 'success' | 'error' | 'warn')
  notify(text, type = 'info') {
    set({ notice: { text, type } })
  },
  clearNotice() {
    set({ notice: null })
  },

  // ---- UI ----
  toggleSidebar: () =>
    set((s) => ({ sidebarOpen: !s.sidebarOpen, barsHidden: false })),
  toggleBars: () => set((s) => ({ barsHidden: !s.barsHidden })),
  setAiPanel: (open) => set({ aiPanelOpen: open }),
  setSidebar: (open) => set({ sidebarOpen: open, barsHidden: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
  toggleMdPreview: () => set((s) => ({ mdPreview: !s.mdPreview })),
  openModal: (m) => set({ activeModal: m, menuOpen: false }),
  closeModal: () => set({ activeModal: null }),
}))

// ---- 인앱 다이얼로그 헬퍼 (Promise 반환) ----
export function uiPrompt({ title, message = '', defaultValue = '', placeholder = '' }) {
  return useStore.getState().openDialog({ kind: 'prompt', title, message, defaultValue, placeholder })
}
export function uiConfirm({ title, message = '', danger = false }) {
  return useStore.getState().openDialog({ kind: 'confirm', title, message, danger })
}
export function uiAlert({ title, message = '' }) {
  return useStore.getState().openDialog({ kind: 'alert', title, message })
}
