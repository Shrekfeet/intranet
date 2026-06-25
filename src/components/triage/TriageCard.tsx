import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TriageFlow } from "@/data/triage-flows";

interface Props {
  flow: TriageFlow;
}

export function TriageCard({ flow }: Props) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[flow.icon] ?? LucideIcons.Wrench;
  const stepCount = Object.values(flow.nodes).filter((n) => n.kind === "question").length;

  return (
    <Link to={`/operations/triage/${flow.id}`} className="group">
      <Card className="h-full p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50">
        <div className="flex items-start gap-4">
          <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {flow.category}
              </Badge>
              <span className="text-xs text-muted-foreground">{stepCount} steps</span>
            </div>
            <h3 className="text-lg leading-tight group-hover:text-primary transition-colors">
              {flow.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {flow.description}
            </p>
          </div>
          <ArrowRight className="shrink-0 h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </Card>
    </Link>
  );
}
