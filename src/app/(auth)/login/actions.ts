'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

type LoginResult = { ok: true } | { ok: false; error: string };
export async function login(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email');
  const password = formData.get('password');

  const cookieStore = await cookies();
  try {
    const response = await axios.post(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status !== 200) {
      return { ok: false, error: 'Login failed' };
    }

    const token = response.data?.token;
    cookieStore.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + response.data?.expiresIn),
      path: '/',
    });
    return { ok: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Login error:', error);
    return { ok: false, error: error.message || 'Login failed' };
  }
}
