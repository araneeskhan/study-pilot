// ============================================
// FILE: src/app/(admin)/x-control-panel-2024/programs/create/page.tsx
// ============================================

"use client";

import { useRouter } from "next/navigation";
import { ProgramForm } from "@/components/admin/forms/ProgramForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { programService } from "@/lib/api/services/program.service";
import { useNotification } from "@/hooks/useNotification";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProgramPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useNotification();

  const createMutation = useMutation({
    mutationFn: programService.create,
    onSuccess: () => {
      showSuccess("Program created successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-programs"] });
      router.push("/x-control-panel-2024/programs");
    },
    onError: (error: any) => {
      showError("Failed to create program", error.message);
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/x-control-panel-2024/programs">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Program</h1>
          <p className="text-muted-foreground mt-2">Create a new academic program</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgramForm
            onSubmit={(data) => createMutation.mutate(data)}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}