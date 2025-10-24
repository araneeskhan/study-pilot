import { NextRequest } from "next/server";
import { sendEmail, emailTemplates } from "@/lib/utils/email";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { newsletterSchema } from "@/lib/validation/newsletter";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = validateData(newsletterSchema, body);

    if (!validation.success) {
      return validationErrorResponse(validation.errors);
    }

    const { email } = validation.data;

    // TODO: Save to database or mailing list service (Mailchimp, etc.)

    // Send confirmation email
    await sendEmail({
      to: email,
      ...emailTemplates.newsletterSubscription(email),
    });

    return successResponse(
      null,
      "Successfully subscribed to newsletter!"
    );
  } catch (error: any) {
    console.error("Newsletter subscription error:", error);
    return errorResponse("Failed to subscribe to newsletter", 500);
  }
}