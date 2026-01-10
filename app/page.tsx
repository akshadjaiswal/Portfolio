import ProfileHeader from '@/components/hero/ProfileHeader';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHubContributions from '@/components/sections/GitHubContributions';
import MyLearning from '@/components/sections/MyLearning';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-portfolio-bg">
      <ProfileHeader />
      <Experience />
      <Projects />
      <GitHubContributions />
      <MyLearning />
      <Footer />
    </main>
  );
}
