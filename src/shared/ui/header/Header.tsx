import { Button } from '@/shared/ui/Button/Button'
import styles from './Header.module.scss'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { AdaptiveHeaderMenu } from './AdaptiveHeaderMenu/AdaptiveHeaderMenu'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h2>Inctagram</h2>
        <div className={styles.menu}>
          <div className={styles.langButton}>
            <select>
              <option>Русский</option>
              <option>English</option>
            </select>
          </div>
          <AdaptiveHeaderMenu
            desktopContent={
              <div className={styles.authButtons}>
                <Button variant="text">Log in</Button>
                <Button>Sign up</Button>
              </div>
            }
            mobileContent={
              <div className={styles.authMobileButtons} >
                <Button variant='text'>Log in</Button>
                <Button >Sign up</Button>
              </div>
            }
            burgerIcon={<DotsHorizontalIcon />}
          ></AdaptiveHeaderMenu>
        </div>
      </div>
    </header>
  )
}
