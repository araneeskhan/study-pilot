
// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/scholarships/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { scholarshipService } from "@/lib/api/services/scholarship.service";
import { useNotification } from "@/hooks/useNotification";
import { Plus } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function AdminScholarshipsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-scholarships", page, search],
    queryFn: () => scholarshipService.getAll({ page, limit: 20, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: scholarshipService.delete,
    onSuccess: () => {
      showSuccess("Scholarship deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-scholarships"] });
      setDeleteId(null);
    },
    onError: () => {
      showError("Failed to delete scholarship");
    },
  });

  const columns = [
    {
      key: "name",
      label: "Scholarship",
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "country",
      label: "Country",
      render: (value: any) => value?.name || "N/A",
    },
    {
      key: "type",
      label: "Type",
      render: (value: string) => <Badge variant="secondary">{value}</Badge>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (value: any) => (
        <div>
          <div className="font-medium">{formatCurrency(value.value, value.currency)}</div>
          <Badge variant={value.type === "full" ? "default" : "outline"} className="text-xs">
            {value.type}
          </Badge>
        </div>
      ),
    },
    {
      key: "application_deadline",
      label: "Deadline",
      render: (value: Date) => formatDate(value),
    },
    {
      key: "featured",
      label: "Featured",
      render: (value: boolean) =>
        value ? <Badge>Featured</Badge> : <Badge variant="outline">Regular</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Scholarships</h1>
          <p className="text-muted-foreground mt-2">Manage funding opportunities</p>
        </div>
        <Button onClick={() => router.push("/x-control-panel-2024/scholarships/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Scholarship
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchable
        onSearch={setSearch}
        onEdit={(row) => router.push(`/x-control-panel-2024/scholarships/${row._id}/edit`)}
        onDelete={(row) => setDeleteId(row._id)}
        onView={(row) => window.open(`/scholarships/${row.slug}`, "_blank")}
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
              This will permanently delete the scholarship.
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

