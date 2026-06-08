import { NextResponse } from 'next/server';

export const revalidate = 3600; // cache 1 hour

const GITHUB_API_BASE = 'https://api.github.com';
const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'akshadjaiswal';
const TOKEN = process.env.GITHUB_TOKEN;

export interface GitHubUserStats {
  totalCommits: number;
  totalPRsMerged: number;
  totalStars: number;
  yearsOnGitHub: number;
  topLanguages: { name: string; percentage: number }[];
  followers: number;
  following: number;
  publicRepos: number;
  bio: string | null;
}

function authHeaders(): HeadersInit {
  const h: HeadersInit = { Accept: 'application/vnd.github.v3+json' };
  if (TOKEN) h['Authorization'] = `Bearer ${TOKEN}`;
  return h;
}

async function fetchTotalCommits(): Promise<number> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/search/commits?q=author:${USERNAME}&per_page=1`,
      {
        headers: {
          ...authHeaders(),
          Accept: 'application/vnd.github.cloak-preview+json',
        },
      }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data.total_count ?? 0;
  } catch {
    return 0;
  }
}

async function fetchTotalPRsMerged(): Promise<number> {
  if (!TOKEN) return 0;
  try {
    const query = `
      query {
        user(login: "${USERNAME}") {
          pullRequests(states: MERGED) {
            totalCount
          }
        }
      }
    `;
    const res = await fetch(`${GITHUB_API_BASE}/graphql`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.data?.user?.pullRequests?.totalCount ?? 0;
  } catch {
    return 0;
  }
}

interface Repo {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  size: number;
}

async function fetchReposData(): Promise<{
  totalStars: number;
  yearsOnGitHub: number;
  topLanguages: { name: string; percentage: number }[];
  followers: number;
  following: number;
  publicRepos: number;
  bio: string | null;
}> {
  try {
    // User profile for account age + profile fields
    const userRes = await fetch(`${GITHUB_API_BASE}/users/${USERNAME}`, {
      headers: authHeaders(),
    });
    const userData = userRes.ok ? await userRes.json() : null;
    const yearsOnGitHub = userData?.created_at
      ? Math.floor((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))
      : 0;
    const followers   = userData?.followers    ?? 0;
    const following   = userData?.following    ?? 0;
    const publicRepos = userData?.public_repos ?? 0;
    const bio         = userData?.bio          ?? null;

    // All owned repos
    const reposRes = await fetch(
      `${GITHUB_API_BASE}/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated`,
      { headers: authHeaders() }
    );
    if (!reposRes.ok) return { totalStars: 0, yearsOnGitHub, topLanguages: [], followers, following, publicRepos, bio };

    const repos: Repo[] = await reposRes.json();
    const ownRepos = repos.filter((r) => !r.fork);

    // Total stars
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    // Language distribution by repo count (primary language per repo)
    const langCounts: Record<string, number> = {};
    for (const repo of ownRepos) {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] ?? 0) + 1;
      }
    }

    const totalLangRepos = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / totalLangRepos) * 100),
      }));

    return { totalStars, yearsOnGitHub, topLanguages, followers, following, publicRepos, bio };
  } catch {
    return { totalStars: 0, yearsOnGitHub: 0, topLanguages: [], followers: 0, following: 0, publicRepos: 0, bio: null };
  }
}

export async function GET(): Promise<NextResponse> {
  const [totalCommits, totalPRsMerged, reposData] = await Promise.all([
    fetchTotalCommits(),
    fetchTotalPRsMerged(),
    fetchReposData(),
  ]);

  const stats: GitHubUserStats = {
    totalCommits,
    totalPRsMerged,
    totalStars:    reposData.totalStars,
    yearsOnGitHub: reposData.yearsOnGitHub,
    topLanguages:  reposData.topLanguages,
    followers:     reposData.followers,
    following:     reposData.following,
    publicRepos:   reposData.publicRepos,
    bio:           reposData.bio,
  };

  return NextResponse.json(stats);
}
