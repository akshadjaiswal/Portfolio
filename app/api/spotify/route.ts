import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

export interface SpotifyNowPlayingData {
  isPlaying: boolean;
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

const EMPTY: SpotifyNowPlayingData = { isPlaying: false, track: null };

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

export async function GET(): Promise<NextResponse> {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) return NextResponse.json(EMPTY);

    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // 204 = nothing playing
    if (res.status === 204 || !res.ok) return NextResponse.json(EMPTY);

    const data = await res.json();

    if (!data?.item) return NextResponse.json(EMPTY);

    const track = data.item;
    const payload: SpotifyNowPlayingData = {
      isPlaying: data.is_playing ?? false,
      track: {
        name:        track.name,
        artist:      track.artists?.map((a: { name: string }) => a.name).join(', ') ?? '',
        album:       track.album?.name ?? '',
        albumArt:    track.album?.images?.[0]?.url ?? '',
        trackUrl:    track.external_urls?.spotify ?? '',
        durationMs:  track.duration_ms ?? 0,
        progressMs:  data.progress_ms ?? 0,
      },
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(EMPTY);
  }
}
