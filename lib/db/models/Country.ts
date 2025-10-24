
// ============================================
// FILE: src/lib/db/models/Country.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "@/lib/utils";

export interface ICountry extends Document {
  _id: string;
  name: string;
  slug: string;
  flag: string;
  description: string;
  education_system: string;
  tuition_fees: {
    bachelor: { min: number; max: number; currency: string };
    master: { min: number; max: number; currency: string };
    phd: { min: number; max: number; currency: string };
  };
  language_requirements: Array<{
    test: string;
    min_score: number;
  }>;
  visa_info: string;
  part_time_work: boolean;
  post_study_work_visa: boolean;
  popular_cities: string[];
  cost_of_living: { min: number; max: number; currency: string };
  universities_count: number;
  scholarships_count: number;
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

const CountrySchema = new Schema<ICountry>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    flag: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    education_system: {
      type: String,
      required: true,
    },
    tuition_fees: {
      bachelor: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, required: true },
      },
      master: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, required: true },
      },
      phd: {
        min: { type: Number, required: true },
        max: { type: Number, required: true },
        currency: { type: String, required: true },
      },
    },
    language_requirements: [
      {
        test: { type: String, required: true },
        min_score: { type: Number, required: true },
      },
    ],
    visa_info: {
      type: String,
      required: true,
    },
    part_time_work: {
      type: Boolean,
      default: false,
    },
    post_study_work_visa: {
      type: Boolean,
      default: false,
    },
    popular_cities: [String],
    cost_of_living: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      currency: { type: String, required: true },
    },
    universities_count: {
      type: Number,
      default: 0,
    },
    scholarships_count: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    meta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Auto-generate slug from name
CountrySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

// Indexes for search and filtering
CountrySchema.index({ name: "text", description: "text" });
CountrySchema.index({ slug: 1 });
CountrySchema.index({ featured: 1 });

export const Country = mongoose.models.Country || mongoose.model<ICountry>("Country", CountrySchema);

