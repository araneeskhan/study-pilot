
// ============================================
// FILE: src/lib/db/models/Consultation.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";

export interface IConsultation extends Document {
  _id: string;
  user: mongoose.Types.ObjectId;
  type: "free" | "paid";
  service: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  scheduled_date: Date;
  duration: number;
  amount: number;
  payment_status: "pending" | "paid" | "refunded";
  meeting_link?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

const ConsultationSchema = new Schema<IConsultation>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["free", "paid"],
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    scheduled_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 30,
    },
    amount: {
      type: Number,
      default: 0,
    },
    payment_status: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    meeting_link: String,
    notes: String,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Indexes
ConsultationSchema.index({ user: 1 });
ConsultationSchema.index({ status: 1 });
ConsultationSchema.index({ scheduled_date: 1 });

export const Consultation = mongoose.models.Consultation || mongoose.model<IConsultation>("Consultation", ConsultationSchema);