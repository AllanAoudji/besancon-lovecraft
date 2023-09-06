'use client';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import { bodoniModa } from '@src/utils/fonts';

function NewsLetter() {
  const { form, inputEl, subscribe } = useSubscribeToNewsletter();

  return (
    <section className="bg-secondary px-3 py-16">
      <h4 className={`pb-10 text-4xl ${bodoniModa.className}`}>
        Abonnez-vous à la newsletter
      </h4>
      <form className="flex gap-2" onSubmit={subscribe}>
        <div className="grow">
          <input
            autoComplete="email"
            className="bg-secondary border-2 border-light border-opacity-50 duration-300 h-12 outline-none pl-4 text-dark transition-all w-full focus:border-opacity-100 focus:text-dark placeholder:opacity-50 placeholder:text-light"
            placeholder="votre adresse e-mail"
            ref={inputEl}
            required
            type="email"
          />
          <div
            className={`flex font-bold h-12 items-center ${
              form.state === Form.Error ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {form.message && <span>{form.message}</span>}
          </div>
        </div>
        <button
          className="bg-light h-12 px-4 rounded-full uppercase text-dark"
          type="submit"
        >
          {form.state === Form.Loading ? 'loading...' : "S'abonner"}
        </button>
      </form>
    </section>
  );
}

export default NewsLetter;
