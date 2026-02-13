import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

/**
 * Dynamic Open Graph Image Generator
 *
 * Generates beautiful social media preview images for portfolio pages
 * Size: 1200x630px (optimal for Facebook, Twitter, LinkedIn)
 *
 * Query Parameters:
 * - title: Page/project title (max 60 chars recommended)
 * - description: Short description (max 120 chars recommended)
 * - tech: Comma-separated tech stack (e.g., "React,TypeScript,Node.js")
 * - category: Project category (e.g., "Web Development")
 *
 * Example:
 * /api/og?title=My Project&description=A cool app&tech=React,Next.js
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const title = searchParams.get('title') || 'Akshad Jaiswal'
    const description = searchParams.get('description') || 'Full-Stack Developer & Technical Innovator'
    const tech = searchParams.get('tech')?.split(',').filter(Boolean) || []
    const category = searchParams.get('category') || ''

    // Truncate for display
    const displayTitle = title.length > 60 ? title.substring(0, 57) + '...' : title
    const displayDesc = description.length > 120 ? description.substring(0, 117) + '...' : description

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)',
            padding: '60px 80px',
          }}
        >
          {/* Top Section: Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Category Badge */}
            {category && (
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#2A2A2A',
                  border: '1px solid #3A3A3A',
                  borderRadius: 8,
                  padding: '8px 16px',
                  fontSize: 18,
                  color: '#C0C0C0',
                  fontWeight: 500,
                  width: 'fit-content',
                }}
              >
                {category}
              </div>
            )}

            {/* Title */}
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                maxWidth: 1000,
              }}
            >
              {displayTitle}
            </div>

            {/* Description */}
            {description && (
              <div
                style={{
                  fontSize: 28,
                  color: '#A0A0A0',
                  lineHeight: 1.4,
                  maxWidth: 900,
                }}
              >
                {displayDesc}
              </div>
            )}
          </div>

          {/* Bottom Section: Tech Stack & Branding */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
            }}
          >
            {/* Tech Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 800 }}>
              {tech.slice(0, 6).map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    backgroundColor: '#1A1A1A',
                    border: '1px solid #2A2A2A',
                    borderRadius: 6,
                    padding: '8px 16px',
                    fontSize: 20,
                    color: '#C0C0C0',
                    fontWeight: 500,
                  }}
                >
                  {t}
                </div>
              ))}
            </div>

            {/* Branding */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#C0C0C0',
                  letterSpacing: '0.05em',
                }}
              >
                AKSHAD JAISWAL
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: '#6B7280',
                  marginTop: 4,
                }}
              >
                Portfolio
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 400,
              height: 400,
              background: 'radial-gradient(circle, rgba(192,192,192,0.1) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(192,192,192,0.05) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    return new Response('Failed to generate image', { status: 500 })
  }
}
