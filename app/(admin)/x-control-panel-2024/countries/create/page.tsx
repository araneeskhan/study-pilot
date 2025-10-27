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
      console.error("Country creation error:", error);
      console.error("Error details:", {
        message: error.message,
        status: error.status,
        data: error.data,
        fullError: error
      });

      let errorMessage = error.message || "An unknown error occurred";

      // Handle validation errors from the server
      if (error.data && typeof error.data === 'object') {
        if (error.data.message) {
          errorMessage = error.data.message;
        } else if (error.data.errors) {
          // Handle field-specific validation errors (different possible formats)
          const errors = error.data.errors;
          let fieldErrors = '';

          if (Array.isArray(errors)) {
            // Array format: [{field: 'name', message: 'Required'}]
            fieldErrors = errors.map(err => `${err.field || 'field'}: ${err.message}`).join('; ');
          } else if (typeof errors === 'object') {
            // Object format: {name: ['Required'], email: ['Invalid format']}
            fieldErrors = Object.entries(errors)
              .map(([field, messages]) => {
                if (Array.isArray(messages)) {
                  return `${field}: ${messages.join(', ')}`;
                } else if (typeof messages === 'string') {
                  return `${field}: ${messages}`;
                } else {
                  return `${field}: ${JSON.stringify(messages)}`;
                }
              })
              .join('; ');
          }

          errorMessage = fieldErrors || errorMessage;
        }
      }

      showError("Failed to create country", errorMessage);
    }
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
          <p className="text-muted-foreground mt-2">Create a new study destination</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Country Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CountryForm
            onSubmit={(data) => {
              console.log('Country form submitted with data:', data);
              createMutation.mutate(data);
            }}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
