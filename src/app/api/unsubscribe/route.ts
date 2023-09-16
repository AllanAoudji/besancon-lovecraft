import mailchimp from '@mailchimp/mailchimp_marketing';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

type Body = { email?: string };

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER,
});

export async function DELETE(req: Request) {
  const { email }: Body = await req.json();

  if (!email || typeof email !== 'string' || !email.length) {
    return NextResponse.json({
      error:
        'une adresse email valide est requis pour vous abonnez à la newsletter',
    });
  }

  const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || '';

  const subscriberHash = crypto.createHash('md5').update(email).digest('hex');

  try {
    await mailchimp.lists.deleteListMember(AUDIENCE_ID, subscriberHash);
    return NextResponse.json({ message: 'Vous êtes désinscrit' });
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

    if (error.response.body.title === 'Method Not Allowed') {
      return NextResponse.json(
        { error: 'vous êtes déjà désinscrit' },
        { status: 400 }
      );
    }

    if (error.response.body.title === 'Resource Not Found') {
      return NextResponse.json(
        {
          error: "Cette adresse e-mail n'est pas inscrit à la newsletter",
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
