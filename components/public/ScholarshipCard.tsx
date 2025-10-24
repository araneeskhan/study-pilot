

// ============================================
// FILE: src/components/public/ScholarshipCard.tsx
// ============================================

"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Heart } from "lucide-react";
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
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/scholarships/${scholarship.slug}`}>
              <h3 className="font-semibold text-lg hover:text-primary line-clamp-2">
                {scholarship.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {typeof scholarship.country === "object" ? scholarship.country.name : ""}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(scholarship._id, "scholarship", scholarship)}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={scholarship.amount.type === "full" ? "default" : "secondary"}>
            {scholarship.amount.type === "full" ? "Full Funding" : "Partial Funding"}
          </Badge>
          <Badge variant="outline">{scholarship.type}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-muted-foreground" />
            <span>{formatCurrency(scholarship.amount.value, scholarship.amount.currency)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Deadline: {formatDate(scholarship.application_deadline)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{scholarship.description}</p>

        <Button variant="outline" className="w-full" asChild>
          <Link href={`/scholarships/${scholarship.slug}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

