'use client';

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
import { sendPasswordReset } from '@/app/(auth)/forgot-password/actions';

export function ForgotPwForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData: FormData) => {
            const result = await sendPasswordReset(formData);
            if (!result.ok) {
              toast.error('Failed to send password reset email');
            } else {
              toast.success('Password reset link sent to your email.');
              router.push('/login');
            }
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
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
