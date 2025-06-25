import { Input } from '@/shared/ui/Input/Input'
import s from './EmailVerification.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { ConfirmSuccess } from '@/shared/assets/icons/auth/ConfirmSuccess'
import { Await } from '@/shared/assets/icons/auth/Await'
import { Email } from '@/features/auth/lib/schemas/CommonAuthSchemas'
import { useState } from 'react'
import { useEmailResendingMutation } from '@/features/auth/api/registrationApi'
import { Title } from '@/shared/ui/Title/Title'
import { useRouter } from 'next/navigation'
import { Card } from '@/shared/ui/Card/Card'
import { emailSentText } from '@/features/auth/ui/RegisterForm/RegisterForm'

type Props = {
  isEmailSuccess: boolean
  showForm?: boolean
  email?: Email | ''
}

export const EmailVerification = ({
  isEmailSuccess,
  showForm,
  email = '',
}: Props) => {
  const router = useRouter()

  const [emailResending, { isSuccess, reset: resetMutation }] =
    useEmailResendingMutation()

  const [emailForSend, setEmailForSend] = useState<Email>(email)

  const onClickResend = () => {
    emailResending(emailForSend)
  }

  const onClickSuccess = () => {
    router.push('/auth/login')
  }

  const onClickCardClose = () => {
    resetMutation()
    router.push('/auth/signup')
    setEmailForSend('')
  }

  return (
    <div className={s.wrapper}>
      <Card open={isSuccess} title={emailSentText.title} action={resetMutation}>
        <span className={s.text}>
          {emailSentText.text}
          {emailForSend}
        </span>
        <Button onClick={onClickCardClose}>OK</Button>
      </Card>
      {isEmailSuccess ? (
        <>
          <Title>Congratulations!</Title>
          <span className={s.text}>Your email has been confirmed</span>
          <Button onClick={onClickSuccess}>Sign In</Button>
          <ConfirmSuccess />
        </>
      ) : (
        <>
          <Title>Email verification link expired</Title>
          <span className={s.text}>
            Looks like the verification link has expired. Not to worry, we can
            send the link again
          </span>
          {showForm && (
            <Input
              value={emailForSend}
              label="Email"
              onChangeText={setEmailForSend}
            />
          )}
          <Button onClick={onClickResend}>Resend verification link</Button>
          <Await />
        </>
      )}
    </div>
  )
}
