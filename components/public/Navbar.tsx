// ============================================
// FILE: src/components/public/Navbar.tsx
// ============================================

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { publicNavigation } from "@/config/navigation";

export function Navbar() {
  const { isAuthenticated, user } = useAuthStore();
  const { mobileMenuOpen, toggleMobileMenu, closeMobileMenu, openSearchModal, openLoginModal } = useUIStore();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-lg font-bold text-white">SP</span>
            </div>
            <span className="text-xl font-bold">Study Pilot</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={openSearchModal}>
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/favorites">
                  <Heart className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:flex" onClick={openLoginModal}>
                Login
              </Button>
              <Button className="hidden sm:flex" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            {publicNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-sm font-medium"
                onClick={closeMobileMenu}
              >
                {item.title}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2">
                <Button className="w-full" variant="outline" onClick={() => { closeMobileMenu(); openLoginModal(); }}>
                  Login
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

