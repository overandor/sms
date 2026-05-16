'use client'

import { useEffect, useState } from 'react'

export function LiveTreasury() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/demo')
      .then((response) => response.json())
      .then(setData)
  }, [])

  if (!data) {
    return <div className='vault-card'>Loading treasury...</div>
  }

  return (
    <section className='vault-card'>
      <div className='hero-panel__eyebrow'>LIVE TREASURY</div>

      <h2 style={{ marginTop: 12 }}>{data.liquidity}</h2>

      <div style={{ marginTop: 16 }}>
        Reserve Ratio: {data.reserveRatio}x
      </div>

      <div style={{ marginTop: 8 }}>
        Validators: {data.validators}
      </div>

      <div style={{ marginTop: 8 }}>
        Merchants: {data.merchants}
      </div>
    </section>
  )
}
