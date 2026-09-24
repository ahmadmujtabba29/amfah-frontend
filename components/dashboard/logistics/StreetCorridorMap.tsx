"use client";

import { useEffect, useMemo, useState } from "react";

type Point = { x: number; y: number };

const ROUTES: Point[][] = [
  [
    { x: 176, y: 458 },
    { x: 322, y: 458 },
    { x: 322, y: 334 },
    { x: 554, y: 334 },
    { x: 554, y: 214 },
    { x: 788, y: 214 },
    { x: 788, y: 104 },
    { x: 944, y: 104 },
  ],
  [
    { x: 248, y: 518 },
    { x: 248, y: 396 },
    { x: 476, y: 396 },
    { x: 476, y: 272 },
    { x: 710, y: 272 },
    { x: 710, y: 158 },
    { x: 944, y: 158 },
  ],
  [
    { x: 108, y: 396 },
    { x: 398, y: 396 },
    { x: 398, y: 518 },
    { x: 632, y: 518 },
    { x: 632, y: 334 },
    { x: 866, y: 334 },
    { x: 866, y: 158 },
    { x: 1024, y: 158 },
  ],
  [
    { x: 176, y: 214 },
    { x: 476, y: 214 },
    { x: 476, y: 396 },
    { x: 710, y: 396 },
    { x: 710, y: 518 },
    { x: 944, y: 518 },
  ],
];

type StreetCorridorMapProps = {
  orderId: string;
  originCity: string;
  destinationCity: string;
  originPostcode: string;
  destinationPostcode: string;
};

function hashSeed(value: string): number {
  return value.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
}

function toPath(points: Point[]): string {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

function travel(points: Point[], progress: number): { x: number; y: number; angle: number } {
  const lengths: number[] = [];
  let total = 0;

  for (let index = 1; index < points.length; index += 1) {
    const length = Math.hypot(
      points[index].x - points[index - 1].x,
      points[index].y - points[index - 1].y,
    );
    lengths.push(length);
    total += length;
  }

  let remaining = Math.min(1, Math.max(0, progress)) * total;

  for (let index = 0; index < lengths.length; index += 1) {
    const length = lengths[index];
    const start = points[index];
    const end = points[index + 1];

    if (remaining <= length || index === lengths.length - 1) {
      const ratio = length === 0 ? 0 : Math.min(1, remaining / length);
      return {
        x: start.x + (end.x - start.x) * ratio,
        y: start.y + (end.y - start.y) * ratio,
        angle: (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI,
      };
    }

    remaining -= length;
  }

  const last = points[points.length - 1];
  return { x: last.x, y: last.y, angle: 0 };
}

export function StreetCorridorMap({
  orderId,
  originCity,
  destinationCity,
  originPostcode,
  destinationPostcode,
}: StreetCorridorMapProps) {
  const route = ROUTES[hashSeed(orderId) % ROUTES.length];
  const routePath = useMemo(() => toPath(route), [route]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const started = performance.now();
    const duration = 3600;

    const tick = (now: number) => {
      const next = Math.min(1, (now - started) / duration);
      setProgress(1 - (1 - next) ** 2);

      if (next < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    setProgress(0);
    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [orderId]);

  const vehicle = travel(route, progress);
  const start = route[0];
  const end = route[route.length - 1];

  return (
    <div key={orderId} className="amfah-street-focus relative h-full min-h-[360px] w-full overflow-hidden bg-[#111111]">
      <svg viewBox="0 0 1080 680" className="h-full w-full" role="img" aria-label={`Street corridor from ${originCity} to ${destinationCity}`}>
        <rect width="1080" height="680" fill="#111111" />

        <path d="M0 0 H1080 V92 C860 70 760 118 620 96 C470 72 390 28 240 48 C120 64 60 40 0 58 Z" fill="#161616" />
        <path d="M0 58 C70 42 130 78 240 60 C400 38 480 92 640 108 C820 126 920 78 1080 96 V128 C900 108 800 150 640 132 C480 114 390 70 230 88 C120 102 50 78 0 96 Z" fill="#1a2330" />
        <text x="690" y="78" fill="#6d7c8a" fontSize="13" letterSpacing="2">
          DOCK BASIN
        </text>

        <rect x="500" y="230" width="150" height="100" rx="8" fill="#1a2820" />
        <text x="528" y="286" fill="#7d977f" fontSize="12" letterSpacing="1.4">
          PARK
        </text>
        <rect x="150" y="470" width="130" height="78" rx="8" fill="#1a2820" />

        <StreetLabel x="118" y="148" text="Dock Rd" />
        <StreetLabel x="250" y="206" text="Wharf St" />
        <StreetLabel x="420" y="264" text="Canal Way" />
        <StreetLabel x="640" y="326" text="Port St" />
        <StreetLabel x="800" y="388" text="Haul Ln" />
        <StreetLabel x="200" y="450" text="Quay Approach" />
        <StreetLabel x="720" y="510" text="Bond St" />
        <StreetLabel x="130" y="322" text="Mill Ln" rotate={-90} />
        <StreetLabel x="340" y="250" text="Pier Rd" rotate={-90} />
        <StreetLabel x="790" y="210" text="Albert Rd" rotate={-90} />

        <AreaLabel x="120" y="250" text="WHARF QUARTER" />
        <AreaLabel x="250" y="560" text="PORT EAST" />
        <AreaLabel x="700" y="180" text="DOCKLANDS" />
        <AreaLabel x="760" y="430" text="CUSTOMS YARD" />

        <Poi x="410" y="200" name="Freight Gate" />
        <Poi x="690" y="470" name="Bonded Yard" />
        <Poi x="250" y="360" name="Haul Office" />

        <path d={routePath} fill="none" stroke="#6a5820" strokeWidth="10" strokeLinejoin="round" strokeLinecap="round" />
        <path
          d={routePath}
          fill="none"
          stroke="#c9a227"
          strokeWidth="5"
          strokeLinejoin="round"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          strokeDashoffset={100 - progress * 100}
        />

        <circle cx={start.x} cy={start.y} r="9" fill="#f5f5f5" />
        <circle cx={start.x} cy={start.y} r="4" fill="#111111" />
        <text x={start.x + 14} y={start.y - 10} fill="#f5f5f5" fontSize="13">
          {originCity}
        </text>
        <text x={start.x + 14} y={start.y + 6} fill="#9a9a9a" fontSize="11">
          {originPostcode}
        </text>

        <g transform={`translate(${end.x} ${end.y - 28})`}>
          <path d="M0 28 C0 14 12 0 12 0 C12 0 24 14 24 28 C24 36 18 40 12 40 C6 40 0 36 0 28 Z" fill="#c9a227" />
          <circle cx="12" cy="16" r="4.5" fill="#111111" />
        </g>
        <text x={end.x + 18} y={end.y - 18} fill="#f5f5f5" fontSize="13">
          {destinationCity}
        </text>
        <text x={end.x + 18} y={end.y - 2} fill="#9a9a9a" fontSize="11">
          {destinationPostcode}
        </text>

        <g transform={`translate(${vehicle.x} ${vehicle.y}) rotate(${vehicle.angle})`}>
          <rect x="-12" y="-7" width="24" height="14" rx="4" fill="#f4f4f4" />
          <rect x="3" y="-5" width="7" height="10" rx="1.5" fill="#c9a227" />
        </g>
      </svg>
    </div>
  );
}

function StreetLabel({
  x,
  y,
  text,
  rotate = 0,
}: {
  x: number;
  y: number;
  text: string;
  rotate?: number;
}) {
  return (
    <text x={x} y={y} fill="#8a8a8a" fontSize="11" transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}>
      {text}
    </text>
  );
}

function AreaLabel({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fill="#6f6f6f" fontSize="18" letterSpacing="2.4" fontWeight="600">
      {text}
    </text>
  );
}

function Poi({ x, y, name }: { x: number; y: number; name: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4" fill="#c9a227" />
      <text x={x + 8} y={y + 4} fill="#b7a36a" fontSize="11">
        {name}
      </text>
    </g>
  );
}
