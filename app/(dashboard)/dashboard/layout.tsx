
// ============================================
// FILE: src/app/(dashboard)/dashboard/layout.tsx
// ============================================

"use client";

import { useAuth } from "@/hooks/useAuth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { useUIStore } from "@/stores/ui-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth(true);
  const { dashboardSidebarOpen } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardNav />
      <div className="flex">
        <DashboardSidebar />
        <main className={`flex-1 transition-all duration-300 ${dashboardSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

