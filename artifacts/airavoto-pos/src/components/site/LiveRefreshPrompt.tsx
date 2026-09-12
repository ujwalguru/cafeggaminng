import { RefreshCw, X } from "lucide-react";
import { useState } from "react";

export function LiveRefreshPrompt({ visible }: { visible: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  if (!visible || dismissed) return null;
  return (
    <div className="fixed inset-x-0 bottom-4 z-50 mx-auto flex w-[min(92vw,560px)] items-center justify-between gap-3 rounded-xl border border-primary/40 bg-card/95 px-4 py-3 text-sm text-foreground shadow-2xl backdrop-blur">
      <span>New cafe information is available. Please refresh the page every 5 seconds for the most accurate availability details.</span>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={() => window.location.reload()} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground hover:opacity-90">
          <RefreshCw className="size-4" /> Refresh
        </button>
        <button type="button" aria-label="Dismiss" onClick={() => setDismissed(true)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
