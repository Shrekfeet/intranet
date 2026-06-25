export interface SchedulingLesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export const schedulingLessons: SchedulingLesson[] = [
  {
    id: "principles",
    title: "Scheduling Principles",
    duration: "10 min",
    content: `Good scheduling balances **customer expectations**, **agronomic windows**, **route efficiency** and **crew workload**.

## The four levers
1. **Frequency** — how often a customer needs visiting (weekly, fortnightly, seasonal).
2. **Window** — agronomic time of year (e.g. spring feed, autumn renovation).
3. **Sequence** — the order of jobs in a day, optimised for travel and equipment.
4. **Buffer** — slack in the day to absorb overruns, weather and emergencies.

## Priority order when the day goes wrong
1. Key accounts and contractual visits.
2. Time-critical agronomic work (e.g. pre-em weed control).
3. Customer-requested visits with a fixed date.
4. Discretionary / catch-up work.`,
  },
  {
    id: "route-planning",
    title: "Route Planning",
    duration: "12 min",
    content: `Route planning saves fuel, time and customer goodwill.

## Rules of thumb
- **Cluster by postcode** — group jobs in the same area on the same day.
- **Start far, work back** — heaviest van early, finish closest to base.
- **One-way loops** beat back-and-forth.
- **Avoid school-run roads** at 8:30 and 15:00 where possible.
- **Park once, walk multiple** when several jobs are on the same street.

## Equipment sequencing
Plan the day so jobs needing the same kit are consecutive — don't unload a scarifier just to reload it two stops later.`,
  },
  {
    id: "weather-decisions",
    title: "Weather Decisions",
    duration: "8 min",
    content: `Weather is the biggest disrupter to a schedule. The goal is consistent, defensible decisions — not perfect ones.

## Decision rules
- **Mowing in light rain:** OK on dry-base lawns; skip on saturated turf.
- **Spraying:** Cancel if wind >10 mph or rain forecast within 2 hours.
- **Scarification / aeration:** Soil should be moist, not saturated.
- **Pesticide / fertiliser application:** Follow the label — most need 2 hours dry after application.

## Communicating changes
- Customers told same-day if a visit is moved.
- Always offer the next available date in the same message.
- Log every weather-driven change so we can audit the season.`,
  },
  {
    id: "key-accounts",
    title: "Key Accounts First",
    duration: "6 min",
    content: `Key accounts are customers whose loss would materially affect the business — typically high-value contracts, multi-site clients, or strategically important referrers.

## How key accounts change scheduling
- They get **first pick** of the diary at the start of the season.
- They get **named lead crew member** for continuity.
- Their work is **scheduled before** discretionary jobs when conflicts arise.
- Any change to their visit needs **office sign-off**.

If you are unsure whether a customer is a key account, ask the office before re-scheduling.`,
  },
];

// ----- Interactive: route order checklist -----
export interface RouteChecklistItem {
  id: string;
  label: string;
  detail: string;
}

export const routeChecklist: RouteChecklistItem[] = [
  { id: "r1", label: "Postcodes clustered for the day", detail: "All jobs share the first 2–3 chars of postcode where possible." },
  { id: "r2", label: "Heaviest / farthest job first", detail: "Reduces fuel cost and avoids running out of van capacity later." },
  { id: "r3", label: "Equipment grouped by job type", detail: "Don't unload then reload the same machine." },
  { id: "r4", label: "Key accounts in the AM slot", detail: "Protects them against day-end overruns." },
  { id: "r5", label: "School-run roads avoided 8:15–9:00 & 14:45–15:30", detail: "Saves 10–20 min per school zone." },
  { id: "r6", label: "Weather check completed", detail: "Confirm no spray/scarify jobs are scheduled into wind or rain." },
  { id: "r7", label: "Customer contact details to hand", detail: "Phone numbers loaded in case of access issues." },
  { id: "r8", label: "End-of-day buffer of 30 min", detail: "Absorbs traffic, customer chat and equipment cleaning." },
];

// ----- Interactive: weather decision triager -----
export type WeatherJobType = "mowing" | "spraying" | "scarification" | "fertiliser";

export interface WeatherInput {
  jobType: WeatherJobType;
  rainNow: boolean;
  rainNext2h: boolean;
  windMph: number;
  soilSaturated: boolean;
}

export type WeatherVerdict = "go" | "caution" | "stop";

export function evaluateWeather(input: WeatherInput): { verdict: WeatherVerdict; reasons: string[] } {
  const reasons: string[] = [];
  let verdict: WeatherVerdict = "go";

  const escalate = (v: WeatherVerdict) => {
    const order: Record<WeatherVerdict, number> = { go: 0, caution: 1, stop: 2 };
    if (order[v] > order[verdict]) verdict = v;
  };

  if (input.jobType === "spraying") {
    if (input.windMph > 10) {
      escalate("stop");
      reasons.push(`Wind ${input.windMph} mph exceeds 10 mph spray limit.`);
    } else if (input.windMph > 7) {
      escalate("caution");
      reasons.push(`Wind ${input.windMph} mph is borderline — use coarse droplet & shielded nozzles.`);
    }
    if (input.rainNext2h || input.rainNow) {
      escalate("stop");
      reasons.push("Rain forecast within 2 hours — product won't bind.");
    }
  }

  if (input.jobType === "mowing") {
    if (input.soilSaturated) {
      escalate("stop");
      reasons.push("Soil saturated — wheels will rut the lawn.");
    } else if (input.rainNow) {
      escalate("caution");
      reasons.push("Light rain on dry-base turf is OK; collect clippings.");
    }
  }

  if (input.jobType === "scarification") {
    if (input.soilSaturated) {
      escalate("stop");
      reasons.push("Saturated soil — blades will tear, not cut.");
    }
  }

  if (input.jobType === "fertiliser") {
    if (input.windMph > 15) {
      escalate("caution");
      reasons.push(`Wind ${input.windMph} mph — granular spread accuracy reduced.`);
    }
    if (!input.rainNext2h && !input.rainNow) {
      reasons.push("Reminder: most granular feeds need water-in within 24 hours.");
    }
  }

  if (reasons.length === 0) reasons.push("Conditions look good — proceed as planned.");
  return { verdict, reasons };
}
