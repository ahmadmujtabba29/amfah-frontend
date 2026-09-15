import { FeatureItem } from "@/components/FeatureItem";
import {
  FingerprintIcon,
  ShieldIcon,
  UserIcon,
} from "@/components/icons";

const features = [
  {
    icon: <ShieldIcon className="h-6 w-6" />,
    title: "Infrastructure Ownership",
    description: "Eliminate legacy license dependency.",
  },
  {
    icon: <FingerprintIcon className="h-6 w-6" />,
    title: "Digital Provenance with Vigil AI",
    description: "Verify authenticity of every digital asset.",
  },
  {
    icon: <UserIcon className="h-6 w-6" />,
    title: "Cognitive Biometrics with SoulPrint AI",
    description: "Continuous human verification & trust.",
  },
];

export function LoginBrandDetails() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-between gap-12 text-center lg:items-start lg:text-left">
      <div className="mx-auto max-w-xl space-y-4 lg:mx-0">
        <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
          Own Your Infrastructure.
          <br />
          Protect What Matters.
        </h2>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-white/70 sm:text-base lg:mx-0">
          Secure UK-sovereign platforms that replace legacy SaaS rent with
          proprietary infrastructure, cryptographic provenance, and continuous
          identity assurance.
        </p>
      </div>

      <div className="grid w-full max-w-3xl justify-items-center gap-8 sm:grid-cols-3 lg:max-w-none lg:justify-items-start">
        {features.map((feature) => (
          <FeatureItem
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
