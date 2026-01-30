import axios from 'axios';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const titleOnly = url.searchParams.get('titleOnly') || '';
    const where = url.searchParams.get('where') || '';
    const jobType = url.searchParams.get('jobType') || '';
    const salary = url.searchParams.get('salary') || '';
    const company = url.searchParams.get('company') || '';
    const diversity = url.searchParams.get('diversity') || '';
    const springBaseUrl = process.env.SPRING_BASE_URL || 'http://localhost:8080';
    const authToken = (await cookies()).get('authToken')?.value;

    if (!authToken) {
      return NextResponse.json({ message: 'Authentication token missing' }, { status: 401 });
    }

    const response = await axios.get(`${springBaseUrl}/jobs`, {
      params: { titleOnly, where, jobType, salary, company, diversity },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const newResponse = NextResponse.json(response.data, { status: 200 });

    return newResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
