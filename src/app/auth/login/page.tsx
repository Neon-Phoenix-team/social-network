'use client'
import SigninForm from '@/features/auth/signin/ui/SigninForm'
import styles from '@/app/auth/login/page.module.scss'

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <SigninForm />
    </div>
  )
}
