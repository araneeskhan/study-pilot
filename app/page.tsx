// ============================================
// FILE: app/page.tsx - Study Pilot Home Page
// ============================================

import { Hero } from "@/components/public/Hero";
import { SearchBar } from "@/components/public/SearchBar";
import { CountryCard } from "@/components/public/CountryCard";
import { UniversityCard } from "@/components/public/UniversityCard";
import { ScholarshipCard } from "@/components/public/ScholarshipCard";
import { NewsletterForm } from "@/components/public/NewsletterForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default async function Home() {
  const { countries, universities, scholarships } = await getFeaturedData();

  return (
    <>
      <Hero />

      <section className="bg-muted/30 py-12">
        <div className="container">
          <SearchBar />
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Countries</h2>
              <p className="text-muted-foreground mt-2">
                Popular study destinations around the world
              </p>
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

      <section className="bg-muted/50 py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Top Universities</h2>
              <p className="text-muted-foreground mt-2">
                World-class institutions offering quality education
              </p>
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

      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Latest Scholarships</h2>
              <p className="text-muted-foreground mt-2">
                Find funding opportunities for your education
              </p>
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

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-lg opacity-90">
              Get the latest scholarship opportunities, application tips, and
              university updates directly in your inbox.
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
