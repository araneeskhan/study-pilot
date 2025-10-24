// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/universities/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { universityService } from "@/lib/api/services/university.service";
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

export default function AdminUniversitiesPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-universities", page, search],
    queryFn: () => universityService.getAll({ page, limit: 20, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: universityService.delete,
    onSuccess: () => {
      showSuccess("University deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-universities"] });
      setDeleteId(null);
    },
    onError: () => {
      showError("Failed to delete university");
    },
  });

  const columns = [
    {
      key: "name",
      label: "University",
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
      render: (value: string) => (
        <Badge variant={value === "public" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "ranking",
      label: "World Rank",
      render: (value: any) => (value?.world ? `#${value.world}` : "N/A"),
    },
    {
      key: "programs_count",
      label: "Programs",
      render: (value: number) => <Badge variant="outline">{value}</Badge>,
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
          <h1 className="text-3xl font-bold">Universities</h1>
          <p className="text-muted-foreground mt-2">
            Manage educational institutions
          </p>
        </div>
        <Button
          onClick={() =>
            router.push("/x-control-panel-2024/universities/create")
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add University
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchable
        onSearch={setSearch}
        onEdit={(row) =>
          router.push(`/x-control-panel-2024/universities/${row._id}/edit`)
        }
        onDelete={(row) => setDeleteId(row._id)}
        onView={(row) => window.open(`/universities/${row.slug}`, "_blank")}
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
              This will permanently delete the university and all associated
              programs.
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
