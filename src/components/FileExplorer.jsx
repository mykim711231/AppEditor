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
import TextInput from './ui/TextInput'

// 한 부모(parentId) 아래의 형제 노드 목록을 정렬 가능한 리스트로 렌더
function NodeList({ parentId, depth }) {
  const nodes = useStore((s) => s.nodes)
  const reorderNodes = useStore((s) => s.reorderNodes)

  const siblings = nodes
    .filter((n) => n.parentId === parentId)
    .sort((a, b) => a.order - b.order)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } })
  )

  const onDragEnd = (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const ids = siblings.map((n) => n.id)
    const oldIdx = ids.indexOf(active.id)
    const newIdx = ids.indexOf(over.id)
    if (oldIdx === -1 || newIdx === -1) return
    const next = arrayMove(ids, oldIdx, newIdx)
    reorderNodes(parentId, next)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={siblings.map((n) => n.id)} strategy={verticalListSortingStrategy}>
        {siblings.map((node) => (
          <NodeRow key={node.id} node={node} depth={depth} />
        ))}
      </SortableContext>
    </DndContext>
  )
}

function NodeRow({ node, depth }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: node.id,
  })
  const activeTab = useStore((s) => s.activeTab)
  const openFile = useStore((s) => s.openFile)
  const toggleFolder = useStore((s) => s.toggleFolder)
  const renameNode = useStore((s) => s.renameNode)
  const deleteNode = useStore((s) => s.deleteNode)
  const createFile = useStore((s) => s.createFile)
  const createFolder = useStore((s) => s.createFolder)

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(node.name)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    paddingLeft: depth * 12 + 6,
  }

  const isFolder = node.type === 'folder'
  const active = node.id === activeTab

  const onRowClick = () => {
    if (editing) return
    if (isFolder) toggleFolder(node.id)
    else openFile(node.id)
  }

  const commitRename = () => {
    const trimmed = name.trim()
    if (trimmed && trimmed !== node.name) renameNode(node.id, trimmed)
    else setName(node.name)
    setEditing(false)
  }

  const onDelete = async (e) => {
    e.stopPropagation()
    const label = isFolder ? '폴더와 하위 모든 파일' : '파일'
    if (await uiConfirm({ title: '삭제', message: `"${node.name}" ${label}을(를) 삭제할까요?`, danger: true }))
      deleteNode(node.id)
  }

  const onAddChild = async (e, type) => {
    e.stopPropagation()
    const def = type === 'file' ? '새파일.js' : '새폴더'
    const input = await uiPrompt({
      title: type === 'file' ? '새 파일' : '새 폴더',
      defaultValue: def,
    })
    if (input && input.trim()) {
      if (type === 'file') createFile(input.trim(), node.id)
      else createFolder(input.trim(), node.id)
    }
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div
        onClick={onRowClick}
        className={`group flex items-center gap-1 rounded py-1 pr-1 text-sm ${
          active
            ? 'bg-blue-100 text-blue-900 dark:bg-blue-900/40 dark:text-blue-100'
            : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
        }`}
      >
        {/* 드래그 핸들 */}
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab touch-none px-0.5 text-slate-300 dark:text-slate-600"
          onClick={(e) => e.stopPropagation()}
          aria-label="드래그하여 순서 변경"
        >
          ⠿
        </span>
        <span className="w-4 text-center">
          {isFolder ? (node.expanded ? '📂' : '📁') : '📄'}
        </span>
        {editing ? (
          <TextInput
            autoFocus
            value={name}
            onChange={setName}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename()
              if (e.key === 'Escape') {
                setName(node.name)
                setEditing(false)
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="min-w-0 flex-1 rounded border border-blue-400 bg-white px-1 py-0.5 text-sm text-slate-900 outline-none dark:bg-slate-900 dark:text-white"
          />
        ) : (
          <span className="min-w-0 flex-1 truncate">{node.name}</span>
        )}

        {/* 행 액션 버튼 (터치 기기에서는 항상 표시) */}
        <div className="flex shrink-0 items-center gap-0.5 opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
          {isFolder && (
            <>
              <button
                title="파일 추가"
                onClick={(e) => onAddChild(e, 'file')}
                className="rounded px-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                ＋📄
              </button>
              <button
                title="폴더 추가"
                onClick={(e) => onAddChild(e, 'folder')}
                className="rounded px-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                ＋📁
              </button>
            </>
          )}
          <button
            title="이름 변경"
            onClick={(e) => {
              e.stopPropagation()
              setEditing(true)
            }}
            className="rounded px-1 text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ✏️
          </button>
          <button
            title="삭제"
            onClick={onDelete}
            className="rounded px-1 text-xs hover:bg-red-100 dark:hover:bg-red-900/40"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* 폴더 펼침 시 하위 렌더 */}
      {isFolder && node.expanded && <NodeList parentId={node.id} depth={depth + 1} />}
    </div>
  )
}

export default function FileExplorer() {
  const createFile = useStore((s) => s.createFile)
  const createFolder = useStore((s) => s.createFolder)
  const toggleSidebar = useStore((s) => s.toggleSidebar)

  const onNewFile = async () => {
    const name = await uiPrompt({ title: '새 파일', message: '확장자 포함', defaultValue: '새파일.js' })
    if (name && name.trim()) createFile(name.trim(), null)
  }
  const onNewFolder = async () => {
    const name = await uiPrompt({ title: '새 폴더', defaultValue: '새폴더' })
    if (name && name.trim()) createFolder(name.trim(), null)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-1 border-b border-slate-200 px-1.5 py-1.5 dark:border-slate-700">
        {/* VSCode식: 사이드 메뉴 상단 왼쪽 접기 버튼 */}
        <button
          onClick={toggleSidebar}
          title="사이드바 접기 (Cmd+B)"
          className="rounded px-1.5 py-0.5 text-base leading-none text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
          aria-label="사이드바 접기"
        >
          «
        </button>
        <span className="flex-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          탐색기
        </span>
        <div className="flex gap-1">
          <button
            onClick={onNewFile}
            title="새 파일"
            className="rounded px-1.5 py-0.5 text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            📄＋
          </button>
          <button
            onClick={onNewFolder}
            title="새 폴더"
            className="rounded px-1.5 py-0.5 text-sm hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            📁＋
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-1">
        <NodeList parentId={null} depth={0} />
      </div>
    </div>
  )
}
