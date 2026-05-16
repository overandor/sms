import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  // Verify the token matches the claim (mock logic for now)
  if (!body.claimId || !body.token) {
     return NextResponse.json({ error: 'Missing claimId or token' }, { status: 400 })
  }

  const redemption = {
    claimId: body.claimId,
    token: body.token, // Log the token used
    status: 'redeemed',
    settledAt: new Date().toISOString(),
    settlementNetwork: 'Solana + Jito'
  }

  return NextResponse.json(redemption)
}