import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()

  const mintedNote = {
    noteId: crypto.randomUUID(),
    reserveAsset: body.reserveAsset,
    denomination: body.denomination,
    reserveHash: crypto.randomUUID(),
    state: 'minted',
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(mintedNote)
}
