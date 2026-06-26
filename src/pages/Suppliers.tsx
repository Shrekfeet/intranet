import { useState } from "react";
import { Phone, Mail, MapPin, Search, Building2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { suppliers, supplierCategories, type SupplierCategory, type OrderLevel } from "@/data/suppliers";
import { cn } from "@/lib/utils";

const levelColour: Record<OrderLevel, string> = {
  Primary:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  Secondary: "bg-sky-100 text-sky-700 border-sky-200",
  Adhoc:     "bg-slate-100 text-slate-600 border-slate-200",
};

const levelOrder: Record<OrderLevel, number> = { Primary: 0, Secondary: 1, Adhoc: 2 };

const ALL = "All categories";

export default function Suppliers() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<SupplierCategory | typeof ALL>(ALL);
  const [level, setLevel] = useState<OrderLevel | "All">("All");

  const filtered = suppliers
    .filter((s) => category === ALL || s.category === category)
    .filter((s) => level === "All" || s.orderLevel === level)
    .filter((s) => {
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.service.toLowerCase().includes(q) ||
        s.contact?.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => levelOrder[a.orderLevel] - levelOrder[b.orderLevel] || a.name.localeCompare(b.name));

  const grouped = supplierCategories
    .filter((c) => category === ALL || c === category)
    .map((c) => ({ cat: c, items: filtered.filter((s) => s.category === c) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Building2}
        label="Resources"
        title="Supplier Directory"
        description="All active suppliers — contacts, terms and service details."
        iconClass="text-indigo-700"
        bgClass="bg-indigo-500/10"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search suppliers, services or contacts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as OrderLevel | "All")}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="All">All levels</option>
          <option value="Primary">Primary</option>
          <option value="Secondary">Secondary</option>
          <option value="Adhoc">Adhoc</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as SupplierCategory | typeof ALL)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm font-body focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value={ALL}>All categories</option>
          {supplierCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground font-body">
        {filtered.length} supplier{filtered.length !== 1 ? "s" : ""}
        {query || category !== ALL || level !== "All" ? " matching filters" : " total"}
      </p>

      {/* Groups */}
      {grouped.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground font-body">
          No suppliers match your search.
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ cat, items }) => (
            <section key={cat}>
              <h2 className="text-base font-heading font-semibold text-foreground/70 mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-border" />
                {cat}
                <span className="text-xs font-body font-normal text-muted-foreground">{items.length}</span>
                <span className="h-px flex-1 bg-border" />
              </h2>

              {/* Card grid — stacks on mobile, 2-col on sm, 3-col on xl */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {items.map((s) => (
                  <div
                    key={s.id}
                    className="bg-card border rounded-xl p-4 space-y-3 flex flex-col"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-body font-semibold text-sm text-foreground leading-snug">{s.name}</p>
                        <p className="text-xs text-muted-foreground font-body mt-0.5">{s.service}</p>
                      </div>
                      <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide px-2 py-0.5 rounded border flex-shrink-0", levelColour[s.orderLevel])}>
                        {s.orderLevel}
                      </span>
                    </div>

                    {/* Contact details */}
                    <div className="space-y-1.5 text-sm font-body">
                      {s.contact && (
                        <p className="text-foreground/80 font-medium text-xs">{s.contact}</p>
                      )}
                      {s.telephone && (
                        <a
                          href={`tel:${s.telephone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-xs text-primary hover:underline min-h-[36px]"
                        >
                          <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                          {s.telephone}
                        </a>
                      )}
                      {s.email && (
                        <a
                          href={`mailto:${s.email}`}
                          className="flex items-center gap-2 text-xs text-primary hover:underline break-all min-h-[36px]"
                        >
                          <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                          {s.email}
                        </a>
                      )}
                      {s.address && (
                        <p className="flex items-start gap-2 text-xs text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                          {s.address}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    {s.paymentTerms !== undefined && (
                      <div className="mt-auto pt-2 border-t">
                        <p className="text-[11px] text-muted-foreground font-body">
                          Payment: <span className="font-semibold text-foreground/70">{s.paymentTerms} days</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
