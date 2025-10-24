// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/layout.tsx
// ============================================

"use client";

import { useAuth } from "@/hooks/useAuth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminNav } from "@/components/admin/AdminNav";
import { useUIStore } from "@/stores/ui-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, isAdmin } = useAuth(true);
  const { adminSidebarOpen } = useUIStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.push("/");
    }
  }, [isLoading, isAdmin, router]);

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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminNav />
      <div className="flex">
        <AdminSidebar />
        <main className={`flex-1 transition-all duration-300 ${adminSidebarOpen ? "ml-64" : "ml-0"}`}>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
