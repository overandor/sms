import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const redemption = {
    claimId: body.claimId,
    status: 'redeemed',
    settledAt: new Date().toISOString(),
    settlementNetwork: 'Solana + Jito'
  }

  return NextResponse.json(redemption)
}
