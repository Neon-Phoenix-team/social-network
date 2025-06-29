import { z } from "zod";
import { passwordSchema } from "../../lib/schemas/CommonAuthSchemas";

export const newPasswordSchema = z.object({
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "The passwords must match",
  path: ["confirmPassword"]
});

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;