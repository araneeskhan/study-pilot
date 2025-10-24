// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/countries/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { countryService } from "@/lib/api/services/country.service";
import { useNotification } from "@/hooks/useNotification";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AdminCountriesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-countries", page, search],
    queryFn: () => countryService.getAll({ page, limit: 20, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: countryService.delete,
    onSuccess: () => {
      showSuccess("Country deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-countries"] });
      setDeleteId(null);
    },
    onError: () => {
      showError("Failed to delete country");
    },
  });

  const columns = [
    {
      key: "name",
      label: "Country",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <span className="text-2xl">{row.flag}</span>
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: "universities_count",
      label: "Universities",
      render: (value: number) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: "scholarships_count",
      label: "Scholarships",
      render: (value: number) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: "featured",
      label: "Featured",
      render: (value: boolean) =>
        value ? (
          <Badge>Featured</Badge>
        ) : (
          <Badge variant="outline">Regular</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Countries</h1>
          <p className="text-muted-foreground mt-2">
            Manage study destinations
          </p>
        </div>
        <Button
          onClick={() => router.push("/x-control-panel-2024/countries/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchable
        onSearch={setSearch}
        onEdit={(row) =>
          router.push(`/x-control-panel-2024/countries/${row._id}/edit`)
        }
        onDelete={(row) => setDeleteId(row._id)}
        onView={(row) => window.open(`/countries/${row.slug}`, "_blank")}
        pagination={{
          page,
          totalPages: data?.pagination.totalPages || 1,
          onPageChange: setPage,
        }}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              country and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
