'use client'

import { RegisterForm } from '@/features/auth/ui/RegisterForm/RegisterForm'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRegistrationConfirmationMutation } from '@/features/auth/api/registrationApi'

const SignupPage = () => {
  const searchParams = useSearchParams()
  const code = searchParams?.get('code')
  const email = searchParams?.get('email')

  const [mode, setMode] = useState<'confirm' | 'register'>('register')

  const [confirm,{isLoading}] = useRegistrationConfirmationMutation()

  useEffect(() => {
    if (code && email) {
      confirm(code).then(()=> {
        setMode('confirm')
      }).catch((err) =>{
        console.log(err)
      })

    }
  }, [confirm,code, email])
  
  if (isLoading) {
    return <p>загрузка</p>
  }

  return mode === 'confirm' ? <p>confirm</p> : <RegisterForm />

}
export default SignupPage
