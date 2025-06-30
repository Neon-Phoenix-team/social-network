'use client'

import * as Progress from '@radix-ui/react-progress'
import s from './LinearProgress.module.scss'

export const LinearProgress = () => {


  return (
    <Progress.Root className={s.root} >
      <div className={`${s.bar} ${s.indeterminate1}`} />
      <div className={`${s.bar} ${s.indeterminate2}`} />
    </Progress.Root>
  )
}