import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Country } from "@/lib/db/models/Country";
import { University } from "@/lib/db/models/University";
import { Scholarship } from "@/lib/db/models/Scholarship";
import { Program } from "@/lib/db/models/Program";
import { successResponse, errorResponse } from "@/lib/utils/api-response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit") || "5");

    if (!query || query.length < 2) {
      return errorResponse("Search query must be at least 2 characters", 400);
    }

    const searchRegex = { $regex: query, $options: "i" };

    // Search in parallel
    const [countries, universities, scholarships, programs] =
      await Promise.all([
        Country.find({
          $or: [{ name: searchRegex }, { description: searchRegex }],
        })
          .select("name slug flag")
          .limit(limit),

        University.find({
          $or: [{ name: searchRegex }, { description: searchRegex }],
        })
          .select("name slug logo country")
          .populate("country", "name")
          .limit(limit),

        Scholarship.find({
          $or: [{ name: searchRegex }, { description: searchRegex }],
        })
          .select("name slug type amount country")
          .populate("country", "name")
          .limit(limit),

        Program.find({
          $or: [{ name: searchRegex }, { description: searchRegex }],
        })
          .select("name slug degree_level university")
          .populate("university", "name")
          .limit(limit),
      ]);

    return successResponse({
      countries,
      universities,
      scholarships,
      programs,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return errorResponse("Search failed", 500);
  }
}