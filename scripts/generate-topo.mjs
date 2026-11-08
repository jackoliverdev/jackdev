// Generates public/brand/topo.svg: the contour map used on every forest panel.
// It is drawn once here and shipped as a static image, so the browser rasterises it
// once instead of repainting hundreds of SVG curves while you scroll.
// Run: node scripts/generate-topo.mjs
import fs from "node:fs";

function ring(cx, cy, r, seed, points = 72) {
  const pts = [];
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const wobble = 1 + 0.16 * Math.sin(a * 3 + seed) + 0.09 * Math.sin(a * 5 - seed * 1.7) + 0.05 * Math.sin(a * 9 + seed * 0.6);
    pts.push([cx + Math.cos(a) * r * wobble * 1.25, cy + Math.sin(a) * r * wobble]);
  }
  let d = `M${pts[0][0].toFixed(0)} ${pts[0][1].toFixed(0)}`;
  for (let i = 0; i < points; i++) {
    const p0 = pts[(i - 1 + points) % points], p1 = pts[i], p2 = pts[(i + 1) % points], p3 = pts[(i + 2) % points];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(0)} ${c1[1].toFixed(0)} ${c2[0].toFixed(0)} ${c2[1].toFixed(0)} ${p2[0].toFixed(0)} ${p2[1].toFixed(0)}`;
  }
  return d + "Z";
}

const summits = [
  { cx: 1020, cy: 250, rings: 13, step: 34, seed: 1.3 },
  { cx: 260, cy: 690, rings: 9, step: 38, seed: 4.1 },
];
// Bone-200 for minor contours, Soft Moss for every fourth (index) contour.
const minor = [], major = [];
for (const s of summits) for (let i = 0; i < s.rings; i++) (i % 4 === 3 ? major : minor).push(ring(s.cx, s.cy, 26 + i * s.step, s.seed + i * 0.35));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
<defs><radialGradient id="f" cx="70%" cy="30%" r="80%"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity=".15"/></radialGradient><mask id="m"><rect width="1400" height="900" fill="url(#f)"/></mask></defs>
<g mask="url(#m)" fill="none">
<path d="${minor.join("")}" stroke="#ECE7DC" stroke-opacity=".1"/>
<path d="${major.join("")}" stroke="#BBC7A4" stroke-opacity=".42" stroke-width="1.25"/>
</g></svg>
`;
fs.writeFileSync(new URL("../public/brand/topo.svg", import.meta.url), svg);
console.log("public/brand/topo.svg", Math.round(svg.length / 1024), "KB");
