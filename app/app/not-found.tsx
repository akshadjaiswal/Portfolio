import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-portfolio-bg flex items-center justify-center">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-medium text-portfolio-text mb-4">404</h1>
          <p className="text-xl text-portfolio-muted mb-8">
            Page not found
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-portfolio-silver text-portfolio-bg rounded-lg hover:bg-opacity-90 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </Container>
    </main>
  );
}
