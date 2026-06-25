import { motion } from "framer-motion";
import {
  BookOpen, Wrench, FileText, Calendar, Leaf, Sparkles, ArrowRight,
  HelpCircle, Tag, ClipboardList, Scale, GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { trainingModules } from "@/data/training-modules";
import { triageFlows } from "@/data/triage-flows";
import { lawnIdEntries } from "@/data/lawn-id";
import { policies } from "@/data/policies";
import { whatsNew, type WhatsNewKind } from "@/data/whats-new";
import { howToGuides } from "@/data/how-to-guides";
import { accountFlags } from "@/data/account-flags";
import { conditionCodes } from "@/data/condition-codes";
import { useTrainingProgress } from "@/hooks/use-training-progress";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import heroLawn from "@/assets/hero-lawn.jpg";

const kindLabel: Record<WhatsNewKind, string> = {
  module: "Training",
  triage: "Troubleshooting",
  "lawn-id": "Lawn ID",
  policy: "Policies",
  scheduling: "Scheduling",
};

const kindColour: Record<WhatsNewKind, string> = {
  module: "bg-teal-100 text-teal-700",
  triage: "bg-amber-100 text-amber-700",
  "lawn-id": "bg-sky-100 text-sky-700",
  policy: "bg-violet-100 text-violet-700",
  scheduling: "bg-orange-100 text-orange-700",
};

const hubs = [
  {
    to: "/modules",
    title: "Training Modules",
    description: "Role-based learning paths for lawn technicians and office staff.",
    icon: BookOpen,
    meta: `${trainingModules.length} modules`,
    iconBg: "bg-teal-500/15",
    iconText: "text-teal-700",
    hoverBorder: "hover:border-teal-400/40",
  },
  {
    to: "/operations",
    title: "Troubleshooting",
    description: "Troubleshooting flows and Smart Triage for daily issues.",
    icon: Wrench,
    meta: `${triageFlows.length} flows`,
    iconBg: "bg-amber-500/15",
    iconText: "text-amber-700",
    hoverBorder: "hover:border-amber-400/40",
  },
  {
    to: "/lawn-id",
    title: "Lawn ID",
    description: "Identify grasses, pests, diseases, weeds and treatments.",
    icon: Leaf,
    meta: `${lawnIdEntries.length} entries`,
    iconBg: "bg-sky-500/15",
    iconText: "text-sky-700",
    hoverBorder: "hover:border-sky-400/40",
  },
  {
    to: "/how-to",
    title: "How-To Guides",
    description: "Step-by-step playbooks for common tasks and situations.",
    icon: HelpCircle,
    meta: `${howToGuides.length} guides`,
    iconBg: "bg-primary/12",
    iconText: "text-primary",
    hoverBorder: "hover:border-primary/40",
  },
  {
    to: "/scheduling",
    title: "Scheduling",
    description: "Route planning, weather calls and key-account priority.",
    icon: Calendar,
    meta: "Lessons + tools",
    iconBg: "bg-orange-500/15",
    iconText: "text-orange-700",
    hoverBorder: "hover:border-orange-400/40",
  },
  {
    to: "/policies",
    title: "Policies & Docs",
    description: "Company policies, procedures and reference documents.",
    icon: FileText,
    meta: `${policies.length} documents`,
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-700",
    hoverBorder: "hover:border-violet-400/40",
  },
  {
    to: "/account-flags",
    title: "Account Flags",
    description: "Glossary of customer account flags and what each one means.",
    icon: Tag,
    meta: `${accountFlags.length} flags`,
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-700",
    hoverBorder: "hover:border-violet-400/40",
  },
  {
    to: "/condition-codes",
    title: "Condition Codes",
    description: "Visit codes technicians select and the customer emails they trigger.",
    icon: ClipboardList,
    meta: `${conditionCodes.length} codes`,
    iconBg: "bg-sky-500/15",
    iconText: "text-sky-700",
    hoverBorder: "hover:border-sky-400/40",
  },
  {
    to: "/terms",
    title: "Terms & Disputes",
    description: "Plain-English clause summary and dispute decision tree.",
    icon: Scale,
    meta: "Cancellations, charges, complaints",
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-700",
    hoverBorder: "hover:border-violet-400/40",
  },
  {
    to: "/operations/smart-triage",
    title: "Smart Triage",
    description: "Universal entry point that routes any issue to the right flow.",
    icon: Sparkles,
    meta: "Guided & filter modes",
    iconBg: "bg-amber-500/15",
    iconText: "text-amber-700",
    hoverBorder: "hover:border-amber-400/40",
  },
];

const Dashboard = () => {
  const { getModuleProgress } = useTrainingProgress();

  const totalLessons = trainingModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedCount = trainingModules.reduce((sum, m) => {
    const p = getModuleProgress(m.lessons.map((l) => l.id));
    return sum + p.done;
  }, 0);
  const overallPercent = totalLessons ? Math.round((completedCount / totalLessons) * 100) : 0;

  const sortedNews = [...whatsNew].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const stats = [
    { label: "Training Progress", value: `${overallPercent}%`, sub: `${completedCount}/${totalLessons} lessons` },
    { label: "Training Modules", value: String(trainingModules.length), sub: "role-based paths" },
    { label: "How-To Guides", value: String(howToGuides.length), sub: "step-by-step guides" },
    { label: "Triage Flows", value: String(triageFlows.length), sub: "troubleshooting flows" },
  ];

  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl overflow-hidden h-56 md:h-72"
      >
        <img src={heroLawn} alt="Professionally maintained lawn" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-primary/10" />
        <div className="relative z-10 h-full flex flex-col justify-center px-8 max-w-2xl">
          <span className="text-primary-foreground/70 font-body uppercase tracking-widest text-xs mb-2">
            Shrekfeet Intranet
          </span>
          <h1 className="text-3xl md:text-4xl text-primary-foreground mb-2">
            Train, troubleshoot and run the day — in one place.
          </h1>
          <p className="text-primary-foreground/80 font-body text-base">
            Onboarding, operations, lawn knowledge, scheduling and policies — everything the team needs.
          </p>
        </div>
      </motion.div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.3 }}
            className="rounded-xl border bg-card p-4 text-center"
          >
            <p className="font-heading font-extrabold text-2xl text-primary leading-tight">{s.value}</p>
            <p className="font-body text-xs font-semibold text-foreground/70 mt-0.5">{s.label}</p>
            <p className="font-body text-xs text-muted-foreground mt-0.5">{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Hubs */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="h-4 w-4 text-primary" />
          <h2 className="text-xl">Jump in</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hubs.map((h, i) => (
            <motion.div
              key={h.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                to={h.to}
                className={`group block bg-card border rounded-xl p-5 hover:shadow-md transition-all h-full ${h.hoverBorder}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${h.iconBg}`}>
                    <h.icon className={`h-5 w-5 ${h.iconText}`} />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-lg group-hover:text-primary transition-colors">{h.title}</h3>
                <p className="text-sm text-muted-foreground font-body mt-1">{h.description}</p>
                <p className="text-xs text-muted-foreground font-body mt-3 uppercase tracking-wider">{h.meta}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Training progress + What's new */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training progress */}
        <div className="lg:col-span-2 bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl">Your Training Progress</h2>
              <p className="text-sm text-muted-foreground font-body mt-0.5">
                {completedCount}/{totalLessons} lessons complete
              </p>
            </div>
            <span className="text-3xl font-heading font-extrabold text-primary">{overallPercent}%</span>
          </div>
          <Progress value={overallPercent} className="h-2.5 mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {trainingModules.slice(0, 4).map((mod) => {
              const progress = getModuleProgress(mod.lessons.map((l) => l.id));
              return (
                <Link
                  key={mod.id}
                  to={`/modules/${mod.id}`}
                  className="group flex items-center gap-3 p-3 bg-background border rounded-lg hover:border-primary/30 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-sm group-hover:text-primary transition-colors truncate">
                      {mod.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Progress value={progress.percent} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground font-body flex-shrink-0">
                        {progress.done}/{progress.total}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-4">
            <Link to="/modules" className="text-sm font-body text-primary hover:underline inline-flex items-center gap-1">
              View all modules <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* What's New — timeline */}
        <div className="bg-card border rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl">What's New</h2>
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div className="space-y-0">
            {sortedNews.map((n, i) => (
              <div key={n.id} className="flex gap-3">
                <div className="flex flex-col items-center pt-1.5">
                  <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  {i < sortedNews.length - 1 && <div className="w-px flex-1 bg-border mt-1.5" />}
                </div>
                <Link
                  to={n.href}
                  className="group pb-4 min-w-0 flex-1"
                >
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-body font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${kindColour[n.kind]}`}>
                      {kindLabel[n.kind]}
                    </span>
                    <span className="text-xs text-muted-foreground font-body">{n.date}</span>
                  </div>
                  <p className="font-body font-semibold text-sm group-hover:text-primary transition-colors leading-snug">
                    {n.title}
                  </p>
                  <p className="text-xs text-muted-foreground font-body mt-0.5 line-clamp-2">{n.description}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
