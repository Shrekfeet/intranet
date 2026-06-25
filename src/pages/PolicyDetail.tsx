import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPolicy } from "@/data/policies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/**
 * Tiny markdown-ish renderer: handles ## headings, bullet lists, paragraphs,
 * and **bold**. Sufficient for the seeded policy content without a dependency.
 */
function renderBody(body: string) {
  const lines = body.split(/\n/);
  const out: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length === 0) return;
    out.push(
      <ul key={`ul-${out.length}`} className="space-y-2 font-body text-foreground/90 mb-4">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: inline(item) }} />
          </li>
        ))}
      </ul>,
    );
    listBuffer = [];
  };

  const inline = (s: string) =>
    s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flushList();
      out.push(<h2 key={`h-${out.length}`} className="text-xl mt-6 mb-2">{line.slice(3)}</h2>);
    } else if (line.startsWith("- ")) {
      listBuffer.push(line.slice(2));
    } else if (line.match(/^\d+\.\s/)) {
      listBuffer.push(line.replace(/^\d+\.\s/, ""));
    } else if (line.trim() === "") {
      flushList();
    } else if (line.startsWith("|")) {
      // crude table passthrough
      flushList();
      out.push(
        <pre key={`tbl-${out.length}`} className="font-body text-sm bg-muted/50 p-3 rounded-md overflow-x-auto mb-4">{line}</pre>,
      );
    } else {
      flushList();
      out.push(
        <p key={`p-${out.length}`} className="font-body text-foreground/90 leading-relaxed mb-4"
           dangerouslySetInnerHTML={{ __html: inline(line) }} />,
      );
    }
  }
  flushList();
  return out;
}

const PolicyDetail = () => {
  const { policyId } = useParams<{ policyId: string }>();
  const policy = policyId ? getPolicy(policyId) : undefined;

  if (!policy) {
    return (
      <div className="space-y-4">
        <p className="font-body text-muted-foreground">Policy not found.</p>
        <Button asChild variant="outline">
          <Link to="/policies"><ArrowLeft className="h-4 w-4 mr-2" />Back to Policies</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <Link to="/policies" className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Policies
        </Link>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="font-body font-medium">{policy.category}</Badge>
          <span className="text-xs text-muted-foreground font-body">Updated {policy.updated}</span>
        </div>
        <h1 className="text-3xl md:text-4xl mt-2">{policy.title}</h1>
        <p className="text-lg text-muted-foreground font-body mt-2">{policy.summary}</p>
      </div>

      <article className="bg-card border rounded-xl p-6">
        {renderBody(policy.body)}
      </article>
    </div>
  );
};

export default PolicyDetail;
