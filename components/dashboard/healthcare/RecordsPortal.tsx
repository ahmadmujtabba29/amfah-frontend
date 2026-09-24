"use client";

import { useMemo, useState } from "react";
import {
  PATIENTS,
  clinicName,
  type PrescriptionStatus,
} from "@/lib/dashboard/healthcareData";

function statusClass(status: PrescriptionStatus): string {
  if (status === "Active") {
    return "border-emerald-500/40 bg-emerald-950/50 text-emerald-300";
  }

  if (status === "Review due") {
    return "border-red-500/40 bg-red-950/50 text-red-300";
  }

  return "border-amfah-gold/40 bg-amfah-gold/10 text-amfah-gold";
}

export function RecordsPortal() {
  const [selectedId, setSelectedId] = useState(PATIENTS[0].id);
  const selected = PATIENTS.find((patient) => patient.id === selectedId) ?? PATIENTS[0];
  const clinic = useMemo(() => clinicName(selected.clinicId), [selected.clinicId]);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          UK GDPR & NHS DIGITAL COMPLIANT RECORDS PORTAL
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          Electronic health records, histories, and prescriptions stay on this desk. They are not sent to an external store.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(260px,380px)_1fr]">
        <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
          <div className="border-b border-amfah-border px-4 py-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-amfah-muted">
              {PATIENTS.length} RECORDS
            </p>
          </div>
          <ul className="amfah-scroll max-h-[560px] divide-y divide-amfah-border/80 overflow-y-auto">
            {PATIENTS.map((patient) => {
              const isSelected = patient.id === selected.id;

              return (
                <li key={patient.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(patient.id)}
                    className={[
                      "w-full px-4 py-3 text-left",
                      isSelected ? "bg-amfah-surface" : "hover:bg-amfah-surface/70",
                    ].join(" ")}
                  >
                    <p className="text-sm text-white">{patient.name}</p>
                    <p className="mt-1 text-xs text-amfah-gold">{patient.recordRef}</p>
                    <p className="mt-1 text-xs text-amfah-muted">
                      {clinicName(patient.clinicId)}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-300">
            UK GDPR · NHS DIGITAL
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">{selected.name}</h2>
          <p className="mt-1 text-sm text-amfah-gold">{selected.recordRef}</p>
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-amfah-muted">Born</dt>
              <dd className="mt-1 text-white">{selected.born}</dd>
            </div>
            <div>
              <dt className="text-xs text-amfah-muted">Clinic</dt>
              <dd className="mt-1 text-white">{clinic}</dd>
            </div>
            <div>
              <dt className="text-xs text-amfah-muted">Location</dt>
              <dd className="mt-1 text-white">
                {selected.city} {selected.postcode}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-amfah-muted">Phone</dt>
              <dd className="mt-1 text-white">{selected.phone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-amfah-muted">Responsible clinician</dt>
              <dd className="mt-1 text-white">{selected.clinician}</dd>
            </div>
          </dl>

          <h3 className="mt-6 text-xs font-semibold tracking-[0.14em] text-amfah-muted">
            MEDICAL HISTORY
          </h3>
          <ul className="mt-3 space-y-2">
            {selected.history.map((item) => (
              <li key={`${item.date}-${item.note}`} className="text-sm text-white/90">
                <span className="text-amfah-gold">{item.date}</span>
                <span className="text-amfah-muted"> · {item.note}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-xs font-semibold tracking-[0.14em] text-amfah-muted">
            PRESCRIPTIONS
          </h3>
          <ul className="mt-3 space-y-2">
            {selected.prescriptions.map((item) => (
              <li
                key={`${item.drug}-${item.dose}`}
                className="flex items-center justify-between gap-3 rounded-md border border-amfah-border bg-amfah-surface px-3 py-3"
              >
                <div>
                  <p className="text-sm text-white">{item.drug}</p>
                  <p className="mt-1 text-xs text-amfah-muted">{item.dose}</p>
                </div>
                <span
                  className={[
                    "shrink-0 rounded-md border px-2 py-1 text-xs",
                    statusClass(item.status),
                  ].join(" ")}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
