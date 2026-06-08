'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { SiSpotify } from 'react-icons/si';
import type { SpotifyNowPlayingData } from '@/app/api/spotify/route';

const SPOTIFY_GREEN = '#1DB954';

async function fetchNowPlaying(): Promise<SpotifyNowPlayingData> {
  const res = await fetch('/api/spotify');
  if (!res.ok) return { isPlaying: false, track: null };
  return res.json();
}

function EqualizerBars() {
  return (
    <div className="flex items-end gap-px h-4" aria-hidden>
      <span className="eq-bar h-4" style={{ background: SPOTIFY_GREEN }} />
      <span className="eq-bar h-3" style={{ background: SPOTIFY_GREEN }} />
      <span className="eq-bar h-4" style={{ background: SPOTIFY_GREEN }} />
    </div>
  );
}

export default function SpotifyNowPlaying() {
  const { data } = useQuery<SpotifyNowPlayingData>({
    queryKey: ['spotify-now-playing'],
    queryFn:  fetchNowPlaying,
    refetchInterval: 30_000,
    staleTime: 0,
    retry: 1,
  });

  const isPlaying = data?.isPlaying ?? false;
  const track     = data?.track ?? null;

  const progressPct =
    track && track.durationMs > 0
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
        href={track?.trackUrl || 'https://open.spotify.com'}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'group flex items-center gap-3 rounded-xl px-4 py-3',
          'bg-portfolio-light-surface dark:bg-portfolio-surface',
          'border border-portfolio-light-border dark:border-portfolio-border',
          'hover:border-[#1DB954]/40 transition-colors duration-200',
          'max-w-sm overflow-hidden',
          !isPlaying ? 'pointer-events-none' : '',
        ].join(' ')}
        tabIndex={isPlaying ? 0 : -1}
        aria-label={isPlaying && track ? `Now playing: ${track.name} by ${track.artist} on Spotify` : 'Spotify — not playing'}
      >
        {/* Spotify icon or equalizer */}
        <div className="flex-shrink-0 w-5 flex items-center justify-center">
          {isPlaying ? (
            <EqualizerBars />
          ) : (
            <SiSpotify size={18} style={{ color: '#6B7280' }} />
          )}
        </div>

        {/* Album art */}
        {isPlaying && track?.albumArt ? (
          <div className="flex-shrink-0">
            <Image
              src={track.albumArt}
              alt={track.album}
              width={40}
              height={40}
              className="rounded-md object-cover"
              unoptimized={false}
            />
          </div>
        ) : (
          <div className="flex-shrink-0 w-10 h-10 rounded-md bg-portfolio-light-border dark:bg-portfolio-border" />
        )}

        {/* Track info */}
        <div className="flex-1 min-w-0">
          {isPlaying && track ? (
            <>
              <p className="text-sm font-medium text-portfolio-light-text dark:text-portfolio-text truncate leading-tight">
                {track.name}
              </p>
              <p className="text-xs text-portfolio-muted truncate mt-0.5">
                {track.artist}
              </p>
              {/* Progress bar */}
              <div className="mt-1.5 h-0.5 w-full rounded-full bg-portfolio-light-border dark:bg-portfolio-border overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%`, background: SPOTIFY_GREEN }}
                />
              </div>
            </>
          ) : (
            <p className="text-xs text-portfolio-muted">
              Not playing
            </p>
          )}
        </div>

        {/* Spotify wordmark / playing state */}
        <div className="flex-shrink-0">
          {isPlaying ? (
            <SiSpotify size={16} style={{ color: SPOTIFY_GREEN }} />
          ) : (
            <SiSpotify size={16} style={{ color: '#6B7280' }} />
          )}
        </div>
      </a>
    </motion.div>
  );
}
