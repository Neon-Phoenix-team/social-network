'use client'

import styles from './page.module.css'
import { useEffect, Suspense, useState } from 'react'

import { useGetMeQuery, useRegistrationConfirmationMutation } from '@/features/auth/api/authApi'
import { EmailVerification } from '@/features/auth/ui/EmailVerification/EmailVerification'

function HomeContent() {
  const [isParamsReady, setIsParamsReady] = useState(false)
  const [params, setParams] = useState({ code: '' })
  const { data: user, isLoading } = useGetMeQuery()
  const isLoggedIn = !!user
  const [confirm, { isSuccess, isError }] =
    useRegistrationConfirmationMutation()

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setParams({
      code: searchParams.get('code') || ''
    })
    setIsParamsReady(true)
  }, [])

  useEffect(() => {
    if (params.code) {
      confirm(params.code)
        .unwrap()
        .catch(err => {
          console.log(err)
        })
    }
  }, [confirm, params.code])

  if (params.code && (isSuccess || isError)) {
    return <EmailVerification showForm isEmailSuccess={isSuccess} />
  }

  if (!isParamsReady || isLoading) {
    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Loading user data...</h1>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.main}>
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
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading user data...</div>}>
      <HomeContent />
    </Suspense>
  )
}
