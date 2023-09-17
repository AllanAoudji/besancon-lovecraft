import { Form } from '@/lib/enums';
import { FormEvent, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export function useSubscribeToNewsletter() {
  const [form] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onReCAPTCHAChange = (captchaCode: string | null) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    // Else reCAPTCHA was executed successfully so proceed with the
    // alert
    alert(`Hey`);
    // Reset the reCAPTCHA so that it can be executed again if user
    // submits another email.
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  async function subscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('subscibe');

    if (recaptchaRef.current) {
      console.log('recatcha');
      recaptchaRef.current.execute();
    }

    // setForm({ state: Form.Loading });
    // try {
    //   const res = await fetch(`/api/subscribe`, {
    //     body: JSON.stringify({
    //       email: inputEl.current?.value,
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     method: 'POST',
    //   });

    //   const { error, message } = await res.json();

    //   if (error) {
    //     setForm({
    //       state: Form.Error,
    //       message: error,
    //     });
    //     return;
    //   }
    //   if (inputEl.current) {
    //     inputEl.current.value = '';
    //   }
    //   setForm({
    //     state: Form.Success,
    //     message: message
    //       ? message
    //       : `Votre inscription a été prise en compte. Merci :)`,
    //   });
    // } catch (e) {
    //   setForm({
    //     state: Form.Error,
    //     message: 'something went wrong...',
    //   });
    // }
  }

  return { subscribe, inputEl, form, onReCAPTCHAChange, recaptchaRef };
}
