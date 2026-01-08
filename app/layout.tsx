import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { PERSONAL_INFO } from '@/lib/constants'
import { QueryProvider } from '@/lib/query-provider'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.svg',
    other: [
      { rel: 'icon', url: '/android-chrome-192x192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { rel: 'icon', url: '/android-chrome-512x512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
