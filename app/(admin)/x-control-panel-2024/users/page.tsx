
// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/users/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import { apiClient } from "@/lib/api/client";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", page, search],
    queryFn: () => apiClient.get("/users", { params: { page, limit: 20, search } }),
  });

  const columns = [
    {
      key: "name",
      label: "User",
      render: (value: string, row: any) => (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(value)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-sm text-muted-foreground">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => (
        <Badge variant={value === "admin" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      key: "email_verified",
      label: "Status",
      render: (value: boolean) =>
        value ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Verified
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        ),
    },
    {
      key: "created_at",
      label: "Joined",
      render: (value: Date) => formatDate(value),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground mt-2">Manage platform users</p>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        searchable
        onSearch={setSearch}
        pagination={{
          page,
          totalPages: data?.pagination?.totalPages || 1,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}

