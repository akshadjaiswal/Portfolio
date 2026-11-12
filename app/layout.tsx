import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { PERSONAL_INFO, SITE_URL } from '@/lib/constants'
import { QueryProvider } from '@/lib/query-provider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ClientLayout } from '@/components/providers/ClientLayout'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MotionConfig } from 'framer-motion'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

const SITE_TITLE = `${PERSONAL_INFO.name} — Engineer`
const SITE_DESCRIPTION =
  "Engineer turning people's headaches into shipped products. Building AI products at Erlin AI — LLM agents, full-stack platforms, shipped daily."
const OG_IMAGE = `/api/og?${new URLSearchParams({
  title: PERSONAL_INFO.name,
  description: "Engineer turning people's headaches into shipped products",
})}`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s · ${PERSONAL_INFO.name}` },
  description: SITE_DESCRIPTION,
  authors: [{ name: PERSONAL_INFO.name, url: SITE_URL }],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    type: 'website',
    locale: 'en_US',
    siteName: PERSONAL_INFO.name,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@akshad_999',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
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
        <MotionConfig reducedMotion="user">
          <ThemeProvider>
            <QueryProvider>
              <ClientLayout>{children}</ClientLayout>
            </QueryProvider>
          </ThemeProvider>
        </MotionConfig>
        {/* Vercel Analytics - Track page views and visitor data */}
        <Analytics />
        {/* Vercel Speed Insights - Monitor Core Web Vitals */}
        <SpeedInsights />
      </body>
    </html>
  )
}
