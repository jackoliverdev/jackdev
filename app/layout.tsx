import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import { site } from "@/lib/content/site";

// Archivo (Omnibus-Type, SIL OFL), self-hosted. One variable file with weight and
// width axes: headlines run wide (--display-stretch in globals.css), body runs normal.
const archivo = localFont({
  src: "./fonts/Archivo.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

// The colour palette for the whole site: "palette-nature" or "palette-v1".
const PALETTE = "palette-nature";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EEE7" },
    { media: "(prefers-color-scheme: dark)", color: "#121812" },
  ],
};

export const metadata: Metadata = {
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
    <html lang="en-GB" className={PALETTE} suppressHydrationWarning>
      <body className={cn(archivo.variable, "font-sans")}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
