import { useState } from "react";
import { InDevBanner } from "@/components/InDevBanner";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, MapPin, Cloud } from "lucide-react";
import { schedulingLessons, routeChecklist, evaluateWeather, type WeatherJobType } from "@/data/scheduling";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Scheduling = () => {
  return (
    <div className="space-y-10">
      <InDevBanner reason="Scheduling tools and lessons are being refined to match Shrekfeet's live routing and job management setup." />
      <div>
        <span className="text-xs font-body font-medium text-muted-foreground uppercase tracking-wider">Operations Skill</span>
        <h1 className="text-3xl md:text-4xl mt-1">Scheduling Hub</h1>
        <p className="text-muted-foreground font-body mt-2 max-w-2xl">
          Learn how we schedule work — and use the interactive tools to plan smarter days and make confident weather calls.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl">Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schedulingLessons.map((l, i) => (
            <motion.details
              key={l.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="group bg-card border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <div>
                  <h3 className="text-lg group-hover:text-primary transition-colors">{l.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-body mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    {l.duration}
                  </div>
                </div>
                <Badge variant="secondary" className="font-body">Read</Badge>
              </summary>
              <div className="mt-4 font-body text-foreground/90 whitespace-pre-line leading-relaxed">
                {l.content}
              </div>
            </motion.details>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RouteChecklist />
        <WeatherTriager />
      </section>
    </div>
  );
};

function RouteChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-xl">Route Order Checklist</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body mb-4">
        Tick these off before you leave the yard. {done}/{routeChecklist.length} complete.
      </p>
      <ul className="space-y-2">
        {routeChecklist.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => toggle(item.id)}
              className={`w-full text-left flex gap-3 p-3 rounded-lg border transition-colors ${
                checked[item.id] ? "bg-primary/5 border-primary/30" : "bg-background border-border hover:bg-muted/50"
              }`}
            >
              <CheckCircle2
                className={`h-5 w-5 flex-shrink-0 mt-0.5 ${checked[item.id] ? "text-primary" : "text-muted-foreground/40"}`}
              />
              <div>
                <p className={`font-body font-medium ${checked[item.id] ? "line-through text-muted-foreground" : ""}`}>
                  {item.label}
                </p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{item.detail}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeatherTriager() {
  const [jobType, setJobType] = useState<WeatherJobType>("spraying");
  const [windMph, setWindMph] = useState(6);
  const [rainNow, setRainNow] = useState(false);
  const [rainNext2h, setRainNext2h] = useState(false);
  const [soilSaturated, setSoilSaturated] = useState(false);

  const result = evaluateWeather({ jobType, windMph, rainNow, rainNext2h, soilSaturated });

  const verdictStyles = {
    go: "bg-primary/10 text-primary border-primary/30",
    caution: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    stop: "bg-destructive/10 text-destructive border-destructive/30",
  } as const;

  const jobs: { value: WeatherJobType; label: string }[] = [
    { value: "spraying", label: "Spraying" },
    { value: "scarification", label: "Scarification" },
    { value: "fertiliser", label: "Fertiliser" },
  ];

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-1">
        <Cloud className="h-5 w-5 text-primary" />
        <h2 className="text-xl">Weather Decision Triager</h2>
      </div>
      <p className="text-sm text-muted-foreground font-body mb-4">
        Get a quick go / caution / stop call before you set off.
      </p>

      <div className="space-y-4">
        <div>
          <Label className="font-body">Job type</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {jobs.map((j) => (
              <Button
                key={j.value}
                size="sm"
                variant={jobType === j.value ? "default" : "outline"}
                onClick={() => setJobType(j.value)}
                className="font-body"
              >
                {j.label}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="wind" className="font-body">Wind speed (mph)</Label>
          <Input
            id="wind"
            type="number"
            min={0}
            max={50}
            value={windMph}
            onChange={(e) => setWindMph(Number(e.target.value))}
            className="mt-2 max-w-[140px]"
          />
        </div>

        <div className="space-y-3">
          <ToggleRow label="Raining now" value={rainNow} onChange={setRainNow} />
          <ToggleRow label="Rain forecast within 2 hours" value={rainNext2h} onChange={setRainNext2h} />
          <ToggleRow label="Soil saturated underfoot" value={soilSaturated} onChange={setSoilSaturated} />
        </div>

        <div className={`mt-4 rounded-lg border p-4 ${verdictStyles[result.verdict]}`}>
          <p className="font-heading text-lg uppercase tracking-wide">{result.verdict}</p>
          <ul className="mt-2 space-y-1 font-body text-sm">
            {result.reasons.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-3 bg-background border rounded-lg">
      <span className="font-body text-sm">{label}</span>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

export default Scheduling;
