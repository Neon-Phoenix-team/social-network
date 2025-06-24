'use client'

import { useState } from 'react'
import GoogleIcon from '@/shared/assets/icons/google/google.svg'
import GithubIcon from '@/shared/assets/icons/github/gihub.svg'

import styles from './Signin.module.scss'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/Button/Button'

import { z } from 'zod'
import { emailSchema, passwordSchema } from '../lib/schemas/CommonAuthSchemas'
import { useLoginMutation } from '@/features/auth/signin/model/signInApi'
import { SignInArgs } from '@/features/auth/signin/model/signInApi.types'

const formSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export default function SigninForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [formErrors, setFormErrors] = useState<{
    email?: string
    password?: string
    general?: string
  }>({})
  const isFormInvalid =
    !!formErrors.email ||
    !!formErrors.password ||
    !form.email.trim() ||
    !form.password.trim()

  const [loginTrigger, { isLoading }] = useLoginMutation()

  const validateField = (field: keyof SignInArgs, value: string) => {
    try {
      formSchema.shape[field].parse(value)
      setFormErrors(prev => ({ ...prev, [field]: undefined }))
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        setFormErrors(prev => ({ ...prev, [field]: err.errors[0].message }))
      }
    }
  }

  const validateForm = () => {
    try {
      formSchema.parse(form)
      setFormErrors({})
      return true
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const errors = err.flatten().fieldErrors
        setFormErrors({
          email: errors.email?.[0],
          password: errors.password?.[0],
        })
      }
      return false
    }
  }
  const handleFieldChange =
    (field: keyof SignInArgs) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setForm(prev => ({ ...prev, [field]: value }))
      validateField(field, value)
    }

  const handleFieldBlur = (field: keyof SignInArgs) => () => {
    validateField(field, form[field])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const result = await loginTrigger(form).unwrap()
      console.log('Успешный вход:', result.accessToken)
      setFormErrors({})
      alert('Авторизация успешна!')
      // Можно сохранить токен или перенаправить
    } catch (apiError: any) {
      console.error('Ошибка авторизации:', apiError)
      if (apiError.status === 400 && apiError.data?.messages) {
        const fieldErrors: Record<string, string> = {}

        const messages = apiError.data.messages

        if (Array.isArray(messages)) {
          for (const msg of messages) {
            if (msg.field === 'email') fieldErrors.email = msg.message
            else if (msg.field === 'password')
              fieldErrors.password = msg.message
            else fieldErrors.general = msg.message
          }
        } else if (typeof messages === 'string') {
          fieldErrors.general = messages
        }

        setFormErrors(prev => ({ ...prev, ...fieldErrors }))
      } else if (apiError.status === 401) {
        setFormErrors(prev => ({
          ...prev,
          general: 'Неверный email или пароль.',
        }))
      } else {
        setFormErrors(prev => ({
          ...prev,
          general: 'Произошла ошибка при попытке входа. Попробуйте позже.',
        }))
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Авторизация</h1>

      <div className={styles.providers}>
        <button className={styles.providerButton}>
          <GoogleIcon width={36} height={36} />
        </button>
        <button className={styles.providerButton}>
          <GithubIcon />
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <label>
          <span className={styles.labelText}>Электронная почта</span>
          <Input
            type="default"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleFieldChange('email')}
            onBlur={handleFieldBlur('email')}
          />
          {formErrors.email && (
            <p className={styles.errorMessage}>{formErrors.email}</p>
          )}
        </label>

        <label className={styles.passwordLabel}>
          <span className={styles.labelText}>Пароль</span>
          <Input
            type="password"
            placeholder="Введите пароль"
            value={form.password}
            onChange={handleFieldChange('password')}
            onBlur={handleFieldBlur('password')}
          />
          {formErrors.password && (
            <p className={styles.errorMessage}>{formErrors.password}</p>
          )}
        </label>

        <div className={styles.forgotWrapper}>
          <a href="#" className={styles.forgot}>
            Забыли пароль
          </a>
        </div>

        {formErrors.general && (
          <p className={styles.errorMessage}>{formErrors.general}</p>
        )}

        <Button title="Войти" disabled={isLoading || isFormInvalid}>
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <p className={styles.registerText}>У вас нет аккаунта?</p>
      <div className={styles.registerLink}>
        <a href="#">Регистрация</a>
      </div>
    </div>
  )
}
