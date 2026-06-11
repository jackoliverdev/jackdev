"use client";

export const ThreeDayView = () => {
  return (
    <div className="space-y-6">
      {/* 3-Day Calendar */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">3-Day View</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 h-32 bg-muted/30 rounded text-center text-sm text-muted-foreground">
            Yesterday
          </div>
          <div className="p-3 h-32 bg-muted/30 rounded text-center text-sm text-muted-foreground border-2 border-blue-500/30">
            Today
          </div>
          <div className="p-3 h-32 bg-muted/30 rounded text-center text-sm text-muted-foreground">
            Tomorrow
          </div>
        </div>
      </section>

      {/* Prep List */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Prep List</h2>
        <div className="text-muted-foreground text-sm">Placeholder</div>
      </section>
    </div>
  );
};

