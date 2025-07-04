'use client'

import { LogOutOutline } from '@/assets/icons/components'
import { Card } from '@/shared/ui/Card/Card'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useState } from 'react'
import s from './LogOut.module.scss'
import item from '@/shared/ui/Menu/MenuItem/MenuItem.module.scss'
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/api/authApi'

export const LogOut = () => {
  const [isActive, setActive] = useState(false)
  const [logout] = useLogoutMutation()

  const { refetch, data: user } = useGetMeQuery()


  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      await refetch()
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const closeMenu = () => {
    logoutHandler()
    setActive(false)
  }

  return (
    <>
      <button
        className={`${item.link} ${s.button}`}
        onClick={() => setActive(true)}
      >
        <span className={item.outline}>
          <LogOutOutline />
          Log Out
        </span>
      </button>
      {isActive && (
        <Card open={isActive} action={closeMenu} title={'Log Out'}>
          <p>
            Are you really want to log out of your account{' '}
            <span>{user?.email}</span>?
          </p>
          <div className={s.buttonGroup}>
            <Button asChild variant={'outlined'}>
              <Link onClick={closeMenu} href="/auth/login">
                Yes
              </Link>
            </Button>
            <Button onClick={closeMenu}>No</Button>
          </div>
        </Card>
      )}
    </>
  )
}
