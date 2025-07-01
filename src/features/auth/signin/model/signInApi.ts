import { baseApi } from '@/shared/api/baseApi'
import {
  MeResponse,
  SignInArgs,
  SignInResponse,
} from '@/features/auth/signin/model/signInApi.types'

export const signInApi = baseApi.injectEndpoints({
  endpoints: build => ({
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
  }),
})
export const { useLoginMutation, useGetMeQuery, useLazyGetMeQuery } = signInApi
