import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

type ApiOptions = Omit<RequestInit, 'headers'>;

export const serverApiFetch = async <T = void>(path: string, options?: ApiOptions): Promise<T> => {
  const token = (await cookies()).get('authToken')?.value;

  const response = await fetch(`${process.env.SPRING_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (response.status === 401 || response.status === 403) {
    redirect('/login?reason=unauthorized');
  }
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return undefined as T;
  }

  return response.json();
};
