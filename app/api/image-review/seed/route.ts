import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { seedInitialImageReview } from "@/lib/image-review-seed";
import { getSawlaToursDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function hasSeedAccess(request: Request) {
  const expected = process.env.IMAGE_REVIEW_SEED_SECRET;
  const provided = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expected || !provided) return false;

  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  return expectedBytes.length === providedBytes.length && timingSafeEqual(expectedBytes, providedBytes);
}

export async function POST(request: Request) {
  if (!process.env.IMAGE_REVIEW_SEED_SECRET) {
    return NextResponse.json({ error: "Seed endpoint is not configured" }, { status: 503 });
  }

  if (!hasSeedAccess(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const db = await getSawlaToursDb();
    const result = await seedInitialImageReview(db);
    const origin = new URL(request.url).origin;

    return NextResponse.json({
      ...result,
      clientUrl: result.clientPath ? `${origin}${result.clientPath}` : null,
      adminUrl: result.adminPath ? `${origin}${result.adminPath}` : null,
      message: result.alreadySeeded
        ? "The initial review was already seeded. Its original bearer link is unchanged."
        : "The initial review was seeded from the labeled asset library.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to seed image review" },
      { status: 500 },
    );
  }
}
