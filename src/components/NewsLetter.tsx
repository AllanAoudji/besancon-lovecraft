'use client';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import { bodoniModa } from '@src/utils/fonts';
import Wrapper from './Wrapper';

function NewsLetter() {
  const { form, inputEl, subscribe } = useSubscribeToNewsletter();

  return (
    <Wrapper backgroundColor="darker" className="py-12">
      <h4
        className={`pb-10 text-4xl uppercase text-dark ${bodoniModa.className}`}
      >
        Abonnez-vous à la newsletter
      </h4>
      <form
        className="grid grid-cols-6 gap-x-2 gap-y-4 mx-auto max-w-lg"
        onSubmit={subscribe}
      >
        <input
          autoComplete="email"
          className="col-span-6 bg-dark border-2 text-lg font-bold border-lighter border-opacity-50 duration-300 h-12 outline-none pl-4 text-lighter transition-all focus:border-opacity-100 placeholder:opacity-50 placeholder:text-lighter placeholder:font-normal"
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
          className="col-span-4 col-start-2 bg-dark h-12 px-4 rounded-full uppercase text-darker"
          type="submit"
        >
          {form.state === Form.Loading ? 'loading...' : "S'abonner"}
        </button>
      </form>
    </Wrapper>
  );
}

export default NewsLetter;
