// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/programs/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { programService } from "@/lib/api/services/program.service";
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

export default function AdminProgramsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-programs", page, search],
    queryFn: () => programService.getAll({ page, limit: 20, search }),
  });

  const deleteMutation = useMutation({
    mutationFn: programService.delete,
    onSuccess: () => {
      showSuccess("Program deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
      setDeleteId(null);
    },
    onError: () => {
      showError("Failed to delete program");
    },
  });

  const columns = [
    {
      key: "name",
      label: "Program",
      render: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      key: "university",
      label: "University",
      render: (value: any) => value?.name || "N/A",
    },
    {
      key: "country",
      label: "Country",
      render: (value: any) => value?.name || "N/A",
    },
    {
      key: "degree_level",
      label: "Degree Level",
      render: (value: string) => (
        <Badge variant={value === "bachelor" ? "default" : value === "master" ? "secondary" : "outline"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "field",
      label: "Field",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      key: "mode",
      label: "Mode",
      render: (value: string) => (
        <Badge variant={value === "on-campus" ? "default" : value === "online" ? "secondary" : "outline"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "tuition_fee",
      label: "Tuition Fee",
      render: (value: any) => (
        <span className="text-sm">
          {value?.amount} {value?.currency}
        </span>
      ),
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
          <h1 className="text-3xl font-bold">Programs</h1>
          <p className="text-muted-foreground mt-2">
            Manage academic programs
          </p>
        </div>
        <Button
          onClick={() => router.push("/x-control-panel-2024/programs/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchable
        onSearch={setSearch}
        onEdit={(row) =>
          router.push(`/x-control-panel-2024/programs/${row._id}/edit`)
        }
        onDelete={(row) => setDeleteId(row._id)}
        onView={(row) => window.open(`/programs/${row.slug}`, "_blank")}
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
              This will permanently delete the program and all associated data.
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