#!/usr/bin/env node
/**
 * One-time Spotify OAuth helper.
 * Run: node scripts/spotify-auth.js
 *
 * Prerequisites:
 *   1. Create a Spotify Developer App at https://developer.spotify.com/dashboard
 *   2. Add redirect URI: http://localhost:3000/api/spotify/callback
 *   3. Set env vars before running:
 *        SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/spotify-auth.js
 */

const readline = require('readline');

const CLIENT_ID     = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI  = 'http://localhost:3000/api/spotify/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\nMissing env vars. Run as:');
  console.error('  SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/spotify-auth.js\n');
  process.exit(1);
}

const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

const authUrl =
  'https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + CLIENT_ID +
  '&scope=' + encodeURIComponent(SCOPES) +
  '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
  '&show_dialog=true';

console.log('\n=== Spotify Auth Setup ===\n');
console.log('1. Open this URL in your browser:\n');
console.log('   ' + authUrl);
console.log('\n2. After authorizing, you will be redirected to localhost (which will fail to load — that is OK).');
console.log('   Copy the full URL from the browser address bar.\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('3. Paste the full redirect URL here: ', async (redirected) => {
  rl.close();

  let code;
  try {
    const url  = new URL(redirected.trim());
    code       = url.searchParams.get('code');
  } catch {
    console.error('\nCould not parse URL. Make sure you pasted the full browser URL.\n');
    process.exit(1);
  }

  if (!code) {
    console.error('\nNo "code" param found in URL.\n');
    process.exit(1);
  }

  console.log('\nExchanging code for tokens...');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: new URLSearchParams({
      grant_type:   'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }).toString(),
  });

  const data = await res.json();

  if (!res.ok || !data.refresh_token) {
    console.error('\nFailed to get tokens:', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  console.log('\n=== SUCCESS ===\n');
  console.log('Add these to your .env.local:\n');
  console.log(`SPOTIFY_CLIENT_ID=${CLIENT_ID}`);
  console.log(`SPOTIFY_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
  console.log('\nDone! Restart your dev server after updating .env.local.\n');
});
