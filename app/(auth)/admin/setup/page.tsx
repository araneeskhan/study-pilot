// ============================================
// FILE: src/app/(auth)/admin/setup/page.tsx
// ============================================

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";
import { useNotification } from "@/hooks/useNotification";
import { adminSignupSchema, AdminSignupFormData } from "@/lib/validation/admin";
import { apiClient } from "@/lib/api/client";
import { handleApiError } from "@/lib/api/error-handler";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminSetupPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const { showSuccess, showError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignupFormData>({
    resolver: zodResolver(adminSignupSchema),
  });

  const adminSignupMutation = useMutation({
    mutationFn: (data: AdminSignupFormData) =>
      apiClient.post<{ data: { user: any; token: string } }>("/admin/setup", data),
    onSuccess: (response) => {
      login(response.data.user);
      showSuccess("Admin account created successfully!");
      // Redirect to admin dashboard after successful signup
      router.push("/x-control-panel-2024");
      router.refresh(); // Force refresh to update navigation
    },
    onError: (error: any) => {
      console.error("Admin signup error:", error);
      const errorMessage = error?.message || "Admin signup failed";
      showError("Admin signup failed", errorMessage);
    },
  });

  const onSubmit = (data: AdminSignupFormData) => {
    adminSignupMutation.mutate(data);
  };

  return (
    <div className="bg-muted/50 flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>
            Create your admin account with the secret key
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="adminSecret">Admin Secret Key</Label>
              <Input
                id="adminSecret"
                type="password"
                placeholder="Enter the admin secret key"
                {...register("adminSecret")}
              />
              {errors.adminSecret && (
                <p className="text-destructive mt-1 text-sm">
                  {errors.adminSecret.message}
                </p>
              )}
              <p className="text-muted-foreground mt-1 text-xs">
                Contact the system administrator to get the secret key
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={adminSignupMutation.isPending}
            >
              {adminSignupMutation.isPending ? "Creating Admin Account..." : "Create Admin Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to regular login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}