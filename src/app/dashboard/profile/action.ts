'use server';

import { ResumePresignUrlResponse } from '@/types/ResumePresignUrlResponse';
import axios from 'axios';
import { refresh } from 'next/cache';
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
    refresh();
    return { ok: true, data: response.data };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteResume(): Promise<{ ok: true } | { ok: false; error: string }> {
  const authToken = (await cookies()).get('authToken')?.value;

  if (!authToken) {
    return { ok: false, error: 'Authentication token missing' };
  }
  try {
    const response = await axios.delete(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/delete`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      refresh();
      return { ok: true };
    }
    return { ok: false, error: 'Failed to delete resume' };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function downloadResume(): Promise<
  { ok: true; url: string } | { ok: false; error: string }
> {
  const authToken = (await cookies()).get('authToken')?.value;

  if (!authToken) {
    return { ok: false, error: 'Authentication token missing' };
  }
  try {
    const response = await axios.get(
      `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/download`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.status === 200) {
      const downloadUrl = response.data;

      return { ok: true, url: downloadUrl };
    }
    return { ok: false, error: 'Failed to get download URL' };
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
