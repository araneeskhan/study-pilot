
// ============================================
// FILE: src/components/public/Hero.tsx
// ============================================

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, GraduationCap, Award } from "lucide-react";

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Your Gateway to <span className="text-primary">Study Abroad</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover universities, scholarships, and programs from around the world. Start your international education journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/universities">
                Explore Universities
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/scholarships">Find Scholarships</Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Universities</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-sm text-muted-foreground">Scholarships</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

