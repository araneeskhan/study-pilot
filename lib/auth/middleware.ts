import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';
import { getAuthCookie } from './cookies';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export async function requireAuth(request: NextRequest) {
  try {
    const token = getAuthCookie(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return null; // No error, authentication successful
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export async function requireAdmin(request: AuthenticatedRequest) {
  try {
    const token = getAuthCookie(request);
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    if (payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Add user to request for downstream use
    request.user = payload;
    
    return null; // No error, admin authentication successful
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export function withAuth(handler: Function) {
  return async (request: AuthenticatedRequest, ...args: any[]) => {
    const authError = await requireAuth(request);
    
    if (authError) {
      return authError;
    }
    
    return handler(request, ...args);
  };
}

export function withAdmin(handler: Function) {
  return async (request: AuthenticatedRequest, ...args: any[]) => {
    const adminError = await requireAdmin(request);
    
    if (adminError) {
      return adminError;
    }
    
    return handler(request, ...args);
  };
}