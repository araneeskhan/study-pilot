import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Favorite } from "@/lib/db/models/Favorite";
import { requireAuth } from "@/lib/auth/middleware";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "@/lib/utils/api-response";

// GET - Get user's favorites
export async function GET(req: NextRequest) {
  return requireAuth(req, async (req, user) => {
    try {
      await connectDB();

      const { searchParams } = new URL(req.url);
      const type = searchParams.get("type");

      const query: any = { user: user.userId };
      if (type) {
        query.type = type;
      }

      const favorites = await Favorite.find(query)
        .populate("ref_id")
        .sort({ created_at: -1 });

      return successResponse(favorites);
    } catch (error: any) {
      console.error("Get favorites error:", error);
      return errorResponse("Failed to fetch favorites", 500);
    }
  });
}

// POST - Add to favorites
export async function POST(req: NextRequest) {
  return requireAuth(req, async (req, user) => {
    try {
      await connectDB();

      const body = await req.json();
      const { type, ref_id } = body;

      if (!type || !ref_id) {
        return validationErrorResponse({
          type: "Type is required",
          ref_id: "Reference ID is required",
        });
      }

      // Check if already favorited
      const existing = await Favorite.findOne({
        user: user.userId,
        type,
        ref_id,
      });

      if (existing) {
        return errorResponse("Already in favorites", 409);
      }

      const favorite = await Favorite.create({
        user: user.userId,
        type,
        ref_id,
      });

      return successResponse(favorite, "Added to favorites", 201);
    } catch (error: any) {
      console.error("Add favorite error:", error);
      return errorResponse("Failed to add to favorites", 500);
    }
  });
}