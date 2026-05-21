import { NextResponse } from 'next/server'
import { createItem } from '@/lib/membra/store'

export async function POST(request: Request) {
  const body = await request.json()

  const amount = Number(body.amount ?? 10)
  const asset = body.asset ?? 'USDC'
  const recipient = body.recipient ?? 'recipient'

  if (!['USDC', 'BTC', 'SOL'].includes(asset)) {
    return NextResponse.json({ error: 'unsupported_asset' }, { status: 400 })
  }

  if (!Number.isFinite(amount) || amount <= 0 || amount > 500) {
    return NextResponse.json({ error: 'invalid_amount' }, { status: 400 })
  }

  const item = createItem(amount, asset, recipient)

  return NextResponse.json({
    item,
    smsText: `You received a $${amount} ${asset} Membra note. Claim: ${item.url}`
  })
}
