// ============================================
// FILE: src/components/public/Navbar.tsx
// ============================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, User, Heart, Globe, GraduationCap, Award, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openSearchModal, openLoginModal } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 mx-4 mt-2 mb-2 rounded-3xl max-w-[calc(100%-2rem)] ${
      scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-lg'
    }`}>
      <div className="container mx-auto px-10">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">Study Pilot</span>
              <span className="text-xs text-gray-500 -mt-0.5">Your Study Abroad Partner</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/countries" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
              Countries
            </Link>
            <Link href="/universities" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
              Universities
            </Link>
            <Link href="/scholarships" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
              Scholarships
            </Link>
            <Link href="/programs" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
              Programs
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={openSearchModal} className="rounded-full">
              <Search className="h-5 w-5 text-gray-600" />
            </Button>

            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href="/dashboard/favorites"><Heart className="h-5 w-5 text-gray-600" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link href="/dashboard"><User className="h-5 w-5 text-gray-600" /></Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={openLoginModal} className="text-gray-700 font-medium">
                  Sign In
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-6 space-y-2">
            <Link href="/countries" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={closeMobileMenu}>Countries</Link>
            <Link href="/universities" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={closeMobileMenu}>Universities</Link>
            <Link href="/scholarships" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={closeMobileMenu}>Scholarships</Link>
            <Link href="/programs" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium" onClick={closeMobileMenu}>Programs</Link>
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full" onClick={() => { closeMobileMenu(); openLoginModal(); }}>Sign In</Button>
                <Button className="w-full bg-blue-600 text-white" asChild><Link href="/register">Get Started</Link></Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
