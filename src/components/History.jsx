import { useEffect, useState } from 'react'
import Modal from './Modal'
import { useStore } from '../store'
import { loadHistory, deleteHistory, clearHistory } from '../lib/db'

export default function History() {
  const closeModal = useStore((s) => s.closeModal)
  const [entries, setEntries] = useState([])
  const [query, setQuery] = useState('')

  const refresh = () => loadHistory().then(setEntries)
  useEffect(() => {
    refresh()
  }, [])

  const onDelete = async (id) => {
    await deleteHistory(id)
    refresh()
  }
  const onClear = async () => {
    if (confirm('전체 히스토리를 삭제할까요?')) {
      await clearHistory()
      refresh()
    }
  }

  const filtered = entries.filter((e) => {
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      (e.question || '').toLowerCase().includes(q) ||
      (e.code || '').toLowerCase().includes(q) ||
      (e.ai || '').toLowerCase().includes(q)
    )
  })

  return (
    <Modal title="AI 질문 히스토리" onClose={closeModal}>
      <div className="space-y-2 text-sm">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색 (질문·코드·AI)"
            className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <button
            onClick={onClear}
            className="shrink-0 rounded-lg border border-red-300 px-2 py-1 text-xs text-red-600 dark:border-red-700 dark:text-red-400"
          >
            전체 삭제
          </button>
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="py-4 text-center text-xs text-slate-400">기록이 없습니다.</p>
          )}
          {filtered.map((e) => (
            <div
              key={e.id}
              className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            >
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {e.ai} · {e.scope === 'all' ? '전체' : '선택'}
                </span>
                <div className="flex items-center gap-2">
                  <span>{new Date(e.createdAt).toLocaleString('ko-KR')}</span>
                  <button
                    onClick={() => onDelete(e.id)}
                    className="rounded px-1 hover:bg-red-100 dark:hover:bg-red-900/40"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              {e.question && (
                <p className="mb-1 text-slate-800 dark:text-slate-200">{e.question}</p>
              )}
              {e.code && (
                <pre className="max-h-24 overflow-auto rounded bg-slate-100 p-1.5 font-mono text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {e.code.slice(0, 400)}
                  {e.code.length > 400 ? '…' : ''}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
