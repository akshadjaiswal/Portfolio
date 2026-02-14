import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { PERSONAL_INFO } from '@/lib/constants'
import { QueryProvider } from '@/lib/query-provider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClientLayout } from '@/components/providers/ClientLayout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: `${PERSONAL_INFO.name} - Software Developer`,
  description: `Portfolio of ${PERSONAL_INFO.name}, software developer specializing in modern web applications`,
  openGraph: {
    title: `${PERSONAL_INFO.name} - Software Developer`,
    description: `Portfolio of ${PERSONAL_INFO.name}, software developer specializing in modern web applications`,
    type: 'website',
    locale: 'en_US',
    siteName: `${PERSONAL_INFO.name}'s Portfolio`,
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(PERSONAL_INFO.name)}&description=${encodeURIComponent('Full-Stack Developer & Technical Innovator')}`,
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@akshad_999',
    title: `${PERSONAL_INFO.name} - Software Developer`,
    description: `Portfolio of ${PERSONAL_INFO.name}, software developer specializing in modern web applications`,
    images: [`/api/og?title=${encodeURIComponent(PERSONAL_INFO.name)}&description=${encodeURIComponent('Full-Stack Developer & Technical Innovator')}`],
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('portfolio-theme');
                  if (theme) {
                    const parsed = JSON.parse(theme);
                    const userTheme = parsed.state.theme;

                    let resolvedTheme = 'dark';
                    if (userTheme === 'system') {
                      resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                        ? 'dark'
                        : 'light';
                    } else {
                      resolvedTheme = userTheme;
                    }

                    if (resolvedTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    }
                  } else {
                    // Default to dark theme
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {
                  // If there's an error, default to dark theme
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}>
        <ThemeProvider>
          <QueryProvider>
            <ClientLayout>{children}</ClientLayout>
          </QueryProvider>
        </ThemeProvider>
        {/* Vercel Analytics - Track page views and visitor data */}
        <Analytics />
        {/* Vercel Speed Insights - Monitor Core Web Vitals */}
        <SpeedInsights />
      </body>
    </html>
  )
}
