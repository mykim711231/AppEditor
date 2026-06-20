import { useState } from 'react'
import Modal from './Modal'
import { useStore, uiConfirm } from '../store'
import TextInput from './ui/TextInput'
import { pullRepo, pushRepo, pathsToNodes, nodesToFiles } from '../lib/github'

export default function GitHubModal() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const closeModal = useStore((s) => s.closeModal)
  const nodes = useStore((s) => s.nodes)
  const applySnapshot = useStore((s) => s.applySnapshot)

  const gh = settings.github || { token: '', repo: '', branch: 'main' }
  const [token, setToken] = useState(gh.token || '')
  const [repo, setRepo] = useState(gh.repo || '')
  const [branch, setBranch] = useState(gh.branch || 'main')
  const [message, setMessage] = useState('Update from AppEditor')
  const [busy, setBusy] = useState('')
  const [msg, setMsg] = useState(null) // { type, text }

  const flash = (type, text) => {
    setMsg({ type, text })
    if (type === 'ok') setTimeout(() => setMsg(null), 5000)
  }

  const persist = () => updateSettings({ github: { token: token.trim(), repo: repo.trim(), branch: branch.trim() || 'main' } })

  const onPull = async () => {
    if (!token.trim() || !repo.trim()) return flash('err', '토큰과 저장소(owner/repo)를 입력하세요.')
    if (
      !(await uiConfirm({
        title: '저장소 불러오기',
        message: '저장소 파일로 현재 편집 내용을 덮어씁니다. 계속할까요?',
        danger: true,
      }))
    )
      return
    persist()
    setBusy('pull')
    try {
      const { files, skipped } = await pullRepo({ token: token.trim(), repo: repo.trim(), branch: branch.trim() || 'main' })
      if (!files.length) return flash('err', '불러올 텍스트 파일이 없습니다.')
      await applySnapshot({ nodes: pathsToNodes(files) })
      flash('ok', `불러오기 완료: ${files.length}개 파일${skipped ? ` (이진/대용량 ${skipped}개 제외)` : ''}`)
    } catch (e) {
      flash('err', e.message)
    } finally {
      setBusy('')
    }
  }

  const onPush = async () => {
    if (!token.trim() || !repo.trim()) return flash('err', '토큰과 저장소(owner/repo)를 입력하세요.')
    persist()
    setBusy('push')
    try {
      const files = nodesToFiles(nodes)
      if (!files.length) return flash('err', '푸시할 파일이 없습니다.')
      const res = await pushRepo({
        token: token.trim(),
        repo: repo.trim(),
        branch: branch.trim() || 'main',
        message,
        files,
      })
      flash('ok', `커밋·푸시 완료: ${res.count}개 파일 (${res.commit.slice(0, 7)})`)
    } catch (e) {
      flash('err', e.message)
    } finally {
      setBusy('')
    }
  }

  const inputCls =
    'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white'

  return (
    <Modal title="GitHub 연동" onClose={closeModal}>
      <div className="space-y-3 text-sm">
        <div>
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">
            개인 액세스 토큰 (PAT)
          </label>
          <TextInput
            value={token}
            onChange={setToken}
            type="password"
            placeholder="ghp_... (repo 권한)"
            className={inputCls}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">저장소</label>
            <TextInput value={repo} onChange={setRepo} placeholder="owner/repo" className={inputCls} />
          </div>
          <div className="w-28">
            <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">브랜치</label>
            <TextInput value={branch} onChange={setBranch} placeholder="main" className={inputCls} />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-500 dark:text-slate-400">커밋 메시지</label>
          <TextInput value={message} onChange={setMessage} className={inputCls} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onPull}
            disabled={!!busy}
            className="flex-1 rounded-lg border border-slate-400 py-2 text-sm font-medium text-slate-700 disabled:opacity-50 dark:border-slate-500 dark:text-slate-200"
          >
            {busy === 'pull' ? '불러오는 중…' : '⬇ 불러오기 (pull)'}
          </button>
          <button
            onClick={onPush}
            disabled={!!busy}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {busy === 'push' ? '푸시 중…' : '⬆ 커밋·푸시 (push)'}
          </button>
        </div>

        {msg && (
          <p className={`text-xs ${msg.type === 'ok' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {msg.text}
          </p>
        )}

        <details className="text-xs text-slate-400">
          <summary className="cursor-pointer">토큰 발급 방법 / 주의</summary>
          <ul className="mt-1 list-disc space-y-0.5 pl-4">
            <li>
              GitHub → Settings → Developer settings → <b>Personal access tokens</b> →
              Fine-grained 또는 classic(<code>repo</code> 권한) 생성
            </li>
            <li>토큰은 이 기기 브라우저(localStorage)에만 저장됩니다. 공용 기기 주의.</li>
            <li>불러오기는 텍스트 파일만(이진/512KB 초과 제외), 최대 300개.</li>
            <li>푸시는 추가·수정만 반영하며 원격의 삭제는 동기화하지 않습니다.</li>
          </ul>
        </details>
      </div>
    </Modal>
  )
}
