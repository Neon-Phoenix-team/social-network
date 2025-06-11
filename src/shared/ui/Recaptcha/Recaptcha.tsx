'use client'
import s from './Recaptcha.module.scss'
import  ReCAPTCHA  from 'react-google-recaptcha'

type RecaptchaProps = {
  siteKey: string;
  onChange?: (token: string | null) => void;
  error: boolean,
  errorMessage?: string | null
};

export const Recaptcha = ({siteKey, onChange,error,errorMessage}: RecaptchaProps) => {
  const handleChange = (token: string | null) => {
    onChange?.(token);
  };

  const className = s.recaptchaWrapper + ' ' + `${error && s.error}`;
  return (
    <div className={className}>
      <ReCAPTCHA theme="dark" hl="en" sitekey={siteKey} onChange={handleChange}/>
      {error && (
        <div className={s.errorText}>
          {errorMessage ?? 'Please verify that you are not a robot'}
        </div>
      )}
    </div>

  );
}
