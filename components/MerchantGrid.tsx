const merchants = [
  'Cafe Node',
  'Transit Hub',
  'Local Market',
  'Street Vendor',
  'Repair Shop',
  'Community Pharmacy'
]

export function MerchantGrid() {
  return (
    <section className='merchant-grid'>
      <div className='merchant-grid__header'>
        <div className='merchant-grid__eyebrow'>LOCAL MESH</div>
        <h2>Merchant settlement network</h2>
      </div>

      <div className='merchant-grid__items'>
        {merchants.map((merchant) => (
          <div className='merchant-grid__item' key={merchant}>
            {merchant}
          </div>
        ))}
      </div>
    </section>
  )
}
