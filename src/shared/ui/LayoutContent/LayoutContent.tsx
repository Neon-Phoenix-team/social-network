'use client'

import { ReactNode } from 'react'
import { GlobalLinearProgress, Header, Menu } from '@/shared/ui'
import { ErrorAlert } from '@/shared/ui/ErrorAlert/ErrorAlert'
import '@/shared/styles/global/globals.css'
import { useAuthGuard } from '@/shared/hooks'

export const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthGuard();

  return (
    <>
      <Header />
      <div className="scroll-container">
        <GlobalLinearProgress />
        {!!user && <Menu />}
        <main className="content">{children}</main>
      </div>
      <ErrorAlert />

    </>
  )
}
