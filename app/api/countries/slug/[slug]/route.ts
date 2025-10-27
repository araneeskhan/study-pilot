import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { notFoundResponse, errorResponse, successResponse } from "@/lib/utils/api-response";

// GET - Get country by slug
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;
    const country = await Country.findOne({ slug });

    if (!country) {
      return notFoundResponse("Country not found");
    }

    return successResponse(country);
  } catch (error: any) {
    console.error("Get country by slug error:", error);
    return errorResponse("Failed to fetch country", 500);
  }
}