'use server';

import { ResumePresignUrlResponse } from '@/types/ResumePresignUrlResponse';
import axios from 'axios';
import { cookies } from 'next/dist/server/request/cookies';

export async function requestPresignUrl(
  formData: FormData
): Promise<{ ok: true; data: ResumePresignUrlResponse } | { ok: false; error: string }> {
  const authToken = (await cookies()).get('authToken')?.value;
  const file = formData.get('file');
  const fileName = file instanceof File ? file.name : null;

  if (!authToken) {
    return { ok: false, error: 'Authentication token missing' };
  }

  try {
    const response = await axios.post(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/presign-url`,
      { filename: fileName },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    return { ok: true, data: response.data };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
