import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

export function getAuthCookie(request?: NextRequest): string | null {
  if (request) {
    // For middleware/server-side usage
    return request.cookies.get('auth-token')?.value || null;
  } else {
    // For client-side/server component usage
    const cookieStore = cookies();
    return cookieStore.get('auth-token')?.value || null;
  }
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}