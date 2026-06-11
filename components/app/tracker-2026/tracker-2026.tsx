"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { YearlyView } from "./views/yearly-view";
import { QuarterlyView } from "./views/quarterly-view";
import { MonthlyView } from "./views/monthly-view";
import { WeeklyView } from "./views/weekly-view";
import { ThreeDayView } from "./views/three-day-view";
import { DailyView } from "./views/daily-view";

type ViewType = "yearly" | "quarterly" | "monthly" | "weekly" | "3day" | "daily";

const views: { id: ViewType; label: string }[] = [
  { id: "yearly", label: "Yearly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "monthly", label: "Monthly" },
  { id: "weekly", label: "Weekly" },
  { id: "3day", label: "3 Days" },
  { id: "daily", label: "Daily" },
];

export const Tracker2026 = () => {
  const [activeView, setActiveView] = useState<ViewType>("yearly");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">2026</h1>
        <p className="text-muted-foreground">Theme: Scale</p>
      </div>

      {/* View Switcher */}
      <div className="flex gap-1 p-1 bg-muted/50 rounded-lg w-fit">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-md transition-all",
              activeView === view.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* View Content */}
      <motion.div
        key={activeView}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeView === "yearly" && <YearlyView />}
        {activeView === "quarterly" && <QuarterlyView />}
        {activeView === "monthly" && <MonthlyView />}
        {activeView === "weekly" && <WeeklyView />}
        {activeView === "3day" && <ThreeDayView />}
        {activeView === "daily" && <DailyView />}
      </motion.div>
    </div>
  );
};

