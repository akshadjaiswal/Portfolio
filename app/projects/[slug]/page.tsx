import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FALLBACK_PROJECTS } from '@/lib/data/projects';
import { PERSONAL_INFO, SITE_URL } from '@/lib/constants';
import ProjectDetailClient from './ProjectDetailClient';

type Props = { params: Promise<{ slug: string }> };

// Metadata comes from local project data (no GitHub call), so it's fast and rate-limit proof
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = FALLBACK_PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: 'Project not found' };

  const description = project.tagline || project.description;
  const ogImage = `/api/og?${new URLSearchParams({
    title: project.title,
    description,
    tech: (project.technologies ?? []).slice(0, 6).join(','),
    category: project.category ?? '',
  })}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} · ${PERSONAL_INFO.name}`,
      description,
      url: `${SITE_URL}/projects/${slug}`,
      type: 'article',
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} · ${PERSONAL_INFO.name}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  // Every tracked repo has a FALLBACK_PROJECTS entry, so unknown slugs are real 404s
  if (!FALLBACK_PROJECTS.some((p) => p.slug === slug)) notFound();
  return <ProjectDetailClient />;
}
