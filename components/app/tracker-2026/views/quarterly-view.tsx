"use client";

export const QuarterlyView = () => {
  return (
    <div className="space-y-6">
      {/* Current Season */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Current Season</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for current 90-day season goals
        </div>
      </section>

      {/* Season Goals */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Season Goals</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for quarterly goals
        </div>
      </section>

      {/* Reflection */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Day 90 Reflection</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for season reflection
        </div>
      </section>
    </div>
  );
};

