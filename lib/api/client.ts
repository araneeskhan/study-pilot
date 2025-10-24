type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiRequestOptions extends RequestInit {
  params?: Record<string, any>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    method: RequestMethod = "GET",
    options: ApiRequestOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options;

    // Build URL with query parameters
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Default headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        credentials: "include", // Include cookies for auth
        ...fetchOptions,
      });

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      const hasJson = contentType?.includes("application/json");

      if (!response.ok) {
        const errorData = hasJson ? await response.json() : { message: response.statusText };
        throw new ApiError(
          errorData.message || "An error occurred",
          response.status,
          errorData
        );
      }

      // Return empty object for 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return hasJson ? await response.json() : ({} as T);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(
        error instanceof Error ? error.message : "Network error",
        0
      );
    }
  }

  async get<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, "GET", options);
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "POST", {
      ...options,
      body: JSON.stringify(data),
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PUT", {
      ...options,
      body: JSON.stringify(data),
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options?: ApiRequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, "PATCH", {
      ...options,
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, options?: ApiRequestOptions): Promise<T> {
    return this.request<T>(endpoint, "DELETE", options);
  }

  // File upload with FormData
  async upload<T>(
    endpoint: string,
    formData: FormData,
    options?: Omit<ApiRequestOptions, "body">
  ): Promise<T> {
    const { headers, ...restOptions } = options || {};
    
    // Don't set Content-Type for FormData, browser will set it automatically with boundary
    const uploadHeaders = { ...headers };
    delete uploadHeaders["Content-Type"];

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: uploadHeaders,
      credentials: "include",
      body: formData,
      ...restOptions,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new ApiError(
        errorData.message || "Upload failed",
        response.status,
        errorData
      );
    }

    return response.json();
  }
}

// Custom API Error Class
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Export singleton instance
export const apiClient = new ApiClient();