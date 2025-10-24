import { AxiosError } from 'axios';
import { ZodError } from 'zod';

interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export function handleApiError(error: unknown): { message: string; errors?: Record<string, string[]> } {
  // Handle Axios errors
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;
    
    if (data?.message) {
      return {
        message: data.message,
        errors: data.errors,
      };
    }

    if (error.message) {
      return { message: error.message };
    }

    return { message: 'An unexpected error occurred' };
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    
    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });

    return {
      message: 'Validation error',
      errors,
    };
  }

  // Handle other types of errors
  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: 'An unexpected error occurred' };
}