

// ============================================
// FILE: src/lib/db/models/University.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "@/lib/utils";

export interface IUniversity extends Document {
  _id: string;
  name: string;
  slug: string;
  country: mongoose.Types.ObjectId;
  logo: string;
  banner: string;
  type: "public" | "private";
  ranking: {
    world?: number;
    national?: number;
  };
  website: string;
  location: {
    city: string;
    address: string;
  };
  description: string;
  founded_year: number;
  tuition_fees: Array<{
    degree_level: string;
    fee: number;
    currency: string;
  }>;
  admission_requirements: {
    min_gpa: number;
    language_tests: Array<{ test: string; min_score: number }>;
    documents: string[];
  };
  application_deadlines: Array<{
    intake: string;
    deadline: Date;
  }>;
  programs_count: number;
  featured: boolean;
  accreditations: string[];
  facilities: string[];
  contact: {
    email: string;
    phone: string;
  };
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

const UniversitySchema = new Schema<IUniversity>(
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
    logo: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
    ranking: {
      world: Number,
      national: Number,
    },
    website: {
      type: String,
      required: true,
    },
    location: {
      city: { type: String, required: true },
      address: { type: String, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    founded_year: {
      type: Number,
      required: true,
    },
    tuition_fees: [
      {
        degree_level: { type: String, required: true },
        fee: { type: Number, required: true },
        currency: { type: String, required: true },
      },
    ],
    admission_requirements: {
      min_gpa: { type: Number, required: true },
      language_tests: [
        {
          test: { type: String, required: true },
          min_score: { type: Number, required: true },
        },
      ],
      documents: [String],
    },
    application_deadlines: [
      {
        intake: { type: String, required: true },
        deadline: { type: Date, required: true },
      },
    ],
    programs_count: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    accreditations: [String],
    facilities: [String],
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
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
UniversitySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name);
  }
  next();
});

// Indexes
UniversitySchema.index({ name: "text", description: "text" });
UniversitySchema.index({ slug: 1 });
UniversitySchema.index({ country: 1 });
UniversitySchema.index({ featured: 1 });
UniversitySchema.index({ type: 1 });

export const University = mongoose.models.University || mongoose.model<IUniversity>("University", UniversitySchema);

