'use client'

import { ReactNode } from 'react'
import { useAuthGuard } from '@/shared/hooks/useAuthGuard'

export default function ProtectedLayout ({children}: {children: ReactNode}) {
  const { isLoading } = useAuthGuard();

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
}