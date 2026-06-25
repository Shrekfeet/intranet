import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TriageRunner } from "@/components/triage/TriageRunner";
import { getFlow } from "@/data/triage-flows";

const TriageFlowPage = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const flow = flowId ? getFlow(flowId) : undefined;

  if (!flow) {
    return (
      <div className="space-y-4 max-w-3xl">
        <h1 className="text-3xl">Flow not found</h1>
        <p className="text-muted-foreground">
          We couldn't find a triage flow with that id.
        </p>
        <Button asChild>
          <Link to="/operations">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Operations
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link to="/operations">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Troubleshooting Hub
        </Link>
      </Button>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            {flow.category}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl">{flow.title}</h1>
        <p className="text-muted-foreground">{flow.description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {flow.tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              #{t}
            </Badge>
          ))}
        </div>
      </div>

      <TriageRunner key={flow.id} flow={flow} />
    </div>
  );
};

export default TriageFlowPage;
