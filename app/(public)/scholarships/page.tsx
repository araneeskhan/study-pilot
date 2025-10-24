
// ============================================
// FILE: src/app/(public)/scholarships/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ScholarshipCard } from "@/components/public/ScholarshipCard";
import { FilterPanel } from "@/components/public/FilterPanel";
import { SearchBar } from "@/components/public/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { scholarshipService } from "@/lib/api/services/scholarship.service";
import { useSearchStore } from "@/stores/search-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScholarshipsPage() {
  const [page, setPage] = useState(1);
  const { query, filters } = useSearchStore();

  const { data, isLoading } = useQuery({
    queryKey: ["scholarships", page, query, filters],
    queryFn: () => scholarshipService.getAll({
      page,
      limit: 12,
      search: query,
      ...filters,
    }),
  });

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Scholarships</h1>
          <p className="text-lg text-muted-foreground">
            Find funding opportunities for your education
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterPanel />
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80" />
                ))}
              </div>
            ) : (
              <>
                <div className="mb-6 text-sm text-muted-foreground">
                  Showing {data?.data.length || 0} of {data?.pagination.total || 0} scholarships
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {data?.data.map((scholarship: any) => (
                    <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
                  ))}
                </div>

                {data && data.pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm">
                      Page {page} of {data.pagination.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage(p => p + 1)}
                      disabled={page === data.pagination.totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
      