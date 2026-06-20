// Google Drive 연동 (API 키 불필요, OAuth 클라이언트 ID만 사용)
// - 일반 브라우저: GIS 팝업 토큰 플로우
// - 설치형 PWA(standalone): 팝업이 차단되므로 전체 페이지 리다이렉트(implicit) 플로우
// - 범위 drive.file: 이 앱이 만든 파일만 접근

const SCOPE = 'https://www.googleapis.com/auth/drive.file'
const BACKUP_NAME = 'appeditor-backup.json'
const SS_TOKEN = 'gdrive_token'
const SS_STATE = 'gdrive_state'
const SS_CID = 'gdrive_cid'

let accessToken = null
let tokenExpiry = 0

function isStandalone() {
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

export function isConnected() {
  if (accessToken && Date.now() < tokenExpiry) return true
  // 세션 저장소에서 복구 시도
  try {
    const raw = sessionStorage.getItem(SS_TOKEN)
    if (raw) {
      const { token, exp } = JSON.parse(raw)
      if (token && Date.now() < exp) {
        accessToken = token
        tokenExpiry = exp
        return true
      }
    }
  } catch {
    /* 무시 */
  }
  return false
}

function storeToken(token, expiresInSec) {
  accessToken = token
  tokenExpiry = Date.now() + (expiresInSec ? expiresInSec * 1000 : 3600 * 1000) - 60000
  try {
    sessionStorage.setItem(SS_TOKEN, JSON.stringify({ token: accessToken, exp: tokenExpiry }))
  } catch {
    /* 무시 */
  }
}

function randomState() {
  const a = new Uint8Array(16)
  crypto.getRandomValues(a)
  return Array.from(a, (b) => b.toString(16).padStart(2, '0')).join('')
}

// 리다이렉트 복귀 시 access_token 파싱 (store.init 에서 1회 호출)
export function consumeRedirect() {
  if (!window.location.hash || window.location.hash.length < 2) return false
  const params = new URLSearchParams(window.location.hash.slice(1))
  const token = params.get('access_token')
  if (!token) return false
  const state = params.get('state')
  const savedState = sessionStorage.getItem(SS_STATE)
  // URL 정리 (토큰 노출 방지)
  history.replaceState(null, '', window.location.pathname + window.location.search)
  if (!savedState || state !== savedState) return false
  storeToken(token, Number(params.get('expires_in')) || 3600)
  sessionStorage.removeItem(SS_STATE)
  return true
}

// ---- 일반 브라우저: GIS 팝업 ----
function loadGis() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) return resolve()
    const existing = document.getElementById('gis-script')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', reject)
      return
    }
    const s = document.createElement('script')
    s.src = 'https://accounts.google.com/gsi/client'
    s.async = true
    s.defer = true
    s.id = 'gis-script'
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Google 인증 스크립트를 불러오지 못했습니다.'))
    document.head.appendChild(s)
  })
}

function connectPopup(clientId, silent) {
  return new Promise((resolve, reject) => {
    let settled = false
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (resp) => {
        if (settled) return
        settled = true
        if (resp.error) return reject(new Error(resp.error_description || resp.error))
        storeToken(resp.access_token, resp.expires_in)
        resolve(accessToken)
      },
      error_callback: (err) => {
        if (settled) return
        settled = true
        reject(new Error(err?.type || 'oauth_error'))
      },
    })
    client.requestAccessToken({ prompt: silent ? '' : 'consent' })
  })
}

// 설치형 PWA: 전체 페이지 리다이렉트 (implicit token). 페이지가 이동하므로 resolve 안 됨.
function connectRedirect(clientId) {
  const state = randomState()
  sessionStorage.setItem(SS_STATE, state)
  sessionStorage.setItem(SS_CID, clientId)
  const redirectUri = window.location.origin + window.location.pathname
  const url =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      scope: SCOPE,
      state,
      prompt: 'consent',
      include_granted_scopes: 'true',
    }).toString()
  window.location.assign(url)
  return new Promise(() => {}) // 이동 대기
}

export async function connect(clientId, { silent = false } = {}) {
  if (!clientId) throw new Error('OAuth 클라이언트 ID가 필요합니다.')
  if (isStandalone()) return connectRedirect(clientId)
  await loadGis()
  return connectPopup(clientId, silent)
}

async function ensureToken(clientId) {
  if (isConnected()) return accessToken
  if (isStandalone()) throw new Error('연결이 필요합니다 — "Google 계정 연결"을 먼저 누르세요.')
  return connect(clientId, { silent: true })
}

export function disconnect() {
  if (accessToken && window.google?.accounts?.oauth2) {
    try {
      window.google.accounts.oauth2.revoke(accessToken)
    } catch {
      /* 무시 */
    }
  }
  accessToken = null
  tokenExpiry = 0
  try {
    sessionStorage.removeItem(SS_TOKEN)
  } catch {
    /* 무시 */
  }
}

async function findBackupFile(token) {
  const q = encodeURIComponent(`name='${BACKUP_NAME}' and trashed=false`)
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${q}&spaces=drive&fields=files(id,name,modifiedTime)`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error('Drive 파일 목록 조회 실패 (' + res.status + ')')
  const data = await res.json()
  return data.files?.[0] || null
}

export async function uploadBackup(clientId, content) {
  const token = await ensureToken(clientId)
  const existing = await findBackupFile(token)
  const metadata = { name: BACKUP_NAME, mimeType: 'application/json' }
  const boundary = 'appeditor_' + randomState().slice(0, 8)
  const body =
    `--${boundary}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    `\r\n--${boundary}\r\n` +
    'Content-Type: application/json\r\n\r\n' +
    content +
    `\r\n--${boundary}--`
  const url = existing
    ? `https://www.googleapis.com/upload/drive/v3/files/${existing.id}?uploadType=multipart&fields=id,modifiedTime`
    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime'
  const res = await fetch(url, {
    method: existing ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body,
  })
  if (!res.ok) throw new Error('Drive 업로드 실패 (' + res.status + ')')
  return res.json()
}

export async function downloadBackup(clientId) {
  const token = await ensureToken(clientId)
  const existing = await findBackupFile(token)
  if (!existing) return null
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${existing.id}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Drive 다운로드 실패 (' + res.status + ')')
  const data = await res.json()
  return { data, modifiedTime: existing.modifiedTime }
}
