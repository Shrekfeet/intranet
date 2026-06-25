import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import {
  isTrainingRoleId,
  isTrainingStageId,
  trainingModules,
  trainingPathOrder,
  trainingPaths,
  type TrainingRoleId,
  type TrainingStageId,
} from "@/data/training-modules";
import { useCustomModules } from "@/hooks/use-custom-modules";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/PageHeader";

const Modules = () => {
  const { getModuleProgress } = useTrainingProgress();
  const { modules: customModules } = useCustomModules();
  const [searchParams, setSearchParams] = useSearchParams();
  const allModules = [...trainingModules, ...customModules];

  const roleParam = searchParams.get("role");
  const stageParam = searchParams.get("stage");

  const activeRole: TrainingRoleId = isTrainingRoleId(roleParam) ? roleParam : "technician";
  const activePath = trainingPaths[activeRole];
  const activeStage: TrainingStageId | null = isTrainingStageId(stageParam) ? stageParam : null;

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
      <PageHeader
        icon={BookOpen}
        label="Learning Paths"
        title="Role-Based Training"
        description="Follow the right learning path for your role, with shared company modules woven into each stage."
        iconClass="text-teal-600"
        bgClass="bg-teal-50/60 border border-teal-200/50"
      />

      {/* Role selector */}
      <div className="grid gap-3 md:grid-cols-2">
        {trainingPathOrder.map((role) => {
          const path = trainingPaths[role];
          const isActive = role === activeRole;

          return (
            <button
              key={path.id}
              type="button"
              onClick={() => updateFilters(role)}
              className={cn(
                "rounded-xl border p-5 text-left transition-all",
                isActive
                  ? "border-teal-400/60 bg-teal-50/60 shadow-sm"
                  : "border-border bg-card hover:border-teal-300/40 hover:shadow-sm",
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

      {/* Stage filter — tab-style */}
      <div className="rounded-xl border bg-card">
        <div className="px-5 pt-5 pb-3 border-b">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <p className="text-xs font-body font-bold uppercase tracking-wider text-muted-foreground">
                {activePath.title}
              </p>
              <h2 className="text-2xl mt-1">Structured by stages</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-body text-muted-foreground pb-1">
              <span className="rounded-md border px-3 py-1.5 bg-background">{sharedCount} shared</span>
              <span className="rounded-md border px-3 py-1.5 bg-background">{roleSpecificCount} role-specific</span>
            </div>
          </div>
        </div>

        {/* Tab row */}
        <div className="flex overflow-x-auto px-4">
          <button
            type="button"
            onClick={() => updateFilters(activeRole, null)}
            className={cn(
              "px-4 py-3 text-sm font-body border-b-2 transition-colors whitespace-nowrap flex-shrink-0",
              !activeStage
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            All stages
          </button>
          {activePath.stages.map((stage) => (
            <button
              key={stage.id}
              type="button"
              onClick={() => updateFilters(activeRole, stage.id)}
              className={cn(
                "px-4 py-3 text-sm font-body border-b-2 transition-colors whitespace-nowrap flex-shrink-0",
                activeStage === stage.id
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground",
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
                <p className="text-xs font-body font-bold uppercase tracking-wider text-muted-foreground">
                  {activePath.title}
                </p>
                <h3 className="text-2xl mt-1">{stage.label}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1 max-w-3xl">{stage.description}</p>
              </div>
              <p className="text-sm text-muted-foreground font-body">{modules.length} modules</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {modules.map((mod, i) => {
                const progress = getModuleProgress(mod.lessons.map((lesson) => lesson.id));

                return (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={`/modules/${mod.id}`}
                      state={{ fromSearch: currentSearch }}
                      className="block rounded-xl border bg-card p-6 transition-all hover:border-teal-400/40 hover:shadow-md group"
                    >
                      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 text-xs font-body font-medium uppercase tracking-wider text-muted-foreground">
                            <span>{mod.isShared ? "Shared module" : "Role-specific module"}</span>
                            <span>•</span>
                            <span>{mod.category}</span>
                          </div>
                          <h4 className="text-xl mt-2 group-hover:text-primary transition-colors">{mod.title}</h4>
                          <p className="text-sm text-muted-foreground font-body mt-1">{mod.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground font-body">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />{mod.estimatedTime}
                            </span>
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
