"use client";

import { Button } from "@/shared/ui/Button/Button"
import styles from './ExpiredTokenScreen.module.scss'
import { usePasswordRecoveryResendingMutation } from "@/features/auth/forgotPassword/api/forgotPasswordApi";
import { Card } from "@/shared/ui/Card/Card";
import { Await } from "@/shared/assets/icons/auth/Await";
import { useState } from "react";
import { isApiError } from "@/features/auth/forgotPassword/api/forgotPasswordApi.types";

type PropsType = {
  email?: string | null
}

const modalText = {
  title: "Email sent",
  text: 'We have sent a link to confirm your email to '
}

export const ExpiredTokenScreen = ({ email }: PropsType) => {
  const [resendEmailMessage, { isSuccess, reset: resetMutation }] = usePasswordRecoveryResendingMutation()
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(null)

  const handleResend = async () => {
    try {
      if (email) {
        await resendEmailMessage({ email, baseUrl: "http://localhost:3000" }).unwrap()
        setServerErrorMessage(null)
      }
    } catch (error) {
      if (isApiError(error)) {
        setServerErrorMessage("User with this email doesn't exist")
      }
      console.error("Error", error);
    }
  }

  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)

  return (
    <div className={styles.container}>
      <Card open={isSuccess} title={modalText.title} action={resetMutation}>
        <div>{modalText.text}{email}</div>
      </Card>
      <div className={styles.content}>
        <div className={styles.title}>Email verification link expired</div>
        <div className={styles.text}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </div>
        <div className={styles.button}>
          <Button
            onClick={handleResend}
          >
            Resend link
          </Button>
        </div>
        {serverErrorMessage && (
          <p className={styles.emailError}>{serverErrorMessage}</p>
        )}
      </div>
      <div className={styles.image}>
        <Await />
      </div>
    </div>
  );
};