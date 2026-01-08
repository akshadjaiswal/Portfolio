import ProfileHeader from '@/components/hero/ProfileHeader';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHubContributions from '@/components/sections/GitHubContributions';
import BookCall from '@/components/sections/BookCall';
import Footer from '@/components/ui/Footer';

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default function Home() {
  return (
    <main className="min-h-screen bg-portfolio-bg">
      <ProfileHeader />
      <Experience />
      <Projects />
      <GitHubContributions />
      <BookCall />
      <Footer />
    </main>
  );
}
