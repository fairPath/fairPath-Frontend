'use client';
import { useRouter } from 'next/router';
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

const VerifyForm = ({ ...props }: React.ComponentProps<typeof Card>) => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    //call verification api here
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center">Verify your Account</CardTitle>
        <CardDescription className="text-center">
          We sent a 6 digit verification code to your email. Please enter the
          code below to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleVerify}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
              <InputOTP maxLength={6} id="otp" required>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerifyForm;
