"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { apiClient } from "@/lib/api/client";

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading, user } = useAuthStore();

  useEffect(() => {
    // Only check auth if we don't have a user and we're currently loading
    if (!user) {
      apiClient.get("/auth/me")
        .then((response: any) => {
          if (response.data) {
            setUser(response.data);
          }
        })
        .catch((error) => {
          // User is not authenticated, which is fine
          console.log("User not authenticated:", error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // We have a user, so we're not loading
      setLoading(false);
    }
  }, [setUser, setLoading, user]);

  return <>{children}</>;
}