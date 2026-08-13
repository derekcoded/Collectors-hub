export function CardSkeleton() {
  return (
    <div className="specimen-tag animate-pulse bg-paper-100 p-3">
      <div className="mb-3 aspect-[4/3] w-full bg-ink-800/10" />
      <div className="mb-2 h-3 w-3/4 bg-ink-800/15" />
      <div className="mb-2 h-3 w-1/2 bg-ink-800/10" />
      <div className="h-3 w-1/3 bg-ink-800/10" />
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
