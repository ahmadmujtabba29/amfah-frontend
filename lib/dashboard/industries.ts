export type IndustryId =
  | "logistics"
  | "recruitment"
  | "legal"
  | "healthcare";

export type Industry = {
  id: IndustryId;
  label: string;
  title: string;
};

export const INDUSTRIES: Industry[] = [
  {
    id: "logistics",
    label: "Logistics",
    title: "Logistics & Distribution",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    title: "Recruitment & Talent Acquisition",
  },
  {
    id: "legal",
    label: "Legal",
    title: "Corporate & Commercial Law",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    title: "Private Healthcare & Clinical Networks",
  },
];

export function getIndustryById(id: IndustryId | null): Industry | null {
  if (!id) {
    return null;
  }

  return INDUSTRIES.find((industry) => industry.id === id) ?? null;
}
