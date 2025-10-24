export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  limit: number;
  page: number;
  totalPages: number;
}

export function calculatePagination(
  params: PaginationParams,
  total: number
): PaginationResult {
  const page = Math.max(1, params.page || 1);
  const limit = Math.max(1, Math.min(100, params.limit || 10));
  const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  return {
    skip,
    limit,
    page,
    totalPages,
  };
}

export function getPaginationParams(searchParams: URLSearchParams): PaginationParams {
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  return {
    page: Math.max(1, page),
    limit: Math.max(1, Math.min(100, limit)),
  };
}