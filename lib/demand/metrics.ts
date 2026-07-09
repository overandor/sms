import { DemandThread, SYNTHETIC_THREADS } from './syntheticData'

export interface DemandMetrics {
  conversationVolume: number
  inboundDemandRate: number
  responseTimeMedianMinutes: number
  commercialIntentRate: number
  priceInquiryRate: number
  bookingIntentRate: number
  conversionRate: number
  ghostRate: number
  repeatClientRate: number
  estimatedRevenueLow: number
  estimatedRevenueHigh: number
}

function pct(count: number, total: number): number {
  if (total === 0) return 0
  return Math.round((count / total) * 1000) / 10
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function bandMidpoint(band: string): number {
  const [low, high] = band.replace(/\$/g, '').split('–').map(Number)
  return (low + high) / 2
}

export function computeMetrics(threads: DemandThread[] = SYNTHETIC_THREADS): DemandMetrics {
  const total = threads.length
  const inbound = threads.filter((t) => t.inboundCount > 0).length
  const commercial = threads.filter(
    (t) => t.askedPrice || t.askedAvailability || t.askedLocation
  )
  const priceAsk = threads.filter((t) => t.askedPrice).length
  const bookingIntent = threads.filter((t) => t.bookingIntent)
  const confirmed = threads.filter((t) => t.confirmedProxy)
  const ghosted = bookingIntent.filter((t) => !t.confirmedProxy)
  const repeat = threads.filter((t) => t.repeatClient).length

  const confirmedValues = confirmed.map((t) => bandMidpoint(t.estimatedValueBand))
  const revenueMid = confirmedValues.reduce((a, b) => a + b, 0)

  return {
    conversationVolume: total,
    inboundDemandRate: pct(inbound, total),
    responseTimeMedianMinutes: median(threads.map((t) => t.responseTimeMedianMinutes)),
    commercialIntentRate: pct(commercial.length, total),
    priceInquiryRate: pct(priceAsk, total),
    bookingIntentRate: pct(bookingIntent.length, total),
    conversionRate: pct(confirmed.length, total),
    ghostRate: pct(ghosted.length, Math.max(1, bookingIntent.length)),
    repeatClientRate: pct(repeat, total),
    estimatedRevenueLow: Math.round(revenueMid * 0.85),
    estimatedRevenueHigh: Math.round(revenueMid * 1.15)
  }
}

export interface PrivacyReceipt {
  rawMessagesProcessed: false
  identitiesExposed: false
  fieldsExported: string[]
  method: string
}

export const PRIVACY_RECEIPT: PrivacyReceipt = {
  rawMessagesProcessed: false,
  identitiesExposed: false,
  fieldsExported: [
    'client_hash',
    'first_seen',
    'last_seen',
    'inbound_count',
    'outbound_count',
    'response_time_median_minutes',
    'asked_price',
    'asked_availability',
    'asked_location',
    'booking_intent',
    'confirmed_proxy',
    'repeat_client',
    'estimated_value_band'
  ],
  method: 'Synthetic demo dataset — no source conversations, phone numbers, or names were processed.'
}
