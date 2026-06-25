import { useEffect, useState, useCallback } from "react";
import type { TriageFlow } from "@/data/triage-flows";

const STORAGE_KEY = "shrekfeet:custom-flows";

function read(): TriageFlow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TriageFlow[];
  } catch {
    return [];
  }
}

function write(flows: TriageFlow[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flows));
  // Notify other hook instances in the same tab
  window.dispatchEvent(new Event("custom-flows:changed"));
}

export function useCustomFlows() {
  const [flows, setFlows] = useState<TriageFlow[]>(() => read());

  useEffect(() => {
    const sync = () => setFlows(read());
    window.addEventListener("storage", sync);
    window.addEventListener("custom-flows:changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("custom-flows:changed", sync);
    };
  }, []);

  const upsert = useCallback((flow: TriageFlow) => {
    const current = read();
    const idx = current.findIndex((f) => f.id === flow.id);
    if (idx >= 0) current[idx] = flow;
    else current.push(flow);
    write(current);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((f) => f.id !== id));
  }, []);

  return { flows, upsert, remove };
}

/** Read-only helper for non-React code paths. */
export function getCustomFlows(): TriageFlow[] {
  return read();
}
