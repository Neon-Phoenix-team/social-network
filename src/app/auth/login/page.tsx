'use client'
import SigninForm from '@/features/auth/ui/signin/SigninForm'
import styles from '@/app/auth/login/page.module.scss'

export default function SigninPage() {
  return (
    <div className={styles.container}>
      <SigninForm />
    </div>
  )
}
