import type { Metadata } from "next";
import ReviewBoard from "@/components/image-review/ReviewBoard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sawla Photography Review",
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ reviewId: string; token: string }>; searchParams: Promise<{ mode?: string }> };

export default async function ImageReviewPage({ params, searchParams }: Props) {
  const { reviewId, token } = await params;
  const query = await searchParams;
  return <ReviewBoard reviewId={reviewId} token={token} admin={query.mode === "admin"} />;
}
