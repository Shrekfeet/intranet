import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, Wrench, Sparkles, ArrowRight, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TriageCard } from "@/components/triage/TriageCard";
import { triageFlows, allTags } from "@/data/triage-flows";
import { useCustomFlows } from "@/hooks/use-custom-flows";
import { PageHeader } from "@/components/PageHeader";
import { InDevBanner } from "@/components/InDevBanner";

const Operations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const { flows: customFlows } = useCustomFlows();
  const allFlows = useMemo(() => {
    const map = new Map(triageFlows.map((f) => [f.id, f]));
    for (const f of customFlows) map.set(f.id, f);
    return Array.from(map.values());
  }, [customFlows]);

  const toggleTag = (tag: string) => {
    setActiveTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allFlows.filter((flow) => {
      if (categoryParam && flow.category !== categoryParam) return false;
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
  }, [query, activeTags, allFlows, categoryParam]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof triageFlows>();
    for (const f of filtered) {
      const list = map.get(f.category) ?? [];
      list.push(f);
      map.set(f.category, list);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="space-y-8 max-w-6xl">
      <InDevBanner reason="Triage flows and troubleshooting guides are being expanded and tailored to Shrekfeet's specific products and processes." />
      <PageHeader
        icon={Wrench}
        label="Operations"
        title="Troubleshooting Hub"
        description="Step-by-step triage guides for the most common issues we hear from customers. Pick a flow or use Smart Triage to be routed automatically."
        iconClass="text-amber-600"
        bgClass="bg-amber-50/60 border border-amber-200/50"
      />

      {/* Smart Triage CTA */}
      <Card className="p-6 md:p-8 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Sparkles className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1 space-y-1">
            <h2 className="text-2xl text-white">Not sure where to start?</h2>
            <p className="text-white/85">
              Smart Triage asks a few questions and routes you to the right flow.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-white text-amber-700 hover:bg-white/90">
            <Link to="/operations/smart-triage">
              Start Smart Triage
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Card>

      {/* Active category filter */}
      {categoryParam && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm gap-1">
            {categoryParam}
            <button
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete("category");
                setSearchParams(next);
              }}
              className="ml-1 inline-flex items-center justify-center rounded-full hover:bg-muted p-0.5"
              aria-label="Clear category filter"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        </div>
      )}

      {/* Search + tag filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search issues, treatments, or symptoms…"
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
                    ? "bg-amber-500 text-white"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {(query || activeTags.length > 0) && (
            <button
              onClick={() => { setQuery(""); setActiveTags([]); }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center space-y-2">
          <Wrench className="h-8 w-8 text-muted-foreground/40 mx-auto" />
          <p className="text-lg font-semibold">No matching flows</p>
          <p className="text-muted-foreground">Try a different search term or clear the filters.</p>
        </Card>
      ) : (
        <div className="space-y-8">
          {grouped.map(([category, flows]) => (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl">{category}</h2>
                <Badge variant="secondary">{flows.length}</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {flows.map((flow) => (
                  <TriageCard key={flow.id} flow={flow} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default Operations;
