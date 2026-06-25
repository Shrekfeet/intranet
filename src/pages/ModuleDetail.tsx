import { useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Circle, Clock, ChevronDown } from "lucide-react";
import { trainingModules, trainingPaths } from "@/data/training-modules";
import { useCustomModules } from "@/hooks/use-custom-modules";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const { modules: customModules } = useCustomModules();
  const mod = [...trainingModules, ...customModules].find((m) => m.id === moduleId);
  const { isCompleted, toggleLesson, getModuleProgress } = useTrainingProgress();
  const [openLesson, setOpenLesson] = useState<string | null>(null);

  if (!mod) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl mb-2">Module Not Found</h1>
        <Link to="/modules" className="text-primary underline font-body">Back to Modules</Link>
      </div>
    );
  }

  const progress = getModuleProgress(mod.lessons.map((l) => l.id));
  const backTo = typeof location.state?.fromSearch === "string" && location.state.fromSearch.length > 0
    ? `/modules?${location.state.fromSearch}`
    : "/modules";
  const audienceLabel = mod.roles.length === 2
    ? "Shared for lawn technicians and office staff"
    : `For ${trainingPaths[mod.roles[0]].title}`;
  const stageLabel = mod.roles.length === 2
    ? trainingPaths.technician.stages.find((stage) => stage.id === mod.stage)?.label
    : trainingPaths[mod.roles[0]].stages.find((stage) => stage.id === mod.stage)?.label;

  return (
    <div className="space-y-6">
      <Link to={backTo} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
        <ArrowLeft className="h-4 w-4" /> Back to Modules
      </Link>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="bg-card border rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs font-body font-medium uppercase tracking-wider text-muted-foreground">
            <span>{mod.category}</span>
            <span>•</span>
            <span>{stageLabel}</span>
          </div>
          <h1 className="text-3xl mt-2 mb-2">{mod.title}</h1>
          <p className="text-muted-foreground font-body mb-2">{mod.description}</p>
          <p className="text-sm font-body text-muted-foreground mb-4">{audienceLabel}</p>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground font-body mb-4">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{mod.estimatedTime}</span>
            <span>{mod.lessons.length} lessons</span>
            <span>{progress.done} completed</span>
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress.percent} className="h-3 flex-1" />
            <span className="text-sm font-body font-medium">{progress.percent}%</span>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const completed = isCompleted(lesson.id);
          const isOpen = openLesson === lesson.id;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="bg-card border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenLesson(isOpen ? null : lesson.id)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {completed ? (
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-medium text-base">{lesson.title}</h3>
                  <span className="text-xs text-muted-foreground font-body">{lesson.duration}</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-5 pb-5 border-t">
                      <div className="pt-4 prose prose-sm max-w-none font-body text-foreground">
                        {lesson.content.split("\n\n").map((block, bi) => (
                          <div key={bi} className="mb-3">
                            {block.split("\n").map((line, li) => {
                              if (line.startsWith("**") && line.endsWith("**")) {
                                return <p key={li} className="font-semibold text-foreground">{line.replace(/\*\*/g, "")}</p>;
                              }
                              if (line.startsWith("- ")) {
                                return <p key={li} className="ml-4 text-muted-foreground">• {line.slice(2)}</p>;
                              }
                              if (/^\d+\./.test(line)) {
                                return <p key={li} className="ml-4 text-muted-foreground">{line}</p>;
                              }
                              return <p key={li} className="text-muted-foreground">{line.replace(/\*\*/g, "")}</p>;
                            })}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t flex justify-end">
                        <Button
                          onClick={(e) => { e.stopPropagation(); toggleLesson(lesson.id); }}
                          variant={completed ? "outline" : "default"}
                          size="sm"
                        >
                          {completed ? "Mark Incomplete" : "Mark Complete"}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ModuleDetail;
