import { Input } from "@/shared/ui/Input/Input";
import styles from "./NewPasswordForm.module.scss";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/shared/ui/Button/Button";
import { useNewPasswordMutation } from "@/features/auth/forgotPassword/api/forgotPasswordApi";
import { useRouter } from 'next/navigation'
import { NewPasswordFormData, newPasswordSchema } from "@/features/auth/forgotPassword/schemas";

type PropsType = {
  code?: string | null
}

export const NewPasswordForm = ({ code }: PropsType) => {
  const router = useRouter()
  const [resetPassword] = useNewPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema)
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    try {
      if (code) {
        await resetPassword({ newPassword: data.newPassword, recoveryCode: code }).unwrap()

        router.push('/auth/login')
      }
      reset();
    } catch (error) {
      console.error("Error on password change:", error);
    }
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <h2>Create New Password</h2>
        <div className={styles.inputsContainer}>
          <div className={styles.inputPass}>
            <label>
              New password
            </label>
            <Input
              type="password"
              {...register("newPassword")}
              placeholder="New password"
            />
            {errors.newPassword && (
              <p className={styles.inputError}>{errors.newPassword.message}</p>
            )}
          </div>
          <div className={styles.inputPass}>
            <label>
              Password confirmation
            </label>
            <Input
              type="password"
              placeholder="Password confirmation"
              {...register("confirmPassword")}
              errorMessage={errors ? errors?.confirmPassword?.message : ''}
            />
            <span>
              Your password must be between 6 and 20 characters
            </span>
          </div>
        </div>
        <div className={styles.button}>
          <Button
          >
            Create new password
          </Button>
        </div>
      </form>
    </div>
  );
};