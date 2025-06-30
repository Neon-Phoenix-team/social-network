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
import { Title } from '@/shared/ui/Title/Title'
import { GoogleLoginButton } from '@/shared/ui/OAuth/GoogleLoginButton/GoogleLoginButton'
import { GitHubLoginButton } from '@/shared/ui/OAuth/GitHubLoginButton/GitHubLoginButton'

export const emailSentText = {
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
      .then(() => {
        reset()
      })
      .catch(err => {
        if (err.status === 400){
        setError(err.data.messages[0].field, {
          type: 'string',
          message: err.data.messages[0].message,
        })
      }})
  }

  return (
    <div className={s.formWrapper}>
      <Card open={isSuccess} title={emailSentText.title} action={resetMutation}>
        <span>
          {emailSentText.text}
          {email}
        </span>
        <Button onClick={resetMutation}>OK</Button>
      </Card>
      <Title>Sign Up</Title>
      <div className={s.links}>
        <GoogleLoginButton />
        <GitHubLoginButton />
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
                      <Link href={'/auth/signup/termsOfService'}>Terms of Service</Link> and{' '}
                      <Link href={'/auth/signup/privacy'}>Privacy Policy</Link>
                    </>
                  }
                  onChange={field.onChange}
                  checked={field.value}
                />
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
            <Link href={'/auth/login'}>Sign In</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
