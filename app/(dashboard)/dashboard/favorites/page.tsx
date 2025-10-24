
// ============================================
// FILE: src/app/(dashboard)/dashboard/favorites/page.tsx
// ============================================

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CountryCard } from "@/components/public/CountryCard";
import { UniversityCard } from "@/components/public/UniversityCard";
import { ScholarshipCard } from "@/components/public/ScholarshipCard";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { useNotification } from "@/hooks/useNotification";
import { Trash2 } from "lucide-react";

export default function FavoritesPage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => apiClient.get(API_ENDPOINTS.FAVORITES.LIST),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(API_ENDPOINTS.FAVORITES.REMOVE(id)),
    onSuccess: () => {
      showSuccess("Removed from favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: () => {
      showError("Failed to remove from favorites");
    },
  });

  const favorites = data?.data || [];
  const countries = favorites.filter((f: any) => f.type === "country");
  const universities = favorites.filter((f: any) => f.type === "university");
  const scholarships = favorites.filter((f: any) => f.type === "scholarship");
  const programs = favorites.filter((f: any) => f.type === "program");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Saved Items</h1>
        <p className="text-muted-foreground mt-2">Your bookmarked universities, scholarships, and more</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">You haven't saved anything yet</p>
            <Button asChild>
              <a href="/universities">Start Exploring</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({favorites.length})</TabsTrigger>
            <TabsTrigger value="countries">Countries ({countries.length})</TabsTrigger>
            <TabsTrigger value="universities">Universities ({universities.length})</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships ({scholarships.length})</TabsTrigger>
            <TabsTrigger value="programs">Programs ({programs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite: any) => (
                <div key={favorite._id} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => deleteMutation.mutate(favorite._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  {favorite.type === "country" && <CountryCard country={favorite.ref_id} />}
                  {favorite.type === "university" && <UniversityCard university={favorite.ref_id} />}
                  {favorite.type === "scholarship" && <ScholarshipCard scholarship={favorite.ref_id} />}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="countries" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((favorite: any) => (
                <div key={favorite._id} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => deleteMutation.mutate(favorite._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <CountryCard country={favorite.ref_id} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="universities" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((favorite: any) => (
                <div key={favorite._id} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => deleteMutation.mutate(favorite._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <UniversityCard university={favorite.ref_id} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scholarships" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarships.map((favorite: any) => (
                <div key={favorite._id} className="relative">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => deleteMutation.mutate(favorite._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <ScholarshipCard scholarship={favorite.ref_id} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

