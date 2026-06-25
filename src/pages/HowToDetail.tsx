import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Info,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  PackageSearch,
  Wallet,
  Phone,
  Sprout,
  FileSignature,
  HelpCircle,
  Users,
  MessageCircle,
} from "lucide-react";
import {
  getHowToGuide,
  type HowToBlock,
  type HowToGuide,
  type HowToSection,
  type HowToStep,
} from "@/data/how-to-guides";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const iconMap: Record<NonNullable<HowToGuide["icon"]>, React.ComponentType<{ className?: string }>> = {
  PackageSearch,
  Wallet,
  ShieldAlert,
  Phone,
  Sprout,
  FileSignature,
};

function Block({ block }: { block: HowToBlock }) {
  switch (block.kind) {
    case "paragraph":
      return (
        <p className="font-body text-foreground/90 leading-relaxed">{block.text}</p>
      );

    case "bullets":
      return (
        <ul className="space-y-2 font-body text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const tones = {
        info: {
          wrap: "bg-primary/5 border-primary/30 text-foreground",
          icon: <Info className="h-4 w-4 text-primary" />,
        },
        warning: {
          wrap: "bg-warning/10 border-warning/40 text-foreground",
          icon: <AlertTriangle className="h-4 w-4 text-warning-foreground" />,
        },
        success: {
          wrap: "bg-success/10 border-success/40 text-foreground",
          icon: <CheckCircle2 className="h-4 w-4 text-success" />,
        },
        rule: {
          wrap: "bg-destructive/5 border-destructive/30 text-foreground",
          icon: <ShieldAlert className="h-4 w-4 text-destructive" />,
        },
      } as const;
      const tone = tones[block.tone];
      return (
        <div className={`flex gap-3 rounded-lg border p-4 ${tone.wrap}`}>
          <div className="mt-0.5">{tone.icon}</div>
          <div className="flex-1 space-y-1">
            {block.title && (
              <p className="font-body font-bold text-sm">{block.title}</p>
            )}
            <p className="font-body text-sm leading-relaxed">{block.text}</p>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-muted/60">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left font-bold px-4 py-2.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-2.5 text-foreground/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "keyvalue":
      return (
        <dl className="space-y-3">
          {block.items.map((kv, i) => (
            <div key={i} className="rounded-xl border bg-muted/20 overflow-hidden">
              <dt className="font-body font-bold text-sm text-primary bg-primary/8 border-b px-4 py-2.5">
                {kv.label}
              </dt>
              <dd className="font-body text-sm text-foreground/90 px-4 py-3 leading-relaxed">
                {kv.value}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "numbered":
      return (
        <ol className="space-y-2 font-body text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );

    case "stat":
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {block.items.map((s, i) => (
            <div key={i} className="rounded-xl border bg-primary/5 p-4 text-center">
              <p className="font-heading font-extrabold text-2xl text-primary leading-tight">
                {s.value}
              </p>
              <p className="font-body text-xs font-semibold text-foreground/70 mt-1">
                {s.label}
              </p>
              {s.sub && (
                <p className="font-body text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              )}
            </div>
          ))}
        </div>
      );

    case "audience": {
      const isTech = block.label === "Technicians & Office";
      return (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-body font-semibold border ${
            isTech
              ? "bg-blue-50 border-blue-200 text-blue-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}
        >
          {isTech ? (
            <Users className="h-3.5 w-3.5" />
          ) : (
            <MessageCircle className="h-3.5 w-3.5" />
          )}
          {block.label}
        </div>
      );
    }
  }
}

function Step({ step, index }: { step: HowToStep; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3 }}
      className="relative pl-12 sm:pl-16"
    >
      {/* Number badge */}
      <div className="absolute left-0 top-0 flex flex-col items-center">
        <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-extrabold text-base sm:text-lg shadow-sm">
          {step.number ?? index + 1}
        </div>
        <div className="flex-1 w-px bg-border mt-2" aria-hidden />
      </div>

      <div className="pb-10">
        <h3 className="text-lg sm:text-xl mb-3">{step.title}</h3>
        <div className="space-y-4">
          {step.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
        {step.output && (
          <div className="mt-4 inline-flex items-start gap-2 rounded-lg bg-success/10 border border-success/30 px-3 py-2">
            <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
            <p className="font-body text-sm">
              <span className="font-bold">Output:</span> {step.output}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function Section({ section }: { section: HowToSection }) {
  if (section.kind === "steps") {
    return (
      <section id={section.id} className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl">{section.title}</h2>
        </div>
        {section.intro && (
          <p className="font-body text-muted-foreground">{section.intro}</p>
        )}
        <div className="mt-6">
          {section.steps.map((s, i) => (
            <Step key={i} step={s} index={i} />
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "notes") {
    return (
      <section id={section.id} className="space-y-4">
        <div className="rounded-xl border-l-4 border-primary/40 bg-muted/20 pl-4 pr-4 py-3">
          <h2 className="text-xl text-foreground/80">{section.title}</h2>
        </div>
        <div className="space-y-4">
          {section.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id={section.id} className="space-y-4">
      <h2 className="text-2xl">{section.title}</h2>
      <div className="space-y-4">
        {section.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </section>
  );
}

const HowToDetail = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const guide = guideId ? getHowToGuide(guideId) : undefined;

  if (!guide) {
    return (
      <div className="space-y-4">
        <p className="font-body text-muted-foreground">Guide not found.</p>
        <Button asChild variant="outline">
          <Link to="/how-to">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to How-To Guides
          </Link>
        </Button>
      </div>
    );
  }

  const Icon = guide.icon ? iconMap[guide.icon] : HelpCircle;

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <Link
          to="/how-to"
          className="inline-flex items-center text-sm font-body text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to How-To Guides
        </Link>

        <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-accent/10 to-background border p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon className="h-7 w-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant="secondary" className="font-body font-medium">
                  {guide.category}
                </Badge>
                <span className="text-xs text-muted-foreground font-body">
                  Updated {guide.updated}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl">{guide.title}</h1>
              <p className="text-base sm:text-lg text-muted-foreground font-body mt-2">
                {guide.summary}
              </p>

              {(guide.owner || guide.approver) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {guide.owner && (
                    <div className="rounded-lg bg-card/80 border px-3 py-2">
                      <p className="text-[11px] font-body uppercase tracking-wider text-muted-foreground">
                        Owner
                      </p>
                      <p className="font-body font-medium text-sm">{guide.owner}</p>
                    </div>
                  )}
                  {guide.approver && (
                    <div className="rounded-lg bg-card/80 border px-3 py-2">
                      <p className="text-[11px] font-body uppercase tracking-wider text-muted-foreground">
                        Approval
                      </p>
                      <p className="font-body font-medium text-sm">{guide.approver}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* On-this-page nav */}
      {guide.sections.length > 2 && (
        <nav className="rounded-xl border bg-card p-4">
          <p className="text-xs font-body uppercase tracking-wider text-muted-foreground mb-2 inline-flex items-center gap-1.5">
            <Sparkles className="h-3 w-3" /> On this page
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm font-body text-foreground/80 hover:text-primary transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <article className="space-y-12">
        {guide.sections.map((s) => (
          <Section key={s.id} section={s} />
        ))}
      </article>
    </div>
  );
};

export default HowToDetail;
