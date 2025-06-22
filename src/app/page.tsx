'use client'
import styles from './page.module.css'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/registrationApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {

   const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const code = searchParams?.get('code')
    const email = searchParams?.get('email')

    if (code && email) {
      router.replace(`/auth/signup?code=${code}&email=${email}`)
    }
  }, [searchParams, router])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Главная страница</h1>
      </main>
    </div>
  )
}
