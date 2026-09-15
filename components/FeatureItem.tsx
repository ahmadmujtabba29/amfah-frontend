import type { ReactNode } from "react";

type FeatureItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex max-w-[220px] flex-col items-center gap-2 text-center lg:items-start lg:text-left">
      <span className="text-amfah-gold">{icon}</span>
      <h3 className="text-sm font-semibold leading-snug text-amfah-gold">
        {title}
      </h3>
      <p className="text-xs leading-relaxed text-white/65">{description}</p>
    </div>
  );
}
