'use server';

import { getResponseError } from '@/lib/fetch-response';

export async function sendPasswordReset(
  formData: FormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = formData.get('email');
  try {
    const response = await fetch(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/forgot-password`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error(await getResponseError(response, 'Forgot password request failed'));
    }

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
