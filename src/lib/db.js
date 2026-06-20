import { openDB } from 'idb'

// IndexedDB 스키마
// - files: 파일·폴더 노드 (브라우저 내부 저장)
// - history: AI 질문 히스토리
const DB_NAME = 'appeditor'
const DB_VERSION = 1

let _dbPromise = null

export function getDB() {
  if (!_dbPromise) {
    _dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('history')) {
          const h = db.createObjectStore('history', { keyPath: 'id' })
          h.createIndex('ai', 'ai')
          h.createIndex('createdAt', 'createdAt')
        }
        if (!db.objectStoreNames.contains('meta')) {
          db.createObjectStore('meta', { keyPath: 'key' })
        }
      },
    })
  }
  return _dbPromise
}

// ---- 파일·폴더 ----
export async function loadAllNodes() {
  const db = await getDB()
  return db.getAll('files')
}

export async function putNode(node) {
  const db = await getDB()
  await db.put('files', node)
  return node
}

export async function putNodes(nodes) {
  const db = await getDB()
  const tx = db.transaction('files', 'readwrite')
  await Promise.all(nodes.map((n) => tx.store.put(n)))
  await tx.done
}

export async function deleteNode(id) {
  const db = await getDB()
  await db.delete('files', id)
}

export async function deleteNodes(ids) {
  const db = await getDB()
  const tx = db.transaction('files', 'readwrite')
  await Promise.all(ids.map((id) => tx.store.delete(id)))
  await tx.done
}

export async function clearFiles() {
  const db = await getDB()
  await db.clear('files')
}

// ---- AI 히스토리 ----
export async function addHistory(entry) {
  const db = await getDB()
  await db.put('history', entry)
}

export async function loadHistory() {
  const db = await getDB()
  const all = await db.getAll('history')
  return all.sort((a, b) => b.createdAt - a.createdAt)
}

export async function deleteHistory(id) {
  const db = await getDB()
  await db.delete('history', id)
}

export async function clearHistory() {
  const db = await getDB()
  await db.clear('history')
}
