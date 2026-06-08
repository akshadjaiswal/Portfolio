import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  const error = req.nextUrl.searchParams.get('error');

  if (error) {
    return new NextResponse(`<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#e8e8e8">
      <h2 style="color:#f87171">Spotify Auth Error</h2>
      <p>${error}</p>
    </body></html>`, { headers: { 'Content-Type': 'text/html' } });
  }

  if (!code) {
    return new NextResponse(`<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#e8e8e8">
      <h2 style="color:#f87171">No code received</h2>
    </body></html>`, { headers: { 'Content-Type': 'text/html' } });
  }

  return new NextResponse(`<html><body style="font-family:monospace;padding:40px;background:#0a0a0a;color:#e8e8e8">
    <h2 style="color:#1DB954">✓ Got the code — paste this into your terminal</h2>
    <p style="color:#6b7280;margin-bottom:8px">Full URL to paste:</p>
    <textarea onclick="this.select()" style="width:100%;height:80px;background:#1a1a1a;color:#e8e8e8;border:1px solid #2a2a2a;padding:12px;font-family:monospace;font-size:13px;border-radius:8px">${req.url}</textarea>
  </body></html>`, { headers: { 'Content-Type': 'text/html' } });
}
