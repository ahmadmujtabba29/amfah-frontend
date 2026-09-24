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
import { ClinicianRegistry } from "@/components/dashboard/healthcare/ClinicianRegistry";
import { ClinicNavigator } from "@/components/dashboard/healthcare/ClinicNavigator";
import { RecordsPortal } from "@/components/dashboard/healthcare/RecordsPortal";
import {
  getAnnualLeakage,
  getIndustryWorkspace,
} from "@/lib/dashboard/industryMockData";

type HealthcareTab = "records" | "clinics" | "clinicians" | SecurityTabId;

const TABS: { id: HealthcareTab; label: string }[] = [
  { id: "records", label: "Records" },
  { id: "clinics", label: "Clinics" },
  { id: "clinicians", label: "Clinicians" },
  ...SECURITY_TABS,
];

export function HealthcareWorkspace() {
  const [activeTab, setActiveTab] = useState<HealthcareTab>("records");
  const [ownershipActive, setOwnershipActive] = useState(false);
  const annualLeakage = getAnnualLeakage(getIndustryWorkspace("healthcare").rows);

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
        ariaLabel="Healthcare screens"
      />

      {activeTab === "records" ? (
        <RecordsPortal />
      ) : activeTab === "clinics" ? (
        <ClinicNavigator />
      ) : activeTab === "clinicians" ? (
        <ClinicianRegistry />
      ) : isSecurityTab(activeTab) ? (
        <SecurityModulePanel tab={activeTab} onOwnershipChange={setOwnershipActive} />
      ) : null}
    </WorkspaceFrame>
  );
}
