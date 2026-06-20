// GitHub 연동 (백엔드 없이 브라우저에서 GitHub REST API 직접 호출)
// - 개인 액세스 토큰(PAT)으로 인증
// - 불러오기: 저장소 트리 → 파일들을 에디터로 로드
// - 커밋·푸시: blob → tree → commit → ref 업데이트 (git data API)
import { uid } from './id'

const API = 'https://api.github.com'

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

async function gh(token, path, opts = {}) {
  const res = await fetch(API + path, { ...opts, headers: { ...headers(token), ...(opts.headers || {}) } })
  if (!res.ok) {
    let detail = ''
    try {
      detail = (await res.json()).message || ''
    } catch {
      /* 무시 */
    }
    throw new Error(`GitHub ${res.status} ${detail}`)
  }
  return res.json()
}

function b64decodeUtf8(b64) {
  const bin = atob(b64.replace(/\n/g, ''))
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
function b64encodeUtf8(str) {
  const bytes = new TextEncoder().encode(str)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin)
}

function parseRepo(repo) {
  const m = (repo || '').trim().replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '')
  const [owner, name] = m.split('/')
  if (!owner || !name) throw new Error('저장소 형식은 owner/repo 입니다.')
  return { owner, name }
}

// 텍스트로 간주할 확장자 (이진 파일은 건너뜀)
const TEXT_EXT = /\.(txt|md|markdown|js|jsx|ts|tsx|json|html|css|scss|less|py|java|c|h|cpp|cc|hpp|cs|go|rs|php|rb|swift|kt|kts|sql|yml|yaml|xml|sh|bash|toml|ini|cfg|env|gitignore|vue|svelte|dart|lua|r|pl|scala|clj|ex|exs|gradle|properties|csv|log|conf)$/i

// ---- 불러오기(pull) ----
export async function pullRepo({ token, repo, branch }) {
  const { owner, name } = parseRepo(repo)
  const tree = await gh(token, `/repos/${owner}/${name}/git/trees/${encodeURIComponent(branch)}?recursive=1`)
  const blobs = (tree.tree || []).filter((t) => t.type === 'blob')
  const files = []
  let skipped = 0
  for (const b of blobs) {
    if (files.length >= 300) break
    if (!TEXT_EXT.test(b.path) || (b.size && b.size > 512 * 1024)) {
      skipped++
      continue
    }
    const blob = await gh(token, `/repos/${owner}/${name}/git/blobs/${b.sha}`)
    files.push({ path: b.path, content: blob.encoding === 'base64' ? b64decodeUtf8(blob.content) : blob.content })
  }
  return { files, skipped }
}

// 경로 목록 → 파일/폴더 노드 구조 생성 (store.applySnapshot 용)
export function pathsToNodes(items) {
  const folderMap = new Map()
  const nodes = []
  const ensureFolder = (folderPath) => {
    if (!folderPath) return null
    if (folderMap.has(folderPath)) return folderMap.get(folderPath)
    const parts = folderPath.split('/')
    const nm = parts[parts.length - 1]
    const parentId = ensureFolder(parts.slice(0, -1).join('/'))
    const id = uid()
    folderMap.set(folderPath, id)
    nodes.push({
      id,
      name: nm,
      type: 'folder',
      parentId,
      order: nodes.filter((n) => n.parentId === parentId).length,
      expanded: true,
    })
    return id
  }
  items.forEach((it, idx) => {
    const parts = it.path.split('/')
    const nm = parts[parts.length - 1]
    const parentId = ensureFolder(parts.slice(0, -1).join('/'))
    nodes.push({ id: uid(), name: nm, type: 'file', parentId, content: it.content, order: idx })
  })
  return nodes
}

// store nodes → [{path, content}] (파일만)
export function nodesToFiles(nodes) {
  const pathOf = (file) => {
    const parts = [file.name]
    let p = file.parentId
    while (p) {
      const par = nodes.find((n) => n.id === p)
      if (!par) break
      parts.unshift(par.name)
      p = par.parentId
    }
    return parts.join('/')
  }
  return nodes.filter((n) => n.type === 'file').map((f) => ({ path: pathOf(f), content: f.content || '' }))
}

// ---- 커밋·푸시(push) ----
export async function pushRepo({ token, repo, branch, message, files }) {
  const { owner, name } = parseRepo(repo)
  const base = `/repos/${owner}/${name}`

  // 현재 브랜치 ref
  let refSha, baseTreeSha
  try {
    const ref = await gh(token, `${base}/git/ref/heads/${encodeURIComponent(branch)}`)
    refSha = ref.object.sha
    const commit = await gh(token, `${base}/git/commits/${refSha}`)
    baseTreeSha = commit.tree.sha
  } catch (e) {
    // 브랜치가 없으면 새로 만들 수 없으므로 명확히 안내
    throw new Error(`브랜치 '${branch}' 를 찾을 수 없습니다. (${e.message})`)
  }

  // blob 생성
  const treeItems = []
  for (const f of files) {
    const blob = await gh(token, `${base}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: b64encodeUtf8(f.content), encoding: 'base64' }),
    })
    treeItems.push({ path: f.path, mode: '100644', type: 'blob', sha: blob.sha })
  }

  // tree 생성 (기존 트리 기반 — 삭제는 반영 안 함, 추가·수정만)
  const tree = await gh(token, `${base}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({ base_tree: baseTreeSha, tree: treeItems }),
  })

  // commit 생성
  const commit = await gh(token, `${base}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message: message || 'Update from AppEditor', tree: tree.sha, parents: [refSha] }),
  })

  // ref 업데이트
  await gh(token, `${base}/git/refs/heads/${encodeURIComponent(branch)}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  })

  return { commit: commit.sha, count: files.length }
}
