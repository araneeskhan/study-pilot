import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { generateToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";
import bcrypt from "bcryptjs";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { adminSignupSchema } from "@/lib/validation/admin";

// Admin secret key from environment variable
const ADMIN_SECRET = process.env.ADMIN_SECRET || "studypilot-admin-2024";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
      console.log("Admin signup request body:", body);
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      return errorResponse("Invalid JSON format", 400);
    }
    
    const validation = validateData(body, adminSignupSchema);
    console.log("Validation result:", validation);

    if (!validation.success) {
      console.error("Validation failed:", validation.errors);
      return validationErrorResponse(validation.errors);
    }

    const { name, email, password, adminSecret } = validation.data;

    // Verify admin secret
    if (adminSecret !== ADMIN_SECRET) {
      return errorResponse("Invalid admin secret", 403);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse("User with this email already exists", 409);
    }

    // Create admin user (password will be hashed by the model's pre-save hook)
    const user = await User.create({
      name,
      email,
      password: password,
      role: "admin",
      email_verified: true, // Auto-verify admin emails
      verification_token: null,
    });

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set auth cookie
    const response = successResponse(
      { 
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      "Admin account created successfully",
      201
    );

    setAuthCookie(response, token);

    return response;

  } catch (error: any) {
    console.error("Admin signup error:", error);
    return errorResponse("Failed to create admin account", 500);
  }
}