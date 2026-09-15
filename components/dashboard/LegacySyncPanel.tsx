import { Button } from "@/components/Button";
import {
  formatCurrency,
  type LegacySeatRow,
} from "@/lib/dashboard/logisticsMockData";

export type SyncPhase = "idle" | "running" | "complete";

type LegacySyncPanelProps = {
  syncButtonLabel: string;
  rows: LegacySeatRow[];
  syncPhase: SyncPhase;
  progressMessage: string | null;
  progressPercent: number;
  onSync: () => void;
};

export function LegacySyncPanel({
  syncButtonLabel,
  rows,
  syncPhase,
  progressMessage,
  progressPercent,
  onSync,
}: LegacySyncPanelProps) {
  const isRunning = syncPhase === "running";
  const isComplete = syncPhase === "complete";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]">
      <section className="rounded-lg border border-amfah-border bg-amfah-card p-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
          DISRUPTION INGESTION CONTROL
        </p>
        <h2 className="mt-2 text-lg font-semibold text-white">
          Legacy Integration Sync
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-amfah-muted">
          Trigger a non-invasive transition away from third-party seat licenses
          without operational downtime.
        </p>

        <Button
          type="button"
          fullWidth
          className="mt-6 text-xs sm:text-sm"
          onClick={onSync}
          disabled={isRunning || isComplete}
        >
          {isRunning
            ? "SYNCING..."
            : isComplete
              ? "SYNC COMPLETE"
              : syncButtonLabel}
        </Button>

        <div
          className={[
            "mt-5 rounded-md border px-3 py-4",
            isComplete
              ? "border-emerald-500/40 bg-emerald-950/40"
              : isRunning
                ? "border-amfah-gold/40 bg-amfah-gold/5"
                : "border-dashed border-amfah-border bg-amfah-surface/60",
          ].join(" ")}
        >
          {isRunning ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-amfah-gold">
                  {progressMessage}
                </p>
                <span className="text-xs font-medium text-amfah-muted">
                  {progressPercent}%
                </span>
              </div>
              <div
                className="h-1.5 overflow-hidden rounded-full bg-amfah-border"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressPercent}
              >
                <div
                  className="h-full rounded-full bg-amfah-gold transition-[width] duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : isComplete ? (
            <p className="text-xs font-semibold tracking-wide text-emerald-300">
              CORE INFRASTRUCTURE: PROPRIETARY REFACTOR COMPLETE
            </p>
          ) : (
            <p className="text-xs text-amfah-muted">
              Sync status will appear here after the action is triggered.
            </p>
          )}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
        <div className="border-b border-amfah-border px-4 py-3 sm:px-5">
          <h2 className="text-sm font-semibold text-white sm:text-base">
            Legacy Seat Footprint
          </h2>
          <p className="mt-1 text-xs text-amfah-muted">
            Current licensed seats draining OpEx across the network.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-amfah-surface text-xs uppercase tracking-wider text-amfah-muted">
              <tr>
                <th className="px-4 py-3 font-medium sm:px-5">Company</th>
                <th className="px-4 py-3 font-medium sm:px-5">Postcode</th>
                <th className="px-4 py-3 font-medium sm:px-5">Seats</th>
                <th className="px-4 py-3 font-medium sm:px-5">£/Seat</th>
                <th className="px-4 py-3 font-medium sm:px-5">Annual Cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const annualCost = row.seats * row.costPerSeat * 12;

                return (
                  <tr
                    key={row.id}
                    className="border-t border-amfah-border/80 text-white/90"
                  >
                    <td className="px-4 py-3 sm:px-5">{row.company}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-amfah-muted sm:px-5">
                      {row.postcode}
                    </td>
                    <td className="px-4 py-3 sm:px-5">{row.seats}</td>
                    <td className="px-4 py-3 whitespace-nowrap sm:px-5">
                      {formatCurrency(row.costPerSeat)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-red-300/90 sm:px-5">
                      {formatCurrency(annualCost)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
