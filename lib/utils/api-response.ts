import { NextResponse } from "next/server";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function successResponse<T>(data: T, message = "Success", status = 200) {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      message,
    },
    { status }
  );
}

export function errorResponse(message = "Internal Server Error", status = 500, errors?: Record<string, string[]>) {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status }
  );
}

export function validationErrorResponse(errors: Record<string, string[]>, message = "Validation Error") {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      message,
      errors,
    },
    { status: 400 }
  );
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message = "Success"
) {
  const totalPages = Math.ceil(total / limit);
  
  return NextResponse.json<PaginatedResponse<T>>(
    {
      success: true,
      data,
      message,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    },
    { status: 200 }
  );
}

export function notFoundResponse(message = "Resource not found") {
  return errorResponse(message, 404);
}

export function unauthorizedResponse(message = "Unauthorized") {
  return errorResponse(message, 401);
}

export function forbiddenResponse(message = "Forbidden") {
  return errorResponse(message, 403);
}