

// ============================================
// FILE: src/components/public/ScholarshipCard.tsx
// ============================================

"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Heart, MapPin } from "lucide-react";
import { Scholarship } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCurrency, formatDate } from "@/lib/utils";

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(scholarship._id, "scholarship");

  return (
    <Card className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200 group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Minimal header area */}
      <div className="relative h-16 bg-gray-50 dark:bg-slate-800">
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 z-10 bg-white/70 backdrop-blur-sm hover:bg-white border border-white rounded-full"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(scholarship._id, "scholarship", scholarship);
          }}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </Button>
        
        {/* Scholarship Type Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <Badge className="bg-white/80 backdrop-blur-sm border border-white text-gray-900 font-medium">
            {scholarship.type}
          </Badge>
        </div>
        
        {/* Featured Badge */}
        {scholarship.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-yellow-500 text-white border-0 font-medium">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6 space-y-5">
        {/* Scholarship Name and Country */}
        <div>
          <Link href={`/scholarships/${scholarship.slug}`}>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2 leading-tight">
              {scholarship.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {typeof scholarship.country === "object" ? scholarship.country.name : scholarship.country}
            </span>
          </div>
        </div>

        {/* Funding Type and Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="border border-green-200 text-green-700 bg-green-50">
              {scholarship.amount.type === "full" ? "Full Funding" : "Partial Funding"}
            </Badge>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">
                {formatCurrency(scholarship.amount.value, scholarship.amount.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Deadline with subtle emphasis */}
        <div className={`${new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' : 'border-gray-200 bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50'} p-4 rounded-lg border`}> 
          <div className="flex items-center gap-3">
            <Calendar className={`${new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-500' : 'text-muted-foreground'} h-5 w-5`} />
            <div className="flex-1">
              <div className={`${new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'} text-sm font-medium`}>
                {new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? '⏰ Deadline Approaching' : 'Application Deadline'}
              </div>
              <div className={`${new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'} text-sm`}>
                {formatDate(scholarship.application_deadline)}
                {new Date(scholarship.application_deadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                  <span className="ml-2 font-medium">
                    ({Math.ceil((new Date(scholarship.application_deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {scholarship.description}
        </p>
        
        {/* Apply Button */}
        <div className="pt-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow-sm hover:shadow-md"
            asChild
          >
            <Link href={`/scholarships/${scholarship.slug}`}>
              Apply for Scholarship
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

