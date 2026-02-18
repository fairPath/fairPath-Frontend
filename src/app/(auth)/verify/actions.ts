'use server';
import axios from 'axios';

type VerifyResult = { ok: true } | { ok: false; error: string };
export async function verify(email: string, formData: FormData): Promise<VerifyResult> {
  const code = formData.get('code');

  try {
    await axios.post(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/auth/verify`,
      { verificationCode: code, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
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
