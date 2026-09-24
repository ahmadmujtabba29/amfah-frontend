"use client";

import type { ReactNode } from "react";

type TabItem<T extends string> = {
  id: T;
  label: string;
};

type WorkspaceTabBarProps<T extends string> = {
  tabs: TabItem<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  ariaLabel: string;
};

export function WorkspaceTabBar<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel,
}: WorkspaceTabBarProps<T>) {
  return (
    <div className="border-b border-amfah-border">
      <div
        className="amfah-no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
        role="tablist"
        aria-label={ariaLabel}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={[
                "shrink-0 border-b-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition sm:px-4",
                isActive
                  ? "border-amfah-gold text-amfah-gold"
                  : "border-transparent text-amfah-muted hover:text-white",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type WorkspaceFrameProps = {
  children: ReactNode;
};

export function WorkspaceFrame({ children }: WorkspaceFrameProps) {
  return <div className="mx-auto w-full max-w-7xl space-y-4 sm:space-y-5">{children}</div>;
}
