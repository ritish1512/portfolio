import { ImageResponse } from "next/og";
import { siteMetadata } from "@/lib/seo";

export const alt = "Ritish Builds full-stack engineering portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0d1117",
          color: "white",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#6ee7b7",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Full-stack engineering portfolio
        </div>
        <div style={{ fontSize: 92, fontWeight: 900, marginTop: 30 }}>{siteMetadata.name}</div>
        <div style={{ color: "#cbd5e1", fontSize: 34, lineHeight: 1.35, marginTop: 26, width: 900 }}>
          Custom Next.js, Sanity CMS, automation dashboards, and fast business workflows.
        </div>
        <div style={{ color: "#6ee7b7", fontSize: 28, fontWeight: 800, marginTop: 52 }}>
          ritishbuilds.com
        </div>
      </div>
    ),
    size,
  );
}
