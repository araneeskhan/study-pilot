
// ============================================
// FILE: src/components/public/SearchBar.tsx
// ============================================

"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/stores/search-store";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const { setQuery } = useSearchStore();
  const [localQuery, setLocalQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setQuery(localQuery);
      router.push(`/search?q=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto align-center">
      <div className="relative">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search universities, scholarships, programs..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          className="pl-14 pr-32 h-14 text-base border-2 border-gray-200 focus:border-blue-500 rounded-xl shadow-sm"
        />
        <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 h-10 font-medium">
          Search
        </Button>
      </div>
    </form>
  );
}

