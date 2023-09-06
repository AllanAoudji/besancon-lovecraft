'use client';

import { Form } from '@/lib/enums';
import { useSubscribeToNewsletter } from '@src/hooks/useSubscribeToNewsletter';
import { bodoniModa } from '@src/utils/fonts';

function NewsLetter() {
  const { subscribe, form, inputEl } = useSubscribeToNewsletter();

  console.log(form);

  return (
    <section className="py-16 px-3 bg-secondary">
      <h4 className={`pb-10 text-4xl ${bodoniModa.className}`}>
        Abonnez-vous à la newsletter
      </h4>
      <form className="flex gap-2" onSubmit={subscribe}>
        <div className="grow">
          <input
            ref={inputEl}
            placeholder="votre adresse e-mail"
            type="email"
            autoComplete="email"
            className="bg-secondary border-2 border-light border-opacity-50 duration-300 h-12 outline-none pl-4 transition-all text-dark w-full focus:border-opacity-100 focus:text-dark placeholder:opacity-50 placeholder:text-light"
            required
          />
          <div
            className={`flex items-center h-12 font-bold ${
              form.state === Form.Error ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {form.message && <span>{form.message}</span>}
          </div>
        </div>
        <button
          className="uppercase bg-light text-dark h-12 px-4 rounded-full"
          type="submit"
        >
          {form.state === Form.Loading ? <span>loading...</span> : "S'abonner"}
        </button>
      </form>
    </section>
  );
}

export default NewsLetter;
