'use client'

import { useState } from 'react'

type ClaimResponse = {
  claimId: string
  recipient: string
  denomination: string
  asset: string
  status: string
  issuedAt: string
  claimLink: string
  smsPreview: string
}

export function ClaimConsole() {
  const [recipient, setRecipient] = useState('+1 555 0100')
  const [denomination, setDenomination] = useState('$10')
  const [asset, setAsset] = useState('USDC')
  const [claim, setClaim] = useState<ClaimResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function createClaim() {
    setLoading(true)

    const response = await fetch('/api/claim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ recipient, denomination, asset })
    })

    const payload = await response.json()
    setClaim(payload)
    setLoading(false)
  }

  return (
    <section className='brand-panel claim-console'>
      <p className='eyebrow'>CLAIM CONSOLE</p>
      <h2>Create an SMS bearer claim.</h2>

      <div className='claim-grid'>
        <label>
          Recipient
          <input value={recipient} onChange={(event) => setRecipient(event.target.value)} />
        </label>

        <label>
          Denomination
          <select value={denomination} onChange={(event) => setDenomination(event.target.value)}>
            <option>$5</option>
            <option>$10</option>
            <option>$25</option>
            <option>$50</option>
          </select>
        </label>

        <label>
          Asset
          <select value={asset} onChange={(event) => setAsset(event.target.value)}>
            <option>USDC</option>
            <option>BTC</option>
            <option>SOL</option>
          </select>
        </label>
      </div>

      <button className='gold-button' onClick={createClaim} disabled={loading}>
        {loading ? 'Creating claim...' : 'Generate SMS Claim'}
      </button>

      {claim && (
        <div className='claim-result'>
          <strong>{claim.status.toUpperCase()} · {claim.claimId}</strong>
          <p>{claim.smsPreview}</p>
          <code>{claim.claimLink}</code>
        </div>
      )}
    </section>
  )
}
