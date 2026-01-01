import axios from 'axios';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const springBaseUrl =
      process.env.SPRING_BASE_URL || 'http://localhost:8080';
    const body = await request.json();

    await axios.put(`${springBaseUrl}/auth/update-password`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newResponse = NextResponse.json(
      { message: 'password reset successfully' },
      { status: 200 }
    );
    return newResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: 'password reset failed', error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
