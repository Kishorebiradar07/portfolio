import { NextResponse } from 'next/server';
import { searchKnowledge } from '@/lib/vector';

export async function POST(req: Request) {
  try {
    const { query, limit } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required.' }, { status: 400 });
    }

    const results = await searchKnowledge(query, limit || 3);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error searching database knowledge:', error);
    return NextResponse.json({ error: 'Internal server error during search' }, { status: 500 });
  }
}
