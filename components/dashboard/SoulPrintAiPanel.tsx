"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { AlertIcon, SirenIcon } from "@/components/dashboard/icons";

type SoulPrintPhase = "monitoring" | "hijacking" | "locked";

type MetricKey = "dwell" | "flight" | "velocity";

const SAMPLE_COUNT = 40;
const STREAM_INTERVAL_MS = 120;
const HIJACK_DURATION_MS = 3000;
const NORMAL_SCORE = 98;

const METRIC_CONFIG: Record<
  MetricKey,
  { title: string; unit: string; baseline: number; variance: number }
> = {
  dwell: { title: "Dwell Time", unit: "ms", baseline: 118, variance: 28 },
  flight: { title: "Flight Time", unit: "ms", baseline: 86, variance: 22 },
  velocity: {
    title: "Mouse Trajectory Arc Velocity",
    unit: "px/s",
    baseline: 340,
    variance: 90,
  },
};

function createSeries(baseline: number, variance: number): number[] {
  return Array.from({ length: SAMPLE_COUNT }, () =>
    Math.max(8, baseline + (Math.random() - 0.5) * variance * 2),
  );
}

function pushSample(series: number[], nextValue: number): number[] {
  return [...series.slice(1), nextValue];
}

function seriesToPoints(series: number[], width: number, height: number): string {
  const max = Math.max(...series, 1);
  const min = Math.min(...series, 0);
  const range = Math.max(max - min, 1);

  return series
    .map((value, index) => {
      const x = (index / (series.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function AuthenticityGauge({
  score,
  compromised,
}: {
  score: number;
  compromised: boolean;
}) {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;
  const tone = compromised || clamped < 40 ? "red" : "emerald";

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-amfah-border bg-amfah-surface/60 px-6 py-8">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgb(42 42 42)"
            strokeWidth="12"
          />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={tone === "red" ? "rgb(239 68 68)" : "rgb(52 211 153)"}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset,stroke] duration-300 ease-out"
            style={{
              filter:
                tone === "red"
                  ? "drop-shadow(0 0 10px rgb(239 68 68 / 0.55))"
                  : "drop-shadow(0 0 10px rgb(16 185 129 / 0.45))",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className={[
              "text-4xl font-semibold tabular-nums",
              tone === "red" ? "text-red-400" : "text-emerald-300",
            ].join(" ")}
          >
            {Math.round(clamped)}%
          </p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-amfah-muted">
            AUTH SCORE
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-white">
        Human Authenticity Score
      </p>
      <p
        className={[
          "mt-1 text-xs font-semibold tracking-wide",
          tone === "red" ? "text-red-300" : "text-emerald-300",
        ].join(" ")}
      >
        {tone === "red" ? "Identity Compromised" : "Identity Confirmed"}
      </p>
    </div>
  );
}

function LiveMetricChart({
  title,
  unit,
  series,
  live,
  compromised,
}: {
  title: string;
  unit: string;
  series: number[];
  live: boolean;
  compromised: boolean;
}) {
  const width = 320;
  const height = 96;
  const points = seriesToPoints(series, width, height);
  const latest = series[series.length - 1] ?? 0;
  const stroke = compromised ? "rgb(248 113 113)" : "rgb(201 162 39)";

  return (
    <div className="rounded-lg border border-amfah-border bg-amfah-surface/50 px-3 py-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-white">{title}</p>
          <p className="text-[10px] text-amfah-muted">{unit}</p>
        </div>
        <div className="flex items-center gap-2">
          {live ? (
            <span className="amfah-live-pulse inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          ) : null}
          <span
            className={[
              "font-mono text-xs tabular-nums",
              compromised ? "text-red-300" : "text-amfah-gold",
            ].join(" ")}
          >
            {latest.toFixed(0)}
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-24 w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1={height * 0.25}
          x2={width}
          y2={height * 0.25}
          stroke="rgb(42 42 42)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1={height * 0.5}
          x2={width}
          y2={height * 0.5}
          stroke="rgb(42 42 42)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1={height * 0.75}
          x2={width}
          y2={height * 0.75}
          stroke="rgb(42 42 42)"
          strokeWidth="1"
        />
        <polyline
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />
      </svg>
    </div>
  );
}

type SoulPrintAiPanelProps = {
  onOwnershipChange?: (active: boolean) => void;
};

export function SoulPrintAiPanel({
  onOwnershipChange,
}: SoulPrintAiPanelProps) {
  const [phase, setPhase] = useState<SoulPrintPhase>("monitoring");
  const [score, setScore] = useState(NORMAL_SCORE);
  const [series, setSeries] = useState<Record<MetricKey, number[]>>(() => ({
    dwell: createSeries(
      METRIC_CONFIG.dwell.baseline,
      METRIC_CONFIG.dwell.variance,
    ),
    flight: createSeries(
      METRIC_CONFIG.flight.baseline,
      METRIC_CONFIG.flight.variance,
    ),
    velocity: createSeries(
      METRIC_CONFIG.velocity.baseline,
      METRIC_CONFIG.velocity.variance,
    ),
  }));

  const phaseRef = useRef<SoulPrintPhase>("monitoring");
  const activityBoostRef = useRef(0);
  const hijackTimersRef = useRef<number[]>([]);
  const onOwnershipChangeRef = useRef(onOwnershipChange);

  useEffect(() => {
    onOwnershipChangeRef.current = onOwnershipChange;
  }, [onOwnershipChange]);

  useEffect(() => {
    onOwnershipChangeRef.current?.(true);
  }, []);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    function bumpActivity() {
      if (phaseRef.current !== "monitoring") {
        return;
      }
      activityBoostRef.current = Math.min(1, activityBoostRef.current + 0.35);
    }

    window.addEventListener("mousemove", bumpActivity);
    window.addEventListener("keydown", bumpActivity);

    return () => {
      window.removeEventListener("mousemove", bumpActivity);
      window.removeEventListener("keydown", bumpActivity);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentPhase = phaseRef.current;

      setSeries((current) => {
        const next = { ...current };

        (Object.keys(METRIC_CONFIG) as MetricKey[]).forEach((key) => {
          const config = METRIC_CONFIG[key];

          if (currentPhase === "monitoring") {
            const boost = activityBoostRef.current;
            const jitter =
              (Math.random() - 0.5) * config.variance * (1.1 + boost);
            const value = Math.max(
              8,
              config.baseline + jitter + boost * config.variance * 0.4,
            );
            next[key] = pushSample(current[key], value);
            return;
          }

          const flatTarget = config.baseline * 0.18;
          const previous = current[key][current[key].length - 1] ?? flatTarget;
          const value = previous * 0.72 + flatTarget * 0.28;
          next[key] = pushSample(current[key], value);
        });

        return next;
      });

      activityBoostRef.current *= 0.82;
    }, STREAM_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    return () => {
      hijackTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      hijackTimersRef.current = [];
    };
  }, []);

  function clearHijackTimers() {
    hijackTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    hijackTimersRef.current = [];
  }

  function handleHijack() {
    if (phase !== "monitoring") {
      return;
    }

    clearHijackTimers();
    setPhase("hijacking");
    onOwnershipChange?.(false);

    const steps = 20;
    const stepMs = HIJACK_DURATION_MS / steps;

    for (let step = 1; step <= steps; step += 1) {
      const timerId = window.setTimeout(() => {
        const nextScore = Math.max(
          0,
          Math.round(NORMAL_SCORE - (NORMAL_SCORE * step) / steps),
        );
        setScore(nextScore);

        if (step === steps) {
          setScore(0);
          setPhase("locked");
        }
      }, step * stepMs);

      hijackTimersRef.current.push(timerId);
    }
  }

  function handleReset() {
    clearHijackTimers();
    setScore(NORMAL_SCORE);
    setPhase("monitoring");
    onOwnershipChange?.(true);
    setSeries({
      dwell: createSeries(
        METRIC_CONFIG.dwell.baseline,
        METRIC_CONFIG.dwell.variance,
      ),
      flight: createSeries(
        METRIC_CONFIG.flight.baseline,
        METRIC_CONFIG.flight.variance,
      ),
      velocity: createSeries(
        METRIC_CONFIG.velocity.baseline,
        METRIC_CONFIG.velocity.variance,
      ),
    });
  }

  const compromised = phase !== "monitoring";
  const isLive = phase === "monitoring";

  return (
    <>
      <div className="space-y-4 rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            SOULPRINT AI BEHAVIORAL BIOMETRICS
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Continuous Identity Assurance
          </h2>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <AuthenticityGauge score={score} compromised={compromised} />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {(Object.keys(METRIC_CONFIG) as MetricKey[]).map((key) => (
            <LiveMetricChart
              key={key}
              title={METRIC_CONFIG[key].title}
              unit={METRIC_CONFIG[key].unit}
              series={series[key]}
              live={isLive}
              compromised={compromised}
            />
          ))}
        </div>

        {phase === "hijacking" ? (
          <div className="flex items-start gap-2 rounded-md border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            Robotic script injection detected — authenticity collapsing…
          </div>
        ) : null}

        <Button
          type="button"
          variant="ghost"
          fullWidth
          disabled={phase !== "monitoring"}
          onClick={handleHijack}
          className="border-red-500/40 text-red-300 hover:border-red-400 hover:text-red-200"
        >
          Simulate Session Hijack / Robotic Script Injection
        </Button>
      </div>

      {phase === "locked" ? (
        <div
          className="amfah-lockdown-overlay fixed inset-0 z-50 flex items-center justify-center px-4"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="soulprint-lockdown-title"
          aria-describedby="soulprint-lockdown-desc"
        >
          <div className="w-full max-w-lg rounded-lg border border-red-500/50 bg-amfah-black/95 px-6 py-8 text-center shadow-[0_0_40px_rgba(239,68,68,0.35)] sm:px-8">
            <SirenIcon className="amfah-siren-flash mx-auto h-14 w-14" />
            <h3
              id="soulprint-lockdown-title"
              className="mt-5 text-2xl font-semibold tracking-[0.12em] text-red-300 sm:text-3xl"
            >
              SESSION LOCKDOWN
            </h3>
            <p
              id="soulprint-lockdown-desc"
              className="mt-3 text-sm text-red-100/85"
            >
              Robotic Script Injection Detected — Identity Score 0%
            </p>
            <p className="mt-2 text-xs text-amfah-muted">
              Continuous biometric stream interrupted. Terminal access frozen.
            </p>
            <Button
              type="button"
              variant="ghost"
              className="mt-6 border-red-500/40 text-red-200 hover:border-red-400 hover:text-white"
              onClick={handleReset}
            >
              Reset Biometric Stream
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
