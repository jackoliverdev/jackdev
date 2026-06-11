"use client";

export const YearlyView = () => {
  return (
    <div className="space-y-6">
      {/* Resolutions */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Resolutions</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for 3 resolutions
        </div>
      </section>

      {/* Seasons */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">90-Day Seasons</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-muted/30 rounded">S1: Jan-Mar</div>
          <div className="p-3 bg-muted/30 rounded">S2: Apr-Jun</div>
          <div className="p-3 bg-muted/30 rounded">S3: Jul-Sep</div>
          <div className="p-3 bg-muted/30 rounded">S4: Oct-Dec</div>
        </div>
      </section>

      {/* Mantras */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Mantras</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for mantras
        </div>
      </section>

      {/* Goals */}
      <section className="p-4 border border-border/50 rounded-lg">
        <h2 className="font-semibold mb-3">Goals</h2>
        <div className="text-muted-foreground text-sm">
          Placeholder for yearly goals
        </div>
      </section>
    </div>
  );
};

