"use client";

import { useEffect, useRef, useState } from "react";
import { LeakageAlert } from "@/components/dashboard/LeakageAlert";
import {
  LegacySyncPanel,
  type SyncPhase,
} from "@/components/dashboard/LegacySyncPanel";
import {
  ModuleTabs,
  type ModuleTabId,
} from "@/components/dashboard/ModuleTabs";
import { SoulPrintAiPanel } from "@/components/dashboard/SoulPrintAiPanel";
import { VigilAiPanel } from "@/components/dashboard/VigilAiPanel";
import type { IndustryId } from "@/lib/dashboard/industries";
import {
  getAnnualLeakage,
  getIndustryWorkspace,
} from "@/lib/dashboard/industryMockData";

const SYNC_MESSAGES = [
  "Interposing Hardware Layer...",
  "Hooking API Schemas...",
  "Ingesting Legacy Payloads...",
] as const;

const MESSAGE_INTERVAL_MS = 1000;
const SYNC_DURATION_MS = 3000;

type IndustryWorkspaceProps = {
  industryId: IndustryId;
};

export function IndustryWorkspace({ industryId }: IndustryWorkspaceProps) {
  const workspace = getIndustryWorkspace(industryId);
  const annualLeakage = getAnnualLeakage(workspace.rows);

  const [activeTab, setActiveTab] = useState<ModuleTabId>("legacy-sync");
  const [syncPhase, setSyncPhase] = useState<SyncPhase>("idle");
  const [progressMessage, setProgressMessage] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [modulesUnlocked, setModulesUnlocked] = useState(false);
  const [ownershipActive, setOwnershipActive] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
    setActiveTab("legacy-sync");
    setSyncPhase("idle");
    setProgressMessage(null);
    setProgressPercent(0);
    setModulesUnlocked(false);
    setOwnershipActive(false);
  }, [industryId]);

  function clearScheduledTimers() {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  }

  function handleSync() {
    if (syncPhase !== "idle") {
      return;
    }

    clearScheduledTimers();
    setSyncPhase("running");
    setProgressMessage(SYNC_MESSAGES[0]);
    setProgressPercent(Math.round((1 / SYNC_MESSAGES.length) * 100));

    SYNC_MESSAGES.forEach((message, index) => {
      if (index === 0) {
        return;
      }

      const timerId = window.setTimeout(() => {
        setProgressMessage(message);
        setProgressPercent(
          Math.round(((index + 1) / SYNC_MESSAGES.length) * 100),
        );
      }, index * MESSAGE_INTERVAL_MS);

      timersRef.current.push(timerId);
    });

    const completeTimerId = window.setTimeout(() => {
      setProgressPercent(100);
      setSyncPhase("complete");
      setProgressMessage(null);
      setModulesUnlocked(true);
    }, SYNC_DURATION_MS);

    timersRef.current.push(completeTimerId);
  }

  return (
    <div className="space-y-5">
      <LeakageAlert
        annualLeakage={annualLeakage}
        ownershipActive={ownershipActive}
      />

      <ModuleTabs
        activeTab={activeTab}
        modulesUnlocked={modulesUnlocked}
        onTabChange={setActiveTab}
      />

      {activeTab === "legacy-sync" ? (
        <LegacySyncPanel
          syncButtonLabel={workspace.syncButtonLabel}
          rows={workspace.rows}
          syncPhase={syncPhase}
          progressMessage={progressMessage}
          progressPercent={progressPercent}
          onSync={handleSync}
        />
      ) : activeTab === "vigil-ai" ? (
        <VigilAiPanel onOwnershipChange={setOwnershipActive} />
      ) : (
        <SoulPrintAiPanel onOwnershipChange={setOwnershipActive} />
      )}
    </div>
  );
}
