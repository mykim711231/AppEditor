import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore, uiPrompt, uiConfirm } from '../store'

// 드래그로 순서 변경되는 AI 행
function SortableAIRow({ ai, selected, onSelect }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: ai.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-1 rounded px-1 py-1 text-sm ${
        selected
          ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100'
          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
      }`}
    >
      <span
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none px-0.5 text-slate-300 dark:text-slate-600"
        aria-label="드래그하여 순서 변경"
      >
        ⠿
      </span>
      <button onClick={() => onSelect(ai.id)} className="flex min-w-0 flex-1 items-center gap-1 text-left">
        <span>{ai.icon}</span>
        <span className="min-w-0 flex-1 truncate">{ai.name}</span>
        {selected && <span className="text-xs text-blue-500">●</span>}
      </button>
    </div>
  )
}

// 사이드바 AI 선택 영역: 콤보박스 선택 + 드래그 순서 변경 + 추가/삭제
export default function AISelector() {
  const ais = useStore((s) => s.ais)
  const selectedAiId = useStore((s) => s.selectedAiId)
  const setSelectedAiId = useStore((s) => s.setSelectedAiId)
  const sendQuestion = useStore((s) => s.sendQuestion)
  const addAI = useStore((s) => s.addAI)
  const removeAI = useStore((s) => s.removeAI)
  const reorderAIs = useStore((s) => s.reorderAIs)

  const [busy, setBusy] = useState(false)
  const [toast, setToast] = useState('')

  const currentId = selectedAiId && ais.some((a) => a.id === selectedAiId) ? selectedAiId : ais[0]?.id
  const current = ais.find((a) => a.id === currentId)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
  )

  const flash = (t) => {
    setToast(t)
    setTimeout(() => setToast(''), 2500)
  }

  const onSend = async () => {
    if (!current) return
    setBusy(true)
    try {
      const res = await sendQuestion(current)
      let msg
      if (!res.opened) msg = `${current.name} 열기 차단됨 — 팝업 허용 후 다시 시도`
      else if (res.copied) msg = `${current.name} 열림 · 코드+질문 복사됨 (붙여넣기)`
      else msg = `${current.name} 열림 (복사 실패: 수동 복사 필요)`
      flash(msg)
    } finally {
      setBusy(false)
    }
  }

  const onAdd = async () => {
    const name = await uiPrompt({ title: 'AI 추가', placeholder: '이름 (예: MyAI)' })
    if (!name || !name.trim()) return
    const url = await uiPrompt({ title: 'AI URL', defaultValue: 'https://', placeholder: 'https://...' })
    if (!url || !url.trim()) return
    const icon = (await uiPrompt({ title: '아이콘 이모지', defaultValue: '🤖' })) || '🤖'
    addAI({ name: name.trim(), url: url.trim(), icon: icon.trim() })
  }

  const onRemove = async () => {
    if (!current) return
    if (await uiConfirm({ title: 'AI 삭제', message: `"${current.name}" 를 목록에서 삭제할까요?`, danger: true }))
      removeAI(current.id)
  }

  const onDragEnd = (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const ids = ais.map((a) => a.id)
    reorderAIs(arrayMove(ids, ids.indexOf(active.id), ids.indexOf(over.id)))
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

      {/* 드래그로 순서 변경 (펼침) */}
      {ais.length > 1 && (
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-slate-400">AI 순서 변경 (드래그)</summary>
          <div className="mt-1">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
              <SortableContext items={ais.map((a) => a.id)} strategy={verticalListSortingStrategy}>
                {ais.map((ai) => (
                  <SortableAIRow
                    key={ai.id}
                    ai={ai}
                    selected={ai.id === currentId}
                    onSelect={setSelectedAiId}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </details>
      )}

      {toast && (
        <div className="mt-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-white dark:bg-slate-700">
          {toast}
        </div>
      )}
    </div>
  )
}
