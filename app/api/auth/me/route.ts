import { NextRequest } from "next/server";
import { requireAuth, getCurrentUser } from "@/lib/auth/middleware";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET(req: NextRequest) {
  return requireAuth(req, async (req, user) => {
    const currentUser = await getCurrentUser(user.userId);

    if (!currentUser) {
      return errorResponse("User not found", 404);
    }

    return successResponse({ user: currentUser });
  });
}