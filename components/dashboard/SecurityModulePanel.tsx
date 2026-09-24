"use client";

import { VigilAiPanel } from "@/components/dashboard/VigilAiPanel";
import { SoulPrintAiPanel } from "@/components/dashboard/SoulPrintAiPanel";

export type SecurityTabId = "vigil-ai" | "soulprint-ai";

export const SECURITY_TABS: { id: SecurityTabId; label: string }[] = [
  { id: "vigil-ai", label: "Vigil AI" },
  { id: "soulprint-ai", label: "SoulPrint AI" },
];

type SecurityModulePanelProps = {
  tab: SecurityTabId;
  onOwnershipChange?: (active: boolean) => void;
};

export function SecurityModulePanel({
  tab,
  onOwnershipChange,
}: SecurityModulePanelProps) {
  if (tab === "vigil-ai") {
    return <VigilAiPanel onOwnershipChange={onOwnershipChange} />;
  }

  return <SoulPrintAiPanel onOwnershipChange={onOwnershipChange} />;
}

export function isSecurityTab(tab: string): tab is SecurityTabId {
  return tab === "vigil-ai" || tab === "soulprint-ai";
}
