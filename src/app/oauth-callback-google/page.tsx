'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useLoginWithGoogleMutation } from '@/shared/api/authApi/authApi'

export default function GoogleCallbackPage() {
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
  }, [code])

  return <div>Авторизация через Google...</div>
}