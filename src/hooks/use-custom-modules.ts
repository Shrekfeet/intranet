import { useEffect, useState, useCallback } from "react";
import type { TrainingModule } from "@/data/training-modules";

const STORAGE_KEY = "shrekfeet:custom-modules";

function read(): TrainingModule[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as TrainingModule[];
  } catch {
    return [];
  }
}

function write(modules: TrainingModule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
  window.dispatchEvent(new Event("custom-modules:changed"));
}

export function useCustomModules() {
  const [modules, setModules] = useState<TrainingModule[]>(() => read());

  useEffect(() => {
    const sync = () => setModules(read());
    window.addEventListener("storage", sync);
    window.addEventListener("custom-modules:changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("custom-modules:changed", sync);
    };
  }, []);

  const upsert = useCallback((module: TrainingModule) => {
    const current = read();
    const idx = current.findIndex((item) => item.id === module.id);
    if (idx >= 0) current[idx] = module;
    else current.push(module);
    write(current);
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((item) => item.id !== id));
  }, []);

  return { modules, upsert, remove };
}

export function getCustomModules(): TrainingModule[] {
  return read();
}