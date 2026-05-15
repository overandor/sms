import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const payload = {
    recipient: body.recipient,
    denomination: body.denomination,
    asset: body.asset,
    claimId: crypto.randomUUID(),
    status: 'pending',
    issuedAt: new Date().toISOString()
  }

  return NextResponse.json(payload)
}
