"use client";

import { INDUSTRIES, type IndustryId } from "@/lib/dashboard/industries";
import { CloseIcon } from "@/components/dashboard/icons";

type DashboardSidebarProps = {
  selectedIndustryId: IndustryId | null;
  onSelectIndustry: (industryId: IndustryId) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

export function DashboardSidebar({
  selectedIndustryId,
  onSelectIndustry,
  mobileOpen = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  function selectIndustry(industryId: IndustryId) {
    onSelectIndustry(industryId);
    onCloseMobile?.();
  }

  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close industry menu"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-[min(18rem,86vw)] flex-col border-r border-amfah-border bg-amfah-black transition-transform duration-200 lg:static lg:z-auto lg:w-56 lg:translate-x-0 lg:shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
      >
        <div className="flex h-16 items-center justify-between border-b border-amfah-border px-4 lg:hidden">
          <p className="text-xs font-semibold tracking-[0.18em] text-amfah-gold">
            DOMAINS
          </p>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onCloseMobile}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-amfah-border text-amfah-muted hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        <nav
          className="amfah-scroll flex flex-1 flex-col gap-1 overflow-y-auto p-3"
          aria-label="Industry domains"
        >
          {INDUSTRIES.map((industry) => {
            const isActive = selectedIndustryId === industry.id;

            return (
              <button
                key={industry.id}
                type="button"
                onClick={() => selectIndustry(industry.id)}
                className={[
                  "rounded-md px-3 py-2.5 text-left text-sm font-medium transition",
                  isActive
                    ? "border-l-2 border-amfah-gold bg-amfah-gold/10 text-amfah-gold"
                    : "border-l-2 border-transparent text-amfah-muted hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {industry.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
