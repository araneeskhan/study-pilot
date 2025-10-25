import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import { requireAuth } from "@/lib/auth/middleware";
import { Favorite } from "@/lib/db/models/Favorite";
import { Consultation } from "@/lib/db/models/Consultation";

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    await connectDB();

    // Get counts for the authenticated user
    const favoritesCount = await Favorite.countDocuments({ userId: user.id });
    const consultationsCount = await Consultation.countDocuments({ userId: user.id });

    return NextResponse.json({
      favorites: favoritesCount,
      applications: 0, // No Application model exists yet
      consultations: consultationsCount
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}