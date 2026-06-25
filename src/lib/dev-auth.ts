// Simple client-side gate for the /dev section.
// NOTE: This is NOT real security — the password ships in the bundle.
// It only keeps casual visitors out. Change anytime.
export const DEV_PASSWORD = "shrek-dev-2025";

const STORAGE_KEY = "shrekfeet:dev-unlocked";

export function isDevUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlockDev(password: string): boolean {
  if (password !== DEV_PASSWORD) return false;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore
  }
  return true;
}

export function lockDev(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
