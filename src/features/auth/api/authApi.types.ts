export type RegistrationResponse = {
  statusCode: number
  messages: [
    {
      message: string,
      field: 'userName' | 'email' | 'password' | 'passwordConfirmation' | 'termsAgreement' | `root.${string}` | 'root'
    },
  ]
  error: string
}

export type RegistrationRequest = {
  userName: string,
  email: string,
  password: string,
}

export type MeResponse ={
  userId: number,
  userName: string,
  email: string,
  isBlocked: boolean
}