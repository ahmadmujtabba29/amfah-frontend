"use client";

import { useEffect, useRef, useState } from "react";
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
import { ClauseAuditor } from "@/components/dashboard/legal/ClauseAuditor";
import { DocumentVault } from "@/components/dashboard/legal/DocumentVault";
import { TimeAuditTrail } from "@/components/dashboard/legal/TimeAuditTrail";
import {
  getAnnualLeakage,
  getIndustryWorkspace,
} from "@/lib/dashboard/industryMockData";
import {
  GENESIS_HASH,
  TIME_DRAFTS,
  sealChain,
  sealEntry,
  verifyChain,
  type AuditDraft,
  type AuditEntry,
  type VaultFile,
} from "@/lib/dashboard/legalData";

type LegalTab = "vault" | "auditor" | "time" | SecurityTabId;

const TABS: { id: LegalTab; label: string }[] = [
  { id: "vault", label: "Vault" },
  { id: "auditor", label: "Clause Auditor" },
  { id: "time", label: "Time Log" },
  ...SECURITY_TABS,
];

export function LegalWorkspace() {
  const [activeTab, setActiveTab] = useState<LegalTab>("vault");
  const [ownershipActive, setOwnershipActive] = useState(false);
  const [entries, setEntries] = useState<AuditEntry[]>(() =>
    TIME_DRAFTS.map((draft) => ({ ...draft, previousHash: "", hash: "" })),
  );
  const [chainReady, setChainReady] = useState(false);
  const [chainIntact, setChainIntact] = useState<boolean | null>(null);
  const chainRef = useRef<AuditEntry[]>([]);
  const annualLeakage = getAnnualLeakage(getIndustryWorkspace("legal").rows);

  useEffect(() => {
    let cancelled = false;

    void sealChain(TIME_DRAFTS).then((sealed) => {
      if (cancelled) {
        return;
      }

      chainRef.current = sealed;
      setEntries(sealed);
      setChainReady(true);
      setChainIntact(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  async function append(draft: AuditDraft) {
    const previousHash = chainRef.current.at(-1)?.hash ?? GENESIS_HASH;
    const sealed = await sealEntry(previousHash, draft);
    chainRef.current = [...chainRef.current, sealed];
    setEntries(chainRef.current);
    setChainIntact(true);
  }

  function openFile(file: VaultFile) {
    if (!chainReady) {
      return;
    }

    void append({
      id: `tl-${crypto.randomUUID()}`,
      at: new Date().toISOString(),
      actor: file.feeEarner,
      matter: `${file.reference} ${file.title}`,
      kind: "interaction",
      detail: "Opened the encrypted matter file.",
      hours: 0,
    });
  }

  function reviewContract(summary: string) {
    if (!chainReady) {
      return;
    }

    void append({
      id: `tl-${crypto.randomUUID()}`,
      at: new Date().toISOString(),
      actor: "Helena Ward",
      matter: "MA-1042 Project Meridian share purchase agreement",
      kind: "interaction",
      detail: summary,
      hours: 0,
    });
  }

  async function verify() {
    const intact = await verifyChain(chainRef.current);
    setChainIntact(intact);
  }

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
        ariaLabel="Legal screens"
      />

      {activeTab === "vault" ? (
        <DocumentVault onOpenFile={openFile} />
      ) : activeTab === "auditor" ? (
        <ClauseAuditor onReview={reviewContract} />
      ) : activeTab === "time" ? (
        <TimeAuditTrail
          entries={entries}
          chainReady={chainReady}
          chainIntact={chainIntact}
          onLog={(draft) => void append(draft)}
          onVerify={() => void verify()}
        />
      ) : isSecurityTab(activeTab) ? (
        <SecurityModulePanel tab={activeTab} onOwnershipChange={setOwnershipActive} />
      ) : null}
    </WorkspaceFrame>
  );
}
