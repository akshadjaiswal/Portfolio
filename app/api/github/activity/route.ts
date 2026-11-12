import { NextResponse } from 'next/server';

export const revalidate = 600; // 10 minutes — "today" should feel live, not hammer GitHub

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'akshadjaiswal';
const TOKEN = process.env.GITHUB_TOKEN;

export interface GitHubActivity {
  today: number;
  week: number;
  lastActiveDate: string | null; // YYYY-MM-DD of most recent day with contributions
}

const EMPTY: GitHubActivity = { today: 0, week: 0, lastActiveDate: null };

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }
`;

export async function GET() {
  // Contribution calendar is GraphQL-only, which requires a token
  if (!TOKEN) return NextResponse.json(EMPTY);

  try {
    const to = new Date();
    const from = new Date(to.getTime() - 6 * 24 * 60 * 60 * 1000);

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: USERNAME, from: from.toISOString(), to: to.toISOString() },
      }),
    });
    if (!res.ok) return NextResponse.json(EMPTY);

    const data = await res.json();
    const weeks: { contributionDays: { date: string; contributionCount: number }[] }[] =
      data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];
    const days = weeks.flatMap((w) => w.contributionDays);
    if (days.length === 0) return NextResponse.json(EMPTY);

    const week = days.reduce((sum, d) => sum + d.contributionCount, 0);
    const today = days[days.length - 1].contributionCount;
    const lastActive = [...days].reverse().find((d) => d.contributionCount > 0);

    return NextResponse.json({
      today,
      week,
      lastActiveDate: lastActive?.date ?? null,
    } satisfies GitHubActivity);
  } catch {
    return NextResponse.json(EMPTY);
  }
}
