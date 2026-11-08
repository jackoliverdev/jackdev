import { ReactNode } from "react";
// import { MyFirebaseProvider } from "@/components/firebase-providers";
import { AppShell } from "@/components/app/app-shell";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Dashboard | Jack Oliver Development",
  description: "Your application dashboard",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    // Firebase auth temporarily disabled — re-enable MyFirebaseProvider when ready
    <>
      <AppShell>{children}</AppShell>
      {/* Toasts are only used by the app, so the public site doesn't load them. */}
      <Toaster />
    </>
  );
}

