
// ============================================
// FILE: src/components/public/SearchBar.tsx
// ============================================

"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/stores/search-store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const { setSearchQuery } = useSearchStore();
  const router = useRouter();

  // Ensure client-side only features are mounted properly
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const searchSuggestions = [
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Medicine",
    "USA Scholarships",
    "UK Universities",
    "Canada Study",
    "Full Funding",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isMounted || !isFocused) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null ? 0 : Math.min(prev + 1, searchSuggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === null ? searchSuggestions.length - 1 : Math.max(prev - 1, 0)
      );
    } else if (e.key === "Enter" && highlightedIndex !== null) {
      e.preventDefault();
      const suggestion = searchSuggestions[highlightedIndex];
      setQuery(suggestion);
      setSearchQuery(suggestion);
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
      setHighlightedIndex(null);
    } else if (e.key === "Escape") {
      setHighlightedIndex(null);
      setIsFocused(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-900 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search universities, scholarships, countries..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              if (isMounted) {
                setTimeout(() => setIsFocused(false), 200);
              }
            }}
            onKeyDown={handleKeyDown}
            className="pl-12 pr-24 py-4 w-full text-base border-0 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
            aria-activedescendant={
              highlightedIndex !== null ? `suggestion-${highlightedIndex}` : undefined
            }
            aria-expanded={isFocused}
            aria-controls="search-suggestions"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {isMounted && isFocused && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50">
          <p className="px-2 pt-2 text-sm font-medium text-gray-600 dark:text-gray-300">Popular searches</p>
          <ul
            id="search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
            className="mt-2 divide-y divide-gray-200 dark:divide-gray-800"
          >
            {searchSuggestions.map((suggestion, index) => (
              <li
                key={index}
                id={`suggestion-${index}`}
                role="option"
                aria-selected={highlightedIndex === index}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
                  highlightedIndex === index
                    ? "bg-blue-50 dark:bg-blue-900/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(null)}
                onClick={() => {
                  setQuery(suggestion);
                  setSearchQuery(suggestion);
                  router.push(`/search?q=${encodeURIComponent(suggestion)}`);
                }}
              >
                <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {suggestion}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

