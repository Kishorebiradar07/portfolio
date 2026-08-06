import { NextResponse } from 'next/server';
import { db } from '@/db';
import { recruiters } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const { company, email, roleInterest } = await req.json();

    if (!company) {
      return NextResponse.json({ error: 'Company name is required.' }, { status: 400 });
    }

    // Insert recruiter log into PostgreSQL
    const [inserted] = await db
      .insert(recruiters)
      .values({
        company,
        email: email || null,
        roleInterest: roleInterest || 'default',
      })
      .returning();

    return NextResponse.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error('Error logging recruiter details:', error);
    return NextResponse.json({ error: 'Internal server error logging details' }, { status: 500 });
  }
}
