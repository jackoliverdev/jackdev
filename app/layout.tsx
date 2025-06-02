import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Venefish | Vercel Next.JS Firebase Shadcn/ui Tailwind Boilerplate",
  description:
    "Venefish is a Vercel Next.JS Firebase Shadcn/ui Tailwind Boilerplate project to help you get started with your next project.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className)}>
        <ThemeProvider>
          <MyFirebaseProvider>
            {children}
            <Toaster />
          </MyFirebaseProvider>
        </ThemeProvider>
        {/* <div id="global-glow-cyan-emerald"></div> */}
      </body>
    </html>
  );
}
