
// ============================================
// FILE: src/lib/db/models/Program.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "@/lib/utils";

export interface IProgram extends Document {
  _id: string;
  name: string;
  slug: string;
  university: mongoose.Types.ObjectId;
  country: mongoose.Types.ObjectId;
  degree_level: "bachelor" | "master" | "phd";
  field: string;
  duration: string;
  language: string[];
  tuition_fee: {
    amount: number;
    currency: string;
  };
  start_dates: Date[];
  description: string;
  curriculum: string;
  requirements: {
    min_gpa: number;
    language_tests: Array<{ test: string; min_score: number }>;
    work_experience: boolean;
  };
  career_prospects: string[];
  accreditation: string;
  mode: "on-campus" | "online" | "hybrid";
  official_link: string;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

const ProgramSchema = new Schema<IProgram>(
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
    university: {
      type: Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
      required: true,
    },
    degree_level: {
      type: String,
      enum: ["bachelor", "master", "phd"],
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    language: [String],
    tuition_fee: {
      amount: { type: Number, required: true },
      currency: { type: String, required: true },
    },
    start_dates: [Date],
    description: {
      type: String,
      required: true,
    },
    curriculum: {
      type: String,
      required: true,
    },
    requirements: {
      min_gpa: { type: Number, required: true },
      language_tests: [
        {
          test: { type: String, required: true },
          min_score: { type: Number, required: true },
        },
      ],
      work_experience: { type: Boolean, default: false },
    },
    career_prospects: [String],
    accreditation: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["on-campus", "online", "hybrid"],
      required: true,
    },
    official_link: {
      type: String,
      required: true,
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
ProgramSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

// Indexes
ProgramSchema.index({ name: "text", description: "text" });
ProgramSchema.index({ slug: 1 });
ProgramSchema.index({ university: 1 });
ProgramSchema.index({ country: 1 });
ProgramSchema.index({ degree_level: 1 });
ProgramSchema.index({ field: 1 });

export const Program = mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);

