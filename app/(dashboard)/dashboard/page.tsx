
// ============================================
// FILE: src/app/(dashboard)/dashboard/page.tsx
// ============================================

"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, FileText, Calendar, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import Link from "next/link";
import { apiClient } from "@/lib/api/client";

export default function DashboardPage() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => apiClient.get("/dashboard/stats"),
  });

  const statCards = [
    { title: "Saved Items", value: stats?.data?.favorites || 0, icon: Heart, href: "/dashboard/favorites", color: "text-red-500" },
    { title: "Applications", value: stats?.data?.applications || 0, icon: FileText, href: "/dashboard/applications", color: "text-blue-500" },
    { title: "Consultations", value: stats?.data?.consultations || 0, icon: Calendar, href: "/dashboard/consultations", color: "text-green-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}! 👋</h1>
        <p className="text-muted-foreground mt-2">Here's your study abroad journey overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/universities">🎓 Browse Universities</Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/scholarships">💰 Find Scholarships</Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/programs">📚 Explore Programs</Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/consultancy">📅 Book Consultation</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="font-medium">Saved MIT to favorites</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="font-medium">Viewed Fulbright Scholarship</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="font-medium">Updated profile information</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold">Computer Science Masters in USA</h3>
              <p className="text-sm text-muted-foreground mt-1">Based on your interests</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold">DAAD Scholarships for Germany</h3>
              <p className="text-sm text-muted-foreground mt-1">Deadline in 2 months</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

