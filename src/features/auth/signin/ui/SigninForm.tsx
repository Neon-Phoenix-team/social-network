'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { emailSchema, passwordSchema } from '../lib/schemas/CommonAuthSchemas'
import { useLoginMutation } from '@/features/auth/signin/model/signInApi'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import styles from './Signin.module.scss'
import { GoogleLoginButton } from '@/shared/ui/OAuth/GoogleLoginButton/GoogleLoginButton'
import { GitHubLoginButton } from '@/shared/ui/OAuth/GitHubLoginButton/GitHubLoginButton'
import { useRouter } from 'next/navigation'

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
    } catch (apiError: any) {
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
        {/*<Button className={styles.providerButton}>*/}
        <GoogleLoginButton />

        {/*<GoogleIcon className={styles.icons} />*/}
        {/*</Button>*/}
        {/*<Button className={styles.providerButton}>*/}
        <GitHubLoginButton />
        {/*<GithubIcon className={styles.icons} />*/}
        {/*</Button>*/}
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

      <p className={styles.registerText}>Don't have an account?</p>
      <div className={styles.registerLink}>
        <Link href={'/auth/signup'}>Register</Link>
      </div>
    </div>
  )
}
