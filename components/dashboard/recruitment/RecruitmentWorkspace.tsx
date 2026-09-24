"use client";

import { useState } from "react";
import { LeakageAlert } from "@/components/dashboard/LeakageAlert";
import {
  SECURITY_TABS,
  SecurityModulePanel,
  isSecurityTab,
  type SecurityTabId,
} from "@/components/dashboard/SecurityModulePanel";
import {
  WorkspaceFrame,
  WorkspaceTabBar,
} from "@/components/dashboard/WorkspaceTabBar";
import { CandidateMatcher } from "@/components/dashboard/recruitment/CandidateMatcher";
import { CvWarehouse } from "@/components/dashboard/recruitment/CvWarehouse";
import { RecruitmentKanban } from "@/components/dashboard/recruitment/RecruitmentKanban";
import {
  getAnnualLeakage,
  getIndustryWorkspace,
} from "@/lib/dashboard/industryMockData";

type RecruitmentTab = "matcher" | "pipeline" | "warehouse" | SecurityTabId;

const TABS: { id: RecruitmentTab; label: string }[] = [
  { id: "matcher", label: "Analyzer" },
  { id: "pipeline", label: "Kanban" },
  { id: "warehouse", label: "CV Warehouse" },
  ...SECURITY_TABS,
];

export function RecruitmentWorkspace() {
  const [activeTab, setActiveTab] = useState<RecruitmentTab>("matcher");
  const [ownershipActive, setOwnershipActive] = useState(false);
  const annualLeakage = getAnnualLeakage(getIndustryWorkspace("recruitment").rows);

  return (
    <WorkspaceFrame>
      <LeakageAlert
        annualLeakage={annualLeakage}
        resolved={!ownershipActive}
        ownershipActive={ownershipActive}
      />

      <WorkspaceTabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        ariaLabel="Recruitment screens"
      />

      {activeTab === "matcher" ? (
        <CandidateMatcher />
      ) : activeTab === "pipeline" ? (
        <RecruitmentKanban />
      ) : activeTab === "warehouse" ? (
        <CvWarehouse />
      ) : isSecurityTab(activeTab) ? (
        <SecurityModulePanel tab={activeTab} onOwnershipChange={setOwnershipActive} />
      ) : null}
    </WorkspaceFrame>
  );
}
