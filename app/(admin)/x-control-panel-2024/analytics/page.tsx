// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/analytics/page.tsx
// ============================================

"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiClient } from "@/lib/api/client";
import { TrendingUp, Users, Eye, MousePointerClick } from "lucide-react";

export default function AdminAnalyticsPage() {
  const { data: stats } = useQuery({
    queryKey: ["analytics-stats"],
    queryFn: () => apiClient.get("/analytics/stats"),
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track platform performance and user engagement
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Views
            </CardTitle>
            <Eye className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">45,231</div>
            <p className="text-muted-foreground mt-1 text-xs">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +20.1%
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Active Users
            </CardTitle>
            <Users className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,350</div>
            <p className="text-muted-foreground mt-1 text-xs">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +15.3%
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Click Rate
            </CardTitle>
            <MousePointerClick className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.5%</div>
            <p className="text-muted-foreground mt-1 text-xs">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +5.2%
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3.2%</div>
            <p className="text-muted-foreground mt-1 text-xs">
              <TrendingUp className="inline h-3 w-3 text-green-500" /> +2.1%
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="countries">Countries</TabsTrigger>
          <TabsTrigger value="universities">Universities</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                Chart visualization would go here (use Recharts)
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["USA", "UK", "Canada", "Germany", "Australia"].map(
                    (country, i) => (
                      <div
                        key={country}
                        className="flex items-center justify-between"
                      >
                        <span>{country}</span>
                        <span className="text-muted-foreground">
                          {100 - i * 15}%
                        </span>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Computer Science",
                    "MBA",
                    "Engineering",
                    "Medicine",
                    "Law",
                  ].map((term, i) => (
                    <div
                      key={term}
                      className="flex items-center justify-between"
                    >
                      <span>{term}</span>
                      <span className="text-muted-foreground">
                        {500 - i * 50} searches
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>Country Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground">
                Country-specific analytics
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
