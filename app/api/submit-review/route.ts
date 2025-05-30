import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const data = await req.json();

  const {
    company,
    position,
    location,
    pay,
    term,
    length,
    major,
    source,
    rating,
    interview,
    description,
  } = data;

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'nnwetzel@icloud.com',
      subject: `New Co-op Review: ${company}`,
      html: `
      <div style="font-family: sans-serif; color: #111; line-height: 1.6; font-size: 15px">
        <h2 style="font-size: 22px; margin-bottom: 16px;">${company} — ${position}</h2>

        <div style="margin-bottom: 8px;"><strong>Location:</strong> ${location}</div>
        <div style="margin-bottom: 8px;"><strong>Pay:</strong> ${pay}</div>
        <div style="margin-bottom: 8px;"><strong>Term:</strong> ${term}</div>
        <div style="margin-bottom: 8px;"><strong>Length:</strong> ${length}</div>
        <div style="margin-bottom: 8px;"><strong>Major:</strong> ${major}</div>
        <div style="margin-bottom: 8px;"><strong>Found via:</strong> ${source}</div>
        <div style="margin-bottom: 16px;"><strong>Rating:</strong> ${rating} / 5</div>

        <h3 style="margin-top: 24px; margin-bottom: 8px;">Application Process</h3>
        <p style="margin: 0 0 16px;">${interview || 'N/A'}</p>

        <h3 style="margin-bottom: 8px;">Review Description</h3>
        <p style="margin: 0;">${description || 'N/A'}</p>
      </div>
    `
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Email failed to send:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}