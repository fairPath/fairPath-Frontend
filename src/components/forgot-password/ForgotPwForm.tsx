'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function ForgotPwForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      router.push(`/login`);
      toast.success('Password reset link sent to your email.');
    } else {
      console.error('Signup failed');
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Reset Password</Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
