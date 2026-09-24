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
import { LogisticsOperatorsPanel } from "@/components/dashboard/logistics/LogisticsOperatorsPanel";
import { LogisticsRoutingPanel } from "@/components/dashboard/logistics/LogisticsRoutingPanel";
import { LogisticsShipmentsPanel } from "@/components/dashboard/logistics/LogisticsShipmentsPanel";
import {
  getAnnualLeakage,
  getIndustryWorkspace,
} from "@/lib/dashboard/industryMockData";

type LogisticsTab = "routing" | "shipments" | "operators" | SecurityTabId;

const TABS: { id: LogisticsTab; label: string }[] = [
  { id: "routing", label: "Routing" },
  { id: "shipments", label: "Shipments" },
  { id: "operators", label: "Operators" },
  ...SECURITY_TABS,
];

export function LogisticsWorkspace() {
  const [activeTab, setActiveTab] = useState<LogisticsTab>("routing");
  const [ownershipActive, setOwnershipActive] = useState(false);
  const annualLeakage = getAnnualLeakage(getIndustryWorkspace("logistics").rows);

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
        ariaLabel="Logistics screens"
      />

      <div className={activeTab === "routing" ? "block" : "hidden"}>
        <LogisticsRoutingPanel />
      </div>
      {activeTab === "shipments" ? <LogisticsShipmentsPanel /> : null}
      {activeTab === "operators" ? <LogisticsOperatorsPanel /> : null}
      {isSecurityTab(activeTab) ? (
        <SecurityModulePanel tab={activeTab} onOwnershipChange={setOwnershipActive} />
      ) : null}
    </WorkspaceFrame>
  );
}
