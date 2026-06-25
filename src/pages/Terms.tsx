import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Scale,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Info,
  ShieldAlert,
} from "lucide-react";
import {
  termsCategories,
  termsClauses,
  type TermsCategory,
  disputeTree,
  disputeTreeStartId,
  type DisputeNode,
  type DisputeOutcome,
} from "@/data/terms-summary";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categoryTone: Record<TermsCategory, string> = {
  "Cancellation & Ending": "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  "Payment & Pricing": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  "Access & Lockouts": "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
  "Complaints & Remediation": "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
  "Liability & Damage": "bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/20",
  "Service Changes": "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
  "Garden Condition": "bg-lime-500/10 text-lime-700 dark:text-lime-300 border-lime-500/20",
};

const Terms = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<TermsCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return termsClauses.filter((c) => {
      if (active !== "All" && c.category !== active) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.keyPoints.some((p) => p.toLowerCase().includes(q)) ||
        c.reference.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  return (
    <div className="space-y-10">
      <div>
        <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
          Reference
        </span>
        <h1 className="text-3xl md:text-4xl mt-1">Terms & Customer Disputes</h1>
        <p className="text-muted-foreground font-body mt-2 max-w-3xl">
          A plain-English summary of our customer-facing terms — what each clause means, what to charge,
          and what to say. Use the decision tree below to walk through a live dispute step-by-step.
        </p>
        <a
          href="https://www.shrekfeet.com/terms-conditions"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary font-body mt-3 hover:underline"
        >
          View the full published Terms & Conditions <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Decision tree */}
      <DisputeTree />

      {/* Clause summary */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl">Clause summary</h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Searchable summary of every clause that matters in a customer dispute.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search clauses, e.g. lockout, renovation, refund…"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip label="All" active={active === "All"} onClick={() => setActive("All")} />
            {termsCategories.map((c) => (
              <Chip key={c} label={c} active={active === c} onClick={() => setActive(c)} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.25), duration: 0.25 }}
              className="bg-card border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <Badge variant="outline" className={`font-body text-[11px] ${categoryTone[c.category]}`}>
                  {c.category}
                </Badge>
                <span className="text-xs font-body text-muted-foreground whitespace-nowrap">
                  Clause {c.reference}
                </span>
              </div>
              <h3 className="text-lg leading-tight">{c.title}</h3>
              <p className="font-body text-sm text-foreground/85 mt-2">{c.summary}</p>

              <ul className="mt-3 space-y-1.5">
                {c.keyPoints.map((p, idx) => (
                  <li key={idx} className="flex gap-2 text-sm font-body text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {c.officeGuidance?.length ? (
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="text-[11px] uppercase tracking-wider font-body font-semibold text-primary mb-1.5">
                    Office guidance
                  </p>
                  <ul className="space-y-1.5">
                    {c.officeGuidance.map((g, idx) => (
                      <li key={idx} className="flex gap-2 text-sm font-body text-foreground/90">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.article>
          ))}
          {filtered.length === 0 && (
            <p className="text-muted-foreground font-body col-span-full text-center py-10">
              No clauses match — try a different search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-body font-medium px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:bg-muted"
      }`}
    >
      {label}
    </button>
  );
}

// ----------------------------------------------------------------
// Decision Tree
// ----------------------------------------------------------------

const toneStyles: Record<NonNullable<DisputeOutcome["tone"]>, { icon: typeof Info; classes: string; label: string }> = {
  info: { icon: Info, classes: "border-blue-500/30 bg-blue-500/5", label: "Informational" },
  charge: { icon: AlertTriangle, classes: "border-amber-500/30 bg-amber-500/5", label: "Charge applies" },
  refund: { icon: CheckCircle2, classes: "border-emerald-500/30 bg-emerald-500/5", label: "In customer's favour" },
  escalate: { icon: ShieldAlert, classes: "border-purple-500/30 bg-purple-500/5", label: "Escalate / investigate" },
};

function DisputeTree() {
  const [history, setHistory] = useState<string[]>([disputeTreeStartId]);
  const currentId = history[history.length - 1];
  const node: DisputeNode = disputeTree[currentId];

  const reset = () => setHistory([disputeTreeStartId]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  return (
    <section className="bg-card border rounded-xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl">Dispute decision tree</h2>
            <p className="text-sm text-muted-foreground font-body mt-1">
              Walk through a live dispute and land on the right charge, refund or escalation.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {history.length > 1 && (
            <Button variant="ghost" size="sm" onClick={back}>
              <ArrowRight className="h-3.5 w-3.5 mr-1 rotate-180" /> Back
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5 mr-1" /> Restart
          </Button>
        </div>
      </div>

      <motion.div
        key={currentId}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {node.type === "question" ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-body uppercase tracking-wider text-muted-foreground">
                Step {history.length}
              </p>
              <h3 className="text-xl mt-1">{node.question}</h3>
              {node.helper && (
                <p className="text-sm text-muted-foreground font-body mt-2">{node.helper}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {node.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => setHistory((h) => [...h, opt.nextId])}
                  className="group text-left bg-background border rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-body text-sm text-foreground/90">{opt.label}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Outcome node={node} />
        )}
      </motion.div>
    </section>
  );
}

function Outcome({ node }: { node: DisputeOutcome }) {
  const tone = toneStyles[node.tone ?? "info"];
  const Icon = tone.icon;
  return (
    <div className={`rounded-xl border-2 p-5 ${tone.classes}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] uppercase tracking-wider font-body font-semibold">{tone.label}</span>
      </div>
      <h3 className="text-2xl">{node.title}</h3>
      <p className="font-body text-foreground/85 mt-2">{node.summary}</p>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-wider font-body font-semibold text-foreground/70 mb-2">
          Steps to take
        </p>
        <ol className="space-y-2">
          {node.steps.map((s, i) => (
            <li key={i} className="flex gap-3 font-body text-sm text-foreground/90">
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-foreground/10 text-foreground/80 text-[11px] font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {node.references.map((r) => (
          <Badge key={r} variant="outline" className="font-body text-xs bg-background/60">
            Clause {r}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Terms;
