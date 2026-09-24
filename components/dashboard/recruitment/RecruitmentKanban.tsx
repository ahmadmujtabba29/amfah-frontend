"use client";

import { useState } from "react";
import {
  PIPELINE_CARDS,
  PIPELINE_STAGES,
  type PipelineCard,
  type PipelineStage,
} from "@/lib/dashboard/recruitmentData";

export function RecruitmentKanban() {
  const [cards, setCards] = useState<PipelineCard[]>(PIPELINE_CARDS);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<PipelineStage | null>(null);

  function moveCard(cardId: string, stage: PipelineStage) {
    setCards((current) =>
      current.map((card) => (card.id === cardId ? { ...card, stage } : card)),
    );
  }

  function clearDrag() {
    setDraggingId(null);
    setOverStage(null);
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-amfah-gold">
          VISUAL KANBAN WORKFLOW
        </p>
        <p className="mt-1 text-xs text-amfah-muted">
          Drag each application across Sourced, Screened, Interview Scheduled, and Offer Extended.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {PIPELINE_STAGES.map((stage, index) => {
          const column = cards.filter((card) => card.stage === stage.id);
          const isOver = overStage === stage.id && draggingId !== null;

          return (
            <section
              key={stage.id}
              onDragOver={(event) => {
                event.preventDefault();
                setOverStage(stage.id);
              }}
              onDragLeave={(event) => {
                const next = event.relatedTarget;
                if (next instanceof Node && event.currentTarget.contains(next)) {
                  return;
                }
                setOverStage((current) => (current === stage.id ? null : current));
              }}
              onDrop={() => {
                if (draggingId) {
                  moveCard(draggingId, stage.id);
                }
                clearDrag();
              }}
              className={[
                "flex min-h-[320px] flex-col rounded-lg border bg-amfah-card transition sm:min-h-[420px]",
                isOver
                  ? "border-amfah-gold shadow-[0_0_0_1px_rgba(201,162,39,0.45)]"
                  : "border-amfah-border",
              ].join(" ")}
            >
              <div className="border-b border-amfah-border px-3 py-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-amfah-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-xs text-amfah-muted">{column.length}</p>
                </div>
                <p className="mt-1 text-sm font-medium text-white">{stage.label}</p>
              </div>

              <ul className="amfah-scroll flex max-h-[420px] flex-1 flex-col gap-2 overflow-y-auto p-3">
                {column.length === 0 ? (
                  <li className="rounded-md border border-dashed border-amfah-border px-3 py-6 text-center text-xs text-amfah-muted">
                    Drop an application here
                  </li>
                ) : null}
                {column.map((card) => {
                  const isDragging = draggingId === card.id;

                  return (
                    <li key={card.id}>
                      <article
                        draggable
                        onDragStart={() => setDraggingId(card.id)}
                        onDragEnd={clearDrag}
                        className={[
                          "cursor-grab rounded-md border border-amfah-border bg-amfah-surface px-3 py-3 active:cursor-grabbing",
                          isDragging ? "opacity-40" : "opacity-100",
                        ].join(" ")}
                      >
                        <p className="text-sm font-medium text-white">{card.name}</p>
                        <p className="mt-1 text-xs text-amfah-muted">{card.role}</p>
                        <p className="mt-2 text-xs text-amfah-gold">{card.company}</p>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
