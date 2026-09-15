"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LogisticsWorkspace } from "@/components/dashboard/LogisticsWorkspace";
import {
  getIndustryById,
  type IndustryId,
} from "@/lib/dashboard/industries";

const DEFAULT_TITLE = "Select a domain";

export function DashboardShell() {
  const [selectedIndustryId, setSelectedIndustryId] =
    useState<IndustryId | null>(null);

  const selectedIndustry = getIndustryById(selectedIndustryId);
  const headerTitle = selectedIndustry?.title ?? DEFAULT_TITLE;

  return (
    <div className="flex min-h-dvh bg-amfah-black text-white">
      <DashboardSidebar
        selectedIndustryId={selectedIndustryId}
        onSelectIndustry={setSelectedIndustryId}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader title={headerTitle} />

        <main className="flex-1 overflow-y-auto bg-amfah-black p-4 sm:p-6">
          {!selectedIndustryId ? (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg border border-dashed border-amfah-border">
              <p className="text-sm text-amfah-muted">
                Select a domain from the sidebar to open the workspace.
              </p>
            </div>
          ) : selectedIndustryId === "logistics" ? (
            <LogisticsWorkspace />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center rounded-lg border border-dashed border-amfah-border">
              <p className="text-sm text-amfah-muted">
                {selectedIndustry?.title} workspace UI will be added next.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
