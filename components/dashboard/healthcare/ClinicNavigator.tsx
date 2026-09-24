"use client";

import { useState } from "react";
import { CLINICS } from "@/lib/dashboard/healthcareData";

export function ClinicNavigator() {
  const [clinicId, setClinicId] = useState(CLINICS[0].id);
  const clinic = CLINICS.find((item) => item.id === clinicId) ?? CLINICS[0];

  const operations = [
    { label: "Theatres", value: clinic.theatres },
    { label: "Consulting rooms", value: clinic.consultingRooms },
    { label: "Beds", value: clinic.beds },
    { label: "Clinics today", value: clinic.clinicsToday },
  ];

  const resources = [
    { label: "Consultants", value: clinic.consultants },
    { label: "Nurses", value: clinic.nurses },
    { label: "Imaging slots", value: clinic.imagingSlots },
    { label: "Occupancy", value: `${clinic.occupancy}%` },
  ];

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          MULTI-CLINIC ENTERPRISE NAVIGATION
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          The master selector opens that location’s operational matrix and resource allocation immediately.
        </p>
      </div>

      <label className="block text-xs text-amfah-muted" htmlFor="master-clinic">
        Master selector
        <select
          id="master-clinic"
          value={clinic.id}
          onChange={(event) => setClinicId(event.target.value)}
          className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white"
        >
          {CLINICS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {item.city}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <section className="hidden overflow-hidden rounded-lg border border-amfah-border bg-amfah-card lg:block">
          <div className="border-b border-amfah-border px-4 py-3">
            <p className="text-xs font-semibold tracking-[0.14em] text-amfah-muted">
              CLINICAL LOCATIONS
            </p>
          </div>
          <ul className="amfah-scroll max-h-[520px] divide-y divide-amfah-border/80 overflow-y-auto">
            {CLINICS.map((item) => {
              const isSelected = item.id === clinic.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setClinicId(item.id)}
                    className={[
                      "w-full px-4 py-3 text-left",
                      isSelected ? "bg-amfah-surface" : "hover:bg-amfah-surface/70",
                    ].join(" ")}
                  >
                    <p className="text-sm text-white">{item.name}</p>
                    <p className="mt-1 text-xs text-amfah-muted">
                      {item.city} {item.postcode}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <div className="space-y-4">
          <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
              OPERATIONAL MATRIX
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">{clinic.name}</h2>
            <p className="mt-1 text-sm text-amfah-gold">
              {clinic.city} {clinic.postcode} · {clinic.phone}
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              {operations.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-amfah-border bg-amfah-surface px-4 py-4"
                >
                  <dt className="text-xs text-amfah-muted">{item.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-white">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
              RESOURCE ALLOCATION
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {resources.map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-amfah-border bg-amfah-black px-4 py-4"
                >
                  <dt className="text-xs text-amfah-muted">{item.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-amfah-gold">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
