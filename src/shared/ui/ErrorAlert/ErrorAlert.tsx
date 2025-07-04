'use client'

import { useSelector } from 'react-redux'
import { selectError } from '@/app/model/app-slice'
import { Alert } from '../Alert/Alert'


export const ErrorAlert = () => {
  const error = useSelector(selectError)
  return (
    <Alert type={'error'} message={error} />
  )
}