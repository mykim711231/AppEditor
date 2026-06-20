import { useState } from 'react'
import { Database, ClipboardCopy, FileInput, ChevronRight, ChevronDown } from 'lucide-react'
import Modal from './Modal'
import { useStore } from '../store'
import { ORACLE_TEMPLATES } from '../lib/oracleTemplates'
import { insertSnippet, hasEditor } from '../lib/editorRef'

// Orange for Oracle 스타일 템플릿 브라우저
// 항목을 펼쳐 코드를 "보기"하고, 버튼으로 "복사" 또는 "에디터에 삽입" 둘 다 지원
export default function OracleModal() {
  const closeModal = useStore((s) => s.closeModal)
  const notify = useStore((s) => s.notify)
  const [cat, setCat] = useState(ORACLE_TEMPLATES[0].key)
  const [openItem, setOpenItem] = useState(null)

  const current = ORACLE_TEMPLATES.find((c) => c.key === cat) || ORACLE_TEMPLATES[0]

  const onInsert = (item) => {
    if (!hasEditor()) {
      notify('먼저 파일을 열어주세요', 'warn')
      return
    }
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

  return (
    <Modal title="Oracle 23ai 템플릿" onClose={closeModal}>
      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Database size={14} /> 항목을 펼쳐 코드를 보고, 복사하거나 에디터에 삽입하세요.
        </p>

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

        {/* 항목 아코디언 */}
        <div className="space-y-1">
          {current.items.map((item) => {
            const expanded = openItem === item.name
            return (
              <div key={item.name} className="rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setOpenItem(expanded ? null : item.name)}
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
          })}
        </div>
      </div>
    </Modal>
  )
}
