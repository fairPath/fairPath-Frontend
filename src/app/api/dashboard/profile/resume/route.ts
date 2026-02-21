import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const authToken = (await cookies()).get('authToken')?.value;

  if (!authToken) {
    return NextResponse.json({ ok: false, error: 'Authentication token missing' }, { status: 401 });
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
      return NextResponse.json({ ok: true, url: response.data });
    }

    return NextResponse.json(
      { ok: false, error: 'Failed to get download URL' },
      { status: response.status }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
