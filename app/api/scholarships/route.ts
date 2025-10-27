import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Scholarship } from "@/lib/db/models/Scholarship";
import { requireAdmin } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";
import { calculatePagination } from "@/lib/utils/pagination";
import { validateData } from "@/lib/utils/validation-helper";
import { scholarshipSchema } from "@/lib/validation/scholarship";

// GET - List all scholarships
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const country = searchParams.get("country");
    const level = searchParams.get("level");
    const featured = searchParams.get("featured");
    const active = searchParams.get("active");

    // Build query
    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { eligibility: { $regex: search, $options: "i" } },
      ];
    }

    if (country) {
      query.country = country;
    }

    if (level) {
      query.level = level;
    }

    if (featured === "true") {
      query.featured = true;
    }

    if (active === "true") {
      query.deadline = { $gte: new Date() };
    }

    // Get total count
    const total = await Scholarship.countDocuments(query);

    // Calculate pagination
    const pagination = calculatePagination({ page, limit }, total);

    // Get scholarships
    const scholarships = await Scholarship.find(query)
      .populate("country", "name slug flag")
      .sort({ featured: -1, deadline: 1, createdAt: -1 })
      .skip(pagination.skip)
      .limit(pagination.limit);

    return paginatedResponse(scholarships, pagination);
  } catch (error: any) {
    console.error("Get scholarships error:", error);
    return errorResponse("Failed to fetch scholarships", 500);
  }
}

// POST - Create scholarship (Admin only)
export async function POST(req: NextRequest) {
  return requireAdmin(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const validation = validateData(body, scholarshipSchema);

      if (!validation.success) {
        return validationErrorResponse(validation.errors);
      }

      const scholarship = await Scholarship.create(validation.data);

      return successResponse(
        scholarship,
        "Scholarship created successfully",
        201
      );
    } catch (error: any) {
      console.error("Create scholarship error:", error);
      
      if (error.code === 11000) {
        return errorResponse("Scholarship already exists", 409);
      }
      
      return errorResponse("Failed to create scholarship", 500);
    }
  });
}