"use client";

export const WeeklyView = () => {
  return (
    <div className="space-y-6">
      {/* Calendar */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Week View</h2>
        <div className="h-48 flex items-center justify-center text-muted-foreground text-sm border border-dashed border-border/50 rounded">
          Weekly calendar placeholder
        </div>
      </section>

      {/* Sunday Reset */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Sunday Reset</h2>
        <div className="text-muted-foreground text-sm">Placeholder</div>
      </section>

      {/* Weekly Goals */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Weekly Goals</h2>
        <div className="text-muted-foreground text-sm">Placeholder</div>
      </section>

      {/* Wins */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Wins</h2>
        <div className="text-muted-foreground text-sm">Placeholder</div>
      </section>
    </div>
  );
};

