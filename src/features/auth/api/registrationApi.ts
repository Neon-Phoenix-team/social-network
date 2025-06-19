import { baseApi } from '@/shared/api/baseApi'
import { RegistrationRequest, RegistrationResponse } from '@/features/auth/api/registrationApi.types'


export const RegistrationApi = baseApi.injectEndpoints({
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
    emailResending: build.mutation<RegistrationResponse, string>({
      query: (email) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body: {email}
      })
    }),
  }),
})

export const {useRegisterMutation, useRegistrationConfirmationMutation, useEmailResendingMutation} = RegistrationApi