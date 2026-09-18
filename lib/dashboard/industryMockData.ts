import type { IndustryId } from "@/lib/dashboard/industries";

export type LegacySeatRow = {
  id: string;
  company: string;
  postcode: string;
  phone: string;
  seats: number;
  costPerSeat: number;
};

export type IndustryWorkspaceConfig = {
  syncButtonLabel: string;
  rows: LegacySeatRow[];
};

const LOGISTICS_ROWS: LegacySeatRow[] = [
  {
    id: "1",
    company: "Thames Gateway Freight Ltd",
    postcode: "E16 2AB",
    phone: "020 7946 0182",
    seats: 42,
    costPerSeat: 185,
  },
  {
    id: "2",
    company: "Northern Haulage Group",
    postcode: "M17 1AY",
    phone: "0161 496 0234",
    seats: 28,
    costPerSeat: 175,
  },
  {
    id: "3",
    company: "Celtic Cross Logistics",
    postcode: "CF10 4PA",
    phone: "029 2018 0456",
    seats: 19,
    costPerSeat: 190,
  },
  {
    id: "4",
    company: "Mersey Port Distributors",
    postcode: "L20 1AH",
    phone: "0151 496 0789",
    seats: 35,
    costPerSeat: 180,
  },
  {
    id: "5",
    company: "Highland Cargo Solutions",
    postcode: "G51 4BL",
    phone: "0141 496 0123",
    seats: 14,
    costPerSeat: 195,
  },
  {
    id: "6",
    company: "East Anglia Intermodal",
    postcode: "IP3 0BS",
    phone: "01473 496 145",
    seats: 22,
    costPerSeat: 170,
  },
  {
    id: "7",
    company: "Severn Bridge Transport",
    postcode: "BS11 9DX",
    phone: "0117 496 1678",
    seats: 31,
    costPerSeat: 182,
  },
  {
    id: "8",
    company: "Yorkshire Parcel Network",
    postcode: "LS10 1JQ",
    phone: "0113 496 1890",
    seats: 26,
    costPerSeat: 178,
  },
  {
    id: "9",
    company: "Kent Channel Forwarders",
    postcode: "CT21 4NE",
    phone: "01303 496 201",
    seats: 17,
    costPerSeat: 188,
  },
  {
    id: "10",
    company: "Midlands Hub Warehousing",
    postcode: "B7 4BB",
    phone: "0121 496 2234",
    seats: 38,
    costPerSeat: 176,
  },
  {
    id: "11",
    company: "Solent Maritime Services",
    postcode: "SO14 3QN",
    phone: "023 8212 2456",
    seats: 21,
    costPerSeat: 192,
  },
  {
    id: "12",
    company: "Tyne Tees Freight Co",
    postcode: "NE28 6DE",
    phone: "0191 496 2678",
    seats: 16,
    costPerSeat: 174,
  },
];

const RECRUITMENT_ROWS: LegacySeatRow[] = [
  {
    id: "1",
    company: "Mayfair Talent Partners",
    postcode: "W1J 8AJ",
    phone: "020 7946 3101",
    seats: 48,
    costPerSeat: 210,
  },
  {
    id: "2",
    company: "Northern Staffing Hub",
    postcode: "M1 4PB",
    phone: "0161 496 3202",
    seats: 33,
    costPerSeat: 195,
  },
  {
    id: "3",
    company: "Capital Contract Recruiters",
    postcode: "EC2A 4NE",
    phone: "020 7946 3303",
    seats: 56,
    costPerSeat: 225,
  },
  {
    id: "4",
    company: "Bristol Career Bridge",
    postcode: "BS1 4DJ",
    phone: "0117 496 3404",
    seats: 22,
    costPerSeat: 188,
  },
  {
    id: "5",
    company: "Leeds People Solutions",
    postcode: "LS1 4DY",
    phone: "0113 496 3505",
    seats: 29,
    costPerSeat: 192,
  },
  {
    id: "6",
    company: "Edinburgh Executive Search",
    postcode: "EH2 2PR",
    phone: "0131 496 3606",
    seats: 18,
    costPerSeat: 240,
  },
  {
    id: "7",
    company: "Birmingham Temp Force",
    postcode: "B3 2BJ",
    phone: "0121 496 3707",
    seats: 41,
    costPerSeat: 175,
  },
  {
    id: "8",
    company: "Cambridge STEM Placements",
    postcode: "CB1 2JD",
    phone: "01223 496 380",
    seats: 15,
    costPerSeat: 230,
  },
  {
    id: "9",
    company: "Cardiff Workforce Agency",
    postcode: "CF10 1EP",
    phone: "029 2018 3909",
    seats: 24,
    costPerSeat: 180,
  },
  {
    id: "10",
    company: "Manchester Interim Desk",
    postcode: "M2 3WQ",
    phone: "0161 496 4010",
    seats: 37,
    costPerSeat: 205,
  },
  {
    id: "11",
    company: "Glasgow Hire Collective",
    postcode: "G2 1DY",
    phone: "0141 496 4111",
    seats: 27,
    costPerSeat: 186,
  },
  {
    id: "12",
    company: "Reading Tech Recruiters",
    postcode: "RG1 1AX",
    phone: "0118 496 4212",
    seats: 31,
    costPerSeat: 218,
  },
];

const LEGAL_ROWS: LegacySeatRow[] = [
  {
    id: "1",
    company: "Lincoln's Inn Counsel LLP",
    postcode: "WC2A 3TL",
    phone: "020 7946 5101",
    seats: 64,
    costPerSeat: 265,
  },
  {
    id: "2",
    company: "City Commercial Solicitors",
    postcode: "EC4M 7RB",
    phone: "020 7946 5202",
    seats: 52,
    costPerSeat: 280,
  },
  {
    id: "3",
    company: "Manchester Dispute Chambers",
    postcode: "M3 2WR",
    phone: "0161 496 5303",
    seats: 28,
    costPerSeat: 245,
  },
  {
    id: "4",
    company: "Edinburgh Corporate Law",
    postcode: "EH3 8EX",
    phone: "0131 496 5404",
    seats: 21,
    costPerSeat: 255,
  },
  {
    id: "5",
    company: "Bristol Property Practice",
    postcode: "BS1 6AD",
    phone: "0117 496 5505",
    seats: 19,
    costPerSeat: 235,
  },
  {
    id: "6",
    company: "Leeds Litigation Partners",
    postcode: "LS1 5HD",
    phone: "0113 496 5606",
    seats: 34,
    costPerSeat: 248,
  },
  {
    id: "7",
    company: "Birmingham Corporate Desk",
    postcode: "B4 6AF",
    phone: "0121 496 5707",
    seats: 39,
    costPerSeat: 242,
  },
  {
    id: "8",
    company: "Cambridge IP Advisors",
    postcode: "CB2 1TN",
    phone: "01223 496 580",
    seats: 14,
    costPerSeat: 290,
  },
  {
    id: "9",
    company: "Cardiff Commercial Firm",
    postcode: "CF10 3DQ",
    phone: "029 2018 5909",
    seats: 17,
    costPerSeat: 228,
  },
  {
    id: "10",
    company: "Newcastle Employment Law",
    postcode: "NE1 4ST",
    phone: "0191 496 6010",
    seats: 23,
    costPerSeat: 232,
  },
  {
    id: "11",
    company: "Oxford Regulatory Counsel",
    postcode: "OX1 1BN",
    phone: "01865 496 611",
    seats: 12,
    costPerSeat: 275,
  },
  {
    id: "12",
    company: "Belfast Corporate Solicitors",
    postcode: "BT1 5GE",
    phone: "028 9018 6212",
    seats: 16,
    costPerSeat: 220,
  },
];

const FINANCE_ROWS: LegacySeatRow[] = [
  {
    id: "1",
    company: "Canary Wharf Advisory",
    postcode: "E14 5AB",
    phone: "020 7946 7101",
    seats: 72,
    costPerSeat: 198,
  },
  {
    id: "2",
    company: "City Ledger Partners",
    postcode: "EC2V 7EE",
    phone: "020 7946 7202",
    seats: 58,
    costPerSeat: 205,
  },
  {
    id: "3",
    company: "Manchester Audit Group",
    postcode: "M2 4WQ",
    phone: "0161 496 7303",
    seats: 36,
    costPerSeat: 185,
  },
  {
    id: "4",
    company: "Edinburgh Tax Practice",
    postcode: "EH2 4AN",
    phone: "0131 496 7404",
    seats: 24,
    costPerSeat: 215,
  },
  {
    id: "5",
    company: "Bristol Bookkeeping Hub",
    postcode: "BS1 5TR",
    phone: "0117 496 7505",
    seats: 29,
    costPerSeat: 168,
  },
  {
    id: "6",
    company: "Leeds Corporate Finance",
    postcode: "LS1 2TW",
    phone: "0113 496 7606",
    seats: 31,
    costPerSeat: 190,
  },
  {
    id: "7",
    company: "Birmingham Payroll Desk",
    postcode: "B2 5LG",
    phone: "0121 496 7707",
    seats: 44,
    costPerSeat: 155,
  },
  {
    id: "8",
    company: "Cambridge Growth CFO",
    postcode: "CB1 1AH",
    phone: "01223 496 780",
    seats: 13,
    costPerSeat: 245,
  },
  {
    id: "9",
    company: "Cardiff Compliance Office",
    postcode: "CF10 2GA",
    phone: "029 2018 7909",
    seats: 20,
    costPerSeat: 178,
  },
  {
    id: "10",
    company: "Reading Fund Accounting",
    postcode: "RG1 3EU",
    phone: "0118 496 8010",
    seats: 27,
    costPerSeat: 210,
  },
  {
    id: "11",
    company: "Glasgow Assurance Team",
    postcode: "G1 3DX",
    phone: "0141 496 8111",
    seats: 22,
    costPerSeat: 182,
  },
  {
    id: "12",
    company: "Newcastle Mid-Market Audit",
    postcode: "NE1 5JF",
    phone: "0191 496 8212",
    seats: 18,
    costPerSeat: 175,
  },
];

export const INDUSTRY_WORKSPACES: Record<IndustryId, IndustryWorkspaceConfig> =
  {
    logistics: {
      syncButtonLabel: "Decommission WiseTech CargoWise Seat Licenses",
      rows: LOGISTICS_ROWS,
    },
    recruitment: {
      syncButtonLabel: "Decommission Bullhorn CRM Cloud Architecture",
      rows: RECRUITMENT_ROWS,
    },
    legal: {
      syncButtonLabel: "Decommission Thomson Reuters HighQ Workspace",
      rows: LEGAL_ROWS,
    },
    finance: {
      syncButtonLabel: "Decommission Wolters Kluwer CCH Central Modules",
      rows: FINANCE_ROWS,
    },
  };

export function getIndustryWorkspace(
  industryId: IndustryId,
): IndustryWorkspaceConfig {
  return INDUSTRY_WORKSPACES[industryId];
}

export function getAnnualLeakage(rows: LegacySeatRow[]): number {
  return rows.reduce((total, row) => total + row.seats * row.costPerSeat * 12, 0);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}
