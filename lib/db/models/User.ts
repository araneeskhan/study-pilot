
// ============================================
// FILE: src/lib/db/models/User.ts
// ============================================

import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
  profile: {
    avatar?: string;
    phone?: string;
    country?: string;
    education_level?: string;
    field_of_interest?: string[];
  };
  email_verified: boolean;
  verification_token?: string;
  reset_password_token?: string;
  reset_password_expires?: Date;
  created_at: Date;
  updated_at: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: {
      avatar: String,
      phone: String,
      country: String,
      education_level: String,
      field_of_interest: [String],
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    verification_token: String,
    reset_password_token: String,
    reset_password_expires: Date,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    delete ret.verification_token;
    delete ret.reset_password_token;
    delete ret.reset_password_expires;
    return ret;
  },
});

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

