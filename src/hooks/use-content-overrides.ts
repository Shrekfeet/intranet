import { useState, useEffect, useCallback } from "react";
import {
  loadContentOverrides,
  saveContentOverrides,
  type ContentOverrides,
  type LessonOverride,
  type ModuleOverride,
} from "@/lib/content-storage";

const EMPTY: ContentOverrides = { lessons: {}, modules: {} };

export function useContentOverrides() {
  const [overrides, setOverrides] = useState<ContentOverrides>(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContentOverrides().then(setOverrides);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ContentOverrides>).detail;
      setOverrides(detail);
    };
    window.addEventListener("content-overrides:changed", handler);
    return () => window.removeEventListener("content-overrides:changed", handler);
  }, []);

  const patchLesson = useCallback(async (lessonId: string, patch: LessonOverride) => {
    setSaving(true);
    try {
      const next: ContentOverrides = {
        ...overrides,
        lessons: { ...overrides.lessons, [lessonId]: { ...overrides.lessons[lessonId], ...patch } },
      };
      await saveContentOverrides(next);
      setOverrides(next);
    } finally {
      setSaving(false);
    }
  }, [overrides]);

  const patchModule = useCallback(async (moduleId: string, patch: ModuleOverride) => {
    setSaving(true);
    try {
      const next: ContentOverrides = {
        ...overrides,
        modules: { ...overrides.modules, [moduleId]: { ...overrides.modules[moduleId], ...patch } },
      };
      await saveContentOverrides(next);
      setOverrides(next);
    } finally {
      setSaving(false);
    }
  }, [overrides]);

  return { overrides, saving, patchLesson, patchModule };
}
