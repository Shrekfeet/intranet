import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { loadProgress, saveUserLessons, isGitHubConfigured } from "@/lib/github-storage";

const LOCAL_KEY = (userId: string) => `sf-progress-${userId}`;

function loadLocal(userId: string): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY(userId));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocal(userId: string, lessons: string[]) {
  localStorage.setItem(LOCAL_KEY(userId), JSON.stringify(lessons));
}

export function useTrainingProgress() {
  const { session } = useAuth();
  const userId = session?.userId ?? null;
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setCompletedLessons([]);
      setLoading(false);
      return;
    }
    if (isGitHubConfigured) {
      setLoading(true);
      loadProgress()
        .then((data) => {
          const lessons = data[userId] ?? [];
          setCompletedLessons(lessons);
          saveLocal(userId, lessons);
        })
        .catch(() => {
          setCompletedLessons(loadLocal(userId));
        })
        .finally(() => setLoading(false));
    } else {
      setCompletedLessons(loadLocal(userId));
      setLoading(false);
    }
  }, [userId]);

  const toggleLesson = useCallback(
    (lessonId: string) => {
      if (!userId) return;
      setCompletedLessons((prev) => {
        const next = prev.includes(lessonId)
          ? prev.filter((id) => id !== lessonId)
          : [...prev, lessonId];
        saveLocal(userId, next);
        if (isGitHubConfigured) {
          saveUserLessons(userId, next).catch(console.error);
        }
        return next;
      });
    },
    [userId],
  );

  const isCompleted = useCallback(
    (lessonId: string) => completedLessons.includes(lessonId),
    [completedLessons],
  );

  const getModuleProgress = useCallback(
    (lessonIds: string[]) => {
      const done = lessonIds.filter((id) => completedLessons.includes(id)).length;
      return {
        done,
        total: lessonIds.length,
        percent: lessonIds.length ? Math.round((done / lessonIds.length) * 100) : 0,
      };
    },
    [completedLessons],
  );

  return { completedLessons, toggleLesson, isCompleted, getModuleProgress, loading };
}
