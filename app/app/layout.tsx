import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { PERSONAL_INFO } from '@/lib/constants'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${PERSONAL_INFO.name} - Software Developer`,
  description: `Portfolio of ${PERSONAL_INFO.name}, software developer specializing in modern web applications`,
  openGraph: {
    title: `${PERSONAL_INFO.name} - Software Developer`,
    description: `Portfolio of ${PERSONAL_INFO.name}, software developer specializing in modern web applications`,
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@akshad_999',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
