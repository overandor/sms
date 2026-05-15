export function SmsComposer() {
  return (
    <section className='sms-composer'>
      <div className='sms-composer__header'>
        <div>
          <div className='sms-composer__eyebrow'>SMS CLAIM ENGINE</div>
          <h2>Send bearer cash instantly.</h2>
        </div>

        <div className='sms-composer__status'>LIVE</div>
      </div>

      <div className='sms-composer__grid'>
        <input placeholder='+1 555 0100' />
        <input placeholder='$10 BTC Note' />
      </div>

      <textarea
        placeholder='Membra Money claim link will appear here...'
      />

      <button>GENERATE CLAIM</button>
    </section>
  )
}
