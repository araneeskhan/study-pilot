
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
import { ArrowRight, CheckCircle2, Users, TrendingUp, Shield } from "lucide-react";

async function getFeaturedData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const [countries, universities, scholarships] = await Promise.all([
      fetch(`${baseUrl}/api/countries?featured=true&limit=6`, { cache: "no-store" }).then(r => r.json()),
      fetch(`${baseUrl}/api/universities?featured=true&limit=6`, { cache: "no-store" }).then(r => r.json()),
      fetch(`${baseUrl}/api/scholarships?featured=true&limit=6`, { cache: "no-store" }).then(r => r.json()),
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
      <section className="w-full">
        <div className="container mx-auto flex justify-center items-center py-4">
          <SearchBar />
        </div>
      </section>

      <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Study Pilot?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for international education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Information</h3>
              <p className="text-gray-600 leading-relaxed">
                Accurate and up-to-date information about universities, programs, and scholarships from official sources.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guidance</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized consultation from our experienced education counselors to make the right decisions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="h-14 w-14 rounded-xl bg-primary-100 flex items-center justify-center mb-6">
                <Shield className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Free Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Access all our resources completely free. No hidden charges, no commitments required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Countries</h2>
              <p className="text-lg text-gray-600">Popular study destinations around the world</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              <Link href="/countries">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {countries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countries.map((country: any) => (
                <CountryCard key={country._id} country={country} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg">No featured countries yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Top Universities</h2>
              <p className="text-lg text-gray-600">World-class institutions offering quality education</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              <Link href="/universities">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {universities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {universities.map((university: any) => (
                <UniversityCard key={university._id} university={university} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl">
              <p className="text-gray-500 text-lg">No featured universities yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Latest Scholarships</h2>
              <p className="text-lg text-gray-600">Find funding opportunities for your education</p>
            </div>
            <Button variant="ghost" asChild className="hidden md:flex text-primary-600 hover:text-primary-700 hover:bg-primary-50">
              <Link href="/scholarships">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {scholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarships.map((scholarship: any) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-2xl">
              <p className="text-gray-500 text-lg">No featured scholarships yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-#922d2d relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">Stay Updated with Study Abroad News</h2>
            <p className="text-xl text-primary-100 leading-relaxed">
              Get the latest scholarship opportunities, application tips, and university updates directly in your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
            <p className="text-sm text-primary-200">Join 5,000+ students already subscribed • Unsubscribe anytime</p>
          </div>
        </div>
      </section>
    </>
  );
}