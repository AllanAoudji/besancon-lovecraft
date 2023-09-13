'use client';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import Wrapper from './Wrapper';
import Title from './Title';

function NewsLetter() {
  const { form, inputEl, subscribe } = useSubscribeToNewsletter();

  return (
    <Wrapper
      backgroundColor="darker"
      className="border-b-4 border-dark py-12 sm:py-16"
    >
      <Title
        className="pb-10 sm:text-center"
        color="dark"
        type="h2"
        uppercase={true}
      >
        Abonnez-vous à la newsletter
      </Title>
      <form
        className="gap-x-2 gap-y-4 grid grid-cols-6 sm:grid-cols-12"
        onSubmit={subscribe}
      >
        <input
          autoComplete="email"
          className="bg-dark border-2 border-lighter border-opacity-50 col-span-6 duration-300 font-bold h-12 text-lg outline-none pl-4 text-lighter transition-all focus:border-opacity-100 placeholder:opacity-50 placeholder:text-lighter placeholder:font-normal sm:col-start-4"
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
        <button
          className="bg-dark col-span-4 col-start-2 h-12 px-4 rounded-full text-darker uppercase sm:col-start-5"
          type="submit"
        >
          {form.state === Form.Loading ? 'loading...' : "S'abonner"}
        </button>
      </form>
    </Wrapper>
  );
}

export default NewsLetter;
