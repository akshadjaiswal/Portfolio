import Container from './Container';
import SocialLinks from './SocialLinks';
import { PERSONAL_INFO } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-portfolio-border py-12">
      <Container>
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-xl font-medium text-portfolio-text mb-6">
              Let&apos;s Connect
            </h3>
            <SocialLinks />
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-portfolio-muted">
              © {currentYear} {PERSONAL_INFO.name}
            </p>
            <p className="text-xs text-portfolio-muted">
              Built by Akshad 
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
