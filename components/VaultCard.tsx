type VaultCardProps = {
  title: string
  value: string
  label: string
}

export function VaultCard({ title, value, label }: VaultCardProps) {
  return (
    <section className='vault-card'>
      <div className='vault-card__title'>{title}</div>
      <div className='vault-card__value'>{value}</div>
      <div className='vault-card__label'>{label}</div>
    </section>
  )
}
