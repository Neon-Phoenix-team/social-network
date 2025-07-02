'use client'

import { useCheckRecoveryCodeMutation } from '@/features/auth/forgotPassword/api/forgotPasswordApi'
import { ExpiredTokenScreen } from '@/features/auth/forgotPassword/ui/components/ExpiredTokenScreen/ExpiredTokenScreen'
import { NewPasswordForm } from '@/features/auth/forgotPassword/ui/components/NewPasswordForm/NewPasswordForm'
import { useRouter, useSearchParams } from 'next/navigation' // Correct import path for useRouter and useSearchParams
import { useEffect, useState, Suspense } from 'react' // Import Suspense

// Create a separate component that uses client-side hooks
function PasswordResetContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const code = searchParams?.get('code')
  const email = searchParams?.get('email')

  const [checkCode, { isError }] = useCheckRecoveryCodeMutation()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleVerify = async () => {
    if (!code) {
      router.push('/') // Redirect if no code
      setIsLoading(false) // Stop loading even if no code
      return
    }

    try {
      await checkCode({ recoveryCode: code }).unwrap()
    } catch (error) {
      console.error('Token verification failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Only run handleVerify if code is available or after initial render
    // The check for !code and router.push('/') is now inside handleVerify
    handleVerify()
  }, [handleVerify]) // Depend on handleVerify to avoid exhaustive-deps warning if it's memoized

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <ExpiredTokenScreen email={email} />
  }

  return <NewPasswordForm code={code} />
}

// Wrap the client component in Suspense
export default function PasswordResetPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы сброса пароля...</div>}>
      <PasswordResetContent />
    </Suspense>
  )
}
