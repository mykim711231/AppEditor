import { useState } from 'react'

// AI 사이트의 실제 파비콘(로고)을 표시. 로드 실패 시 이모지로 폴백.
export function faviconUrl(url) {
  try {
    const host = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${host}&sz=64`
  } catch {
    return null
  }
}

export default function AiIcon({ ai, size = 18 }) {
  const [err, setErr] = useState(false)
  const src = !err && ai?.url ? faviconUrl(ai.url) : null
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        onError={() => setErr(true)}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-sm"
      />
    )
  }
  return (
    <span className="shrink-0" style={{ fontSize: size - 2, lineHeight: 1 }}>
      {ai?.icon || '🤖'}
    </span>
  )
}
