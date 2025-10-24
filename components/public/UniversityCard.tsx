
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
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="relative pb-0">
        <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
          <Image
            src={university.banner || "/images/placeholders/university.jpg"}
            alt={university.name}
            fill
            className="object-cover"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(university._id, "university", university);
          }}
        >
          <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div>
          <Link href={`/universities/${university.slug}`}>
            <h3 className="font-semibold text-lg hover:text-primary">{university.name}</h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {university.location.city}, {typeof university.country === "object" ? university.country.name : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary">{university.type}</Badge>
          {university.ranking.world && (
            <Badge variant="outline">Rank #{university.ranking.world}</Badge>
          )}
          {university.featured && <Badge>Featured</Badge>}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{university.description}</p>

        {university.tuition_fees.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-sm font-medium">
              From {formatCurrency(university.tuition_fees[0].fee, university.tuition_fees[0].currency)}/year
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

