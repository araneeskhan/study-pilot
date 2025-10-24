
// ============================================
// FILE: src/components/public/Footer.tsx
// ============================================

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { footerNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                  {siteConfig.name}
                </span>
                <p className="text-sm text-slate-300">Your Education Journey Starts Here</p>
              </div>
            </Link>
            
            <p className="text-slate-300 leading-relaxed max-w-md">
              {siteConfig.description}
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Stay Updated</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold px-6 rounded-xl transition-all duration-300">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Sections */}
          {Object.entries(footerNavigation).map(([key, items]) => (
            <div key={key} className="space-y-4">
              <h3 className="font-bold text-lg bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent capitalize">
                {key}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Social Links and Copyright */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex gap-4">
              <Link 
                href={siteConfig.links.facebook} 
                target="_blank"
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
              >
                <Facebook className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.twitter} 
                target="_blank"
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
              >
                <Twitter className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.instagram} 
                target="_blank"
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
              >
                <Instagram className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.linkedin} 
                target="_blank"
                className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 hover:scale-110 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 text-slate-300 group-hover:text-white" />
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-slate-400">
                &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Made with ❤️ for students worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}

