import { LockIcon } from "@/components/dashboard/icons";

export type ModuleTabId = "legacy-sync" | "vigil-ai" | "soulprint-ai";

type ModuleTab = {
  id: ModuleTabId;
  label: string;
};

const TABS: ModuleTab[] = [
  { id: "legacy-sync", label: "Legacy Sync" },
  { id: "vigil-ai", label: "Vigil AI" },
  { id: "soulprint-ai", label: "SoulPrint AI" },
];

type ModuleTabsProps = {
  activeTab: ModuleTabId;
  modulesUnlocked: boolean;
  onTabChange: (tab: ModuleTabId) => void;
};

export function ModuleTabs({
  activeTab,
  modulesUnlocked,
  onTabChange,
}: ModuleTabsProps) {
  return (
    <div className="border-b border-amfah-border">
      <div
        className="amfah-no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
        role="tablist"
        aria-label="Operational modules"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const isLocked = tab.id !== "legacy-sync" && !modulesUnlocked;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={isLocked}
              title={isLocked ? "Complete Legacy Sync to unlock" : undefined}
              onClick={() => {
                if (!isLocked) {
                  onTabChange(tab.id);
                }
              }}
              className={[
                "inline-flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition sm:px-4",
                isActive
                  ? "border-amfah-gold text-amfah-gold"
                  : isLocked
                    ? "cursor-not-allowed border-transparent text-amfah-muted/50"
                    : "border-transparent text-amfah-muted hover:text-white",
              ].join(" ")}
            >
              {isLocked ? <LockIcon className="h-3.5 w-3.5" /> : null}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
