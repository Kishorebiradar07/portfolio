import { NextResponse } from 'next/server';
import { db } from '@/db';
import { feedback } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const { name, email, company, message, rating } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Insert contact message and optional rating as feedback
    const [inserted] = await db
      .insert(feedback)
      .values({
        rating: rating || 5, // Default rating is 5 if they don't specify
        message: `From: ${name} (${email}) ${company ? `[${company}]` : ''} - Message: ${message}`,
      })
      .returning();

    return NextResponse.json({ success: true, id: inserted.id });
  } catch (error) {
    console.error('Error inserting contact feedback:', error);
    return NextResponse.json({ error: 'Internal server error saving feedback' }, { status: 500 });
  }
}
