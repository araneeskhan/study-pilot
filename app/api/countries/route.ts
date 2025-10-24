import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { requireAdmin, optionalAuth } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { calculatePagination } from "@/lib/utils/pagination";
import { validateData } from "@/lib/utils/validation-helper";
import { countrySchema } from "@/lib/validation/country";

// GET - List all countries
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const featured = searchParams.get("featured");

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (featured === "true") {
      query.featured = true;
    }

    // Get total count
    const total = await Country.countDocuments(query);

    // Calculate pagination
    const pagination = calculatePagination({ page, limit }, total);

    // Get countries
    const countries = await Country.find(query)
      .sort({ featured: -1, name: 1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    return paginatedResponse(countries, pagination);
  } catch (error: any) {
    console.error("Get countries error:", error);
    return errorResponse("Failed to fetch countries", 500);
  }
}

// POST - Create country (Admin only)
export async function POST(req: NextRequest) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const validation = validateData(countrySchema, body);

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const country = await Country.create(validation.data);

      return successResponse(country, "Country created successfully", 201);
    } catch (error: any) {
      console.error("Create country error:", error);
      
      if (error.code === 11000) {
        return errorResponse("Country already exists", 409);
      }
      
      return errorResponse("Failed to create country", 500);
    }
  });
}