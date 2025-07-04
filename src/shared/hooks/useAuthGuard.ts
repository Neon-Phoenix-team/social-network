'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetMeQuery } from '@/features/auth/api/authApi'

export function useAuthGuard() {
  const { data, isLoading, isError } = useGetMeQuery()
  const router = useRouter()
  useEffect(() => {
    if (isError || data?.isBlocked) {
      router.replace('/auth/login')
    }
  }, [isLoading, isError, data, router])

  return { user: data, isLoading }
}
