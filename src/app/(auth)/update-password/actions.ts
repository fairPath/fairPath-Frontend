'use server';

import axios from 'axios';

type UpdateResult = { ok: true } | { ok: false; error: string };

export async function updatePassword(
  formData: FormData,
  token: string | undefined
): Promise<UpdateResult> {
  const password = formData.get('password');

  console.log(`body {${password}, resetToken${token}}`);

  try {
    const response = await axios.put(
      `${
        process.env.SPRING_BASE_URL || 'http://localhost:8080'
      }/auth/update-password`,
      { password, resetToken: token },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (response.status !== 200) {
      return { ok: false, error: 'Update password failed' };
    }

    return { ok: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Unknown update password error';
    console.error(`update password error ${message}`);
    return { ok: false, error: message };
  }
}
