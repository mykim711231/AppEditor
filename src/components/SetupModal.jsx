import { useState } from 'react'
import { Terminal, ClipboardCopy, FileInput } from 'lucide-react'
import Modal from './Modal'
import { useStore } from '../store'
import { SETUP_GUIDES } from '../lib/setupGuides'
import { insertSnippet, hasEditor } from '../lib/editorRef'

// 언어별 설치·실행 (Windows PowerShell / WSL bash) 참조 + 복사/삽입
export default function SetupModal() {
  const closeModal = useStore((s) => s.closeModal)
  const notify = useStore((s) => s.notify)
  const [langKey, setLangKey] = useState(SETUP_GUIDES[0].key)
  const [env, setEnv] = useState('powershell') // 'powershell' | 'wsl'

  const lang = SETUP_GUIDES.find((l) => l.key === langKey) || SETUP_GUIDES[0]

  const onCopy = async (cmd) => {
    try {
      await navigator.clipboard.writeText(cmd)
      notify('복사됨', 'success')
    } catch {
      notify('복사 실패 — 길게 눌러 복사하세요', 'error')
    }
  }
  const onInsert = (cmd) => {
    if (!hasEditor()) {
      notify('먼저 파일을 열어주세요', 'warn')
      return
    }
    insertSnippet(cmd)
    notify('에디터에 삽입됨', 'success')
  }

  const envBtn = (key, label) => (
    <button
      onClick={() => setEnv(key)}
      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium ${
        env === key
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300'
      }`}
    >
      {label}
    </button>
  )

  return (
    <Modal title="설치 & 실행" onClose={closeModal}>
      <div className="space-y-3 text-sm">
        <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Terminal size={14} /> 언어 → 환경 선택 후 명령을 복사하거나 에디터에 삽입하세요.
        </p>

        {/* 언어 선택 */}
        <div className="flex flex-wrap gap-1.5">
          {SETUP_GUIDES.map((l) => (
            <button
              key={l.key}
              onClick={() => setLangKey(l.key)}
              className={`rounded-full border px-3 py-1.5 text-xs ${
                l.key === langKey
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300'
              }`}
            >
              {l.lang}
            </button>
          ))}
        </div>

        {lang.version && (
          <p className="text-[11px] text-slate-400">기준: {lang.version}</p>
        )}

        {/* 환경 토글 */}
        <div className="flex gap-2">
          {envBtn('powershell', '🪟 Windows PowerShell')}
          {envBtn('wsl', '🐧 WSL bash')}
        </div>

        {/* 단계 목록 */}
        <div className="space-y-2">
          {lang.steps.map((step) => {
            const cmd = step[env]
            return (
              <div key={step.title} className="rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{step.title}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => onCopy(cmd)}
                      title="복사"
                      aria-label="복사"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 active:bg-slate-300 dark:text-slate-400 dark:hover:bg-slate-700"
                    >
                      <ClipboardCopy size={15} />
                    </button>
                    <button
                      onClick={() => onInsert(cmd)}
                      title="에디터에 삽입"
                      aria-label="에디터에 삽입"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-blue-500 hover:bg-blue-100 active:bg-blue-200 dark:hover:bg-blue-900/40"
                    >
                      <FileInput size={15} />
                    </button>
                  </div>
                </div>
                <pre className="overflow-auto rounded-b-lg bg-slate-100 px-2 py-1.5 font-mono text-[11px] leading-snug text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  {cmd}
                </pre>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}
