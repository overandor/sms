// UNIMPLEMENTED: not called by any app/ route; returns synthetic data, no external integration.
export type ReserveAsset = {
  symbol: string
  reserveValue: number
  liabilities: number
}

const reserveLedger: ReserveAsset[] = [
  {
    symbol: 'BTC',
    reserveValue: 2100000,
    liabilities: 2012000
  },
  {
    symbol: 'USDC',
    reserveValue: 1300000,
    liabilities: 1284000
  },
  {
    symbol: 'SOL',
    reserveValue: 820000,
    liabilities: 790000
  }
]

export function getReserveLedger() {
  return reserveLedger
}

export function calculateReserveRatio() {
  const reserves = reserveLedger.reduce(
    (sum, asset) => sum + asset.reserveValue,
    0
  )

  const liabilities = reserveLedger.reduce(
    (sum, asset) => sum + asset.liabilities,
    0
  )

  return Number((reserves / liabilities).toFixed(2))
}
