"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

// Follows the visitor's system setting until they pick one with the toggle.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem themes={["light", "dark"]} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
