import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

export interface SpotifyNowPlayingData {
  isPlaying: boolean;
  isRecent: boolean;
  track: {
    name: string;
    artist: string;
    album: string;
    albumArt: string;
    trackUrl: string;
    durationMs: number;
    progressMs: number;
  } | null;
}

const EMPTY: SpotifyNowPlayingData = { isPlaying: false, isRecent: false, track: null };

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return null;

  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type:    'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }).toString(),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

function extractTrack(track: Record<string, unknown>, progressMs = 0) {
  const album = track.album as Record<string, unknown>;
  const images = album?.images as { url: string }[] | undefined;
  const artists = track.artists as { name: string }[] | undefined;
  const externalUrls = track.external_urls as { spotify?: string } | undefined;

  return {
    name:       (track.name as string) ?? '',
    artist:     artists?.map((a) => a.name).join(', ') ?? '',
    album:      (album?.name as string) ?? '',
    albumArt:   images?.[0]?.url ?? '',
    trackUrl:   (externalUrls?.spotify ?? '').startsWith('https://open.spotify.com') ? (externalUrls?.spotify ?? '') : 'https://open.spotify.com',
    durationMs: (track.duration_ms as number) ?? 0,
    progressMs,
  };
}

async function fetchRecentlyPlayed(accessToken: string): Promise<SpotifyNowPlayingData> {
  try {
    const res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return EMPTY;
    const data = await res.json();
    const item = data?.items?.[0]?.track;
    if (!item) return EMPTY;
    return { isPlaying: false, isRecent: true, track: extractTrack(item) };
  } catch {
    return EMPTY;
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return NextResponse.json(EMPTY);

    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 204 = nothing playing → fall back to recently played
    if (res.status === 204) {
      return NextResponse.json(await fetchRecentlyPlayed(accessToken));
    }

    if (!res.ok) return NextResponse.json(await fetchRecentlyPlayed(accessToken));

    const data = await res.json();

    if (!data?.item) return NextResponse.json(await fetchRecentlyPlayed(accessToken));

    // Currently playing
    const payload: SpotifyNowPlayingData = {
      isPlaying: data.is_playing ?? false,
      isRecent:  false,
      track:     extractTrack(data.item, data.progress_ms ?? 0),
    };

    // Paused → treat as recent so no progress bar shown
    if (!payload.isPlaying) {
      return NextResponse.json(await fetchRecentlyPlayed(accessToken));
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(EMPTY);
  }
}
