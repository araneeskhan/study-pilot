// ============================================
// FILE: src/app/(public)/page.tsx
// ============================================

import { Hero } from "@/components/public/Hero";
import { SearchBar } from "@/components/public/SearchBar";
import { CountryCard } from "@/components/public/CountryCard";
import { UniversityCard } from "@/components/public/UniversityCard";
import { ScholarshipCard } from "@/components/public/ScholarshipCard";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Users } from "lucide-react";

async function getFeaturedData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const [countries, universities, scholarships] = await Promise.all([
      fetch(`${baseUrl}/api/countries?featured=true&limit=6`, {
        cache: "no-store",
      }).then((r) => r.json()),
      fetch(`${baseUrl}/api/universities?featured=true&limit=6`, {
        cache: "no-store",
      }).then((r) => r.json()),
      fetch(`${baseUrl}/api/scholarships?featured=true&limit=6`, {
        cache: "no-store",
      }).then((r) => r.json()),
    ]);

    return {
      countries: countries.data || [],
      universities: universities.data || [],
      scholarships: scholarships.data || [],
    };
  } catch (error) {
    return { countries: [], universities: [], scholarships: [] };
  }
}

export default async function HomePage() {
  const { countries, universities, scholarships } = await getFeaturedData();

  return (
    <>
      <Hero />

      {/* Search Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Find Your Perfect Match</h2>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
                Search universities, programs, and scholarships to match your goals.
              </p>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Countries */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-3">
                <Star className="h-4 w-4" />
                <span className="text-xs font-medium">Popular Destinations</span>
              </div>
              <h2 className="text-3xl font-bold">Featured Countries</h2>
              <p className="text-muted-foreground mt-2">Explore top study destinations worldwide</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/countries">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {countries.map((country: any) => (
              <CountryCard key={country._id} country={country} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-3">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Top Ranked</span>
              </div>
              <h2 className="text-3xl font-bold">Top Universities</h2>
              <p className="text-muted-foreground mt-2">World-class institutions offering quality education</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/universities">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {universities.map((university: any) => (
              <UniversityCard key={university._id} university={university} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Scholarships */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 mb-3">
                <Users className="h-4 w-4" />
                <span className="text-xs font-medium">Funding Opportunities</span>
              </div>
              <h2 className="text-3xl font-bold">Latest Scholarships</h2>
              <p className="text-muted-foreground mt-2">Find funding opportunities to support your education</p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/scholarships">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {scholarships.map((scholarship: any) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-lg opacity-90">
              Get scholarship alerts, application tips, and study abroad insights in your inbox.
            </p>
            <div className="mx-auto max-w-md">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
