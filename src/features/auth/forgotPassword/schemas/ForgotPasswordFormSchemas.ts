import { z } from "zod";
import { emailSchema } from "../../lib/schemas/CommonAuthSchemas";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
  recaptchaToken: z.string().min(1, "Подтвердите, что вы не робот"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;