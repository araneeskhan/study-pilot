// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/page.tsx
// ============================================

"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  GraduationCap,
  Award,
  BookOpen,
  Users,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => apiClient.get("/analytics/stats"),
  });

  const statCards = [
    {
      title: "Total Countries",
      value: stats?.data?.totalCountries || 0,
      icon: Globe,
      color: "text-blue-500",
    },
    {
      title: "Total Universities",
      value: stats?.data?.totalUniversities || 0,
      icon: GraduationCap,
      color: "text-green-500",
    },
    {
      title: "Total Scholarships",
      value: stats?.data?.totalScholarships || 0,
      icon: Award,
      color: "text-yellow-500",
    },
    {
      title: "Total Programs",
      value: stats?.data?.totalPrograms || 0,
      icon: BookOpen,
      color: "text-purple-500",
    },
    {
      title: "Total Users",
      value: stats?.data?.totalUsers || 0,
      icon: Users,
      color: "text-pink-500",
    },
    {
      title: "Consultations",
      value: stats?.data?.totalConsultations || 0,
      icon: Calendar,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <div className="text-3xl font-bold">{stat.value}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New university added</p>
                  <p className="text-muted-foreground text-xs">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Scholarship updated</p>
                  <p className="text-muted-foreground text-xs">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-muted-foreground text-xs">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="hover:bg-muted w-full rounded-lg px-4 py-2 text-left transition-colors">
              + Add New Country
            </button>
            <button className="hover:bg-muted w-full rounded-lg px-4 py-2 text-left transition-colors">
              + Add New University
            </button>
            <button className="hover:bg-muted w-full rounded-lg px-4 py-2 text-left transition-colors">
              + Add New Scholarship
            </button>
            <button className="hover:bg-muted w-full rounded-lg px-4 py-2 text-left transition-colors">
              + Create Blog Post
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
