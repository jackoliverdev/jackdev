"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const DashboardContent = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your application.
        </p>
      </motion.div>

      {/* Placeholder Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Activity Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed border-border/50 rounded-lg">
              <div className="text-center space-y-2">
                <Activity className="w-10 h-10 text-muted-foreground/50 mx-auto" />
                <p className="text-muted-foreground">
                  Dashboard placeholder - add your content here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

