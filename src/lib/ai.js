// 기본 제공 AI 목록 (PRD 2-4)
export const DEFAULT_AIS = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/new', icon: '🟣' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: '🟢' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/app', icon: '🔵' },
  { id: 'qwen', name: 'Qwen', url: 'https://chat.qwen.ai/', icon: '🟠' },
  { id: 'kimi', name: 'Kimi', url: 'https://kimi.moonshot.cn/', icon: '🌙' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', icon: '🐳' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com/', icon: '❌' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/', icon: '🔮' },
  { id: 'mistral', name: 'Le Chat', url: 'https://chat.mistral.ai/chat', icon: '🐈' },
]

// 코드+질문을 클립보드에 복사하고 AI 사이트를 새 탭으로 연다.
// PRD 2-4 동작 방식: 클립보드 자동 복사 → 새 탭 → 붙여넣기
export async function sendToAI(ai, { question, code, scope }) {
  const parts = []
  if (question && question.trim()) parts.push(question.trim())
  if (code && code.trim()) {
    parts.push('')
    parts.push('```')
    parts.push(code)
    parts.push('```')
  }
  const payload = parts.join('\n')

  let copied = false
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(payload)
      copied = true
    }
  } catch {
    copied = false
  }

  // 클립보드 API 실패 시 폴백 (구형 Safari 등)
  if (!copied) {
    copied = legacyCopy(payload)
  }

  // 새 탭으로 AI 사이트 열기
  window.open(ai.url, '_blank', 'noopener,noreferrer')

  return { copied, payload, scope }
}

function legacyCopy(text) {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}
