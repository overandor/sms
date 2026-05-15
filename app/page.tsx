export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(145deg,#020303,#0a0d0c)',
      color: '#f5e7c8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        padding: '48px',
        borderRadius: '32px',
        border: '1px solid rgba(245,199,107,.3)',
        background: 'rgba(12,14,13,.92)',
        boxShadow: '0 0 40px rgba(245,199,107,.12)'
      }}>
        <h1 style={{fontSize:'64px',letterSpacing:'.24em'}}>MEMBRA</h1>
        <p>Private value movement for local economies.</p>
      </div>
    </main>
  )
}
