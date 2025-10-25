// ============================================
// FILE: src/app/(public)/universities/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UniversityCard } from "@/components/public/UniversityCard";
import { FilterPanel } from "@/components/public/FilterPanel";
import { SearchBar } from "@/components/public/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { universityService } from "@/lib/api/services/university.service";
import { useSearchStore } from "@/stores/search-store";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UniversitiesPage() {
  const [page, setPage] = useState(1);
  const { query, filters } = useSearchStore();

  const { data, isLoading } = useQuery({
    queryKey: ["universities", page, query, filters],
    queryFn: () =>
      universityService.getAll({
        page,
        limit: 12,
        search: query,
        ...filters,
      }),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Top Universities
              <span className="block bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover prestigious institutions shaping future leaders worldwide
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sticky Filter Panel */}
          <aside className="lg:w-80 lg:sticky lg:top-6 h-fit">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
              <FilterPanel />
            </div>
          </aside>

          {/* Universities Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 animate-pulse">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                      <div className="flex gap-2 mt-4">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-slate-600 dark:text-slate-300 text-sm">
                      Showing {data?.data.length || 0} of{" "}
                      {data?.pagination.total || 0} universities
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">Sort by:</span>
                      <select className="bg-white/60 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>Ranking</option>
                        <option>Name A-Z</option>
                        <option>Popularity</option>
                        <option>Tuition Fees</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Universities Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {data?.data.map((university: any) => (
                    <UniversityCard
                      key={university._id}
                      university={university}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data && data.pagination.totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center">
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <div className="flex items-center gap-1 mx-2">
                          {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                            const pageNum = i + 1;
                            return (
                              <Button
                                key={pageNum}
                                variant={page === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPage(pageNum)}
                                className={`min-w-10 transition-all duration-200 ${
                                  page === pageNum 
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg" 
                                    : "bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-700/80"
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
                          className="bg-white/60 dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all duration-200"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
