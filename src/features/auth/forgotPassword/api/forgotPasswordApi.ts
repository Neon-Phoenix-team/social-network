import { baseApi } from "@/shared/api/baseApi";
import { CheckRecoveryCodeRequest, CheckRecoveryCodeResponse, ForgotPasswordRequest, PasswordRecoveryResendingType, ResetPasswordRequest } from "./forgotPasswordApi.types";

export const forgotPasswordApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    forgotPassword: builder.mutation<void, ForgotPasswordRequest>({
      query: body => ({
        url: '/auth/password-recovery',
        method: "POST",
        body
      })
    }),
    newPassword: builder.mutation<void, ResetPasswordRequest>({
      query: body => ({
        url: '/auth/new-password',
        method: "POST",
        body
      })
    }),
    passwordRecoveryResending: builder.mutation<void, PasswordRecoveryResendingType>({
      query: body => ({
        url: 'auth/password-recovery-resending',
        method: "POST",
        body
      })
    }),
    checkRecoveryCode: builder.mutation<CheckRecoveryCodeResponse, CheckRecoveryCodeRequest>({
      query: body => ({
        url: 'auth/check-recovery-code',
        method: "POST",
        body
      })
    })
  })
})

export const { useForgotPasswordMutation, useCheckRecoveryCodeMutation, usePasswordRecoveryResendingMutation, useNewPasswordMutation } = forgotPasswordApi