"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Github, Chrome } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useAuth } from "reactfire";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const ProviderLoginButtons = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Success",
        description: "Successfully signed in with Google!",
      });
    } catch (error: any) {
      let errorMessage = "Failed to sign in with Google.";
      
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign in was cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Please allow popups and try again.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsGithubLoading(true);
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      toast({
        title: "Success",
        description: "Successfully signed in with GitHub!",
      });
    } catch (error: any) {
      let errorMessage = "Failed to sign in with GitHub.";
      
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign in was cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Please allow popups and try again.";
      } else if (error.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email using a different sign-in method.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      
      {/* Google Sign In */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isGithubLoading}
          variant="outline"
          className="w-full h-12 rounded-xl border-border/50 bg-background/50 hover:bg-background/80 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isGoogleLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
              <span>Connecting to Google...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Chrome className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Continue with Google</span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* GitHub Sign In */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Button
          onClick={handleGithubSignIn}
          disabled={isGoogleLoading || isGithubLoading}
          variant="outline"
          className="w-full h-12 rounded-xl border-border/50 bg-background/50 hover:bg-background/80 transition-all duration-300 transform hover:scale-[1.02]"
        >
          {isGithubLoading ? (
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
              <span>Connecting to GitHub...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-foreground" />
              <span className="font-medium">Continue with GitHub</span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* Security Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="text-center pt-2"
      >
        <p className="text-xs text-muted-foreground">
          Your data is secure and we never store your social media passwords
        </p>
      </motion.div>
    </div>
  );
};
