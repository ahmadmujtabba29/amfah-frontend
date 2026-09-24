"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { IndustryWorkspace } from "@/components/dashboard/IndustryWorkspace";
import {
  getIndustryById,
  type IndustryId,
} from "@/lib/dashboard/industries";

const DEFAULT_TITLE = "Select a domain";

export function DashboardShell() {
  const [selectedIndustryId, setSelectedIndustryId] =
    useState<IndustryId | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedIndustry = getIndustryById(selectedIndustryId);
  const headerTitle = selectedIndustry?.title ?? DEFAULT_TITLE;

  return (
    <div className="flex min-h-dvh overflow-x-hidden bg-amfah-black text-white">
      <DashboardSidebar
        selectedIndustryId={selectedIndustryId}
        onSelectIndustry={setSelectedIndustryId}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          title={headerTitle}
          onOpenMenu={() => setMobileMenuOpen(true)}
        />

        <main className="amfah-scroll flex-1 overflow-y-auto overflow-x-hidden bg-amfah-black p-3 sm:p-5 lg:p-6">
          {!selectedIndustryId ? (
            <div className="flex h-full min-h-[240px] items-center justify-center rounded-lg border border-dashed border-amfah-border px-4 text-center sm:min-h-[280px]">
              <p className="max-w-sm text-sm text-amfah-muted">
                Select a domain from the menu to open the workspace.
              </p>
            </div>
          ) : (
            <IndustryWorkspace industryId={selectedIndustryId} />
          )}
        </main>
      </div>
    </div>
  );
}
