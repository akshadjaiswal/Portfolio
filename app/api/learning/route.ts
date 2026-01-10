import { NextResponse } from 'next/server';
import { LEARNING_REPOS } from '@/lib/data/learning';
import { fetchLearningRepo } from '@/lib/services/github';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const reposWithStars = await Promise.all(
      LEARNING_REPOS.map(async (repo) => {
        const { stars } = await fetchLearningRepo(repo.owner, repo.name);
        return {
          ...repo,
          stars,
        };
      })
    );

    return NextResponse.json(reposWithStars);
  } catch (error) {
    console.error('Learning API Error:', error);
    // Return repos with 0 stars as fallback
    return NextResponse.json(
      LEARNING_REPOS.map(repo => ({ ...repo, stars: 0 }))
    );
  }
}
