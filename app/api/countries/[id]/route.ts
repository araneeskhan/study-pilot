import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { requireAdmin } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  noContentResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { countrySchema } from "@/lib/validation/country";

// GET - Get single country
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const country = await Country.findById(params.id);

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
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const validation = validateData(countrySchema.partial(), body);

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const country = await Country.findByIdAndUpdate(
        params.id,
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
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const country = await Country.findByIdAndDelete(params.id);

      if (!country) {
        return notFoundResponse("Country not found");
      }

      return noContentResponse();
    } catch (error: any) {
      console.error("Delete country error:", error);
      return errorResponse("Failed to delete country", 500);
    }
  });
}