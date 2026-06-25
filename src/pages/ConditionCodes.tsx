import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList, Mail, MailX } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  conditionCodes,
  conditionCategories,
  type ConditionCategory,
} from "@/data/condition-codes";

const categoryStyles: Record<ConditionCategory, string> = {
  "Lawn Quality":
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  Weeds:
    "bg-yellow-100 text-yellow-900 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-200 dark:border-yellow-500/30",
  Diseases:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30",
  Pests:
    "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-500/15 dark:text-orange-300 dark:border-orange-500/30",
  "Cultural / Mowing":
    "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30",
  Recommendations:
    "bg-lime-100 text-lime-800 border-lime-200 dark:bg-lime-500/15 dark:text-lime-300 dark:border-lime-500/30",
  "Visit Notes":
    "bg-muted text-muted-foreground border-border",
  Access:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30",
  Weather:
    "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30",
};

const ConditionCodes = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<ConditionCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return conditionCodes.filter((cc) => {
      if (active !== "All" && cc.category !== active) return false;
      if (!q) return true;
      return (
        cc.displayCode.toLowerCase().includes(q) ||
        cc.description.toLowerCase().includes(q) ||
        cc.category.toLowerCase().includes(q) ||
        (cc.customerEmail?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [query, active]);

  const grouped = useMemo(() => {
    const map = new Map<ConditionCategory, typeof conditionCodes>();
    for (const cc of filtered) {
      const list = map.get(cc.category) ?? [];
      list.push(cc);
      map.set(cc.category, list);
    }
    // preserve our canonical order
    return conditionCategories
      .filter((c) => map.has(c))
      .map((c) => [c, map.get(c)!] as const);
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-primary" />
          <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
            Knowledge Centre
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl mt-1">Condition Codes</h1>
        <p className="text-muted-foreground font-body mt-2 max-w-2xl">
          Condition codes are short codes technicians select on a visit to
          record what was seen on the lawn. Most codes automatically trigger a
          piece of advice in the after-service email to the customer — this page
          is the reference for every code, what it means, and exactly what the
          customer is told.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code, weed, disease, etc. e.g. RT, dandelion, aeration…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            active={active === "All"}
            onClick={() => setActive("All")}
          />
          {conditionCategories.map((c) => (
            <CategoryChip
              key={c}
              label={c}
              active={active === c}
              onClick={() => setActive(c)}
            />
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="text-muted-foreground font-body text-center py-10">
          No codes match — try a different search or category.
        </p>
      ) : (
        <div className="space-y-10">
          {grouped.map(([category, codes]) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl">{category}</h2>
                <span className="text-xs font-body text-muted-foreground">
                  {codes.length} code{codes.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="space-y-3">
                {codes.map((cc, i) => (
                  <motion.article
                    key={cc.code}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(i * 0.015, 0.2),
                      duration: 0.2,
                    }}
                    className="bg-card border rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4 flex-wrap">
                      <span className="font-mono text-sm font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded border border-primary/20 min-w-[3rem] text-center">
                        {cc.displayCode}
                      </span>
                      <div className="flex-1 min-w-[12rem]">
                        <p className="font-body font-semibold text-foreground">
                          {cc.description}
                        </p>
                        <span
                          className={`inline-flex items-center mt-1 px-2 py-0.5 rounded border text-[11px] font-body font-medium ${categoryStyles[cc.category]}`}
                        >
                          {cc.category}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-body px-2 py-1 rounded border ${
                          cc.customerEmail
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30"
                            : "bg-muted text-muted-foreground border-border"
                        }`}
                        title={
                          cc.customerEmail
                            ? "Triggers a customer email"
                            : "Internal only — no customer email"
                        }
                      >
                        {cc.customerEmail ? (
                          <>
                            <Mail className="h-3 w-3" /> Sends email
                          </>
                        ) : (
                          <>
                            <MailX className="h-3 w-3" /> Internal only
                          </>
                        )}
                      </span>
                    </div>

                    {cc.customerEmail && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          Customer email
                        </p>
                        <p className="text-sm font-body text-foreground/90 leading-relaxed whitespace-pre-line">
                          {cc.customerEmail}
                        </p>
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

export default ConditionCodes;
