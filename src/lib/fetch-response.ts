export async function getResponseError(
  response: Response,
  fallbackMessage: string
): Promise<string> {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const data = (await response.json().catch(() => null)) as {
      message?: string;
      error?: string;
    } | null;

    if (data?.error) {
      return data.error;
    }

    if (data?.message) {
      return data.message;
    }
  }

  const text = await response.text().catch(() => '');
  return text || fallbackMessage;
}
