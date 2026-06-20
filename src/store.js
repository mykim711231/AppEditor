import { create } from 'zustand'
import { uid } from './lib/id'
import * as db from './lib/db'
import { DEFAULT_AIS } from './lib/ai'

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
    } catch {
      /* 저장 용량 초과 등 무시 */
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
  snippets: LS.get('snippets', []),

  // UI 상태
  sidebarOpen: true,
  barsHidden: false, // 👁 집중 모드
  aiPanelOpen: false,
  activeModal: null, // 'settings' | 'snippets' | 'history' | null

  // ---- 초기화 ----
  async init() {
    applyTheme(get().settings.theme)
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
    set({ activeTab: id })
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

  // ---- AI 목록 ----
  addAI(ai) {
    set((s) => {
      const ais = [...s.ais, { ...ai, id: uid() }]
      LS.set('ais', ais)
      return { ais }
    })
  },
  removeAI(id) {
    set((s) => {
      const ais = s.ais.filter((a) => a.id !== id)
      LS.set('ais', ais)
      return { ais }
    })
  },
  reorderAIs(orderedIds) {
    set((s) => {
      const map = new Map(s.ais.map((a) => [a.id, a]))
      const ais = orderedIds.map((id) => map.get(id)).filter(Boolean)
      LS.set('ais', ais)
      return { ais }
    })
  },

  // ---- 스니펫 ----
  addSnippet(name, code) {
    set((s) => {
      const snippets = [...s.snippets, { id: uid(), name, code }]
      LS.set('snippets', snippets)
      return { snippets }
    })
  },
  updateSnippet(id, patch) {
    set((s) => {
      const snippets = s.snippets.map((sn) => (sn.id === id ? { ...sn, ...patch } : sn))
      LS.set('snippets', snippets)
      return { snippets }
    })
  },
  removeSnippet(id) {
    set((s) => {
      const snippets = s.snippets.filter((sn) => sn.id !== id)
      LS.set('snippets', snippets)
      return { snippets }
    })
  },

  // ---- 백업 스냅샷 (Google Drive 연동용) ----
  // 현재 파일/스니펫/AI 목록을 하나의 JSON 객체로 직렬화
  getSnapshot() {
    const s = get()
    return {
      app: 'appeditor',
      version: 1,
      exportedAt: Date.now(),
      nodes: s.nodes,
      snippets: s.snippets,
      ais: s.ais,
    }
  },

  // 스냅샷으로 현재 상태를 덮어쓰기 (Drive 복원)
  async applySnapshot(data) {
    if (!data || !Array.isArray(data.nodes)) {
      throw new Error('백업 데이터 형식이 올바르지 않습니다.')
    }
    await db.clearFiles()
    await db.putNodes(data.nodes)
    const firstFile = data.nodes.find((n) => n.type === 'file')
    set({
      nodes: data.nodes,
      openTabs: firstFile ? [firstFile.id] : [],
      activeTab: firstFile ? firstFile.id : null,
    })
    if (Array.isArray(data.snippets)) {
      LS.set('snippets', data.snippets)
      set({ snippets: data.snippets })
    }
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

  // ---- UI ----
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleBars: () => set((s) => ({ barsHidden: !s.barsHidden })),
  setAiPanel: (open) => set({ aiPanelOpen: open }),
  openModal: (m) => set({ activeModal: m }),
  closeModal: () => set({ activeModal: null }),
}))
