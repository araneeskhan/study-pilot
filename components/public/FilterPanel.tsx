

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
    <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Country</Label>
          <Select value={filters.country} onValueChange={(value) => updateFilter("country", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {POPULAR_COUNTRIES.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.flag} {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Degree Level</Label>
          <Select value={filters.degreeLevel} onValueChange={(value) => updateFilter("degreeLevel", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select degree level" />
            </SelectTrigger>
            <SelectContent>
              {DEGREE_LEVELS.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>University Type</Label>
          <Select value={filters.universityType} onValueChange={(value) => updateFilter("universityType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {UNIVERSITY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

