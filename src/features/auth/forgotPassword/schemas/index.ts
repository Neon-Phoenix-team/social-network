export * from './ForgotPasswordFormSchemas';
export * from './NewPasswordSchemas';

export type ForgotPasswordSchemas = {
  forgotPassword: typeof import('./ForgotPasswordFormSchemas');
  newPassword: typeof import('./NewPasswordSchemas');
};