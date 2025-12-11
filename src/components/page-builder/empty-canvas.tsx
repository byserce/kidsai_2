import { Layers } from 'lucide-react';

export function EmptyCanvas() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center text-muted-foreground">
        <div className="rounded-full border-4 border-dashed border-border p-8">
          <Layers className="h-16 w-16" />
        </div>
        <h2 className="font-headline text-2xl font-semibold text-foreground">Empty Canvas</h2>
        <p className="max-w-xs">
          Your page is waiting. Add your first content block from the sidebar on the left to begin.
        </p>
      </div>
    </div>
  );
}
