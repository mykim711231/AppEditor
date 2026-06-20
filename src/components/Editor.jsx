import { useEffect, useMemo, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import { useStore } from '../store'
import { loadLanguageExtension } from '../lib/languages'

// 디바운스 자동 저장
function useDebouncedSave(id) {
  const updateContent = useStore((s) => s.updateContent)
  const timer = useRef(null)
  return (value) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => updateContent(id, value), 400)
  }
}

export default function Editor({ onSelectionChange }) {
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const settings = useStore((s) => s.settings)
  const file = nodes.find((n) => n.id === activeTab)
  const save = useDebouncedSave(activeTab)
  const [langExt, setLangExt] = useState(null)
  const viewRef = useRef(null)

  // 언어 자동 감지 (확장자 기준 비동기 로드)
  useEffect(() => {
    let alive = true
    setLangExt(null)
    if (file) {
      loadLanguageExtension(file.name).then((ext) => {
        if (alive) setLangExt(ext)
      })
    }
    return () => {
      alive = false
    }
  }, [file?.id, file?.name])

  // 폰트 설정 반영
  useEffect(() => {
    document.documentElement.style.setProperty('--editor-font', `'${settings.font}'`)
    document.documentElement.style.setProperty('--editor-fontsize', `${settings.fontSize}px`)
  }, [settings.font, settings.fontSize])

  const extensions = useMemo(() => {
    const exts = [
      EditorView.lineWrapping,
      EditorView.updateListener.of((u) => {
        if (u.selectionSet || u.docChanged) {
          const sel = u.state.selection.main
          const selected = u.state.sliceDoc(sel.from, sel.to)
          onSelectionChange?.(selected)
        }
      }),
    ]
    if (langExt) exts.push(langExt)
    return exts
  }, [langExt, onSelectionChange])

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-500">
        <div className="text-center px-6">
          <div className="text-5xl mb-3">📝</div>
          <p className="text-sm">열린 파일이 없습니다.</p>
          <p className="text-xs mt-1">왼쪽 파일 목록에서 파일을 선택하거나 새로 만드세요.</p>
        </div>
      </div>
    )
  }

  return (
    <CodeMirror
      key={file.id}
      value={file.content}
      theme={settings.theme === 'dark' ? oneDark : 'light'}
      extensions={extensions}
      onChange={save}
      onCreateEditor={(view) => {
        viewRef.current = view
      }}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLine: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        foldGutter: true,
        highlightSelectionMatches: true,
        searchKeymap: true,
      }}
      height="100%"
      style={{ height: '100%' }}
    />
  )
}
