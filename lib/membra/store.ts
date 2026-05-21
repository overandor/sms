export type StoredItem = {
  id: string
  code: string
  amount: number
  asset: 'USDC' | 'BTC' | 'SOL'
  recipient: string
  status: 'open' | 'viewed' | 'accepted' | 'expired' | 'revoked'
  createdAt: string
  expiresAt: string
}

declare global {
  var membraStore: Map<string, StoredItem> | undefined
}

const store = globalThis.membraStore ?? new Map<string, StoredItem>()
globalThis.membraStore = store

export function createItem(amount: number, asset: StoredItem['asset'], recipient: string) {
  const code = crypto.randomUUID().replaceAll('-', '')
  const now = new Date()
  const item: StoredItem = {
    id: crypto.randomUUID(),
    code,
    amount,
    asset,
    recipient,
    status: 'open',
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + 30 * 60 * 1000).toISOString()
  }
  store.set(code, item)
  return sanitize(item)
}

export function viewItem(code: string) {
  const item = store.get(code)
  if (!item) return null
  if (Date.now() > new Date(item.expiresAt).getTime() && item.status !== 'accepted') item.status = 'expired'
  if (item.status === 'open') item.status = 'viewed'
  return sanitize(item)
}

export function acceptItem(code: string) {
  const item = store.get(code)
  if (!item) return { ok: false, reason: 'not_found' }
  if (Date.now() > new Date(item.expiresAt).getTime()) {
    item.status = 'expired'
    return { ok: false, reason: 'expired', item: sanitize(item) }
  }
  if (item.status === 'accepted') return { ok: false, reason: 'already_accepted', item: sanitize(item) }
  if (item.status === 'revoked') return { ok: false, reason: 'revoked', item: sanitize(item) }
  item.status = 'accepted'
  return { ok: true, reason: 'accepted', item: sanitize(item) }
}

export function revokeItem(code: string) {
  const item = store.get(code)
  if (!item) return { ok: false, reason: 'not_found' }
  if (item.status === 'accepted') return { ok: false, reason: 'already_accepted', item: sanitize(item) }
  item.status = 'revoked'
  return { ok: true, reason: 'revoked', item: sanitize(item) }
}

function sanitize(item: StoredItem) {
  const { code, ...safe } = item
  return { ...safe, url: `/c/${code}` }
}
