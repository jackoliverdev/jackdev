import type { CSSProperties } from "react";

/** Stagger index for scroll reveals: each step adds 70ms (see globals.css). */
export const stagger = (i: number) => ({ ["--i" as string]: i }) as CSSProperties;
