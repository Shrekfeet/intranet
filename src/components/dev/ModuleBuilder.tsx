import { useMemo, useState } from "react";
import { ArrowLeft, BookOpen, Code2, Copy, Eye, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useCustomModules } from "@/hooks/use-custom-modules";
import {
  trainingPaths,
  trainingPathOrder,
  type Lesson,
  type TrainingModule,
  type TrainingRoleId,
  type TrainingStageId,
} from "@/data/training-modules";

const slug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const newId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 7)}`;

const blankLesson = (): Lesson => ({
  id: newId("lesson"),
  title: "",
  duration: "10 min",
  content: "",
});

const blankModule = (): TrainingModule => ({
  id: "",
  title: "",
  description: "",
  icon: "BookOpen",
  category: "Role-Specific",
  estimatedTime: "30 min",
  roles: ["technician"],
  stage: "company-basics",
  lessons: [blankLesson()],
});

export function ModuleBuilder() {
  const { modules, upsert, remove } = useCustomModules();
  const [editing, setEditing] = useState<TrainingModule | null>(null);

  return editing ? (
    <ModuleEditor
      initial={editing}
      onCancel={() => setEditing(null)}
      onSave={(module) => {
        upsert(module);
        setEditing(null);
      }}
    />
  ) : (
    <ModuleList
      modules={modules}
      onNew={() => setEditing(blankModule())}
      onEdit={(module) => setEditing(structuredClone(module))}
      onDelete={remove}
    />
  );
}

function ModuleList({
  modules,
  onNew,
  onEdit,
  onDelete,
}: {
  modules: TrainingModule[];
  onNew: () => void;
  onEdit: (module: TrainingModule) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl">Your learning modules ({modules.length})</h2>
        <Button onClick={onNew}>
          <Plus className="mr-2 h-4 w-4" />
          New module
        </Button>
      </div>

      {modules.length === 0 ? (
        <Card className="space-y-2 p-12 text-center">
          <p className="text-lg font-semibold">No custom modules yet</p>
          <p className="text-muted-foreground">
            Build local-only learning modules here, then export them into the training data when you're ready.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {modules.map((module) => (
            <Card key={module.id} className="space-y-3 p-5">
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-xs">{module.category}</Badge>
                  <span className="text-xs text-muted-foreground">{module.lessons.length} lessons</span>
                  <span className="text-xs text-muted-foreground">{module.estimatedTime}</span>
                </div>
                <h3 className="truncate font-semibold">{module.title || "Untitled module"}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{module.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => onEdit(module)}>
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => {
                    if (confirm(`Delete \"${module.title}\"?`)) onDelete(module.id);
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

function ModuleEditor({
  initial,
  onCancel,
  onSave,
}: {
  initial: TrainingModule;
  onCancel: () => void;
  onSave: (module: TrainingModule) => void;
}) {
  const [module, setModule] = useState<TrainingModule>(initial);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const { toast } = useToast();

  const validation = validateModule(module);
  const activeStages = useMemo(() => {
    const stageMap = new Map<TrainingStageId, { id: TrainingStageId; label: string }>();
    module.roles.forEach((role) => {
      trainingPaths[role].stages.forEach((stage) => {
        if (!stageMap.has(stage.id)) stageMap.set(stage.id, { id: stage.id, label: stage.label });
      });
    });
    return Array.from(stageMap.values());
  }, [module.roles]);

  const update = (patch: Partial<TrainingModule>) => setModule((current) => ({ ...current, ...patch }));

  const updateRole = (role: TrainingRoleId, checked: boolean) => {
    const roles = checked ? [...module.roles, role] : module.roles.filter((item) => item !== role);
    const nextRoles = Array.from(new Set(roles));
    const fallbackStage = trainingPaths[nextRoles[0] ?? "technician"].stages[0].id;
    update({
      roles: nextRoles.length > 0 ? nextRoles : ["technician"],
      stage: nextRoles.length > 0 ? module.stage : fallbackStage,
      isShared: nextRoles.length > 1,
    });
  };

  const updateLesson = (lessonId: string, patch: Partial<Lesson>) => {
    update({
      lessons: module.lessons.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...patch } : lesson)),
    });
  };

  const handleSave = () => {
    if (!module.title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    if (module.lessons.length === 0) {
      toast({ title: "At least one lesson is required", variant: "destructive" });
      return;
    }
    const id = module.id || slug(module.title);
    if (!id) {
      toast({ title: "Title must contain letters", variant: "destructive" });
      return;
    }
    onSave({ ...module, id, isShared: module.roles.length > 1 ? true : module.isShared });
    toast({ title: "Saved", description: "Module saved to this browser." });
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
        <Card className="border-warning/30 bg-warning/10 p-4">
          <p className="mb-1 text-sm font-semibold text-foreground">Heads up — issues to fix before this works in preview:</p>
          <ul className="list-disc space-y-0.5 pl-5 text-sm text-muted-foreground">
            {validation.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="space-y-4 p-6">
        <h2 className="text-lg font-semibold">Module details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={module.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Winter service expectations" />
          </div>
          <div className="space-y-2">
            <Label>Estimated time</Label>
            <Input value={module.estimatedTime} onChange={(e) => update({ estimatedTime: e.target.value })} placeholder="30 min" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Description</Label>
            <Textarea value={module.description} onChange={(e) => update({ description: e.target.value })} rows={2} placeholder="Short summary shown on the training hub card." />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input value={module.category} onChange={(e) => update({ category: e.target.value })} placeholder="Role-Specific" />
          </div>
          <div className="space-y-2">
            <Label>Icon (lucide name)</Label>
            <Input value={module.icon} onChange={(e) => update({ icon: e.target.value })} placeholder="BookOpen" />
          </div>
          <div className="space-y-3 md:col-span-2">
            <Label>Roles</Label>
            <div className="grid gap-3 md:grid-cols-2">
              {trainingPathOrder.map((role) => (
                <label key={role} className="flex items-start gap-3 rounded-lg border bg-background p-4">
                  <Checkbox checked={module.roles.includes(role)} onCheckedChange={(checked) => updateRole(role, checked === true)} />
                  <div className="space-y-1">
                    <p className="font-medium">{trainingPaths[role].title}</p>
                    <p className="text-sm text-muted-foreground">{trainingPaths[role].description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Stage</Label>
            <Select value={module.stage} onValueChange={(value) => update({ stage: value as TrainingStageId })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activeStages.map((stage) => (
                  <SelectItem key={stage.id} value={stage.id}>{stage.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>ID (auto from title if blank)</Label>
            <Input value={module.id} onChange={(e) => update({ id: slug(e.target.value) })} placeholder={slug(module.title) || "auto-generated"} />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Lessons ({module.lessons.length})</h2>
          <Button size="sm" variant="outline" onClick={() => update({ lessons: [...module.lessons, blankLesson()] })}>
            <Plus className="mr-2 h-3.5 w-3.5" />
            Add lesson
          </Button>
        </div>
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => (
            <Card key={lesson.id} className="space-y-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Lesson {index + 1}</Badge>
                  <code className="text-xs text-muted-foreground">{lesson.id}</code>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                  onClick={() => update({ lessons: module.lessons.filter((item) => item.id !== lesson.id) })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_160px]">
                <div className="space-y-2">
                  <Label>Lesson title</Label>
                  <Input value={lesson.title} onChange={(e) => updateLesson(lesson.id, { title: e.target.value })} placeholder="e.g. Greeting the customer" />
                </div>
                <div className="space-y-2">
                  <Label>Duration</Label>
                  <Input value={lesson.duration} onChange={(e) => updateLesson(lesson.id, { duration: e.target.value })} placeholder="10 min" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Lesson content</Label>
                <Textarea
                  value={lesson.content}
                  onChange={(e) => updateLesson(lesson.id, { content: e.target.value })}
                  rows={8}
                  placeholder={"Use paragraphs, bullet lines starting with - , or numbered steps like 1. 2. 3."}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview: {module.title || "Untitled module"}</DialogTitle>
          </DialogHeader>
          {validation.length > 0 ? (
            <Card className="p-6 text-sm text-muted-foreground">Fix the validation issues to preview this module.</Card>
          ) : (
            <ModulePreview module={module} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Export to TypeScript</DialogTitle>
          </DialogHeader>
          <ModuleExportView module={module} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ModulePreview({ module }: { module: TrainingModule }) {
  const stageLabel = trainingPaths[module.roles[0]].stages.find((stage) => stage.id === module.stage)?.label ?? module.stage;

  return (
    <div className="space-y-4">
      <Card className="space-y-4 rounded-xl p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>{module.category}</span>
          <span>•</span>
          <span>{stageLabel}</span>
        </div>
        <div>
          <h3 className="text-2xl">{module.title}</h3>
          <p className="mt-1 text-muted-foreground">{module.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>{module.estimatedTime}</span>
          <span>{module.lessons.length} lessons</span>
          <span>{module.roles.length > 1 ? "Shared across both roles" : trainingPaths[module.roles[0]].title}</span>
        </div>
      </Card>

      {module.lessons.map((lesson, index) => (
        <Card key={lesson.id} className="space-y-3 rounded-xl p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Lesson {index + 1}</p>
              <h4 className="mt-1 text-lg font-medium">{lesson.title}</h4>
            </div>
            <Badge variant="outline">{lesson.duration}</Badge>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            {lesson.content.split("\n\n").map((block, blockIndex) => (
              <div key={blockIndex} className="space-y-1">
                {block.split("\n").map((line, lineIndex) => (
                  <p key={lineIndex}>{line.replace(/\*\*/g, "")}</p>
                ))}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function validateModule(module: TrainingModule): string[] {
  const errors: string[] = [];
  if (!module.title.trim()) errors.push("Title is required.");
  if (!module.description.trim()) errors.push("Description is required.");
  if (module.roles.length === 0) errors.push("Choose at least one role.");
  if (!module.estimatedTime.trim()) errors.push("Estimated time is required.");
  if (module.lessons.length === 0) errors.push("Add at least one lesson.");
  module.lessons.forEach((lesson, index) => {
    if (!lesson.title.trim()) errors.push(`Lesson ${index + 1} has no title.`);
    if (!lesson.content.trim()) errors.push(`Lesson ${index + 1} has no content.`);
  });
  return errors;
}

function ModuleExportView({ module }: { module: TrainingModule }) {
  const { toast } = useToast();
  const code = useMemo(() => generateModuleSnippet(module), [module]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Paste this object into <code className="rounded bg-muted px-1.5 py-0.5 text-xs">src/data/training-modules.ts</code> inside the <code className="text-xs">trainingModules</code> array.
      </p>
      <div className="relative">
        <pre className="max-h-[60vh] overflow-auto rounded-lg bg-muted p-4 font-mono text-xs">{code}</pre>
        <Button
          size="sm"
          variant="secondary"
          className="absolute right-2 top-2"
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

function generateModuleSnippet(module: TrainingModule) {
  const exportable = {
    ...module,
    id: module.id || slug(module.title) || "new-module",
    isShared: module.roles.length > 1 ? true : module.isShared,
  };

  return `${JSON.stringify(exportable, null, 2)},`;
}