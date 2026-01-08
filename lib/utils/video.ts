/**
 * Video platform types
 */
export type VideoType = 'youtube' | 'vimeo' | 'direct' | 'unknown';

/**
 * Detect video platform from URL
 * @param url - Video URL
 * @returns Video platform type
 */
export function getVideoType(url: string): VideoType {
  if (!url) return 'unknown';

  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return 'youtube';
  }

  if (lowerUrl.includes('vimeo.com')) {
    return 'vimeo';
  }

  if (lowerUrl.match(/\.(mp4|webm|ogg)$/i)) {
    return 'direct';
  }

  return 'unknown';
}

/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL
 * @returns Video ID or null if not found
 */
export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  // Regular YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
  const regularMatch = url.match(/[?&]v=([^&]+)/);
  if (regularMatch) {
    return regularMatch[1];
  }

  // Short YouTube URL: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) {
    return shortMatch[1];
  }

  // Embed URL: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?]+)/);
  if (embedMatch) {
    return embedMatch[1];
  }

  return null;
}

/**
 * Get YouTube embed URL from video URL
 * @param url - YouTube URL
 * @returns Embed URL or null if invalid
 */
export function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Extract Vimeo video ID from URL
 * @param url - Vimeo URL
 * @returns Video ID or null if not found
 */
export function getVimeoVideoId(url: string): string | null {
  if (!url) return null;

  // Regular Vimeo URL: https://vimeo.com/VIDEO_ID
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Get Vimeo embed URL from video URL
 * @param url - Vimeo URL
 * @returns Embed URL or null if invalid
 */
export function getVimeoEmbedUrl(url: string): string | null {
  const videoId = getVimeoVideoId(url);
  if (!videoId) return null;
  return `https://player.vimeo.com/video/${videoId}`;
}
