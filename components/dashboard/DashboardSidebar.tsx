

// ============================================
// FILE: src/components/dashboard/DashboardSidebar.tsx
// ============================================

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { dashboardNavigation } from "@/config/navigation";
import { useUIStore } from "@/stores/ui-store";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { dashboardSidebarOpen } = useUIStore();

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 z-40",
      dashboardSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      <ScrollArea className="h-full py-6">
        <nav className="space-y-1 px-3">
          {dashboardNavigation.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as any;
            const isActive = pathname === item.href;

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

