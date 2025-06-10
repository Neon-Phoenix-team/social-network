'use client'

import * as Toast from '@radix-ui/react-toast'
import { useState } from 'react'
import styles from './Alert.module.scss'
import clsx from 'clsx'

interface AlertProps {
  type: 'success' | 'error'
  message: string
}

export default function Alert({ type, message }: AlertProps) {
  const [open, setOpen] = useState(true)

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={clsx(styles.alert, {
          [styles.success]: type === 'success',
          [styles.error]: type === 'error',
        })}
      >
        <span>{message}</span>
        <Toast.Close className={styles.close}>×</Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  )
}
