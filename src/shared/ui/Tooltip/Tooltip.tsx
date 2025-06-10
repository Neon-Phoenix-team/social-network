'use client'

import { ReactNode, useRef, useState } from 'react'
import s from './Tooltip.module.scss'

type TooltipProps = {
  title?: string;
  content: ReactNode;
  children: ReactNode;
};

export const Tooltip = ({ title, content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true)
    }, 2000)
  }
  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setVisible(false)
  }

  return (
    <div
      className={s.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {visible && (
        <div className={s.tooltipBox}>

          {title && <h2 className={s.title}>{title}</h2>}
          <div className={s.content}>{content}</div>
        </div>
      )}
    </div>
  )
}