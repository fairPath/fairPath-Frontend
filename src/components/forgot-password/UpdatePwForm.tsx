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
import { updatePassword } from '@/app/(auth)/update-password/actions';

export function UpdatePwForm({ token }: { token?: string }) {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (FormData: FormData) => {
            const result = await updatePassword(FormData, token);
            if (!result.ok) {
              toast.error('Password Reset Failed');
            } else {
              toast.success('Password has been reset successfully.');
              router.push('/login');
            }
          }}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="password">New Password</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="New Password"
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
