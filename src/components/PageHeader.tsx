interface PageHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  iconClass?: string;
  bgClass?: string;
}

export function PageHeader({
  icon: Icon,
  label,
  title,
  description,
  iconClass = "text-primary",
  bgClass = "bg-primary/5 border border-primary/15",
}: PageHeaderProps) {
  return (
    <div className={`rounded-2xl p-6 md:p-8 ${bgClass}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${iconClass}`} />
        <span className={`text-[11px] font-body font-bold uppercase tracking-widest ${iconClass}`}>
          {label}
        </span>
      </div>
      <h1 className="text-3xl md:text-4xl">{title}</h1>
      <p className="text-muted-foreground font-body mt-2 max-w-2xl">{description}</p>
    </div>
  );
}
