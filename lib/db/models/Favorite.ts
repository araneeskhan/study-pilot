

// ============================================
// FILE: src/lib/db/models/Favorite.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";

export interface IFavorite extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  type: "country" | "university" | "scholarship" | "program";
  ref_id: mongoose.Types.ObjectId;
  created_at: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["country", "university", "scholarship", "program"],
      required: true,
    },
    ref_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "type",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: false },
  }
);

// Compound index to prevent duplicates
FavoriteSchema.index({ user: 1, type: 1, ref_id: 1 }, { unique: true });

export const Favorite = mongoose.models.Favorite || mongoose.model<IFavorite>("Favorite", FavoriteSchema);

