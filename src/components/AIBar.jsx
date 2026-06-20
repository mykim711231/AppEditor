import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  horizontalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useStore } from '../store'
import { sendToAI } from '../lib/ai'
import { addHistory } from '../lib/db'
import { uid } from '../lib/id'

function AIButton({ ai, onSend, onLongPress }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: ai.id,
  })
  let pressTimer = null

  const start = () => {
    pressTimer = setTimeout(() => onLongPress(ai), 600)
  }
  const clear = () => {
    if (pressTimer) clearTimeout(pressTimer)
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onSend(ai)}
      onPointerDown={start}
      onPointerUp={clear}
      onPointerLeave={clear}
      className="flex shrink-0 items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
      title={`${ai.name} 로 보내기 (길게 누르면 삭제)`}
    >
      <span>{ai.icon}</span>
      <span>{ai.name}</span>
    </button>
  )
}

export default function AIBar({ selection }) {
  const ais = useStore((s) => s.ais)
  const reorderAIs = useStore((s) => s.reorderAIs)
  const removeAI = useStore((s) => s.removeAI)
  const addAI = useStore((s) => s.addAI)
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const barsHidden = useStore((s) => s.barsHidden)
  const setAiPanel = useStore((s) => s.setAiPanel)

  const [question, setQuestion] = useState('')
  const [scope, setScope] = useState('selection') // 'selection' | 'all'
  const [toast, setToast] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const file = nodes.find((n) => n.id === activeTab)

  const getCode = () => {
    if (scope === 'all') return file?.content || ''
    return selection || file?.content || ''
  }

  const onSend = async (ai) => {
    const code = getCode()
    const res = await sendToAI(ai, { question, code, scope })
    // 히스토리 저장 (IndexedDB)
    await addHistory({
      id: uid(),
      ai: ai.name,
      question,
      code,
      scope,
      createdAt: Date.now(),
    })
    setToast(res.copied ? `${ai.name} 새 탭 열림 · 코드+질문 복사됨` : `${ai.name} 열림 (복사 실패: 수동 복사 필요)`)
    setTimeout(() => setToast(''), 2500)
  }

  const onLongPress = (ai) => {
    if (confirm(`"${ai.name}" 버튼을 삭제할까요?`)) removeAI(ai.id)
  }

  const onAdd = () => {
    const name = prompt('AI 이름')
    if (!name || !name.trim()) return
    const url = prompt('AI URL (https://...)', 'https://')
    if (!url || !url.trim()) return
    const icon = prompt('아이콘 이모지', '🤖') || '🤖'
    addAI({ name: name.trim(), url: url.trim(), icon: icon.trim() })
  }

  const onDragEnd = (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const ids = ais.map((a) => a.id)
    const next = arrayMove(ids, ids.indexOf(active.id), ids.indexOf(over.id))
    reorderAIs(next)
  }

  return (
    <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900">
      {/* 드래그 핸들: 스와이프 가능 표시 + 집중 모드에선 탭하면 닫힘 */}
      <button
        onClick={() => barsHidden && setAiPanel(false)}
        className="flex w-full justify-center py-1.5"
        title={barsHidden ? 'AI 패널 닫기 (또는 아래로 스와이프)' : '위/아래로 스와이프하여 AI 패널 표시·숨김'}
        aria-label="AI 패널 핸들"
      >
        <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
      </button>

      {/* 질문 입력 + 범위 선택 */}
      <div className="flex items-center gap-2 px-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="AI에게 보낼 질문을 입력하세요"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-3 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="scope"
            checked={scope === 'selection'}
            onChange={() => setScope('selection')}
          />
          선택한 코드만
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="scope"
            checked={scope === 'all'}
            onChange={() => setScope('all')}
          />
          전체 코드
        </label>
        {scope === 'selection' && selection && (
          <span className="text-blue-500">({selection.length}자 선택됨)</span>
        )}
      </div>

      {/* AI 버튼들 (드래그 정렬) */}
      <div className="flex items-center gap-2 overflow-x-auto px-2 pb-2 safe-bottom">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={ais.map((a) => a.id)} strategy={horizontalListSortingStrategy}>
            {ais.map((ai) => (
              <AIButton key={ai.id} ai={ai} onSend={onSend} onLongPress={onLongPress} />
            ))}
          </SortableContext>
        </DndContext>
        <button
          onClick={onAdd}
          className="flex shrink-0 items-center justify-center rounded-full border border-dashed border-slate-400 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-500 dark:text-slate-400"
          title="AI 추가"
        >
          ＋
        </button>
      </div>

      {toast && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-2 text-xs text-white shadow-lg dark:bg-slate-700">
          {toast}
        </div>
      )}
    </div>
  )
}
