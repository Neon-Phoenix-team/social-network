import { baseApi } from '@/shared/api/baseApi'
import {
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
  }),
})
export const { useLoginMutation } = signInApi
