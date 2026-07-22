import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  if (!body.recipient || !body.claimLink) {
    return NextResponse.json(
      { error: 'recipient and claimLink are required' },
      { status: 400 }
    )
  }

  const smsPayload = {
    transport: 'sms',
    recipient: body.recipient,
    message: `You received a Membra bearer note: ${body.claimLink}`,
    deliveryState: 'queued',
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(smsPayload)
}
