'use client'

import { Button } from '@/shared/ui/Button/Button'
import styles from './Header.module.scss'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { AdaptiveHeaderMenu } from './AdaptiveHeaderMenu/AdaptiveHeaderMenu'
import { SelectBox } from '@/shared/ui/Select/SelectBox'
import { SelectOption } from '@/shared/types/types'
import FlagRussia from '@/assets/icons/components/FlagRussia'
import FlagUnitedKingdom from '@/assets/icons/components/FlagUnitedKingdom'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const router = useRouter()
  const onClickSignup = () =>{router.push('/auth/signup')}
  const onClickLogin = () =>{router.push('/auth/login')}


  const language: SelectOption[] = [
    {
      id: 'rus',
      value: 'rus',
      description: 'Русский',
      img: <FlagRussia />,
    },
    {
      id: 'ue',
      value: 'ue',
      description: 'English',
      img: <FlagUnitedKingdom />,
    },
  ]

  const [selected, setSelected] = useState<SelectOption['value']>('ue')

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h2>Inctagram</h2>
        <div className={styles.menu}>
          <div className={styles.langButton}>
            <SelectBox
              className={styles.customTriggerSelect}
              options={language}
              value={selected}
              onValueChange={setSelected}
              idValue={true}
              // showOnlyDescription={true}
            />
          </div>
          <AdaptiveHeaderMenu
            desktopContent={
              <div className={styles.authButtons}>
                <Button onClick={onClickLogin} variant="text">Log in</Button>
                <Button onClick={onClickSignup}>
                  Sign up
                </Button>
              </div>
            }
            mobileContent={
              <div className={styles.authMobileButtons}>
                <Button onClick={onClickLogin} variant="text">Log in</Button>
                <Button onClick={onClickSignup}>Sign up</Button>
              </div>
            }
            burgerIcon={<DotsHorizontalIcon />}
          ></AdaptiveHeaderMenu>
        </div>
      </div>
    </header>
  )
}
