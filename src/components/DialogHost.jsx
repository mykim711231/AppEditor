import { useEffect, useState } from 'react'
import { useStore } from '../store'
import TextInput from './ui/TextInput'

// 인앱 prompt/confirm/alert 렌더러 (네이티브 다이얼로그는 설치형 PWA에서 차단됨)
export default function DialogHost() {
  const dialog = useStore((s) => s.dialog)
  const resolveDialog = useStore((s) => s.resolveDialog)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (dialog?.kind === 'prompt') setValue(dialog.defaultValue || '')
  }, [dialog])

  if (!dialog) return null

  const isPrompt = dialog.kind === 'prompt'
  const isConfirm = dialog.kind === 'confirm'
  const isAlert = dialog.kind === 'alert'

  const cancel = () => resolveDialog(isPrompt ? null : false)
  const ok = () => resolveDialog(isPrompt ? value : true)

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={cancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {dialog.title && (
          <h3 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
            {dialog.title}
          </h3>
        )}
        {dialog.message && (
          <p className="mb-3 whitespace-pre-line text-sm text-slate-600 dark:text-slate-300">
            {dialog.message}
          </p>
        )}

        {isPrompt && (
          <TextInput
            value={value}
            onChange={setValue}
            placeholder={dialog.placeholder}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') ok()
              if (e.key === 'Escape') cancel()
            }}
            className="mb-3 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        )}

        <div className="flex justify-end gap-2">
          {!isAlert && (
            <button
              onClick={cancel}
              className="min-h-[44px] rounded-lg px-4 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              취소
            </button>
          )}
          <button
            onClick={ok}
            className={`min-h-[44px] rounded-lg px-4 text-sm font-medium text-white ${
              isConfirm && dialog.danger ? 'bg-red-600' : 'bg-blue-600'
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
