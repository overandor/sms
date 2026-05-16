import { NextResponse } from 'next/server'

const demoClaims = [
  {
    id: 'CLM-1001',
    recipient: '+1 555 0100',
    asset: 'BTC',
    amount: '$25',
    status: 'settled'
  },
  {
    id: 'CLM-1002',
    recipient: '+1 555 0199',
    asset: 'USDC',
    amount: '$10',
    status: 'pending'
  }
]

export async function GET() {
  return NextResponse.json({
    network: 'Membra SMS',
    reserveRatio: 1.24,
    activeClaims: demoClaims,
    merchants: 284,
    validators: 19,
    liquidity: '$4.2M'
  })
}
