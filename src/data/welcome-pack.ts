export type ExperienceLevel = "trainee" | "experienced-tech" | "horticultural" | "office";

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
  {
    id: "office",
    title: "Office & Customer Service",
    blurb: "You're joining the office team — handling customer calls, scheduling, admin and keeping the operation running smoothly.",
    focus: [
      "Learn Service Assistant 5 (SA5) first — it's the hub for all jobs, routes and customer records.",
      "Shadow the office team for your first week to understand call types, scheduling changes and escalation paths.",
      "Get familiar with our customer communication tone — we're professional but personal.",
      "Build up knowledge of our treatment programme so you can explain it confidently to customers.",
    ],
  },
];

export type WelcomeSection = {
  id: string;
  title: string;
  icon: string;
  body: string;
  bullets?: string[];
  audience?: "technician" | "office" | "all";
};

export const welcomeSections: WelcomeSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    icon: "Leaf",
    audience: "all",
    body: "Shrekfeet is an independent lawn treatment company servicing domestic customers across our regional patch. We sit between the big national franchises and one-man-band operators — professional kit and qualifications, with the personal service of a local team. Our job is to make customers' lawns healthier season by season through a planned programme of treatments, diagnostics and advice.",
  },
  {
    id: "the-role-tech",
    title: "What the role entails",
    icon: "Sprout",
    audience: "technician",
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
    id: "the-role-office",
    title: "What the role entails",
    icon: "Sprout",
    audience: "office",
    body: "As office staff you're the backbone of the operation. Technicians are on the road — you keep everything moving behind the scenes: customer calls, scheduling changes, complaints, invoicing and coordination.",
    bullets: [
      "Answer inbound customer calls — new enquiries, treatment questions, complaints, callbacks.",
      "Manage job scheduling in Service Assistant 5 — route adjustments, reschedules, new sign-ups.",
      "Handle customer correspondence by phone and email with a friendly, professional tone.",
      "Process payments, direct debits and invoices through the finance system.",
      "Liaise with technicians on the road — route changes, urgent customer issues, same-day callbacks.",
      "Flag escalations to the Operations Manager — complaints you can't resolve, safeguarding concerns, damage claims.",
    ],
  },
  {
    id: "expectations",
    title: "What's expected of you",
    icon: "ShieldCheck",
    audience: "all",
    body: "We're a small team and customers judge us on every interaction. The standards below are non-negotiable.",
    bullets: [
      "Punctual: ready and working by your agreed start time.",
      "Presentable: clean uniform (office: smart casual), ID badge visible.",
      "Honest: if you've made a mistake — tell the team immediately. We can fix mistakes; we can't fix cover-ups.",
      "Safe: follow all data handling and physical safety guidelines relevant to your role.",
      "Curious: ask questions. Every senior staff member was new once and would rather you ask than guess.",
      "Customer-first: if a customer is unhappy, listen first, fix what you can, escalate the rest.",
    ],
  },
  {
    id: "first-six-months-tech",
    title: "Your first 6 months",
    icon: "Calendar",
    audience: "technician",
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
    id: "first-six-months-office",
    title: "Your first 6 months",
    icon: "Calendar",
    audience: "office",
    body: "Below is the typical office onboarding journey. You'll be supporting the team from day one, but the early weeks are about absorbing as much as possible.",
    bullets: [
      "Week 1 — Induction: meet the team, set up systems access, shadow calls, read the treatment programme overview.",
      "Weeks 2–3 — Supported call-handling: take calls with a colleague listening in. Review how jobs are logged and scheduled in SA5.",
      "Weeks 3–6 — Independent call-handling: you're answering calls solo with the team nearby. Start owning scheduling changes.",
      "Month 2–3 — Get comfortable with complaint handling, direct debit management and payment queries.",
      "Month 3 — Probation review (mid-point). Honest feedback both ways.",
      "Month 4–6 — Full ownership of your responsibilities. Identify any gaps and raise them with your manager.",
      "Month 6 — End-of-probation review. Full team integration.",
    ],
  },
  {
    id: "probation",
    title: "Probation period",
    icon: "ClipboardList",
    audience: "all",
    body: "All new starters serve a 6-month probation. This protects both sides — you get to decide if Shrekfeet is the right fit, and we get to confirm the role suits you.",
    bullets: [
      "Notice during probation is 1 week (either side).",
      "Mid-probation review at month 3 — informal, focused on progress and any concerns.",
      "End-of-probation review at month 6 — formal sign-off and salary review.",
      "Probation can be extended by up to 3 months if specific skills need more time.",
    ],
  },
  {
    id: "reporting",
    title: "Who you report to",
    icon: "Users",
    audience: "all",
    body: "Day-to-day you'll mostly work within the office team. Your line manager handles formal reviews, development and any HR matters.",
    bullets: [
      "Office team — daily route changes, customer callbacks, job queries, kit orders.",
      "Operations Manager — your direct line manager. Reviews, sickness, holiday, performance, escalations.",
      "Director — final escalation for serious complaints, safeguarding or grievance.",
      "Always keep a record of customer-facing communications in SA5.",
    ],
  },
  {
    id: "systems-office",
    title: "Systems you'll use",
    icon: "BookOpen",
    audience: "office",
    body: "Get hands-on with these from day one. Ask someone to walk you through each one during your first week.",
    bullets: [
      "Service Assistant 5 (SA5) — the main job management system. Jobs, routes, customer records, condition codes, notes.",
      "RealGreen — the underlying platform SA5 runs on. Some admin tasks go here directly.",
      "Telephone system — we use a hosted VoIP system. Ask about call queues, transfers and voicemail setup.",
      "Email — customer correspondence goes through the shared office inbox. You'll be given access and guidelines.",
      "Finance/invoicing system — payment queries, direct debit mandates and invoice generation. Training provided.",
      "This intranet — how-to guides, scheduling tools, supplier directory and company policies. Bookmark it.",
    ],
  },
  {
    id: "call-handling",
    title: "Handling customer calls",
    icon: "Compass",
    audience: "office",
    body: "Most of your day involves customer calls. The tips below are how we handle them at Shrekfeet.",
    bullets: [
      "Answer within 3 rings where possible — customers notice when calls go unanswered.",
      "Use the customer's name — it's in SA5 as soon as you've located their account.",
      "Listen fully before jumping to a solution. Customers want to feel heard first.",
      "Common call types: treatment questions, booking changes, complaints, callback requests, new customer enquiries.",
      "For complaints — log them in SA5 immediately, even if unresolved. Escalate to Operations Manager if you can't resolve on the call.",
      "Never promise a specific technician or exact arrival time unless you've confirmed it in SA5.",
      "End every call by confirming what happens next: 'I'll reschedule that for next Tuesday and you'll receive a text confirmation.'",
    ],
  },
  {
    id: "certifications",
    title: "Professional certifications",
    icon: "GraduationCap",
    audience: "technician",
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
    audience: "technician",
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
    audience: "all",
    body: "We run monthly payroll. Your contract details exact figures — the points below cover the mechanics.",
    bullets: [
      "Paid monthly on the last working day of the month, direct to your bank account.",
      "Payslips issued via the payroll portal — login details sent in week one.",
      "Holiday: 28 days inclusive of bank holidays. Booked via the office, ideally outside the peak season.",
      "Sickness: phone before 7am (technicians) or before your shift starts (office) — no texts, no WhatsApp.",
      "Pension: auto-enrolled after 3 months at statutory minimum; you can opt up or out.",
    ],
  },
  {
    id: "bonus",
    title: "Bonus scheme",
    icon: "Award",
    audience: "technician",
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
    audience: "all",
    body: "The jargon you'll hear in your first few weeks. Don't pretend you understand — ask.",
    bullets: [
      "SA5 — Service Assistant 5 by RealGreen. Our job management system. Every job, customer and visit lives here.",
      "Round — the geographic patch of customers a technician services.",
      "Treatment programme — the planned sequence of seasonal visits a customer signs up to.",
      "Callback — a return visit to fix or re-do a recent treatment (almost always free of charge).",
      "Top-up — an additional treatment between scheduled visits, usually chargeable.",
      "Condition code — short code logged on every visit describing what the technician found.",
      "Account flag — a persistent note on a customer record (e.g. dog on premises, gate code, vulnerable customer).",
      "Triage — the process of diagnosing why a treatment hasn't worked or a lawn is failing.",
      "Scarification / aeration / overseeding — the three big additional services we upsell.",
    ],
  },
  {
    id: "where-to-go-tech",
    title: "Where to go next",
    icon: "Compass",
    audience: "technician",
    body: "Once you've read this pack, work through the resources below in order. Don't binge them — pace yourself across your first month.",
    bullets: [
      "Technician Training path — start at Company Basics and work through each stage.",
      "Policies & Docs — read the handbook, COSHH overview and bonus scheme document.",
      "How-To Guides — bookmark these; they're your day-to-day reference.",
      "Troubleshooting Hub — review the triage flows before you ever need them in front of a customer.",
      "Lawn ID — flick through pests, diseases and treatments so the names start to sink in.",
    ],
  },
  {
    id: "where-to-go-office",
    title: "Where to go next",
    icon: "Compass",
    audience: "office",
    body: "Once you've read this pack, focus on these resources. Build your knowledge steadily across your first month.",
    bullets: [
      "Office Training path — work through the office onboarding modules at your own pace.",
      "Policies & Docs — read the staff handbook and data handling guidelines.",
      "How-To Guides — there are guides for common office situations: complaint handling, rescheduling, payment queries.",
      "Seasonal Calendar — understanding our treatment programme makes customer calls much easier.",
      "Supplier Directory — useful reference for product and equipment suppliers.",
    ],
  },
];
