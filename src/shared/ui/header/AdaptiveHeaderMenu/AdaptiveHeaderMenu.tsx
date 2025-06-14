'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import styles from './AdaptiveHeaderMenu.module.scss'

interface AdaptiveMenuProps {
  desktopContent: React.ReactNode
  mobileContent: React.ReactNode
  burgerIcon?: React.ReactNode
}

export const AdaptiveHeaderMenu = ({
  desktopContent,
  mobileContent,
  burgerIcon = <HamburgerMenuIcon className={styles.burgerIcon} />
}: AdaptiveMenuProps) => {
  return (
    <>
      <div className={styles.desktopContainer}>
        {desktopContent}
      </div>
      <div className={styles.mobileContainer}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className={styles.burgerButton}
            >
              {burgerIcon}
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={2}
              className={styles.dropdownContent}
            >
              {mobileContent}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </>
  )
}