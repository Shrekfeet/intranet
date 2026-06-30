import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Circle, Clock, ChevronDown,
  Trophy, RotateCcw, Pencil, Save, X, Loader2, Plus, Trash2, ChevronUp,
} from "lucide-react";
import { trainingPaths, type Quiz, type QuizQuestion, type Lesson, type TrainingModule } from "@/data/training-modules";
import { useModuleStore } from "@/hooks/use-module-store";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { useAuth } from "@/contexts/AuthContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ── Helpers ───────────────────────────────────────────────────────────────────

const INPUT_CLS = "w-full rounded-lg border bg-background px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40";
const TEXTAREA_CLS = `${INPUT_CLS} resize-none`;

const FORMAT_GUIDE = (
  <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-xs font-body text-amber-800 space-y-1.5">
    <div>
      <strong>Text:</strong>{" "}
      <code className="bg-amber-100 px-1 rounded">**text**</code> = bold &nbsp;·&nbsp;
      <code className="bg-amber-100 px-1 rounded">*text*</code> = <em>italic</em> &nbsp;·&nbsp;
      <code className="bg-amber-100 px-1 rounded">__text__</code> = <u>underline</u> &nbsp;·&nbsp;
      <code className="bg-amber-100 px-1 rounded">- item</code> = bullet &nbsp;·&nbsp;
      <code className="bg-amber-100 px-1 rounded">1. item</code> = numbered &nbsp;·&nbsp;
      blank line = new paragraph
    </div>
    <div>
      <strong>Images:</strong>{" "}
      <code className="bg-amber-100 px-1 rounded">![Caption|size|align](url)</code>
      &nbsp;— size: <code className="bg-amber-100 px-1 rounded">small</code>{" "}
      <code className="bg-amber-100 px-1 rounded">medium</code>{" "}
      <code className="bg-amber-100 px-1 rounded">large</code>{" "}
      <code className="bg-amber-100 px-1 rounded">full</code>{" "}
      &nbsp;· align: <code className="bg-amber-100 px-1 rounded">left</code>{" "}
      <code className="bg-amber-100 px-1 rounded">center</code>{" "}
      <code className="bg-amber-100 px-1 rounded">right</code>
    </div>
    <div>
      <strong>Two columns</strong> (image + text side by side on desktop, stacked on mobile):{" "}
      <code className="bg-amber-100 px-1 rounded whitespace-pre">{"[cols]\n![Caption|full](/intranet/images/x.jpg)\n|||\nYour text here\n[/cols]"}</code>
    </div>
    <div className="border-t border-amber-200 pt-1.5">
      <strong>Tip:</strong> Use blank lines between paragraphs. Text above or below a{" "}
      <code className="bg-amber-100 px-1 rounded">[cols]</code> block spans the full width as normal.
      Images go in <code className="bg-amber-100 px-1 rounded">/intranet/images/</code> — upload to{" "}
      <code className="bg-amber-100 px-1 rounded">public/images/</code> in the repo and commit.
    </div>
  </div>
);

// ── Image block ───────────────────────────────────────────────────────────────

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)\s*$/;

const SIZE_W: Record<string, string> = {
  small:  "w-full sm:w-1/3",
  medium: "w-full sm:w-1/2",
  large:  "w-full md:w-3/4",
  full:   "w-full",
};
const ALIGN_MX: Record<string, string> = {
  left:   "mr-auto",
  center: "mx-auto",
  right:  "ml-auto",
};

function ImageBlock({ raw }: { raw: string }) {
  const m = raw.match(IMAGE_RE);
  if (!m) return null;
  const [, altPart, src] = m;
  const parts = altPart.split("|").map((p) => p.trim());
  const caption = parts[0] ?? "";
  const size    = parts[1] && SIZE_W[parts[1]]  ? parts[1]  : "full";
  const align   = parts[2] && ALIGN_MX[parts[2]] ? parts[2] : "center";

  return (
    <figure className={cn("my-4", SIZE_W[size], ALIGN_MX[align])}>
      <img
        src={src}
        alt={caption}
        className="w-full rounded-lg border object-cover"
        loading="lazy"
      />
      {caption && (
        <figcaption className="text-center text-xs font-body text-muted-foreground mt-1.5 italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ── Inline formatter ─────────────────────────────────────────────────────────

const INLINE_RE = /(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__)/g;

function renderInline(text: string): React.ReactNode {
  const tokens = text.split(INLINE_RE);
  if (tokens.length === 1) return text;
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.startsWith("**") && tok.endsWith("**"))
          return <strong key={i}>{tok.slice(2, -2)}</strong>;
        if (tok.startsWith("*") && tok.endsWith("*"))
          return <em key={i}>{tok.slice(1, -1)}</em>;
        if (tok.startsWith("__") && tok.endsWith("__"))
          return <u key={i}>{tok.slice(2, -2)}</u>;
        return tok;
      })}
    </>
  );
}

// ── Content renderer ─────────────────────────────────────────────────────────

function renderLine(line: string, key: number): React.ReactNode {
  if (IMAGE_RE.test(line))
    return <ImageBlock key={key} raw={line} />;
  if (line.startsWith("**") && line.endsWith("**"))
    return <p key={key} className="font-semibold text-foreground">{line.slice(2, -2)}</p>;
  if (line.startsWith("- "))
    return <p key={key} className="ml-4 text-muted-foreground">• {renderInline(line.slice(2))}</p>;
  if (/^\d+\./.test(line))
    return <p key={key} className="ml-4 text-muted-foreground">{renderInline(line)}</p>;
  if (line.startsWith("⚠️"))
    return <p key={key} className="text-amber-700 font-body font-medium">{renderInline(line)}</p>;
  return <p key={key} className="text-muted-foreground">{renderInline(line)}</p>;
}

function renderLines(text: string): React.ReactNode {
  return text.split("\n").map((line, i) => renderLine(line, i));
}

function LessonContent({ content }: { content: string }) {
  const normalised = content.replace(/\r\n/g, "\n");

  // Split on [cols]...[/cols] so columns work anywhere — not just at block starts
  const COLS_RE = /\[cols\]([\s\S]*?)\[\/cols\]/g;
  const segments: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  while ((m = COLS_RE.exec(normalised)) !== null) {
    // Text before this [cols] block
    if (m.index > last) {
      const before = normalised.slice(last, m.index).replace(/^\n+|\n+$/g, "");
      if (before) {
        segments.push(
          ...before.split("\n\n").map((block) => (
            <div key={key++} className="mb-3">
              {block.split("\n").map((line, li) => renderLine(line, li))}
            </div>
          )),
        );
      }
    }
    // The [cols] block itself
    const inner = m[1].trim();
    const sepIdx = inner.indexOf("\n|||\n");
    const left = sepIdx >= 0 ? inner.slice(0, sepIdx).trim() : inner;
    const right = sepIdx >= 0 ? inner.slice(sepIdx + 5).trim() : "";
    segments.push(
      <div key={key++} className="flex flex-col sm:flex-row gap-5 my-3 items-start">
        <div className="w-full sm:w-1/2 flex-shrink-0">{renderLines(left)}</div>
        <div className="w-full sm:w-1/2">{renderLines(right)}</div>
      </div>,
    );
    last = m.index + m[0].length;
  }

  // Remaining text after last [cols]
  if (last < normalised.length) {
    const after = normalised.slice(last).replace(/^\n+/, "");
    if (after) {
      segments.push(
        ...after.split("\n\n").map((block) => (
          <div key={key++} className="mb-3">
            {block.split("\n").map((line, li) => renderLine(line, li))}
          </div>
        )),
      );
    }
  }

  return (
    <div className="prose prose-sm max-w-none font-body text-foreground">{segments}</div>
  );
}

// ── Lesson editor (edit existing) ─────────────────────────────────────────────

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
      {FORMAT_GUIDE}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Lesson title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT_CLS} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Duration</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 10 min" className={INPUT_CLS} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={20} className={`${INPUT_CLS} font-mono resize-y leading-relaxed`} />
      </div>
      <div className="flex items-center justify-between gap-3 pt-1">
        <p className="text-xs font-body text-muted-foreground">{dirty ? "Unsaved changes" : "No changes"}</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}><X className="h-3.5 w-3.5 mr-1.5" />Cancel</Button>
          <Button size="sm" onClick={() => onSave({ title, duration, content })} disabled={!dirty || saving}>
            {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── New lesson form ───────────────────────────────────────────────────────────

interface NewLessonFormProps {
  onAdd: (data: { title: string; duration: string; content: string }) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function NewLessonForm({ onAdd, onCancel, saving }: NewLessonFormProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="space-y-4 pt-4">
      {FORMAT_GUIDE}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Lesson title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter lesson title…" className={INPUT_CLS} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Duration</label>
          <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 10 min" className={INPUT_CLS} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className={`${INPUT_CLS} font-mono resize-y leading-relaxed`} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}><X className="h-3.5 w-3.5 mr-1.5" />Cancel</Button>
        <Button size="sm" onClick={() => onAdd({ title, duration, content })} disabled={!title.trim() || saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Plus className="h-3.5 w-3.5 mr-1.5" />}
          Add lesson
        </Button>
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
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT_CLS} />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-body text-muted-foreground">Estimated time</label>
          <input value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} placeholder="e.g. 30 min" className={INPUT_CLS} />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-body text-muted-foreground">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={TEXTAREA_CLS} />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}><X className="h-3.5 w-3.5 mr-1.5" />Cancel</Button>
        <Button size="sm" onClick={() => onSave({ title, description, estimatedTime })} disabled={!dirty || saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
          Save
        </Button>
      </div>
    </div>
  );
}

// ── Quiz editor ───────────────────────────────────────────────────────────────

function blankQuestion(): QuizQuestion {
  return { id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, question: "", options: ["", "", "", ""], correct: 0 };
}

interface QuizEditorProps {
  initialQuiz: Quiz | undefined;
  onSave: (quiz: Quiz) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function QuizEditor({ initialQuiz, onSave, onCancel, saving }: QuizEditorProps) {
  const [passMark, setPassMark] = useState(initialQuiz?.passMark ?? 80);
  const [questions, setQuestions] = useState<QuizQuestion[]>(
    initialQuiz?.questions.length ? initialQuiz.questions : [blankQuestion()],
  );

  const updateQuestion = (qi: number, patch: Partial<QuizQuestion>) =>
    setQuestions((prev) => prev.map((q, i) => (i === qi ? { ...q, ...patch } : q)));

  const updateOption = (qi: number, oi: number, value: string) =>
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qi) return q;
        const options = [...q.options];
        options[oi] = value;
        return { ...q, options };
      }),
    );

  const addQuestion = () => setQuestions((prev) => [...prev, blankQuestion()]);
  const removeQuestion = (qi: number) => setQuestions((prev) => prev.filter((_, i) => i !== qi));

  const valid =
    questions.length > 0 &&
    questions.every((q) => q.question.trim() && q.options.every((o) => o.trim()));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <label className="text-sm font-body font-semibold">Pass mark</label>
        <input
          type="number" min={1} max={100} value={passMark}
          onChange={(e) => setPassMark(Number(e.target.value))}
          className="w-20 rounded-lg border bg-background px-3 py-1.5 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <span className="text-sm font-body text-muted-foreground">%</span>
      </div>

      {questions.map((q, qi) => (
        <div key={q.id} className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wide">
              Question {qi + 1}
            </span>
            <button
              onClick={() => removeQuestion(qi)}
              disabled={questions.length === 1}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Remove question"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <textarea
            value={q.question}
            onChange={(e) => updateQuestion(qi, { question: e.target.value })}
            placeholder="Enter question…"
            rows={2}
            className={TEXTAREA_CLS}
          />

          <div className="space-y-2">
            <p className="text-xs font-body text-muted-foreground">Options — click the circle to mark the correct answer</p>
            {q.options.map((opt, oi) => (
              <div key={oi} className="flex items-center gap-2">
                <button
                  onClick={() => updateQuestion(qi, { correct: oi })}
                  className={cn(
                    "h-5 w-5 rounded-full border-2 flex-shrink-0 transition-colors",
                    q.correct === oi ? "border-primary bg-primary" : "border-muted-foreground/30 hover:border-primary/60",
                  )}
                  title={`Mark option ${oi + 1} as correct`}
                />
                <input
                  value={opt}
                  onChange={(e) => updateOption(qi, oi, e.target.value)}
                  placeholder={`Option ${oi + 1}`}
                  className={INPUT_CLS}
                />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-body text-muted-foreground">Explanation (optional — shown after submitting)</label>
            <textarea
              value={q.explanation ?? ""}
              onChange={(e) => updateQuestion(qi, { explanation: e.target.value })}
              placeholder="Why is this the right answer?"
              rows={2}
              className={TEXTAREA_CLS}
            />
          </div>
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="w-full rounded-xl border-2 border-dashed border-primary/30 py-3 text-sm font-body text-primary hover:border-primary/60 hover:bg-primary/5 transition-colors"
      >
        + Add question
      </button>

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}><X className="h-3.5 w-3.5 mr-1.5" />Cancel</Button>
        <Button size="sm" onClick={() => onSave({ passMark, questions })} disabled={!valid || saving}>
          {saving ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Save className="h-3.5 w-3.5 mr-1.5" />}
          Save quiz
        </Button>
      </div>
    </div>
  );
}

// ── Quiz viewer ───────────────────────────────────────────────────────────────

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
    <>
      {submitted && (
        <div className={cn(
          "px-6 py-4 border-b flex items-center justify-between gap-4",
          passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200",
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
          const isCorrectOpt = (oi: number) => submitted && oi === q.correct;
          const isWrongSelected = (oi: number) => submitted && selected === oi && oi !== q.correct;

          return (
            <div key={q.id} className="px-6 py-5">
              <p className="font-body font-medium text-sm mb-3">
                <span className="text-muted-foreground mr-2">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => !submitted && setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                    className={cn(
                      "w-full text-left text-sm font-body rounded-lg border px-4 py-3 transition-all",
                      !submitted && selected !== oi && "border-border hover:border-primary/40 hover:bg-primary/5",
                      !submitted && selected === oi && "border-primary bg-primary/5",
                      submitted && isCorrectOpt(oi) && "border-green-400 bg-green-50 text-green-800",
                      submitted && isWrongSelected(oi) && "border-red-400 bg-red-50 text-red-800",
                      submitted && !isCorrectOpt(oi) && !isWrongSelected(oi) && "border-border text-muted-foreground",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className={cn(
                        "h-5 w-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs",
                        !submitted && selected === oi ? "border-primary bg-primary text-white" : "border-muted-foreground/30",
                        submitted && isCorrectOpt(oi) ? "border-green-500 bg-green-500 text-white" : "",
                        submitted && isWrongSelected(oi) ? "border-red-500 bg-red-500 text-white" : "",
                      )}>
                        {submitted && isCorrectOpt(oi) ? "✓" : submitted && isWrongSelected(oi) ? "✗" : selected === oi && !submitted ? "●" : ""}
                      </span>
                      {opt}
                    </span>
                  </button>
                ))}
              </div>
              {submitted && showExplanations && q.explanation && (
                <div className={cn(
                  "mt-3 rounded-lg px-4 py-3 text-sm font-body",
                  selected === q.correct ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800",
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
          <Button onClick={handleSubmit} disabled={!allAnswered}>Submit answers</Button>
        </div>
      )}
    </>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const ModuleDetail = () => {
  const { moduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { allModules, saving, patchLesson, patchModule, addLesson, removeLesson, saveQuiz, deleteModule, reorderLessons } = useModuleStore();
  const { isCompleted, toggleLesson, getModuleProgress } = useTrainingProgress();

  const [openLesson, setOpenLesson] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [confirmDeleteLesson, setConfirmDeleteLesson] = useState<string | null>(null);
  const [editingModuleInfo, setEditingModuleInfo] = useState(false);
  const [addingLesson, setAddingLesson] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(false);
  const [confirmDeleteModule, setConfirmDeleteModule] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [moduleId]);

  const mod = allModules.find((m) => m.id === moduleId);

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
    ? `/modules?${location.state.fromSearch}` : "/modules";
  const audienceLabel = mod.roles.length === 2
    ? "Shared for lawn technicians and office staff"
    : `For ${trainingPaths[mod.roles[0]].title}`;
  const stageLabel = mod.roles.length === 2
    ? trainingPaths.technician.stages.find((s) => s.id === mod.stage)?.label
    : trainingPaths[mod.roles[0]].stages.find((s) => s.id === mod.stage)?.label;

  const handleSaveLesson = async (lessonId: string, patch: Partial<{ title: string; duration: string; content: string }>) => {
    await patchLesson(lessonId, patch);
    setEditingLesson(null);
  };

  const handleRemoveLesson = async (lessonId: string) => {
    await removeLesson(mod.id, lessonId);
    setConfirmDeleteLesson(null);
    if (openLesson === lessonId) setOpenLesson(null);
  };

  const handleAddLesson = async (data: { title: string; duration: string; content: string }) => {
    await addLesson(mod.id, data);
    setAddingLesson(false);
  };

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [sectionDraft, setSectionDraft] = useState("");

  const handleRenameSection = async (oldName: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed || trimmed === oldName) { setEditingSection(null); return; }
    const affected = mod.lessons.filter((l) => l.section === oldName);
    await Promise.all(affected.map((l) => patchLesson(l.id, { section: trimmed })));
    setEditingSection(null);
  };

  const handleMoveLesson = async (lessonId: string, direction: "up" | "down") => {
    const ids = mod.lessons.map((l) => l.id);
    const idx = ids.indexOf(lessonId);
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === ids.length - 1) return;
    const next = [...ids];
    const swap = direction === "up" ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    await reorderLessons(mod.id, next);
  };

  const handleSaveModuleInfo = async (patch: { title: string; description: string; estimatedTime: string }) => {
    await patchModule(mod.id, patch);
    setEditingModuleInfo(false);
  };

  const handleSaveQuiz = async (quiz: Quiz) => {
    await saveQuiz(mod.id, quiz);
    setEditingQuiz(false);
  };

  const handleDeleteModule = async () => {
    await deleteModule(mod.id);
    navigate("/modules");
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

          {isAdmin && (
            <div className="mt-4 pt-4 border-t flex flex-wrap items-center gap-2">
              {!editingModuleInfo && (
                <Button variant="ghost" size="sm" onClick={() => setEditingModuleInfo(true)} className="text-muted-foreground">
                  <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit module info
                </Button>
              )}
              <div className="ml-auto flex items-center gap-2">
                {confirmDeleteModule ? (
                  <>
                    <span className="text-xs font-body text-muted-foreground">Delete this module permanently?</span>
                    <Button variant="destructive" size="sm" onClick={handleDeleteModule} disabled={saving}>
                      {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Delete"}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDeleteModule(false)}>Cancel</Button>
                  </>
                ) : (
                  <Button
                    variant="ghost" size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => setConfirmDeleteModule(true)}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete module
                  </Button>
                )}
              </div>
            </div>
          )}

          {isAdmin && editingModuleInfo && (
            <ModuleInfoEditor mod={mod} onSave={handleSaveModuleInfo} onCancel={() => setEditingModuleInfo(false)} saving={saving} />
          )}
        </div>
      </motion.div>

      {/* Lessons */}
      <div className="space-y-3">
        {mod.lessons.map((lesson, i) => {
          const completed = isCompleted(lesson.id);
          const isOpen = openLesson === lesson.id;
          const isEditing = editingLesson === lesson.id;
          const isConfirmingDelete = confirmDeleteLesson === lesson.id;
          const showSectionHeader = lesson.section && lesson.section !== mod.lessons[i - 1]?.section;

          return (
            <div key={lesson.id}>
            {showSectionHeader && (
              <div className={cn("flex items-center gap-2 px-1 mb-2", i > 0 && "mt-5")}>
                {isAdmin && editingSection === lesson.section ? (
                  <>
                    <input
                      autoFocus
                      value={sectionDraft}
                      onChange={(e) => setSectionDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRenameSection(lesson.section!, sectionDraft);
                        if (e.key === "Escape") setEditingSection(null);
                      }}
                      className="text-xs font-body font-bold uppercase tracking-widest bg-transparent border-b border-primary outline-none text-primary w-32"
                    />
                    <button onClick={() => handleRenameSection(lesson.section!, sectionDraft)} className="text-xs font-body text-primary hover:underline">Save</button>
                    <button onClick={() => setEditingSection(null)} className="text-xs font-body text-muted-foreground hover:underline">Cancel</button>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-body font-bold uppercase tracking-widest text-muted-foreground">{lesson.section}</span>
                    {isAdmin && (
                      <button
                        onClick={() => { setEditingSection(lesson.section!); setSectionDraft(lesson.section!); }}
                        className="p-0.5 rounded text-muted-foreground/50 hover:text-muted-foreground transition-colors"
                        title="Rename section"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                    )}
                  </>
                )}
                <div className="flex-1 h-px bg-border" />
              </div>
            )}
            <motion.div
              key={`motion-${lesson.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className={cn("bg-card border rounded-xl overflow-hidden", isEditing && "border-primary/30 ring-1 ring-primary/20")}
            >
              <button
                onClick={() => { if (isEditing || isConfirmingDelete) return; setOpenLesson(isOpen ? null : lesson.id); }}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {completed ? <CheckCircle2 className="h-6 w-6 text-success" /> : <Circle className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-medium text-base">{lesson.title}</h3>
                  <span className="text-xs text-muted-foreground font-body">{lesson.duration}</span>
                </div>

                {isAdmin && !isEditing && (
                  <>
                    {isConfirmingDelete ? (
                      <span className="flex items-center gap-2 text-xs font-body flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                        <span className="text-muted-foreground">Remove lesson?</span>
                        <button
                          onClick={() => handleRemoveLesson(lesson.id)}
                          className="text-destructive font-semibold hover:underline"
                          disabled={saving}
                        >
                          {saving ? "…" : "Yes"}
                        </button>
                        <button onClick={() => setConfirmDeleteLesson(null)} className="text-muted-foreground hover:underline">No</button>
                      </span>
                    ) : (
                      <>
                        <div className="flex flex-col flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveLesson(lesson.id, "up"); }}
                            disabled={i === 0 || saving}
                            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-default"
                            title="Move up"
                          >
                            <ChevronUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveLesson(lesson.id, "down"); }}
                            disabled={i === mod.lessons.length - 1 || saving}
                            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-20 disabled:cursor-default"
                            title="Move down"
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); setOpenLesson(lesson.id); setEditingLesson(lesson.id); }}
                          className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="Edit lesson"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDeleteLesson(lesson.id); }}
                          className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          title="Remove lesson"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </>
                )}

                {!isEditing && !isConfirmingDelete && (
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
                          <div className="pt-4"><LessonContent content={lesson.content} /></div>
                          <div className="mt-4 pt-4 border-t flex justify-end">
                            <Button
                              onClick={(e) => { e.stopPropagation(); toggleLesson(lesson.id); }}
                              variant={completed ? "outline" : "default"} size="sm"
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
            </div>
          );
        })}

        {/* Add lesson */}
        {isAdmin && (
          addingLesson ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-primary/30 ring-1 ring-primary/20 rounded-xl overflow-hidden p-5"
            >
              <p className="text-sm font-body font-semibold text-primary mb-1">New lesson</p>
              <NewLessonForm onAdd={handleAddLesson} onCancel={() => setAddingLesson(false)} saving={saving} />
            </motion.div>
          ) : (
            <button
              onClick={() => setAddingLesson(true)}
              className="w-full rounded-xl border-2 border-dashed border-muted-foreground/20 py-4 text-sm font-body text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add lesson
            </button>
          )
        )}
      </div>

      {/* Quiz area */}
      <div className="mt-6 rounded-xl border-2 border-primary/20 bg-card overflow-hidden">
        <div className="px-6 py-5 border-b bg-primary/5 flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg">Module Knowledge Test</h3>
            {mod.quiz ? (
              <p className="text-sm font-body text-muted-foreground mt-0.5">
                {mod.quiz.questions.length} questions · Pass mark {mod.quiz.passMark}%
              </p>
            ) : (
              <p className="text-sm font-body text-muted-foreground mt-0.5">No quiz configured yet</p>
            )}
          </div>
          {mod.quiz && !editingQuiz && (
            <span className="flex items-center gap-1.5 text-sm font-body font-semibold text-success">
              {localStorage.getItem(`sf-quiz-${mod.id}`) === "true" && <><CheckCircle2 className="h-4 w-4" /> Passed</>}
            </span>
          )}
          {isAdmin && !editingQuiz && (
            <Button variant="ghost" size="sm" onClick={() => setEditingQuiz(true)} className="flex-shrink-0">
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              {mod.quiz ? "Edit quiz" : "Add quiz"}
            </Button>
          )}
        </div>

        {editingQuiz ? (
          <QuizEditor initialQuiz={mod.quiz} onSave={handleSaveQuiz} onCancel={() => setEditingQuiz(false)} saving={saving} />
        ) : mod.quiz ? (
          <QuizSection quiz={mod.quiz} moduleId={mod.id} />
        ) : (
          <div className="px-6 py-8 text-center text-sm font-body text-muted-foreground">
            {isAdmin ? 'Click "Add quiz" above to create a knowledge test for this module.' : "No knowledge test for this module yet."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;
