import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membra SMS',
  description: 'Digital bearer cash infrastructure'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
