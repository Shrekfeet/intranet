import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { loadProgress, isGitHubConfigured, type ProgressData } from "@/lib/github-storage";
import { teamUsers } from "@/data/users";
import { trainingModules } from "@/data/training-modules";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, AlertTriangle } from "lucide-react";

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const [progressData, setProgressData] = useState<ProgressData>({});
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    if (!isGitHubConfigured) { setFetching(false); return; }
    loadProgress()
      .then(setProgressData)
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [isAdmin]);

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/" replace />;

  const allLessons = trainingModules.flatMap((m) => m.lessons.map((l) => l.id));
  const totalLessons = allLessons.length;

  const teamProgress = teamUsers.map((u) => ({
    ...u,
    done: (progressData[u.id] ?? []).length,
  }));

  const teamTotal = teamProgress.reduce((s, u) => s + u.done, 0);
  const teamAvg = teamUsers.length > 0
    ? Math.round(teamTotal / (teamUsers.length * totalLessons) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="rounded-2xl bg-primary/5 border border-primary/15 p-6 md:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-body font-bold uppercase tracking-widest text-primary">
            Admin Only
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl">Team Progress Dashboard</h1>
        <p className="text-muted-foreground font-body mt-2">
          Training completion for all {teamUsers.length} team members.
        </p>
      </div>

      {/* GitHub not configured warning */}
      {!isGitHubConfigured && (
        <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-body text-amber-800">
          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">GitHub storage not configured</p>
            <p className="mt-0.5">Progress data is stored locally in each person's browser only. Add GitHub credentials to <code className="bg-amber-100 px-1 rounded">.env</code> to see central progress here.</p>
          </div>
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="font-heading font-extrabold text-2xl text-primary">{teamUsers.length}</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">Team members</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center">
          <p className="font-heading font-extrabold text-2xl text-primary">{totalLessons}</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">Total lessons</p>
        </div>
        <div className="rounded-xl border bg-card p-4 text-center col-span-2 sm:col-span-1">
          <p className="font-heading font-extrabold text-2xl text-primary">{teamAvg}%</p>
          <p className="font-body text-xs text-muted-foreground mt-0.5">Team avg completion</p>
        </div>
      </div>

      {/* Per-user table */}
      <div className="space-y-4">
        <h2 className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          Per-person breakdown
        </h2>
        {fetching ? (
          <p className="text-muted-foreground font-body">Loading progress…</p>
        ) : (
          <div className="rounded-xl border overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm font-body">
              <thead>
                <tr className="bg-muted/60 border-b">
                  <th className="text-left font-bold px-4 py-3">Name</th>
                  <th className="text-left font-bold px-4 py-3">Progress</th>
                  <th className="text-right font-bold px-4 py-3">Lessons</th>
                </tr>
              </thead>
              <tbody>
                {teamProgress.map((u) => {
                  const pct = totalLessons ? Math.round((u.done / totalLessons) * 100) : 0;
                  return (
                    <tr key={u.id} className="border-t">
                      <td className="px-4 py-3 font-medium">
                        {u.name}
                        {u.isAdmin && (
                          <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            Admin
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Progress value={pct} className="h-2 flex-1 max-w-40" />
                          <span className="text-xs font-semibold text-foreground/70 w-8 text-right">
                            {pct}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {u.done}/{totalLessons}
                        {pct === 100 && (
                          <Badge className="ml-2 bg-success/15 text-success border-0 text-[10px]">Done</Badge>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Per-module breakdown */}
      {!fetching && (
        <div className="space-y-4">
          <h2 className="text-xl flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            Module breakdown
          </h2>
          <div className="grid gap-3">
            {trainingModules.map((mod) => {
              const lessonIds = mod.lessons.map((l) => l.id);
              const userBreakdown = teamUsers.map((u) => ({
                name: u.name,
                done: (progressData[u.id] ?? []).filter((id) => lessonIds.includes(id)).length,
                total: lessonIds.length,
              }));
              const totalDone = userBreakdown.reduce((s, u) => s + u.done, 0);
              const maxPossible = teamUsers.length * lessonIds.length;
              const pct = maxPossible ? Math.round((totalDone / maxPossible) * 100) : 0;

              return (
                <div key={mod.id} className="rounded-xl border bg-card p-4">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <p className="font-body font-semibold text-sm truncate">{mod.title}</p>
                      <p className="text-xs text-muted-foreground font-body">
                        {mod.category} · {lessonIds.length} lessons
                      </p>
                    </div>
                    <span className="font-heading font-bold text-primary text-lg flex-shrink-0">
                      {pct}%
                    </span>
                  </div>
                  <Progress value={pct} className="h-1.5" />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {userBreakdown.map((u) => (
                      <span
                        key={u.name}
                        className={`text-[10px] font-body px-2 py-0.5 rounded-full ${
                          u.done === u.total
                            ? "bg-success/15 text-success font-semibold"
                            : u.done > 0
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {u.name} {u.done}/{u.total}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
