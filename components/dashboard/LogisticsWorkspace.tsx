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
import {
  getAnnualLeakage,
  LOGISTICS_LEGACY_ROWS,
  LOGISTICS_SYNC_BUTTON_LABEL,
} from "@/lib/dashboard/logisticsMockData";

const SYNC_MESSAGES = [
  "Interposing Hardware Layer...",
  "Hooking API Schemas...",
  "Ingesting Legacy Payloads...",
] as const;

const MESSAGE_INTERVAL_MS = 1000;
const SYNC_DURATION_MS = 3000;

export function LogisticsWorkspace() {
  const annualLeakage = getAnnualLeakage(LOGISTICS_LEGACY_ROWS);
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
    setProgressPercent(
      Math.round(((0 + 1) / SYNC_MESSAGES.length) * 100),
    );

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
          syncButtonLabel={LOGISTICS_SYNC_BUTTON_LABEL}
          rows={LOGISTICS_LEGACY_ROWS}
          syncPhase={syncPhase}
          progressMessage={progressMessage}
          progressPercent={progressPercent}
          onSync={handleSync}
        />
      ) : activeTab === "vigil-ai" ? (
        <VigilAiPanel onOwnershipChange={setOwnershipActive} />
      ) : (
        <SoulPrintAiPanel />
      )}
    </div>
  );
}
