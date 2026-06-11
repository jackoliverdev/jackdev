import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Jack Oliver Dev | Web & AI Developer, UK",
    template: "%s",
  },
  description:
    "UK developer building fast, search-ready websites and custom AI solutions. Websites for trades and small businesses, AI chatbots, automation and full web applications.",
  keywords: [
    "web developer UK",
    "AI development UK",
    "custom AI chatbot",
    "website for trades business",
    "local SEO website",
    "Next.js developer",
    "web application development",
    "AI automation",
    "gym website developer",
  ],
  authors: [{ name: "Jack Oliver" }],
  creator: "Jack Oliver",
  publisher: "Jack Oliver Dev",
  metadataBase: new URL("https://www.jackoliverdev.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jack Oliver Dev | Web & AI Developer, UK",
    description:
      "Websites and AI that win you work. Fast, search-ready websites and custom AI solutions, built end to end in the UK.",
    url: "https://www.jackoliverdev.co.uk",
    siteName: "Jack Oliver Dev",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jack Oliver Dev | Web & AI Developer, UK",
    description:
      "Websites and AI that win you work. Fast, search-ready websites and custom AI solutions, built end to end in the UK.",
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
      <body
        className={cn(
          fontSans.variable,
          fontDisplay.variable,
          fontMono.variable,
          "font-sans"
        )}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        {/* <div id="global-glow-cyan-emerald"></div> */}
      </body>
    </html>
  );
}
