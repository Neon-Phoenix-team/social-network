'use client'
import styles from './page.module.css'
import { Picker } from '@/shared/ui/datePicker/Picker'

export default function Home() {

  return (
    <div className={styles.page}>
      <Picker/>
      <main className={styles.main}>
        <h1>Главная страница</h1>
      </main>
    </div>
  )
}
