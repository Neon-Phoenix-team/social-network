'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function GitHubCallback() {
  const router = useRouter()
  useEffect(() => {
    router.push('/profile')
  }, [])
  return <div>Авторизация через GitHub...</div>;
}