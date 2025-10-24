import { ZodSchema, ZodError } from 'zod';
import { z } from 'zod';

/**
 * Generic data validation helper using Zod schemas
 */
export function validateData<T>(data: unknown, schema: ZodSchema<T>): {
  success: boolean;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
} {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      
      return {
        success: false,
        errors
      };
    }
    
    return {
      success: false,
      errors: [{
        field: 'general',
        message: 'Validation failed'
      }]
    };
  }
}

/**
 * Validate pagination parameters
 */
export function validatePagination(page?: string | number, limit?: string | number): {
  page: number;
  limit: number;
} {
  const pageNum = typeof page === 'string' ? parseInt(page, 10) : (page || 1);
  const limitNum = typeof limit === 'string' ? parseInt(limit, 10) : (limit || 10);
  
  return {
    page: Math.max(1, pageNum),
    limit: Math.min(Math.max(1, limitNum), 100) // Cap at 100 items per page
  };
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  id: z.string().uuid('Invalid ID format'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
};

/**
 * Validate and sanitize search query
 */
export function validateSearchQuery(query?: string): string {
  if (!query) return '';
  
  // Remove extra whitespace and special characters that could be used for injection
  return query
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 100); // Limit length
}

/**
 * Validate sort parameters
 */
export function validateSortParams(
  sortBy?: string,
  sortOrder?: string,
  allowedFields: string[] = []
): {
  sortBy?: string;
  sortOrder: 'asc' | 'desc';
} {
  const order = sortOrder === 'desc' ? 'desc' : 'asc';
  
  if (!sortBy || !allowedFields.includes(sortBy)) {
    return { sortOrder: order };
  }
  
  return {
    sortBy,
    sortOrder: order
  };
}