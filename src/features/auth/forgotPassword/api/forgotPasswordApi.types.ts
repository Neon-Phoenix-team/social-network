export type ForgotPasswordRequest = {
  email: string,
  recaptcha: string,
  baseUrl: string
}

export type PasswordRecoveryResendingType = {
  email: string,
  baseUrl: string
}

export type CheckRecoveryCodeRequest = {
  recoveryCode?: string | null
}

export type CheckRecoveryCodeResponse = {
  email?: string | null
}

export type ResetPasswordRequest = {
  newPassword: string,
  recoveryCode: string
}

interface ApiError {
  status: number;
  data: {
    error: string,
    statusCode: number,
    messages: Array<{
      message: string;
      field: string;
    }>
  };
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error
  );
}