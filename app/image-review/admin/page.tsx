import type { Metadata } from "next";
import ImageReviewAdmin from "./ImageReviewAdmin";

export const metadata: Metadata = {
  title: "Image Review Setup",
  robots: { index: false, follow: false },
};

export default function ImageReviewAdminPage() {
  return <ImageReviewAdmin />;
}
