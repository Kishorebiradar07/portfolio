export default function DashboardLoading() {
  return (
    <div className="min-h-screen w-full bg-background animate-pulse">
      {/* Hero shimmer */}
      <div className="border-b border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="h-4 w-48 bg-muted rounded-full" />
          <div className="h-10 w-80 bg-muted rounded-xl" />
          <div className="h-4 w-full max-w-xl bg-muted rounded-full" />
          <div className="grid grid-cols-4 gap-4 pt-6 border-t border-border/60">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-1">
                <div className="h-8 w-16 bg-muted rounded-lg" />
                <div className="h-3 w-24 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Body shimmer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
        <div className="h-32 w-full bg-muted/50 rounded-2xl" />
        <div className="grid grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-52 bg-muted/50 rounded-2xl" />
          ))}
        </div>
        <div className="h-64 w-full bg-muted/50 rounded-2xl" />
      </div>
    </div>
  );
}
