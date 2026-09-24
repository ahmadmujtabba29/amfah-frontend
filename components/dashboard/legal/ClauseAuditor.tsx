"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/Button";
import {
  SAMPLE_CONTRACT,
  auditContract,
  type ClauseRange,
} from "@/lib/dashboard/legalData";

type ClauseAuditorProps = {
  onReview?: (summary: string) => void;
};

function segments(text: string, ranges: ClauseRange[]) {
  const parts: { text: string; risk: boolean; key: string }[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start < cursor) {
      return;
    }

    if (range.start > cursor) {
      parts.push({
        text: text.slice(cursor, range.start),
        risk: false,
        key: `plain-${cursor}`,
      });
    }

    parts.push({
      text: text.slice(range.start, range.end),
      risk: true,
      key: `risk-${range.id}-${index}`,
    });
    cursor = range.end;
  });

  if (cursor < text.length) {
    parts.push({
      text: text.slice(cursor),
      risk: false,
      key: `plain-${cursor}`,
    });
  }

  return parts;
}

export function ClauseAuditor({ onReview }: ClauseAuditorProps) {
  const [contract, setContract] = useState(SAMPLE_CONTRACT);
  const [elapsedMs, setElapsedMs] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audit = useMemo(() => auditContract(contract), [contract]);

  useEffect(() => {
    const started = performance.now();
    auditContract(contract);
    setElapsedMs(Math.max(1, Math.round(performance.now() - started)));
  }, [contract]);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [contract]);

  const parts = segments(contract, audit.ranges);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          LOCAL AGENTIC AI CLAUSE AUDITOR
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          The contract window marks risky and non-standard clauses on this UK desk. Nothing is sent to a third-party public model.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(240px,0.7fr)]">
        <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
          <label className="text-xs font-semibold tracking-[0.14em] text-amfah-muted" htmlFor="contract-text">
            CONTRACT WINDOW
          </label>
          <textarea
            id="contract-text"
            ref={textareaRef}
            value={contract}
            onChange={(event) => setContract(event.target.value)}
            rows={1}
            className="amfah-no-scrollbar mt-3 w-full resize-none overflow-hidden rounded-md border border-amfah-border bg-amfah-black px-3 py-2 text-sm text-white"
          />
          <div className="mt-4 rounded-md border border-amfah-border bg-amfah-black px-4 py-4 text-sm leading-7 whitespace-pre-wrap text-white/90">
            {parts.map((part) =>
              part.risk ? (
                <mark
                  key={part.key}
                  className="rounded bg-red-950/80 px-0.5 text-red-100"
                >
                  {part.text}
                </mark>
              ) : (
                <span key={part.key}>{part.text}</span>
              ),
            )}
          </div>
          <Button
            type="button"
            className="mt-4"
            onClick={() =>
              onReview?.(
                `Local clause audit · ${audit.findings.length} risky clauses · ${elapsedMs} ms`,
              )
            }
          >
            SEAL THIS REVIEW
          </Button>
        </section>

        <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            FINDINGS
          </p>
          <p className="mt-2 text-sm text-white">
            {audit.findings.length} clauses marked · {elapsedMs} ms · local UK desk
          </p>
          <ul className="mt-4 space-y-3">
            {audit.findings.length === 0 ? (
              <li className="text-sm text-amfah-muted">No risky clauses in this text.</li>
            ) : (
              audit.findings.map((finding) => (
                <li
                  key={finding.id}
                  className="rounded-md border border-red-500/40 bg-red-950/40 px-3 py-3"
                >
                  <p className="text-sm font-medium text-red-100">{finding.label}</p>
                  <p className="mt-1 text-xs text-red-200/80">{finding.note}</p>
                  <p className="mt-2 text-xs text-amfah-gold">“{finding.excerpt}”</p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
