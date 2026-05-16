import { LiveTreasury } from '@/components/LiveTreasury'
import { ClaimConsole } from '@/components/ClaimConsole'

const cycle = [
  ['Deposit', 'Assets are secured in the MEMBRA reserve layer.'],
  ['Mint', 'Fixed-denomination bearer notes are issued against liabilities.'],
  ['Send', 'CoinPack links move value through SMS, QR, NFC, email, or chat.'],
  ['Redeem', 'Notes are burned and redeemed against available reserves.']
]

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="brand-panel hero-card">
          <p className="eyebrow">MEMBRA MONEY</p>
          <h1>Send value like a message.</h1>
          <p className="hero-copy">
            Reserve-backed digital bearer infrastructure for SMS, QR, NFC, and chat.
          </p>
          <div className="hero-actions">
            <a href="/api/demo" className="gold-button">Open Treasury API</a>
          </div>
        </div>

        <LiveTreasury />
      </section>

      <ClaimConsole />

      <section className="brand-panel cycle-panel">
        <p className="eyebrow center">THE CYCLE</p>

        <div className="cycle-row">
          {cycle.map(([title, body]) => (
            <div className="cycle-step" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
