import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import Modal from './Modal'
import { useStore } from '../store'
import TextInput from './ui/TextInput'
import { DOC_LINKS } from '../lib/docLinks'

// 언어·기술 공식 문서 검색 → 새 탭으로 열기
export default function DocsModal() {
  const closeModal = useStore((s) => s.closeModal)
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return DOC_LINKS
    return DOC_LINKS.filter(
      (d) => d.name.toLowerCase().includes(query) || (d.kw || '').toLowerCase().includes(query)
    )
  }, [q])

  const host = (url) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '')
    } catch {
      return ''
    }
  }

  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer')

  return (
    <Modal title="언어 공식 문서" onClose={closeModal}>
      <div className="space-y-2 text-sm">
        <TextInput
          value={q}
          onChange={setQ}
          autoFocus
          placeholder="언어/기술 검색 (예: python, 정규식, sql)"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />

        {results.length === 0 && (
          <p className="py-4 text-center text-xs text-slate-400">검색 결과가 없습니다.</p>
        )}

        <div className="max-h-[60vh] space-y-1 overflow-y-auto">
          {results.map((d) => (
            <button
              key={d.name}
              onClick={() => open(d.url)}
              className="flex w-full items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-left hover:bg-slate-50 active:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-slate-700 dark:text-slate-200">{d.name}</span>
                <span className="block truncate text-[11px] text-slate-400">{host(d.url)}</span>
              </span>
              <ExternalLink size={16} className="shrink-0 text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}
