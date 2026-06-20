import { useStore } from '../store'
import TextInput from './ui/TextInput'

// 하단 질의 바: 질문 입력 + 질문 범위(라디오). 현재 위치 유지.
// AI 선택/전송은 사이드바의 AISelector 로 분리됨.
export default function QuestionBar() {
  const aiQuestion = useStore((s) => s.aiQuestion)
  const setAiQuestion = useStore((s) => s.setAiQuestion)
  const aiScope = useStore((s) => s.aiScope)
  const setAiScope = useStore((s) => s.setAiScope)
  const codeSelection = useStore((s) => s.codeSelection)
  const barsHidden = useStore((s) => s.barsHidden)
  const setAiPanel = useStore((s) => s.setAiPanel)

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

      {/* 질문 입력 (멀티라인) */}
      <div className="px-2">
        <TextInput
          multiline
          rows={2}
          value={aiQuestion}
          onChange={setAiQuestion}
          placeholder="AI에게 보낼 질문을 입력하세요 (여러 줄 가능)"
          className="max-h-40 min-h-[2.5rem] w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        />
      </div>

      {/* 질문 범위 (라디오) */}
      <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-600 dark:text-slate-400">
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
          <span className="text-amber-500">⚠️ 선택 없음 → 전체 파일 전송</span>
        )}
        <span className="ml-auto text-slate-400">AI 선택 → 사이드바</span>
      </div>
    </div>
  )
}
