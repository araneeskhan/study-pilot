import { NextRequest } from "next/server";
import { checkEmailConfiguration, getEmailConfigurationAdvice } from "@/lib/utils/email-config";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET(req: NextRequest) {
  try {
    const config = await checkEmailConfiguration();
    const advice = getEmailConfigurationAdvice();

    return successResponse({
      emailConfig: config,
      setupAdvice: advice,
    }, "Email configuration status retrieved");
  } catch (error: any) {
    console.error("Email config check error:", error);
    return errorResponse("Failed to check email configuration", 500);
  }
}