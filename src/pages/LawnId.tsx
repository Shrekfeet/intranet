import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Leaf } from "lucide-react";
import { lawnIdEntries, lawnIdCategories, type LawnIdCategory } from "@/data/lawn-id";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/PageHeader";
import { InDevBanner } from "@/components/InDevBanner";

const categoryStyles: Record<LawnIdCategory, string> = {
  "Grass Type": "bg-primary/10 text-primary",
  Pest: "bg-destructive/10 text-destructive",
  Disease: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Weed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  "Cultural Practice": "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  "Stress / Abiotic": "bg-orange-500/15 text-orange-700 dark:text-orange-400",
  Treatment: "bg-violet-500/15 text-violet-700 dark:text-violet-400",
};

const isLawnIdCategory = (v: string): v is LawnIdCategory =>
  (lawnIdCategories as readonly string[]).includes(v);

const LawnId = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<LawnIdCategory | "All">(() => {
    const c = searchParams.get("category");
    return c && isLawnIdCategory(c) ? c : "All";
  });

  useEffect(() => {
    const c = searchParams.get("category");
    setActive(c && isLawnIdCategory(c) ? c : "All");
  }, [searchParams]);

  const setCategory = (c: LawnIdCategory | "All") => {
    setActive(c);
    if (c === "All") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ category: c }, { replace: true });
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lawnIdEntries.filter((e) => {
      if (active !== "All" && e.category !== active) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.shortDescription.toLowerCase().includes(q) ||
        e.tags.some((t) => t.includes(q))
      );
    });
  }, [query, active]);

  return (
    <div className="space-y-8">
      <InDevBanner reason="Lawn ID entries are being reviewed and expanded. Some conditions, pests, and treatments may be missing or not yet specific to Shrekfeet's service areas." />
      <PageHeader
        icon={Leaf}
        label="Knowledge Centre"
        title="Lawn ID"
        description="Identify grasses, pests, diseases, weeds, stresses and treatments. Each entry links to related issues so you can follow the chain from symptom to fix."
        iconClass="text-sky-600"
        bgClass="bg-sky-50/60 border border-sky-200/50"
      />

      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. red thread, fescues, leatherjackets…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <CategoryChip label="All" active={active === "All"} onClick={() => setCategory("All")} />
          {lawnIdCategories.map((c) => (
            <CategoryChip key={c} label={c} active={active === c} onClick={() => setCategory(c)} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.3), duration: 0.3 }}
          >
            <Link
              to={`/lawn-id/${e.id}`}
              className="group block bg-card border rounded-xl overflow-hidden hover:shadow-md hover:border-sky-400/40 transition-all h-full"
            >
              <div className="aspect-[16/9] bg-muted overflow-hidden">
                <img
                  src={e.image ?? "/placeholder.svg"}
                  alt={e.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="p-4 space-y-2">
                <Badge className={`${categoryStyles[e.category]} border-0 font-body font-medium`} variant="secondary">
                  {e.category}
                </Badge>
                <h3 className="text-lg group-hover:text-primary transition-colors">{e.name}</h3>
                <p className="text-sm text-muted-foreground font-body line-clamp-2">{e.shortDescription}</p>
              </div>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 space-y-2">
            <Leaf className="h-8 w-8 text-muted-foreground/40 mx-auto" />
            <p className="text-muted-foreground font-body">No entries match — try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

function CategoryChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
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

export default LawnId;
