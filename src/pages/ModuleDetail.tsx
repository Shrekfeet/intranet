import { useState, useEffect, useMemo } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Circle, Clock, ChevronDown,
  Trophy, RotateCcw, Pencil, Save, X, Loader2,
} from "lucide-react";
import { trainingModules, trainingPaths, type Quiz, type Lesson, type TrainingModule } from "@/data/training-modules";
import { useCustomModules } from "@/hooks/use-custom-modules";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { useContentOverrides } from "@/hooks/use-content-overrides";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Content renderer ─────────────────────────────────────────────────────────

function LessonContent({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none font-body text-foreground">
      {content.split("\n\n").map((block, bi) => (
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
            if (line.startsWith("⚠️")) {
              return <p key={li} className="text-amber-700 font-body font-medium">{line}</p>;
            }
            return <p key={li} className="text-muted-foreground">{line.replace(/\*\*/g, "")}</p>;
          })}
        </div>
      ))}
    </div>
  );
}

// ── Lesson editor ─────────────────────────────────────────────────────────────

interface LessonEditorProps {
  lesson: Lesson;
  onSave: (patch: Partial<Lesson>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function LessonEditor({ lesson, onSave, onCancel, saving }: LessonEditorProps) {
  const [title, setTitle] = useState(lesson.title);
  const [duration, setDuration] = useState(lesson.duration);
  const [content, setContent] = useState(lesson.content);

  const dirty = title !== lesson.title || duration !== lesson.duration || content !== lesson.content;

  return (
    <div className="space-y-4 pt-4">
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-xs font-body text-amber-800">
        <strong>Formatting guide:</strong> <code className="bg-amber-100 px-1 rounded">**text**</code> = bold heading &nbsp;·&nbsp;
        <code className="bg-amber-100 px-1 rounded">- item</code> = bullet &nbsp;·&nbsp;
        <code className="bg-amber-100 px-1 rounded">1. item</code> = numbered list &nbsp;·&nbsp;
        blank line = new paragraph
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Lesson title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 10 min"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={20}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y leading-relaxed"
        />
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs font-body text-muted-foreground">
          {dirty ? "Unsaved changes" : "No changes"}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
            <X className="h-3.5 w-3.5 mr-1.5" /> Cancel
          </Button>
          <Button size="sm" onClick={() => onSave({ title, duration, content })} disabled={!dirty || saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Module info editor ────────────────────────────────────────────────────────

interface ModuleEditorProps {
  mod: TrainingModule;
  onSave: (patch: { title: string; description: string; estimatedTime: string }) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function ModuleInfoEditor({ mod, onSave, onCancel, saving }: ModuleEditorProps) {
  const [title, setTitle] = useState(mod.title);
  const [description, setDescription] = useState(mod.description);
  const [estimatedTime, setEstimatedTime] = useState(mod.estimatedTime);

  const dirty = title !== mod.title || description !== mod.description || estimatedTime !== mod.estimatedTime;

  return (
    <div className="mt-4 pt-4 border-t space-y-3">
      <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Editing module info</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-body text-muted-foreground">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-body text-muted-foreground">Estimated time</label>
          <input
            value={estimatedTime}
            onChange={(e) => setEstimatedTime(e.target.value)}
            placeholder="e.g. 30 min"
            className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-body text-muted-foreground">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
          <X className="h-3.5 w-3.5 mr-1.5" /> Cancel
        </Button>
        <Button size="sm" onClick={() => onSave({ title, description, estimatedTime })} disabled={!dirty || saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
          Save
        </Button>
      </div>
    </div>
  );
}

// ── Quiz section ──────────────────────────────────────────────────────────────

function QuizSection({ quiz, moduleId }: { quiz: Quiz; moduleId: string }) {
  const STORAGE_KEY = `sf-quiz-${moduleId}`;

  const [passed, setPassed] = useState<boolean | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
    return null;
  });
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanations, setShowExplanations] = useState(false);

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined);
  const score = submitted
    ? Math.round((quiz.questions.filter((q, i) => answers[i] === q.correct).length / quiz.questions.length) * 100)
    : 0;

  const handleSubmit = () => {
    const correct = quiz.questions.filter((q, i) => answers[i] === q.correct).length;
    const pct = Math.round((correct / quiz.questions.length) * 100);
    const didPass = pct >= quiz.passMark;
    setPassed(didPass);
    setSubmitted(true);
    localStorage.setItem(STORAGE_KEY, String(didPass));
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanations(false);
    setPassed(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="mt-6 rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
      <div className="px-6 py-5 border-b bg-primary/5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg">Module Knowledge Test</h3>
            <p className="text-sm font-body text-muted-foreground mt-0.5">
              {quiz.questions.length} questions · Pass mark {quiz.passMark}%
            </p>
          </div>
          {passed === true && (
            <span className="ml-auto text-sm font-body font-semibold text-success flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Passed
            </span>
          )}
        </div>
      </div>

      {submitted && (
        <div className={cn(
          "px-6 py-4 border-b flex items-center justify-between gap-4",
          passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        )}>
          <div>
            <p className={cn("font-body font-semibold text-base", passed ? "text-green-800" : "text-red-800")}>
              {passed ? "Well done — you passed!" : "Not quite — have another go"}
            </p>
            <p className={cn("text-sm font-body mt-0.5", passed ? "text-green-700" : "text-red-700")}>
              You scored {score}% ({quiz.questions.filter((q, i) => answers[i] === q.correct).length} of {quiz.questions.length} correct).
              {!passed && ` Pass mark is ${quiz.passMark}%.`}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => setShowExplanations(!showExplanations)}>
              {showExplanations ? "Hide" : "Show"} answers
            </Button>
            {!passed && (
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Retry
              </Button>
            )}
          </div>
        </div>
      )}

      <div className="divide-y">
        {quiz.questions.map((q, qi) => {
          const selected = answers[qi];
          const isCorrect = submitted && selected === q.correct;
          const isWrong = submitted && selected !== undefined && selected !== q.correct;

          return (
            <div key={q.id} className="px-6 py-5">
              <p className="font-body font-medium text-sm mb-3">
                <span className="text-muted-foreground mr-2">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isCorrectOpt = submitted && oi === q.correct;
                  const isWrongSelected = submitted && isSelected && oi !== q.correct;
                  void isCorrect; void isWrong;

                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={cn(
                        "w-full text-left text-sm font-body rounded-lg border px-4 py-3 transition-all",
                        !submitted && !isSelected && "border-border hover:border-primary/40 hover:bg-primary/5",
                        !submitted && isSelected && "border-primary bg-primary/5",
                        submitted && isCorrectOpt && "border-green-400 bg-green-50 text-green-800",
                        submitted && isWrongSelected && "border-red-400 bg-red-50 text-red-800",
                        submitted && !isCorrectOpt && !isWrongSelected && "border-border text-muted-foreground",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className={cn(
                          "h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs",
                          !submitted && isSelected ? "border-primary bg-primary text-white" : "border-muted-foreground/30",
                          submitted && isCorrectOpt ? "border-green-500 bg-green-500 text-white" : "",
                          submitted && isWrongSelected ? "border-red-500 bg-red-500 text-white" : "",
                        )}>
                          {submitted && isCorrectOpt ? "✓" : submitted && isWrongSelected ? "✗" : isSelected && !submitted ? "●" : ""}
                        </span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {submitted && showExplanations && q.explanation && (
                <div className={cn(
                  "mt-3 rounded-lg px-4 py-3 text-sm font-body",
                  selected === q.correct ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"
                )}>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="px-6 py-4 border-t bg-muted/30 flex items-center justify-between">
          <p className="text-sm font-body text-muted-foreground">
            {Object.keys(answers).length} of {quiz.questions.length} answered
          </p>
          <Button onClick={handleSubmit} disabled={!allAnswered}>
            Submit answers
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const { modules: customModules } = useCustomModules();
  const { isAdmin } = useAuth();
  const { overrides, saving, patchLesson, patchModule } = useContentOverrides();

  const baseMod = [...trainingModules, ...customModules].find((m) => m.id === moduleId);
  const { isCompleted, toggleLesson, getModuleProgress } = useTrainingProgress();

  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [editingModuleInfo, setEditingModuleInfo] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [moduleId]);

  // Apply content overrides over static data
  const mod = useMemo<TrainingModule | undefined>(() => {
    if (!baseMod) return undefined;
    const modOverride = overrides.modules[baseMod.id] ?? {};
    return {
      ...baseMod,
      title: modOverride.title ?? baseMod.title,
      description: modOverride.description ?? baseMod.description,
      estimatedTime: modOverride.estimatedTime ?? baseMod.estimatedTime,
      lessons: baseMod.lessons.map((l) => {
        const lo = overrides.lessons[l.id] ?? {};
        return {
          ...l,
          title: lo.title ?? l.title,
          duration: lo.duration ?? l.duration,
          content: lo.content ?? l.content,
        };
      }),
    };
  }, [baseMod, overrides]);

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
    ? trainingPaths.technician.stages.find((s) => s.id === mod.stage)?.label
    : trainingPaths[mod.roles[0]].stages.find((s) => s.id === mod.stage)?.label;

  const handleEditLesson = (lessonId: string) => {
    setOpenLesson(lessonId);
    setEditingLesson(lessonId);
  };

  const handleSaveLesson = async (lessonId: string, patch: Partial<{ title: string; duration: string; content: string }>) => {
    await patchLesson(lessonId, patch);
    setEditingLesson(null);
  };

  const handleSaveModuleInfo = async (patch: { title: string; description: string; estimatedTime: string }) => {
    await patchModule(mod.id, patch);
    setEditingModuleInfo(false);
  };

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
            {mod.quiz && <span>{mod.quiz.questions.length} question knowledge test</span>}
          </div>
          <div className="flex items-center gap-3">
            <Progress value={progress.percent} className="h-3 flex-1" />
            <span className="text-sm font-body font-medium">{progress.percent}%</span>
          </div>

          {isAdmin && !editingModuleInfo && (
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" size="sm" onClick={() => setEditingModuleInfo(true)} className="text-muted-foreground">
                <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit module info
              </Button>
            </div>
          )}

          {isAdmin && editingModuleInfo && (
            <ModuleInfoEditor
              mod={mod}
              onSave={handleSaveModuleInfo}
              onCancel={() => setEditingModuleInfo(false)}
              saving={saving}
            />
          )}
        </div>
      </motion.div>

      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const completed = isCompleted(lesson.id);
          const isOpen = openLesson === lesson.id;
          const isEditing = editingLesson === lesson.id;

          return (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className={cn("bg-card border rounded-xl overflow-hidden", isEditing && "border-primary/30 ring-1 ring-primary/20")}
            >
              <button
                onClick={() => {
                  if (isEditing) return;
                  setOpenLesson(isOpen ? null : lesson.id);
                }}
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

                {isAdmin && !isEditing && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditLesson(lesson.id); }}
                    className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Edit lesson"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}

                {!isEditing && (
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                )}
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
                      {isEditing ? (
                        <LessonEditor
                          lesson={lesson}
                          onSave={(patch) => handleSaveLesson(lesson.id, patch)}
                          onCancel={() => setEditingLesson(null)}
                          saving={saving}
                        />
                      ) : (
                        <>
                          <div className="pt-4">
                            <LessonContent content={lesson.content} />
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
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {mod.quiz && <QuizSection quiz={mod.quiz} moduleId={mod.id} />}
    </div>
  );
};

export default ModuleDetail;
