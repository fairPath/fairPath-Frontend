'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { toast } from 'sonner';

const callResendAPI = async (email: string) => {
  const response = await fetch('/api/auth/resend-verification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    console.error('Resend verification code failed');
  } else {
    toast.success('Verification code resent successfully.');
  }
};
const VerifyForm = ({ email }: { email: string }) => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    //call verification api here
    const response = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ verificationCode: code, email }),
    });

    if (response.ok) {
      router.push('/login?verified=true');
    } else {
      console.error('Signup failed');
    }
  };

  return (
    <Card className="w-lg">
      <CardHeader>
        <CardTitle className="text-center">Verify your Account</CardTitle>
        <CardDescription className="text-center">
          {` We sent a 6 digit verification code to ${email}. Please enter the
          code below to verify your account.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify}>
          <FieldGroup>
            <Field>
              <FieldLabel className="justify-center" htmlFor="otp">
                Verification Code
              </FieldLabel>
              <InputOTP
                value={code}
                onChange={(value) => setCode(value)}
                maxLength={6}
                id="otp"
                required
              >
                <InputOTPGroup className="mx-auto gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="text-center mt-2">
                Please enter the 6 digit code sent to your email.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Button type="submit" className="w-full mt-4">
              Verify
            </Button>
            <FieldDescription className="text-center mt-2">
              {"Didn't receive the code? "}
              <a
                className="text-blue-500 underline"
                onClick={() => {
                  callResendAPI(email);
                }}
              >
                Resend Code
              </a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyForm;
