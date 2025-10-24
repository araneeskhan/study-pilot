
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Scholarship
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover thousands of scholarships from top institutions worldwide. 
              Let us help you fund your dream education.
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
          
          {/* Main Content */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                    Available Scholarships
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300">
                    {data?.pagination.total || 0} scholarships found
                  </p>
                </div>
              </div>
            </div>

            {/* Scholarships Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(9)].map((_, i) => (
                  <Skeleton key={i} className="h-96 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl" />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                  {data?.data.map((scholarship: any) => (
                    <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
                  ))}
                </div>
                
                {/* Enhanced Pagination */}
                {data && data.pagination.totalPages > 1 && (
                  <div className="flex justify-center">
                    <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4">
                      <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="border-2 border-slate-200 dark:border-slate-600 hover:border-primary rounded-xl font-semibold"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                      <span className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold">
                        Page {page} of {data.pagination.totalPages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                        disabled={page === data.pagination.totalPages}
                        className="border-2 border-slate-200 dark:border-slate-600 hover:border-primary rounded-xl font-semibold"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
      