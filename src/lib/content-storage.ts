/**
 * GitHub API storage for content overrides.
 * Writes to content-overrides.json in the same private repo as progress.json.
 */

import type { Lesson, Quiz, TrainingModule } from "@/data/training-modules";

const OWNER = import.meta.env.VITE_GITHUB_OWNER as string;
const REPO = import.meta.env.VITE_GITHUB_REPO as string;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;
const FILE = "content-overrides.json";

export const isGitHubConfigured =
  !!OWNER && OWNER !== "your-github-username" &&
  !!REPO && REPO !== "your-progress-repo" &&
  !!TOKEN && TOKEN !== "your-github-pat-here";

export interface LessonOverride {
  title?: string;
  duration?: string;
  content?: string;
}

export interface ModuleOverride {
  title?: string;
  description?: string;
  estimatedTime?: string;
}

export interface ContentOverrides {
  lessons: Record<string, LessonOverride>;
  modules: Record<string, ModuleOverride>;
  addedLessons: Record<string, Lesson[]>;
  removedLessons: Record<string, string[]>;
  quizOverrides: Record<string, Quiz>;
  addedModules: TrainingModule[];
  removedModules: string[];
  lessonOrder: Record<string, string[]>;
}

function normalize(raw: Partial<ContentOverrides>): ContentOverrides {
  return {
    lessons: raw.lessons ?? {},
    modules: raw.modules ?? {},
    addedLessons: raw.addedLessons ?? {},
    removedLessons: raw.removedLessons ?? {},
    quizOverrides: raw.quizOverrides ?? {},
    addedModules: raw.addedModules ?? [],
    removedModules: raw.removedModules ?? [],
    lessonOrder: raw.lessonOrder ?? {},
  };
}

export const EMPTY_OVERRIDES: ContentOverrides = normalize({});

const LOCAL_KEY = "sf-content-overrides";

function apiUrl() {
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE}`;
}

function headers() {
  return {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };
}

interface GitHubFile {
  sha: string;
  content: ContentOverrides;
}

async function fetchFile(): Promise<GitHubFile | null> {
  const res = await fetch(apiUrl(), { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const decoded = atob(data.content.replace(/\n/g, ""));
  return { sha: data.sha, content: normalize(JSON.parse(decoded)) };
}

async function writeFile(content: ContentOverrides, sha: string | null, message: string): Promise<void> {
  const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2))));
  const body: Record<string, string> = { message, content: encoded };
  if (sha) body.sha = sha;

  const res = await fetch(apiUrl(), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (res.status === 409) throw new Error("conflict");
  if (!res.ok) throw new Error(`GitHub write error: ${res.status}`);
}

export async function loadContentOverrides(): Promise<ContentOverrides> {
  if (!isGitHubConfigured) {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? normalize(JSON.parse(raw)) : EMPTY_OVERRIDES;
    } catch {
      return EMPTY_OVERRIDES;
    }
  }
  try {
    const file = await fetchFile();
    const data = file?.content ?? EMPTY_OVERRIDES;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
    return data;
  } catch {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? normalize(JSON.parse(raw)) : EMPTY_OVERRIDES;
    } catch {
      return EMPTY_OVERRIDES;
    }
  }
}

export async function saveContentOverrides(overrides: ContentOverrides): Promise<void> {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(overrides));
  window.dispatchEvent(new CustomEvent("content-overrides:changed", { detail: overrides }));

  if (!isGitHubConfigured) return;

  let attempts = 0;
  while (attempts < 3) {
    try {
      const file = await fetchFile();
      await writeFile(overrides, file?.sha ?? null, "Content update");
      return;
    } catch (err) {
      if (err instanceof Error && err.message === "conflict" && attempts < 2) {
        attempts++;
        await new Promise((r) => setTimeout(r, 300 * attempts));
        continue;
      }
      throw err;
    }
  }
}
