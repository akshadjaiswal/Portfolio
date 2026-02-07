import ProfileHeader from '@/components/hero/ProfileHeader';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHubContributions from '@/components/sections/GitHubContributions';
import MyLearning from '@/components/sections/MyLearning';
import Footer from '@/components/ui/Footer';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-portfolio-light-bg dark:bg-portfolio-bg">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <ProfileHeader />
      <Experience />
      <Projects />
      <GitHubContributions />
      <MyLearning />
      <Footer />
    </main>
  );
}
