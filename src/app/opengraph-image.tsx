import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, ${site.title}`;

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#0000FF", letterSpacing: 4 }}>EXECUTIVE FINANCIAL ADVISOR · BRITAM</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, color: "#000", letterSpacing: -4, lineHeight: 1 }}>Protecting what</div>
          <div style={{ fontSize: 92, fontWeight: 800, color: "#0000FF", letterSpacing: -4, lineHeight: 1 }}>matters most.</div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#000" }}>{site.name} · {site.location}</div>
      </div>
    ),
    size,
  );
}
