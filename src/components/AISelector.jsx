import { useState } from 'react'
import { useStore } from '../store'

// 사이드바 AI 선택 영역: 콤보박스(드롭다운)로 AI 선택 후 전송.
// 질문/범위는 하단 QuestionBar 에서 입력하고 store 로 공유된다.
export default function AISelector() {
  const ais = useStore((s) => s.ais)
  const selectedAiId = useStore((s) => s.selectedAiId)
  const setSelectedAiId = useStore((s) => s.setSelectedAiId)
  const sendQuestion = useStore((s) => s.sendQuestion)
  const addAI = useStore((s) => s.addAI)
  const removeAI = useStore((s) => s.removeAI)

  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  const currentId = selectedAiId && ais.some((a) => a.id === selectedAiId) ? selectedAiId : ais[0]?.id
  const current = ais.find((a) => a.id === currentId)

  const flash = (t) => {
    setToast(t)
    setTimeout(() => setToast(''), 2500)
  }

  const onSend = async () => {
    if (!current) return
    setBusy(true)
    try {
      const res = await sendQuestion(current)
      flash(
        res.copied
          ? `${current.name} 새 탭 열림 · 코드+질문 복사됨`
          : `${current.name} 열림 (복사 실패: 수동 복사 필요)`
      )
    } finally {
      setBusy(false)
    }
  }

  const onAdd = () => {
    const name = prompt('AI 이름')
    if (!name || !name.trim()) return
    const url = prompt('AI URL (https://...)', 'https://')
    if (!url || !url.trim()) return
    const icon = prompt('아이콘 이모지', '🤖') || '🤖'
    addAI({ name: name.trim(), url: url.trim(), icon: icon.trim() })
  }

  const onRemove = () => {
    if (!current) return
    if (confirm(`"${current.name}" 를 목록에서 삭제할까요?`)) removeAI(current.id)
  }

  return (
    <div className="border-t border-slate-200 p-2 dark:border-slate-700">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          AI 질의
        </span>
        <div className="flex gap-1">
          <button
            onClick={onAdd}
            title="AI 추가"
            className="rounded px-1.5 py-0.5 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ＋
          </button>
          <button
            onClick={onRemove}
            title="선택한 AI 삭제"
            disabled={!current}
            className="rounded px-1.5 py-0.5 text-xs hover:bg-red-100 disabled:opacity-40 dark:hover:bg-red-900/40"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* 콤보박스로 AI 선택 */}
      <select
        value={currentId || ''}
        onChange={(e) => setSelectedAiId(e.target.value)}
        className="mb-2 w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      >
        {ais.length === 0 && <option value="">AI 없음 — ＋로 추가</option>}
        {ais.map((ai) => (
          <option key={ai.id} value={ai.id}>
            {ai.icon} {ai.name}
          </option>
        ))}
      </select>

      <button
        onClick={onSend}
        disabled={!current || busy}
        className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white active:scale-[0.99] disabled:opacity-50"
      >
        {busy ? '여는 중…' : current ? `${current.icon} ${current.name} 로 보내기` : '보내기'}
      </button>

      {toast && (
        <div className="mt-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white dark:bg-slate-700">
          {toast}
        </div>
      )}
    </div>
  )
}
