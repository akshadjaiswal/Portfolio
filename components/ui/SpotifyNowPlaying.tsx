'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { SiSpotify } from 'react-icons/si';
import type { SpotifyNowPlayingData } from '@/app/api/spotify/route';

const SPOTIFY_GREEN = '#1DB954';

async function fetchNowPlaying(): Promise<SpotifyNowPlayingData> {
  const res = await fetch('/api/spotify');
  if (!res.ok) return { isPlaying: false, isRecent: false, track: null };
  return res.json();
}

function EqualizerBars() {
  return (
    <div className="flex items-end gap-px h-3" aria-hidden>
      <span className="eq-bar h-3" style={{ background: '#fff', opacity: 0.9 }} />
      <span className="eq-bar h-2" style={{ background: '#fff', opacity: 0.9 }} />
      <span className="eq-bar h-3" style={{ background: '#fff', opacity: 0.9 }} />
    </div>
  );
}

export default function SpotifyNowPlaying() {
  const { data } = useQuery<SpotifyNowPlayingData>({
    queryKey:        ['spotify-now-playing'],
    queryFn:         fetchNowPlaying,
    refetchInterval: 30_000,
    staleTime:       0,
    retry:           1,
  });

  const isPlaying = data?.isPlaying ?? false;
  const isRecent  = data?.isRecent  ?? false;
  const track     = data?.track     ?? null;

  if (!track) return null;

  const progressPct =
    isPlaying && track.durationMs > 0
      ? Math.min(100, (track.progressMs / track.durationMs) * 100)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mb-8"
    >
      <a
        href={track.trackUrl || 'https://open.spotify.com'}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isPlaying ? `Now playing: ${track.name} by ${track.artist}` : `Recently played: ${track.name} by ${track.artist}`}
        className="group block rounded-xl bg-portfolio-light-surface dark:bg-portfolio-surface border border-portfolio-light-border dark:border-portfolio-border hover:border-[#1DB954]/40 transition-colors duration-200 overflow-hidden"
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <div className="flex items-center gap-1.5">
            <SiSpotify size={13} style={{ color: isPlaying ? SPOTIFY_GREEN : '#6B7280' }} />
            <span className="text-[11px] font-medium tracking-wide uppercase text-portfolio-muted">
              {isPlaying ? 'Now Playing' : 'Recently Played'}
            </span>
          </div>
          {isPlaying && (
            <div className="flex items-end gap-px h-3">
              <span className="eq-bar h-3" style={{ background: SPOTIFY_GREEN, opacity: 0.9 }} />
              <span className="eq-bar h-2" style={{ background: SPOTIFY_GREEN, opacity: 0.9 }} />
              <span className="eq-bar h-3" style={{ background: SPOTIFY_GREEN, opacity: 0.9 }} />
            </div>
          )}
        </div>

        {/* Track row */}
        <div className="flex items-center gap-3 px-4 pb-3">
          {/* Album art */}
          <div className="relative flex-shrink-0">
            <Image
              src={track.albumArt}
              alt={track.album}
              width={48}
              height={48}
              className="rounded-md object-cover"
            />
          </div>

          {/* Track info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-portfolio-light-text dark:text-portfolio-text truncate leading-tight">
              {track.name}
            </p>
            <p className="text-xs text-portfolio-muted truncate mt-0.5">
              {track.artist}
            </p>
            {isPlaying && (
              <div className="mt-2 h-0.5 w-full rounded-full bg-portfolio-light-border dark:bg-portfolio-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%`, background: SPOTIFY_GREEN }}
                />
              </div>
            )}
          </div>

          {/* Album name — desktop only */}
          <p className="hidden sm:block text-xs text-portfolio-muted truncate max-w-[160px] flex-shrink-0">
            {track.album}
          </p>
        </div>
      </a>
    </motion.div>
  );
}
