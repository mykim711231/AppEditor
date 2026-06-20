import { useState } from 'react'
import { useStore } from '../store'
import TextInput from './ui/TextInput'
import AiIcon from './ui/AiIcon'

// 하단 질의 바: 질문 입력 + 범위(라디오) + 보내기.
// AI 선택은 사이드바(AISelector)에서 미리 고르고, 여기서 그 AI로 전송한다.
export default function QuestionBar() {
  const aiQuestion = useStore((s) => s.aiQuestion)
  const setAiQuestion = useStore((s) => s.setAiQuestion)
  const aiScope = useStore((s) => s.aiScope)
  const setAiScope = useStore((s) => s.setAiScope)
  const codeSelection = useStore((s) => s.codeSelection)
  const barsHidden = useStore((s) => s.barsHidden)
  const setAiPanel = useStore((s) => s.setAiPanel)
  const ais = useStore((s) => s.ais)
  const selectedAiId = useStore((s) => s.selectedAiId)
  const sendQuestion = useStore((s) => s.sendQuestion)
  const notify = useStore((s) => s.notify)

  const [busy, setBusy] = useState(false)
  const current = ais.find((a) => a.id === selectedAiId) || ais[0]

  const onSend = async () => {
    if (!current) return
    setBusy(true)
    try {
      const res = await sendQuestion(current)
      notify(
        !res.opened
          ? `${current.name} 열기 차단됨 — 팝업 허용 후 다시`
          : res.copied
            ? `${current.name} 열림 · 코드+질문 복사됨`
            : `${current.name} 열림 (복사 실패: 수동 복사)`
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 safe-bottom">
      {/* 드래그 핸들: 스와이프 가능 표시 + 집중 모드에선 탭하면 닫힘 */}
      <button
        onClick={() => barsHidden && setAiPanel(false)}
        className="flex w-full justify-center py-1.5"
        title={barsHidden ? 'AI 질의 닫기 (또는 아래로 스와이프)' : '위/아래로 스와이프하여 표시·숨김'}
        aria-label="질의 바 핸들"
      >
        <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
      </button>

      {/* 질문 입력 + 보내기 */}
      <div className="flex items-end gap-2 px-2">
        <TextInput
          multiline
          rows={2}
          value={aiQuestion}
          onChange={setAiQuestion}
          placeholder="AI에게 보낼 질문을 입력하세요 (여러 줄 가능)"
          className="max-h-40 min-h-[2.75rem] min-w-0 flex-1 resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
        <button
          onClick={onSend}
          disabled={busy || !current}
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-sm font-medium text-white active:scale-95 disabled:opacity-50"
          title={current ? `${current.name} 로 보내기` : 'AI를 먼저 선택하세요'}
        >
          {current && <AiIcon ai={current} size={18} />}
          <span>보내기</span>
        </button>
      </div>

      {/* 선택된 AI + 질문 범위 */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-xs text-slate-600 dark:text-slate-400">
        {current ? (
          <span className="flex items-center gap-1 text-slate-500">
            <AiIcon ai={current} size={14} />
            {current.name}
          </span>
        ) : (
          <span className="text-amber-500">사이드바에서 AI를 추가/선택하세요</span>
        )}
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="scope"
            checked={aiScope === 'selection'}
            onChange={() => setAiScope('selection')}
          />
          선택한 코드만
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="scope"
            checked={aiScope === 'all'}
            onChange={() => setAiScope('all')}
          />
          전체 코드
        </label>
        {aiScope === 'selection' && codeSelection && (
          <span className="text-blue-500">({codeSelection.length}자 선택됨)</span>
        )}
        {aiScope === 'selection' && !codeSelection && (
          <span className="text-amber-500">⚠️ 선택 없음 → 전체 파일</span>
        )}
      </div>
    </div>
  )
}
