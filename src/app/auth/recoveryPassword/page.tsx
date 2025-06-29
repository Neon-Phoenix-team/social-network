'use client';

import { useCheckRecoveryCodeMutation } from "@/features/auth/forgotPassword/api/forgotPasswordApi";
import { ExpiredTokenScreen } from "@/features/auth/forgotPassword/ui/components/ExpiredTokenScreen/ExpiredTokenScreen";
import { NewPasswordForm } from "@/features/auth/forgotPassword/ui/components/NewPasswordForm/NewPasswordForm";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const code = searchParams?.get('code');
  const email = searchParams?.get('email');

  useEffect(() => {
    if (!code) {
      router.push('/')
      return
    }
    handleVerify();
  }, [code, router])

  const [checkCode, { isError }] = useCheckRecoveryCodeMutation();

  const handleVerify = async () => {
    if (!code || !email) return;

    try {
      await checkCode({ recoveryCode: code }).unwrap();
    } catch (error) {
      console.error('Token verification failed:', error);
    } finally {
      setIsLoading(false)
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <ExpiredTokenScreen email={email} />;
  }

  return <NewPasswordForm code={code} />
}