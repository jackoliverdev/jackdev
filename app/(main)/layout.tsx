import { Footer } from "@/components/navbar/footer";
import { NavBar } from "@/components/navbar/navbar";
import { ReactNode } from "react";
import { RevealObserver } from "@/components/website/motion/reveal-observer";

// Native scrolling: no scroll library, so trackpads, mouse wheels and phones all
// scroll the way people expect. In-page links glide via scroll-behavior in globals.css.
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <div className="flex h-full grow flex-col">{children}</div>
      <Footer />
      <RevealObserver />
    </div>
  );
}
