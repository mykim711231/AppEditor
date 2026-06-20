import { useState } from 'react'
import Modal from './Modal'
import { useStore } from '../store'
import { connect, disconnect, isConnected, uploadBackup, downloadBackup } from '../lib/gdrive'

const FONTS = ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'system-ui']

export default function Settings() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const closeModal = useStore((s) => s.closeModal)
  const getSnapshot = useStore((s) => s.getSnapshot)
  const applySnapshot = useStore((s) => s.applySnapshot)

  const [clientId, setClientId] = useState(settings.googleClientId || '')
  const [connected, setConnected] = useState(isConnected())
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null) // { type: 'ok'|'err', text }

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const flash = (type, text) => {
    setMsg({ type, text })
    setTimeout(() => setMsg(null), 4000)
  }

  const saveClientId = () => {
    updateSettings({ googleClientId: clientId.trim() })
    flash('ok', '클라이언트 ID를 저장했습니다.')
  }

  const onConnect = async () => {
    const id = clientId.trim()
    if (!id) {
      flash('err', '먼저 OAuth 클라이언트 ID를 입력하세요.')
      return
    }
    updateSettings({ googleClientId: id })
    setBusy('connect')
    try {
      await connect(id)
      setConnected(true)
      flash('ok', 'Google 계정 연결 완료.')
    } catch (e) {
      flash('err', '연결 실패: ' + e.message)
    } finally {
      setBusy('')
    }
  }

  const onDisconnect = () => {
    disconnect()
    setConnected(false)
    flash('ok', '연결을 해제했습니다.')
  }

  const onBackup = async () => {
    setBusy('backup')
    try {
      if (!isConnected()) await connect(settings.googleClientId || clientId.trim())
      setConnected(true)
      await uploadBackup(settings.googleClientId || clientId.trim(), JSON.stringify(getSnapshot()))
      flash('ok', 'Google Drive에 백업했습니다.')
    } catch (e) {
      flash('err', '백업 실패: ' + e.message)
    } finally {
      setBusy('')
    }
  }

  const onRestore = async () => {
    if (!confirm('Drive 백업으로 현재 파일을 덮어쓸까요? 현재 편집 내용은 사라집니다.')) return
    setBusy('restore')
    try {
      if (!isConnected()) await connect(settings.googleClientId || clientId.trim())
      setConnected(true)
      const result = await downloadBackup(settings.googleClientId || clientId.trim())
      if (!result) {
        flash('err', 'Drive에 백업 파일이 없습니다.')
        return
      }
      await applySnapshot(result.data)
      flash('ok', '복원 완료.')
    } catch (e) {
      flash('err', '복원 실패: ' + e.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <Modal title="설정" onClose={closeModal}>
      <div className="space-y-4 text-sm">
        {/* 테마 */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-300">테마</label>
          <div className="flex gap-2">
            {[
              ['dark', '🌙 다크'],
              ['light', '☀️ 라이트'],
            ].map(([val, label]) => (
              <button
                key={val}
                onClick={() => updateSettings({ theme: val })}
                className={`flex-1 rounded-lg border px-3 py-2 ${
                  settings.theme === val
                    ? 'border-blue-400 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200'
                    : 'border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 폰트 */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-300">폰트</label>
          <select
            value={settings.font}
            onChange={(e) => updateSettings({ font: e.target.value })}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          >
            {FONTS.map((f) => (
              <option key={f} value={f}>
                {f === 'system-ui' ? '시스템 기본' : f}
              </option>
            ))}
          </select>
        </div>

        {/* 글자 크기 */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-300">
            글자 크기: {settings.fontSize}px
          </label>
          <input
            type="range"
            min="10"
            max="24"
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
            className="w-full"
          />
        </div>

        {/* 저장 위치 */}
        <div>
          <label className="mb-1 block font-medium text-slate-700 dark:text-slate-300">
            파일 저장 위치
          </label>
          <div className="space-y-1.5">
            {[
              ['indexeddb', '브라우저 내부 (IndexedDB) — 기본값', true],
              ['local', '기기 로컬 폴더 (Chrome/갤럭시)', true],
              ['gdrive', 'Google Drive (아래에서 연결)', true],
            ].map(([val, label, enabled]) => (
              <label
                key={val}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
                  settings.storageMode === val
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-slate-300 dark:border-slate-600'
                } ${!enabled ? 'opacity-50' : ''}`}
              >
                <input
                  type="radio"
                  name="storage"
                  checked={settings.storageMode === val}
                  disabled={!enabled}
                  onChange={() => updateSettings({ storageMode: val })}
                />
                <span className="text-slate-700 dark:text-slate-300">{label}</span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-400">
            ※ 아이폰 Safari는 로컬 폴더 저장을 지원하지 않습니다. Google Drive는 아래에서
            연결하세요.
          </p>
        </div>

        {/* Google Drive 연동 */}
        <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-700">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-slate-700 dark:text-slate-300">
              ☁️ Google Drive 연동
            </span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                connected
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {connected ? '연결됨' : '미연결'}
            </span>
          </div>

          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
            OAuth 클라이언트 ID
          </label>
          <div className="flex gap-2">
            <input
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="000000-xxxx.apps.googleusercontent.com"
              className="min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            <button
              onClick={saveClientId}
              className="shrink-0 rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:text-slate-300"
            >
              저장
            </button>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {!connected ? (
              <button
                onClick={onConnect}
                disabled={busy === 'connect'}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white disabled:opacity-50"
              >
                {busy === 'connect' ? '연결 중…' : 'Google 계정 연결'}
              </button>
            ) : (
              <button
                onClick={onDisconnect}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs dark:border-slate-600 dark:text-slate-300"
              >
                연결 해제
              </button>
            )}
            <button
              onClick={onBackup}
              disabled={!!busy}
              className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs text-white disabled:opacity-50 dark:bg-slate-600"
            >
              {busy === 'backup' ? '백업 중…' : '지금 백업 ⬆'}
            </button>
            <button
              onClick={onRestore}
              disabled={!!busy}
              className="rounded-lg border border-slate-400 px-3 py-1.5 text-xs text-slate-700 disabled:opacity-50 dark:border-slate-500 dark:text-slate-200"
            >
              {busy === 'restore' ? '복원 중…' : '복원 ⬇'}
            </button>
          </div>

          <label className="mt-3 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={settings.driveAutoBackup}
              onChange={(e) => updateSettings({ driveAutoBackup: e.target.checked })}
            />
            편집 시 자동 백업 (저장 위치가 Google Drive일 때)
          </label>

          {msg && (
            <p
              className={`mt-2 text-xs ${
                msg.type === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {msg.text}
            </p>
          )}

          <details className="mt-2 text-xs text-slate-400">
            <summary className="cursor-pointer">클라이언트 ID 발급 방법</summary>
            <ol className="mt-1 list-decimal space-y-0.5 pl-4">
              <li>
                Google Cloud Console → API 및 서비스 → 사용자 인증 정보 →{' '}
                <b>OAuth 클라이언트 ID 만들기</b> (유형: 웹 애플리케이션)
              </li>
              <li>
                <b>승인된 JavaScript 원본</b>에 아래 주소를 추가:
                <code className="ml-1 rounded bg-slate-100 px-1 dark:bg-slate-800">{origin}</code>
              </li>
              <li>Google Drive API 사용 설정 후, 생성된 클라이언트 ID를 위에 입력</li>
              <li>접근 범위는 앱이 만든 파일만(drive.file)이라 다른 Drive 파일은 안전합니다.</li>
            </ol>
          </details>
        </div>
      </div>
    </Modal>
  )
}
