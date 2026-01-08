'use client';

import {
  getVideoType,
  getYouTubeEmbedUrl,
  getVimeoEmbedUrl,
} from '@/lib/utils/video';

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
}

export default function VideoEmbed({ videoUrl, title }: VideoEmbedProps) {
  const videoType = getVideoType(videoUrl);

  // Get embed URL based on video type
  let embedUrl: string | null = null;

  if (videoType === 'youtube') {
    embedUrl = getYouTubeEmbedUrl(videoUrl);
  } else if (videoType === 'vimeo') {
    embedUrl = getVimeoEmbedUrl(videoUrl);
  } else if (videoType === 'direct') {
    embedUrl = videoUrl;
  }

  // Don't render if no valid embed URL
  if (!embedUrl) {
    return (
      <div className="rounded-lg bg-portfolio-surface/30 border border-portfolio-border p-6 text-center">
        <p className="text-portfolio-muted">
          Unable to load video. Please check the URL.
        </p>
      </div>
    );
  }

  // Render direct video
  if (videoType === 'direct') {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden bg-portfolio-surface">
        <video
          src={embedUrl}
          controls
          className="w-full h-full"
          title={title}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // Render iframe for YouTube/Vimeo
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-portfolio-surface">
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
