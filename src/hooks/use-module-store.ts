import { useMemo, useCallback } from "react";
import { trainingModules } from "@/data/training-modules";
import type { TrainingModule } from "@/data/training-modules";
import { useCustomModules } from "./use-custom-modules";
import { useContentOverrides } from "./use-content-overrides";

/**
 * Single source of truth for all training modules.
 * Merges static modules, admin-added modules, and legacy custom modules,
 * applying all content overrides (lesson edits, added/removed lessons, quiz overrides).
 */
export function useModuleStore() {
  const { modules: legacyCustom, remove: removeLegacyCustom } = useCustomModules();
  const overridesHook = useContentOverrides();
  const { overrides } = overridesHook;

  const allModules = useMemo<TrainingModule[]>(() => {
    const removedSet = new Set(overrides.removedModules ?? []);
    const removedLessons = overrides.removedLessons ?? {};
    const addedLessons = overrides.addedLessons ?? {};
    const quizOverrides = overrides.quizOverrides ?? {};
    const lessonOrder = overrides.lessonOrder ?? {};

    const applyLessonOverrides = (m: TrainingModule) => {
      const removedLessonIds = new Set(removedLessons[m.id] ?? []);
      const extraLessons = addedLessons[m.id] ?? [];
      const quizOverride = quizOverrides[m.id];
      const orderedIds = lessonOrder[m.id];

      const combined = [
        ...m.lessons
          .filter((l) => !removedLessonIds.has(l.id))
          .map((l) => {
            const lo = overrides.lessons[l.id] ?? {};
            return {
              ...l,
              title: lo.title ?? l.title,
              duration: lo.duration ?? l.duration,
              content: lo.content ?? l.content,
              section: lo.section ?? l.section,
            };
          }),
        ...extraLessons,
      ];

      const lessons = orderedIds
        ? [
            ...orderedIds.map((id) => combined.find((l) => l.id === id)).filter(Boolean) as typeof combined,
            ...combined.filter((l) => !orderedIds.includes(l.id)),
          ]
        : combined;

      return { ...m, lessons, quiz: quizOverride ?? m.quiz };
    };

    // Static modules with overrides applied
    const processed = trainingModules
      .filter((m) => !removedSet.has(m.id))
      .map((m) => {
        const modOverride = overrides.modules[m.id] ?? {};
        return applyLessonOverrides({
          ...m,
          title: modOverride.title ?? m.title,
          description: modOverride.description ?? m.description,
          estimatedTime: modOverride.estimatedTime ?? m.estimatedTime,
        });
      });

    // Admin-added modules (GitHub-synced)
    const addedMods = (overrides.addedModules ?? [])
      .filter((m) => !removedSet.has(m.id))
      .map(applyLessonOverrides);

    // Legacy custom modules (localStorage only) — exclude anything already in the above lists
    const knownIds = new Set([...processed.map((m) => m.id), ...addedMods.map((m) => m.id)]);
    const legacy = legacyCustom.filter((m) => !knownIds.has(m.id) && !removedSet.has(m.id));

    return [...processed, ...addedMods, ...legacy];
  }, [overrides, legacyCustom]);

  // Wraps removeLesson to auto-detect whether the lesson is static or dynamic
  const removeLesson = useCallback(
    async (moduleId: string, lessonId: string) => {
      const staticMod = trainingModules.find((m) => m.id === moduleId);
      const isStaticLesson = staticMod ? staticMod.lessons.some((l) => l.id === lessonId) : false;
      await overridesHook.removeLesson(moduleId, lessonId, isStaticLesson);
    },
    [overridesHook],
  );

  // Wraps deleteModule to handle static, override-added, and legacy custom modules
  const deleteModule = useCallback(
    async (moduleId: string) => {
      const isStatic = trainingModules.some((m) => m.id === moduleId);
      const isOverrideModule = (overrides.addedModules ?? []).some((m) => m.id === moduleId);
      if (isStatic || isOverrideModule) {
        await overridesHook.deleteModuleById(moduleId, isStatic);
      } else {
        removeLegacyCustom(moduleId);
      }
    },
    [overrides.addedModules, overridesHook, removeLegacyCustom],
  );

  return {
    allModules,
    saving: overridesHook.saving,
    patchLesson: overridesHook.patchLesson,
    patchModule: overridesHook.patchModule,
    addLesson: overridesHook.addLesson,
    removeLesson,
    saveQuiz: overridesHook.saveQuiz,
    addModule: overridesHook.addModule,
    deleteModule,
    reorderLessons: overridesHook.reorderLessons,
  };
}
