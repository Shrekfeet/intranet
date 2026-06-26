export type TreatmentType =
  | "mowing"
  | "fertiliser"
  | "weed-control"
  | "aeration"
  | "overseeding"
  | "scarification"
  | "moss"
  | "disease"
  | "drought"
  | "equipment";

export interface TreatmentTask {
  type: TreatmentType;
  label: string;
  note?: string;
}

export interface MonthData {
  month: string; // full name
  shortMonth: string;
  index: number; // 0-based
  headline: string;
  tasks: TreatmentTask[];
  priority: "low" | "medium" | "high";
}

export const treatmentMeta: Record<TreatmentType, { colour: string; bg: string; label: string }> = {
  mowing:       { colour: "text-emerald-700", bg: "bg-emerald-100",  label: "Mowing" },
  fertiliser:   { colour: "text-amber-700",   bg: "bg-amber-100",    label: "Fertiliser" },
  "weed-control": { colour: "text-red-700",   bg: "bg-red-100",      label: "Weed Control" },
  aeration:     { colour: "text-sky-700",     bg: "bg-sky-100",      label: "Aeration" },
  overseeding:  { colour: "text-lime-700",    bg: "bg-lime-100",     label: "Overseeding" },
  scarification:{ colour: "text-violet-700",  bg: "bg-violet-100",   label: "Scarification" },
  moss:         { colour: "text-teal-700",    bg: "bg-teal-100",     label: "Moss Treatment" },
  disease:      { colour: "text-pink-700",    bg: "bg-pink-100",     label: "Disease Watch" },
  drought:      { colour: "text-orange-700",  bg: "bg-orange-100",   label: "Drought Mgmt" },
  equipment:    { colour: "text-slate-700",   bg: "bg-slate-100",    label: "Equipment" },
};

export const seasonalCalendar: MonthData[] = [
  {
    month: "January", shortMonth: "Jan", index: 0, priority: "low",
    headline: "Winter rest — equipment servicing and planning.",
    tasks: [
      { type: "equipment", label: "Full machine service and blade sharpening" },
      { type: "equipment", label: "Equipment inventory and parts ordering" },
      { type: "equipment", label: "Review and update route plans for coming season" },
    ],
  },
  {
    month: "February", shortMonth: "Feb", index: 1, priority: "low",
    headline: "Season prep begins — first moss assessments when temps allow.",
    tasks: [
      { type: "moss", label: "Moss treatment if sustained soil temp >5°C", note: "Southern Hampshire can allow this by mid-Feb" },
      { type: "equipment", label: "Pre-season machinery checks and test runs" },
      { type: "equipment", label: "Order spring stock (fertilisers, seed, PPPs)" },
    ],
  },
  {
    month: "March", shortMonth: "Mar", index: 2, priority: "medium",
    headline: "First cuts and spring treatments — season opens.",
    tasks: [
      { type: "mowing", label: "First cuts from mid-March — set high (50–60mm)" },
      { type: "fertiliser", label: "Spring fertiliser from mid-March if soil temp >7°C", note: "Slow-release or spring NPK blend" },
      { type: "moss", label: "Main moss treatment window — conditions usually ideal" },
      { type: "overseeding", label: "Overseed bare patches once frost risk passes" },
      { type: "weed-control", label: "Weed assessment — early broad-leaved weeds emerging" },
    ],
  },
  {
    month: "April", shortMonth: "Apr", index: 3, priority: "high",
    headline: "Main spring treatment window — fertiliser, weed control, aeration.",
    tasks: [
      { type: "mowing", label: "Regular mowing establishing — weekly or fortnightly" },
      { type: "fertiliser", label: "Primary spring fertiliser application", note: "If not applied in March" },
      { type: "weed-control", label: "Selective herbicide applications — weeds in active growth" },
      { type: "aeration", label: "Solid-tine aeration before summer stress" },
      { type: "overseeding", label: "Overseeding still viable — good germination temps" },
    ],
  },
  {
    month: "May", shortMonth: "May", index: 4, priority: "high",
    headline: "Peak growth — mow frequently, active weed control.",
    tasks: [
      { type: "mowing", label: "Weekly mowing — peak growth rate" },
      { type: "weed-control", label: "Weed control — best results in warm active growth" },
      { type: "fertiliser", label: "Liquid iron for colour and moss suppression" },
      { type: "disease", label: "Monitor for red thread (warm, humid conditions)" },
      { type: "aeration", label: "Aeration still viable before ground dries" },
      { type: "drought", label: "Begin monitoring soil moisture — SE England dries fast" },
    ],
  },
  {
    month: "June", shortMonth: "Jun", index: 5, priority: "high",
    headline: "Growth continues — watch for drought onset and disease.",
    tasks: [
      { type: "mowing", label: "Raise cut height in dry spells — never below 40mm in drought" },
      { type: "disease", label: "Red thread and dollar spot risk — monitor and treat" },
      { type: "fertiliser", label: "Mid-season feed if growth strong and moisture available" },
      { type: "drought", label: "Raise cut height, reduce frequency if drought starts" },
    ],
  },
  {
    month: "July", shortMonth: "Jul", index: 6, priority: "medium",
    headline: "Drought peak — minimal treatment, protect the turf.",
    tasks: [
      { type: "drought", label: "Raise cut height to 60–70mm — never cut >⅓ of blade" },
      { type: "drought", label: "Reduce mowing frequency in stressed lawns" },
      { type: "equipment", label: "Assess renovation requirements — plan September programme" },
    ],
  },
  {
    month: "August", shortMonth: "Aug", index: 7, priority: "medium",
    headline: "Hottest month — prepare for the autumn renovation push.",
    tasks: [
      { type: "drought", label: "Continue drought management — raise height, reduce frequency" },
      { type: "equipment", label: "Order overseeding materials for September" },
      { type: "scarification", label: "Plan scarification programme — equipment checks" },
      { type: "equipment", label: "Late August: conditions may break — be ready to act fast" },
    ],
  },
  {
    month: "September", shortMonth: "Sep", index: 8, priority: "high",
    headline: "THE renovation month — aerate, scarify, overseed, feed.",
    tasks: [
      { type: "aeration", label: "Hollow-tine aeration — most important job of the season", note: "Ideal soil temps 10–18°C in Hampshire/Surrey" },
      { type: "overseeding", label: "Overseeding — best germination window of the year" },
      { type: "scarification", label: "Scarification — remove thatch and dead moss" },
      { type: "fertiliser", label: "Autumn fertiliser — high K, low N for root strength" },
      { type: "weed-control", label: "Weed control while soil temp still >10°C" },
      { type: "moss", label: "Moss treatment from mid-September" },
    ],
  },
  {
    month: "October", shortMonth: "Oct", index: 9, priority: "high",
    headline: "Finish renovation — last herbicide window, leaf clearance begins.",
    tasks: [
      { type: "aeration", label: "Continue aeration and overseeding where not complete" },
      { type: "fertiliser", label: "Autumn feed if not applied in September" },
      { type: "weed-control", label: "Last herbicide window — soil temps dropping below 10°C kills efficacy" },
      { type: "mowing", label: "Reduce mowing frequency — growth slowing" },
      { type: "moss", label: "Moss treatment — ideal cool damp conditions" },
    ],
  },
  {
    month: "November", shortMonth: "Nov", index: 10, priority: "medium",
    headline: "Final cuts, moss treatment, and equipment winterisation.",
    tasks: [
      { type: "mowing", label: "Final cuts — raise height to 60mm, stop when growth stops" },
      { type: "moss", label: "Moss treatment — prime conditions (cool, damp)" },
      { type: "aeration", label: "Aeration still possible if ground not waterlogged or frozen" },
      { type: "equipment", label: "Begin equipment winterisation" },
    ],
  },
  {
    month: "December", shortMonth: "Dec", index: 11, priority: "low",
    headline: "No treatments — full equipment service and next-year planning.",
    tasks: [
      { type: "equipment", label: "Full machine service and winter storage" },
      { type: "equipment", label: "Programme reviews and planning for next season" },
      { type: "equipment", label: "Order materials for spring in advance" },
    ],
  },
];
