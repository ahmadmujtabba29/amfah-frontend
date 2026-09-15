export type LegacySeatRow = {
  id: string;
  company: string;
  postcode: string;
  seats: number;
  costPerSeat: number;
};

export const LOGISTICS_LEGACY_ROWS: LegacySeatRow[] = [
  {
    id: "1",
    company: "Thames Gateway Freight Ltd",
    postcode: "E16 2AB",
    seats: 42,
    costPerSeat: 185,
  },
  {
    id: "2",
    company: "Northern Haulage Group",
    postcode: "M17 1AY",
    seats: 28,
    costPerSeat: 175,
  },
  {
    id: "3",
    company: "Celtic Cross Logistics",
    postcode: "CF10 4PA",
    seats: 19,
    costPerSeat: 190,
  },
  {
    id: "4",
    company: "Mersey Port Distributors",
    postcode: "L20 1AH",
    seats: 35,
    costPerSeat: 180,
  },
  {
    id: "5",
    company: "Highland Cargo Solutions",
    postcode: "G51 4BL",
    seats: 14,
    costPerSeat: 195,
  },
  {
    id: "6",
    company: "East Anglia Intermodal",
    postcode: "IP3 0BS",
    seats: 22,
    costPerSeat: 170,
  },
  {
    id: "7",
    company: "Severn Bridge Transport",
    postcode: "BS11 9DX",
    seats: 31,
    costPerSeat: 182,
  },
  {
    id: "8",
    company: "Yorkshire Parcel Network",
    postcode: "LS10 1JQ",
    seats: 26,
    costPerSeat: 178,
  },
  {
    id: "9",
    company: "Kent Channel Forwarders",
    postcode: "CT21 4NE",
    seats: 17,
    costPerSeat: 188,
  },
  {
    id: "10",
    company: "Midlands Hub Warehousing",
    postcode: "B7 4BB",
    seats: 38,
    costPerSeat: 176,
  },
  {
    id: "11",
    company: "Solent Maritime Services",
    postcode: "SO14 3QN",
    seats: 21,
    costPerSeat: 192,
  },
  {
    id: "12",
    company: "Tyne Tees Freight Co",
    postcode: "NE28 6DE",
    seats: 16,
    costPerSeat: 174,
  },
];

export const LOGISTICS_SYNC_BUTTON_LABEL =
  "Decommission WiseTech CargoWise Seat Licenses";

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
