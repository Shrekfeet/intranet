export type TreatmentType =
  | "winter-treatment"
  | "early-spring"
  | "late-spring"
  | "summer"
  | "autumn"
  | "renovation"
  | "grub-x"
  | "wetting-agent"
  | "fungicide"
  | "equipment";

export interface TreatmentTask {
  type: TreatmentType;
  label: string;
  note?: string;
}

export interface MonthData {
  month: string;
  shortMonth: string;
  index: number; // 0-based
  headline: string;
  tasks: TreatmentTask[];
  alerts: string[]; // Things to watch out for
  priority: "low" | "medium" | "high";
}

export const treatmentMeta: Record<TreatmentType, { colour: string; bg: string; label: string }> = {
  "winter-treatment": { colour: "text-sky-700",     bg: "bg-sky-100",     label: "Winter Treatment" },
  "early-spring":     { colour: "text-lime-700",    bg: "bg-lime-100",    label: "Early Spring" },
  "late-spring":      { colour: "text-emerald-700", bg: "bg-emerald-100", label: "Late Spring" },
  "summer":           { colour: "text-amber-700",   bg: "bg-amber-100",   label: "Summer" },
  "autumn":           { colour: "text-orange-700",  bg: "bg-orange-100",  label: "Autumn" },
  "renovation":       { colour: "text-violet-700",  bg: "bg-violet-100",  label: "Renovation" },
  "grub-x":           { colour: "text-red-700",     bg: "bg-red-100",     label: "Grub X (Acelepryn)" },
  "wetting-agent":    { colour: "text-cyan-700",    bg: "bg-cyan-100",    label: "Wetting Agent" },
  "fungicide":        { colour: "text-pink-700",    bg: "bg-pink-100",    label: "Prev. Fungicide" },
  "equipment":        { colour: "text-slate-700",   bg: "bg-slate-100",   label: "Equipment" },
};

export const seasonalCalendar: MonthData[] = [
  {
    month: "January", shortMonth: "Jan", index: 0, priority: "medium",
    headline: "Winter treatment cycle — Lawn Tonic & Moss Control.",
    tasks: [
      { type: "winter-treatment", label: "Lawn Tonic application" },
      { type: "winter-treatment", label: "Moss Control application" },
    ],
    alerts: [
      "Fusarium patch active in mild, wet spells — inspect after rain",
      "Waterlogging risk — flag severely compacted lawns for spring renovation",
      "Frost damage — document affected areas for overseeding later",
      "Winter moss establishment — check density to inform spring scarification depth",
    ],
  },
  {
    month: "February", shortMonth: "Feb", index: 1, priority: "high",
    headline: "Winter treatment continues early Feb; Early Spring + Renovations open mid-Feb.",
    tasks: [
      { type: "winter-treatment", label: "Continue Lawn Tonic & Moss Control (early Feb)" },
      { type: "early-spring", label: "Early Spring Nutrition (from mid-Feb)", note: "When soil temp sustained >5°C" },
      { type: "renovation", label: "Renovations open mid-Feb: aeration, scarification, overseeding, top-dressing" },
      { type: "wetting-agent", label: "Wetting agent applications begin mid-Feb" },
      { type: "fungicide", label: "Preventative fungicide programme begins mid-Feb" },
    ],
    alerts: [
      "Monitor soil temperature — wait for sustained >5°C before switching to Early Spring",
      "Crane fly (daddy long legs) larvae — leatherjackets active, look for bird pecking and yellow patches",
      "Red Thread risk rises as temperatures increase — inspect closely",
      "Assess winter moss damage to plan scarification depth",
    ],
  },
  {
    month: "March", shortMonth: "Mar", index: 2, priority: "high",
    headline: "Early Spring treatment cycle in full swing — renovations continue.",
    tasks: [
      { type: "early-spring", label: "Early Spring Nutrition" },
      { type: "renovation", label: "Aeration, scarification, overseeding, top-dressing" },
      { type: "wetting-agent", label: "Wetting agent applications" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Red Thread — warm days with cool damp nights create ideal conditions",
      "Leatherjacket larvae still active — inspect yellowing patches",
      "Annual meadow grass (Poa annua) germinating — flag lawns for pre-emergent consideration",
      "Weed emergence begins — dandelions, daisies, speedwell appearing",
    ],
  },
  {
    month: "April", shortMonth: "Apr", index: 3, priority: "high",
    headline: "Early Spring treatment cycle closes — renovations run to 1st week of May.",
    tasks: [
      { type: "early-spring", label: "Early Spring Nutrition (cycle closes end of April)" },
      { type: "renovation", label: "Aeration, scarification, overseeding, top-dressing (closing 1st week May)" },
      { type: "wetting-agent", label: "Wetting agent applications" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Red Thread — peak risk window, inspect all sites",
      "Dollar Spot beginning to appear in warmer spells",
      "Weed pressure increasing — clover, speedwell, buttercup all active",
      "Dry Patch risk starting in free-draining soils — wetting agent timing critical",
      "Chafer beetle adults may begin emerging late April — monitor",
    ],
  },
  {
    month: "May", shortMonth: "May", index: 4, priority: "high",
    headline: "Late Spring treatment cycle opens — renovations close 1st week.",
    tasks: [
      { type: "renovation", label: "Renovations close 1st week of May" },
      { type: "late-spring", label: "Late Spring Nutrition" },
      { type: "late-spring", label: "Soil Conditioner" },
      { type: "late-spring", label: "Spring Weed Control" },
      { type: "wetting-agent", label: "Wetting agent applications" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Red Thread — prime risk (warm humid nights), inspect every visit",
      "Dollar Spot risk rising — check closely on fine-leaved lawns",
      "Chafer Grub adults flying May–June — watch for adult beetles on turf",
      "Dry Patch establishing — prioritise wetting agent on known sites",
      "Weed pressure at peak — good herbicide timing window while weeds actively growing",
    ],
  },
  {
    month: "June", shortMonth: "Jun", index: 5, priority: "high",
    headline: "Late Spring cycle closes mid-June — equipment service end of month.",
    tasks: [
      { type: "late-spring", label: "Late Spring Nutrition, Soil Conditioner, Weed Control (closes mid-June)" },
      { type: "wetting-agent", label: "Wetting agent applications (closes mid-June)" },
      { type: "fungicide", label: "Preventative fungicide (closes mid-June)" },
      { type: "equipment", label: "Equipment service — end of June" },
    ],
    alerts: [
      "Chafer Grub adults flying and laying eggs — record sites with adult activity for July Acelepryn timing",
      "Dry Patch — risk peaks in dry spells, check hydrophobicity on all sandy/free-draining lawns",
      "Red Thread and Dollar Spot active — monitor closely, especially in drought stress",
      "Drought stress onset — document affected lawns",
      "Ant nesting creating sandy casts — customer query likely",
    ],
  },
  {
    month: "July", shortMonth: "Jul", index: 6, priority: "high",
    headline: "Summer treatment cycle — Grub X for Chafer Grubs.",
    tasks: [
      { type: "summer", label: "Summer Nutrition" },
      { type: "summer", label: "Summer Weed Control" },
      { type: "grub-x", label: "Grub X (Acelepryn) for Chafer Grubs", note: "Apply when adults have laid eggs — typically early–mid July in Hampshire/Surrey" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Chafer Grub egg hatch — larvae begin feeding on roots mid-July onwards",
      "Dry Patch at peak — prioritise sites with known hydrophobic soils",
      "Drought stress — document areas where turf is not recovering; plan autumn renovation",
      "Dollar Spot and Red Thread active in humid conditions",
      "Leatherjacket adults (crane flies) begin appearing late July — early sign for October Acelepryn",
    ],
  },
  {
    month: "August", shortMonth: "Aug", index: 7, priority: "high",
    headline: "Summer cycle closes mid-August — Renovations reopen mid-August.",
    tasks: [
      { type: "summer", label: "Summer Nutrition & Weed Control (closes mid-August)" },
      { type: "fungicide", label: "Preventative fungicide (closes mid-August)" },
      { type: "renovation", label: "Renovations reopen mid-August: aeration, scarification, overseeding, top-dressing" },
    ],
    alerts: [
      "Leatherjacket adults (daddy long legs) peak flight Aug–Sep — record affected sites for October Acelepryn",
      "Chafer Grub larvae actively feeding — look for spongy turf, bird pecking, fox damage",
      "Dry Patch persisting on free-draining sites",
      "Fusarium risk rising as nights cool — inspect closely from late August",
      "Assess drought-damaged areas for renovation priority — make a list before September rush",
    ],
  },
  {
    month: "September", shortMonth: "Sep", index: 8, priority: "high",
    headline: "Core renovation month — aeration, scarification, overseeding, top-dressing.",
    tasks: [
      { type: "renovation", label: "Hollow-tine aeration", note: "Ideal soil temps 10–18°C — Hampshire/Surrey window is excellent in September" },
      { type: "renovation", label: "Scarification — remove thatch and dead moss" },
      { type: "renovation", label: "Overseeding — best germination window of the year" },
      { type: "renovation", label: "Top-dressing after aeration and overseeding" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Fusarium patch — peak risk from mid-September as nights cool and damp (prime Hampshire/Surrey conditions)",
      "Red Thread active — inspect all sites, especially after renovation",
      "Leatherjacket larvae newly hatched and feeding — look for yellowing patches, confirm with soil inspection",
      "Chafer Grub larvae continue feeding — secondary turf damage visible",
      "Fairy Ring symptoms may become visible — note locations for customer communication",
    ],
  },
  {
    month: "October", shortMonth: "Oct", index: 9, priority: "high",
    headline: "Renovations close end of month — Grub X for Leatherjackets.",
    tasks: [
      { type: "renovation", label: "Aeration, overseeding, top-dressing (closes end of October)" },
      { type: "grub-x", label: "Grub X (Acelepryn) for Leatherjackets", note: "Time to when adults have finished laying eggs — typically Oct in southern England" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Leatherjacket larvae active and near surface — good Acelepryn window",
      "Fusarium — conditions ideal throughout October, inspect every visit",
      "Ground frost risk from late October — protect freshly overseeded areas",
      "Worm casts increasing — customer queries likely on cast-heavy lawns",
      "Autumn leaves smothering new seed — advise customers on clearance",
    ],
  },
  {
    month: "November", shortMonth: "Nov", index: 10, priority: "high",
    headline: "Autumn treatment cycle — Nutrition, Moss Inhibitor & Weed Control.",
    tasks: [
      { type: "autumn", label: "Autumn Nutrition" },
      { type: "autumn", label: "Moss Inhibitor" },
      { type: "autumn", label: "Weed Control" },
      { type: "fungicide", label: "Preventative fungicide" },
    ],
    alerts: [
      "Fusarium patch — prime conditions all month (cool, wet, low light)",
      "Red Thread active in mild spells",
      "Waterlogging — flag heavily compacted lawns for spring hollow-tine priority",
      "Frost damage risk — avoid treating when frost forecast within 24 hours",
      "Worm casts peak — most common customer complaint this month",
    ],
  },
  {
    month: "December", shortMonth: "Dec", index: 11, priority: "medium",
    headline: "Autumn cycle closes mid-Dec — equipment service end of month.",
    tasks: [
      { type: "autumn", label: "Autumn Nutrition, Moss Inhibitor & Weed Control (closes mid-December)" },
      { type: "fungicide", label: "Preventative fungicide (closes mid-December)" },
      { type: "equipment", label: "Equipment service — end of December" },
    ],
    alerts: [
      "Fusarium active in mild wet spells — inspect on every visit until hard frost",
      "Frost and snow damage — document for customer communication",
      "Assess moss levels to plan January Lawn Tonic volumes",
      "Review season performance — identify lawns needing renovation priority next year",
    ],
  },
];
