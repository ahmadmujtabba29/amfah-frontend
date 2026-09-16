import { AlertIcon, CheckCircleIcon } from "@/components/dashboard/icons";
import { formatCurrency } from "@/lib/dashboard/logisticsMockData";

type LeakageAlertProps = {
  annualLeakage: number;
  ownershipActive?: boolean;
};

export function LeakageAlert({
  annualLeakage,
  ownershipActive = false,
}: LeakageAlertProps) {
  if (ownershipActive) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-emerald-500/40 bg-emerald-950/45 px-4 py-4 sm:items-center sm:px-5">
        <span className="mt-0.5 text-emerald-400 sm:mt-0">
          <CheckCircleIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold tracking-wide text-emerald-300 sm:text-base">
            INFRASTRUCTURE PROPERTY: OWNERSHIP ACTIVE
          </p>
          <p className="mt-1 text-xs text-emerald-100/80 sm:text-sm">
            Vigil AI audit confirmed cryptographic integrity. Legacy seat leakage
            of {formatCurrency(annualLeakage)} is now under proprietary control.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-red-500/40 bg-red-950/50 px-4 py-4 sm:items-center sm:px-5">
      <span className="mt-0.5 text-red-400 sm:mt-0">
        <AlertIcon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold tracking-wide text-red-300 sm:text-base">
          SaaS License Fee Capital Leakage
        </p>
        <p className="mt-1 text-xs text-red-200/80 sm:text-sm">
          Est. annual leakage:{" "}
          <span className="font-semibold text-red-100">
            {formatCurrency(annualLeakage)}
          </span>{" "}
          based on current legacy seat footprint.
        </p>
      </div>
    </div>
  );
}
