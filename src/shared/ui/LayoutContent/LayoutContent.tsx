'use client'

import { ReactNode } from 'react'
import { Header, Menu } from '@/shared/ui'
import { ErrorAlert } from '@/shared/ui/ErrorAlert/ErrorAlert'
import '@/shared/styles/global/globals.css'
import { useGetMeQuery } from '@/features/auth/api/authApi'

export const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { isSuccess } = useGetMeQuery();

  return (
    <>
      <Header />
      <div className="scroll-container">
        {!!isSuccess && <Menu />}
        <main className="content">{children}</main>
      </div>
      <ErrorAlert />
    </>
  )
}