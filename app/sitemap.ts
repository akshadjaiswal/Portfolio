import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { FALLBACK_PROJECTS } from '@/lib/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects: MetadataRoute.Sitemap = FALLBACK_PROJECTS.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.lastUpdated || p.createdAt,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/projects`, changeFrequency: 'weekly', priority: 0.8 },
    ...projects,
  ];
}
