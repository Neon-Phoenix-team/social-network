import { LogOutOutline } from '@/assets/icons/components'
import { Card } from '@/shared/ui/Card/Card'
import { Button } from '@/shared/ui/Button/Button'
import Link from 'next/link'
import { useState } from 'react'
import s from './LogOut.module.scss'
import item from '../MenuItem/MenuItem.module.scss'
import { useLogoutMutation } from '@/features/auth/api/registrationApi'

export const LogOut = () => {
  const [isActive, setActive] = useState(false)
  const [logout, {isSuccess}] = useLogoutMutation()

  const logoutHandler = () => {
    logout().then(() => {
      if (isSuccess) {
        localStorage.removeItem('accessToken')
      }
    })
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
            <span>`e-mail` !! </span>?
          </p>
          <div className={s.buttonGroup}>
            <Button asChild variant={'outlined'}>
              <Link onClick={closeMenu} href="/">
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
