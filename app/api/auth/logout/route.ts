import { NextRequest } from "next/server";
import { removeAuthCookie } from "@/lib/auth/cookies";
import { successResponse } from "@/lib/utils/api-response";

export async function POST(req: NextRequest) {
  await removeAuthCookie();
  return successResponse(null, "Logout successful");
}