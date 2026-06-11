import { ReactNode } from "react";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { AppShell } from "@/components/app/app-shell";

export const metadata = {
  title: "Dashboard | Jack Oliver Development",
  description: "Your application dashboard",
  robots: "noindex, nofollow",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <MyFirebaseProvider>
      <AppShell>{children}</AppShell>
    </MyFirebaseProvider>
  );
}

