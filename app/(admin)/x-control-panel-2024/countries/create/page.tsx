// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/countries/create/page.tsx
// ============================================

"use client";

import { useRouter } from "next/navigation";
import { CountryForm } from "@/components/admin/forms/CountryForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { countryService } from "@/lib/api/services/country.service";
import { useNotification } from "@/hooks/useNotification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateCountryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const createMutation = useMutation({
    mutationFn: countryService.create,
    onSuccess: () => {
      showSuccess("Country created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-countries"] });
      router.push("/x-control-panel-2024/countries");
    },
    onError: (error: any) => {
      showError("Failed to create country", error.message);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/x-control-panel-2024/countries">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Country</h1>
          <p className="text-muted-foreground mt-2">
            Create a new study destination
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Country Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CountryForm
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
