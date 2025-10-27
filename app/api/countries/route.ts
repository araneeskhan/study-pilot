import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { withAdmin } from "@/lib/auth/middleware";
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
export const POST = withAdmin(async (req: NextRequest) => {
  try {
    console.log('Country creation - Starting withAdmin handler');
    await connectDB();

    let body;
    try {
      body = await req.json();
      console.log('Country creation request body:', JSON.stringify(body, null, 2));
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return errorResponse("Invalid request body", 400);
    }

    const validation = validateData(body, countrySchema);
    console.log('Validation result:', validation);

    if (!validation.success) {
      console.log('Validation errors:', validation.errors);
      return validationErrorResponse(validation.errors || []);
    }

    const country = await Country.create(validation.data);
    console.log('Country created successfully:', country._id);

    return successResponse(country, "Country created successfully", 201);
  } catch (error: any) {
    console.error("Create country error:", error);
    console.error("Error stack:", error.stack);
    
    if (error.code === 11000) {
      return errorResponse("Country already exists", 409);
    }
    
    return errorResponse("Failed to create country", 500);
  }
});