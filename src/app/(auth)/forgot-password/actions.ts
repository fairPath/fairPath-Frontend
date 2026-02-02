'use server';

import axios from 'axios';

export async function sendPasswordReset(
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = formData.get('email');
  try {
    await axios.post(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/forgot-password`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return { ok: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Forgot password request failed';
    console.error('Forgot password error:', message);
    return {
      ok: false,
      error: message,
    };
  }
}
