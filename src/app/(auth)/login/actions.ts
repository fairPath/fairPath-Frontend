'use server';

import { cookies } from 'next/headers';

import { getResponseError } from '@/lib/fetch-response';

type LoginResult = { ok: true } | { ok: false; error: string };
export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email');
  const password = formData.get('password');

  const cookieStore = await cookies();
  try {
    const response = await fetch(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );
    if (response.status !== 200) {
      return { ok: false, error: await getResponseError(response, 'Login failed') };
    }

    const data = (await response.json()) as { token?: string; expiresIn?: number };
    if (!data.token) {
      return { ok: false, error: 'Login failed: missing auth token' };
    }
    const token = data.token;

    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + (data.expiresIn ?? 0)),
      path: '/',
    });
    return { ok: true };
  } catch (error: unknown) {
    console.error('Login error:', error);
    return { ok: false, error: error instanceof Error ? error.message : 'Login failed' };
  }
}
