import { NextResponse } from 'next/server'
import { SYNTHETIC_THREADS } from '@/lib/demand/syntheticData'
import { computeMetrics, PRIVACY_RECEIPT } from '@/lib/demand/metrics'

export async function GET() {
  const metrics = computeMetrics(SYNTHETIC_THREADS)

  const ledger = SYNTHETIC_THREADS.map((t) => ({
    id: t.id,
    clientHash: t.clientHash,
    firstSeen: t.firstSeen,
    lastSeen: t.lastSeen,
    inboundCount: t.inboundCount,
    outboundCount: t.outboundCount,
    responseTimeMedianMinutes: t.responseTimeMedianMinutes,
    bookingIntent: t.bookingIntent,
    confirmedProxy: t.confirmedProxy,
    repeatClient: t.repeatClient,
    estimatedValueBand: t.estimatedValueBand
  }))

  return NextResponse.json({
    datasetLabel: 'SYNTHETIC DEMO DATA — no real conversations or clients',
    metrics,
    ledger,
    privacyReceipt: PRIVACY_RECEIPT
  })
}
