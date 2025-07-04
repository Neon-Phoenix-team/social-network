'use client'

import { Suspense, useCallback, useEffect } from 'react'
import { LinearProgress } from '@/shared/ui'
import { ExpiredTokenScreen } from '@/features/auth/forgotPassword/ui/components/ExpiredTokenScreen/ExpiredTokenScreen'
import { NewPasswordForm } from '@/features/auth/forgotPassword/ui/components/NewPasswordForm/NewPasswordForm'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCheckRecoveryCodeMutation } from '@/features/auth/forgotPassword/api/forgotPasswordApi'

export default function PasswordResetPage() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <PasswordResetContent />
    </Suspense>
  )
}

function PasswordResetContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const code = searchParams?.get('code')
  const email = searchParams?.get('email')

  const [checkCode, { isError, isSuccess }] = useCheckRecoveryCodeMutation()

  const handleVerify = useCallback(async () => {
    if (!code || !email) return

    try {
      await checkCode({ recoveryCode: code }).unwrap()
    } catch (error) {
      console.error('Token verification failed:', error)
    }
  }, [code, email, checkCode])

  useEffect(() => {
    if (!code && !email) {
      router.push('/')
      return
    }
    handleVerify()
  }, [code, email, router, handleVerify])

  if (isError) {
    return <ExpiredTokenScreen email={email} />
  }
  if (isSuccess) {
    return <NewPasswordForm code={code} />
  }

  return <LinearProgress />
}
