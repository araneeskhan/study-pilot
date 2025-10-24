
// ============================================
// FILE: src/components/public/UniversityCard.tsx
// ============================================

"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Heart } from "lucide-react";
import { University } from "@/types";
import { useFavorites } from "@/hooks/useFavorites";
import { formatCurrency } from "@/lib/utils";

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isLiked = isFavorite(university._id, "university");

  return (
    <Card className="h-full hover:-translate-y-1 hover:shadow-md transition-all duration-200 group bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* University Banner */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10"></div>
        <Image
          src={university.banner || "/images/placeholders/university.jpg"}
          alt={university.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 bg-white/60 backdrop-blur-sm hover:bg-white border border-white rounded-full"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(university._id, "university", university);
          }}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
        </Button>
        
        {/* University Type Badge */}
        <div className="absolute bottom-4 left-4 z-20">
          <Badge className="bg-white/70 backdrop-blur-sm border border-white text-gray-900 font-medium">
            {university.type}
          </Badge>
        </div>
        
        {/* Featured Badge */}
        {university.featured && (
          <div className="absolute top-4 left-4 z-20">
            <Badge className="bg-yellow-500 text-white border-0 font-medium">
              ⭐ Featured
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-6 space-y-5">
        {/* University Name and Location */}
        <div>
          <Link href={`/universities/${university.slug}`}>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
              {university.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium">
              {university.location.city}, {typeof university.country === "object" ? university.country.name : ""}
            </span>
          </div>
        </div>

        {/* Ranking and Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {university.ranking.world && (
            <Badge variant="outline" className="border border-primary/30 text-primary">
              🏆 World Rank #{university.ranking.world}
            </Badge>
          )}
          {university.ranking.national && (
            <Badge variant="outline" className="border border-secondary/30 text-secondary">
              🇺🇸 National Rank #{university.ranking.national}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {university.description}
        </p>

        {/* Tuition Fees */}
        {university.tuition_fees.length > 0 && (
          <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Tuition Fees</span>
              <span className="text-base font-semibold text-primary">
                From {formatCurrency(university.tuition_fees[0].fee, university.tuition_fees[0].currency)}/year
              </span>
            </div>
          </div>
        )}
        
        {/* Explore Button */}
        <div className="pt-2">
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            asChild
          >
            <Link href={`/universities/${university.slug}`}>
              View University Details
              <span className="ml-2">→</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

