export default function CaseStudyLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full animate-pulse space-y-10">
      {/* Back link skeleton */}
      <div className="h-4 w-32 bg-muted rounded" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar skeleton (col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-3">
            <div className="h-3 w-28 bg-muted rounded" />
            <div className="h-8 w-full bg-muted rounded-md" />
            <div className="h-8 w-2/3 bg-muted rounded-md" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 flex-1 bg-muted rounded-lg" />
            <div className="h-10 flex-1 bg-muted rounded-lg" />
          </div>
          <div className="h-36 bg-muted rounded-xl" />
        </div>

        {/* Read column skeleton (col-span-8) */}
        <div className="lg:col-span-8 space-y-12 lg:pl-12 lg:border-l border-border/40">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              <div className="h-5 w-48 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-muted rounded" />
                <div className="h-3.5 w-full bg-muted rounded" />
                <div className="h-3.5 w-5/6 bg-muted rounded" />
                <div className="h-3.5 w-2/3 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
