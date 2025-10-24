
// ============================================
// FILE: src/components/public/CountryCard.tsx
// ============================================

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { Country } from "@/types";
import { Button } from "@/components/ui/button";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/countries/${country.slug}`}>
      <Card className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200 cursor-pointer group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm">
        <CardHeader className="relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">
                  {country.flag}
                </div>
                <div>
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">
                    {country.name}
                  </h3>
                  {country.featured && (
                    <Badge className="mt-2 bg-yellow-500 text-white border-0">
                      ⭐ Featured
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {country.description}
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  {country.universities_count}
                </div>
                <div className="text-xs text-blue-600/80 dark:text-blue-400/80">
                  Universities
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/30">
                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-xl font-semibold text-purple-600 dark:text-purple-400">
                  {country.scholarships_count}
                </div>
                <div className="text-xs text-purple-600/80 dark:text-purple-400/80">
                  Scholarships
                </div>
              </div>
            </div>
          </div>
          
          {/* Explore button */}
          <div className="pt-2">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Explore {country.name}
              <span className="ml-2">→</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

