import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Search, ChevronRight, RotateCcw, Filter, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TriageCard } from "@/components/triage/TriageCard";
import { triageFlows, allTags } from "@/data/triage-flows";

/* ------------------------------------------------------------------ */
/* Guided meta-flow: filters by tag as user answers                   */
/* ------------------------------------------------------------------ */
type GuidedStep = {
  id: string;
  question: string;
  options: { label: string; addTags?: string[]; nextId: string | null }[];
};

const guidedSteps: Record<string, GuidedStep> = {
  start: {
    id: "start",
    question: "What's the issue about?",
    options: [
      { label: "The lawn itself", addTags: ["lawn"], nextId: "lawn-area" },
      { label: "Our service or crew", addTags: ["service"], nextId: "service-area" },
      { label: "Mowing / cut quality", addTags: ["mowing"], nextId: null },
    ],
  },
  "lawn-area": {
    id: "lawn-area",
    question: "Is it related to a treatment we applied?",
    options: [
      { label: "Yes — a recent treatment", addTags: ["treatment"], nextId: "treatment-type" },
      { label: "No — general lawn condition", nextId: "lawn-symptom" },
    ],
  },
  "treatment-type": {
    id: "treatment-type",
    question: "Which treatment is it about?",
    options: [
      { label: "Weed control", addTags: ["weeds"], nextId: null },
      { label: "Moss control", addTags: ["moss"], nextId: null },
      { label: "Other / not sure", nextId: null },
    ],
  },
  "lawn-symptom": {
    id: "lawn-symptom",
    question: "What's the visible symptom?",
    options: [
      { label: "Discolouration (yellow / brown)", addTags: ["discolouration"], nextId: null },
      { label: "Bare patches / poor germination", addTags: ["germination"], nextId: null },
      { label: "Something else", nextId: null },
    ],
  },
  "service-area": {
    id: "service-area",
    question: "Is the customer making a complaint?",
    options: [
      { label: "Yes", addTags: ["complaint"], nextId: null },
      { label: "No — just a question", nextId: null },
    ],
  },
};

const SmartTriage = () => {
  const [mode, setMode] = useState<"guided" | "filter">("guided");

  /* ---------------- Guided mode state ---------------- */
  const [stepId, setStepId] = useState<string>("start");
  const [collectedTags, setCollectedTags] = useState<string[]>([]);
  const [history, setHistory] = useState<{ stepId: string; question: string; answer: string; tagsAdded: string[] }[]>([]);
  const [finished, setFinished] = useState(false);

  const currentStep = guidedSteps[stepId];

  const guidedMatches = useMemo(() => {
    if (collectedTags.length === 0) return [];
    return triageFlows.filter((f) => collectedTags.every((t) => f.tags.includes(t)));
  }, [collectedTags]);

  const handleGuidedAnswer = (opt: GuidedStep["options"][number]) => {
    const added = opt.addTags ?? [];
    setHistory((h) => [
      ...h,
      { stepId: currentStep.id, question: currentStep.question, answer: opt.label, tagsAdded: added },
    ]);
    setCollectedTags((t) => Array.from(new Set([...t, ...added])));
    if (opt.nextId) {
      setStepId(opt.nextId);
    } else {
      setFinished(true);
    }
  };

  const handleGuidedBack = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCollectedTags((t) => t.filter((x) => !last.tagsAdded.includes(x)));
    setStepId(last.stepId);
    setFinished(false);
  };

  const handleGuidedRestart = () => {
    setStepId("start");
    setCollectedTags([]);
    setHistory([]);
    setFinished(false);
  };

  /* ---------------- Filter mode state ---------------- */
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setActiveTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return triageFlows.filter((flow) => {
      if (activeTags.length > 0 && !activeTags.every((t) => flow.tags.includes(t))) return false;
      if (!q) return true;
      const haystack = [
        flow.title,
        flow.description,
        flow.category,
        flow.tags.join(" "),
        ...Object.values(flow.nodes).map((n) =>
          n.kind === "question" ? n.question : `${n.title} ${n.summary}`,
        ),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, activeTags]);

  return (
    <div className="space-y-6 max-w-4xl">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/operations">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Troubleshooting Hub
        </Link>
      </Button>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-sm font-bold uppercase tracking-wider text-primary">
            Smart Triage
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl">Find the right flow, fast.</h1>
        <p className="text-lg text-muted-foreground">
          Answer a few quick questions, or search and filter to narrow things down.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="inline-flex p-1 bg-secondary rounded-full">
        <button
          onClick={() => setMode("guided")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            mode === "guided" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
        >
          <GitBranch className="h-4 w-4" />
          Guided
        </button>
        <button
          onClick={() => setMode("filter")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            mode === "filter" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Filter className="h-4 w-4" />
          Search & filter
        </button>
      </div>

      {/* ---------------- GUIDED MODE ---------------- */}
      {mode === "guided" && (
        <div className="space-y-6">
          {/* Breadcrumb */}
          {history.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your answers
              </p>
              <ol className="space-y-1.5">
                {history.map((step, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground">{step.question}</span>
                    <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                    <span className="font-semibold text-foreground">{step.answer}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {!finished ? (
            <Card className="p-6 md:p-8 space-y-6 animate-fade-in">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step {history.length + 1}
                </p>
                <h2 className="text-2xl md:text-3xl">{currentStep.question}</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentStep.options.map((opt) => (
                  <Button
                    key={opt.label}
                    variant="outline"
                    size="lg"
                    className="h-auto justify-between py-4 px-5 text-left whitespace-normal hover:border-primary hover:bg-primary/5"
                    onClick={() => handleGuidedAnswer(opt)}
                  >
                    <span className="font-semibold">{opt.label}</span>
                    <ChevronRight className="h-5 w-5 shrink-0 ml-2 text-primary" />
                  </Button>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-6 md:p-8 space-y-4 animate-fade-in ring-2 ring-primary/30">
              <div className="space-y-2">
                <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                  {guidedMatches.length} matching {guidedMatches.length === 1 ? "flow" : "flows"}
                </Badge>
                <h2 className="text-2xl">
                  {guidedMatches.length > 0
                    ? "Here's what I'd use"
                    : "No exact match — try the filter mode"}
                </h2>
                {collectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {collectedTags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">
                        #{t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {guidedMatches.length > 0 && (
                <div className="grid gap-3 md:grid-cols-2 pt-2">
                  {guidedMatches.map((flow) => (
                    <TriageCard key={flow.id} flow={flow} />
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="ghost"
              onClick={handleGuidedBack}
              disabled={history.length === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button variant="ghost" onClick={handleGuidedRestart}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Start over
            </Button>
          </div>
        </div>
      )}

      {/* ---------------- FILTER MODE ---------------- */}
      {mode === "filter" && (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search across all triage flows…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
            {(query || activeTags.length > 0) && (
              <button
                onClick={() => {
                  setQuery("");
                  setActiveTags([]);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "flow" : "flows"} match
          </p>

          {filtered.length === 0 ? (
            <Card className="p-12 text-center space-y-2">
              <p className="text-lg font-semibold">No matching flows</p>
              <p className="text-muted-foreground">Try a different term or clear filters.</p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((flow) => (
                <TriageCard key={flow.id} flow={flow} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartTriage;
