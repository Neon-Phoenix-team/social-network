'use client'

import Alert from '@/shared/ui/Alert/Alert'
import { useSelector } from 'react-redux'
import { selectError } from '@/app/model/app-slice'


export const ErrorAlert = () => {
  const error = useSelector(selectError)
  return (
    <Alert type={'error'} message={error} open={!!error} />
  )
}