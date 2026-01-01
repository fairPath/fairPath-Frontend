import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const springBaseUrl =
      process.env.SPRING_BASE_URL || 'http://localhost:8080';
    const body = await request.json();

    const response = await axios.post(`${springBaseUrl}/auth/login`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const token = response.data?.token;
    const newResponse = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );
    newResponse.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return newResponse;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Login failed', error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
