import z from 'zod'
import {
  emailSchema,
  passwordSchema,
} from '@/features/auth/lib/schemas/CommonAuthSchemas'

export const registerFormSchema = z
  .object({
    userName: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .nonempty()
      .regex(/^[0-9a-zA-Z_-]+$/, {
        message: 'Username must contain 0-9, a-z, A-Z, -, _',
      }),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: z.string(),
    termsAgreement: z
      .boolean()
      .refine(val => val, { message: 'TermsAgreement is required' }),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords must match',
    path: ['passwordConfirmation'],
  })


export type Inputs = z.infer<typeof registerFormSchema>
