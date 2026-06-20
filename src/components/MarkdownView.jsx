import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// 마크다운 미리보기 (XSS 방지를 위해 DOMPurify로 살균)
export default function MarkdownView({ content }) {
  const html = useMemo(() => {
    const raw = marked.parse(content || '', { breaks: true, gfm: true })
    return DOMPurify.sanitize(raw)
  }, [content])

  return (
    <div className="h-full overflow-y-auto bg-white px-4 py-3 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <div className="md-body mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
