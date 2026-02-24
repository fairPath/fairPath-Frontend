import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const jwtToken = request.cookies.get('authToken')?.value;
  if (!jwtToken) {
    return NextResponse.redirect(new URL('/login?reason=unauthorized', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
