'use client';

import { useCheckRecoveryCodeMutation } from "@/features/auth/forgotPassword/api/forgotPasswordApi";
import { ExpiredTokenScreen } from "@/features/auth/forgotPassword/ui/components/ExpiredTokenScreen/ExpiredTokenScreen";
import { NewPasswordForm } from "@/features/auth/forgotPassword/ui/components/NewPasswordForm/NewPasswordForm";
import { LinearProgress } from "@/shared/ui";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useEffect } from "react";

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter()

  const code = searchParams?.get('code');
  const email = searchParams?.get('email');

  useEffect(() => {
    if (!code && !email) {
      router.push('/')
      return
    }
    handleVerify();
  }, [code, router])

  const [checkCode, { isError, isSuccess }] = useCheckRecoveryCodeMutation();

  const handleVerify = async () => {
    if (!code || !email) return;

    try {
      await checkCode({ recoveryCode: code }).unwrap();
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  };

  if (isError) {
    return <ExpiredTokenScreen email={email} />;
  }
  if (isSuccess) {
    return <NewPasswordForm code={code} />;
  }

  return <LinearProgress />
}


