"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/dashboard/industryMockData";
import {
  CLINICIANS,
  CLINICIAN_MAX,
  CLINICIAN_MIN,
  CLINICIAN_START,
} from "@/lib/dashboard/healthcareData";

export function ClinicianRegistry() {
  const [count, setCount] = useState(CLINICIAN_START);
  const visibleCount = Math.min(count, CLINICIANS.length);
  const visible = CLINICIANS.slice(0, visibleCount);
  const extra = Math.max(count - CLINICIANS.length, 0);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          UNLIMITED CLINICIAN REGISTRY
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          Scale clinicians, rotations, and appointment logs with no per-doctor software rent.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(260px,380px)_1fr]">
        <section className="rounded-lg border border-amfah-border bg-amfah-card p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            CLINICIANS
          </p>
          <p className="mt-4 text-6xl font-semibold tracking-tight text-white">{count}</p>
          <label className="mt-6 block">
            <span className="sr-only">Clinician count</span>
            <input
              type="range"
              min={CLINICIAN_MIN}
              max={CLINICIAN_MAX}
              step={1}
              value={count}
              onChange={(event) => setCount(Number(event.target.value))}
              className="w-full accent-amfah-gold"
            />
          </label>
          <div className="mt-2 flex justify-between text-xs text-amfah-muted">
            <span>{CLINICIAN_MIN}</span>
            <span>{CLINICIAN_MAX.toLocaleString("en-GB")}</span>
          </div>
          <p className="mt-6 text-sm text-amfah-muted">
            Per-doctor software rent{" "}
            <span className="font-semibold text-white">{formatCurrency(0)}</span>
          </p>
        </section>

        <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
          <div className="border-b border-amfah-border px-4 py-3 sm:px-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
              ROTATIONS AND APPOINTMENTS
            </p>
            <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
              {count.toLocaleString("en-GB")} clinicians provisioned
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-amfah-surface text-xs tracking-wider text-amfah-muted uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Rotation</th>
                  <th className="px-4 py-3 font-medium">Next appointment</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((clinician) => (
                  <tr key={clinician.id} className="border-t border-amfah-border/80 text-white/90">
                    <td className="px-4 py-3">
                      <p>{clinician.name}</p>
                      <p className="mt-1 text-xs text-amfah-muted">{clinician.clinic}</p>
                    </td>
                    <td className="px-4 py-3 text-amfah-muted">{clinician.role}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-amfah-muted">
                      {clinician.rotation}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-amfah-gold">
                      {clinician.nextAppointment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {extra > 0 ? (
            <p className="border-t border-amfah-border px-4 py-3 text-xs text-amfah-muted sm:px-5">
              {extra.toLocaleString("en-GB")} additional clinicians are provisioned at{" "}
              {formatCurrency(0)}. No per-doctor license prompt.
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
