import type { RoutePoint } from "@/lib/dashboard/logisticsData";

export type MapPoint = {
  x: number;
  y: number;
};

export type LocalCorridor = {
  efficient: MapPoint[];
  longer: MapPoint[];
  fuelSavePercent: number;
  efficientKm: number;
  longerKm: number;
};

const VIEW_W = 1080;
const VIEW_H = 680;
const PAD = 140;

function haversineKm(from: RoutePoint, to: RoutePoint): number {
  const earthKm = 6371;
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);
  const lat1 = toRad(from.lat);
  const lat2 = toRad(to.lat);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * earthKm * Math.asin(Math.sqrt(a));
}

function pathLength(points: MapPoint[]): number {
  return points.slice(1).reduce((total, point, index) => {
    const previous = points[index];
    return total + Math.hypot(point.x - previous.x, point.y - previous.y);
  }, 0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function buildLocalCorridor(
  origin: RoutePoint,
  destination: RoutePoint,
): LocalCorridor {
  const latSpan = Math.max(Math.abs(destination.lat - origin.lat), 0.4);
  const lngSpan = Math.max(Math.abs(destination.lng - origin.lng), 0.5);
  const midLat = (origin.lat + destination.lat) / 2;
  const midLng = (origin.lng + destination.lng) / 2;
  const minLat = midLat - latSpan / 2;
  const maxLat = midLat + latSpan / 2;
  const minLng = midLng - lngSpan / 2;
  const maxLng = midLng + lngSpan / 2;

  const project = (lat: number, lng: number): MapPoint => ({
    x: PAD + ((lng - minLng) / (maxLng - minLng)) * (VIEW_W - PAD * 2),
    y: PAD + ((maxLat - lat) / (maxLat - minLat)) * (VIEW_H - PAD * 2),
  });

  const start = project(origin.lat, origin.lng);
  const end = project(destination.lat, destination.lng);
  const offset = start.y < end.y ? 150 : -150;
  const side = end.x >= start.x ? 130 : -130;
  const bendY = clamp(start.y + offset, 90, VIEW_H - 90);
  const bendX = clamp(end.x + side, 90, VIEW_W - 90);

  const eastThenNorth: MapPoint[] = [start, { x: end.x, y: start.y }, end];
  const northThenEast: MapPoint[] = [start, { x: start.x, y: end.y }, end];
  const detour: MapPoint[] = [
    start,
    { x: start.x, y: bendY },
    { x: bendX, y: bendY },
    { x: bendX, y: end.y },
    end,
  ];

  const ranked = [eastThenNorth, northThenEast, detour]
    .map((path) => ({ path, length: pathLength(path) }))
    .sort((left, right) => left.length - right.length);

  const efficient = ranked[0];
  const longer = ranked[ranked.length - 1];
  const fuelSavePercent = Math.max(
    4,
    Math.round(((longer.length - efficient.length) / longer.length) * 100),
  );
  const roadKm = haversineKm(origin, destination) * 1.16;

  return {
    efficient: efficient.path,
    longer: longer.path,
    fuelSavePercent,
    efficientKm: roadKm,
    longerKm: roadKm / (1 - fuelSavePercent / 100),
  };
}
