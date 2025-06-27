'use client';

import { useCheckRecoveryCodeMutation } from "@/features/auth/forgotPassword/api/forgotPasswordApi";
import { ExpiredTokenScreen } from "@/features/auth/forgotPassword/ui/components/ExpiredTokenScreen/ExpiredTokenScreen";
import { NewPasswordForm } from "@/features/auth/forgotPassword/ui/components/NewPasswordForm/NewPasswordForm";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useEffect } from "react";

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const code = searchParams?.get('code');
  const email = searchParams?.get('email');
  const router = useRouter()

  useEffect(() => {
    if (!code) {
      router.push('/')
      return
    }
  }, [])

  const [checkCode, { isError }] = useCheckRecoveryCodeMutation();

  const handleVerify = async () => {
    if (!code || !email) return;

    try {
      await checkCode({ recoveryCode: code }).unwrap();
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  };

  useEffect(() => {
    handleVerify();
  }, []);

  return isError ? (
    <ExpiredTokenScreen email={email} />
  ) : (
    <NewPasswordForm code={code} />
  );
}