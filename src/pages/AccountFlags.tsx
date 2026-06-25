import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  accountFlags,
  flagCategories,
  type FlagCategory,
  type FlagTone,
} from "@/data/account-flags";

// Reproduce the colourful "label" look from the customer system.
// Tones are HSL-themed so they work in light & dark mode without raw colours in components.
const toneStyles: Record<FlagTone, string> = {
  blue: "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-500/15 dark:text-sky-300 dark:border-sky-500/30",
  green:
    "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30",
  yellow:
    "bg-yellow-200 text-yellow-900 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-200 dark:border-yellow-500/40",
  red: "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-300 dark:border-red-500/30",
  pink: "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-500/15 dark:text-pink-300 dark:border-pink-500/30",
  teal: "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30",
  highlight:
    "bg-lime-300 text-lime-950 border-lime-400 font-semibold dark:bg-lime-400/30 dark:text-lime-100 dark:border-lime-400/50",
  neutral:
    "bg-muted text-muted-foreground border-border",
};

const AccountFlags = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<FlagCategory | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return accountFlags.filter((f) => {
      if (active !== "All" && f.category !== active) return false;
      if (!q) return true;
      return (
        f.label.toLowerCase().includes(q) ||
        f.shortMeaning.toLowerCase().includes(q) ||
        f.details.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q)
      );
    });
  }, [query, active]);

  const grouped = useMemo(() => {
    const map = new Map<FlagCategory, typeof accountFlags>();
    for (const f of filtered) {
      const list = map.get(f.category) ?? [];
      list.push(f);
      map.set(f.category, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
            Knowledge Centre
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl mt-1">Account Flags</h1>
        <p className="text-muted-foreground font-body mt-2 max-w-2xl">
          Flags are quick visual labels we attach to customer accounts. They give
          technicians and office staff an at-a-glance summary of access notes,
          property quirks, lawn condition and customer history. This page is the
          glossary — search a flag to learn what it means and what to do about it.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search flags e.g. irrigation, autumn leaves, key account…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip
            label="All"
            active={active === "All"}
            onClick={() => setActive("All")}
          />
          {flagCategories.map((c) => (
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
          No flags match — try a different search or category.
        </p>
      ) : (
        <div className="space-y-10">
          {grouped.map(([category, flags]) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl">{category}</h2>
                <span className="text-xs font-body text-muted-foreground">
                  {flags.length} flag{flags.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flags.map((f, i) => (
                  <motion.article
                    key={f.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: Math.min(i * 0.03, 0.25),
                      duration: 0.25,
                    }}
                    className="bg-card border rounded-xl p-5 space-y-3"
                  >
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded border text-xs font-body font-medium ${toneStyles[f.tone]}`}
                    >
                      {f.label}
                    </span>
                    <p className="font-body font-medium text-foreground">
                      {f.shortMeaning}
                    </p>
                    <p className="text-sm font-body text-muted-foreground leading-relaxed">
                      {f.details}
                    </p>
                    {f.whatToDo && f.whatToDo.length > 0 && (
                      <div className="pt-2 border-t">
                        <p className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                          What to do
                        </p>
                        <ul className="space-y-1.5 font-body text-sm text-foreground/90">
                          {f.whatToDo.map((w, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span>{w}</span>
                            </li>
                          ))}
                        </ul>
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

export default AccountFlags;
