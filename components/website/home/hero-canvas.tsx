"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Interactive dot-grid shader. A single fullscreen quad renders a field
 * of soft dots that breathe with a travelling wave and swell around the
 * cursor. Colours are uniforms, so the scene adapts to light/dark mode.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;       /* 0..1, y up */
  uniform vec2 uResolution;  /* css px */
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uGridSize;

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(vUv.x * aspect, vUv.y);

    vec2 g = p * uGridSize;
    vec2 cellId = floor(g);
    vec2 local = fract(g) - 0.5;
    vec2 cellCentre = (cellId + 0.5) / uGridSize;

    /* Two slow travelling waves create an organic shimmer */
    float wave = sin(uTime * 0.55 + cellId.x * 0.42 + cellId.y * 0.61);
    float wave2 = sin(uTime * 0.32 - cellId.x * 0.27 + cellId.y * 0.18);
    float shimmer = 0.5 + 0.5 * wave * wave2;

    /* Cursor influence with a faint outward ripple */
    vec2 mouse = vec2(uMouse.x * aspect, uMouse.y);
    float dist = length(cellCentre - mouse);
    float influence = smoothstep(0.42, 0.0, dist);
    float ripple = 0.5 + 0.5 * sin(dist * 18.0 - uTime * 2.4);
    influence *= 0.65 + 0.35 * ripple;

    /* Dots: radius breathes with shimmer, swells near the cursor.
       fwidth gives ~1px of antialiasing at any resolution, so edges
       stay crisp instead of uniformly blurred. */
    float radius = 0.05 + shimmer * 0.05 + influence * 0.16;
    float d = length(local) - radius;
    float aa = fwidth(d) * 1.2;
    float dot = smoothstep(aa, -aa, d);

    /* Denser presence on the right, gently fading top-left under copy */
    float sideMask = 0.25 + 0.75 * smoothstep(0.05, 0.95, vUv.x);
    float vertMask = 0.55 + 0.45 * smoothstep(1.0, 0.25, vUv.y);

    float alpha = dot
      * (0.18 + 0.5 * shimmer + 0.9 * influence)
      * sideMask * vertMask * uIntensity;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

type DotGridProps = {
  colour: string;
  intensity: number;
  gridSize: number;
};

function DotGrid({ colour, intensity, gridSize }: DotGridProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size, gl } = useThree();
  const target = useRef(new THREE.Vector2(0.75, 0.5));

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.75, 0.5) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uColor: { value: new THREE.Color(colour) },
      uIntensity: { value: intensity },
      uGridSize: { value: gridSize },
    }),
    // Created once; live updates handled below so theme switches don't remount
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uColor.value.set(colour);
    uniforms.uIntensity.value = intensity;
    uniforms.uGridSize.value = gridSize;
  }, [colour, intensity, gridSize, uniforms]);

  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  /* Track the pointer against the canvas rect directly, so the highlight
     lands exactly under the cursor regardless of scroll position. */
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      target.current.set(
        (event.clientX - rect.left) / rect.width,
        1 - (event.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
    /* Frame-rate independent damping: same feel at 60Hz and 120Hz */
    const mouse = uniforms.uMouse.value;
    mouse.x = THREE.MathUtils.damp(mouse.x, target.current.x, 6, delta);
    mouse.y = THREE.MathUtils.damp(mouse.y, target.current.y, 6, delta);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

type HeroCanvasProps = {
  /** Resolved theme so dot colours match light/dark mode. */
  theme: "light" | "dark";
  /** Lower density for small screens. */
  gridSize?: number;
  paused?: boolean;
};

export default function HeroCanvas({
  theme,
  gridSize = 30,
  paused = false,
}: HeroCanvasProps) {
  const colour = theme === "dark" ? "#7FA6FF" : "#1D43E6";
  const intensity = theme === "dark" ? 0.85 : 0.8;

  return (
    <Canvas
      frameloop={paused ? "never" : "always"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden
    >
      <DotGrid colour={colour} intensity={intensity} gridSize={gridSize} />
    </Canvas>
  );
}
