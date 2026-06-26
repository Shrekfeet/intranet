import { CalendarDays, AlertTriangle, ChevronRight } from "lucide-react";
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
      <ChevronRight className={cn("h-3 w-3 flex-shrink-0 mt-0.5", meta.colour)} />
      <div className="min-w-0">
        <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide block", meta.colour)}>
          {meta.label}
        </span>
        <span className={cn("text-xs font-body leading-snug", meta.colour)}>
          {task.label}
          {task.note && (
            <span className="block text-[10px] opacity-75 mt-0.5 italic">{task.note}</span>
          )}
        </span>
      </div>
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
        description="Treatment cycles, renovation windows, Grub X timing and what to watch out for each month."
        iconClass="text-emerald-700"
        bgClass="bg-emerald-500/10"
      />

      {/* This month highlight */}
      <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 md:p-6 space-y-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-body font-bold uppercase tracking-widest text-primary">
            This month
          </span>
          <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide px-2 py-0.5 rounded", priorityBadge[thisMonth.priority])}>
            {thisMonth.priority} activity
          </span>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl mb-1">{thisMonth.month}</h2>
          <p className="text-muted-foreground font-body text-sm">{thisMonth.headline}</p>
        </div>

        {/* Tasks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {thisMonth.tasks.map((t, i) => (
            <TaskChip key={i} task={t} />
          ))}
        </div>

        {/* Alerts */}
        {thisMonth.alerts.length > 0 && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs font-body font-bold uppercase tracking-wider text-amber-700">
                Watch out for this month
              </p>
            </div>
            {thisMonth.alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                <p className="text-xs font-body text-amber-800 leading-snug">{a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full year grid */}
      <div>
        <h2 className="text-xl mb-4">Full year at a glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {seasonalCalendar.map((m) => {
            const isNow = m.index === currentMonth;
            const uniqueTypes = Array.from(new Set(m.tasks.map((t) => t.type)));
            return (
              <div
                key={m.month}
                className={cn(
                  "rounded-xl border p-4 space-y-3",
                  isNow
                    ? "border-primary/30 bg-primary/5 ring-2 ring-primary/20"
                    : "bg-card",
                )}
              >
                {/* Month header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className={cn("font-heading font-bold text-lg leading-tight", isNow && "text-primary")}>
                      {m.month}
                      {isNow && <span className="ml-2 text-[10px] font-body font-bold uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">Now</span>}
                    </p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-2">{m.headline}</p>
                  </div>
                  <span className={cn("text-[10px] font-body font-bold uppercase tracking-wide px-2 py-0.5 rounded flex-shrink-0 mt-0.5", priorityBadge[m.priority])}>
                    {m.priority}
                  </span>
                </div>

                {/* Treatment type pills */}
                <div className="flex flex-wrap gap-1.5">
                  {uniqueTypes.map((type) => {
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
                      <li key={i} className="flex items-start gap-1.5 text-xs font-body text-foreground/75 leading-snug">
                        <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0", meta.bg.replace("bg-", "bg-").replace("100", "400"))} />
                        {t.label}
                      </li>
                    );
                  })}
                </ul>

                {/* Alerts — compact */}
                {m.alerts.length > 0 && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 space-y-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="h-3 w-3 text-amber-500 flex-shrink-0" />
                      <span className="text-[10px] font-body font-bold uppercase tracking-wide text-amber-600">Watch for</span>
                    </div>
                    {m.alerts.map((a, i) => (
                      <p key={i} className="text-[11px] font-body text-amber-800 leading-snug">{a}</p>
                    ))}
                  </div>
                )}
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
