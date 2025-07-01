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
