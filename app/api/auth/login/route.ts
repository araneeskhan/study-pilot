import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { User } from "@/lib/db/models/User";
import { generateToken } from "@/lib/auth/jwt";
import { setAuthCookie } from "@/lib/auth/cookies";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { loginSchema } from "@/lib/validation/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validation = validateData(body, loginSchema);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const { email, password } = validation.data;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return errorResponse("Invalid email or password", 401);
    }

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
      "Login successful"
    );
  } catch (error: any) {
    console.error("Login error:", error);
    return errorResponse("Login failed", 500);
  }
}