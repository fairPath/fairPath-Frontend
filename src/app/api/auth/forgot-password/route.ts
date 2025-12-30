import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const springBaseUrl =
      process.env.SPRING_BASE_URL || 'http://localhost:8080';
    const body = await request.json();

    await axios.post(`${springBaseUrl}/auth/forgot-password`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newResponse = NextResponse.json(
      { message: 'forgot password request successful' },
      { status: 200 }
    );
    return newResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: 'resend failed', error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
