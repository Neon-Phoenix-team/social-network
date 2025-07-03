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

export interface SignInArgs {
  email: string
  password: string
}

export interface SignInResponse {
  accessToken: 'string'
}

export interface MeResponse {
  userId: number
  userName: string
  email: string
  isBlocked: boolean
}
export interface ApiError {
  status: number
  data?: {
    messages?: Array<{ field: string; message: string }> | string
  }
}
