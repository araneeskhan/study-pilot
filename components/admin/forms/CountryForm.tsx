
// ============================================
// FILE: src/components/admin/forms/CountryForm.tsx
// ============================================

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countrySchema, CountryFormData } from "@/lib/validation/country";
import { CURRENCIES } from "@/lib/constants";

interface CountryFormProps {
  initialData?: CountryFormData;
  onSubmit: (data: CountryFormData) => void;
  isLoading?: boolean;
}

export function CountryForm({ initialData, onSubmit, isLoading }: CountryFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CountryFormData>({
    resolver: zodResolver(countrySchema),
    defaultValues: initialData || {
      tuition_fees: {
        bachelor: { min: 0, max: 0, currency: "USD" },
        master: { min: 0, max: 0, currency: "USD" },
        phd: { min: 0, max: 0, currency: "USD" },
      },
      cost_of_living: { min: 0, max: 0, currency: "USD" },
      language_requirements: [],
      popular_cities: [],
      part_time_work: false,
      post_study_work_visa: false,
      featured: false,
      meta: { title: "", description: "" },
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Country Name *</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="flag">Flag Emoji *</Label>
          <Input id="flag" placeholder="🇺🇸" {...register("flag")} />
          {errors.flag && <p className="text-sm text-destructive mt-1">{errors.flag.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" rows={4} {...register("description")} />
        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="education_system">Education System *</Label>
        <Textarea id="education_system" rows={3} {...register("education_system")} />
        {errors.education_system && <p className="text-sm text-destructive mt-1">{errors.education_system.message}</p>}
      </div>

      <div>
        <Label htmlFor="visa_info">Visa Information *</Label>
        <Textarea id="visa_info" rows={3} {...register("visa_info")} />
        {errors.visa_info && <p className="text-sm text-destructive mt-1">{errors.visa_info.message}</p>}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tuition Fees (Annual)</h3>
        <div className="space-y-4">
          {["bachelor", "master", "phd"].map((level) => (
            <div key={level} className="grid grid-cols-3 gap-4">
              <div>
                <Label>Min ({level})</Label>
                <Input type="number" {...register(`tuition_fees.${level}.min` as any, { valueAsNumber: true })} />
              </div>
              <div>
                <Label>Max ({level})</Label>
                <Input type="number" {...register(`tuition_fees.${level}.max` as any, { valueAsNumber: true })} />
              </div>
              <div>
                <Label>Currency</Label>
                <Select
                  value={watch(`tuition_fees.${level}.currency` as any)}
                  onValueChange={(value) => setValue(`tuition_fees.${level}.currency` as any, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((curr) => (
                      <SelectItem key={curr.value} value={curr.value}>
                        {curr.symbol} {curr.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Cost of Living (Monthly)</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Minimum</Label>
            <Input type="number" {...register("cost_of_living.min", { valueAsNumber: true })} />
          </div>
          <div>
            <Label>Maximum</Label>
            <Input type="number" {...register("cost_of_living.max", { valueAsNumber: true })} />
          </div>
          <div>
            <Label>Currency</Label>
            <Select
              value={watch("cost_of_living.currency")}
              onValueChange={(value) => setValue("cost_of_living.currency", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((curr) => (
                  <SelectItem key={curr.value} value={curr.value}>
                    {curr.symbol} {curr.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label>Popular Cities (comma-separated)</Label>
        <Input placeholder="New York, Los Angeles, Boston" {...register("popular_cities")} />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Label htmlFor="part_time_work">Part-time Work Allowed</Label>
          <Switch
            id="part_time_work"
            checked={watch("part_time_work")}
            onCheckedChange={(checked) => setValue("part_time_work", checked)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="post_study_work_visa">Post-study Work Visa</Label>
          <Switch
            id="post_study_work_visa"
            checked={watch("post_study_work_visa")}
            onCheckedChange={(checked) => setValue("post_study_work_visa", checked)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="featured">Featured Country</Label>
          <Switch
            id="featured"
            checked={watch("featured")}
            onCheckedChange={(checked) => setValue("featured", checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">SEO Metadata</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="meta_title">Meta Title</Label>
            <Input id="meta_title" {...register("meta.title")} />
          </div>
          <div>
            <Label htmlFor="meta_description">Meta Description</Label>
            <Textarea id="meta_description" {...register("meta.description")} />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Country"}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
