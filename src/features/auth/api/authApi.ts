import { baseApi } from '@/shared/api/baseApi'
import {
  MeResponse,
  RegistrationRequest,
  RegistrationResponse,
  SignInArgs,
  SignInResponse,
} from '@/features/auth/api/authApi.types'
import { Email } from '@/features/auth/lib/schemas/CommonAuthSchemas'



export const AuthApi = baseApi.injectEndpoints({
  endpoints: build => ({
    register: build.mutation<RegistrationResponse, RegistrationRequest>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    registrationConfirmation: build.mutation<RegistrationResponse, string>({
      query: confirmationCode => ({
        url: '/auth/registration-confirmation',
        method: 'POST',
        body: { confirmationCode },
      }),
    }),
    emailResending: build.mutation<RegistrationResponse, Email>({
      query: (email) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body: {email}
      })
    }),
    loginWithGoogle: build.mutation<
      { accessToken: 'string', email: 'string' },
      { code: string; redirectUrl: string }>({
      query: ({ code, redirectUrl }) => ({
        url: '/auth/google/login',
        method: 'POST',
        body: {
          code,
          redirectUrl,
        },
      }),
    }),
    loginWithGitHub: build.query<undefined, void>({
      query: () => {
        const redirectUrl = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL_DEV!;
        return `/auth/github/login?redirect_url=${encodeURIComponent(redirectUrl)}`;
      },
    }),
    login: build.mutation<SignInResponse, SignInArgs>({
      query: body => ({
        method: 'POST',
        url: `/auth/login`,
        body,
      }),
    }),
    getMe: build.query<MeResponse, void>({
      query: () => `/auth/me`,
    }),
    logout: build.mutation<RegistrationResponse, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
    }),
  }),
})

export const {useLoginMutation, useGetMeQuery,useRegisterMutation, useRegistrationConfirmationMutation, useEmailResendingMutation,useLoginWithGoogleMutation, useLogoutMutation,} = AuthApi