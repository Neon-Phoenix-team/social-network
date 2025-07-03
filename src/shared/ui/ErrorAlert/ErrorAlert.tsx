'use client'

import { useSelector } from 'react-redux'
import { selectError } from '@/app/model/app-slice'
import { Alert } from '@/shared/ui'

export const ErrorAlert = () => {
  const error = useSelector(selectError)
  return <Alert type="error" message={error} isOpen={!!error} duration={5000} />
}
