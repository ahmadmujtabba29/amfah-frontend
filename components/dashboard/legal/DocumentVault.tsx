"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { VAULT_FILES, encryptMatter, type VaultFile, type VaultFolder } from "@/lib/dashboard/legalData";

type FolderFilter = "all" | VaultFolder;

const FILTERS: { id: FolderFilter; label: string }[] = [
  { id: "all", label: "All files" },
  { id: "ma", label: "M&A strategies" },
  { id: "litigation", label: "Active litigation" },
];

type DocumentVaultProps = {
  onOpenFile?: (file: VaultFile) => void;
};

export function DocumentVault({ onOpenFile }: DocumentVaultProps) {
  const [filter, setFilter] = useState<FolderFilter>("all");
  const [selectedId, setSelectedId] = useState(VAULT_FILES[0].id);
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const selected = VAULT_FILES.find((file) => file.id === selectedId) ?? VAULT_FILES[0];
  const visible = useMemo(
    () =>
      VAULT_FILES.filter((file) => (filter === "all" ? true : file.folder === filter)),
    [filter],
  );

  useEffect(() => {
    let cancelled = false;

    setRevealed(false);
    setCiphertext(null);

    void encryptMatter(selected).then((envelope) => {
      if (!cancelled) {
        setCiphertext(envelope);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selected]);

  function openFile(file: VaultFile) {
    setSelectedId(file.id);
    onOpenFile?.(file);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          CLOSED-LOOP ENCRYPTED DOCUMENT VAULT
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          SRA-confidential M&A strategies and active litigation files are encrypted on this desk. The ciphertext is not sent to a public model or an external store.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(260px,380px)_1fr]">
        <section className="overflow-hidden rounded-lg border border-amfah-border bg-amfah-card">
          <div className="flex flex-wrap gap-2 border-b border-amfah-border px-4 py-3">
            {FILTERS.map((item) => {
              const isActive = item.id === filter;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  className={[
                    "rounded-md border px-2 py-1 text-xs",
                    isActive
                      ? "border-amfah-gold text-amfah-gold"
                      : "border-amfah-border text-amfah-muted hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <ul className="amfah-scroll max-h-[560px] divide-y divide-amfah-border/80 overflow-y-auto">
            {visible.map((file) => {
              const isSelected = file.id === selected.id;

              return (
                <li key={file.id}>
                  <button
                    type="button"
                    onClick={() => void openFile(file)}
                    className={[
                      "w-full px-4 py-3 text-left",
                      isSelected ? "bg-amfah-surface" : "hover:bg-amfah-surface/70",
                    ].join(" ")}
                  >
                    <p className="text-xs text-amfah-gold">{file.reference}</p>
                    <p className="mt-1 text-sm text-white">{file.title}</p>
                    <p className="mt-1 text-xs text-amfah-muted">
                      {file.folder === "ma" ? "M&A strategy" : "Active litigation"} · {file.city}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-lg border border-amfah-border bg-amfah-card p-4 sm:p-5">
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-300">
            AES-256-GCM · SRA CONFIDENTIAL
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">{selected.reference}</h2>
          <p className="mt-1 text-sm text-amfah-gold">
            {selected.folder === "ma" ? "Corporate M&A strategy" : "Active litigation"}
          </p>
          <div className="mt-4 rounded-md border border-amfah-border bg-amfah-black px-3 py-3">
            <p className="text-xs text-amfah-muted">Closed-loop envelope</p>
            <p className="mt-1 max-h-24 overflow-hidden break-all font-mono text-xs text-amfah-gold">
              {ciphertext ?? "Encrypting on this desk…"}
            </p>
          </div>
          <Button
            type="button"
            className="mt-4"
            onClick={() => setRevealed(true)}
            disabled={!ciphertext || revealed}
          >
            {revealed ? "DECRYPTED ON THIS DESK" : "DECRYPT ON THIS DESK"}
          </Button>
          {revealed ? (
          <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-amfah-muted">Firm</dt>
              <dd className="mt-1 text-white">{selected.firm}</dd>
            </div>
            <div>
              <dt className="text-xs text-amfah-muted">Fee earner</dt>
              <dd className="mt-1 text-white">{selected.feeEarner}</dd>
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
            <div>
              <dt className="text-xs text-amfah-muted">File class</dt>
              <dd className="mt-1 text-white">
                {selected.folder === "ma" ? "Corporate M&A strategy" : "Active litigation"}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-amfah-muted">Updated</dt>
              <dd className="mt-1 text-white">{selected.updated}</dd>
            </div>
          </dl>
          ) : (
            <p className="mt-4 text-xs leading-relaxed text-amfah-muted">
              The matter body stays encrypted until it is opened on this desk.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
