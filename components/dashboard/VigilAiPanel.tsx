"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { ApiError, downloadForensicReport, hashFile } from "@/lib/api";
import { Button } from "@/components/Button";
import {
  AlertIcon,
  CheckCircleIcon,
  FileIcon,
  SirenIcon,
  TrashIcon,
  UploadIcon,
} from "@/components/dashboard/icons";

type AuditStatus = "idle" | "hashing" | "verified" | "fraud" | "error";

type VigilAiPanelProps = {
  onOwnershipChange?: (active: boolean) => void;
};

const HASH_STATUS_LOGS = [
  "Ingesting payload byte-stream...",
  "Normalizing forensic buffer segments...",
  "Executing deterministic SHA-256 digest loop...",
  "Compiling integrity signature for console output...",
] as const;

const HASH_LOG_INTERVAL_MS = 700;
const HASH_ANIMATION_MS =
  HASH_STATUS_LOGS.length * HASH_LOG_INTERVAL_MS + 400;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const VERIFIED_LOG = "Integrity map confirmed — signature accepted.";
const FRAUD_LOG =
  "Anomaly classifier flagged payload integrity failure.";

export function VigilAiPanel({ onOwnershipChange }: VigilAiPanelProps) {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logTimersRef = useRef<number[]>([]);
  const auditRunIdRef = useRef(0);
  const simulateTamperingRef = useRef(false);
  const [simulateTampering, setSimulateTampering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sha256, setSha256] = useState<string | null>(null);
  const [auditStatus, setAuditStatus] = useState<AuditStatus>("idle");
  const [statusLogs, setStatusLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDownloadingReport, setIsDownloadingReport] = useState(false);

  const isFraud = auditStatus === "fraud";
  const isVerified = auditStatus === "verified";

  useEffect(() => {
    return () => {
      auditRunIdRef.current += 1;
      logTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
      logTimersRef.current = [];
    };
  }, []);

  function clearLogTimers() {
    logTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    logTimersRef.current = [];
  }

  function beginAuditRun() {
    auditRunIdRef.current += 1;
    return auditRunIdRef.current;
  }

  function isActiveAuditRun(runId: number) {
    return auditRunIdRef.current === runId;
  }

  function startStatusLogs() {
    clearLogTimers();
    setStatusLogs([HASH_STATUS_LOGS[0]]);

    HASH_STATUS_LOGS.forEach((message, index) => {
      if (index === 0) {
        return;
      }

      const timerId = window.setTimeout(() => {
        setStatusLogs((current) => [...current, message]);
      }, index * HASH_LOG_INTERVAL_MS);

      logTimersRef.current.push(timerId);
    });
  }

  function applyAuditOutcome(tampered: boolean) {
    clearLogTimers();
    setStatusLogs([...HASH_STATUS_LOGS, tampered ? FRAUD_LOG : VERIFIED_LOG]);

    if (tampered) {
      setAuditStatus("fraud");
      onOwnershipChange?.(false);
      return;
    }

    setAuditStatus("verified");
    onOwnershipChange?.(true);
  }

  async function replayAuditAnimation(tampered: boolean) {
    const runId = beginAuditRun();
    setErrorMessage(null);
    setAuditStatus("hashing");
    startStatusLogs();
    onOwnershipChange?.(false);

    await wait(HASH_ANIMATION_MS);

    if (!isActiveAuditRun(runId)) {
      return;
    }

    applyAuditOutcome(tampered);
  }

  async function processFile(file: File) {
    const runId = beginAuditRun();
    setSelectedFile(file);
    setSha256(null);
    setErrorMessage(null);
    setAuditStatus("hashing");
    startStatusLogs();
    onOwnershipChange?.(false);

    try {
      const [result] = await Promise.all([
        hashFile(file),
        wait(HASH_ANIMATION_MS),
      ]);

      if (!isActiveAuditRun(runId)) {
        return;
      }

      setSha256(result.sha256);
      applyAuditOutcome(simulateTamperingRef.current);
    } catch (error) {
      if (!isActiveAuditRun(runId)) {
        return;
      }

      clearLogTimers();
      setSha256(null);
      setAuditStatus("error");
      setStatusLogs([]);
      onOwnershipChange?.(false);
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to hash file. Please try again.",
      );
    }
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) {
      return;
    }

    void processFile(file);
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
  }

  function handleTamperToggle() {
    const nextValue = !simulateTampering;
    simulateTamperingRef.current = nextValue;
    setSimulateTampering(nextValue);

    if (selectedFile && sha256 && auditStatus !== "error") {
      void replayAuditAnimation(nextValue);
    }
  }

  function handleRemoveFile() {
    beginAuditRun();
    clearLogTimers();
    setSelectedFile(null);
    setSha256(null);
    setErrorMessage(null);
    setStatusLogs([]);
    setAuditStatus("idle");
    setIsDragging(false);
    onOwnershipChange?.(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleDownloadReport() {
    setIsDownloadingReport(true);
    setErrorMessage(null);

    try {
      await downloadForensicReport();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to download forensic report.",
      );
    } finally {
      setIsDownloadingReport(false);
    }
  }

  const canDownloadReport =
    Boolean(selectedFile && sha256) &&
    auditStatus !== "hashing" &&
    auditStatus !== "error";

  return (
    <div className="space-y-4 rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
            VIGIL AI FORENSIC PORTAL
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">
            Media & Document Provenance
          </h2>
        </div>

        <div className="inline-flex items-center gap-3 rounded-md border border-amfah-border bg-amfah-surface px-3 py-2">
          <span className="text-xs text-amfah-muted sm:text-sm">
            Simulate AI Tampering / Deepfake Attack
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={simulateTampering}
            aria-label="Simulate AI Tampering / Deepfake Attack"
            onClick={handleTamperToggle}
            className={[
              "relative h-6 w-11 rounded-full transition",
              simulateTampering ? "bg-red-500" : "bg-amfah-border",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition",
                simulateTampering ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {selectedFile ? (
        <div
          className={[
            "relative flex min-h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center bg-amfah-surface/50",
            isFraud
              ? "amfah-upload-border-flash"
              : isVerified
                ? "border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                : "border-amfah-border",
          ].join(" ")}
        >
          <button
            type="button"
            onClick={handleRemoveFile}
            aria-label="Remove selected file"
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-amfah-border bg-amfah-surface text-amfah-muted transition hover:border-red-500/50 hover:text-red-300"
          >
            <TrashIcon className="h-4 w-4" />
          </button>

          {isFraud ? (
            <SirenIcon className="amfah-siren-flash h-12 w-12" />
          ) : isVerified ? (
            <CheckCircleIcon className="h-12 w-12 text-emerald-400" />
          ) : (
            <FileIcon className="h-10 w-10 text-amfah-gold" />
          )}

          <p className="mt-4 text-sm font-medium text-white">
            {selectedFile.name}
          </p>
          <p className="mt-1 text-xs text-amfah-muted">
            {formatFileSize(selectedFile.size)}
            {auditStatus === "hashing" ? " · Computing SHA-256..." : ""}
          </p>

          <label
            htmlFor={inputId}
            className="mt-4 cursor-pointer text-xs font-medium text-amfah-gold hover:underline"
          >
            Replace file
          </label>
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            className="sr-only"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={[
            "flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition",
            isDragging
              ? "border-amfah-gold bg-amfah-gold/10"
              : "border-amfah-border bg-amfah-surface/50 hover:border-amfah-gold/60",
          ].join(" ")}
        >
          <input
            id={inputId}
            ref={fileInputRef}
            type="file"
            className="sr-only"
            onChange={handleInputChange}
          />
          <UploadIcon className="h-10 w-10 text-amfah-gold" />
          <p className="mt-4 text-sm font-medium text-white sm:text-base">
            Drop Corporate Document, Video, or Invoice Payload for Reality Audit
          </p>
          <p className="mt-2 text-xs text-amfah-muted">
            Drag and drop a file here, or click to browse
          </p>
        </label>
      )}

      <div
        className={[
          "rounded-md border px-4 py-4",
          auditStatus === "verified"
            ? "border-emerald-500/40 bg-emerald-950/30"
            : auditStatus === "fraud"
              ? "border-red-500/50 bg-red-950/40"
              : auditStatus === "error"
                ? "border-red-500/40 bg-red-950/20"
                : "border-amfah-border bg-amfah-surface/60",
        ].join(" ")}
      >
        {auditStatus === "idle" ? (
          <p className="text-xs text-amfah-muted sm:text-sm">
            Upload a payload to begin the cryptographic reality audit. The live
            SHA-256 signature will appear here after processing.
          </p>
        ) : auditStatus === "hashing" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-amfah-gold">
                FORENSIC STATUS LOG
              </p>
              <span className="text-[10px] uppercase tracking-wider text-amfah-muted">
                Multi-agent simulation
              </span>
            </div>
            <div className="min-h-[112px] rounded-md border border-amfah-border/80 bg-black/40 px-3 py-3">
              <ul className="space-y-1.5 font-mono text-xs text-amfah-gold/90">
                {statusLogs.map((log, index) => (
                  <li
                    key={`${log}-${index}`}
                    className="amfah-log-line"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {`> ${log}`}
                  </li>
                ))}
                <li className="text-amfah-gold">
                  {"> "}
                  <span className="amfah-cursor-blink inline-block">█</span>
                </li>
              </ul>
            </div>
          </div>
        ) : auditStatus === "error" ? (
          <p className="text-sm text-red-300" role="alert">
            {errorMessage ?? "Hashing failed."}
          </p>
        ) : (
          <div className="space-y-3">
            {statusLogs.length > 0 ? (
              <div className="rounded-md border border-amfah-border/70 bg-black/30 px-3 py-2">
                <ul className="space-y-1 font-mono text-[11px] text-amfah-muted">
                  {statusLogs.map((log, index) => (
                    <li key={`${log}-${index}`}>{`> ${log}`}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-amfah-muted">
                SHA-256 SIGNATURE
              </p>
              <p className="mt-1 break-all font-mono text-xs text-white/90">
                {sha256}
              </p>
            </div>

            {auditStatus === "verified" ? (
              <p className="text-sm font-semibold tracking-wide text-emerald-300">
                STATUS: 100% REAL — CRYPTOGRAPHIC INTEGRITY VERIFIED
              </p>
            ) : (
              <p className="flex items-start gap-2 text-sm font-semibold tracking-wide text-red-300">
                <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
                CRITICAL FRAUD ALERT: DATA MANIPULATION CAUGHT
              </p>
            )}
          </div>
        )}
      </div>

      {errorMessage && auditStatus !== "error" ? (
        <p className="text-center text-xs text-red-400" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button
        type="button"
        variant="ghost"
        fullWidth
        disabled={!canDownloadReport || isDownloadingReport}
        onClick={() => {
          void handleDownloadReport();
        }}
      >
        {isDownloadingReport
          ? "DOWNLOADING REPORT..."
          : "Generate Court-Admissible Forensic Validation Report"}
      </Button>
    </div>
  );
}
