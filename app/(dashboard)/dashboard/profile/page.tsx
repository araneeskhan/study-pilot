// ============================================
// FILE: src/app/(dashboard)/dashboard/profile/page.tsx
// ============================================

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/auth-store";
import { useNotification } from "@/hooks/useNotification";
import {
  updateProfileSchema,
  UpdateProfileFormData,
} from "@/lib/validation/auth";
import { apiClient } from "@/lib/api/client";
import { getInitials } from "@/lib/utils";
import {
  POPULAR_COUNTRIES,
  DEGREE_LEVELS,
  FIELDS_OF_STUDY,
} from "@/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore();
  const { showSuccess, showError } = useNotification();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.profile?.phone || "",
      country: user?.profile?.country || "",
      education_level: user?.profile?.education_level || "",
      field_of_interest: user?.profile?.field_of_interest || [],
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileFormData) =>
      apiClient.put("/users/me", data),
    onSuccess: (response) => {
      updateUser(response.data);
      showSuccess("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: () => {
      showError("Failed to update profile");
    },
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account information
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">
                      {getInitials(user?.name || "User")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-muted-foreground mt-2 text-xs">
                      JPG, PNG or GIF. Max size 2MB
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Read-only)</Label>
                    <Input id="email" value={user?.email} disabled />
                    <Badge variant="outline" className="mt-2">
                      {user?.email_verified
                        ? "✓ Verified"
                        : "Pending Verification"}
                    </Badge>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={watch("country")}
                      onValueChange={(value) => setValue("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {POPULAR_COUNTRIES.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.flag} {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Study Preferences</CardTitle>
              <CardDescription>
                Help us personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="education_level">
                    Current Education Level
                  </Label>
                  <Select
                    value={watch("education_level")}
                    onValueChange={(value) =>
                      setValue("education_level", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEGREE_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fields of Interest</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {FIELDS_OF_STUDY.slice(0, 12).map((field) => (
                      <Button
                        key={field.value}
                        type="button"
                        variant={
                          watch("field_of_interest")?.includes(field.value)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const current = watch("field_of_interest") || [];
                          if (current.includes(field.value)) {
                            setValue(
                              "field_of_interest",
                              current.filter((f) => f !== field.value)
                            );
                          } else {
                            setValue("field_of_interest", [
                              ...current,
                              field.value,
                            ]);
                          }
                        }}
                      >
                        {field.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending
                      ? "Saving..."
                      : "Save Preferences"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current_password">Current Password</Label>
                    <Input id="current_password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="new_password">New Password</Label>
                    <Input id="new_password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm_password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm_password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-destructive mb-4 font-semibold">
                  Danger Zone
                </h3>
                <div className="border-destructive rounded-lg border p-4">
                  <p className="mb-4 text-sm">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
