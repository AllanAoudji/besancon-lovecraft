import mailchimp from '@mailchimp/mailchimp_marketing';

// https://agirlcodes.medium.com/setup-a-newsletter-with-next-js-and-mailchimp-d9933cfd785e

import { NextResponse } from 'next/server';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

type Body = { email?: string };

export async function POST(req: Request) {
  const { email }: Body = await req.json();

  if (!email || typeof email !== 'string' || !email.length) {
    return NextResponse.json({
      error:
        'une adresse email valide est requis pour vous abonnez à la newsletter',
    });
  }
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID || '';

  try {
    const res = await mailchimp.lists.addListMember(AUDIENCE_ID, {
      email_address: email,
      status: 'subscribed',
    });

    return NextResponse.json({ message: res.status });
  } catch (error) {
    if (typeof error !== 'object' || error === null) {
      return NextResponse.json({ error: 'error' }, { status: 400 });
    }
    if (
      !('response' in error) ||
      typeof error.response !== 'object' ||
      error.response === null
    ) {
      return NextResponse.json({ error: 'error' }, { status: 400 });
    }

    if (
      !('body' in error.response) ||
      typeof error.response.body !== 'object' ||
      error.response.body === null
    ) {
      return NextResponse.json({ error: 'error' }, { status: 400 });
    }

    if (
      !('title' in error.response.body) ||
      typeof error.response.body.title !== 'string' ||
      error.response.body.title.trim() === ''
    ) {
      return NextResponse.json({ error: 'error' }, { status: 400 });
    }

    if (error.response.body.title === 'Member Exists') {
      return NextResponse.json(
        { error: 'vous êtes déjà inscrit' },
        { status: 400 }
      );
    }

    if (error.response.body.title === 'Invalid Resource') {
      return NextResponse.json(
        {
          error:
            'une adresse email valide est requis pour vous abonnez à la newsletter',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.response.body.title },
      { status: 400 }
    );
  }
}
