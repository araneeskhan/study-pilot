// ============================================
// FILE: src/components/public/Navbar.tsx
// ============================================

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Search, User, Heart, Compass, BookOpen, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { publicNavigation } from "@/config/navigation";

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openSearchModal, openLoginModal } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/countries', title: 'Countries', icon: Globe },
    { href: '/universities', title: 'Universities', icon: BookOpen },
    { href: '/scholarships', title: 'Scholarships', icon: Award },
    { href: '/programs', title: 'Programs', icon: Compass },
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-gray-800/60' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-lg font-bold text-white">SP</span>
              </div>
            </div>
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              Study Pilot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group px-3 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={openSearchModal}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <Link href="/dashboard/favorites">
                    <Heart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild
                  className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <Link href="/dashboard">
                    <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  onClick={openLoginModal}
                  className="rounded-full px-6 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Login
                </Button>
                <Button 
                  asChild
                  className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen 
          ? 'max-h-96 opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="bg-white dark:bg-gray-900 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              );
            })}
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => { closeMobileMenu(); openSearchModal(); }}
                className="w-full justify-start gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">Search</span>
              </Button>
              
              {!isAuthenticated && (
                <div className="mt-4 space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-full"
                    onClick={() => { closeMobileMenu(); openLoginModal(); }}
                  >
                    Login
                  </Button>
                  <Button 
                    className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                  >
                    <Link href="/register">Get Started</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

