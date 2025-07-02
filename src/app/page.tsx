'use client'

import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react' // Import Suspense
import { EmailVerification } from '@/shared/ui/EmailVerification/EmailVerification'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/authApi'
import { useGetMeQuery } from '@/features/auth/signin/model/signInApi'

// Create a separate client component that uses searchParams and useRouter
function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams() // This hook causes the issue

  const code = searchParams?.get('code')
  const { data: user, isLoading } = useGetMeQuery()
  const isLoggedIn = !!user
  const email = searchParams?.get('email')
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

  // Redirect logic, ensure it's executed on client
  // Note: router.push in useEffect is generally safer for complex logic
  useEffect(() => {
    if (email && code) {
      // This redirect will happen after client-side hydration
      router.push(`/auth/recoveryPassword/?code=${code}&email=${email}`)
      // No need to return null here, as it's inside useEffect
    }
  }, [email, code, router])

  if (code && (isSuccess || isError)) {
    return <EmailVerification showForm isEmailSuccess={isSuccess} />
  }
  if (isLoading) {
    return <div>Loading user data...</div> // Specific loading message for user data
  }

  return (
    <div className={styles.page}>
       {/*{isLoggedIn && (*/}
      {/*  <div className={styles.menuWrapper}>*/}
      {/*    <Menu />*/}
      {/*  </div>*/}
      {/*)}*/}
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

// Wrap the HomeContent in a Suspense boundary
export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка главной страницы...</div>}>
      <HomeContent />
    </Suspense>
  )
}
