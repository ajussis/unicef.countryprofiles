import type { Metadata } from 'next'
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
      <body>{children}</body>
    </html>
  )
}
