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
    revalidatePath('/dashboard/profile');
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

export async function uploadResume(
  formData: FormData,
  data: ResumePresignUrlResponse
): Promise<ActionResult> {
  try {
    const response = await fetch(data.presignedUrl, {
      method: 'PUT',
      body: formData.get('file') as File, // Ensure the body contains the file content
    });

    if (response.ok) {
      return await confirmUpload(data.resumeId);
      //after updating refresh page and also send confirm backend request to update table
    } else {
      console.error('Failed to upload resume');
      return { ok: false, error: 'Failed to upload resume' };
    }
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('Error during resume upload:', error);
    return { ok: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function confirmUpload(resumeId: string): Promise<ActionResult> {
  try {
    await serverApiFetch('/resumes/confirm', {
      method: 'POST',
      body: JSON.stringify({ resumeId }),
    });

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
    await serverApiFetch('/resumes/delete', {
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

// export async function requestPresignUrl(
//   formData: FormData
// ): Promise<{ ok: true; data: ResumePresignUrlResponse } | { ok: false; error: string }> {
//   const authToken = (await cookies()).get('authToken')?.value;
//   const file = formData.get('file');
//   const fileName = file instanceof File ? file.name : null;

//   if (!authToken) {
//     return { ok: false, error: 'Authentication token missing' };
//   }

//   try {
//     const response = await axios.post(
//       `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/presign-url`,
//       { filename: fileName },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );
//     refresh();
//     return { ok: true, data: response.data };
//   } catch (error: unknown) {
//     return {
//       ok: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

// export async function confirmUpload(
//   resumeId: string
// ): Promise<{ ok: true } | { ok: false; error: string }> {
//   const authToken = (await cookies()).get('authToken')?.value;
//   if (!authToken) {
//     return { ok: false, error: 'Authentication token missing' };
//   }
//   try {
//     await axios.post(
//       `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/confirm`,
//       JSON.stringify(resumeId),
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     return { ok: true };
//   } catch (error: unknown) {
//     return {
//       ok: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

// export async function deleteResume(): Promise<{ ok: true } | { ok: false; error: string }> {
//   const authToken = (await cookies()).get('authToken')?.value;

//   if (!authToken) {
//     return { ok: false, error: 'Authentication token missing' };
//   }
//   try {
//     const response = await axios.delete(
//       `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/delete`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       refresh();
//       return { ok: true };
//     }
//     return { ok: false, error: 'Failed to delete resume' };
//   } catch (error: unknown) {
//     return {
//       ok: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
// }

// export async function downloadResume(): Promise<
//   { ok: true; url: string } | { ok: false; error: string }
// > {
//   const authToken = (await cookies()).get('authToken')?.value;

//   if (!authToken) {
//     return { ok: false, error: 'Authentication token missing' };
//   }
//   try {
//     const response = await axios.get(
//       `${process.env.SPRING_BASE_URL || 'http://localhost:8080'}/resumes/download`,
//       {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       }
//     );

//     if (response.status === 200) {
//       const downloadUrl = response.data;

//       return { ok: true, url: downloadUrl };
//     }
//     return { ok: false, error: 'Failed to get download URL' };
//   } catch (error: unknown) {
//     return {
//       ok: false,
//       error: error instanceof Error ? error.message : 'Unknown error',
//     };
//   }
//}
