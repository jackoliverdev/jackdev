import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Login | Jack Oliver Development",
  description: "Login to access the Jack Oliver Development platform.",
  robots: "noindex, nofollow",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4">Coming soon</p>
      <h1 className="display-hairline text-display-lg max-w-md text-paper">
        Login is temporarily unavailable.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-paper-dim">
        Client portal and authentication are not live yet. Check back soon.
      </p>
      <Link href="/" className="btn-ghost mt-8">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to home
      </Link>
    </main>
  );

  // Firebase login temporarily disabled — restore when auth is ready:
  // import Login from "@/components/website/login/login";
  // import { MyFirebaseProvider } from "@/components/firebase-providers";
  // return (
  //   <MyFirebaseProvider>
  //     <Login />
  //   </MyFirebaseProvider>
  // );
}
