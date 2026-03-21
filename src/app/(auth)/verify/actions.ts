'use server';
import { ActionResult } from '@/types/action-result';

import { getResponseError } from '@/lib/fetch-response';

export async function verify(email: string, formData: FormData): Promise<ActionResult> {
  const code = formData.get('code');

  try {
    const response = await fetch(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/verify`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode: code, email }),
      }
    );

    if (!response.ok) {
      throw new Error(await getResponseError(response, 'Verify failed'));
    }

    return { ok: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Verify failed';
    console.error('Forgot password error:', message);
    return {
      ok: false,
      error: message,
    };
  }
}

export async function resendVerification(email: string): Promise<ActionResult> {
  try {
    const response = await fetch(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/resend`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      throw new Error(await getResponseError(response, 'Resend verification failed'));
    }

    return { ok: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Resend verification failed';
    console.error('Resend verification error:', message);
    return {
      ok: false,
      error: message,
    };
  }
}
