"use client";

import { useEffect, useState } from "react";
import {
  SHIPMENTS,
  type CustomsStatus,
  type ShipmentRow,
} from "@/lib/dashboard/logisticsData";

type CustomsFilter = "All" | CustomsStatus;

const FILTERS: CustomsFilter[] = ["All", "Cleared", "In transit", "Held"];

function pillClass(status: CustomsStatus): string {
  if (status === "Cleared") {
    return "border-emerald-500/40 bg-emerald-950/50 text-emerald-300";
  }

  if (status === "Held") {
    return "border-red-500/40 bg-red-950/50 text-red-300";
  }

  return "border-amfah-gold/40 bg-amfah-gold/10 text-amfah-gold";
}

function nextCustomsStatus(status: CustomsStatus): CustomsStatus {
  if (status === "Held") {
    return "In transit";
  }

  if (status === "In transit") {
    return "Cleared";
  }

  return "In transit";
}

export function LogisticsShipmentsPanel() {
  const [filter, setFilter] = useState<CustomsFilter>("All");
  const [shipments, setShipments] = useState<ShipmentRow[]>(SHIPMENTS);
  const rows =
    filter === "All"
      ? shipments
      : shipments.filter((row) => row.customs === filter);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setShipments((current) => {
        const index = current.findIndex((row) => row.customs !== "Cleared");
        const targetIndex = index === -1 ? 0 : index;

        return current.map((row, rowIndex) =>
          rowIndex === targetIndex
            ? { ...row, customs: nextCustomsStatus(row.customs) }
            : row,
        );
      });
    }, 2800);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
      <div className="flex flex-col gap-3 border-b border-amfah-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            <span className="amfah-live-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
            LIVE OPERATIONAL GRID
          </p>
          <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
            Shipments and customs clearance
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Customs status filter">
          {FILTERS.map((item) => {
            const isActive = item === filter;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={[
                  "rounded-md border px-3 py-1.5 text-xs font-medium transition",
                  isActive
                    ? "border-amfah-gold bg-amfah-gold/10 text-amfah-gold"
                    : "border-amfah-border text-amfah-muted hover:text-white",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-amfah-surface text-xs tracking-wider text-amfah-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium sm:px-5">Company</th>
              <th className="px-4 py-3 font-medium sm:px-5">Postcode</th>
              <th className="px-4 py-3 font-medium sm:px-5">Shipment</th>
              <th className="px-4 py-3 font-medium sm:px-5">Vessel / Flight</th>
              <th className="px-4 py-3 font-medium sm:px-5">Container</th>
              <th className="px-4 py-3 font-medium sm:px-5">Customs</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-amfah-border/80 text-white/90">
                <td className="px-4 py-3 sm:px-5">{row.company}</td>
                <td className="px-4 py-3 whitespace-nowrap text-amfah-muted sm:px-5">
                  {row.postcode}
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs sm:px-5">
                  {row.shipment}
                </td>
                <td className="px-4 py-3 whitespace-nowrap sm:px-5">
                  {row.vesselOrFlight}
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-xs text-amfah-muted sm:px-5">
                  {row.container}
                </td>
                <td className="px-4 py-3 sm:px-5">
                  <span
                    className={`inline-flex rounded-md border px-2 py-1 text-xs font-medium ${pillClass(row.customs)}`}
                  >
                    {row.customs}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
