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
  title: "Jack Oliver | Full-Stack Developer & AI Solutions Specialist",
  description:
    "Professional website development, AI chatbot solutions, and consulting services. UK-based developer specialising in modern web applications with exceptional results and fast delivery.",
  keywords: [
    "web developer UK",
    "AI chatbot development", 
    "website development",
    "Next.js developer",
    "full-stack developer",
    "AI solutions",
    "business websites",
    "e-commerce development"
  ],
  authors: [{ name: "Jack Oliver" }],
  creator: "Jack Oliver",
  publisher: "Jack Oliver Development",
  metadataBase: new URL("https://www.jackoliverdev.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jack Oliver | Full-Stack Developer & AI Solutions Specialist",
    description: "Professional website development, AI chatbot solutions, and consulting services. UK-based developer with exceptional results.",
    url: "https://www.jackoliverdev.co.uk",
    siteName: "Jack Oliver Development",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Oliver | Full-Stack Developer & AI Solutions Specialist",
    description: "Professional website development, AI chatbot solutions, and consulting services. UK-based developer with exceptional results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logos/logo.svg",
    shortcut: "/logos/logo.svg",
    apple: "/logos/logo.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
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
