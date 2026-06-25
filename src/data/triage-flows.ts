export type Severity = "stop" | "info" | "escalate" | "resolve";

export interface TriageOption {
  label: string;
  next: string; // node id
}

export interface TriageQuestion {
  kind: "question";
  id: string;
  question: string;
  help?: string;
  options: TriageOption[];
}

export interface TriageOutcome {
  kind: "outcome";
  id: string;
  title: string;
  summary: string;
  actions: string[];
  severity: Severity;
}

export type TriageNode = TriageQuestion | TriageOutcome;

export interface TriageFlow {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string; // lucide icon name
  tags: string[];
  rootId: string;
  nodes: Record<string, TriageNode>;
}

/* ------------------------------------------------------------------ */
/* Helpers to keep flow definitions readable                          */
/* ------------------------------------------------------------------ */
const q = (
  id: string,
  question: string,
  options: TriageOption[],
  help?: string,
): TriageQuestion => ({ kind: "question", id, question, options, help });

const o = (
  id: string,
  title: string,
  summary: string,
  actions: string[],
  severity: Severity,
): TriageOutcome => ({ kind: "outcome", id, title, summary, actions, severity });

/* ------------------------------------------------------------------ */
/* Flow 1 — Weed control ineffective                                  */
/* ------------------------------------------------------------------ */
const weedControl: TriageFlow = {
  id: "weed-control-ineffective",
  title: "Weed control doesn't appear effective",
  category: "Treatments",
  description: "Customer reports weeds still visible after a recent weed-control treatment.",
  icon: "Sprout",
  tags: ["lawn", "treatment", "weeds", "complaint"],
  rootId: "key-account",
  nodes: {
    "key-account": q("key-account", "Is this a key account?", [
      { label: "Yes", next: "photos" },
      { label: "No", next: "photos" },
    ], "Key accounts get prioritised handling and a same-day response."),

    photos: q("photos", "Do we have clear photos from the customer of the weeds?", [
      { label: "Yes", next: "days-since" },
      { label: "No", next: "request-photos" },
    ]),

    "request-photos": o(
      "request-photos",
      "Stop — request photos first",
      "We can't triage without seeing the affected area. Request clear, well-lit photos before continuing.",
      [
        "Send the customer the 'photo request' SMS template",
        "Ask for at least 2 photos: a wide shot of the lawn and a close-up of the weeds",
        "Log the request in the CRM and set a follow-up for 48 hours",
      ],
      "stop",
    ),

    "days-since": q("days-since", "How long since our weed control treatment?", [
      { label: "Under 10 days", next: "too-early" },
      { label: "10–14 days", next: "weather" },
      { label: "Over 14 days", next: "weed-type" },
    ]),

    "too-early": o(
      "too-early",
      "Too early to judge — reassure customer",
      "Selective herbicides typically take 10–14 days to show full effect. Treatment is still working.",
      [
        "Reassure the customer this is normal — send the 'weed-control timeline' email template",
        "Set a follow-up reminder for day 14 to check back in",
        "No revisit needed at this stage",
      ],
      "info",
    ),

    weather: q("weather", "Was there heavy rain within 24 hours of treatment?", [
      { label: "Yes", next: "rain-washoff" },
      { label: "No / unsure", next: "weed-type" },
    ]),

    "rain-washoff": o(
      "rain-washoff",
      "Likely wash-off — schedule a free re-treatment",
      "Heavy rain within 24 hours of application can wash product off the leaf surface before uptake.",
      [
        "Book a complimentary re-treatment within the next 7 days",
        "Note 'weather wash-off' on the job card so the technician applies a sticker/adjuvant",
        "Apologise to the customer and confirm the revisit date",
      ],
      "resolve",
    ),

    "weed-type": q("weed-type", "Has the weed type been identified?", [
      { label: "Yes — broadleaf (dandelion, daisy, clover, etc.)", next: "broadleaf-resistant" },
      { label: "Yes — grass weed (yorkshire fog, couch, etc.)", next: "grass-weed" },
      { label: "No", next: "identify-weed" },
    ]),

    "identify-weed": o(
      "identify-weed",
      "Identify the weed before re-treating",
      "We need to know the species before choosing the right product. Don't blanket re-treat.",
      [
        "Ask the technician on the next visit to photograph and ID the weeds",
        "Alternatively, request a close-up photo from the customer",
        "Pause the complaint until ID is confirmed",
      ],
      "info",
    ),

    "broadleaf-resistant": o(
      "broadleaf-resistant",
      "Schedule a targeted spot-treatment",
      "Some broadleaf weeds (especially clover and speedwell) can need a second hit with a different active.",
      [
        "Book a free spot-treatment within 10 working days",
        "Use the secondary herbicide (clopyralid mix) noted in the SOP",
        "Update the customer with the booked date",
      ],
      "resolve",
    ),

    "grass-weed": o(
      "grass-weed",
      "Escalate — selective grass-weed control needed",
      "Standard selective herbicides don't control grass weeds. This needs a manager decision.",
      [
        "Flag to the operations manager today",
        "Do not promise the customer a free fix — the product/labour cost is significant",
        "Manager will decide on goodwill scarification or chemical option",
      ],
      "escalate",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Flow 2 — Lawn turning yellow                                       */
/* ------------------------------------------------------------------ */
const yellowLawn: TriageFlow = {
  id: "lawn-turning-yellow",
  title: "Lawn turning yellow",
  category: "Lawn health",
  description: "Customer reports their lawn going yellow or losing colour.",
  icon: "AlertTriangle",
  tags: ["lawn", "treatment", "discolouration", "complaint"],
  rootId: "yellow-photos",
  nodes: {
    "yellow-photos": q("yellow-photos", "Do we have clear photos of the affected area?", [
      { label: "Yes", next: "yellow-pattern" },
      { label: "No", next: "yellow-request-photos" },
    ]),

    "yellow-request-photos": o(
      "yellow-request-photos",
      "Stop — request photos first",
      "Pattern of yellowing is the single biggest diagnostic clue. We can't triage without it.",
      [
        "Send the customer the 'photo request' SMS template",
        "Ask for both a wide shot and a close-up",
        "Set a 48-hour follow-up reminder",
      ],
      "stop",
    ),

    "yellow-pattern": q("yellow-pattern", "What does the yellowing look like?", [
      { label: "Whole lawn / large area", next: "yellow-recent-treatment" },
      { label: "Patches or small spots", next: "yellow-patches" },
      { label: "Stripes or lines", next: "yellow-stripes" },
    ]),

    "yellow-stripes": o(
      "yellow-stripes",
      "Likely application error — escalate to manager",
      "Striping usually indicates an uneven spread or spray pass.",
      [
        "Identify which technician carried out the last treatment",
        "Flag to operations manager for review",
        "Offer the customer a goodwill re-treatment once cause is confirmed",
      ],
      "escalate",
    ),

    "yellow-recent-treatment": q("yellow-recent-treatment", "Was a treatment applied in the last 7 days?", [
      { label: "Yes", next: "fertiliser-burn" },
      { label: "No", next: "yellow-watering" },
    ]),

    "fertiliser-burn": o(
      "fertiliser-burn",
      "Possible fertiliser scorch — book a recovery visit",
      "Yellowing soon after treatment in dry conditions can indicate fertiliser scorch.",
      [
        "Advise the customer to water the lawn deeply for the next 5 days",
        "Book a free recovery inspection in 2 weeks",
        "Note on the job card: review fertiliser rate for this property",
      ],
      "resolve",
    ),

    "yellow-watering": q("yellow-watering", "Has the customer been watering during dry weather?", [
      { label: "Yes", next: "yellow-disease" },
      { label: "No / unsure", next: "drought-stress" },
    ]),

    "drought-stress": o(
      "drought-stress",
      "Likely drought stress — customer guidance",
      "Lawns commonly turn straw-yellow under drought and recover with rain.",
      [
        "Send the 'lawn watering guide' email template",
        "Reassure: most lawns recover within 2–3 weeks of rainfall",
        "No revisit needed unless it doesn't recover after rain",
      ],
      "info",
    ),

    "yellow-disease": o(
      "yellow-disease",
      "Possible disease — book a diagnostic visit",
      "If watering is adequate and no recent treatment, fungal disease (e.g. red thread, fusarium) is a strong possibility.",
      [
        "Book a diagnostic visit within 5 working days",
        "Technician to bring sample bags for lab ID if unclear",
        "Hold off on quoting fungicide until diagnosis confirmed",
      ],
      "resolve",
    ),

    "yellow-patches": q("yellow-patches", "Are the patches roughly circular and quick to appear?", [
      { label: "Yes", next: "pet-or-disease" },
      { label: "No — irregular shapes", next: "yellow-disease" },
    ]),

    "pet-or-disease": q("pet-or-disease", "Does the customer have a dog with garden access?", [
      { label: "Yes", next: "dog-urine" },
      { label: "No", next: "yellow-disease" },
    ]),

    "dog-urine": o(
      "dog-urine",
      "Likely dog-urine scorch — customer guidance",
      "Round yellow patches with a darker green ring are textbook urine scorch.",
      [
        "Send the 'pet damage' guidance leaflet",
        "Recommend hosing affected areas after the dog urinates",
        "Offer overseeding as a paid extra if patches are bare",
      ],
      "info",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Flow 3 — Moss returning after moss control                         */
/* ------------------------------------------------------------------ */
const mossReturning: TriageFlow = {
  id: "moss-returning",
  title: "Moss treatment — not effective / regrown",
  category: "Treatments",
  description:
    "Customer says our moss control hasn't worked: moss hasn't turned black, regrew weeks later, or returned after months.",
  icon: "Sprout",
  tags: ["lawn", "treatment", "moss", "complaint"],
  rootId: "moss-since",
  nodes: {
    "moss-since": q(
      "moss-since",
      "How long since we applied the moss treatment?",
      [
        { label: "Under 7 days", next: "moss-under-7" },
        { label: "7–14 days", next: "moss-7-14" },
        { label: "2–4 weeks", next: "moss-2-4w" },
        { label: "Over 4 weeks (regrowth)", next: "moss-regrowth-cause" },
      ],
      "The expected response timeline drives whether this is a customer-expectations conversation or an operational mistake.",
    ),

    /* ---------- 0–7 days: expectations ---------- */
    "moss-under-7": o(
      "moss-under-7",
      "Far too early — pure expectation management",
      "Iron-based moss control needs 7–14 days to blacken moss and up to 21 days for full die-back. Nothing has gone wrong.",
      [
        "Reassure: 'You'll start to see blackening from day 7, full effect by week 2–3.'",
        "Send the 'Moss treatment — what to expect' email template",
        "Log the call, do NOT book a revisit",
        "Set a follow-up reminder for day 21 to check satisfaction",
      ],
      "info",
    ),

    /* ---------- 7–14 days: borderline ---------- */
    "moss-7-14": q(
      "moss-7-14",
      "Has the moss started to darken or blacken at all?",
      [
        { label: "Yes — some blackening", next: "moss-progressing" },
        { label: "No change at all", next: "moss-7-14-weather" },
      ],
    ),

    "moss-progressing": o(
      "moss-progressing",
      "Working as expected — reassure",
      "Partial blackening at 7–14 days is exactly on track. Full die-back takes up to three weeks.",
      [
        "Confirm with customer: 'That's exactly the timeline we'd expect.'",
        "Encourage them to wait another 7–10 days before judging",
        "Diary a follow-up call at day 21",
      ],
      "info",
    ),

    "moss-7-14-weather": q(
      "moss-7-14-weather",
      "Was there heavy rain within 6 hours of our visit, or has the lawn been mown since?",
      [
        { label: "Heavy rain within 6 hours", next: "moss-washoff" },
        { label: "Lawn mown since treatment", next: "moss-mown-off" },
        { label: "Neither", next: "moss-check-job-card" },
      ],
    ),

    "moss-washoff": o(
      "moss-washoff",
      "Wash-off — free re-treatment",
      "Iron sulphate needs 6 hours rain-free to bind to the moss. We should have rescheduled.",
      [
        "Apologise and own it — this is on us, weather check should have caught it",
        "Book a free re-treatment within 10 working days",
        "Flag to the route planner: review weather-check process for that day",
      ],
      "resolve",
    ),

    "moss-mown-off": o(
      "moss-mown-off",
      "Customer error — mostly expectation, partial goodwill",
      "Mowing within 3 days strips the product off before it can act. We should be telling customers this clearly at the door.",
      [
        "Explain politely: 'Mowing within 3 days removes the product before it can work.'",
        "Send the 'After-treatment care — moss' leaflet",
        "Offer a discounted top-up (50%) as goodwill — not free",
        "Check: did the technician leave the aftercare card? If not, this becomes a free re-treat",
      ],
      "info",
    ),

    "moss-check-job-card": o(
      "moss-check-job-card",
      "Investigate before promising anything",
      "No obvious cause — we need to check the application before judging customer vs us.",
      [
        "Pull the job card: product used, rate, area covered, technician notes",
        "Check the technician's other moss jobs that day — are others reporting the same?",
        "Call the customer back within 24 hours with a decision",
        "Default to a free re-treatment if anything looks off",
      ],
      "escalate",
    ),

    /* ---------- 2–4 weeks: should be obvious by now ---------- */
    "moss-2-4w": q(
      "moss-2-4w",
      "Is there any blackened/dead moss visible?",
      [
        { label: "Yes — but customer expected it gone", next: "moss-still-there" },
        { label: "No blackening at all", next: "moss-failed-application" },
      ],
    ),

    "moss-still-there": o(
      "moss-still-there",
      "Education — moss control kills, it doesn't remove",
      "Dead moss stays in the lawn until scarified out. Customers often expect it to vanish.",
      [
        "Explain clearly: 'Our treatment killed the moss — the brown/black material is dead moss. It physically has to be removed by scarification.'",
        "Send the 'Moss control vs scarification' explainer",
        "Quote scarification (priced per m²) — book within the next 4 weeks ideally",
        "If they decline scarification, set expectation that regrowth is likely",
      ],
      "info",
    ),

    "moss-failed-application": o(
      "moss-failed-application",
      "Treatment failure — our problem, free re-treat",
      "By 2–4 weeks we should see clear blackening. No change = the product didn't reach the moss properly.",
      [
        "Apologise — this is on us, no debate",
        "Book a free re-treatment within 7 working days",
        "Pull the job card and check: product strength, rate, equipment calibration",
        "Flag to ops manager for review of that batch / technician",
      ],
      "resolve",
    ),

    /* ---------- Over 4 weeks: regrowth ---------- */
    "moss-regrowth-cause": q(
      "moss-regrowth-cause",
      "Did the customer accept scarification after the treatment?",
      [
        { label: "Yes — we scarified", next: "moss-regrowth-conditions" },
        { label: "No — scarification declined / not offered", next: "moss-no-scarif" },
      ],
    ),

    "moss-no-scarif": o(
      "moss-no-scarif",
      "Expected outcome — re-set expectations",
      "Without scarification, dead moss holds moisture and seeds rapid regrowth. This is the textbook reason moss returns.",
      [
        "Explain honestly: 'Moss control without scarification typically buys 8–12 weeks.'",
        "Re-quote scarification — this time as the fix, not an upsell",
        "If we never offered scarification originally, that's a coaching point — offer a goodwill discount",
        "Recommend annual scarification + 2x moss treatments as a maintenance plan",
      ],
      "info",
    ),

    "moss-regrowth-conditions": q(
      "moss-regrowth-conditions",
      "Is the lawn heavily shaded, poorly drained, or under tree canopy?",
      [
        { label: "Yes — shade", next: "moss-shade" },
        { label: "Yes — drainage / wet", next: "moss-drainage" },
        { label: "Neither — open, well-drained lawn", next: "moss-true-regrowth" },
      ],
    ),

    "moss-shade": o(
      "moss-shade",
      "Underlying cause — manage long-term",
      "Moss will always come back in shade. We can manage it, not eliminate it.",
      [
        "Have the honest conversation — send the 'Shade & moss' guidance",
        "Recommend canopy thinning where practical",
        "Offer a maintenance plan: 2x moss treatments + annual scarification",
        "Set expectation that 4–6 month regrowth is normal here",
      ],
      "info",
    ),

    "moss-drainage": o(
      "moss-drainage",
      "Escalate — drainage assessment needed",
      "Persistent wet conditions can't be fixed with repeat chemistry. We need to address the soil.",
      [
        "Book a lead technician for on-site drainage assessment",
        "Don't promise a chemistry-only fix",
        "Likely solutions: hollow-tine aeration, sand top-dressing, drainage channels",
        "Flag to operations manager",
      ],
      "escalate",
    ),

    "moss-true-regrowth": o(
      "moss-true-regrowth",
      "Genuine regrowth on a healthy lawn — book follow-up",
      "Open, well-drained lawn with no shade should hold for longer. A top-up is warranted as goodwill.",
      [
        "Book a complimentary moss top-up within 10 working days",
        "Recommend pairing with the next scheduled scarification",
        "Note on file: consider stronger formulation or split application next year",
      ],
      "resolve",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Flow 6 — Lawn disease call                                         */
/* ------------------------------------------------------------------ */
const lawnDisease: TriageFlow = {
  id: "lawn-disease-call",
  title: "Lawn disease — can we attend?",
  category: "Lawn health",
  description:
    "Customer reports patches that look fungal. Decide whether we attend, advise, or wait it out.",
  icon: "Stethoscope",
  tags: ["lawn", "disease", "fungus", "diagnosis", "complaint"],
  rootId: "dz-photos",
  nodes: {
    "dz-photos": q("dz-photos", "Do we have clear, recent photos?", [
      { label: "Yes", next: "dz-pattern" },
      { label: "No", next: "dz-need-photos" },
    ]),

    "dz-need-photos": o(
      "dz-need-photos",
      "Request photos first",
      "Most diseases are diagnosable from a good photo. Don't book a visit without one.",
      [
        "Send the 'photo request' SMS — wide shot + close-up + early morning if possible",
        "Ask whether dew shows any cobweb-like growth (helps ID fusarium)",
        "48-hour follow-up",
      ],
      "stop",
    ),

    "dz-pattern": q(
      "dz-pattern",
      "What's the pattern?",
      [
        { label: "Pink/red threads, irregular patches", next: "dz-red-thread" },
        { label: "Small tan/yellow rings, often after damp mild weather", next: "dz-fusarium" },
        { label: "Dark green rings or rings of mushrooms", next: "dz-fairy" },
        { label: "Brown random patches, no clear pattern", next: "dz-generic" },
      ],
    ),

    "dz-red-thread": q(
      "dz-red-thread",
      "What time of year is it?",
      [
        { label: "May–October", next: "dz-red-thread-season" },
        { label: "November–April", next: "dz-generic" },
      ],
      "Red thread is most active in warm, humid weather on under-fed lawns.",
    ),

    "dz-red-thread-season": o(
      "dz-red-thread-season",
      "Red thread — feed, don't spray",
      "We do not routinely apply fungicide for red thread. A balanced nitrogen feed grows it out within 2–4 weeks.",
      [
        "Reassure: 'Red thread looks dramatic but it's cosmetic and very treatable.'",
        "Confirm the next feed is scheduled within 2–3 weeks — bring it forward if needed",
        "Send the 'Red thread' explainer",
        "Advise: collect clippings, mow slightly higher, water deeply if dry",
      ],
      "resolve",
    ),

    "dz-fusarium": q(
      "dz-fusarium",
      "Is it actively spreading and on a high-value lawn (e.g. recently renovated / key account)?",
      [
        { label: "Yes", next: "dz-fusarium-attend" },
        { label: "No — small patches, stable", next: "dz-fusarium-monitor" },
      ],
      "Fusarium patch (snow mould) appears autumn–early spring, often after a frost or damp mild spell.",
    ),

    "dz-fusarium-attend": o(
      "dz-fusarium-attend",
      "Attend — diagnostic visit, possible fungicide",
      "Active fusarium on a high-value lawn justifies a visit and possibly a fungicide application.",
      [
        "Book a diagnostic visit within 3 working days",
        "Technician brings sample bags in case of escalation",
        "Avoid nitrogen — it feeds the disease",
        "Quote fungicide only after diagnosis is confirmed on site",
      ],
      "resolve",
    ),

    "dz-fusarium-monitor": o(
      "dz-fusarium-monitor",
      "Monitor — cultural fix first",
      "Small, stable patches usually grow out as conditions improve. Don't reach for chemistry first.",
      [
        "Send the 'Fusarium / snow mould' explainer",
        "Advise: brush off dew in the morning, improve air flow, hold off on N",
        "Set a 3-week follow-up to reassess",
        "Schedule scarification + aeration in the next maintenance window",
      ],
      "info",
    ),

    "dz-fairy": o(
      "dz-fairy",
      "Fairy rings — cultural management, no spray",
      "There is no reliable chemical fix for fairy rings. We manage symptoms.",
      [
        "Explain honestly: 'There's no spray that removes them — we manage the symptoms.'",
        "Recommend deep watering of rings to reduce hydrophobic soil",
        "Aeration through the ring helps water penetration",
        "Mushrooms can be brushed off; they're a fruiting body, not the problem",
      ],
      "info",
    ),

    "dz-generic": o(
      "dz-generic",
      "Unclear — book diagnostic visit",
      "Where pattern doesn't match a textbook disease, get eyes on it before promising anything.",
      [
        "Book a diagnostic visit within 5 working days",
        "Technician brings sample bag for lab ID if needed",
        "Do not quote treatment until diagnosis is confirmed",
        "If a key account, prioritise to within 48 hours",
      ],
      "escalate",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Flow 4 — Bare patches / poor germination                           */
/* ------------------------------------------------------------------ */
const barePatches: TriageFlow = {
  id: "bare-patches",
  title: "Bare patches / poor seed germination",
  category: "Lawn health",
  description: "Overseeded or repaired areas not establishing as expected.",
  icon: "Sprout",
  tags: ["lawn", "overseeding", "germination", "complaint"],
  rootId: "patches-overseeded",
  nodes: {
    "patches-overseeded": q("patches-overseeded", "Did we overseed or repair this area?", [
      { label: "Yes", next: "patches-days" },
      { label: "No", next: "patches-not-ours" },
    ]),

    "patches-not-ours": o(
      "patches-not-ours",
      "Quote a repair / overseeding visit",
      "If we haven't recently seeded, there's no warranty case — quote the repair.",
      [
        "Send the customer an overseeding/repair quote",
        "Recommend the best window for their grass type",
        "No free revisit",
      ],
      "info",
    ),

    "patches-days": q("patches-days", "How long since seeding?", [
      { label: "Under 14 days", next: "patches-too-early" },
      { label: "14–28 days", next: "patches-watering" },
      { label: "Over 28 days", next: "patches-watering" },
    ]),

    "patches-too-early": o(
      "patches-too-early",
      "Too early — reassure",
      "Most cool-season grasses germinate in 10–21 days depending on temperature.",
      [
        "Send the 'overseeding aftercare' email template",
        "Confirm watering schedule with the customer",
        "Set a 14-day follow-up",
      ],
      "info",
    ),

    "patches-watering": q("patches-watering", "Has the area been kept consistently moist?", [
      { label: "Yes", next: "patches-pests" },
      { label: "No", next: "patches-dryout" },
    ]),

    "patches-dryout": o(
      "patches-dryout",
      "Dry-out failure — reseed at cost",
      "Seed that dries out after germination dies and won't recover. Not a warranty issue.",
      [
        "Quote a reseed at material-cost only as a goodwill gesture",
        "Re-issue the watering guidance",
        "Note on the file: customer needs strong watering reminder next time",
      ],
      "info",
    ),

    "patches-pests": q("patches-pests", "Any sign of birds, foxes, or pet disturbance on the area?", [
      { label: "Yes", next: "patches-pests-fix" },
      { label: "No", next: "patches-reseed" },
    ]),

    "patches-pests-fix": o(
      "patches-pests-fix",
      "Reseed with protection",
      "Birds and pets can wipe out a seed bed quickly.",
      [
        "Reseed at no charge (within 6 weeks of original seeding)",
        "Supply jute netting / mesh as protection",
        "Brief the customer on keeping pets off until established",
      ],
      "resolve",
    ),

    "patches-reseed": o(
      "patches-reseed",
      "Free reseed under our germination guarantee",
      "Within our 6-week germination guarantee, watered correctly, no pest interference — we cover it.",
      [
        "Book a free reseed within 10 working days",
        "Use a quick-establishing rye blend",
        "Update the customer with the visit date",
      ],
      "resolve",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Flow 5 — Cut quality complaint                                     */
/* ------------------------------------------------------------------ */
const cutQuality: TriageFlow = {
  id: "cut-quality",
  title: "Customer complaint about cut quality",
  category: "Service",
  description: "Customer unhappy with the appearance or finish after a mow.",
  icon: "Scissors",
  tags: ["mowing", "service", "complaint", "customer"],
  rootId: "cut-key",
  nodes: {
    "cut-key": q("cut-key", "Is this a key account?", [
      { label: "Yes", next: "cut-photos" },
      { label: "No", next: "cut-photos" },
    ]),

    "cut-photos": q("cut-photos", "Do we have clear photos of the issue?", [
      { label: "Yes", next: "cut-issue" },
      { label: "No", next: "cut-request-photos" },
    ]),

    "cut-request-photos": o(
      "cut-request-photos",
      "Stop — request photos first",
      "We can't triage cut-quality complaints from a verbal description.",
      [
        "Send the 'photo request' SMS template",
        "Ask for the affected area and a wider shot for context",
        "48-hour follow-up",
      ],
      "stop",
    ),

    "cut-issue": q("cut-issue", "What is the main issue?", [
      { label: "Scalping / bare areas", next: "cut-scalping" },
      { label: "Ragged / torn tips", next: "cut-blades" },
      { label: "Missed strips", next: "cut-missed" },
      { label: "Wheel marks / ruts", next: "cut-wet" },
    ]),

    "cut-wet": o(
      "cut-wet",
      "Wet-ground damage — manage expectations",
      "Wheel ruts on soft ground will recover but may need a top-dressing.",
      [
        "Apologise and explain ground conditions",
        "Offer a free top-dressing visit if ruts are visible after 2 weeks",
        "Brief the crew: skip mowing on this property when ground is saturated",
      ],
      "info",
    ),

    "cut-scalping": o(
      "cut-scalping",
      "Adjust cutting height — book a courtesy visit",
      "Scalping usually means the deck was set too low for the lawn's surface.",
      [
        "Book a free courtesy visit within 5 working days to top-dress and reseed scalped areas",
        "Update the property file with a minimum cutting height",
        "Brief the assigned technician",
      ],
      "resolve",
    ),

    "cut-blades": o(
      "cut-blades",
      "Blunt blades — workshop check & free re-cut",
      "Torn tips that turn straw-coloured within 24 hours are a classic blunt-blade sign.",
      [
        "Pull the mower from rotation for a blade sharpen / replace",
        "Book a free re-cut within 5 working days",
        "Apologise to the customer",
      ],
      "resolve",
    ),

    "cut-missed": o(
      "cut-missed",
      "Free re-cut and crew feedback",
      "Missed strips are a workmanship issue.",
      [
        "Book a free re-cut within 3 working days",
        "Feed back to the technician (not punitive — coaching)",
        "Apologise to the customer",
      ],
      "resolve",
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Export                                                             */
/* ------------------------------------------------------------------ */
export const triageFlows: TriageFlow[] = [
  weedControl,
  yellowLawn,
  mossReturning,
  lawnDisease,
  barePatches,
  cutQuality,
];

export const allTags = Array.from(
  new Set(triageFlows.flatMap((f) => f.tags)),
).sort();

export const triageCategories = Array.from(
  new Set(triageFlows.map((f) => f.category)),
).sort();

/** Read custom (locally-built) flows from localStorage. */
function readCustomFlows(): TriageFlow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem("shrekfeet:custom-flows");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as TriageFlow[]) : [];
  } catch {
    return [];
  }
}

export function getFlow(id: string): TriageFlow | undefined {
  return triageFlows.find((f) => f.id === id) ?? readCustomFlows().find((f) => f.id === id);
}

/* Severity → tailwind classes (semantic tokens) */
export const severityStyles: Record<Severity, { badge: string; ring: string; label: string }> = {
  stop: {
    badge: "bg-destructive text-destructive-foreground",
    ring: "ring-destructive/30",
    label: "Stop",
  },
  escalate: {
    badge: "bg-warning text-warning-foreground",
    ring: "ring-warning/40",
    label: "Escalate",
  },
  resolve: {
    badge: "bg-primary text-primary-foreground",
    ring: "ring-primary/30",
    label: "Action & resolve",
  },
  info: {
    badge: "bg-secondary text-secondary-foreground",
    ring: "ring-border",
    label: "Inform / monitor",
  },
};
