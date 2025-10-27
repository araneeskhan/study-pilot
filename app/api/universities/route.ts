import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { University } from "@/lib/db/models/University";
import { requireAdmin } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { calculatePagination } from "@/lib/utils/pagination";
import { validateData } from "@/lib/utils/validation-helper";
import { universitySchema } from "@/lib/validation/university";

// GET - List all universities
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const country = searchParams.get("country");
    const type = searchParams.get("type");
    const featured = searchParams.get("featured");

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (country) {
      query.country = country;
    }

    if (type) {
      query.type = type;
    }

    if (featured === "true") {
      query.featured = true;
    }

    // Get total count
    const total = await University.countDocuments(query);

    // Calculate pagination
    const pagination = calculatePagination({ page, limit }, total);

    // Get universities
    const universities = await University.find(query)
      .populate("country", "name slug flag")
      .sort({ featured: -1, "ranking.world": 1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    return paginatedResponse(universities, pagination);
  } catch (error: any) {
    console.error("Get universities error:", error);
    return errorResponse("Failed to fetch universities", 500);
  }
}

// POST - Create university (Admin only)
export async function POST(req: NextRequest) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const validation = validateData(body, universitySchema);

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const university = await University.create(validation.data);

      // Update country's universities count
      await connectDB();
      const Country = (await import("@/lib/db/models/Country")).Country;
      await Country.findByIdAndUpdate(validation.data.country, {
        $inc: { universities_count: 1 },
      });

      return successResponse(
        university,
        "University created successfully",
        201
      );
    } catch (error: any) {
      console.error("Create university error:", error);
      return errorResponse("Failed to create university", 500);
    }
  });
}