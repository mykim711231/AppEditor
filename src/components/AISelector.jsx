import { useEffect, useRef, useState } from 'react'
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
import { useStore, uiConfirm } from '../store'
import TextInput from './ui/TextInput'
import AiIcon from './ui/AiIcon'

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
      <button onClick={() => onSelect(ai.id)} className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
        <AiIcon ai={ai} />
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
  const addAI = useStore((s) => s.addAI)
  const removeAI = useStore((s) => s.removeAI)
  const reorderAIs = useStore((s) => s.reorderAIs)
  const restoreDefaultAIs = useStore((s) => s.restoreDefaultAIs)

  const [toast, setToast] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', url: 'https://', icon: '🤖' })
  const [pickOpen, setPickOpen] = useState(false)
  const pickRef = useRef(null)

  // 드롭다운 바깥 클릭 시 닫기
  useEffect(() => {
    if (!pickOpen) return
    const onDown = (e) => {
      if (pickRef.current && !pickRef.current.contains(e.target)) setPickOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [pickOpen])

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

  const onSubmitAdd = () => {
    const name = form.name.trim()
    let url = form.url.trim()
    if (!name || !url) return flash('이름과 URL을 입력하세요')
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url
    addAI({ name, url, icon: form.icon.trim() || '🤖' })
    setForm({ name: '', url: 'https://', icon: '🤖' })
    setShowAdd(false)
  }

  const onRemove = async () => {
    if (!current) return
    if (await uiConfirm({ title: 'AI 삭제', message: `"${current.name}" 를 목록에서 삭제할까요?`, danger: true }))
      removeAI(current.id)
  }

  const onRestoreDefaults = () => {
    const n = restoreDefaultAIs()
    flash(n ? `기본 AI ${n}개 복원됨` : '복원할 기본 AI가 없습니다')
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
          질의할 AI 선택
        </span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setShowAdd((v) => !v)}
            title="AI 추가"
            aria-label="AI 추가"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700"
          >
            ＋
          </button>
          <button
            onClick={onRestoreDefaults}
            title="기본 AI 복원 (빠진 기본 AI 되살리기)"
            aria-label="기본 AI 복원"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm hover:bg-slate-200 active:bg-slate-300 dark:hover:bg-slate-700"
          >
            ♻️
          </button>
          <button
            onClick={onRemove}
            title="선택한 AI 삭제"
            aria-label="선택한 AI 삭제"
            disabled={!current}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm hover:bg-red-100 active:bg-red-200 disabled:opacity-40 dark:hover:bg-red-900/40"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* AI 선택 (커스텀 드롭다운 — 실제 로고 표시) */}
      <div ref={pickRef} className="relative mb-2">
        <button
          onClick={() => setPickOpen((v) => !v)}
          className="flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-2 py-2 text-left text-sm text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        >
          {current ? (
            <>
              <AiIcon ai={current} />
              <span className="min-w-0 flex-1 truncate">{current.name}</span>
            </>
          ) : (
            <span className="flex-1 text-slate-400">AI 없음 — ＋로 추가</span>
          )}
          <span className="text-slate-400">▾</span>
        </button>
        {pickOpen && ais.length > 0 && (
          <div className="absolute bottom-full left-0 z-20 mb-1 max-h-60 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900">
            {ais.map((ai) => (
              <button
                key={ai.id}
                onClick={() => {
                  setSelectedAiId(ai.id)
                  setPickOpen(false)
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm ${
                  ai.id === currentId
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-100'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <AiIcon ai={ai} />
                <span className="min-w-0 flex-1 truncate">{ai.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI 추가 폼 (이름 + URL + 아이콘 한 번에) */}
      {showAdd && (
        <div className="mb-2 space-y-1.5 rounded-lg border border-slate-200 p-2 dark:border-slate-700">
          <div className="flex gap-1.5">
            <TextInput
              value={form.icon}
              onChange={(v) => setForm((f) => ({ ...f, icon: v }))}
              placeholder="🤖"
              className="w-12 rounded border border-slate-300 bg-white px-2 py-1 text-center text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <TextInput
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              placeholder="이름 (예: MyAI)"
              className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <TextInput
            value={form.url}
            onChange={(v) => setForm((f) => ({ ...f, url: v }))}
            placeholder="채팅 페이지 URL (https://...)"
            className="w-full rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            ※ 로그인해서 붙여넣기 할 수 있는 AI 채팅 페이지 주소여야 합니다.
          </p>
          <div className="flex gap-1.5">
            <button
              onClick={onSubmitAdd}
              className="flex-1 rounded-lg bg-blue-600 py-1.5 text-xs font-medium text-white"
            >
              추가
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-slate-300 px-3 text-xs dark:border-slate-600 dark:text-slate-300"
            >
              취소
            </button>
          </div>
        </div>
      )}

      <p className="mb-1 text-[11px] text-slate-500 dark:text-slate-400">
        하단 질문창의 AI 칩으로도 빠르게 선택할 수 있어요
      </p>

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
