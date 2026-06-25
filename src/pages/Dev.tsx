import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Eye,
  Code2,
  Save,
  Lock,
  LogOut,
  Copy,
  Sparkles,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { isDevUnlocked, unlockDev, lockDev } from "@/lib/dev-auth";
import { useCustomFlows } from "@/hooks/use-custom-flows";
import { TriageRunner } from "@/components/triage/TriageRunner";
import { ModuleBuilder } from "@/components/dev/ModuleBuilder";
import type {
  Severity,
  TriageFlow,
  TriageNode,
  TriageOption,
  TriageOutcome,
  TriageQuestion,
} from "@/data/triage-flows";

/* ----------------------------- Helpers ----------------------------- */

const slug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const newId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 7)}`;

const emptyQuestion = (): TriageQuestion => ({
  kind: "question",
  id: newId("q"),
  question: "",
  help: "",
  options: [
    { label: "Yes", next: "" },
    { label: "No", next: "" },
  ],
});

const emptyOutcome = (): TriageOutcome => ({
  kind: "outcome",
  id: newId("o"),
  title: "",
  summary: "",
  actions: [""],
  severity: "resolve",
});

const blankFlow = (): TriageFlow => {
  const root = emptyQuestion();
  return {
    id: "",
    title: "",
    category: "Lawn Health",
    description: "",
    icon: "Wrench",
    tags: [],
    rootId: root.id,
    nodes: { [root.id]: root },
  };
};

/* ----------------------------- Page ----------------------------- */

const DevPage = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUnlocked(isDevUnlocked());
  }, []);

  if (!unlocked) {
    return (
      <div className="max-w-md mx-auto pt-12">
        <Card className="p-8 space-y-6">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-primary" />
            <h1 className="text-2xl">Dev access</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            This area is for building new troubleshooting guides. Enter the dev
            password to continue.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (unlockDev(pw)) {
                setUnlocked(true);
                setPwError("");
              } else {
                setPwError("Incorrect password.");
              }
            }}
            className="space-y-3"
          >
            <Input
              type="password"
              placeholder="Password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoFocus
            />
            {pwError && (
              <p className="text-sm text-destructive">{pwError}</p>
            )}
            <Button type="submit" className="w-full">
              Unlock
            </Button>
          </form>
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return <DevWorkspace onLock={() => { lockDev(); setUnlocked(false); }} />;
};

export default DevPage;

/* ----------------------------- Workspace ----------------------------- */

function DevWorkspace({ onLock }: { onLock: () => void }) {
  const { flows, upsert, remove } = useCustomFlows();
  const [editing, setEditing] = useState<TriageFlow | null>(null);
  const [builder, setBuilder] = useState<"guides" | "modules">("guides");

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-bold uppercase tracking-wider text-primary">
              Dev workspace
            </span>
          </div>
          <h1 className="text-4xl">Content builders</h1>
          <p className="text-muted-foreground max-w-2xl">
            Build new troubleshooting guides and learning modules locally in this browser, then export them into code when you're ready to make them permanent.
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onLock}>
          <LogOut className="mr-2 h-4 w-4" />
          Lock
        </Button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setBuilder("guides")}
          className={`rounded-lg border p-5 text-left transition-all ${builder === "guides" ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card hover:border-primary/30 hover:shadow-sm"}`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Operations</p>
          <h2 className="mt-1 text-xl">Troubleshooting guides</h2>
          <p className="mt-1 text-sm text-muted-foreground">Build branching step-by-step flows for the troubleshooting hub.</p>
        </button>
        <button
          type="button"
          onClick={() => setBuilder("modules")}
          className={`rounded-lg border p-5 text-left transition-all ${builder === "modules" ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card hover:border-primary/30 hover:shadow-sm"}`}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Training</p>
          <h2 className="mt-1 text-xl">Learning modules</h2>
          <p className="mt-1 text-sm text-muted-foreground">Build role-based training modules with lesson-by-lesson content.</p>
        </button>
      </div>

      {builder === "modules" ? (
        <ModuleBuilder />
      ) : editing ? (
        <FlowEditor
          initial={editing}
          onCancel={() => setEditing(null)}
          onSave={(f) => {
            upsert(f);
            setEditing(null);
          }}
        />
      ) : (
        <FlowList
          flows={flows}
          onNew={() => setEditing(blankFlow())}
          onEdit={(f) => setEditing({ ...f })}
          onDelete={remove}
        />
      )}
    </div>
  );
}

/* ----------------------------- List ----------------------------- */

function FlowList({
  flows,
  onNew,
  onEdit,
  onDelete,
}: {
  flows: TriageFlow[];
  onNew: () => void;
  onEdit: (f: TriageFlow) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Your guides ({flows.length})</h2>
        <Button onClick={onNew}>
          <Plus className="mr-2 h-4 w-4" />
          New guide
        </Button>
      </div>

      {flows.length === 0 ? (
        <Card className="p-12 text-center space-y-2">
          <p className="text-lg font-semibold">No custom guides yet</p>
          <p className="text-muted-foreground">
            Click <span className="font-semibold">New guide</span> to build
            your first troubleshooting flow.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {flows.map((f) => (
            <Card key={f.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {f.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {Object.keys(f.nodes).length} nodes
                    </span>
                  </div>
                  <h3 className="font-semibold truncate">{f.title || "Untitled"}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {f.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button size="sm" variant="outline" onClick={() => onEdit(f)}>
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/operations/triage/${f.id}`}>
                    <Eye className="mr-2 h-3.5 w-3.5" />
                    Preview
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm(`Delete "${f.title}"?`)) onDelete(f.id);
                  }}
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Editor ----------------------------- */

function FlowEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: TriageFlow;
  onCancel: () => void;
  onSave: (f: TriageFlow) => void;
}) {
  const [flow, setFlow] = useState<TriageFlow>(initial);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const { toast } = useToast();

  const update = (patch: Partial<TriageFlow>) =>
    setFlow((f) => ({ ...f, ...patch }));

  const updateNode = (id: string, patch: Partial<TriageNode>) =>
    setFlow((f) => ({
      ...f,
      nodes: { ...f.nodes, [id]: { ...f.nodes[id], ...patch } as TriageNode },
    }));

  const addNode = (kind: "question" | "outcome") => {
    const node = kind === "question" ? emptyQuestion() : emptyOutcome();
    setFlow((f) => ({ ...f, nodes: { ...f.nodes, [node.id]: node } }));
  };

  const deleteNode = (id: string) => {
    if (id === flow.rootId) {
      toast({
        title: "Can't delete root",
        description: "Set a different node as root first.",
        variant: "destructive",
      });
      return;
    }
    setFlow((f) => {
      const { [id]: _, ...rest } = f.nodes;
      return { ...f, nodes: rest };
    });
  };

  const nodeList = useMemo(() => Object.values(flow.nodes), [flow.nodes]);
  const nodeOptions = useMemo(
    () =>
      nodeList.map((n) => ({
        id: n.id,
        label:
          n.kind === "question"
            ? `❓ ${n.question || n.id}`
            : `✅ ${n.title || n.id}`,
      })),
    [nodeList],
  );

  const validation = validateFlow(flow);

  const handleSave = () => {
    if (!flow.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    const id = flow.id || slug(flow.title);
    if (!id) {
      toast({ title: "Title must contain letters", variant: "destructive" });
      return;
    }
    onSave({ ...flow, id });
    toast({ title: "Saved", description: "Guide saved to this browser." });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to list
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={() => setExportOpen(true)}>
            <Code2 className="mr-2 h-4 w-4" />
            Export to code
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {validation.length > 0 && (
        <Card className="p-4 bg-warning/10 border-warning/30">
          <p className="text-sm font-semibold text-foreground mb-1">
            Heads up — issues to fix before this works in preview:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-0.5">
            {validation.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Metadata */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-semibold">Guide details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={flow.title}
              onChange={(e) => update({ title: e.target.value })}
              placeholder="e.g. Lawn smells of ammonia"
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input
              value={flow.category}
              onChange={(e) => update({ category: e.target.value })}
              placeholder="Lawn Health"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={flow.description}
              onChange={(e) => update({ description: e.target.value })}
              placeholder="Short summary shown on the Operations hub card."
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>Icon (lucide name)</Label>
            <Input
              value={flow.icon}
              onChange={(e) => update({ icon: e.target.value })}
              placeholder="Wrench"
            />
          </div>
          <div className="space-y-2">
            <Label>Tags (comma separated)</Label>
            <Input
              value={flow.tags.join(", ")}
              onChange={(e) =>
                update({
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              placeholder="lawn, watering, summer"
            />
          </div>
          <div className="space-y-2">
            <Label>Root node (where the flow starts)</Label>
            <Select
              value={flow.rootId}
              onValueChange={(v) => update({ rootId: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {nodeOptions.map((o) => (
                  <SelectItem key={o.id} value={o.id}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ID (auto from title if blank)</Label>
            <Input
              value={flow.id}
              onChange={(e) => update({ id: slug(e.target.value) })}
              placeholder={slug(flow.title) || "auto-generated"}
            />
          </div>
        </div>
      </Card>

      {/* Nodes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Steps & outcomes ({nodeList.length})
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => addNode("question")}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add question
            </Button>
            <Button size="sm" variant="outline" onClick={() => addNode("outcome")}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Add outcome
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {nodeList.map((node) => (
            <NodeEditor
              key={node.id}
              node={node}
              isRoot={node.id === flow.rootId}
              nodeOptions={nodeOptions}
              onChange={(patch) => updateNode(node.id, patch)}
              onDelete={() => deleteNode(node.id)}
            />
          ))}
        </div>
      </div>

      {/* Preview dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {flow.title || "Untitled"}</DialogTitle>
          </DialogHeader>
          {validation.length > 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">
              Fix the validation issues to preview this flow.
            </Card>
          ) : (
            <TriageRunner key={JSON.stringify(flow)} flow={flow} />
          )}
        </DialogContent>
      </Dialog>

      {/* Export dialog */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Export to TypeScript</DialogTitle>
          </DialogHeader>
          <ExportView flow={flow} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ----------------------------- Node editor ----------------------------- */

function NodeEditor({
  node,
  isRoot,
  nodeOptions,
  onChange,
  onDelete,
}: {
  node: TriageNode;
  isRoot: boolean;
  nodeOptions: { id: string; label: string }[];
  onChange: (patch: Partial<TriageNode>) => void;
  onDelete: () => void;
}) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant={node.kind === "question" ? "default" : "secondary"}>
            {node.kind === "question" ? "Question" : "Outcome"}
          </Badge>
          {isRoot && <Badge variant="outline">Root / start</Badge>}
          <code className="text-xs text-muted-foreground">{node.id}</code>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {node.kind === "question" ? (
        <QuestionFields
          node={node}
          nodeOptions={nodeOptions}
          onChange={onChange as (p: Partial<TriageQuestion>) => void}
        />
      ) : (
        <OutcomeFields
          node={node}
          onChange={onChange as (p: Partial<TriageOutcome>) => void}
        />
      )}
    </Card>
  );
}

function QuestionFields({
  node,
  nodeOptions,
  onChange,
}: {
  node: TriageQuestion;
  nodeOptions: { id: string; label: string }[];
  onChange: (p: Partial<TriageQuestion>) => void;
}) {
  const updateOption = (i: number, patch: Partial<TriageOption>) => {
    const next = node.options.map((o, idx) => (idx === i ? { ...o, ...patch } : o));
    onChange({ options: next });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Question</Label>
        <Textarea
          value={node.question}
          onChange={(e) => onChange({ question: e.target.value })}
          rows={2}
          placeholder="What is the customer seeing?"
        />
      </div>
      <div className="space-y-2">
        <Label>Helper text (optional)</Label>
        <Input
          value={node.help ?? ""}
          onChange={(e) => onChange({ help: e.target.value })}
          placeholder="Short guidance shown under the question."
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Answers</Label>
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              onChange({
                options: [...node.options, { label: "", next: "" }],
              })
            }
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add answer
          </Button>
        </div>
        <div className="space-y-2">
          {node.options.map((opt, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[1fr_1fr_auto] items-start">
              <Input
                value={opt.label}
                onChange={(e) => updateOption(i, { label: e.target.value })}
                placeholder="Answer label"
              />
              <Select
                value={opt.next || undefined}
                onValueChange={(v) => updateOption(i, { next: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Goes to…" />
                </SelectTrigger>
                <SelectContent>
                  {nodeOptions
                    .filter((o) => o.id !== node.id)
                    .map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() =>
                  onChange({ options: node.options.filter((_, idx) => idx !== i) })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutcomeFields({
  node,
  onChange,
}: {
  node: TriageOutcome;
  onChange: (p: Partial<TriageOutcome>) => void;
}) {
  const updateAction = (i: number, value: string) => {
    onChange({ actions: node.actions.map((a, idx) => (idx === i ? value : a)) });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-[1fr_200px]">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input
            value={node.title}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Outcome title"
          />
        </div>
        <div className="space-y-2">
          <Label>Severity</Label>
          <Select
            value={node.severity}
            onValueChange={(v) => onChange({ severity: v as Severity })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="resolve">Action & resolve</SelectItem>
              <SelectItem value="info">Inform / monitor</SelectItem>
              <SelectItem value="escalate">Escalate</SelectItem>
              <SelectItem value="stop">Stop</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Summary</Label>
        <Textarea
          value={node.summary}
          onChange={(e) => onChange({ summary: e.target.value })}
          rows={2}
          placeholder="What's going on and what to do next."
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Actions (numbered list)</Label>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onChange({ actions: [...node.actions, ""] })}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add action
          </Button>
        </div>
        <div className="space-y-2">
          {node.actions.map((a, i) => (
            <div key={i} className="grid gap-2 md:grid-cols-[1fr_auto]">
              <Input
                value={a}
                onChange={(e) => updateAction(i, e.target.value)}
                placeholder={`Action ${i + 1}`}
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-destructive hover:text-destructive"
                onClick={() =>
                  onChange({ actions: node.actions.filter((_, idx) => idx !== i) })
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Validation ----------------------------- */

function validateFlow(flow: TriageFlow): string[] {
  const errors: string[] = [];
  if (!flow.title.trim()) errors.push("Title is required.");
  if (!flow.nodes[flow.rootId]) errors.push("Root node is missing.");
  for (const node of Object.values(flow.nodes)) {
    if (node.kind === "question") {
      if (!node.question.trim()) errors.push(`Question "${node.id}" has no text.`);
      if (node.options.length === 0)
        errors.push(`Question "${node.id}" has no answers.`);
      for (const opt of node.options) {
        if (!opt.label.trim())
          errors.push(`An answer in "${node.id}" has no label.`);
        if (!opt.next || !flow.nodes[opt.next])
          errors.push(`Answer "${opt.label || "?"}" in "${node.id}" doesn't link to a valid node.`);
      }
    } else {
      if (!node.title.trim()) errors.push(`Outcome "${node.id}" has no title.`);
    }
  }
  return errors;
}

/* ----------------------------- Export view ----------------------------- */

function ExportView({ flow }: { flow: TriageFlow }) {
  const { toast } = useToast();
  const code = useMemo(() => generateTsSnippet(flow), [flow]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Paste this snippet into{" "}
        <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
          src/data/triage-flows.ts
        </code>{" "}
        (just before the <code className="text-xs">/* Export */</code> section)
        and add the variable name to the{" "}
        <code className="text-xs">triageFlows</code> array.
      </p>
      <div className="relative">
        <pre className="bg-muted text-xs p-4 rounded-lg overflow-auto max-h-[60vh] font-mono">
{code}
        </pre>
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-2 right-2"
          onClick={() => {
            navigator.clipboard.writeText(code);
            toast({ title: "Copied to clipboard" });
          }}
        >
          <Copy className="mr-2 h-3.5 w-3.5" />
          Copy
        </Button>
      </div>
    </div>
  );
}

function generateTsSnippet(flow: TriageFlow): string {
  const id = flow.id || slug(flow.title) || "newFlow";
  const varName = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const nodesCode = Object.values(flow.nodes)
    .map((n) => {
      if (n.kind === "question") {
        const opts = n.options
          .map((o) => `      { label: ${JSON.stringify(o.label)}, next: ${JSON.stringify(o.next)} }`)
          .join(",\n");
        const help = n.help ? `, ${JSON.stringify(n.help)}` : "";
        return `    ${JSON.stringify(n.id)}: q(
      ${JSON.stringify(n.id)},
      ${JSON.stringify(n.question)},
      [
${opts}
      ]${help}
    )`;
      }
      const actions = n.actions.map((a) => `      ${JSON.stringify(a)}`).join(",\n");
      return `    ${JSON.stringify(n.id)}: o(
      ${JSON.stringify(n.id)},
      ${JSON.stringify(n.title)},
      ${JSON.stringify(n.summary)},
      [
${actions}
      ],
      ${JSON.stringify(n.severity)}
    )`;
    })
    .join(",\n");

  return `const ${varName}: TriageFlow = {
  id: ${JSON.stringify(id)},
  title: ${JSON.stringify(flow.title)},
  category: ${JSON.stringify(flow.category)},
  description: ${JSON.stringify(flow.description)},
  icon: ${JSON.stringify(flow.icon)},
  tags: ${JSON.stringify(flow.tags)},
  rootId: ${JSON.stringify(flow.rootId)},
  nodes: {
${nodesCode}
  },
};

// Then add \`${varName}\` to the \`triageFlows\` array below.
`;
}
