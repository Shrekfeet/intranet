import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, FileText } from "lucide-react";
import { policies, policyCategories, type PolicyCategory } from "@/data/policies";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Policies = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<PolicyCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return policies.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">Reference</span>
        <h1 className="text-3xl md:text-4xl mt-1">Policies & Documents</h1>
        <p className="text-muted-foreground font-body mt-2 max-w-2xl">
          Company policies, procedures and reference documents — searchable and grouped by area.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search policies…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip label="All" active={active === "All"} onClick={() => setActive("All")} />
          {policyCategories.map((c) => (
            <Chip key={c} label={c} active={active === c} onClick={() => setActive(c)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.3), duration: 0.3 }}
          >
            <Link
              to={`/policies/${p.id}`}
              className="group block bg-card border rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all h-full"
            >
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="font-body font-medium text-xs">{p.category}</Badge>
                    <span className="text-xs text-muted-foreground font-body">Updated {p.updated}</span>
                  </div>
                  <h3 className="text-lg group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{p.summary}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="text-muted-foreground font-body col-span-full text-center py-10">
            No policies match — try a different search.
          </p>
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

export default Policies;
