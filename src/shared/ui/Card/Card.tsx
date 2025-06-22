'use client'

import { Button } from '@/shared/ui/Button/Button'
import s from './Card.module.scss'
import { CloseIcon } from '@/shared/assets/icons/common/Close'



export type CardTextType = {
  title: string
  text: string
  action: () => void
}
export const Card = ({ title,text,action }: CardTextType) => {


  const onClickHandler = () => {
    action()
  }

  return (
    <>
      <div className={s.overlay} />

      <div className={s.wrapper}>
        <div className={s.title}>
          <span>{title}</span>
          <Button
            onClick={onClickHandler}
            variant={'text'}
            style={{ color: '#fff' }}
          >
            <CloseIcon />
          </Button>
        </div>
        <div className={s.textWrapper}>
          <span className={s.text}>{text}</span>
          <Button onClick={onClickHandler}>OK</Button>
        </div>
      </div>
    </>
  )
}
