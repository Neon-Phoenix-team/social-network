'use client'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { EmailVerification } from '@/shared/ui/EmailVerification/EmailVerification'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/authApi'




export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams?.get('code')

  const [confirm, { isSuccess,isError }] = useRegistrationConfirmationMutation()

  const email = searchParams?.get('email')

  useEffect(() => {
    if (code) {
      confirm(code)
        .unwrap()
        .catch(err => {
          console.log(err)
        })
    }
  }, [confirm, code])

  if (email && code) {
    router.push(`/auth/recoveryPassword/?code=${code}&email=${email}`)
    return null
  }

  if (code && (isSuccess || isError)) {
    return <EmailVerification showForm isEmailSuccess={isSuccess} />
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Главная страница</h1>
      </main>
    </div>
  )
}
