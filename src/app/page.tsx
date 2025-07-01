'use client'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { EmailVerification } from '@/shared/ui/EmailVerification/EmailVerification'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/registrationApi'
import { useGetMeQuery } from '@/features/auth/signin/model/signInApi'
import Menu from '@/shared/ui/Menu/Menu'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams?.get('code')
  const { data: user, isLoading, isError: isAuthError } = useGetMeQuery()
  const isLoggedIn = !!user
  const email = searchParams?.get('email')

  if (email && code) {
    router.push(`/auth/recoveryPassword/?code=${code}&email=${email}`)
    return null
  }

  const [confirm, { isSuccess, isError }] =
    useRegistrationConfirmationMutation()

  useEffect(() => {
    if (code) {
      confirm(code)
        .unwrap()
        .catch(err => {
          console.log(err)
        })
    }
  }, [confirm, code])

  if (code && (isSuccess || isError)) {
    return <EmailVerification showForm isSuccess={isSuccess} />
  }
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.page}>
      {isLoggedIn && (
        <div className={styles.menuWrapper}>
          <Menu />
        </div>
      )}
      <main className={styles.main}>
        {isLoggedIn ? (
          <>
            <h1>Добро пожаловать, {user.userName}!</h1>
            <p>Ваш email: {user.email}</p>
          </>
        ) : (
          <>
            <h1>Главная страница</h1>
            <p>Пожалуйста, войдите или зарегистрируйтесь</p>
          </>
        )}
      </main>
    </div>
  )
}
