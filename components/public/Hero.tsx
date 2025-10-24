// ============================================
// FILE: src/components/public/Hero.tsx
// ============================================

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Globe,
  GraduationCap,
  Award,
  Sparkles,
  MapPin,
  Users,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center bg-gradient-to-b from-background to-muted/40">




      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-sm font-medium text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300">
              <Sparkles className="h-4 w-4" />
              <span>Your Gateway to Global Education</span>
            </div>

            <h1 className="mb-6 text-5xl leading-tight font-bold md:text-7xl">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                Transform Your Future
              </span>
              <br />
              <span className="text-4xl font-light text-gray-600 italic md:text-6xl dark:text-gray-400">
                Study Anywhere in the World
              </span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300">
              Discover world-class universities, unlock life-changing
              scholarships, and connect with a global community of ambitious
              students.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-purple-500/25"
              asChild
            >
              <Link href="/universities">
                Explore Universities
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-gray-300 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:border-blue-500 hover:text-blue-600"
              asChild
            >
              <Link href="/scholarships">Find Scholarships</Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative rounded-2xl border border-white/20 bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                  50+
                </div>
                <div className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                  Countries
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Explore study destinations worldwide
                </p>
              </div>
            </div>

            <div className="group relative rounded-2xl border border-white/20 bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/30 dark:to-pink-800/30">
                    <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                  500+
                </div>
                <div className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                  Universities
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top-ranked institutions globally
                </p>
              </div>
            </div>

            <div className="group relative rounded-2xl border border-white/20 bg-white/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 dark:border-gray-700/50 dark:bg-gray-800/60">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-800/30">
                    <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-4xl font-bold text-transparent">
                  1000+
                </div>
                <div className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-300">
                  Scholarships
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Funding opportunities available
                </p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>Global Network</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span>Expert Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-green-500" />
              <span>Verified Opportunities</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-25px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
