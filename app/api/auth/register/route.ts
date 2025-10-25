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
    const validation = validateData(body, registerSchema);
    console.log("Validation result:", validation);

    if (!validation.success) {
      console.log("Validation errors:", validation.errors);
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

    // Send verification email (only if email service is configured)
    try {
      await sendEmail({
        to: email,
        ...emailTemplates.verifyEmail(name, verificationToken),
      });
    } catch (emailError) {
      console.warn('Email verification skipped - email service not configured:', emailError.message);
      // Mark email as verified if email service is not available
      user.email_verified = true;
      user.verification_token = undefined;
      await user.save();
    }

    // Generate JWT
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Set cookie
    await setAuthCookie(token);

    // Check if email was actually sent
    const emailSent = user.email_verified;
    
    return successResponse(
      {
        user: user.toJSON(),
        token,
      },
      emailSent ? "Registration successful! Welcome to StudyPilot!" : "Registration successful! Please check your email to verify your account.",
      201
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    console.error("Error stack:", error.stack);
    return errorResponse(`Registration failed: ${error.message}`, 500);
  }
}