import Modal from './Modal'
import { useStore } from '../store'

const FONTS = ['Fira Code', 'JetBrains Mono', 'Source Code Pro', 'system-ui']

export default function Settings() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const closeModal = useStore((s) => s.closeModal)

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
              ['gdrive', 'Google Drive (OAuth 설정 필요)', false],
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
            ※ 아이폰 Safari는 로컬 폴더 저장을 지원하지 않습니다. Google Drive 연동은 OAuth
            클라이언트 ID 설정 후 활성화됩니다.
          </p>
        </div>
      </div>
    </Modal>
  )
}
