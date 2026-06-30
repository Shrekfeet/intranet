import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf, Sprout, ShieldCheck, Calendar, ClipboardList, Users,
  GraduationCap, Truck, Wallet, Award, BookOpen, Compass,
  PartyPopper, ArrowRight, Phone,
} from "lucide-react";
import { experienceTracks, welcomeSections, type ExperienceLevel } from "@/data/welcome-pack";
import { Badge } from "@/components/ui/badge";
import { InDevBanner } from "@/components/InDevBanner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf, Sprout, ShieldCheck, Calendar, ClipboardList, Users,
  GraduationCap, Truck, Wallet, Award, BookOpen, Compass, Phone,
};

const techQuickLinks = [
  { title: "Technician Training", desc: "Start at Company Basics and work through each stage.", to: "/modules?role=technician" },
  { title: "How-To Guides", desc: "Day-to-day reference for processes and systems.", to: "/how-to" },
  { title: "Policies & Docs", desc: "Handbook, COSHH, bonus scheme and more.", to: "/policies" },
  { title: "Troubleshooting Hub", desc: "Triage flows for when things don't go to plan.", to: "/operations" },
];

const officeQuickLinks = [
  { title: "Office Training", desc: "Work through the office onboarding modules.", to: "/modules?role=office" },
  { title: "How-To Guides", desc: "Guides for call handling, complaints, rescheduling and more.", to: "/how-to" },
  { title: "Seasonal Calendar", desc: "Understand our treatment programme — essential for calls.", to: "/seasonal-calendar" },
  { title: "Policies & Docs", desc: "Staff handbook, data handling guidelines and more.", to: "/policies" },
];

const WelcomePack = () => {
  const [track, setTrack] = useState<ExperienceLevel>("trainee");
  const activeTrack = experienceTracks.find((t) => t.id === track)!;
  const isOffice = track === "office";

  const filteredSections = useMemo(() => {
    return welcomeSections.filter((s) => {
      if (!s.audience || s.audience === "all") return true;
      if (isOffice) return s.audience === "office";
      return s.audience === "technician";
    });
  }, [isOffice]);

  const quickLinks = isOffice ? officeQuickLinks : techQuickLinks;

  return (
    <div className="space-y-10">
      <InDevBanner reason="The Welcome Pack is being personalised to Shrekfeet's onboarding process. Some sections may be incomplete or still being reviewed." />

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-card to-card p-8 md:p-12">
        <div className="flex items-start gap-4 max-w-3xl">
          <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center text-primary flex-shrink-0">
            <PartyPopper className="h-6 w-6" />
          </div>
          <div className="space-y-3">
            <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">
              New starter
            </span>
            <h1 className="text-3xl md:text-4xl">Welcome to Shrekfeet</h1>
            <p className="text-muted-foreground font-body text-base md:text-lg">
              Everything you need to get started — the role, what's expected, your first six months, payroll and
              where to go next. Pick your track below, then work through the sections at your own pace.
            </p>
          </div>
        </div>
      </div>

      {/* Experience track selector */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl">Pick your starting point</h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Your induction is tailored to your background. Choose the option that fits you best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {experienceTracks.map((t) => {
            const active = t.id === track;
            return (
              <button
                key={t.id}
                onClick={() => setTrack(t.id)}
                className={cn(
                  "text-left rounded-xl border p-5 transition-all hover:border-primary/40 hover:shadow-sm",
                  active && "border-primary bg-primary/5 shadow-sm",
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg">{t.title}</h3>
                  {active && <Badge className="font-body text-[10px]">Selected</Badge>}
                </div>
                <p className="text-sm text-muted-foreground font-body">{t.blurb}</p>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTrack.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border bg-card p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="font-body">Your focus areas</Badge>
            <span className="text-sm font-body text-muted-foreground">{activeTrack.title}</span>
          </div>
          <ul className="space-y-2">
            {activeTrack.focus.map((f, i) => (
              <li key={i} className="flex gap-3 text-sm font-body">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* Welcome sections */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl">The essentials</h2>
          <p className="text-muted-foreground font-body text-sm mt-1">
            Work through each section. Click to expand.
          </p>
        </div>

        <Accordion type="multiple" defaultValue={["who-we-are"]} className="space-y-2">
          {filteredSections.map((s) => {
            const Icon = iconMap[s.icon] ?? Leaf;
            return (
              <AccordionItem
                key={s.id}
                value={s.id}
                className="border rounded-xl bg-card px-4"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-base md:text-lg">{s.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 pl-12 pr-2 space-y-3">
                  <p className="text-sm md:text-[15px] font-body text-muted-foreground">{s.body}</p>
                  {s.bullets && (
                    <ul className="space-y-1.5">
                      {s.bullets.map((b, i) => (
                        <li key={i} className="flex gap-3 text-sm font-body">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/70 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      {/* Quick links */}
      <section className="space-y-4">
        <h2 className="text-2xl">Jump straight in</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group flex items-center justify-between gap-4 rounded-xl border bg-card p-5 hover:border-primary/40 hover:shadow-sm transition-all"
            >
              <div>
                <h3 className="text-base group-hover:text-primary transition-colors">{l.title}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{l.desc}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WelcomePack;
