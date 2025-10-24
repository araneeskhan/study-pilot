

// ============================================
// FILE: src/components/public/FilterPanel.tsx
// ============================================

"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/stores/search-store";
import { POPULAR_COUNTRIES, DEGREE_LEVELS, UNIVERSITY_TYPES } from "@/lib/constants";

export function FilterPanel() {
  const { filters, updateFilter, clearFilters } = useSearchStore();

  return (
    <div className="space-y-8 p-6 bg-muted/50 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          🔍 Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300"
        >
          🗑️ Clear All
        </Button>
      </div>

      {/* Filter Options */}
      <div className="space-y-6">
        {/* Country Filter */}
        <div className="space-y-3">
          <Label htmlFor="country" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            🌍 Country
          </Label>
          <Select value={filters.country || "all"} onValueChange={(value) => updateFilter("country", value === "all" ? "" : value)}>
            <SelectTrigger 
              id="country" 
              className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors duration-300"
            >
              <SelectValue placeholder="Choose your destination" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl">
              <SelectItem value="all" className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                🌐 All Countries
              </SelectItem>
              {POPULAR_COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value} className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  {country.flag} {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Degree Level Filter */}
        <div className="space-y-3">
          <Label htmlFor="degree" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            🎓 Degree Level
          </Label>
          <Select value={filters.degreeLevel || "all"} onValueChange={(value) => updateFilter("degreeLevel", value === "all" ? "" : value)}>
            <SelectTrigger 
              id="degree" 
              className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors duration-300"
            >
              <SelectValue placeholder="Select study level" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl">
              <SelectItem value="all" className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                📚 All Levels
              </SelectItem>
              {DEGREE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value} className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* University Type Filter */}
        <div className="space-y-3">
          <Label htmlFor="universityType" className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            🏛️ University Type
          </Label>
          <Select value={filters.universityType || "all"} onValueChange={(value) => updateFilter("universityType", value === "all" ? "" : value)}>
            <SelectTrigger 
              id="universityType" 
              className="bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors duration-300"
            >
              <SelectValue placeholder="Select institution type" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl">
              <SelectItem value="all" className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                🏫 All Types
              </SelectItem>
              {UNIVERSITY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value} className="hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
          📊 Your Search
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Country:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {filters.country ? POPULAR_COUNTRIES.find(c => c.value === filters.country)?.label : "All Countries"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Degree:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {filters.degreeLevel ? DEGREE_LEVELS.find(l => l.value === filters.degreeLevel)?.label : "All Levels"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Type:</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {filters.universityType ? UNIVERSITY_TYPES.find(t => t.value === filters.universityType)?.label : "All Types"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

