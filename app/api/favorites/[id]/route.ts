import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { Favorite } from "@/lib/db/models/Favorite";
import { requireAuth } from "@/lib/auth/middleware";
import {
  errorResponse,
  notFoundResponse,
  noContentResponse,
} from "@/lib/utils/api-response";

// DELETE - Remove from favorites
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return requireAuth(req, async (req, user) => {
    try {
      await connectDB();

      const favorite = await Favorite.findOneAndDelete({
        _id: params.id,
        user: user.userId,
      });

      if (!favorite) {
        return notFoundResponse("Favorite not found");
      }

      return noContentResponse();
    } catch (error: any) {
      console.error("Remove favorite error:", error);
      return errorResponse("Failed to remove from favorites", 500);
    }
  });
}