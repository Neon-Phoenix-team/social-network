'use client'

import { useSearchParams } from 'next/navigation'
import { useLoginWithGoogleMutation } from '@/features/auth/api/authApi'
import { useEffect, Suspense } from 'react' // Import Suspense

// Create a separate component to use useSearchParams
function GoogleCallbackContent() {
  const searchParams = useSearchParams()!
  const code = searchParams.get('code')

  const [loginWithGoogle] = useLoginWithGoogleMutation()

  useEffect(() => {
    if (!code) return

    loginWithGoogle({
      code,
      redirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL_DEV!,
    })
      .unwrap()
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        window.location.assign('/user')
      })
      .catch((error) => {
        const message = error?.data?.messages?.[0]?.message
        console.error('Ошибка авторизации через Google:', message)
      })
  }, [code, loginWithGoogle])

  return <div>Авторизация через Google...</div>
}

// Wrap the client component in Suspense
export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      {' '}
      {/* You can put a loading spinner here */}
      <GoogleCallbackContent />
    </Suspense>
  )
}
