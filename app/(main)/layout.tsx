import { Footer } from "@/components/navbar/footer";
import { NavBar } from "@/components/navbar/navbar";
import { SmoothScroll } from "@/components/website/motion/smooth-scroll";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="flex h-full grow flex-col">{children}</div>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
