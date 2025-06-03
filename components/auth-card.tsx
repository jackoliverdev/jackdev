"use client";

import { SignInForm } from "@/components/auth/sign-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "reactfire";

export const AuthCard = () => {
  const [isShowingSignUp, setIsShowingSignUp] = useState<boolean>(false);
  const { data: user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [user, router]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Main Card */}
      <div className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-2xl p-6 lg:p-8 shadow-2xl dark:shadow-none">
        
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h2 
            key={isShowingSignUp ? 'signup' : 'signin'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-foreground mb-2"
          >
            {isShowingSignUp ? "Create Account" : "Welcome Back"}
          </motion.h2>
          <motion.p 
            key={isShowingSignUp ? 'signup-desc' : 'signin-desc'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-muted-foreground"
          >
            {isShowingSignUp 
              ? "Join Jack Oliver Development to access exclusive content and projects." 
              : "Sign in to your account to access the platform."
            }
          </motion.p>
        </div>

        {/* Form Content */}
        <motion.div
          key={isShowingSignUp ? 'signup-form' : 'signin-form'}
          initial={{ opacity: 0, x: isShowingSignUp ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isShowingSignUp ? (
            <SignUpForm onShowLogin={() => setIsShowingSignUp(false)} />
          ) : (
            <SignInForm onShowSignUp={() => setIsShowingSignUp(true)} />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
