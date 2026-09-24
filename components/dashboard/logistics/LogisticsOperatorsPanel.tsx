"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/dashboard/industryMockData";
import {
  OPERATORS,
  OPERATOR_MAX,
  OPERATOR_MIN,
  OPERATOR_START,
} from "@/lib/dashboard/logisticsData";

export function LogisticsOperatorsPanel() {
  const [count, setCount] = useState(OPERATOR_START);
  const visibleCount = Math.min(count, OPERATORS.length);
  const visible = OPERATORS.slice(0, visibleCount);
  const extra = Math.max(count - OPERATORS.length, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,380px)_1fr]">
      <section className="rounded-lg border border-amfah-border bg-amfah-card p-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
          OPERATOR COUNT
        </p>
        <p className="mt-4 text-6xl font-semibold tracking-tight text-white">
          {count}
        </p>
        <label className="mt-6 block">
          <span className="sr-only">Operator count</span>
          <input
            type="range"
            min={OPERATOR_MIN}
            max={OPERATOR_MAX}
            step={1}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-full accent-amfah-gold"
          />
        </label>
        <div className="mt-2 flex justify-between text-xs text-amfah-muted">
          <span>{OPERATOR_MIN}</span>
          <span>{OPERATOR_MAX.toLocaleString("en-GB")}</span>
        </div>
        <p className="mt-6 text-sm text-amfah-muted">
          Incremental license cost{" "}
          <span className="font-semibold text-white">{formatCurrency(0)}</span>
        </p>
      </section>

      <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
        <div className="border-b border-amfah-border px-4 py-3 sm:px-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            OPERATOR ROSTER
          </p>
          <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
            {count.toLocaleString("en-GB")} operators provisioned
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-amfah-surface text-xs tracking-wider text-amfah-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-medium sm:px-5">Name</th>
                <th className="px-4 py-3 font-medium sm:px-5">Site</th>
                <th className="px-4 py-3 font-medium sm:px-5">Shift</th>
                <th className="px-4 py-3 font-medium sm:px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((operator) => (
                <tr
                  key={operator.id}
                  className="border-t border-amfah-border/80 text-white/90"
                >
                  <td className="px-4 py-3 sm:px-5">{operator.name}</td>
                  <td className="px-4 py-3 text-amfah-muted sm:px-5">{operator.site}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-amfah-muted sm:px-5">
                    {operator.shift}
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span className="inline-flex rounded-md border border-emerald-500/40 bg-emerald-950/50 px-2 py-1 text-xs font-medium text-emerald-300">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {extra > 0 ? (
          <p className="border-t border-amfah-border px-4 py-3 text-xs text-amfah-muted sm:px-5">
            {extra.toLocaleString("en-GB")} additional operators are provisioned
            at {formatCurrency(0)}. No seat-license prompt.
          </p>
        ) : null}
      </section>
    </div>
  );
}
