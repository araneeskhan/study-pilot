import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { requireAdmin } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { countrySchema } from "@/lib/validation/country";

// GET - Get single country
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const country = await Country.findById(id);

    if (!country) {
      return notFoundResponse("Country not found");
    }

    return successResponse(country);
  } catch (error: any) {
    console.error("Get country error:", error);
    return errorResponse("Failed to fetch country", 500);
  }
}

// PUT - Update country (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(req, async () => {
    try {
      await connectDB();

      const { id } = await params;
      const body = await req.json();
      const validation = validateData(body, countrySchema.partial());

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const country = await Country.findByIdAndUpdate(
        id,
        validation.data,
        { new: true, runValidators: true }
      );

      if (!country) {
        return notFoundResponse("Country not found");
      }

      return successResponse(country, "Country updated successfully");
    } catch (error: any) {
      console.error("Update country error:", error);
      return errorResponse("Failed to update country", 500);
    }
  });
}

// DELETE - Delete country (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return requireAdmin(req, async () => {
    try {
      await connectDB();

      const { id } = await params;
      const country = await Country.findByIdAndDelete(id);

      if (!country) {
        return notFoundResponse("Country not found");
      }

      return new Response(null, { status: 204 });
    } catch (error: any) {
      console.error("Delete country error:", error);
      return errorResponse("Failed to delete country", 500);
    }
  });
}