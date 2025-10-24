
// ============================================
// FILE: src/lib/db/models/BlogPost.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "@/lib/utils";

export interface IBlogPost extends Document {
  _id: string;
  title: string;
  slug: string;
  author: mongoose.Types.ObjectId;
  featured_image: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  published: boolean;
  published_at?: Date;
  views: number;
  meta: {
    title: string;
    description: string;
  };
  created_at: Date;
  updated_at: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featured_image: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    published_at: Date,
    views: {
      type: Number,
      default: 0,
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
BlogPostSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  if (this.isModified("published") && this.published && !this.published_at) {
    this.published_at = new Date();
  }
  next();
});

// Indexes
BlogPostSchema.index({ title: "text", content: "text" });
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ category: 1 });
BlogPostSchema.index({ tags: 1 });
BlogPostSchema.index({ published: 1 });

export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

