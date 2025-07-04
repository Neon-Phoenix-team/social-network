'use client'

import * as Toast from '@radix-ui/react-toast'
import { useState, useEffect } from 'react'
import styles from './Alert.module.scss'
import clsx from 'clsx'

interface AlertProps {
  type: 'success' | 'error'
  message: string | null
  isOpen: boolean
  duration?: number
}

export const Alert = ({
  type,
  message,
  isOpen: externalOpen,
  duration,
}: AlertProps) => {
  const [internalOpen, setInternalOpen] = useState(false)

  // Синхронизируем внутреннее состояние с внешним isOpen
  useEffect(() => {
    if (externalOpen && message) {
      setInternalOpen(true)
      if (duration) {
        const timer = setTimeout(() => setInternalOpen(false), duration)
        return () => clearTimeout(timer)
      }
    }
  }, [externalOpen, message, duration])

export const Alert = ({ type, message }: AlertProps)=> {
  const [open, setOpen] = useState(true)

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={internalOpen}
        onOpenChange={setInternalOpen}
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
