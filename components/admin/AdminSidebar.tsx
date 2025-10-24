
// ============================================
// FILE: src/components/admin/AdminSidebar.tsx
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { adminNavigation } from "@/config/navigation";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AdminSidebar() {
  const pathname = usePathname();
  const { adminSidebarOpen } = useUIStore();

  if (!adminSidebarOpen) return null;

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background">
      <ScrollArea className="h-full py-6">
        <nav className="space-y-1 px-3">
          {adminNavigation.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as any;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}
