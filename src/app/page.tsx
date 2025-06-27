'use client'
import styles from './page.module.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { EmailVerification } from '@/shared/ui/EmailVerification/EmailVerification'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/registrationApi'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams?.get('code')
  const email = searchParams?.get('email')

  if (email && code) {
    router.push(`/auth/recoveryPassword/?code=${code}&email=${email}`);
  }

  const [confirm, { isSuccess }] = useRegistrationConfirmationMutation()
  useEffect(() => {
    if (code) {
      confirm(code)
        .unwrap()
        .catch(err => {
          console.log(err)
        })
    }
  }, [confirm, code])

  if (code) {
    return <EmailVerification showForm isSuccess={isSuccess} />
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Главная страница</h1>
      </main>
    </div>
  )
}
