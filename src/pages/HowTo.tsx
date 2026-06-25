import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  PackageSearch,
  Wallet,
  ShieldAlert,
  Phone,
  Sprout,
  FileSignature,
  HelpCircle,
  ArrowRight,
  Clock,
} from "lucide-react";
import {
  howToGuides,
  howToCategories,
  type HowToCategory,
  type HowToGuide,
} from "@/data/how-to-guides";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";

const iconMap: Record<NonNullable<HowToGuide["icon"]>, React.ComponentType<{ className?: string }>> = {
  PackageSearch,
  Wallet,
  ShieldAlert,
  Phone,
  Sprout,
  FileSignature,
};

const categoryAccent: Record<HowToCategory, string> = {
  Operations: "bg-primary/10 text-primary",
  "Customer Care": "bg-teal-500/15 text-teal-700",
  Finance: "bg-amber-500/15 text-amber-700",
  "Health & Safety": "bg-destructive/10 text-destructive",
  "Office Admin": "bg-violet-500/15 text-violet-700",
  "Field Work": "bg-orange-500/15 text-orange-700",
};

const HowTo = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<HowToCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return howToGuides.filter((g) => {
      if (active !== "All" && g.category !== active) return false;
      if (!q) return true;
      const haystack = [g.title, g.summary, g.category, ...(g.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, active]);

  return (
    <div className="space-y-8">
      <PageHeader
        icon={HelpCircle}
        label="How to…"
        title="How-To Guides"
        description="Step-by-step playbooks for common situations — handling property damage, ordering products, setting up a prepay balance, and more."
        iconClass="text-primary"
        bgClass="bg-primary/5 border border-primary/15"
      />

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search how-to guides…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip label="All" active={active === "All"} onClick={() => setActive("All")} />
          {howToCategories.map((c) => (
            <Chip key={c} label={c} active={active === c} onClick={() => setActive(c)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((g, i) => {
          const Icon = g.icon ? iconMap[g.icon] : HelpCircle;
          const stepCount = g.sections
            .filter((s) => s.kind === "steps")
            .reduce((n, s) => n + (s.kind === "steps" ? s.steps.length : 0), 0);

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
            >
              <Link
                to={`/how-to/${g.id}`}
                className="group block bg-card border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all h-full"
              >
                <div className="flex items-start gap-4">
                  <div className={`h-11 w-11 rounded-lg flex items-center justify-center flex-shrink-0 ${categoryAccent[g.category]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="font-body font-medium text-xs">
                        {g.category}
                      </Badge>
                      {stepCount > 0 && (
                        <span className="text-xs text-muted-foreground font-body">{stepCount} steps</span>
                      )}
                      {g.estimatedTime && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-body">
                          <Clock className="h-3 w-3" />
                          {g.estimatedTime}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg group-hover:text-primary transition-colors">{g.title}</h3>
                    <p className="text-sm text-muted-foreground font-body">{g.summary}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 space-y-2">
            <HelpCircle className="h-8 w-8 text-muted-foreground/40 mx-auto" />
            <p className="text-muted-foreground font-body">No guides match — try a different search or category.</p>
          </div>
        )}
      </div>
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

export default HowTo;
