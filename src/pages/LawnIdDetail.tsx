import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { getLawnIdEntry, lawnIdEntries } from "@/data/lawn-id";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const LawnIdDetail = () => {
  const { entryId } = useParams<{ entryId: string }>();
  const entry = entryId ? getLawnIdEntry(entryId) : undefined;

  if (!entry) {
    return (
      <div className="space-y-4">
        <p className="font-body text-muted-foreground">Entry not found.</p>
        <Button asChild variant="outline">
          <Link to="/lawn-id"><ArrowLeft className="h-4 w-4 mr-2" />Back to Lawn ID</Link>
        </Button>
      </div>
    );
  }

  const related = entry.related
    .map((id) => lawnIdEntries.find((e) => e.id === id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Link to="/lawn-id" className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Lawn ID
        </Link>
        <Badge variant="secondary" className="font-body font-medium">{entry.category}</Badge>
        <h1 className="text-3xl md:text-4xl mt-2">{entry.name}</h1>
        <p className="text-lg text-muted-foreground font-body mt-2">{entry.shortDescription}</p>
      </div>

      <div className="aspect-[21/9] rounded-xl overflow-hidden bg-muted">
        <img src={entry.image ?? "/placeholder.svg"} alt={entry.name} className="w-full h-full object-cover" />
      </div>

      {entry.gallery && entry.gallery.length > 0 && (
        <Section title="Gallery">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {entry.gallery.map((g, i) => (
              <figure key={i} className="space-y-2">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                  <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <figcaption className="text-sm font-body text-muted-foreground">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section title="Description">
        <p className="font-body text-foreground/90 leading-relaxed">{entry.description}</p>
      </Section>

      {entry.symptoms.length > 0 && (
        <Section title="Symptoms">
          <BulletList items={entry.symptoms} />
        </Section>
      )}

      {entry.diagnosis.length > 0 && (
        <Section title="Diagnosis">
          <BulletList items={entry.diagnosis} />
        </Section>
      )}

      {entry.treatment.length > 0 && (
        <Section title="Treatment">
          <BulletList items={entry.treatment} />
        </Section>
      )}

      {entry.knockOnEffects.length > 0 && (
        <Section title="Knock-on effects">
          <BulletList items={entry.knockOnEffects} />
        </Section>
      )}

      {related.length > 0 && (
        <Section title="Related entries">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/lawn-id/${r.id}`}
                className="group flex items-center justify-between bg-card border rounded-xl p-4 hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div>
                  <Badge variant="secondary" className="font-body text-xs mb-1">{r.category}</Badge>
                  <p className="font-body font-medium group-hover:text-primary transition-colors">{r.name}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 font-body text-foreground/90">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default LawnIdDetail;
