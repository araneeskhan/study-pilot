// ============================================
// FILE: src/app/(public)/countries/[slug]/page.tsx
// ============================================

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Award,
  DollarSign,
  FileText,
  Briefcase,
  Clock,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

async function getCountry(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/countries/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const country = await getCountry(slug);

  if (!country) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container">
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl font-bold">{country.name}</h1>
              {country.featured && (
                <Badge className="mt-2">Featured Destination</Badge>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-lg">{country.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Education System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {country.education_system}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visa Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{country.visa_info}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {country.popular_cities.map((city: string) => (
                    <Badge key={city} variant="secondary">
                      {city}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="font-semibold">
                      {country.universities_count}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Universities
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="text-muted-foreground h-5 w-5" />
                  <div>
                    <div className="font-semibold">
                      {country.scholarships_count}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Scholarships
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tuition Fees (Annual)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-muted-foreground mb-1 text-sm">
                    Bachelor's
                  </div>
                  <div className="font-semibold">
                    {formatCurrency(
                      country.tuition_fees.bachelor.min,
                      country.tuition_fees.bachelor.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      country.tuition_fees.bachelor.max,
                      country.tuition_fees.bachelor.currency
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-sm">
                    Master's
                  </div>
                  <div className="font-semibold">
                    {formatCurrency(
                      country.tuition_fees.master.min,
                      country.tuition_fees.master.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      country.tuition_fees.master.max,
                      country.tuition_fees.master.currency
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1 text-sm">PhD</div>
                  <div className="font-semibold">
                    {formatCurrency(
                      country.tuition_fees.phd.min,
                      country.tuition_fees.phd.currency
                    )}{" "}
                    -{" "}
                    {formatCurrency(
                      country.tuition_fees.phd.max,
                      country.tuition_fees.phd.currency
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost of Living (Monthly)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {formatCurrency(
                    country.cost_of_living.min,
                    country.cost_of_living.currency
                  )}{" "}
                  -{" "}
                  {formatCurrency(
                    country.cost_of_living.max,
                    country.cost_of_living.currency
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">
                    Part-time work:{" "}
                    {country.part_time_work ? "Allowed" : "Not allowed"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground h-4 w-4" />
                  <span className="text-sm">
                    Post-study visa:{" "}
                    {country.post_study_work_visa
                      ? "Available"
                      : "Not available"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full" asChild>
                <Link href={`/universities?country=${country._id}`}>
                  View Universities
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href={`/scholarships?country=${country._id}`}>
                  View Scholarships
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
