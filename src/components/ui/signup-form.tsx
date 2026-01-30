'use client';

import { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { signup } from '@/app/(auth)/signup/actions';
import { toast } from 'sonner';

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction] = useActionState(signup, {
    ok: false,
    fieldErrors: {},
  });

  const fieldErrors = state.ok ? {} : (state.fieldErrors ?? {});
  const values = state.ok ? {} : (state.values ?? {});

  useEffect(() => {
    if (!state.ok && state.error) {
      toast.error('Error signing up');
    }
  }, [state]);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information below to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input
                id="first-name"
                type="text"
                name="firstName"
                placeholder="John"
                defaultValue={values.firstName}
                required
              />
              {fieldErrors.firstName && (
                <FieldError className="mt-1">{fieldErrors.firstName}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input
                id="last-name"
                type="text"
                name="lastName"
                placeholder="Doe"
                defaultValue={values.lastName}
                required
              />
              {fieldErrors.lastName && (
                <FieldError className="mt-1">{fieldErrors.lastName}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="user-name">User Name</FieldLabel>
              <Input
                id="user-name"
                type="text"
                name="username"
                placeholder="johndoe123"
                defaultValue={values.username}
                required
              />
              {fieldErrors.username && (
                <FieldError className="mt-1">{fieldErrors.username}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                defaultValue={values.email}
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email with anyone else.
              </FieldDescription>
              {fieldErrors.email && <FieldError className="mt-1">{fieldErrors.email}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                defaultValue={values.password}
                name="password"
                type="password"
                required
              />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
              {fieldErrors.password && (
                <FieldError className="mt-1">{fieldErrors.password}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                defaultValue={values.confirmPassword}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {fieldErrors.confirmPassword && (
                <FieldError className="mt-1">{fieldErrors.confirmPassword}</FieldError>
              )}
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
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
