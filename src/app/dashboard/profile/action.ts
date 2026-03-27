'use server';

import { serverApiFetch } from '@/lib/server-api-client';
import { ActionResult } from '@/types/action-result';
import { ResumePresignUrlResponse } from '@/types/ResumePresignUrlResponse';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

export async function requestPresignUrl(
  formData: FormData
): Promise<{ ok: true; data: ResumePresignUrlResponse } | { ok: false; error: string }> {
  const file = formData.get('file');
  const fileName = file instanceof File ? file.name : null;

  if (!fileName) {
    return { ok: false, error: 'File is missing' };
  }

  try {
    const data = await serverApiFetch<ResumePresignUrlResponse>('/resumes/presign-url', {
      method: 'POST',
      body: JSON.stringify({ filename: fileName }),
    });
    return { ok: true, data };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function confirmUpload(resumeId: string): Promise<ActionResult> {
  try {
    await serverApiFetch<void>('/resumes/confirm', {
      method: 'POST',
      body: JSON.stringify({ resumeId }),
    });

    revalidatePath('/dashboard/profile');
    return { ok: true };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('Error confirming resume upload:', error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function deleteResume(): Promise<ActionResult> {
  try {
    await serverApiFetch<void>('/resumes/delete', {
      method: 'DELETE',
    });

    revalidatePath('/dashboard/profile');
    return { ok: true };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function getResumeDownloadUrl(): Promise<
  { ok: true; url: string } | { ok: false; error: string }
> {
  try {
    const url = await serverApiFetch<string>('/resumes/download', {
      method: 'GET',
    });

    if (!url) {
      return { ok: false, error: 'Failed to get download URL' };
    }

    return { ok: true, url };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
