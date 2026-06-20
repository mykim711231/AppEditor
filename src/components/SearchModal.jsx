import { useMemo, useState } from 'react'
import Modal from './Modal'
import { useStore } from '../store'
import TextInput from './ui/TextInput'

// 전체 파일 검색: 파일명 + 내용. 결과 클릭 시 해당 파일 열기.
// (파일 내 검색은 에디터에서 Cmd/Ctrl+F 로 별도 지원)
export default function SearchModal() {
  const nodes = useStore((s) => s.nodes)
  const openFile = useStore((s) => s.openFile)
  const closeModal = useStore((s) => s.closeModal)
  const [q, setQ] = useState('')

  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (!query) return []
    const files = nodes.filter((n) => n.type === 'file')
    const out = []
    for (const f of files) {
      const nameHit = f.name.toLowerCase().includes(query)
      const content = f.content || ''
      const lines = content.split('\n')
      const matches = []
      lines.forEach((line, i) => {
        if (line.toLowerCase().includes(query) && matches.length < 3) {
          matches.push({ line: i + 1, text: line.trim().slice(0, 120) })
        }
      })
      if (nameHit || matches.length) {
        out.push({ file: f, nameHit, matches, count: matches.length })
      }
      if (out.length >= 50) break
    }
    return out
  }, [q, nodes])

  const onOpen = (id) => {
    openFile(id)
    closeModal()
  }

  return (
    <Modal title="검색" onClose={closeModal}>
      <div className="space-y-2 text-sm">
        <TextInput
          value={q}
          onChange={setQ}
          autoFocus
          placeholder="파일명 또는 코드 내용 검색"
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />

        {q.trim() && results.length === 0 && (
          <p className="py-4 text-center text-xs text-slate-400">검색 결과가 없습니다.</p>
        )}

        <div className="space-y-1">
          {results.map(({ file, nameHit, matches }) => (
            <div
              key={file.id}
              className="rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <button
                onClick={() => onOpen(file.id)}
                className="flex w-full items-center gap-2 px-2 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <span>📄</span>
                <span
                  className={`min-w-0 flex-1 truncate ${
                    nameHit ? 'font-semibold text-blue-600 dark:text-blue-300' : 'text-slate-700 dark:text-slate-200'
                  }`}
                >
                  {file.name}
                </span>
                {matches.length > 0 && (
                  <span className="shrink-0 text-xs text-slate-400">{matches.length}건</span>
                )}
              </button>
              {matches.map((m) => (
                <button
                  key={m.line}
                  onClick={() => onOpen(file.id)}
                  className="block w-full truncate border-t border-slate-100 px-3 py-1 text-left font-mono text-[11px] text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <span className="mr-2 text-slate-400">{m.line}</span>
                  {m.text}
                </button>
              ))}
            </div>
          ))}
        </div>

        <p className="pt-1 text-[11px] text-slate-400">
          ※ 파일 내 찾기·바꾸기는 에디터에서 Cmd/Ctrl+F 로 사용하세요.
        </p>
      </div>
    </Modal>
  )
}
