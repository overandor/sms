import { VaultCard } from '@/components/VaultCard'
import { WalletShell } from '@/components/WalletShell'
import { ReserveRing } from '@/components/ReserveRing'
import { SmsComposer } from '@/components/SmsComposer'
import { CoinPack } from '@/components/CoinPack'
import { MerchantGrid } from '@/components/MerchantGrid'

export default function Home() {
  return (
    <main className='page'>
      <section className='hero-panel'>
        <div>
          <div className='hero-panel__eyebrow'>MEMBRA MONEY</div>
          <h1>Private value movement for local economies.</h1>
          <p>
            Digital bearer cash infrastructure for SMS, QR, NFC,
            and merchant settlement.
          </p>
        </div>

        <ReserveRing />
      </section>

      <section className='vault-grid'>
        <VaultCard
          title='Treasury Reserve'
          value='$4.2M'
          label='Assets secured'
        />

        <VaultCard
          title='SMS Claims'
          value='12,481'
          label='Monthly transfers'
        />

        <VaultCard
          title='Merchant Nodes'
          value='284'
          label='Local commerce grid'
        />
      </section>

      <section className='dashboard-grid'>
        <WalletShell />
        <CoinPack />
      </section>

      <section className='composer-grid'>
        <SmsComposer />
        <MerchantGrid />
      </section>
    </main>
  )
}
