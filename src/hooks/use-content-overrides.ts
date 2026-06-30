import { useState, useEffect, useCallback } from "react";
import {
  loadContentOverrides,
  saveContentOverrides,
  EMPTY_OVERRIDES,
  type ContentOverrides,
  type LessonOverride,
  type ModuleOverride,
} from "@/lib/content-storage";
import type { Lesson, Quiz, TrainingModule } from "@/data/training-modules";

export function useContentOverrides() {
  const [overrides, setOverrides] = useState<ContentOverrides>(EMPTY_OVERRIDES);
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

  const save = useCallback(async (next: ContentOverrides) => {
    setSaving(true);
    try {
      await saveContentOverrides(next);
      setOverrides(next);
    } finally {
      setSaving(false);
    }
  }, []);

  const patchLesson = useCallback(async (lessonId: string, patch: LessonOverride) => {
    await save({
      ...overrides,
      lessons: { ...overrides.lessons, [lessonId]: { ...overrides.lessons[lessonId], ...patch } },
    });
  }, [overrides, save]);

  const patchModule = useCallback(async (moduleId: string, patch: ModuleOverride) => {
    await save({
      ...overrides,
      modules: { ...overrides.modules, [moduleId]: { ...overrides.modules[moduleId], ...patch } },
    });
  }, [overrides, save]);

  const addLesson = useCallback(async (moduleId: string, data: { title: string; duration: string; content: string }): Promise<string> => {
    const id = `lesson-${moduleId}-${Date.now()}`;
    const lesson: Lesson = { id, ...data };
    const existing = overrides.addedLessons[moduleId] ?? [];
    const next: ContentOverrides = {
      ...overrides,
      addedLessons: { ...overrides.addedLessons, [moduleId]: [...existing, lesson] },
    };
    setSaving(true);
    try {
      await saveContentOverrides(next);
      setOverrides(next);
      return id;
    } finally {
      setSaving(false);
    }
  }, [overrides]);

  const removeLesson = useCallback(async (moduleId: string, lessonId: string, isStatic: boolean) => {
    let next: ContentOverrides;
    if (isStatic) {
      const existing = overrides.removedLessons[moduleId] ?? [];
      next = {
        ...overrides,
        removedLessons: { ...overrides.removedLessons, [moduleId]: [...existing, lessonId] },
      };
    } else {
      const existing = overrides.addedLessons[moduleId] ?? [];
      next = {
        ...overrides,
        addedLessons: { ...overrides.addedLessons, [moduleId]: existing.filter((l) => l.id !== lessonId) },
      };
    }
    await save(next);
  }, [overrides, save]);

  const saveQuiz = useCallback(async (moduleId: string, quiz: Quiz) => {
    await save({
      ...overrides,
      quizOverrides: { ...overrides.quizOverrides, [moduleId]: quiz },
    });
  }, [overrides, save]);

  const addModule = useCallback(async (data: Omit<TrainingModule, "id">): Promise<string> => {
    const id = `module-${Date.now()}`;
    const module: TrainingModule = { ...data, id };
    const next: ContentOverrides = {
      ...overrides,
      addedModules: [...(overrides.addedModules ?? []), module],
    };
    setSaving(true);
    try {
      await saveContentOverrides(next);
      setOverrides(next);
      return id;
    } finally {
      setSaving(false);
    }
  }, [overrides]);

  const deleteModuleById = useCallback(async (moduleId: string, isStatic: boolean) => {
    let next: ContentOverrides;
    if (isStatic) {
      next = {
        ...overrides,
        removedModules: [...(overrides.removedModules ?? []), moduleId],
      };
    } else {
      next = {
        ...overrides,
        addedModules: (overrides.addedModules ?? []).filter((m) => m.id !== moduleId),
      };
    }
    await save(next);
  }, [overrides, save]);

  return {
    overrides,
    saving,
    patchLesson,
    patchModule,
    addLesson,
    removeLesson,
    saveQuiz,
    addModule,
    deleteModuleById,
  };
}
