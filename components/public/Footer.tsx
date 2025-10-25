
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
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="font-bold text-2xl text-white">
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
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 rounded-xl">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          {/* Navigation Sections */}
          {Object.entries(footerNavigation).map(([key, items]) => (
            <div key={key} className="space-y-4">
              <h3 className="font-bold text-lg text-white capitalize">
                {key}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-slate-300 hover:text-white transition-colors inline-block"
                    >
                      {item.title}
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
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Facebook className="h-5 w-5 text-slate-300 hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.twitter} 
                target="_blank"
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-5 w-5 text-slate-300 hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.instagram} 
                target="_blank"
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Instagram className="h-5 w-5 text-slate-300 hover:text-white" />
              </Link>
              <Link 
                href={siteConfig.links.linkedin} 
                target="_blank"
                className="p-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-slate-300 hover:text-white" />
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
    </footer>
  );
}

