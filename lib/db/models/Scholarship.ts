
// ============================================
// FILE: src/lib/db/models/Scholarship.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "@/lib/utils";

export interface IScholarship extends Document {
  _id: string;
  name: string;
  slug: string;
  country: mongoose.Types.ObjectId;
  universities?: mongoose.Types.ObjectId[];
  type: "government" | "university" | "private";
  amount: {
    value: number;
    currency: string;
    type: "full" | "partial";
  };
  degree_levels: string[];
  fields_of_study: string[];
  eligibility: {
    nationality: string[];
    min_gpa: number;
    age_limit?: number;
    language_requirements: Array<{ test: string; min_score: number }>;
  };
  benefits: string[];
  application_deadline: Date;
  start_date: Date;
  duration: string;
  description: string;
  how_to_apply: string;
  official_link: string;
  featured: boolean;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

const ScholarshipSchema = new Schema<IScholarship>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    universities: [
      {
        type: Schema.Types.ObjectId,
        ref: "University",
      },
    ],
    type: {
      type: String,
      enum: ["government", "university", "private"],
      required: true,
    },
    amount: {
      value: { type: Number, required: true },
      currency: { type: String, required: true },
      type: { type: String, enum: ["full", "partial"], required: true },
    },
    degree_levels: [String],
    fields_of_study: [String],
    eligibility: {
      nationality: [String],
      min_gpa: { type: Number, required: true },
      age_limit: Number,
      language_requirements: [
        {
          test: { type: String, required: true },
          min_score: { type: Number, required: true },
        },
      ],
    },
    benefits: [String],
    application_deadline: {
      type: Date,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    how_to_apply: {
      type: String,
      required: true,
    },
    official_link: {
      type: String,
      required: true,
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

// Auto-generate slug
ScholarshipSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

// Indexes
ScholarshipSchema.index({ name: "text", description: "text" });
ScholarshipSchema.index({ slug: 1 });
ScholarshipSchema.index({ country: 1 });
ScholarshipSchema.index({ type: 1 });
ScholarshipSchema.index({ featured: 1 });
ScholarshipSchema.index({ application_deadline: 1 });

export const Scholarship = mongoose.models.Scholarship || mongoose.model<IScholarship>("Scholarship", ScholarshipSchema);

