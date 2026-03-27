'use server';

import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { serverApiFetch } from '@/lib/server-api-client';
import { Job } from '@/types/Job';
import { ActionResult } from '@/types/action-result';

export async function saveJob(job: Job): Promise<ActionResult> {
  try {
    await serverApiFetch<string>('/saved-jobs/save', {
      method: 'POST',
      body: JSON.stringify(job),
    });

    revalidatePath('/dashboard/saved-jobs');
    return { ok: true };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to save job',
    };
  }
}

export async function deleteSavedJob(jobId: string): Promise<ActionResult> {
  try {
    await serverApiFetch<string>(`/saved-jobs/delete?jobId=${encodeURIComponent(jobId)}`, {
      method: 'DELETE',
    });

    revalidatePath('/dashboard/saved-jobs');
    return { ok: true };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Failed to delete job',
    };
  }
}
