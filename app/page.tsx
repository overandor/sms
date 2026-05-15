const cycle = [
  ['Deposit', 'Assets are secured in the MEMBRA reserve layer.'],
  ['Mint', 'Fixed-denomination bearer notes are issued against liabilities.'],
  ['Send', 'CoinPack links move value through SMS, QR, NFC, email, or chat.'],
  ['Redeem', 'Notes are burned and redeemed against available reserves.']
]

const notes = [
  ['$1', 'BTC NOTE', '₿'],
  ['$5', 'USDC NOTE', '◐'],
  ['$10', 'BTC NOTE', '₿'],
  ['$50', 'SOL NOTE', '◎'],
  ['$100', 'BTC NOTE', '₿']
]

const paymentFlow = [
  ['1', 'Alice deposits', '$100 in BTC'],
  ['2', 'Mint issues', '10 × $10 BTC Notes'],
  ['3', 'Alice sends', 'two $10 notes by SMS'],
  ['4', 'Bob claims', 'into his MEMBRA Wallet'],
  ['5', 'Bob pays Carol', '$10 by QR code'],
  ['6', 'Carol redeems', 'note is burned']
]

const features = [
  ['Instant off-chain transfers', 'Move value without broadcasting every retail payment.'],
  ['Multi-asset CoinPack', 'BTC notes, USDC, SOL, merchant credit, and vouchers in one link.'],
  ['Reserve-backed claims', 'BTC-backed notes are claims, not native Bitcoin.'],
  ['Audit-first operations', 'Proof-of-reserves, liabilities, claim attempts, and redemptions are tracked.'],
  ['Claim-link safety', 'Links are containers, not keys; PINs are salted, peppered, and never returned.'],
  ['Merchant ready', 'SMS, QR, NFC, email, and wallet transfer surfaces for local commerce.']
]

const coinpack = [
  ['₿', '$10 BTC Note'],
  ['◐', '$5 USDC Note'],
  ['◎', '0.1 SOL']
]

const useCases = [
  ['P2P payments', 'Send like a message'],
  ['Merchant payments', 'Accept by QR or NFC'],
  ['Remittances', 'Global money, simple'],
  ['Rewards', 'Instant distribution'],
  ['Vouchers', 'Digital or physical'],
  ['Aid', 'Fast and transparent']
]

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="brand-panel hero-card">
          <div className="membra-mark" aria-hidden="true">
            <div className="membra-door">✦</div>
          </div>
          <p className="eyebrow">MEMBRA MONEY</p>
          <h1>Send value like a message.</h1>
          <p className="hero-copy">
            Multi-asset bearer claim links for SMS, QR, NFC, email, and chat — backed by reserves,
            protected by disclosures, and settled on-chain only when it matters.
          </p>
          <div className="hero-actions">
            <a href="#coinpack" className="gold-button">Create CoinPack</a>
            <a href="#security" className="ghost-button">Review Trust Model</a>
          </div>
        </div>

        <div className="brand-panel cycle-panel">
          <p className="eyebrow center">THE CYCLE</p>
          <div className="cycle-row">
            {cycle.map(([title, body], index) => (
              <div className="cycle-step" key={title}>
                <div className="cycle-icon">{index === 0 ? '▣' : index === 1 ? '◫' : index === 2 ? '✈' : '⌂'}</div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="settlement-strip">Many off-chain transfers. One final on-chain settlement.</div>
        </div>
      </section>

      <section className="brand-panel notes-panel">
        <div className="section-copy">
          <p className="eyebrow">MEMBRA NOTES</p>
          <h2>Fixed-denomination bearer instruments.</h2>
          <p>Cash-like digital notes in reserve-backed denominations, tracked by serial and redemption status.</p>
        </div>
        <div className="note-grid">
          {notes.map(([value, label, icon]) => (
            <div className="note-card" key={`${value}-${label}`}>
              <div className="note-value">{value}</div>
              <div className="note-label">{label}</div>
              <div className="coin-icon">{icon}</div>
            </div>
          ))}
        </div>
        <ul className="note-list">
          <li>Fixed denominations</li>
          <li>Transferable</li>
          <li>Verifiable</li>
          <li>Backed by reserves</li>
          <li>Bearer-style</li>
        </ul>
      </section>

      <section className="brand-panel flow-panel">
        <p className="eyebrow center">PAYMENT FLOW EXAMPLE</p>
        <div className="payment-flow">
          {paymentFlow.map(([number, title, body]) => (
            <div className="flow-step" key={number}>
              <div className="flow-orb">{number}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="product-grid" id="coinpack">
        <div className="brand-panel coinpack-panel">
          <p className="eyebrow">COINPACK</p>
          <h2>Multi-asset in one packet.</h2>
          <div className="coinpack-card">
            <p className="mini-label">Example CoinPack</p>
            {coinpack.map(([icon, label]) => (
              <div className="coinpack-row" key={label}>
                <span>{icon}</span>
                <strong>{label}</strong>
              </div>
            ))}
            <div className="total-row">Total value: $17.10</div>
          </div>
          <p className="muted">One claim link can contain BTC-backed notes, USDC, SOL, merchant credit, and voucher value.</p>
        </div>

        <div className="wallet-shell brand-panel">
          <div className="phone-bezel">
            <div className="phone-header">
              <span>☰</span>
              <strong>MEMBRA WALLET</strong>
              <span>◇</span>
            </div>
            <p className="muted">Total balance</p>
            <div className="wallet-balance">$212.20</div>
            <div className="wallet-row"><span>₿ BTC Notes</span><strong>$120.00</strong></div>
            <div className="wallet-row"><span>◐ USDC Notes</span><strong>$58.00</strong></div>
            <div className="wallet-row"><span>◎ SOL</span><strong>$34.20</strong></div>
            <div className="wallet-actions"><button>Send</button><button>Claim</button><button>Scan</button></div>
          </div>
        </div>

        <div className="brand-panel feature-panel">
          <p className="eyebrow">KEY FEATURES</p>
          <div className="feature-list">
            {features.map(([title, body]) => (
              <div className="feature-row" key={title}>
                <div className="feature-icon">✧</div>
                <div><h3>{title}</h3><p>{body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-grid" id="security">
        <div className="brand-panel trust-panel">
          <p className="eyebrow">SECURITY & TRUST</p>
          <ul>
            <li>Private by design: links are claim containers, never plaintext keys.</li>
            <li>Double-spend protection: every note is uniquely issued and tracked.</li>
            <li>Proof of reserves: real-time transparency dashboard.</li>
            <li>Federated or custodial reserve boundary is disclosed.</li>
            <li>Optional identity controls for risk-based verification.</li>
          </ul>
        </div>

        <div className="brand-panel usecase-panel">
          <p className="eyebrow center">USE CASES</p>
          <div className="usecase-grid">
            {useCases.map(([title, body]) => (
              <div className="usecase" key={title}>
                <div>✦</div>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="brand-panel footer-panel">
        <div>
          <p className="eyebrow">BRAND ESSENCE</p>
          <p>Turning private household reality into permissioned economic utility through AI, consent, and local matching.</p>
        </div>
        <div className="footer-pills">
          <span>Chat-first</span><span>Private by design</span><span>Local matching</span><span>Nearest warehouse</span>
        </div>
        <strong>MEMBRA · Every apartment is the nearest warehouse.</strong>
      </footer>
    </main>
  )
}
