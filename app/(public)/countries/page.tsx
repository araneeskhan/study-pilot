// ============================================
// FILE: src/app/(public)/countries/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CountryCard } from "@/components/public/CountryCard";
import { FilterPanel } from "@/components/public/FilterPanel";
import { SearchBar } from "@/components/public/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { countryService } from "@/lib/api/services/country.service";
import { useSearchStore } from "@/stores/search-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CountriesPage() {
  const [page, setPage] = useState(1);
  const { query, filters } = useSearchStore();

  const { data, isLoading } = useQuery({
    queryKey: ["countries", page, query, filters],
    queryFn: () =>
      countryService.getAll({
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
          <h1 className="mb-4 text-4xl font-bold">Study Destinations</h1>
          <p className="text-muted-foreground text-lg">
            Explore countries offering world-class education and opportunities
          </p>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <FilterPanel />
          </aside>

          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            ) : (
              <>
                <div className="text-muted-foreground mb-6 text-sm">
                  Showing {data?.data.length || 0} of{" "}
                  {data?.pagination.total || 0} countries
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {data?.data.map((country: any) => (
                    <CountryCard key={country._id} country={country} />
                  ))}
                </div>

                {data && data.pagination.totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
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
                      onClick={() => setPage((p) => p + 1)}
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
