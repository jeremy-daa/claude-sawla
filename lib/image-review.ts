import { randomBytes, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import type { Collection, Db } from "mongodb";
import {
  ASSET_LABEL_COLLECTION,
  type AssetLabelRecord,
  type AssetManifest,
  type AssetManifestImage,
  readAssetManifest,
} from "@/lib/asset-labeling";

export type ReviewCategory = {
  id: string;
  title: string;
  tier: string;
  description: string;
  targetDistinct: number;
};

export const IMAGE_REVIEW_CATEGORIES: ReviewCategory[] = [
  {
    id: "homepage-destinations",
    title: "Homepage + destinations",
    tier: "Tiers 1 + 2",
    description: "Launch-critical homepage images and one strong primary image for each destination page.",
    targetDistinct: 30,
  },
  {
    id: "style-hubs",
    title: "Tour-style hubs",
    tier: "Tier 5",
    description: "Nine hub heroes, with seven available for reuse as homepage-style tiles.",
    targetDistinct: 9,
  },
  {
    id: "mobile-camps",
    title: "Mobile camps + field life",
    tier: "Tier 4b",
    description: "Real field photography for camp setup, logistics, meals, guides, and remote nights.",
    targetDistinct: 10,
  },
  {
    id: "itinerary-ctas",
    title: "Itinerary CTA backdrops",
    tier: "Tier 3",
    description: "Atmospheric second frames for itineraries. One strong photograph may serve related routes.",
    targetDistinct: 36,
  },
  {
    id: "travel-guides",
    title: "Travel guides",
    tier: "Tier 6",
    description: "Contextual images for planning, logistics, safety, culture, food, wildlife, and travel advice.",
    targetDistinct: 23,
  },
  {
    id: "moments-wildlife-editorial",
    title: "Moments, wildlife + editorial",
    tier: "Tier 7",
    description: "Story-led images for moments, species, cultural articles, and the deeper editorial layer.",
    targetDistinct: 22,
  },
];

export const IMAGE_REVIEW_COLLECTION = "image_review_projects";
export const IMAGE_REVIEW_ITEM_COLLECTION = "image_review_items";

export type ReviewProjectStatus = "draft" | "client-review" | "client-submitted" | "approved";
export type ReviewItemRole = "selected" | "alternative";
export type ReviewDecision = "pending" | "keep" | "remove" | "add";

export type ReviewProject = {
  reviewId: string;
  seedKey?: string;
  title: string;
  clientName: string;
  status: ReviewProjectStatus;
  accessHash: string;
  categories: ReviewCategory[];
  createdAt: Date;
  updatedAt: Date;
  clientSubmittedAt?: Date;
  approvedAt?: Date;
};

export type ReviewItem = {
  reviewId: string;
  assetId: string;
  categoryId: string;
  slotKey?: string;
  pagePath?: string;
  pageTargets?: string[];
  selectionReason?: string;
  qualityScore?: number;
  role: ReviewItemRole;
  decision: ReviewDecision;
  clientCategoryId?: string;
  clientNote?: string;
  reuseOf?: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewAsset = {
  assetId: string;
  title: string;
  altText: string;
  sourcePath: string;
  publicPath: string | null;
  category: string | null;
  destination: string;
  width: number | null;
  height: number | null;
  status: string;
};

export function createReviewToken() {
  return randomBytes(24).toString("hex");
}

export async function hashReviewToken(token: string) {
  return bcrypt.hash(token, 12);
}

export async function verifyReviewToken(token: string, accessHash: string) {
  return bcrypt.compare(token, accessHash);
}

export async function ensureImageReviewIndexes(db: Db) {
  const projects = db.collection<ReviewProject>(IMAGE_REVIEW_COLLECTION);
  const items = db.collection<ReviewItem>(IMAGE_REVIEW_ITEM_COLLECTION);

  await Promise.all([
    projects.createIndex({ reviewId: 1 }, { unique: true }),
    projects.createIndex({ seedKey: 1 }, { unique: true, sparse: true }),
    projects.createIndex({ updatedAt: -1 }),
    items.createIndex({ reviewId: 1, assetId: 1, categoryId: 1 }, { unique: true }),
    items.createIndex({ reviewId: 1, categoryId: 1, role: 1 }),
    items.createIndex({ reviewId: 1, updatedAt: -1 }),
  ]);

  return { projects, items };
}

export async function getAuthenticatedReview(db: Db, reviewId: string, token: string) {
  const project = await db
    .collection<ReviewProject>(IMAGE_REVIEW_COLLECTION)
    .findOne({ reviewId });

  if (!project || !(await verifyReviewToken(token, project.accessHash))) return null;
  return project;
}

export async function createImageReview(db: Db, title: string, clientName: string) {
  const token = createReviewToken();
  const now = new Date();
  const project: ReviewProject = {
    reviewId: randomUUID(),
    title: title.trim() || "Sawla photography selection",
    clientName: clientName.trim(),
    status: "draft",
    accessHash: await hashReviewToken(token),
    categories: IMAGE_REVIEW_CATEGORIES,
    createdAt: now,
    updatedAt: now,
  };

  await db.collection<ReviewProject>(IMAGE_REVIEW_COLLECTION).insertOne(project);
  return { project, token };
}

export async function getReviewAssets(db: Db, manifest: AssetManifest) {
  const labels = await db
    .collection<AssetLabelRecord>(ASSET_LABEL_COLLECTION)
    .find({ status: "labeled" })
    .sort({ updatedAt: -1 })
    .toArray();
  const manifestMap = new Map(manifest.images.map((image) => [image.id, image]));

  return labels.flatMap((label): ReviewAsset[] => {
    const asset = manifestMap.get(label.assetId);
    if (!asset) return [];
    return [{
      assetId: label.assetId,
      title: label.title,
      altText: label.altText,
      sourcePath: label.sourcePath,
      publicPath: label.publicPath,
      category: label.category,
      destination: label.destination,
      width: label.width,
      height: label.height,
      status: label.status,
    }];
  });
}

export function manifestAsset(manifest: AssetManifest, assetId: string): AssetManifestImage | null {
  return manifest.images.find((image) => image.id === assetId) ?? null;
}

export async function reviewSnapshot(db: Db, project: ReviewProject, admin: boolean) {
  const manifest = await readAssetManifest();
  const { items } = await ensureImageReviewIndexes(db);
  const reviewItems = await items.find({ reviewId: project.reviewId }).sort({ categoryId: 1, position: 1 }).toArray();
  const assets = admin ? await getReviewAssets(db, manifest) : [];
  const assetMap = new Map(assets.map((asset) => [asset.assetId, asset]));

  if (!admin) {
    const labels = await db
      .collection<AssetLabelRecord>(ASSET_LABEL_COLLECTION)
      .find({ assetId: { $in: reviewItems.map((item) => item.assetId) } })
      .toArray();
    for (const label of labels) {
      const asset = manifestAsset(manifest, label.assetId);
      if (asset) {
        assetMap.set(label.assetId, {
          assetId: label.assetId,
          title: label.title,
          altText: label.altText,
          sourcePath: label.sourcePath,
          publicPath: label.publicPath,
          category: label.category,
          destination: label.destination,
          width: label.width,
          height: label.height,
          status: label.status,
        });
      }
    }
  }

  return {
    project: { ...project, accessHash: undefined },
    categories: project.categories,
    items: reviewItems,
    assets: Array.from(assetMap.values()),
  };
}

export function categoryById(categories: ReviewCategory[], categoryId: string) {
  return categories.find((category) => category.id === categoryId) ?? null;
}
