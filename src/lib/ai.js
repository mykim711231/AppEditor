// 기본 제공 AI 목록 (PRD 2-4)
// android: 안드로이드 앱 패키지명 (있으면 앱 우선 실행, 없으면 브라우저 폴백)
export const DEFAULT_AIS = [
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/new', icon: '🟣', android: 'com.anthropic.claude' },
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: '🟢', android: 'com.openai.chatgpt' },
  { id: 'gemini', name: 'Gemini', url: 'https://gemini.google.com/app', icon: '🔵', android: 'com.google.android.apps.bard' },
  { id: 'qwen', name: 'Qwen', url: 'https://chat.qwen.ai/', icon: '🟠' },
  { id: 'kimi', name: 'Kimi', url: 'https://kimi.moonshot.cn/', icon: '🌙' },
  { id: 'deepseek', name: 'DeepSeek', url: 'https://chat.deepseek.com/', icon: '🐳', android: 'com.deepseek.chat' },
  { id: 'grok', name: 'Grok', url: 'https://grok.com/', icon: '❌' },
  { id: 'perplexity', name: 'Perplexity', url: 'https://www.perplexity.ai/', icon: '🔮', android: 'ai.perplexity.app' },
  { id: 'mistral', name: 'Le Chat', url: 'https://chat.mistral.ai/chat', icon: '🐈' },
]

const isAndroid = () => /Android/i.test(navigator.userAgent || '')

// 안드로이드 intent URL: 앱 우선 실행 + 미설치 시 browser_fallback_url 로 폴백
function androidIntentUrl(ai) {
  if (!ai.android) return null
  try {
    const u = new URL(ai.url)
    const hostPath = u.host + u.pathname + u.search
    return (
      `intent://${hostPath}#Intent;scheme=https;package=${ai.android};` +
      `S.browser_fallback_url=${encodeURIComponent(ai.url)};end`
    )
  } catch {
    return null
  }
}

function buildPayload({ question, code }) {
  const parts = []
  if (question && question.trim()) parts.push(question.trim())
  if (code && code.trim()) {
    parts.push('', '```', code, '```')
  }
  return parts.join('\n')
}

// 코드+질문을 클립보드에 복사하고 AI(앱 우선 → 브라우저)로 연다.
// 중요: window.open 은 반드시 await 이전(사용자 제스처 틱)에 동기 호출해야
// iOS/안드로이드에서 팝업 차단되지 않는다.
export async function sendToAI(ai, { question, code, scope }) {
  const payload = buildPayload({ question, code })

  // 1) 먼저 새 탭/앱 열기 (동기) — 안드로이드는 intent(앱 우선)
  const intent = isAndroid() ? androidIntentUrl(ai) : null
  let win
  if (intent) {
    // intent 는 noopener 옵션 없이 열어야 Chrome 이 앱 핸들러로 넘긴다
    win = window.open(intent, '_blank')
  } else {
    win = window.open(ai.url, '_blank', 'noopener,noreferrer')
  }
  const opened = !!win || !!intent // intent 는 null 반환해도 핸들러가 처리하는 경우 있음

  // 2) 그 다음 클립보드 복사 (비동기)
  let copied = false
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(payload)
      copied = true
    }
  } catch {
    copied = false
  }
  if (!copied) copied = legacyCopy(payload)

  return { opened, copied, payload, scope }
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
