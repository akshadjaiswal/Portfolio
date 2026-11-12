import type { Metadata } from 'next';
import { PERSONAL_INFO, SITE_URL } from '@/lib/constants';

const description = `Products ${PERSONAL_INFO.name} has built and shipped — AI tools, developer utilities and full-stack apps.`;
const ogImage = `/api/og?${new URLSearchParams({ title: 'Projects', description })}`;

// Note: openGraph/twitter objects replace (not merge with) the root layout's, so set them fully
export const metadata: Metadata = {
  title: { default: 'Projects', template: `%s · ${PERSONAL_INFO.name}` },
  description,
  alternates: { canonical: '/projects' },
  openGraph: {
    title: `Projects · ${PERSONAL_INFO.name}`,
    description,
    url: `${SITE_URL}/projects`,
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Projects · ${PERSONAL_INFO.name}`,
    description,
    images: [ogImage],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
