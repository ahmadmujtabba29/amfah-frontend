"use client";

import { SignOutButton } from "@/components/SignOutButton";
import { MenuIcon } from "@/components/dashboard/icons";

type DashboardHeaderProps = {
  title: string;
  onOpenMenu?: () => void;
};

export function DashboardHeader({ title, onOpenMenu }: DashboardHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-amfah-border bg-amfah-surface/80 px-3 sm:h-16 sm:gap-4 sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        {onOpenMenu ? (
          <button
            type="button"
            aria-label="Open industry menu"
            onClick={onOpenMenu}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-amfah-border text-amfah-muted hover:text-white lg:hidden"
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        ) : null}

        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-amfah-gold sm:tracking-[0.22em] sm:text-xs">
            AMFAH ENTERPRISE LAYER
          </p>
          <h1 className="truncate text-sm font-semibold text-white sm:text-lg">
            {title}
          </h1>
        </div>
      </div>

      <SignOutButton />
    </header>
  );
}
