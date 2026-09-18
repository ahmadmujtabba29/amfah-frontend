import { SignOutButton } from "@/components/SignOutButton";

type DashboardHeaderProps = {
  title: string;
};

export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-amfah-border bg-amfah-surface/80 px-4 sm:px-6">
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-amfah-gold sm:text-xs">
          AMFAH ENTERPRISE LAYER
        </p>
        <h1 className="truncate text-base font-semibold text-white sm:text-lg">
          {title}
        </h1>
      </div>

      <SignOutButton />
    </header>
  );
}
