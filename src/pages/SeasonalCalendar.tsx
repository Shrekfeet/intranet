import { CalendarDays, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { seasonalCalendar, treatmentMeta, type TreatmentTask } from "@/data/seasonal-calendar";
import { cn } from "@/lib/utils";

const currentMonth = new Date().getMonth(); // 0-based

const priorityBadge: Record<string, string> = {
  high:   "bg-red-100 text-red-700 border border-red-200",
  medium: "bg-amber-100 text-amber-700 border border-amber-200",
  low:    "bg-slate-100 text-slate-600 border border-slate-200",
};

function TaskChip({ task }: { task: TreatmentTask }) {
  const meta = treatmentMeta[task.type];
  return (
    <div className={cn("flex items-start gap-2 rounded-lg px-2.5 py-2", meta.bg)}>
      <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide flex-shrink-0 mt-0.5", meta.colour)}>
        {meta.label}
      </span>
      <ChevronRight className={cn("h-3 w-3 flex-shrink-0 mt-0.5", meta.colour)} />
      <span className={cn("text-xs font-body leading-snug", meta.colour)}>
        {task.label}
        {task.note && (
          <span className="block text-[10px] opacity-75 mt-0.5">{task.note}</span>
        )}
      </span>
    </div>
  );
}

export default function SeasonalCalendar() {
  const thisMonth = seasonalCalendar[currentMonth];

  return (
    <div className="space-y-8">
      <PageHeader
        icon={CalendarDays}
        label="Hampshire · Berkshire · West Sussex · Surrey"
        title="Seasonal Treatment Calendar"
        description="Month-by-month lawn care programme for our operating region."
        iconClass="text-emerald-700"
        bgClass="bg-emerald-500/10"
      />

      {/* This month highlight */}
      <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 md:p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-body font-bold uppercase tracking-widest text-primary">
            This month
          </span>
          <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide px-2 py-0.5 rounded", priorityBadge[thisMonth.priority])}>
            {thisMonth.priority} activity
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl mb-1">{thisMonth.month}</h2>
        <p className="text-muted-foreground font-body text-sm mb-4">{thisMonth.headline}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {thisMonth.tasks.map((t, i) => (
            <TaskChip key={i} task={t} />
          ))}
        </div>
      </div>

      {/* Full year grid */}
      <div>
        <h2 className="text-xl mb-4">Full year at a glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seasonalCalendar.map((m) => {
            const isNow = m.index === currentMonth;
            return (
              <div
                key={m.month}
                className={cn(
                  "rounded-xl border p-4 space-y-3 transition-all",
                  isNow
                    ? "border-primary/30 bg-primary/5 ring-2 ring-primary/20"
                    : "bg-card",
                )}
              >
                {/* Month header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={cn("font-heading font-bold text-lg leading-tight", isNow && "text-primary")}>
                      {m.month}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-1">{m.headline}</p>
                  </div>
                  <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0", priorityBadge[m.priority])}>
                    {m.priority}
                  </span>
                </div>

                {/* Treatment type chips — compact */}
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set(m.tasks.map((t) => t.type))).map((type) => {
                    const meta = treatmentMeta[type];
                    return (
                      <span
                        key={type}
                        className={cn("text-[10px] font-body font-semibold px-2 py-0.5 rounded-full", meta.bg, meta.colour)}
                      >
                        {meta.label}
                      </span>
                    );
                  })}
                </div>

                {/* Task list */}
                <ul className="space-y-1">
                  {m.tasks.map((t, i) => {
                    const meta = treatmentMeta[t.type];
                    return (
                      <li key={i} className="flex items-start gap-1.5 text-xs font-body text-foreground/75">
                        <span className={cn("mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0", meta.bg.replace("bg-", "bg-").replace("100", "500"))} />
                        {t.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="rounded-xl border bg-card p-4">
        <p className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-3">Treatment key</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(treatmentMeta).map(([, meta]) => (
            <span
              key={meta.label}
              className={cn("text-[11px] font-body font-semibold px-2.5 py-1 rounded-full", meta.bg, meta.colour)}
            >
              {meta.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
