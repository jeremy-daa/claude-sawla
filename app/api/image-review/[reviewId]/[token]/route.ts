import { NextResponse } from "next/server";
import {
  categoryById,
  ensureImageReviewIndexes,
  getReviewAssets,
  getAuthenticatedReview,
  reviewSnapshot,
  type ReviewDecision,
  type ReviewItemRole,
} from "@/lib/image-review";
import { readAssetManifest } from "@/lib/asset-labeling";
import { getSawlaToursDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ reviewId: string; token: string }> };

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRole(value: unknown): value is ReviewItemRole {
  return value === "selected" || value === "alternative";
}

function isDecision(value: unknown): value is ReviewDecision {
  return value === "pending" || value === "keep" || value === "remove" || value === "add";
}

async function getContext(context: RouteContext) {
  const { reviewId, token } = await context.params;
  const db = await getSawlaToursDb();
  const project = await getAuthenticatedReview(db, reviewId, token);
  return { db, project, reviewId, token };
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { db, project } = await getContext(context);
    const admin = new URL(request.url).searchParams.get("mode") === "admin";

    if (!project) return NextResponse.json({ error: "Review not found" }, { status: 404 });
    if (!admin && project.status === "draft") {
      return NextResponse.json({ error: "This review is not published yet" }, { status: 403 });
    }

    return NextResponse.json(await reviewSnapshot(db, project, admin));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to load review" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const { db, project } = await getContext(context);
    if (!project) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    const body = await request.json().catch(() => ({}));
    const action = text(body.action);
    const admin = text(body.mode) === "admin";
    const { items, projects } = await ensureImageReviewIndexes(db);
    const now = new Date();

    if (action === "admin-publish" || action === "admin-approve" || action === "admin-reopen") {
      if (!admin) return NextResponse.json({ error: "Admin mode is required" }, { status: 403 });
      const status = action === "admin-publish"
        ? "client-review"
        : action === "admin-approve"
          ? "approved"
          : "client-review";
      await projects.updateOne(
        { reviewId: project.reviewId },
        {
          $set: {
            status,
            updatedAt: now,
            ...(status === "approved" ? { approvedAt: now } : {}),
          },
        },
      );
      return NextResponse.json({ ok: true, status });
    }

    if (action === "admin-upsert-item") {
      if (!admin) return NextResponse.json({ error: "Admin mode is required" }, { status: 403 });
      const assetId = text(body.assetId);
      const categoryId = text(body.categoryId);
      const role = body.role;
      if (!assetId || !categoryById(project.categories, categoryId) || !isRole(role)) {
        return NextResponse.json({ error: "assetId, categoryId, and role are required" }, { status: 400 });
      }

      await items.updateOne(
        { reviewId: project.reviewId, assetId, categoryId },
        {
          $set: {
            role,
            ...(text(body.slotKey) ? { slotKey: text(body.slotKey) } : {}),
            ...(text(body.pagePath) ? { pagePath: text(body.pagePath) } : {}),
            ...(Array.isArray(body.pageTargets) ? { pageTargets: body.pageTargets.map(String).filter(Boolean) } : {}),
            ...(text(body.selectionReason) ? { selectionReason: text(body.selectionReason) } : {}),
            ...(typeof body.qualityScore === "number" ? { qualityScore: body.qualityScore } : {}),
            updatedAt: now,
          },
          $setOnInsert: {
            reviewId: project.reviewId,
            assetId,
            categoryId,
            role,
            decision: "pending",
            position: 0,
            createdAt: now,
          },
        },
        { upsert: true },
      );
      await projects.updateOne({ reviewId: project.reviewId }, { $set: { updatedAt: now } });
      return NextResponse.json({ ok: true });
    }

    if (action === "admin-remove-item") {
      if (!admin) return NextResponse.json({ error: "Admin mode is required" }, { status: 403 });
      const assetId = text(body.assetId);
      const categoryId = text(body.categoryId);
      await items.deleteOne({ reviewId: project.reviewId, assetId, categoryId });
      await projects.updateOne({ reviewId: project.reviewId }, { $set: { updatedAt: now } });
      return NextResponse.json({ ok: true });
    }

    if (action === "client-add-item") {
      const assetId = text(body.assetId);
      const categoryId = text(body.categoryId);
      if (!assetId || !categoryById(project.categories, categoryId)) {
        return NextResponse.json({ error: "assetId and categoryId are required" }, { status: 400 });
      }

      const assets = await getReviewAssets(db, await readAssetManifest());
      if (!assets.some((asset) => asset.assetId === assetId)) {
        return NextResponse.json({ error: "That image is not available in the labeled library" }, { status: 400 });
      }

      const existing = await items.findOne({ reviewId: project.reviewId, assetId, categoryId });
      if (existing) {
        await items.updateOne(
          { reviewId: project.reviewId, assetId, categoryId },
          { $set: { decision: "add", clientCategoryId: categoryId, clientPagePath: text(body.clientPagePath).slice(0, 300), updatedAt: now } },
        );
      } else {
        const lastItem = await items.find({ reviewId: project.reviewId, categoryId }).sort({ position: -1 }).limit(1).next();
        await items.insertOne({
          reviewId: project.reviewId,
          assetId,
          categoryId,
          role: "selected",
          decision: "add",
          clientCategoryId: categoryId,
          clientPagePath: text(body.clientPagePath).slice(0, 300),
          position: (lastItem?.position ?? 0) + 1,
          createdAt: now,
          updatedAt: now,
        });
      }
      await projects.updateOne({ reviewId: project.reviewId }, { $set: { updatedAt: now } });
      return NextResponse.json({ ok: true });
    }

    if (action === "client-update-item") {
      const assetId = text(body.assetId);
      const categoryId = text(body.categoryId);
      const nextCategoryId = text(body.nextCategoryId) || categoryId;
      const decision = body.decision;
      if (!assetId || !categoryById(project.categories, categoryId) || !categoryById(project.categories, nextCategoryId) || !isDecision(decision)) {
        return NextResponse.json({ error: "Invalid review item update" }, { status: 400 });
      }

      const item = await items.findOne({ reviewId: project.reviewId, assetId, categoryId });
      if (!item) return NextResponse.json({ error: "Review item not found" }, { status: 404 });
      const hasClientPagePath = Object.prototype.hasOwnProperty.call(body, "clientPagePath");
      const clientPagePath = text(body.clientPagePath).slice(0, 300);
      const pageUpdate = hasClientPagePath ? { clientPagePath } : {};

      if (nextCategoryId !== categoryId) {
        const existing = await items.findOne({ reviewId: project.reviewId, assetId, categoryId: nextCategoryId });
        if (existing) {
          await items.deleteOne({ reviewId: project.reviewId, assetId, categoryId });
          await items.updateOne(
            { reviewId: project.reviewId, assetId, categoryId: nextCategoryId },
            { $set: { decision, clientNote: text(body.clientNote), clientCategoryId: nextCategoryId, ...pageUpdate, updatedAt: now } },
          );
        } else {
          await items.updateOne(
            { reviewId: project.reviewId, assetId, categoryId },
            { $set: { categoryId: nextCategoryId, decision, clientNote: text(body.clientNote), clientCategoryId: nextCategoryId, ...pageUpdate, updatedAt: now } },
          );
        }
      } else {
        await items.updateOne(
          { reviewId: project.reviewId, assetId, categoryId },
          { $set: { decision, clientNote: text(body.clientNote), ...pageUpdate, updatedAt: now } },
        );
      }
      await projects.updateOne({ reviewId: project.reviewId }, { $set: { updatedAt: now } });
      return NextResponse.json({ ok: true });
    }

    if (action === "client-submit") {
      await projects.updateOne(
        { reviewId: project.reviewId },
        { $set: { status: "client-submitted", clientSubmittedAt: now, updatedAt: now } },
      );
      return NextResponse.json({ ok: true, status: "client-submitted" });
    }

    return NextResponse.json({ error: "Unknown review action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save review" },
      { status: 500 },
    );
  }
}
