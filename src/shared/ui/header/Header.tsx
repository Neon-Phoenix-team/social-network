"use client"

import { Button } from '@/shared/ui/Button/Button'
import styles from './Header.module.scss'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { AdaptiveHeaderMenu } from './AdaptiveHeaderMenu/AdaptiveHeaderMenu'
import { SelectBox } from '@/shared/ui/Select/SelectBox'
import { SelectOption } from '@/shared/types/types'
import FlagRussia from '@/assets/icons/components/FlagRussia'
import FlagUnitedKingdom from '@/assets/icons/components/FlagUnitedKingdom'
import { useState } from 'react'

export const Header = () => {

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

  const [selected, setSelected] = useState<SelectOption['value']>('rus')

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h2>Inctagram</h2>
        <div className={styles.menu}>
          <div className={styles.langButton}>
            <SelectBox
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
                <Button variant="text">Log in</Button>
                <Button>Sign up</Button>
              </div>
            }
            mobileContent={
              <div className={styles.authMobileButtons}>
                <Button variant="text">Log in</Button>
                <Button>Sign up</Button>
              </div>
            }
            burgerIcon={<DotsHorizontalIcon />}
          ></AdaptiveHeaderMenu>
        </div>
      </div>
    </header>
  )
}
