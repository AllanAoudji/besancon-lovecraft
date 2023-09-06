import { Form } from '@/lib/enums';
import { FormEvent, useRef, useState } from 'react';

export function useSubscribeToNewsletter() {
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement>(null);

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setForm({ state: Form.Loading });
    try {
      const res = await fetch(`/api/subscribe`, {
        body: JSON.stringify({
          email: inputEl.current?.value,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const { error } = await res.json();

      if (error) {
        setForm({
          state: Form.Error,
          message: error,
        });
        return;
      }
      if (inputEl.current) {
        inputEl.current.value = '';
      }
      setForm({
        state: Form.Success,
        message: `Success! You've been added to the list!`,
      });
    } catch (e) {
      setForm({
        state: Form.Error,
        message: 'something went wrong...',
      });
    }
  }

  return { subscribe, inputEl, form };
}
