'use client'


import { selectError } from '@/app/model/app-slice'
import { Alert } from '@/shared/ui'
import { useAppSelector } from '@/shared/hooks'



export const ErrorAlert = () => {
  const error = useAppSelector(selectError)
  return <Alert type="error" message={error} isOpen={!!error} duration={5000} />
}