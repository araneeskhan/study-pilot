
// ============================================
// FILE: src/components/public/CountryCard.tsx
// ============================================

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { Country } from "@/types";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/countries/${country.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <h3 className="font-semibold text-lg">{country.name}</h3>
                {country.featured && (
                  <Badge variant="secondary" className="mt-1">Featured</Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{country.description}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <GraduationCap className="h-4 w-4" />
              <span>{country.universities_count} Universities</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Award className="h-4 w-4" />
              <span>{country.scholarships_count} Scholarships</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

