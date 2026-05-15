export function WalletShell() {
  return (
    <div className='wallet-shell'>
      <div className='wallet-shell__screen'>
        <div className='wallet-shell__eyebrow'>Membra Wallet</div>
        <div className='wallet-shell__balance'>$212.20</div>

        <div className='wallet-shell__row'>
          <span>BTC Notes</span>
          <span>$120.00</span>
        </div>

        <div className='wallet-shell__row'>
          <span>USDC Notes</span>
          <span>$58.00</span>
        </div>

        <div className='wallet-shell__row'>
          <span>SOL Reserve</span>
          <span>$34.20</span>
        </div>

        <div className='wallet-shell__actions'>
          <button>SEND</button>
          <button>CLAIM</button>
          <button>SCAN</button>
        </div>
      </div>
    </div>
  )
}
