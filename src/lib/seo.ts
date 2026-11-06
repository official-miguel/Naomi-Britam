import type { Metadata } from "next";
import { site } from "./site";

/**
 * Link-preview image for WhatsApp, Facebook, LinkedIn, X, Telegram, iMessage, Slack.
 * Rules that keep it showing everywhere:
 * - JPEG, 1200x630, well under 300 KB (WhatsApp drops larger images). Currently ~60 KB.
 * - Her face sits inside the centre square, because some apps crop to a square thumbnail.
 * - Absolute URL with a version (?v=) — bump it whenever the image changes, because
 *   WhatsApp and Facebook cache previews by URL.
 */
export const shareImage = {
  url: `${site.url}/og/naomi-mugure-kihuga.jpg?v=2`,
  secureUrl: `${site.url}/og/naomi-mugure-kihuga.jpg?v=2`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: `${site.fullDisplayName}, Britam ${site.title} in ${site.location}`,
};

/**
 * Complete openGraph + twitter metadata for a page. Next.js replaces (does not merge) a parent's
 * openGraph when a page sets its own, so every page must use this to keep the image.
 */
export function sharePreview({ title, description, path = "/", type = "website" }: { title: string; description: string; path?: string; type?: "website" | "article" }): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type,
      locale: "en_KE",
      siteName: site.fullDisplayName,
      url: path,
      title,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [{ url: shareImage.url, alt: shareImage.alt }] },
  };
}
