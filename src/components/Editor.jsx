import { useEffect, useMemo, useRef, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView, rectangularSelection, crosshairCursor } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { lintGutter } from '@codemirror/lint'
import { useStore } from '../store'
import { loadLanguageExtension } from '../lib/languages'
import { codeLinter } from '../lib/lint'
import EditorToolbar from './EditorToolbar'

// 찾기·바꾸기 패널 한국어화
const koreanPhrases = EditorState.phrases.of({
  'Go to line': '줄 이동',
  go: '이동',
  Find: '찾기',
  Replace: '바꾸기',
  next: '다음',
  previous: '이전',
  all: '전체',
  'match case': '대소문자 구분',
  'by word': '단어 단위',
  regexp: '정규식',
  replace: '바꾸기',
  'replace all': '모두 바꾸기',
  close: '닫기',
  'current match': '현재 일치',
  'replaced $ matches': '$개 바꿈',
  'replaced match on line $': '$줄에서 바꿈',
  'on line': '줄:',
})

export default function Editor({ onSelectionChange }) {
  const nodes = useStore((s) => s.nodes)
  const activeTab = useStore((s) => s.activeTab)
  const settings = useStore((s) => s.settings)
  const updateContent = useStore((s) => s.updateContent)
  const createFile = useStore((s) => s.createFile)
  const file = nodes.find((n) => n.id === activeTab)
  const [langExt, setLangExt] = useState(null)
  const viewRef = useRef(null)

  // 디바운스 자동 저장 + 미저장분 flush (탭 전환/앱 백그라운드 시 유실 방지)
  const pending = useRef({ id: null, value: null })
  const timer = useRef(null)

  const flush = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
    const { id, value } = pending.current
    if (id != null && value != null) {
      updateContent(id, value)
      pending.current = { id: null, value: null }
    }
  }

  const save = (id, value) => {
    pending.current = { id, value }
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(flush, 400)
  }

  // 앱이 백그라운드로 가거나 종료될 때 즉시 저장
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === 'hidden') flush()
    }
    window.addEventListener('visibilitychange', onHide)
    window.addEventListener('pagehide', flush)
    return () => {
      window.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('pagehide', flush)
      flush() // 언마운트 시(탭 전환 포함)에도 flush
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      koreanPhrases,
      // 열(블록) 편집: Alt+드래그 사각 선택 (데스크톱/DeX)
      rectangularSelection(),
      crosshairCursor(),
      // 언어별 문법/규칙 검증 (JSON 정밀 · JS ESLint · Python 들여쓰기 · 그 외 구문)
      lintGutter(),
      codeLinter,
      // iOS 자동수정/자동대문자/맞춤법 비활성 (코드 입력 방해 방지)
      EditorView.contentAttributes.of({
        autocorrect: 'off',
        autocapitalize: 'none',
        spellcheck: 'false',
      }),
      EditorView.updateListener.of((u) => {
        if (u.selectionSet || u.docChanged) {
          const sel = u.state.selection.main
          // 선택이 비어있으면(포커스 이동 등) 기존 선택을 지우지 않고 유지
          if (sel.from !== sel.to) {
            onSelectionChange?.(u.state.sliceDoc(sel.from, sel.to))
          }
        }
      }),
    ]
    if (langExt) exts.push(langExt)
    return exts
  }, [langExt, onSelectionChange])

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-400">
        <div className="px-6 text-center">
          <div className="mb-3 text-5xl">📝</div>
          <p className="text-sm">열린 파일이 없습니다.</p>
          <p className="mt-1 text-xs text-slate-400">사이드바(▭)에서 파일을 선택하거나 새로 만드세요.</p>
          <button
            onClick={async () => {
              const { uiPrompt } = await import('../store')
              const name = await uiPrompt({ title: '새 파일', message: '확장자 포함', defaultValue: '새파일.js' })
              if (name && name.trim()) createFile(name.trim(), null)
            }}
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white active:scale-95"
          >
            📄 새 파일 만들기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <EditorToolbar viewRef={viewRef} />
      <div className="min-h-0 flex-1">
        <CodeMirror
          key={file.id}
          value={file.content}
          theme={settings.theme === 'dark' ? oneDark : 'light'}
          extensions={extensions}
          onChange={(value) => save(file.id, value)}
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
      </div>
    </div>
  )
}
