import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { University } from "@/lib/db/models/University";
import { requireAdmin } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  notFoundResponse,
  noContentResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { validateData } from "@/lib/utils/validation-helper";
import { universitySchema } from "@/lib/validation/university";

// GET - Get single university
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const university = await University.findById(params.id).populate(
      "country",
      "name slug flag"
    );

    if (!university) {
      return notFoundResponse("University not found");
    }

    return successResponse(university);
  } catch (error: any) {
    console.error("Get university error:", error);
    return errorResponse("Failed to fetch university", 500);
  }
}

// PUT - Update university (Admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const validation = validateData(body, universitySchema.partial());

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const university = await University.findByIdAndUpdate(
        params.id,
        validation.data,
        { new: true, runValidators: true }
      ).populate("country", "name slug flag");

      if (!university) {
        return notFoundResponse("University not found");
      }

      return successResponse(university, "University updated successfully");
    } catch (error: any) {
      console.error("Update university error:", error);
      return errorResponse("Failed to update university", 500);
    }
  });
}

// DELETE - Delete university (Admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const university = await University.findByIdAndDelete(params.id);

      if (!university) {
        return notFoundResponse("University not found");
      }

      // Update country's universities count
      const Country = (await import("@/lib/db/models/Country")).Country;
      await Country.findByIdAndUpdate(university.country, {
        $inc: { universities_count: -1 },
      });

      return noContentResponse();
    } catch (error: any) {
      console.error("Delete university error:", error);
      return errorResponse("Failed to delete university", 500);
    }
  });
}