import ProfileHeader from '@/components/hero/ProfileHeader';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHubContributions from '@/components/sections/GitHubContributions';
import MyLearning from '@/components/sections/MyLearning';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/ui/Footer';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorFallback } from '@/components/ui/ErrorFallback';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://akshad-work.vercel.app';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${baseUrl}/#person`,
      name: PERSONAL_INFO.name,
      url: baseUrl,
      jobTitle: PERSONAL_INFO.currentRole,
      description: PERSONAL_INFO.bio,
      sameAs: SOCIAL_LINKS.map((s) => s.url),
      knowsAbout: ['Full-Stack Development', 'React', 'Next.js', 'Node.js', 'Go', 'TypeScript'],
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: `${PERSONAL_INFO.name} — Portfolio`,
      description: PERSONAL_INFO.tagline,
      author: { '@id': `${baseUrl}/#person` },
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Profile Header with Error Boundary */}
      <ErrorBoundary
        fallback={
          <ErrorFallback
            title="Profile section unavailable"
            message="We couldn't load the profile header. Please refresh the page."
          />
        }
      >
        <ProfileHeader />
      </ErrorBoundary>

      {/* Experience Section with Error Boundary */}
      <ErrorBoundary
        fallback={
          <div className="py-10">
            <ErrorFallback
              title="Experience section unavailable"
              message="We couldn't load the experience timeline. Please try again."
            />
          </div>
        }
      >
        <Experience />
      </ErrorBoundary>

      {/* Projects Section with Error Boundary */}
      <ErrorBoundary
        fallback={
          <div className="py-10">
            <ErrorFallback
              title="Projects section unavailable"
              message="We couldn't load the projects. This might be due to GitHub API rate limiting."
            />
          </div>
        }
      >
        <Projects />
      </ErrorBoundary>

      {/* GitHub Contributions with Error Boundary */}
      <ErrorBoundary
        fallback={
          <div className="py-10">
            <ErrorFallback
              title="GitHub contributions unavailable"
              message="We couldn't load the GitHub contribution calendar. Please try again later."
            />
          </div>
        }
      >
        <GitHubContributions />
      </ErrorBoundary>

      {/* Learning Section with Error Boundary */}
      <ErrorBoundary
        fallback={
          <div className="py-10">
            <ErrorFallback
              title="Learning section unavailable"
              message="We couldn't load the learning resources. Please refresh the page."
            />
          </div>
        }
      >
        <MyLearning />
      </ErrorBoundary>

      {/* Testimonials Section with Error Boundary */}
      <ErrorBoundary
        fallback={
          <div className="py-10">
            <ErrorFallback
              title="Testimonials unavailable"
              message="We couldn't load the recommendations. Please refresh the page."
            />
          </div>
        }
      >
        <Testimonials />
      </ErrorBoundary>

      {/* Footer (no error boundary - static content) */}
      <Footer />
    </main>
  );
}
