import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

import { NextResponse } from 'next/server';

// TODO:
// Ajouter une validation par recatcha manuellement
// https://prateeksurana.me/blog/integrating-recaptcha-with-next/

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY,
  server: process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER,
});

type Body = { email?: string };

export async function POST(req: Request) {
  const { email }: Body = await req.json();

  if (!email || typeof email !== 'string' || !email.length) {
    return NextResponse.json(
      {
        error:
          'Une adresse email valide est requis pour vous abonnez à la newsletter des Suivants de la Vouivre.',
      },
      { status: 400 }
    );
  }

  const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || '';
  const subscriberHash = crypto.createHash('md5').update(email).digest('hex');
  let userStatus: mailchimp.Status | undefined;

  try {
    const user = await mailchimp.lists.getListMember(
      AUDIENCE_ID,
      subscriberHash
    );

    userStatus = user.status as mailchimp.Status;
  } finally {
    try {
      // L'utilisateur est déjà inscrit
      if (userStatus === 'subscribed') {
        return NextResponse.json(
          {
            error:
              'Il semblerait que vous soyez déjà inscrit à la newsletter des Suivants de la Vouivre.',
          },
          { status: 400 }
        );
      }
      // Pour tout les autres statuts.....
      if (typeof userStatus === 'string') {
        // Si l'utilisateur est dans ces status, montrer un lien qui redirige vers le formulaire mailchimp :
        // Vous êtes désabonnez, si vous souhaitez vous abonnez de nouveau, cliquer sur ce lien pour recevoir de nouveau la newsletter des Suivants de la Vouivre
        return NextResponse.json({
          message: 'unsubscribed',
        });
      }

      // Si l'utilisateur n'a pas de statut, cela veut donc dire que l'utilisateur n'est pas encore inscrit à la newsletter
      await mailchimp.lists.setListMember(AUDIENCE_ID, subscriberHash, {
        email_address: email,
        status: 'subscribed',
        status_if_new: 'subscribed',
      });

      return NextResponse.json({
        message: 'Votre inscription a été prise en compte. Merci :)',
      });
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
          {
            error:
              'Il semblerait que vous soyez déjà inscrit à la newsletter des Suivants de la Vouivre.',
          },
          { status: 400 }
        );
      }
      if (error.response.body.title === 'Invalid Resource') {
        return NextResponse.json(
          {
            error:
              'Une adresse email valide est requis pour vous abonnez à la newsletter des Suivants de la Vouivre.',
          },
          { status: 400 }
        );
      }

      // Error states where user need to use link form to re subscribe
      if (
        error.response.body.title === 'Forgotten Email Not Subscribed' ||
        error.response.body.title === 'Member In Compliance State'
      ) {
        return NextResponse.json({
          message: 'unsubscribed',
        });
      }
      return NextResponse.json(
        { error: error.response.body.title },
        { status: 400 }
      );
    }
  }
}
