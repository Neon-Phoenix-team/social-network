'use client'
import styles from './page.module.css'
import { Picker } from '@/shared/ui/datePicker/Picker'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { EmailVerification } from '@/shared/ui/EmailVerification/EmailVerification'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/registrationApi'

export default function Home() {

  const searchParams = useSearchParams()
  const code = searchParams?.get('code')
  const [confirm,{isSuccess}] = useRegistrationConfirmationMutation()
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
      <Picker/>
      <main className={styles.main}>
        <h1>Главная страница</h1>
      </main>
    </div>
  )
}
