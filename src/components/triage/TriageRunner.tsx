import { useState, useMemo } from "react";
import { ArrowLeft, RotateCcw, CheckCircle2, AlertTriangle, OctagonX, Info, ClipboardList, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TriageFlow, type TriageNode, type TriageOutcome, severityStyles } from "@/data/triage-flows";
import { useToast } from "@/hooks/use-toast";

interface Step {
  nodeId: string;
  question: string;
  answer: string;
}

interface Props {
  flow: TriageFlow;
}

const severityIcon = {
  stop: OctagonX,
  escalate: AlertTriangle,
  resolve: CheckCircle2,
  info: Info,
};

export function TriageRunner({ flow }: Props) {
  const [currentId, setCurrentId] = useState(flow.rootId);
  const [history, setHistory] = useState<Step[]>([]);
  const { toast } = useToast();

  const node: TriageNode | undefined = flow.nodes[currentId];

  const progress = useMemo(() => {
    // Rough depth: history length / (history length + 2 remaining-ish)
    if (!node) return 100;
    if (node.kind === "outcome") return 100;
    return Math.min(90, 15 + history.length * 20);
  }, [history.length, node]);

  if (!node) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Triage step not found.</p>
      </Card>
    );
  }

  const handleAnswer = (label: string, nextId: string) => {
    if (node.kind !== "question") return;
    setHistory((h) => [...h, { nodeId: node.id, question: node.question, answer: label }]);
    setCurrentId(nextId);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCurrentId(last.nodeId);
  };

  const handleRestart = () => {
    setHistory([]);
    setCurrentId(flow.rootId);
  };

  const copyActions = (outcome: TriageOutcome) => {
    const text = [
      `${flow.title} — ${outcome.title}`,
      "",
      outcome.summary,
      "",
      "Actions:",
      ...outcome.actions.map((a, i) => `${i + 1}. ${a}`),
    ].join("\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Copied", description: "Outcome copied to clipboard." });
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Breadcrumb of answers */}
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

      {/* Question or outcome */}
      {node.kind === "question" ? (
        <Card className="p-6 md:p-8 space-y-6 animate-fade-in">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Question {history.length + 1}
            </p>
            <h2 className="text-2xl md:text-3xl">{node.question}</h2>
            {node.help && <p className="text-sm text-muted-foreground">{node.help}</p>}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {node.options.map((opt) => (
              <Button
                key={opt.label}
                variant="outline"
                size="lg"
                className="h-auto justify-between py-4 px-5 text-left whitespace-normal hover:border-primary hover:bg-primary/5"
                onClick={() => handleAnswer(opt.label, opt.next)}
              >
                <span className="font-semibold">{opt.label}</span>
                <ChevronRight className="h-5 w-5 shrink-0 ml-2 text-primary" />
              </Button>
            ))}
          </div>
        </Card>
      ) : (
        <OutcomeView outcome={node} onCopy={() => copyActions(node)} />
      )}

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={history.length === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button variant="ghost" onClick={handleRestart}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Restart triage
        </Button>
      </div>
    </div>
  );
}

function OutcomeView({ outcome, onCopy }: { outcome: TriageOutcome; onCopy: () => void }) {
  const styles = severityStyles[outcome.severity];
  const Icon = severityIcon[outcome.severity];

  return (
    <Card className={`p-6 md:p-8 space-y-6 ring-2 ${styles.ring} animate-fade-in`}>
      <div className="flex items-start gap-4">
        <div className={`shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${styles.badge}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-2 flex-1">
          <Badge className={`${styles.badge} hover:${styles.badge}`}>{styles.label}</Badge>
          <h2 className="text-2xl md:text-3xl">{outcome.title}</h2>
          <p className="text-muted-foreground">{outcome.summary}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Recommended actions
          </h3>
          <Button variant="ghost" size="sm" onClick={onCopy}>
            <ClipboardList className="mr-2 h-4 w-4" />
            Copy
          </Button>
        </div>
        <ul className="space-y-2">
          {outcome.actions.map((action, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-secondary/50 p-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed">{action}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
