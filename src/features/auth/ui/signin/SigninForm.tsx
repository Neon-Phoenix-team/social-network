'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from './Signin.module.scss'

import { useRouter } from 'next/navigation'
import {
  emailSchema,
  passwordSchema,
} from '@/features/auth/lib/schemas/CommonAuthSchemas'
import { useLoginMutation } from '@/features/auth/api/authApi'
import { ApiError } from '@/features/auth/api/authApi.types'
import { GoogleLoginButton } from '@/features/auth/ui/OAuth/GoogleLoginButton/GoogleLoginButton'
import { GitHubLoginButton } from '@/features/auth/ui/OAuth/GitHubLoginButton/GitHubLoginButton'

const signinFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

type Inputs = z.infer<typeof signinFormSchema>

export default function SigninForm() {
  const [loginTrigger, { isLoading }] = useLoginMutation()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(signinFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      const result = await loginTrigger(data).unwrap()
      console.log('Successful login:', result.accessToken)
      router.push('/')
      if (result.accessToken) {
        localStorage.setItem('accessToken', result.accessToken)
      }
      reset()
    } catch (error) {
      const apiError = error as ApiError
      console.error('Authorization error:', apiError)
      if (apiError.status === 400 && apiError.data?.messages) {
        // Handle specific field errors from the API
        if (Array.isArray(apiError.data.messages)) {
          apiError.data.messages.forEach(
            (msg: { field: string; message: string }) => {
              if (msg.field === 'email' || msg.field === 'password') {
                setError(msg.field as keyof Inputs, {
                  type: 'server',
                  message: msg.message,
                })
              } else {
                setError('email', { type: 'server', message: msg.message })
              }
            }
          )
        } else if (typeof apiError.data.messages === 'string') {
          setError('email', { type: 'server', message: apiError.data.messages })
        }
      } else if (apiError.status === 401) {
        setError('password', {
          type: 'server',
          message: 'Incorrect email or password.',
        })
      } else {
        setError('email', {
          type: 'server',
          message: 'An error occurred during login. Please try again later.',
        })
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign in</h1>

      <div className={styles.providers}>
        <GoogleLoginButton />
        <GitHubLoginButton />
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label>
          <span className={styles.labelText}>Email</span>
          <Input
            type="default"
            placeholder="email@example.com"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </label>

        <label className={styles.passwordLabel}>
          <span className={styles.labelText}>Password</span>
          <Input
            type="password"
            placeholder="Enter password"
            {...register('password')}
            errorMessage={errors.password?.message}
          />
        </label>

        <div className={styles.forgotWrapper}>
          <Link href={'/auth/forgotPassword'}>Forgot password</Link>
        </div>

        <Button type="submit" disabled={isLoading || !isValid}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <p className={styles.registerText}>Don&apos;t have an account?</p>
      <div className={styles.registerLink}>
        <Link href={'/auth/signup'}>Register</Link>
      </div>
    </div>
  )
}
