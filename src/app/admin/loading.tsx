import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function AdminLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-24 bg-muted rounded-md" />
        <div className="h-8 w-64 bg-muted rounded-md" />
        <div className="h-4 w-96 bg-muted rounded-md" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="h-3 w-32 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="h-8 w-20 bg-muted rounded-md" />
              <div className="h-3 w-40 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Columns Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="h-4 w-48 bg-muted rounded" />
          <div className="border border-border rounded-xl bg-card p-5 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-border/40 last:border-b-0">
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-32 bg-muted rounded" />
                  <div className="h-3 w-44 bg-muted rounded" />
                </div>
                <div className="h-5 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="h-4 w-36 bg-muted rounded" />
          <div className="border border-border rounded-xl bg-card p-5 space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-2 py-2">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-muted rounded" />
                  <div className="h-3 w-16 bg-muted rounded" />
                </div>
                <div className="h-3.5 w-full bg-muted rounded" />
                <div className="h-3.5 w-3/4 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
