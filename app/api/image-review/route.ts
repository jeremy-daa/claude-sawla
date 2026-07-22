import { NextResponse } from "next/server";
import { createImageReview } from "@/lib/image-review";
import { getSawlaToursDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const title = typeof body.title === "string" ? body.title : "";
    const clientName = typeof body.clientName === "string" ? body.clientName : "";
    const db = await getSawlaToursDb();
    const { project, token } = await createImageReview(db, title, clientName);

    return NextResponse.json({
      reviewId: project.reviewId,
      clientUrl: `/image-review/${project.reviewId}/${token}`,
      adminUrl: `/image-review/${project.reviewId}/${token}?mode=admin`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create review" },
      { status: 500 },
    );
  }
}
