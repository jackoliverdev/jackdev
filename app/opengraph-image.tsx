import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jack Oliver Dev: websites, AI and web apps for UK businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const icon = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="12 0 40 64"><path d="M38.75 23V40.5A13 13 0 0 1 25.75 53.5H18.5" fill="none" stroke="#ECE7DC" stroke-width="13"/><circle cx="38.75" cy="10.5" r="6.75" fill="#BBC7A4"/></svg>'
)}`;

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
          background: "#121812",
          color: "#ECE7DC",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} width={50} height={80} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>
          <span>Websites, AI and software</span>
          <span>that win you work.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#AAB5A2" }}>
          <span>Jack Oliver Dev</span>
          <span style={{ color: "#BBC7A4" }}>jackodev.co.uk</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
