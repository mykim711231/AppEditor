import { useState } from 'react'
import Modal from './Modal'
import { useStore, uiAlert } from '../store'

export default function Snippets() {
  const snippets = useStore((s) => s.snippets)
  const addSnippet = useStore((s) => s.addSnippet)
  const removeSnippet = useStore((s) => s.removeSnippet)
  const updateSnippet = useStore((s) => s.updateSnippet)
  const closeModal = useStore((s) => s.closeModal)
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const updateContent = useStore((s) => s.updateContent)

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [editId, setEditId] = useState(null)

  const file = nodes.find((n) => n.id === activeTab)

  const onSave = () => {
    if (!name.trim() || !code.trim()) return
    if (editId) updateSnippet(editId, { name: name.trim(), code })
    else addSnippet(name.trim(), code)
    setName('')
    setCode('')
    setEditId(null)
  }

  const onInsert = (sn) => {
    if (!file) {
      uiAlert({ title: '알림', message: '먼저 파일을 열어주세요.' })
      return
    }
    updateContent(file.id, (file.content || '') + (file.content ? '\n' : '') + sn.code)
    closeModal()
  }

  const onEdit = (sn) => {
    setEditId(sn.id)
    setName(sn.name)
    setCode(sn.code)
  }

  return (
    <Modal title="코드 스니펫" onClose={closeModal}>
      <div className="space-y-3 text-sm">
        <div className="space-y-2 rounded-lg border border-slate-200 p-2 dark:border-slate-700">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="스니펫 이름"
            className="w-full rounded border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="코드 내용"
            rows={4}
            className="w-full rounded border border-slate-300 bg-white px-2 py-1 font-mono text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <button
            onClick={onSave}
            className="w-full rounded-lg bg-blue-600 py-1.5 text-white disabled:opacity-50"
            disabled={!name.trim() || !code.trim()}
          >
            {editId ? '스니펫 수정' : '스니펫 저장'}
          </button>
        </div>

        <div className="space-y-1">
          {snippets.length === 0 && (
            <p className="py-4 text-center text-xs text-slate-400">저장된 스니펫이 없습니다.</p>
          )}
          {snippets.map((sn) => (
            <div
              key={sn.id}
              className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 dark:border-slate-700"
            >
              <span className="min-w-0 flex-1 truncate font-medium text-slate-700 dark:text-slate-200">
                {sn.name}
              </span>
              <button
                onClick={() => onInsert(sn)}
                className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-200"
              >
                삽입
              </button>
              <button
                onClick={() => onEdit(sn)}
                className="rounded px-1 text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                ✏️
              </button>
              <button
                onClick={() => removeSnippet(sn.id)}
                className="rounded px-1 text-xs hover:bg-red-100 dark:hover:bg-red-900/40"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
