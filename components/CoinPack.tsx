const assets = [
  {
    symbol: '₿',
    label: 'BTC Note',
    value: '$10'
  },
  {
    symbol: '$',
    label: 'USDC Reserve',
    value: '$5'
  },
  {
    symbol: '◎',
    label: 'SOL Liquidity',
    value: '$2.10'
  }
]

export function CoinPack() {
  return (
    <section className='coinpack'>
      <div className='coinpack__header'>
        <div>
          <div className='coinpack__eyebrow'>COINPACK</div>
          <h2>Programmable bearer packet</h2>
        </div>

        <div className='coinpack__total'>$17.10</div>
      </div>

      <div className='coinpack__assets'>
        {assets.map((asset) => (
          <div className='coinpack__asset' key={asset.label}>
            <div className='coinpack__symbol'>{asset.symbol}</div>

            <div>
              <div className='coinpack__label'>{asset.label}</div>
              <div className='coinpack__value'>{asset.value}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
