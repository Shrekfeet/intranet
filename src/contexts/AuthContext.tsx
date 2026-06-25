import { createContext, useContext, useState } from "react";
import { teamUsers, findUser } from "@/data/users";

export interface AuthSession {
  userId: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextValue {
  session: AuthSession | null;
  user: { id: string; name: string } | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (username: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => void;
}

const SESSION_KEY = "sf-auth-session";

function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(loadSession);

  const signIn = async (username: string, password: string): Promise<{ error: Error | null }> => {
    const user = findUser(username.trim().toLowerCase());
    if (!user) return { error: new Error("Invalid username or password.") };

    const hash = await sha256(password);
    if (hash !== user.passwordHash) return { error: new Error("Invalid username or password.") };

    const s: AuthSession = { userId: user.id, name: user.name, isAdmin: !!user.isAdmin };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setSession(s);
    return { error: null };
  };

  const signOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  const user = session ? { id: session.userId, name: session.name } : null;

  return (
    <AuthContext.Provider value={{ session, user, isAdmin: session?.isAdmin ?? false, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
