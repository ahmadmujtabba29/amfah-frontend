"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import {
  FEE_EARNERS,
  VAULT_FILES,
  billableHours,
  type AuditDraft,
  type AuditEntry,
} from "@/lib/dashboard/legalData";

type TimeAuditTrailProps = {
  entries: AuditEntry[];
  chainReady: boolean;
  chainIntact: boolean | null;
  onLog: (draft: AuditDraft) => void;
  onVerify: () => void;
};

function formatWhen(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(new Date(value));
}

function shortHash(value: string): string {
  if (!value) {
    return "Sealing…";
  }

  return `${value.slice(0, 12)}…${value.slice(-6)}`;
}

export function TimeAuditTrail({
  entries,
  chainReady,
  chainIntact,
  onLog,
  onVerify,
}: TimeAuditTrailProps) {
  const [actor, setActor] = useState(FEE_EARNERS[0]);
  const [matter, setMatter] = useState(
    `${VAULT_FILES[0].reference} ${VAULT_FILES[0].title}`,
  );
  const [hours, setHours] = useState("1.0");
  const [detail, setDetail] = useState("");
  const billed = billableHours(entries);
  const interactions = entries.filter((entry) => entry.kind === "interaction").length;
  const tip = entries.at(-1)?.hash ?? "";

  function handleLog() {
    const parsedHours = Number(hours);

    if (!detail.trim() || !Number.isFinite(parsedHours) || parsedHours <= 0) {
      return;
    }

    onLog({
      id: `tl-${crypto.randomUUID()}`,
      at: new Date().toISOString(),
      actor,
      matter,
      kind: "time",
      detail: detail.trim(),
      hours: Math.round(parsedHours * 10) / 10,
    });
    setDetail("");
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          IMMUTABLE TIME-TRACKING AUDIT TRAIL
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          Work hours and desk interactions are sealed with SHA-256. A sealed row cannot be edited or removed. Billable hours stay on this SRA record.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <section className="rounded-lg border border-amfah-border bg-amfah-card px-4 py-4">
          <p className="text-xs text-amfah-muted">Billable hours</p>
          <p className="mt-2 text-2xl font-semibold text-white">{billed.toFixed(1)}</p>
        </section>
        <section className="rounded-lg border border-amfah-border bg-amfah-card px-4 py-4">
          <p className="text-xs text-amfah-muted">Sealed rows</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {entries.length}
            <span className="ml-2 text-sm font-normal text-amfah-muted">
              {interactions} interactions
            </span>
          </p>
        </section>
        <section className="rounded-lg border border-amfah-border bg-amfah-card px-4 py-4">
          <p className="text-xs text-amfah-muted">Chain</p>
          <p className="mt-2 text-sm font-semibold text-emerald-300">
            {chainIntact === false ? "Broken" : chainReady ? "Intact" : "Sealing"}
          </p>
          <p className="mt-1 break-all font-mono text-[11px] text-amfah-gold">
            {tip ? shortHash(tip) : "Sealing locally…"}
          </p>
        </section>
      </div>

      <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
        <p className="text-xs font-semibold tracking-[0.14em] text-amfah-muted">
          LOG BILLABLE TIME
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <label className="text-xs text-amfah-muted md:col-span-1">
            Fee earner
            <select
              value={actor}
              onChange={(event) => setActor(event.target.value)}
              className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white"
            >
              {FEE_EARNERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs text-amfah-muted md:col-span-2">
            Matter
            <select
              value={matter}
              onChange={(event) => setMatter(event.target.value)}
              className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white"
            >
              {VAULT_FILES.map((file) => {
                const label = `${file.reference} ${file.title}`;

                return (
                  <option key={file.id} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="text-xs text-amfah-muted">
            Hours
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={hours}
              onChange={(event) => setHours(event.target.value)}
              className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white"
            />
          </label>
        </div>
        <label className="mt-3 block text-xs text-amfah-muted" htmlFor="time-detail">
          Narrative
          <input
            id="time-detail"
            value={detail}
            onChange={(event) => setDetail(event.target.value)}
            placeholder="Work done on the matter"
            className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white placeholder:text-amfah-muted"
          />
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button type="button" onClick={handleLog} disabled={!chainReady}>
            APPEND SEALED ENTRY
          </Button>
          <Button type="button" variant="ghost" onClick={onVerify} disabled={!chainReady}>
            VERIFY CHAIN
          </Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-amfah-surface text-xs tracking-wider text-amfah-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium">When</th>
                <th className="px-4 py-3 font-medium">Fee earner</th>
                <th className="px-4 py-3 font-medium">Matter</th>
                <th className="px-4 py-3 font-medium">Hours</th>
                <th className="px-4 py-3 font-medium">Activity</th>
                <th className="px-4 py-3 font-medium">SHA-256</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t border-amfah-border/80 text-white/90">
                  <td className="px-4 py-3 whitespace-nowrap text-amfah-muted">
                    {formatWhen(entry.at)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.actor}</td>
                  <td className="px-4 py-3">{entry.matter}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-amfah-gold">
                    {entry.kind === "time" ? entry.hours.toFixed(1) : "—"}
                  </td>
                  <td className="px-4 py-3 text-amfah-muted">{entry.detail}</td>
                  <td className="px-4 py-3 font-mono text-xs text-amfah-gold" title={entry.hash}>
                    {shortHash(entry.hash)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
