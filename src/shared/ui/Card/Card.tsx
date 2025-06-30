'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './Card.module.scss'
import { CloseIcon } from '@/shared/assets/icons/common/Close'
import { ReactNode } from 'react'
import { Title } from '@/shared/ui/Title/Title'

export type CardTextType = {
  open: boolean
  title: string
  action: () => void
  children: ReactNode
}
export const Card = ({ title, action, open, children }: CardTextType) => {
  return (
    <>
      {open && (
        <div className={s.overlay}>
          <div className={s.wrapper}>
            <div className={s.title}>
              <Title>{title}</Title>
              <Button
                onClick={action}
                variant={'text'}
                style={{ color: '#fff' }}
              >
                <CloseIcon />
              </Button>
            </div>
            <div className={s.textWrapper}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
