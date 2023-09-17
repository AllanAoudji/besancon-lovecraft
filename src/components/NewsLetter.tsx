'use client';

import ReCAPTCHA from 'react-google-recaptcha';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import Wrapper from './Wrapper';
import Grid from './Grid';

function SuccessMessage({ message }: { message?: string }) {
  // affiche le lien vers le formulaire externe si l'utilisateur s'est désabonné
  if (message === 'unsubscribed') {
    return (
      <div className="text-center text-lighter text-xl">
        <div>
          <span>
            Il semblerait que vous vous soyez désabonné de la Newsletter des
            Suivants de la Vouivre
          </span>
        </div>
        <div>
          <span>
            Si vous souhaitez vous abonnez de nouveau, cliquez sur{' '}
            <a
              className="border-b-2 border-lighter font-bold transition-all hover:border-darker hover:text-darker"
              href={process.env.NEXT_PUBLIC_MAILCHIMP_SUBSCRIBTION_LINK}
              target="_blank"
            >
              ce lien
            </a>{' '}
            pour vous réabonnez
          </span>
          <div className="pt-10">
            <a
              href={process.env.NEXT_PUBLIC_MAILCHIMP_SUBSCRIBTION_LINK}
              className="border-2 border-lighter font-bold inline-block px-8 py-3 transition-all hover:bg-lighter hover:text-dark"
              target="_blank"
            >
              Vous ré-abonnez
            </a>{' '}
          </div>
        </div>
      </div>
    );
  }

  // Affiche le message de succès aux nouveaux subscribers
  return (
    <div className="text-center text-lighter text-xl">
      <span>{message ?? 'Votre inscription a été prise en compte.'} </span>
    </div>
  );
}

function NewsLetter() {
  const { form, inputEl, subscribe, onReCAPTCHAChange, recaptchaRef } =
    useSubscribeToNewsletter();

  return (
    <section>
      <Wrapper
        backgroundColor="dark"
        border="bottom"
        borderColor="darker"
        className="py-24 lg:py-32"
      >
        <div className="flex flex-col justify-center items-center gap-1 font-bold pb-10 text-lighter text-center transition-all lg:pb-20">
          <h3 className="text-3xl uppercase">Abonnez-vous à la newsletter</h3>
          <h4 className="text-darker text-xl">
            Soyez les premiers à suivre et connaître l&apos;avancée du projet
          </h4>
        </div>
        {form.state !== Form.Success ? (
          <form onSubmit={subscribe}>
            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onChange={onReCAPTCHAChange}
            />
            <Grid className="gap-y-4">
              <div className="col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-4">
                <input
                  autoComplete="email"
                  className="bg-dark border-2 w-full border-lighter border-opacity-50 duration-300 font-bold h-12 text-lg outline-none pl-4 text-lighter transition-all focus:border-opacity-100 placeholder:opacity-50 placeholder:text-lighter placeholder:font-normal "
                  placeholder="votre adresse e-mail"
                  ref={inputEl}
                  required
                  type="email"
                />
                <div
                  className={`col-span-6 pt-4 text-center ${
                    form.state === Form.Error
                      ? 'text-red-800'
                      : 'text-green-600'
                  }`}
                >
                  {form.message && (
                    <span className="first-letter:uppercase">
                      {form.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="sm:col-start-5 bg-darker border-2 border-darker col-span-4 col-start-2 text-lg h-12 px-4 text-dark transition-all uppercase lg:col-start-auto lg:col-span-2 hover:bg-dark hover:text-darker"
                type="submit"
              >
                {form.state === Form.Loading ? 'loading...' : "S'abonner"}
              </button>
              <div className="col-span-6 pt-4 text-center text-lighter text-sm sm:col-span-6 sm:col-start-4 lg:pt-8">
                This site is protected by reCAPTCHA and the Google{' '}
                <a
                  className="italic"
                  href="https://policies.google.com/privacy"
                  target="_blank"
                >
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a
                  className="italic"
                  href="https://policies.google.com/terms"
                  target="_blank"
                >
                  Terms of Service
                </a>{' '}
                apply.
              </div>
            </Grid>
          </form>
        ) : (
          <SuccessMessage message={form.message} />
        )}
      </Wrapper>
    </section>
  );
}

export default NewsLetter;
