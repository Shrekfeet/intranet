import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { isGitHubConfigured } from "@/lib/github-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import logo from "@/assets/logo.ico";

const Login = () => {
  const { session, signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (session) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signIn(username, password);
    setSubmitting(false);
    if (err) setError(err.message);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="Shrekfeet" className="h-14 w-14 rounded-2xl object-contain" />
          <div className="text-center">
            <h1 className="text-2xl font-heading font-black text-foreground tracking-tight">
              Shrekfeet Intranet
            </h1>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Sign in to access the team portal
            </p>
          </div>
        </div>

        {/* Setup warning when GitHub storage isn't configured */}
        {!isGitHubConfigured && (
          <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-body text-amber-800">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">GitHub storage not configured</p>
              <p>
                Progress will save locally in this browser only.
                Add your GitHub credentials to <code className="bg-amber-100 px-1 rounded">.env</code> to
                enable central progress tracking. See <strong>README.md</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Login card */}
        <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-body font-medium text-foreground" htmlFor="username">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. harry"
                required
                autoComplete="username"
                autoCapitalize="none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-body font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive font-body">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-xs text-center text-muted-foreground font-body">
          Contact Harry if you need access or have forgotten your password.
        </p>
      </div>
    </div>
  );
};

export default Login;
