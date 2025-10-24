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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Study Destinations
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Discover world-class education opportunities across the globe
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filter Panel */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Countries Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-2xl" />
                ))}
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="text-muted-foreground text-sm bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full backdrop-blur-sm">
                    Showing {data?.data.length || 0} of{" "}
                    {data?.pagination.total || 0} countries
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Sort by:</span>
                    <select className="bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 text-sm backdrop-blur-sm">
                      <option>Popularity</option>
                      <option>Name A-Z</option>
                      <option>Universities</option>
                    </select>
                  </div>
                </div>

                {/* Countries Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {data?.data.map((country: any) => (
                    <CountryCard key={country._id} country={country} />
                  ))}
                </div>

                {/* Pagination */}
                {data && data.pagination.totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-800/70"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex items-center gap-1 mx-4">
                      {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                        const pageNum = i + 1;
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                            className={`min-w-10 ${
                              page === pageNum 
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                                : "bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700"
                            }`}
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setPage((p) => p + 1)}
                      disabled={page === data.pagination.totalPages}
                      className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:bg-white/70 dark:hover:bg-slate-800/70"
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
