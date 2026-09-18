import { INDUSTRIES, type IndustryId } from "@/lib/dashboard/industries";

type DashboardSidebarProps = {
  selectedIndustryId: IndustryId | null;
  onSelectIndustry: (industryId: IndustryId) => void;
};

export function DashboardSidebar({
  selectedIndustryId,
  onSelectIndustry,
}: DashboardSidebarProps) {
  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-amfah-border bg-amfah-black">
      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Industry domains">
        {INDUSTRIES.map((industry) => {
          const isActive = selectedIndustryId === industry.id;

          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => onSelectIndustry(industry.id)}
              className={[
                "rounded-md px-3 py-2.5 text-left text-sm font-medium transition",
                isActive
                  ? "border-l-2 border-amfah-gold bg-amfah-gold/10 text-amfah-gold"
                  : "border-l-2 border-transparent text-amfah-muted hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              {industry.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
