import { useEffect, useMemo, useRef } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { useStore } from '../store'

// 마크다운 미리보기 (DOMPurify 살균 + Mermaid 다이어그램 지원)
export default function MarkdownView({ content }) {
  const theme = useStore((s) => s.settings.theme)
  const ref = useRef(null)

  const html = useMemo(() => {
    const raw = marked.parse(content || '', { breaks: true, gfm: true })
    // class 속성 유지 (language-mermaid 식별용)
    return DOMPurify.sanitize(raw, { ADD_ATTR: ['class'] })
  }, [content])

  // Mermaid 코드블록 렌더링 (mermaid 라이브러리는 필요할 때만 동적 로드)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const blocks = root.querySelectorAll('code.language-mermaid')
    if (!blocks.length) return

    let cancelled = false
    ;(async () => {
      const { default: mermaid } = await import('mermaid')
      if (cancelled) return
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: theme === 'dark' ? 'dark' : 'default',
      })
      const nodes = []
      blocks.forEach((code) => {
        const pre = code.closest('pre')
        const div = document.createElement('div')
        div.className = 'mermaid'
        div.textContent = code.textContent
        pre.replaceWith(div)
        nodes.push(div)
      })
      try {
        await mermaid.run({ nodes })
      } catch {
        /* 잘못된 다이어그램 문법은 mermaid가 자체 오류 표시 */
      }
    })()

    return () => {
      cancelled = true
    }
  }, [html, theme])

  return (
    <div className="h-full overflow-y-auto bg-white px-4 py-3 text-slate-800 dark:bg-slate-900 dark:text-slate-200">
      <div
        ref={ref}
        className="md-body mx-auto max-w-3xl"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
