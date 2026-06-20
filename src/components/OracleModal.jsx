import { useMemo, useState } from 'react'
import { Database, ClipboardCopy, FileInput, ChevronRight, ChevronDown, Search } from 'lucide-react'
import Modal from './Modal'
import { useStore } from '../store'
import TextInput from './ui/TextInput'
import { ORACLE_TEMPLATES } from '../lib/oracleTemplates'
import { insertSnippet, hasEditor } from '../lib/editorRef'

// Orange for Oracle 스타일 — 분류 탭 또는 검색 + 항목 펼쳐 보기/삽입/복사
export default function OracleModal() {
  const closeModal = useStore((s) => s.closeModal)
  const notify = useStore((s) => s.notify)
  const [cat, setCat] = useState(ORACLE_TEMPLATES[0].key)
  const [openItem, setOpenItem] = useState(null)
  const [q, setQ] = useState('')

  const current = ORACLE_TEMPLATES.find((c) => c.key === cat) || ORACLE_TEMPLATES[0]
  const query = q.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!query) return null
    const out = []
    ORACLE_TEMPLATES.forEach((c) => {
      c.items.forEach((it) => {
        if (it.name.toLowerCase().includes(query) || it.code.toLowerCase().includes(query))
          out.push({ cat: c.title.replace(' 정보보기', ''), item: it })
      })
    })
    return out
  }, [query])

  const onInsert = (item) => {
    if (!hasEditor()) return notify('먼저 파일을 열어주세요', 'warn')
    insertSnippet(item.code)
    notify(`삽입됨: ${item.name}`, 'success')
    closeModal()
  }
  const onCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.code)
      notify(`복사됨: ${item.name}`, 'success')
    } catch {
      notify('복사 실패 — 코드를 길게 눌러 복사하세요', 'error')
    }
  }

  const ItemRow = ({ item, badge, idKey }) => {
    const expanded = openItem === idKey
    return (
      <div className="rounded-lg border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setOpenItem(expanded ? null : idKey)}
          className="flex w-full items-center gap-1.5 px-2 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {expanded ? (
            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          ) : (
            <ChevronRight size={16} className="shrink-0 text-slate-400" />
          )}
          <span className="min-w-0 flex-1 truncate font-medium text-slate-700 dark:text-slate-200">
            {item.name}
          </span>
          {badge && (
            <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              {badge}
            </span>
          )}
        </button>
        {expanded && (
          <div className="border-t border-slate-100 p-2 dark:border-slate-800">
            <pre className="max-h-56 overflow-auto rounded-md bg-slate-100 p-2 font-mono text-[11px] leading-snug text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {item.code}
            </pre>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => onInsert(item)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-600 py-2 text-xs font-medium text-white active:scale-95"
              >
                <FileInput size={15} /> 에디터에 삽입
              </button>
              <button
                onClick={() => onCopy(item)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-xs text-slate-700 active:scale-95 dark:border-slate-600 dark:text-slate-200"
              >
                <ClipboardCopy size={15} /> 복사
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Modal title="Oracle 23ai 템플릿" onClose={closeModal}>
      <div className="space-y-3 text-sm">
        <p className="rounded-md bg-amber-50 px-2 py-1 text-[11px] text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
          기준 버전: <b>Oracle Database 23ai</b> — 버전에 따라 문법이 다를 수 있습니다.
        </p>

        {/* 검색 */}
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <TextInput
            value={q}
            onChange={(v) => {
              setQ(v)
              setOpenItem(null)
            }}
            placeholder="Oracle 템플릿 검색 (예: merge, json, index)…"
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-8 pr-3 text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {filtered ? (
          <div className="space-y-1">
            {filtered.length === 0 && (
              <p className="py-4 text-center text-xs text-slate-400">검색 결과가 없습니다.</p>
            )}
            {filtered.map(({ cat: catTitle, item }) => (
              <ItemRow key={catTitle + item.name} item={item} badge={catTitle} idKey={catTitle + item.name} />
            ))}
          </div>
        ) : (
          <>
            {/* 카테고리 탭 */}
            <div className="flex flex-wrap gap-1.5">
              {ORACLE_TEMPLATES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setCat(c.key)
                    setOpenItem(null)
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    c.key === cat
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300'
                  }`}
                >
                  {c.title.replace(' 정보보기', '')}
                </button>
              ))}
            </div>

            <div className="space-y-1">
              {current.items.map((item) => (
                <ItemRow key={item.name} item={item} idKey={item.name} />
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
