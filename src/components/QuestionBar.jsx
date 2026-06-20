import { useState } from 'react'
import { useStore } from '../store'
import TextInput from './ui/TextInput'
import AiIcon from './ui/AiIcon'

// 하단 질의 바: AI 칩 선택 + 질문 입력 + 보내기 + 범위.
// AI 선택을 여기서 바로 할 수 있어 사이드바를 열 필요가 없다(사이드바는 AI 관리용).
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
  const setSidebar = useStore((s) => s.setSidebar)

  const [busy, setBusy] = useState(false)
  const currentId = selectedAiId && ais.some((a) => a.id === selectedAiId) ? selectedAiId : ais[0]?.id
  const current = ais.find((a) => a.id === currentId)

  const onSend = async () => {
    if (!current) return
    setBusy(true)
    try {
      const res = await sendQuestion(current)
      if (!res.opened && res.copied) {
        notify(`팝업 차단됨 — 코드는 복사됨. ${current.name} 직접 열어 붙여넣기`)
      } else if (!res.opened) {
        notify(`${current.name} 열기 차단됨 — 팝업 허용 후 다시`)
      } else if (res.copied) {
        notify(`${current.name} 열림 — 채팅창에 길게 눌러 붙여넣기 📋`)
      } else {
        notify(`${current.name} 열림 (복사 실패: 수동 복사 필요)`)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 safe-bottom">
      {/* 드래그 핸들 */}
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
          {busy ? <span className="animate-spin">↻</span> : current && <AiIcon ai={current} size={18} />}
          <span>{busy ? '처리 중…' : '보내기'}</span>
        </button>
      </div>

      {/* 선택 AI(탭하면 사이드바에서 변경) + 질문 범위 — 한 줄로 공간 절약 */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-3 py-2 text-xs text-slate-600 dark:text-slate-400">
        <button
          onClick={() => setSidebar(true)}
          className="flex items-center gap-1 rounded text-slate-500 active:opacity-70 dark:text-slate-300"
          title="AI 변경 (사이드바)"
        >
          {current ? (
            <>
              <AiIcon ai={current} size={14} />
              <span>{current.name}</span>
              <span className="text-slate-400">▾</span>
            </>
          ) : (
            <span className="text-amber-500">AI 선택 ▾</span>
          )}
        </button>
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
