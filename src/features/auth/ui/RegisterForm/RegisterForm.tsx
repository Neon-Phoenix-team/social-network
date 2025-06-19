'use client'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Inputs,
  registerFormSchema,
} from '@/features/auth/lib/schemas/RegisterFormSchema'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import { useRegisterMutation } from '@/features/auth/api/registrationApi'
import s from './RegisterForm.module.scss'
import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/shared/ui/Card/Card'
import { GoogleIcon } from '@/shared/assets/icons/common/GoogleIcon'
import { GitHubIcon } from '@/shared/assets/icons/common/GitHubIcon'

const emailSentText = {
  title: 'Email sent',
  text: 'We have sent a link to confirm your email to ',
}

export const RegisterForm = () => {
  const [registration, { isSuccess, reset: resetMutation }] =
    useRegisterMutation()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      termsAgreement: false,
    },
    resolver: zodResolver(registerFormSchema),
    mode: 'onTouched',
  })

  const [email, setEmail] = useState<string>('')

  const onSubmit: SubmitHandler<Inputs> = data => {
    const dataForRequest = {
      email: data.email,
      password: data.password,
      userName: data.userName,
    }
    setEmail(data.email)
    registration(dataForRequest)
      .unwrap()
      .then(res => {
        reset()
      })
      .catch(err => {
        setError(err.data.messages[0].field, {
          type: 'string',
          message: err.data.messages[0].message,
        })
      })
  }

  if (isSuccess) {
    return (
      <Card
        title={emailSentText.title}
        text={`${emailSentText.text}${email}`}
        action={resetMutation}
      />
    )
  }

  return (
    <div className={s.formWrapper}>
      <h3>Sign Up</h3>
      <div className={s.links}>
        <Button variant={'text'}>
          <Link href={'https://www.google.com/'} target={'_blank'}>
            <GoogleIcon/>
          </Link>
        </Button>
        <Button variant={'text'}>
          <Link href={'https://github.com/'} target={'_blank'}>
          <GitHubIcon/>
          </Link>
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.inputs}>
          <Input
            label="UserName"
            errorMessage={errors.userName?.message}
            {...register('userName')}
          />
          <Input
            label="Email"
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            autoComplete="new-password"
            type={'password'}
            label="Password"
            errorMessage={errors.password?.message}
            {...register('password')}
          />
          <Input
            type={'password'}
            label="Password confirmation"
            errorMessage={errors.passwordConfirmation?.message}
            {...register('passwordConfirmation')}
          />
        </div>
        <Controller
          name={'termsAgreement'}
          control={control}
          rules={{ required: 'You must accept the terms' }}
          render={({ field }) => {
            return (
              <>
                <Checkbox
                  {...field}
                  label={
                    <>
                      I agree to the{' '}
                      <Link href={'/TermsOfService'}>Terms of Service</Link> and{' '}
                      <Link href={'/Privacy'}>Privacy Policy</Link>
                    </>
                  }
                  onChange={field.onChange}
                  checked={field.value}
                  onBlur={field.onBlur}
                />
                {/*  <Alert message={errors.termsAgreement.message} type="error" />*/}
                {/*)} ❗уточнить, нужно ли ошибку показывать*/}
              </>
            )
          }}
        />
        <Button type={'submit'} disabled={!isValid}>
          Sign Up
        </Button>
        <div className={s.signIn}>
          <span>Do you have an account?</span>
          <Button variant={'text'}>
            <Link href={'/'}>Sign In</Link>
          </Button>
        </div>
      </form>
    </div>

  )
}
