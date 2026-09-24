"use client";

import { useEffect, useMemo, useState } from "react";
import { CV_RECORDS, isBooleanQuery, searchCvs } from "@/lib/dashboard/recruitmentData";

export function CvWarehouse() {
  const [query, setQuery] = useState("");
  const [elapsedMs, setElapsedMs] = useState(1);
  const results = useMemo(() => searchCvs(CV_RECORDS, query), [query]);

  useEffect(() => {
    const started = performance.now();
    searchCvs(CV_RECORDS, query);
    setElapsedMs(Math.max(1, Math.round(performance.now() - started)));
  }, [query]);

  return (
    <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
      <div className="border-b border-amfah-border px-4 py-4 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          SOVEREIGN CV WAREHOUSE
        </p>
        <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
          Elastic applicant index · {CV_RECORDS.length} UK records on this desk
        </h2>
        <label className="mt-4 block text-xs text-amfah-muted" htmlFor="cv-search">
          Keyword or boolean search
        </label>
        <input
          id="cv-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="React AND London, or Python OR SQL NOT Excel"
          className="mt-1 w-full rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white placeholder:text-amfah-muted"
        />
        <p className="mt-2 text-xs text-amfah-muted">
          {results.length} matches · {elapsedMs} ms ·{" "}
          {query.trim() && isBooleanQuery(query) ? "boolean" : "keyword"} search
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-amfah-surface text-xs tracking-wider text-amfah-muted uppercase">
            <tr>
              <th className="px-4 py-3 font-medium sm:px-5">Name</th>
              <th className="px-4 py-3 font-medium sm:px-5">Title</th>
              <th className="px-4 py-3 font-medium sm:px-5">City</th>
              <th className="px-4 py-3 font-medium sm:px-5">Company</th>
              <th className="px-4 py-3 font-medium sm:px-5">Phone</th>
              <th className="px-4 py-3 font-medium sm:px-5">Skills</th>
            </tr>
          </thead>
          <tbody>
            {results.map((record) => (
              <tr key={record.id} className="border-t border-amfah-border/80 text-white/90">
                <td className="px-4 py-3 sm:px-5">{record.name}</td>
                <td className="px-4 py-3 text-amfah-muted sm:px-5">{record.title}</td>
                <td className="px-4 py-3 whitespace-nowrap text-amfah-muted sm:px-5">
                  {record.city} {record.postcode}
                </td>
                <td className="px-4 py-3 sm:px-5">{record.company}</td>
                <td className="px-4 py-3 whitespace-nowrap text-amfah-muted sm:px-5">
                  {record.phone}
                </td>
                <td className="px-4 py-3 text-xs text-amfah-gold sm:px-5">
                  {record.skills.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
