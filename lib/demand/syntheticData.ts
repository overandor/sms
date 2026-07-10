// Fabricated demo dataset for the Conversational Demand Accounting prototype.
// Every record below is synthetic — no real conversations, phone numbers, or
// client identities are used anywhere in this module.

export interface DemandThread {
  id: string
  clientHash: string
  firstSeen: string
  lastSeen: string
  inboundCount: number
  outboundCount: number
  responseTimeMedianMinutes: number
  askedPrice: boolean
  askedAvailability: boolean
  askedLocation: boolean
  bookingIntent: boolean
  confirmedProxy: boolean
  repeatClient: boolean
  estimatedValueBand: string
}

// Deterministic PRNG so the demo dataset is stable across reloads.
function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(130080)

function hexId(len: number): string {
  let out = ''
  for (let i = 0; i < len; i++) {
    out += Math.floor(rand() * 16).toString(16)
  }
  return out
}

function daysAgo(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}

const VALUE_BANDS = ['$40–$60', '$60–$90', '$90–$130', '$130–$180']

function buildThread(index: number): DemandThread {
  const firstSeenDays = Math.floor(rand() * 90) + 1
  const repeatClient = rand() < 0.34
  const lastSeenDays = repeatClient
    ? Math.max(0, firstSeenDays - Math.floor(rand() * firstSeenDays))
    : firstSeenDays

  const askedPrice = rand() < 0.71
  const askedAvailability = rand() < 0.64
  const askedLocation = rand() < 0.42
  const commercialSignal = askedPrice || askedAvailability || askedLocation
  const bookingIntent = commercialSignal && rand() < 0.58
  const confirmedProxy = bookingIntent && rand() < 0.66

  return {
    id: `DMD-${String(index + 1).padStart(4, '0')}`,
    clientHash: `c_${hexId(12)}`,
    firstSeen: daysAgo(firstSeenDays),
    lastSeen: daysAgo(lastSeenDays),
    inboundCount: 1 + Math.floor(rand() * 6),
    outboundCount: Math.floor(rand() * 6),
    responseTimeMedianMinutes: 2 + Math.floor(rand() * 180),
    askedPrice,
    askedAvailability,
    askedLocation,
    bookingIntent,
    confirmedProxy,
    repeatClient,
    estimatedValueBand: VALUE_BANDS[Math.floor(rand() * VALUE_BANDS.length)]
  }
}

export const SYNTHETIC_THREADS: DemandThread[] = Array.from({ length: 64 }, (_, i) =>
  buildThread(i)
)
