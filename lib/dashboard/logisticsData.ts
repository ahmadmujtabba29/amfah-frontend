export type RoutePoint = {
  city: string;
  postcode: string;
  lat: number;
  lng: number;
};

export type OrderStatus = "Queued" | "Routing" | "Dispatched";

export type DeliveryOrder = {
  id: string;
  company: string;
  origin: RoutePoint;
  destination: RoutePoint;
  status: OrderStatus;
  fuelSavePercent: number;
};

export type CustomsStatus = "Cleared" | "In transit" | "Held";

export type ShipmentRow = {
  id: string;
  company: string;
  postcode: string;
  shipment: string;
  vesselOrFlight: string;
  container: string;
  customs: CustomsStatus;
};

export type OperatorRow = {
  id: string;
  name: string;
  site: string;
  shift: string;
};

export const DELIVERY_ORDERS: DeliveryOrder[] = [
  {
    id: "ord-1",
    company: "Thames Gateway Freight Ltd",
    origin: { city: "London", postcode: "E16 2AB", lat: 51.5074, lng: 0.0235 },
    destination: { city: "Manchester", postcode: "M17 1AY", lat: 53.4631, lng: -2.272 },
    status: "Queued",
    fuelSavePercent: 18,
  },
  {
    id: "ord-2",
    company: "Northern Haulage Group",
    origin: { city: "Manchester", postcode: "M17 1AY", lat: 53.4631, lng: -2.272 },
    destination: { city: "Glasgow", postcode: "G51 4BL", lat: 55.8566, lng: -4.256 },
    status: "Queued",
    fuelSavePercent: 14,
  },
  {
    id: "ord-3",
    company: "Celtic Cross Logistics",
    origin: { city: "Cardiff", postcode: "CF10 4PA", lat: 51.4816, lng: -3.1791 },
    destination: { city: "Birmingham", postcode: "B7 4BB", lat: 52.4862, lng: -1.8904 },
    status: "Queued",
    fuelSavePercent: 11,
  },
  {
    id: "ord-4",
    company: "Mersey Port Distributors",
    origin: { city: "Liverpool", postcode: "L20 1AH", lat: 53.456, lng: -2.991 },
    destination: { city: "Leeds", postcode: "LS10 1JQ", lat: 53.7703, lng: -1.5486 },
    status: "Queued",
    fuelSavePercent: 9,
  },
  {
    id: "ord-5",
    company: "Highland Cargo Solutions",
    origin: { city: "Glasgow", postcode: "G51 4BL", lat: 55.8566, lng: -4.256 },
    destination: { city: "Edinburgh", postcode: "EH6 6QH", lat: 55.9704, lng: -3.1766 },
    status: "Dispatched",
    fuelSavePercent: 8,
  },
  {
    id: "ord-6",
    company: "East Anglia Intermodal",
    origin: { city: "Felixstowe", postcode: "IP11 3SY", lat: 51.9617, lng: 1.3511 },
    destination: { city: "Birmingham", postcode: "B7 4BB", lat: 52.4862, lng: -1.8904 },
    status: "Queued",
    fuelSavePercent: 16,
  },
  {
    id: "ord-7",
    company: "Severn Bridge Transport",
    origin: { city: "Bristol", postcode: "BS11 9DX", lat: 51.501, lng: -2.689 },
    destination: { city: "Cardiff", postcode: "CF10 4PA", lat: 51.4816, lng: -3.1791 },
    status: "Dispatched",
    fuelSavePercent: 6,
  },
  {
    id: "ord-8",
    company: "Yorkshire Parcel Network",
    origin: { city: "Leeds", postcode: "LS10 1JQ", lat: 53.7703, lng: -1.5486 },
    destination: { city: "Newcastle", postcode: "NE28 6DE", lat: 54.987, lng: -1.548 },
    status: "Queued",
    fuelSavePercent: 12,
  },
  {
    id: "ord-9",
    company: "Kent Channel Forwarders",
    origin: { city: "Dover", postcode: "CT16 1HU", lat: 51.1279, lng: 1.3134 },
    destination: { city: "London", postcode: "E16 2AB", lat: 51.5074, lng: 0.0235 },
    status: "Queued",
    fuelSavePercent: 7,
  },
  {
    id: "ord-10",
    company: "Midlands Hub Warehousing",
    origin: { city: "Birmingham", postcode: "B7 4BB", lat: 52.4862, lng: -1.8904 },
    destination: { city: "Liverpool", postcode: "L20 1AH", lat: 53.456, lng: -2.991 },
    status: "Queued",
    fuelSavePercent: 13,
  },
  {
    id: "ord-11",
    company: "Solent Maritime Services",
    origin: { city: "Southampton", postcode: "SO14 3QN", lat: 50.9097, lng: -1.4044 },
    destination: { city: "Bristol", postcode: "BS11 9DX", lat: 51.501, lng: -2.689 },
    status: "Queued",
    fuelSavePercent: 10,
  },
  {
    id: "ord-12",
    company: "Tyne Tees Freight Co",
    origin: { city: "Newcastle", postcode: "NE28 6DE", lat: 54.987, lng: -1.548 },
    destination: { city: "Manchester", postcode: "M17 1AY", lat: 53.4631, lng: -2.272 },
    status: "Queued",
    fuelSavePercent: 15,
  },
];

export const SHIPMENTS: ShipmentRow[] = [
  {
    id: "shp-1",
    company: "Thames Gateway Freight Ltd",
    postcode: "E16 2AB",
    shipment: "SHP058124",
    vesselOrFlight: "MAERSK HOUSTON",
    container: "TRLU 825517 2",
    customs: "Cleared",
  },
  {
    id: "shp-2",
    company: "Northern Haulage Group",
    postcode: "M17 1AY",
    shipment: "SHP058125",
    vesselOrFlight: "OOCL HONG KONG",
    container: "OOLU 912334 4",
    customs: "Cleared",
  },
  {
    id: "shp-3",
    company: "Celtic Cross Logistics",
    postcode: "CF10 4PA",
    shipment: "SHP058126",
    vesselOrFlight: "BA 227L",
    container: "BA227L 13MAY",
    customs: "In transit",
  },
  {
    id: "shp-4",
    company: "Mersey Port Distributors",
    postcode: "L20 1AH",
    shipment: "SHP058127",
    vesselOrFlight: "CMA CGM TANYA",
    container: "CMAU 567890 1",
    customs: "Cleared",
  },
  {
    id: "shp-5",
    company: "Highland Cargo Solutions",
    postcode: "G51 4BL",
    shipment: "SHP058128",
    vesselOrFlight: "EVER LIBERTY",
    container: "EITU 156723 8",
    customs: "In transit",
  },
  {
    id: "shp-6",
    company: "East Anglia Intermodal",
    postcode: "IP3 0BS",
    shipment: "SHP058129",
    vesselOrFlight: "Lufthansa 731",
    container: "LH731 15MAY",
    customs: "Cleared",
  },
  {
    id: "shp-7",
    company: "Severn Bridge Transport",
    postcode: "BS11 9DX",
    shipment: "SHP058130",
    vesselOrFlight: "MSC CHARLESTON",
    container: "MSCU 789012 3",
    customs: "Held",
  },
  {
    id: "shp-8",
    company: "Yorkshire Parcel Network",
    postcode: "LS10 1JQ",
    shipment: "SHP058131",
    vesselOrFlight: "MAERSK HOUSTON",
    container: "MRKU 246811 9",
    customs: "In transit",
  },
  {
    id: "shp-9",
    company: "Kent Channel Forwarders",
    postcode: "CT21 4NE",
    shipment: "SHP058132",
    vesselOrFlight: "BA 229M",
    container: "BA229M 16MAY",
    customs: "Cleared",
  },
  {
    id: "shp-10",
    company: "Midlands Hub Warehousing",
    postcode: "B7 4BB",
    shipment: "SHP058133",
    vesselOrFlight: "CMA CGM TANYA",
    container: "CMAU 678901 2",
    customs: "Held",
  },
  {
    id: "shp-11",
    company: "Solent Maritime Services",
    postcode: "SO14 3QN",
    shipment: "SHP058134",
    vesselOrFlight: "HMM STOCKHOLM",
    container: "HDMU 334455 6",
    customs: "Cleared",
  },
  {
    id: "shp-12",
    company: "Tyne Tees Freight Co",
    postcode: "NE28 6DE",
    shipment: "SHP058135",
    vesselOrFlight: "EVER GOLDEN",
    container: "EGHU 102938 5",
    customs: "In transit",
  },
];

export const OPERATORS: OperatorRow[] = [
  { id: "op-1", name: "James Carter", site: "London Gateway", shift: "06:00 – 14:00" },
  { id: "op-2", name: "Sofia Patel", site: "Birmingham Hub", shift: "14:00 – 22:00" },
  { id: "op-3", name: "Daniel Hughes", site: "Manchester Hub", shift: "22:00 – 06:00" },
  { id: "op-4", name: "Olivia Bennett", site: "London Gateway", shift: "06:00 – 14:00" },
  { id: "op-5", name: "Liam Anderson", site: "Bristol Depot", shift: "14:00 – 22:00" },
  { id: "op-6", name: "Noah Mitchell", site: "Manchester Hub", shift: "22:00 – 06:00" },
  { id: "op-7", name: "Emma Collins", site: "London Gateway", shift: "06:00 – 14:00" },
  { id: "op-8", name: "Lucas Thompson", site: "Birmingham Hub", shift: "14:00 – 22:00" },
  { id: "op-9", name: "Grace Walker", site: "Leeds Depot", shift: "06:00 – 14:00" },
  { id: "op-10", name: "Harry Reid", site: "Glasgow Yard", shift: "14:00 – 22:00" },
  { id: "op-11", name: "Amelia Khan", site: "Felixstowe", shift: "22:00 – 06:00" },
  { id: "op-12", name: "Jack Murray", site: "Newcastle Yard", shift: "06:00 – 14:00" },
];

export const OPERATOR_MIN = 10;
export const OPERATOR_MAX = 1000;
export const OPERATOR_START = 240;
