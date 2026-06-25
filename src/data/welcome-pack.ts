export type ExperienceLevel = "trainee" | "experienced-tech" | "horticultural";

export const experienceTracks: {
  id: ExperienceLevel;
  title: string;
  blurb: string;
  focus: string[];
}[] = [
  {
    id: "trainee",
    title: "Trainee Technician",
    blurb: "No prior lawncare experience — you're starting from scratch and we'll teach you everything.",
    focus: [
      "Full induction across all training modules — don't skip the basics.",
      "Shadow a senior technician for your first 2–4 weeks before solo rounds.",
      "Priority on PA1 & PA6 spray certification before you can treat unsupervised.",
      "Weekly check-ins with your line manager during probation.",
    ],
  },
  {
    id: "experienced-tech",
    title: "Experienced Technician",
    blurb: "You've worked in lawncare before (GreenThumb, TruGreen, Lawn Master, etc.).",
    focus: [
      "Condensed induction — focus on Shrekfeet-specific systems (Service Assistant 5, RealGreen).",
      "Verify your existing PA1/PA6 certificates and any NPTC tickets — bring originals on day one.",
      "Solo rounds typically begin within 1–2 weeks after route familiarisation.",
      "Lean into our diagnostic flows and account-flag system — they're likely different from your last employer.",
    ],
  },
  {
    id: "horticultural",
    title: "Horticultural Background",
    blurb: "Ex-greenkeeper, groundsman, landscaper or gardener moving into lawn treatment.",
    focus: [
      "You already know turf, soil and machinery — we'll fill in the chemical treatment and customer-facing side.",
      "PA1 & PA6 spray certification is essential and prioritised in your first 8 weeks.",
      "Extra time on customer communication, expectation management and triage workflows.",
      "Use your turf knowledge — we lean on experienced staff for disease ID and complex diagnostics.",
    ],
  },
];

export type WelcomeSection = {
  id: string;
  title: string;
  icon: string;
  body: string;
  bullets?: string[];
};

export const welcomeSections: WelcomeSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    icon: "Leaf",
    body: "Shrekfeet is an independent lawn treatment company servicing domestic customers across our regional patch. We sit between the big national franchises and one-man-band operators — professional kit and qualifications, with the personal service of a local team. Our job is to make customers' lawns healthier season by season through a planned programme of treatments, diagnostics and advice.",
  },
  {
    id: "the-role",
    title: "What the role entails",
    icon: "Sprout",
    body: "As a lawn technician you're the face of Shrekfeet. You're not just spraying lawns — you're diagnosing problems, advising customers, recording observations and protecting the brand on every visit.",
    bullets: [
      "Deliver scheduled seasonal treatments (fertiliser, weed control, moss control, etc.) to a route of domestic lawns.",
      "Assess each lawn on arrival — note disease, pests, drought stress, mower damage or scalping.",
      "Talk to customers when they're home. Explain what you're doing, what to expect, and what they should do (watering, mowing height, etc.).",
      "Log every visit in Service Assistant 5 with accurate condition codes and notes.",
      "Look after your van, equipment and PPE — daily checks, weekly cleans, monthly deep checks.",
      "Flag complaints, callbacks and damage to the office the same day they occur.",
    ],
  },
  {
    id: "expectations",
    title: "What's expected of you",
    icon: "ShieldCheck",
    body: "We're a small team and customers judge us on every visit. The standards below are non-negotiable.",
    bullets: [
      "Punctual: van loaded and on the road by your agreed start time.",
      "Presentable: clean uniform, ID badge visible, van tidy inside and out.",
      "Honest: if you've made a mistake, missed a lawn, or spilled product — tell the office immediately. We can fix mistakes; we can't fix cover-ups.",
      "Safe: PPE on every job, COSHH followed, no shortcuts with chemicals.",
      "Curious: ask questions. Every senior tech was new once and would rather you ask than guess.",
      "Customer-first: if a customer is unhappy, listen first, fix what you can on-site, escalate the rest.",
    ],
  },
  {
    id: "first-six-months",
    title: "Your first 6 months",
    icon: "Calendar",
    body: "Below is the typical journey. Pace adjusts based on your starting experience, but the milestones are the same for everyone.",
    bullets: [
      "Week 1 — Induction: company tour, paperwork, PPE issue, van walk-around, intro to systems and key people.",
      "Weeks 2–4 — Shadowing: ride along with a senior tech, learn the route patterns, customer types and product handling.",
      "Weeks 4–8 — Supervised solo: you run jobs alone with a senior available by phone. Daily debriefs.",
      "Month 2–3 — PA1 & PA6 spray certificates booked and passed. Without these you cannot apply liquid treatments unsupervised.",
      "Month 3 — Probation review (mid-point). Honest feedback both ways.",
      "Month 4–6 — Full solo rounds, building speed, diagnostic confidence and customer rapport.",
      "Month 6 — End-of-probation review. Bonus scheme eligibility begins.",
    ],
  },
  {
    id: "probation",
    title: "Probation period",
    icon: "ClipboardList",
    body: "All new technicians serve a 6-month probation. This protects both sides — you get to decide if Shrekfeet is the right fit, and we get to confirm the role suits you.",
    bullets: [
      "Notice during probation is 1 week (either side).",
      "Mid-probation review at month 3 — informal, focused on progress and any concerns.",
      "End-of-probation review at month 6 — formal sign-off, salary review and bonus scheme starts.",
      "Probation can be extended by up to 3 months if specific skills (typically PA certification or customer-facing confidence) need more time.",
    ],
  },
  {
    id: "reporting",
    title: "Who you report to",
    icon: "Users",
    body: "Day-to-day you'll mostly speak to the office team — they dispatch your jobs, handle customer calls, and are your first port of call for anything route-related. Your line manager handles formal reviews, development and any HR matters.",
    bullets: [
      "Office team — daily route changes, customer callbacks, job queries, kit orders.",
      "Operations Manager — your direct line manager. Reviews, sickness, holiday, performance, escalations.",
      "Director — final escalation for serious complaints, safeguarding or grievance.",
      "Always copy the office on anything customer-facing so we have a record.",
    ],
  },
  {
    id: "certifications",
    title: "Professional certifications",
    icon: "GraduationCap",
    body: "The certifications below are the industry standard for UK lawn treatment. We pay for them, we book them, and we expect you to take them seriously.",
    bullets: [
      "PA1 — Foundation pesticide application (theory). Required before PA6.",
      "PA6 — Handheld pesticide application (practical). The core spray ticket for a lawn tech.",
      "PA2 (optional) — Vehicle-mounted boom sprayer. For larger sites.",
      "First Aid at Work — refreshed every 3 years.",
      "Manual Handling — refreshed annually, e-learning.",
      "Lantra / BASIS amenity courses — funded for technicians progressing toward senior roles.",
    ],
  },
  {
    id: "equipment",
    title: "Van, equipment and PPE",
    icon: "Truck",
    body: "On day one you'll be issued a vehicle and a personal kit. You're responsible for keeping it in good order. Anything lost, damaged or stolen must be reported the same day.",
    bullets: [
      "Vehicle: liveried van with spray tank, fertiliser hopper and storage. Daily walk-around check; weekly clean inside and out.",
      "PPE issued: branded polo & fleece (x3), waterproofs, safety boots, nitrile gloves, face shield, respirator (with replaceable filters).",
      "Tech kit: soil probe, pH meter, moisture meter, measuring wheel, calibrated spreader, knapsack sprayer, phone/tablet for Service Assistant.",
      "Fuel card issued in your name — personal use is gross misconduct.",
      "Lost/damaged items: report to the office, replacement issued from stores. Repeated loss may be recharged.",
    ],
  },
  {
    id: "payroll",
    title: "How payroll works",
    icon: "Wallet",
    body: "We run monthly payroll. Your contract details exact figures — the points below cover the mechanics.",
    bullets: [
      "Paid monthly on the last working day of the month, direct to your bank account.",
      "Payslips issued via the payroll portal — login details sent in week one.",
      "Hours are salaried, not timesheet-based, but we expect a full working day on the route.",
      "Overtime in peak season (April–June) is paid at standard rate unless agreed otherwise in writing.",
      "Holiday: 28 days inclusive of bank holidays. Booked via the office, ideally outside the peak season.",
      "Sickness: phone the office before 7am on any day you can't work — no texts, no WhatsApp.",
      "Pension: auto-enrolled after 3 months at statutory minimum; you can opt up or out.",
    ],
  },
  {
    id: "bonus",
    title: "Bonus scheme",
    icon: "Award",
    body: "Once you're past probation you're eligible for the technician bonus scheme. The scheme rewards retention, upsell and quality — not just job count.",
    bullets: [
      "Retention bonus — paid quarterly based on customer cancellation rate on your round (lower is better).",
      "Upsell commission — paid on additional services you sell on-site (scarification, aeration, lawn renovation) once the job is completed and paid.",
      "Quality bonus — driven by complaint rate and callback rate. Clean quarter = full bonus.",
      "Annual loyalty bonus paid at end of financial year for technicians with 2+ years' service.",
      "Full scheme document is in Policies & Docs — read it, ask questions if anything is unclear.",
    ],
  },
  {
    id: "terminology",
    title: "Common terminology & processes",
    icon: "BookOpen",
    body: "The jargon you'll hear in your first few weeks. Don't pretend you understand — ask.",
    bullets: [
      "SA5 — Service Assistant 5 by RealGreen. Our job management system. You'll live in it daily.",
      "Round — the geographic patch of customers you service.",
      "Treatment programme — the planned sequence of seasonal visits a customer signs up to.",
      "Callback — a return visit to fix or re-do a recent treatment (almost always free of charge).",
      "Top-up — an additional treatment between scheduled visits, usually chargeable.",
      "Condition code — short code logged on every visit describing what you found (e.g. moss-heavy, drought-stressed).",
      "Account flag — a persistent note on a customer record (e.g. dog on premises, gate code, vulnerable customer).",
      "Triage — the process of diagnosing why a treatment hasn't worked or a lawn is failing.",
      "Scarification / aeration / overseeding — the three big additional services we upsell.",
    ],
  },
  {
    id: "where-to-go",
    title: "Where to go next",
    icon: "Compass",
    body: "Once you've read this pack, work through the resources below in order. Don't binge them — pace yourself across your first month.",
    bullets: [
      "Technician Training path — start at Company Basics and work through each stage.",
      "Policies & Docs — read the handbook, COSHH overview and bonus scheme document.",
      "How-To Guides — bookmark these; they're your day-to-day reference.",
      "Troubleshooting Hub — review the triage flows before you ever need them in front of a customer.",
      "Lawn ID — flick through pests, diseases and treatments so the names start to sink in.",
    ],
  },
];
