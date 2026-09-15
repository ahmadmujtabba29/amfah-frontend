"use client";

import { useId, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { Button } from "@/components/Button";
import {
  AlertIcon,
  FileIcon,
  TrashIcon,
  UploadIcon,
} from "@/components/dashboard/icons";

type AuditStatus = "idle" | "verified" | "fraud";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function VigilAiPanel() {
  const inputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [simulateTampering, setSimulateTampering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [auditStatus, setAuditStatus] = useState<AuditStatus>("idle");

  function applyFile(file: File | null) {
    if (!file) {
      return;
    }

    setSelectedFile(file);
    setAuditStatus(simulateTampering ? "fraud" : "verified");
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0] ?? null;
    applyFile(file);
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
    setSimulateTampering(nextValue);

    if (selectedFile) {
      setAuditStatus(nextValue ? "fraud" : "verified");
    }
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    setAuditStatus("idle");
    setIsDragging(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div
      className={[
        "space-y-4 rounded-lg border bg-amfah-card p-4 sm:p-5",
        auditStatus === "fraud"
          ? "border-red-500/50 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
          : "border-amfah-border",
      ].join(" ")}
    >
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
            "relative flex min-h-[220px] flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center",
            auditStatus === "fraud"
              ? "border-red-500/50 bg-red-950/20"
              : "border-amfah-border bg-amfah-surface/50",
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

          <FileIcon className="h-10 w-10 text-amfah-gold" />
          <p className="mt-4 text-sm font-medium text-white">
            {selectedFile.name}
          </p>
          <p className="mt-1 text-xs text-amfah-muted">
            {formatFileSize(selectedFile.size)}
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
              : "border-amfah-border bg-amfah-surface/60",
        ].join(" ")}
      >
        {auditStatus === "idle" ? (
          <p className="text-xs text-amfah-muted sm:text-sm">
            Upload a payload to begin the cryptographic reality audit. SHA-256
            output will appear here once the local engine is connected.
          </p>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-amfah-muted">
                SHA-256 SIGNATURE
              </p>
              <p className="mt-1 break-all font-mono text-xs text-white/80">
                Pending — local Python hashing engine not connected yet
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

      <Button type="button" variant="ghost" fullWidth disabled={!selectedFile}>
        Generate Court-Admissible Forensic Validation Report
      </Button>
    </div>
  );
}
