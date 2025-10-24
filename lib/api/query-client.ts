import { QueryClient } from "@tanstack/react-query";

// Central React Query client instance used across the app
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Reasonable defaults for UX and network usage
      retry: 1,
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});