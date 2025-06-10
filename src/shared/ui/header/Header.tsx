import { Button } from "@/shared/ui/Button/Button"
import styles from "./Header.module.scss"

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
                    <div className={styles.authButtons}>
                        <Button variant="text">Log in</Button>
                        <Button>Sign up</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}