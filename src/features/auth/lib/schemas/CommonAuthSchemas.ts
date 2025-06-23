import z from 'zod'

export const emailSchema =  z.string().email({
  message: 'The email must match the format example@example.com',
})

export type Email = z.infer<typeof emailSchema>

export const passwordSchema =  z
  .string()
  .min(6, { message: 'Minimum number of characters 6' })
  .max(30, { message: 'Maximum number of characters 20' })
  .refine((val) => /[0-9]/.test(val) && /[a-z]/.test(val) && /[A-Z]/.test(val) && /[!"#$%&'()*+-./:;<=>?@[\]^_`{|}~]/.test(val),{
    message:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~}',
  })


