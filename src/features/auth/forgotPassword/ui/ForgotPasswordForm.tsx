"use client";

import { Button } from "@/shared/ui/Button/Button"
import { Input } from "@/shared/ui/Input/Input"
import { Recaptcha } from "@/shared/ui/Recaptcha/Recaptcha"
import { useForgotPasswordMutation } from "../api/forgotPasswordApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import styles from './ForgotPasswordForm.module.scss'
import { isApiError } from "../api/forgotPasswordApi.types";
import { Card } from "@/shared/ui/Card/Card";
import { ForgotPasswordFormData, forgotPasswordSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PASSWORD_RESET_BASE_URL } from "../constants/urls";

const modalText = {
  title: "Email sent",
  text: 'We have sent a link to confirm your email to '
}

export const ForgotPasswordForm = () => {
  const [forgotPassword, { isSuccess, reset: resetMutation }] = useForgotPasswordMutation();
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null)
  const [email, setEmail] = useState<string>('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: "onBlur",
    defaultValues: {
      email: '',
      recaptchaToken: ''
    }
  });

  const isFormValid = watch("recaptchaToken") && watch("email");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    if (!data.recaptchaToken) {
      setRecaptchaError(true);
      return;
    }

    try {
      await forgotPassword({ email: data.email, recaptcha: data.recaptchaToken, baseUrl: PASSWORD_RESET_BASE_URL }).unwrap();
      setEmail(data.email)
      reset();
      setServerErrorMessage(null)
    } catch (err) {
      if (isApiError(err)) {
        setServerErrorMessage("User with this email doesn't exist")
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      <Card open={isSuccess} title={modalText.title} action={resetMutation}>
        <div>{modalText.text}{email}</div>
        <div className={styles.modalButton}>
          <Button
            onClick={resetMutation}
          >
            OK
          </Button>
        </div>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Forgot Password</h2>
        <div className={styles.emailInput}>
          <label htmlFor="email">
            Email
          </label>
          <Input
            type="default"
            placeholder="email@example.com"
            {...register('email')}
            errorMessage={errors.email?.message}
            onChange={() => setServerErrorMessage(null)}
          />
          {serverErrorMessage && (
            <p className={styles.inputError}>{serverErrorMessage}</p>
          )}
          <div className={styles.text}>
            Enter your email address and we will send you further instructions
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            type="submit"
            disabled={!isFormValid}
          >
            Send Link
          </Button>
          <Button
            variant="text"
          >
            <Link
              href="/auth/login"
            >
              Back to Sign In
            </Link>
          </Button>
        </div>
        <div className={styles.recaptcha}>
          <Recaptcha
            siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={(token) => {
              setValue("recaptchaToken", token || "", { shouldValidate: true });
              setRecaptchaError(!token);
            }}
            error={recaptchaError || !!errors.recaptchaToken}
          />
        </div>
      </form>
    </div>
  );
};