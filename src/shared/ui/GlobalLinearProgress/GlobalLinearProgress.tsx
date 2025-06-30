'use client'

import { useIsLoading } from '@/shared/ui/GlobalLinearProgress/model/useLoading'
import { LinearProgress } from '@/shared/ui/LinearProgress/LinearProgress'


export const GlobalLinearProgress = () => {
  const isActive = useIsLoading()
  return isActive ? <LinearProgress /> : null
}
