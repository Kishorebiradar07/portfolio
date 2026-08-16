import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/db';
import { feedback } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const { name, email, company, message } = await req.json();

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
    }
    if (name.length > 100) {
      return NextResponse.json({ error: 'Name must be under 100 characters.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }
    if (email.length > 150) {
      return NextResponse.json({ error: 'Email must be under 150 characters.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message must be under 5000 characters.' }, { status: 400 });
    }

    if (company && (typeof company !== 'string' || company.length > 100)) {
      return NextResponse.json({ error: 'Company must be under 100 characters.' }, { status: 400 });
    }

    // 2. Database Backup Log (Non-blocking telemetry logging)
    if (db && process.env.DATABASE_URL) {
      try {
        await db.insert(feedback).values({
          rating: 5,
          message: `From: ${name} (${email}) ${company ? `[${company}]` : ''} - Message: ${message}`,
        });
      } catch (dbErr) {
        console.warn('Telemetry database backup logging skipped or offline:', dbErr);
      }
    }

    // 3. Check Resend Key
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL || 'biradarkishore07@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

    if (!apiKey) {
      const devError = 'RESEND_API_KEY is not configured on the server. Please set it in your environment variables.';
      console.error('Contact Form Error:', devError);
      return NextResponse.json(
        { 
          error: 'Email service is unconfigured.', 
          devInfo: devError 
        }, 
        { status: 503 }
      );
    }

    // 4. Send Email via Resend
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact Form <${fromEmail}>`,
      to: toEmail,
      subject: `Portfolio Inquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { 
          error: 'Failed to send email through provider.', 
          devInfo: error.message 
        }, 
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Unhandled server error in contact API:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error processing message.', 
        devInfo: errorMsg
      }, 
      { status: 500 }
    );
  }
}
