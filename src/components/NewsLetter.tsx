'use client';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import Wrapper from './Wrapper';
import Title from './Title';
import Grid from './Grid';

function NewsLetter() {
  const { form, inputEl, subscribe } = useSubscribeToNewsletter();

  return (
    <Wrapper
      backgroundColor="darker"
      className="border-b-4 border-dark py-12 sm:py-20 lg:py-28"
    >
      <Title
        className="pb-10 sm:text-center sm:pb-20"
        color="dark"
        type="h2"
        uppercase={true}
      >
        Abonnez-vous à la newsletter
      </Title>
      <form onSubmit={subscribe}>
        <Grid>
          <div className="col-span-6 sm:col-start-2 lg:col-span-4 lg:col-start-4">
            <input
              autoComplete="email"
              className="bg-dark border-2 w-full border-lighter border-opacity-50 duration-300 font-bold h-12 text-lg outline-none pl-4 text-lighter transition-all focus:border-opacity-100 placeholder:opacity-50 placeholder:text-lighter placeholder:font-normal "
              placeholder="votre adresse e-mail"
              ref={inputEl}
              required
              type="email"
            />
            <div
              className={`col-span-6 flex font-bold items-center ${
                form.state === Form.Error ? 'text-light' : 'text-green-600'
              }`}
            >
              {form.message && <span>{form.message}</span>}
            </div>
          </div>
          <button
            className="bg-dark col-span-4 col-start-2 h-12 px-4 rounded-full text-darker uppercase lg:col-start-auto lg:col-span-2"
            type="submit"
          >
            {form.state === Form.Loading ? 'loading...' : "S'abonner"}
          </button>
        </Grid>
      </form>
    </Wrapper>
  );
}

export default NewsLetter;
