/**
 * Lightweight GitHub API client for reading/writing progress.json in a private repo.
 * Uses a fine-grained PAT scoped to Contents: Read+Write on that one repo.
 */

const OWNER = import.meta.env.VITE_GITHUB_OWNER as string;
const REPO = import.meta.env.VITE_GITHUB_REPO as string;
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN as string;
const FILE = import.meta.env.VITE_GITHUB_FILE ?? "progress.json";

export type ProgressData = Record<string, string[]>;

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

export const isGitHubConfigured =
  !!OWNER && OWNER !== "your-github-username" &&
  !!REPO && REPO !== "your-progress-repo" &&
  !!TOKEN && TOKEN !== "your-github-pat-here";

interface GitHubFile {
  sha: string;
  content: ProgressData;
}

async function fetchFile(): Promise<GitHubFile | null> {
  const res = await fetch(apiUrl(), { headers: headers() });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  const decoded = atob(data.content.replace(/\n/g, ""));
  return { sha: data.sha, content: JSON.parse(decoded) };
}

async function writeFile(content: ProgressData, sha: string | null, message: string): Promise<string> {
  const encoded = btoa(JSON.stringify(content, null, 2));
  const body: Record<string, string> = { message, content: encoded };
  if (sha) body.sha = sha;

  const res = await fetch(apiUrl(), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (res.status === 409) throw new Error("conflict");
  if (!res.ok) throw new Error(`GitHub write error: ${res.status}`);
  const data = await res.json();
  return data.content.sha;
}

export async function loadProgress(): Promise<ProgressData> {
  const file = await fetchFile();
  return file?.content ?? {};
}

export async function saveUserLessons(userId: string, lessonIds: string[]): Promise<void> {
  let attempts = 0;
  while (attempts < 3) {
    try {
      const file = await fetchFile();
      const updated: ProgressData = { ...(file?.content ?? {}), [userId]: lessonIds };
      await writeFile(updated, file?.sha ?? null, `Progress update: ${userId}`);
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
