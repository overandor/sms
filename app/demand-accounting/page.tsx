import { DemandLedger } from '@/components/DemandLedger'

export default function DemandAccountingPage() {
  return (
    <main className="page-shell">
      <nav className="demand-nav">
        <a href="/" className="ghost-button">← Membra Money</a>
      </nav>
      <DemandLedger />
    </main>
  )
}
