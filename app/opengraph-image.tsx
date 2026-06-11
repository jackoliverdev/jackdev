import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Jack Oliver Dev | Web & AI Developer, UK";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0B0F1A 0%, #060608 100%)",
          color: "#F7F6F2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            letterSpacing: 4,
            color: "#7F7F88",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#477CFF",
            }}
          />
          Jack Oliver Dev · Web &amp; AI Developer · UK
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          <span>Websites and AI</span>
          <span style={{ display: "flex" }}>
            that win you&nbsp;
            <span style={{ color: "#477CFF" }}>work.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#BCB9B2",
          }}
        >
          <span>Websites · AI · Web Applications</span>
          <span>jackoliverdev.co.uk</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
