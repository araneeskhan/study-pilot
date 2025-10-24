import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { generateToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";
import { generateTokenWithExpiry } from "@/lib/auth/tokens";
import { sendEmail, emailTemplates } from "@/lib/utils/email";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { registerSchema } from "@/lib/validation/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validation = validateData(registerSchema, body);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const { name, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse("Email already registered", 409);
    }

    // Generate email verification token
    const { token: verificationToken, hashedToken } = generateTokenWithExpiry(24);

    // Create user
    const user = await User.create({
      name,
      email,
      password, // Will be hashed by pre-save hook
      verification_token: hashedToken,
    });

    // Send verification email
    await sendEmail({
      to: email,
      ...emailTemplates.verifyEmail(name, verificationToken),
    });

    // Generate JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    return successResponse(
      {
        user: user.toJSON(),
        token,
      },
      "Registration successful! Please check your email to verify your account.",
      201
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return errorResponse("Registration failed", 500);
  }
}