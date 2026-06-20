// Google Drive 연동 (API 키 불필요, OAuth 클라이언트 ID만 사용)
// - Google Identity Services(GIS)로 브라우저에서 access token 발급
// - Drive REST API 로 앱 백업 파일(appeditor-backup.json) 1개를 업로드/다운로드
// - drive.file 범위: 이 앱이 만든 파일만 접근 (사용자 다른 파일은 못 봄)

const SCOPE = 'https://www.googleapis.com/auth/drive.file'
const BACKUP_NAME = 'appeditor-backup.json'

let accessToken = null
let tokenExpiry = 0

export function isConnected() {
  return !!accessToken && Date.now() < tokenExpiry
}

// GIS 스크립트 1회 로드
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

// access token 요청. silent=true 면 이미 동의한 경우 팝업 없이 갱신 시도.
export async function connect(clientId, { silent = false } = {}) {
  if (!clientId) throw new Error('OAuth 클라이언트 ID가 필요합니다.')
  await loadGis()
  return new Promise((resolve, reject) => {
    let settled = false
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (resp) => {
        if (settled) return
        settled = true
        if (resp.error) {
          reject(new Error(resp.error_description || resp.error))
          return
        }
        accessToken = resp.access_token
        tokenExpiry = Date.now() + (resp.expires_in ? resp.expires_in * 1000 : 3600 * 1000) - 60000
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

async function ensureToken(clientId) {
  if (isConnected()) return accessToken
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

// 스냅샷(JSON 문자열)을 Drive 백업 파일로 업로드 (있으면 갱신, 없으면 생성)
export async function uploadBackup(clientId, content) {
  const token = await ensureToken(clientId)
  const existing = await findBackupFile(token)
  const metadata = { name: BACKUP_NAME, mimeType: 'application/json' }
  const boundary = 'appeditor_' + Math.random().toString(36).slice(2)
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

// Drive 백업 파일을 다운로드해 JSON 객체로 반환 (없으면 null)
export async function downloadBackup(clientId) {
  const token = await ensureToken(clientId)
  const existing = await findBackupFile(token)
  if (!existing) return null
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${existing.id}?alt=media`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error('Drive 다운로드 실패 (' + res.status + ')')
  const data = await res.json()
  return { data, modifiedTime: existing.modifiedTime }
}
