import type { Metadata } from 'next'
import Header from '@/components/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'UNICEF Country Profiles | EdTech Suitability & Compliance',
  description: 'Comprehensive EdTech suitability and compliance profiles for countries worldwide. Understand regulatory environments, digital policies, and deployment conditions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
