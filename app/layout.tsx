import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import { site } from "@/lib/content/site";

// Funnel Display and Funnel Sans by NORD ID and Kristian Möller (SIL OFL), self-hosted.
const fontDisplay = localFont({
  src: "./fonts/FunnelDisplay.woff2",
  variable: "--font-display",
  weight: "300 800",
  display: "swap",
});

const fontSans = localFont({
  src: "./fonts/FunnelSans.woff2",
  variable: "--font-sans",
  weight: "300 800",
  display: "swap",
});

export const metadata: Metadata = {
  // Next 13.5 takes theme colour and viewport here; move to `export const viewport` after upgrading.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EEF1F4" },
    { media: "(prefers-color-scheme: dark)", color: "#111217" },
  ],
  viewport: { width: "device-width", initialScale: 1, viewportFit: "cover" },
  title: {
    default: site.title,
    template: "%s",
  },
  description: site.description,
  keywords: [
    "web developer UK",
    "AI developer UK",
    "AI assistant for business",
    "website for trades business",
    "local SEO website",
    "Next.js developer",
    "web application development",
    "custom CRM developer",
  ],
  authors: [{ name: site.personName }],
  creator: site.personName,
  publisher: site.legalName,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={cn(fontSans.variable, fontDisplay.variable, "font-sans")}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
