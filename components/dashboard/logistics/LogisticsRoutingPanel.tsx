"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { StreetCorridorMap } from "@/components/dashboard/logistics/StreetCorridorMap";
import {
  DELIVERY_ORDERS,
  type DeliveryOrder,
  type OrderStatus,
} from "@/lib/dashboard/logisticsData";
import { buildLocalCorridor } from "@/lib/dashboard/localCorridor";

function statusClass(status: OrderStatus): string {
  if (status === "Dispatched") {
    return "text-emerald-300";
  }

  if (status === "Routing") {
    return "text-amfah-gold";
  }

  return "text-amfah-muted";
}

function statusDot(status: OrderStatus): string {
  if (status === "Dispatched") {
    return "bg-emerald-400";
  }

  if (status === "Routing") {
    return "bg-amfah-gold";
  }

  return "bg-amfah-muted";
}

export function LogisticsRoutingPanel() {
  const [orders, setOrders] = useState<DeliveryOrder[]>(DELIVERY_ORDERS);
  const [selectedId, setSelectedId] = useState(DELIVERY_ORDERS[0].id);
  const [agentLive, setAgentLive] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "Routing agent online. Calculating the next fuel corridor.",
  ]);
  const ordersRef = useRef(orders);
  const agentLiveRef = useRef(agentLive);
  const selectedIdRef = useRef(selectedId);

  ordersRef.current = orders;
  agentLiveRef.current = agentLive;
  selectedIdRef.current = selectedId;

  const selected = orders.find((order) => order.id === selectedId) ?? orders[0];
  const corridor = buildLocalCorridor(selected.origin, selected.destination);
  const activeOrders = orders.filter((order) => order.status !== "Dispatched").length;
  const dispatches = orders.filter((order) => order.status === "Dispatched").length;

  function pushLog(line: string) {
    setLogs((current) => [line, ...current].slice(0, 6));
  }

  function patchOrder(id: string, status: OrderStatus) {
    const next = ordersRef.current.map((order) =>
      order.id === id ? { ...order, status } : order,
    );
    ordersRef.current = next;
    setOrders(next);
  }

  useEffect(() => {
    let cancelled = false;

    async function loop() {
      while (!cancelled) {
        if (!agentLiveRef.current) {
          await wait(400);
          continue;
        }

        const next = ordersRef.current.find((order) => order.status === "Queued");

        if (!next) {
          await wait(800);
          continue;
        }

        const nextCorridor = buildLocalCorridor(next.origin, next.destination);
        setSelectedId(next.id);
        selectedIdRef.current = next.id;
        patchOrder(next.id, "Routing");
        pushLog(
          `${next.origin.city} → ${next.destination.city}: ${nextCorridor.efficientKm.toFixed(0)} km corridor, ${nextCorridor.fuelSavePercent}% shorter than the longer road.`,
        );
        await wait(3600);

        if (cancelled) {
          return;
        }

        patchOrder(next.id, "Dispatched");
        pushLog(`Dispatch updated — ${next.destination.city} ${next.destination.postcode}.`);
        await wait(900);
      }
    }

    void loop();

    return () => {
      cancelled = true;
    };
  }, []);

  function selectOrder(order: DeliveryOrder) {
    setSelectedId(order.id);
    selectedIdRef.current = order.id;
    const nextCorridor = buildLocalCorridor(order.origin, order.destination);
    pushLog(
      `${order.origin.city} → ${order.destination.city}: fuel corridor saves ${nextCorridor.fuelSavePercent}%.`,
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]">
      <section className="rounded-lg border border-amfah-border bg-amfah-card">
        <div className="border-b border-amfah-border px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-[0.16em] text-amfah-muted">
              DELIVERY ORDERS
            </p>
            <span className="inline-flex items-center gap-2 text-xs text-amfah-gold">
              <span
                className={[
                  "h-1.5 w-1.5 rounded-full bg-amfah-gold",
                  agentLive ? "amfah-live-pulse" : "opacity-40",
                ].join(" ")}
              />
              {agentLive ? "Agent live" : "Agent paused"}
            </span>
          </div>
          <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
            Autonomous dispatch queue
          </h2>
        </div>
        <ul className="amfah-scroll max-h-[460px] space-y-2 overflow-y-auto p-3">
          {orders.map((order) => {
            const isSelected = order.id === selected.id;

            return (
              <li key={order.id}>
                <button
                  type="button"
                  onClick={() => selectOrder(order)}
                  className={[
                    "w-full rounded-md border px-3 py-3 text-left transition",
                    isSelected
                      ? "border-amfah-gold bg-amfah-gold/10"
                      : "border-amfah-border bg-amfah-surface/40 hover:border-amfah-gold/40",
                  ].join(" ")}
                >
                  <span className="block text-sm font-medium text-white">
                    {order.company}
                  </span>
                  <span className="mt-1 block text-xs text-amfah-muted">
                    {order.origin.postcode} · {order.origin.city} →{" "}
                    {order.destination.city}
                  </span>
                  <span
                    className={`mt-2 inline-flex items-center gap-2 text-xs ${statusClass(order.status)}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusDot(order.status)}`}
                    />
                    {order.status}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-amfah-border p-3">
          <Button
            type="button"
            variant="ghost"
            fullWidth
            onClick={() => setAgentLive((current) => !current)}
          >
            {agentLive ? "PAUSE AGENT" : "RESUME AGENT"}
          </Button>
        </div>
      </section>

      <section className="flex min-h-[520px] flex-col rounded-lg border border-amfah-border bg-amfah-card">
        <div className="grid grid-cols-3 gap-2 border-b border-amfah-border p-3 sm:p-4">
          <Stat label="Active orders" value={String(activeOrders)} />
          <Stat label="Fuel saved" value={`${corridor.fuelSavePercent}%`} />
          <Stat label="Dispatches" value={String(dispatches)} />
        </div>

        <div className="relative min-h-[360px] flex-1">
          <StreetCorridorMap
            orderId={selected.id}
            originCity={selected.origin.city}
            destinationCity={selected.destination.city}
            originPostcode={selected.origin.postcode}
            destinationPostcode={selected.destination.postcode}
          />
        </div>

        <div className="border-t border-amfah-border bg-black/40 px-4 py-3">
          <ul className="space-y-1 font-mono text-[11px] text-amfah-muted">
            {logs.map((line, index) => (
              <li key={`${line}-${index}`}>{`> ${line}`}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-amfah-border bg-amfah-surface px-3 py-2">
      <p className="text-[10px] font-semibold tracking-[0.14em] text-amfah-muted uppercase">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

