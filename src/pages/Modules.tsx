import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BookOpen, Clock, Plus, Trash2, Loader2 } from "lucide-react";
import {
  isTrainingRoleId,
  isTrainingStageId,
  trainingPathOrder,
  trainingPaths,
  type TrainingRoleId,
  type TrainingStageId,
} from "@/data/training-modules";
import { useModuleStore } from "@/hooks/use-module-store";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";
import { InDevBanner } from "@/components/InDevBanner";

const STAGE_OPTIONS = trainingPaths.technician.stages.map((s) => ({ id: s.id, label: s.label }));

const INPUT_CLS = "w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40";

const Modules = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { allModules, saving, addModule, deleteModule } = useModuleStore();
  const { getModuleProgress } = useTrainingProgress();
  const [searchParams, setSearchParams] = useSearchParams();

  const roleParam = searchParams.get("role");
  const stageParam = searchParams.get("stage");
  const activeRole: TrainingRoleId = isTrainingRoleId(roleParam) ? roleParam : "technician";
  const activePath = trainingPaths[activeRole];
  const activeStage: TrainingStageId | null = isTrainingStageId(stageParam) ? stageParam : null;

  // Add module form state
  const [addingModule, setAddingModule] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTime, setNewTime] = useState("30 min");
  const [newCategory, setNewCategory] = useState("Custom Module");
  const [newStage, setNewStage] = useState<TrainingStageId>("company-basics");
  const [newRoles, setNewRoles] = useState<TrainingRoleId[]>(["technician", "office"]);

  // Delete confirmation state
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const toggleRole = (role: TrainingRoleId) => {
    setNewRoles((prev) =>
      prev.includes(role)
        ? prev.length > 1 ? prev.filter((r) => r !== role) : prev
        : [...prev, role],
    );
  };

  const handleCreateModule = async () => {
    if (!newTitle.trim()) return;
    const id = await addModule({
      title: newTitle.trim(),
      description: newDescription.trim() || "No description yet.",
      estimatedTime: newTime.trim() || "30 min",
      category: newCategory.trim() || "Custom Module",
      stage: newStage,
      roles: newRoles,
      isShared: newRoles.length === 2,
      icon: "BookOpen",
      lessons: [],
    });
    setAddingModule(false);
    setNewTitle("");
    setNewDescription("");
    setNewTime("30 min");
    setNewCategory("Custom Module");
    setNewStage("company-basics");
    setNewRoles(["technician", "office"]);
    navigate(`/modules/${id}`);
  };

  const handleDeleteModule = async (moduleId: string) => {
    await deleteModule(moduleId);
    setConfirmDelete(null);
  };

  const stageModules = activePath.stages.map((stage) => ({
    stage,
    modules: allModules.filter((mod) => mod.roles.includes(activeRole) && mod.stage === stage.id),
  }));

  const visibleStages = activeStage
    ? stageModules.filter(({ stage }) => stage.id === activeStage)
    : stageModules;

  const sharedCount = allModules.filter((mod) => mod.isShared && mod.roles.includes(activeRole)).length;
  const roleSpecificCount = allModules.filter((mod) => !mod.isShared && mod.roles.includes(activeRole)).length;

  const updateFilters = (role: TrainingRoleId, stage?: TrainingStageId | null) => {
    const next = new URLSearchParams();
    next.set("role", role);
    if (stage) next.set("stage", stage);
    setSearchParams(next);
  };

  const currentSearch = searchParams.toString();

  return (
    <div className="space-y-8">
      <InDevBanner reason="Training modules are being written and structured. Content is a work in progress and may not yet reflect Shrekfeet's exact onboarding process." />
      <PageHeader
        icon={BookOpen}
        label="Learning Paths"
        title="Role-Based Training"
        description="Follow the right learning path for your role, with shared company modules woven into each stage."
        iconClass="text-teal-600"
        bgClass="bg-teal-50/60 border border-teal-200/50"
      />

      {/* Admin: add module */}
      {isAdmin && (
        <div className="rounded-xl border bg-card overflow-hidden">
          {addingModule ? (
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-body font-semibold">New training module</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Title <span className="text-destructive">*</span></label>
                  <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Advanced Weed Control" className={INPUT_CLS} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Estimated time</label>
                  <input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="e.g. 30 min" className={INPUT_CLS} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Description</label>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={2} placeholder="What will staff learn in this module?" className={`${INPUT_CLS} resize-none`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Stage</label>
                  <select value={newStage} onChange={(e) => setNewStage(e.target.value as TrainingStageId)} className={INPUT_CLS}>
                    {STAGE_OPTIONS.map((s) => (
                      <option key={s.id} value={s.id}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Category label</label>
                  <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Shared Knowledge" className={INPUT_CLS} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Visible to</label>
                <div className="flex gap-4">
                  {(["technician", "office"] as TrainingRoleId[]).map((role) => (
                    <label key={role} className="flex items-center gap-2 text-sm font-body cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newRoles.includes(role)}
                        onChange={() => toggleRole(role)}
                        className="rounded"
                      />
                      {trainingPaths[role].title}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button variant="outline" size="sm" onClick={() => setAddingModule(false)} disabled={saving}>Cancel</Button>
                <Button size="sm" onClick={handleCreateModule} disabled={!newTitle.trim() || saving}>
                  {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Plus className="h-3.5 w-3.5 mr-1.5" />}
                  Create module
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAddingModule(true)}
              className="w-full flex items-center justify-center gap-2 p-4 text-sm font-body text-primary hover:bg-primary/5 transition-colors"
            >
              <Plus className="h-4 w-4" /> Add new training module
            </button>
          )}
        </div>
      )}

      {/* Role selector */}
      <div className="grid gap-3 md:grid-cols-2">
        {trainingPathOrder.map((role) => {
          const path = trainingPaths[role];
          const isActive = role === activeRole;
          return (
            <button
              key={path.id} type="button"
              onClick={() => updateFilters(role)}
              className={cn(
                "rounded-xl border p-5 text-left transition-all",
                isActive ? "border-teal-400/60 bg-teal-50/60 shadow-sm" : "border-border bg-card hover:border-teal-300/40 hover:shadow-sm",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className={cn("text-xl", isActive && "text-teal-700")}>{path.title}</h2>
                  <p className="text-sm text-muted-foreground font-body mt-1">{path.description}</p>
                </div>
                <div className="text-right text-xs font-body text-muted-foreground flex-shrink-0">
                  <p>{path.stages.length} stages</p>
                  <p>{allModules.filter((mod) => mod.roles.includes(role)).length} modules</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stage filter */}
      <div className="rounded-xl border bg-card">
        <div className="px-5 pt-5 pb-3 border-b">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-body font-bold uppercase tracking-wider text-muted-foreground">{activePath.title}</p>
              <h2 className="text-2xl mt-1">Structured by stages</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-body text-muted-foreground pb-1">
              <span className="rounded-md border px-3 py-1.5 bg-background">{sharedCount} shared</span>
              <span className="rounded-md border px-3 py-1.5 bg-background">{roleSpecificCount} role-specific</span>
            </div>
          </div>
        </div>
        <div className="flex overflow-x-auto px-4">
          <button
            type="button" onClick={() => updateFilters(activeRole, null)}
            className={cn(
              "px-4 py-3 text-sm font-body border-b-2 transition-colors whitespace-nowrap flex-shrink-0",
              !activeStage ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            All stages
          </button>
          {activePath.stages.map((stage) => (
            <button
              key={stage.id} type="button"
              onClick={() => updateFilters(activeRole, stage.id)}
              className={cn(
                "px-4 py-3 text-sm font-body border-b-2 transition-colors whitespace-nowrap flex-shrink-0",
                activeStage === stage.id ? "border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {stage.navLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Module list */}
      <div className="space-y-6">
        {visibleStages.map(({ stage, modules }) => (
          <section key={stage.id} className="space-y-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-body font-bold uppercase tracking-wider text-muted-foreground">{activePath.title}</p>
                <h3 className="text-2xl mt-1">{stage.label}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1 max-w-3xl">{stage.description}</p>
              </div>
              <p className="text-sm text-muted-foreground font-body">{modules.length} modules</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {modules.map((mod, i) => {
                const progress = getModuleProgress(mod.lessons.map((lesson) => lesson.id));
                const isConfirming = confirmDelete === mod.id;

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <div className="relative rounded-xl border bg-card transition-all hover:border-teal-400/40 hover:shadow-md group">
                      <Link
                        to={`/modules/${mod.id}`}
                        state={{ fromSearch: currentSearch }}
                        className="block p-6"
                      >
                        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                          {mod.emoji && (
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl select-none hidden lg:flex">
                              {mod.emoji}
                            </div>
                          )}
                          <div className="flex-1 pr-8">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-body font-medium uppercase tracking-wider text-muted-foreground">
                              {mod.emoji && <span className="text-base lg:hidden">{mod.emoji}</span>}
                              <span>{mod.isShared ? "Shared module" : "Role-specific module"}</span>
                              <span>•</span>
                              <span>{mod.category}</span>
                            </div>
                            <h4 className="text-xl mt-2 group-hover:text-primary transition-colors">{mod.title}</h4>
                            <p className="text-sm text-muted-foreground font-body mt-1">{mod.description}</p>
                            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground font-body">
                              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{mod.estimatedTime}</span>
                              <span>{mod.lessons.length} lessons</span>
                              <span>{mod.roles.length === 2 ? "Shared across both roles" : activePath.title}</span>
                            </div>
                          </div>
                          <div className="lg:w-44 flex flex-col items-start lg:items-end gap-2">
                            <span className="text-sm font-body font-medium">
                              {progress.percent === 100
                                ? <span className="text-success">Complete ✓</span>
                                : <span>{progress.percent}% complete</span>}
                            </span>
                            <Progress value={progress.percent} className="h-2 w-full" />
                          </div>
                        </div>
                      </Link>

                      {/* Admin delete control — sits over the card, outside the Link */}
                      {isAdmin && (
                        <div className="absolute top-3 right-3">
                          {isConfirming ? (
                            <div className="flex items-center gap-1.5 bg-card border rounded-lg shadow-sm px-3 py-1.5 text-xs font-body">
                              <span className="text-muted-foreground">Delete?</span>
                              <button
                                onClick={() => handleDeleteModule(mod.id)}
                                className="text-destructive font-semibold hover:underline"
                                disabled={saving}
                              >
                                {saving ? <Loader2 className="h-3 w-3 animate-spin inline" /> : "Yes"}
                              </button>
                              <button onClick={() => setConfirmDelete(null)} className="text-muted-foreground hover:underline">No</button>
                            </div>
                          ) : (
                            <button
                              onClick={(e) => { e.preventDefault(); setConfirmDelete(mod.id); }}
                              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                              title="Delete module"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Modules;
