'use server';

import { getResponseError } from '@/lib/fetch-response';

type UpdateResult = { ok: true } | { ok: false; error: string };

export async function updatePassword(
  formData: FormData,
  token: string | undefined
): Promise<UpdateResult> {
  const password = formData.get('password');

  try {
    const response = await fetch(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/update-password`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, resetToken: token }),
      }
    );

    if (response.status !== 200) {
      return { ok: false, error: await getResponseError(response, 'Update password failed') };
    }

    return { ok: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown update password error';
    console.error(`update password error ${message}`);
    return { ok: false, error: message };
  }
}
