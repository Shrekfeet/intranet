export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
}

export type TrainingRoleId = "technician" | "office";
export type TrainingStageId =
  | "company-basics"
  | "role-foundations"
  | "systems-workflows"
  | "advanced-operations"
  | "lawn-knowledge";

export interface TrainingStage {
  id: TrainingStageId;
  label: string;
  description: string;
  navLabel: string;
}

export interface TrainingPath {
  id: TrainingRoleId;
  title: string;
  description: string;
  stages: TrainingStage[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  estimatedTime: string;
  roles: TrainingRoleId[];
  stage: TrainingStageId;
  isShared?: boolean;
  lessons: Lesson[];
}

export const trainingPaths: Record<TrainingRoleId, TrainingPath> = {
  technician: {
    id: "technician",
    title: "Lawn Technicians",
    description: "Field onboarding, treatment delivery, site safety, and lawncare expertise for the team on the road.",
    stages: [
      {
        id: "company-basics",
        label: "Stage 1 · Company Basics",
        description: "Learn what we do, how we present ourselves, and the service standards every employee follows.",
        navLabel: "Stage 1 · Basics",
      },
      {
        id: "role-foundations",
        label: "Stage 2 · Safe Site Work",
        description: "Build safe working habits, doorstep conduct, and the practical basics of being on customer property.",
        navLabel: "Stage 2 · Site Work",
      },
      {
        id: "systems-workflows",
        label: "Stage 3 · Equipment & Treatment Work",
        description: "Get confident with equipment checks, treatment prep, and the workflows that keep work accurate and compliant.",
        navLabel: "Stage 3 · Equipment",
      },
      {
        id: "advanced-operations",
        label: "Stage 4 · Advanced Service Delivery",
        description: "Move into higher-risk services, treatment quality, certifications, and more intricate operational decisions.",
        navLabel: "Stage 4 · Advanced",
      },
      {
        id: "lawn-knowledge",
        label: "Stage 5 · Lawncare Knowledge",
        description: "Deepen your understanding of grasses, pests, disease, and seasonal lawn behaviour.",
        navLabel: "Stage 5 · Knowledge",
      },
    ],
  },
  office: {
    id: "office",
    title: "Office Staff",
    description: "Front-desk onboarding, scheduling, systems, customer handling, and operational coordination for the office team.",
    stages: [
      {
        id: "company-basics",
        label: "Stage 1 · Company Basics",
        description: "Learn the business, our tone with customers, and the standards shared across the whole company.",
        navLabel: "Stage 1 · Basics",
      },
      {
        id: "role-foundations",
        label: "Stage 2 · Front Desk Essentials",
        description: "Cover call handling, call manners, and the basics of representing the business from the office.",
        navLabel: "Stage 2 · Front Desk",
      },
      {
        id: "systems-workflows",
        label: "Stage 3 · Scheduling & Systems",
        description: "Learn Service Assistant, the shared directory, and the systems used to route information accurately.",
        navLabel: "Stage 3 · Systems",
      },
      {
        id: "advanced-operations",
        label: "Stage 4 · Advanced Coordination",
        description: "Handle more complex routing, service changes, and cross-team coordination with confidence.",
        navLabel: "Stage 4 · Coordination",
      },
      {
        id: "lawn-knowledge",
        label: "Stage 5 · Lawncare Knowledge",
        description: "Understand enough lawncare detail to triage customer calls, explain services, and support the field team.",
        navLabel: "Stage 5 · Knowledge",
      },
    ],
  },
};

export const trainingPathOrder: TrainingRoleId[] = ["technician", "office"];

export const isTrainingRoleId = (value: string | null): value is TrainingRoleId =>
  value === "technician" || value === "office";

export const isTrainingStageId = (value: string | null): value is TrainingStageId =>
  value === "company-basics" ||
  value === "role-foundations" ||
  value === "systems-workflows" ||
  value === "advanced-operations" ||
  value === "lawn-knowledge";

export const trainingModules: TrainingModule[] = [
  {
    id: "company-basics",
    title: "How Shrekfeet Works",
    description: "A shared foundation on what we do, how we deliver it, and what good service looks like across the business.",
    icon: "BookOpen",
    category: "Shared Foundations",
    estimatedTime: "35 min",
    roles: ["technician", "office"],
    stage: "company-basics",
    isShared: true,
    lessons: [
      {
        id: "cb1",
        title: "What We Sell and Why Customers Stay",
        duration: "10 min",
        content:
          "Every employee should understand the core services we provide, the standards customers expect, and the reasons they trust us year after year.\n\n**Core areas:**\n- Regular lawn treatment programmes\n- Moss, weed and lawn health improvement work\n- Honest advice and dependable communication\n- Consistent presentation and follow-through\n\nWhen speaking to customers, keep explanations simple, confident and helpful.",
      },
      {
        id: "cb2",
        title: "How Work Moves Through the Business",
        duration: "12 min",
        content:
          "From the first customer contact to service completion, every step should feel joined up.\n\n1. A customer calls or messages with a need\n2. The office records, schedules or updates the job\n3. The field or service team completes the work\n4. Notes, outcomes and follow-ups are logged clearly\n5. Any issue is handed off quickly and accurately\n\nGood handovers prevent missed details and repeat work.",
      },
      {
        id: "cb3",
        title: "Service Standards Everyone Follows",
        duration: "13 min",
        content:
          "Shared standards matter no matter what role you are in.\n\n**Always:**\n- Be punctual and prepared\n- Use clear, respectful language\n- Record accurate notes\n- Escalate uncertainty instead of guessing\n- Protect customer trust with tidy, professional conduct\n\nCustomers feel the difference when the office and field team operate as one company.",
      },
    ],
  },
  {
    id: "customer-service",
    title: "Customer Communication Standards",
    description: "The shared tone, behaviours and communication habits expected from every employee.",
    icon: "Users",
    category: "Shared Foundations",
    estimatedTime: "30 min",
    roles: ["technician", "office"],
    stage: "company-basics",
    isShared: true,
    lessons: [
      {
        id: "cc1",
        title: "Professional Language and Tone",
        duration: "10 min",
        content:
          "Customers remember how we make them feel. Keep communication calm, friendly and direct.\n\n**Do:**\n- Speak clearly and respectfully\n- Avoid jargon unless you explain it\n- Confirm the next step before ending the conversation\n\n**Do not:**\n- Sound rushed or dismissive\n- Over-promise outcomes\n- Guess when you are unsure",
      },
      {
        id: "cc2",
        title: "Handling Questions and Concerns",
        duration: "10 min",
        content:
          "When a customer is unsure or unhappy, your job is to steady the situation.\n\n1. Listen fully\n2. Acknowledge the concern\n3. Give the clearest answer you can\n4. Escalate if a decision or specialist input is needed\n\nGood service is often about how well we respond when something is unclear.",
      },
      {
        id: "cc3",
        title: "Recording Notes Customers Can Trust",
        duration: "10 min",
        content:
          "Accurate notes help every team member pick up where the last one left off.\n\nInclude:\n- What the customer asked\n- What was explained or promised\n- Any date, access or service constraints\n- What follow-up is still needed\n\nShort, factual notes are better than long vague ones.",
      },
    ],
  },
  {
    id: "safety-basics",
    title: "Technician Health & Safety",
    description: "Site safety, PPE, manual handling and safe behaviour expected from technicians in the field.",
    icon: "ShieldCheck",
    category: "Role-Specific",
    estimatedTime: "45 min",
    roles: ["technician"],
    stage: "role-foundations",
    lessons: [
      {
        id: "s1",
        title: "PPE and Daily Safety Checks",
        duration: "15 min",
        content:
          "Technicians must start each day with the right kit and the right checks.\n\n**Required where appropriate:**\n- Safety boots\n- Gloves\n- Eye protection\n- High-visibility wear\n- Weather-appropriate clothing\n\nBefore leaving or starting a job, confirm equipment condition, vehicle readiness and any site-specific risks.",
      },
      {
        id: "s2",
        title: "Manual Handling and Site Hazards",
        duration: "15 min",
        content:
          "Field work includes repeated lifting, uneven ground and changing weather.\n\n1. Assess the load before lifting\n2. Use proper lifting posture\n3. Watch for slopes, wet surfaces and hidden trip points\n4. Stop work if a hazard makes the task unsafe\n\nA quick risk check prevents injuries and damaged equipment.",
      },
      {
        id: "s3",
        title: "Incident Reporting and Escalation",
        duration: "15 min",
        content:
          "If something goes wrong or nearly goes wrong, report it the same day.\n\nReport:\n- Injuries and near misses\n- Damage to customer property\n- Chemical spills or handling concerns\n- Unsafe access or aggressive behaviour\n\nDo not quietly work around a safety problem. Escalation is part of the job.",
      },
    ],
  },
  {
    id: "doorstep-conduct",
    title: "Doorstep Conduct for Technicians",
    description: "How technicians should arrive, communicate and behave on customer property from first contact to departure.",
    icon: "Users",
    category: "Role-Specific",
    estimatedTime: "25 min",
    roles: ["technician"],
    stage: "role-foundations",
    lessons: [
      {
        id: "dc1",
        title: "Arrival and First Impressions",
        duration: "8 min",
        content:
          "The customer often judges service quality before work begins.\n\n**On arrival:**\n- Park considerately\n- Present a clean, organised appearance\n- Approach the property calmly and professionally\n- Use the agreed access process where one exists\n\nNever create uncertainty about who you are or why you are there.",
      },
      {
        id: "dc2",
        title: "Speaking with Customers at the Door",
        duration: "9 min",
        content:
          "Technicians should be warm and concise.\n\nExplain:\n- What service you are carrying out\n- Any access needs or short-term restrictions\n- Whether follow-up from the office may be needed\n\nAvoid discussing pricing, disputes or commitments outside your authority.",
      },
      {
        id: "dc3",
        title: "Leaving the Property Well",
        duration: "8 min",
        content:
          "Before leaving, confirm the site is tidy and secure.\n\nCheck:\n- Gates are closed\n- Debris is cleared\n- Equipment is packed away safely\n- Any notable observations are logged\n\nA strong finish is part of good doorstep conduct.",
      },
    ],
  },
  {
    id: "equipment-operation",
    title: "Equipment, Spraying & Application Prep",
    description: "The technician workflows for equipment readiness, safe spraying setup and accurate treatment preparation.",
    icon: "Wrench",
    category: "Role-Specific",
    estimatedTime: "50 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "e1",
        title: "Pre-Use Equipment Checks",
        duration: "15 min",
        content:
          "Before any application or mechanical work, check equipment properly.\n\n1. Inspect tanks, hoses and nozzles\n2. Confirm calibration and output settings\n3. Check fuel, power and general condition\n4. Verify labels and materials match the day plan\n\nDo not use equipment that is leaking, damaged or unverified.",
      },
      {
        id: "e2",
        title: "Mixing, Measuring and Application Accuracy",
        duration: "20 min",
        content:
          "Treatment accuracy protects results, compliance and customer trust.\n\n**Always:**\n- Measure carefully\n- Follow label instructions exactly\n- Use the correct application rate\n- Avoid contaminating vehicles, drains or non-target areas\n\nIf instructions and the planned work do not match, stop and escalate.",
      },
      {
        id: "e3",
        title: "Post-Treatment Equipment Care",
        duration: "15 min",
        content:
          "After work is complete, equipment should be cleaned, stored and logged correctly.\n\nInclude:\n- Safe rinse-down procedures\n- Secure chemical storage\n- Fault reporting\n- Refill and readiness for the next shift\n\nGood end-of-day discipline keeps the next day efficient.",
      },
    ],
  },
  {
    id: "weed-treatment",
    title: "Weed Treatment & Spraying Basics",
    description: "The practical service knowledge technicians need for treating weeds safely, effectively and consistently.",
    icon: "Sprout",
    category: "Role-Specific",
    estimatedTime: "40 min",
    roles: ["technician"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "wt1",
        title: "When Weed Treatments Should Be Applied",
        duration: "12 min",
        content:
          "Not every weed problem should be treated immediately. Consider timing, growth stage, weather and lawn condition.\n\n**Check:**\n- Is the weed actively growing?\n- Are temperature and rainfall conditions suitable?\n- Is the lawn too stressed for treatment?\n\nApplying at the wrong time wastes product and weakens results.",
      },
      {
        id: "wt2",
        title: "Targeting Broadleaf Weeds and Common Scenarios",
        duration: "14 min",
        content:
          "Technicians should recognise common broadleaf weed situations and understand the likely route to control.\n\nLook for:\n- Patchy infestation versus whole-lawn pressure\n- Competition from moss or thin turf\n- Customer expectations about speed of visible results\n\nTreatment advice should stay realistic and supported by notes.",
      },
      {
        id: "wt3",
        title: "Aftercare, Expectations and Revisit Notes",
        duration: "14 min",
        content:
          "Good weed control includes good follow-through.\n\nRecord:\n- What was applied\n- Any weather or site constraints\n- What the customer should expect next\n- Whether a future revisit or follow-up may be needed\n\nThe best treatment record is clear enough for the office or another technician to understand instantly.",
      },
    ],
  },
  {
    id: "pa1-pa6",
    title: "PA1 & PA6 Awareness",
    description: "A guided introduction to the certification, compliance and safe working expectations around spraying work.",
    icon: "ShieldCheck",
    category: "Role-Specific",
    estimatedTime: "35 min",
    roles: ["technician"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "pa1",
        title: "What PA1 and PA6 Cover",
        duration: "12 min",
        content:
          "These qualifications support safe pesticide handling and application. They matter because treatment work carries legal and practical responsibilities.\n\nUnderstand:\n- Product handling basics\n- Safe transport and storage\n- Application controls\n- Record keeping and accountability",
      },
      {
        id: "pa2",
        title: "Working Within Competence",
        duration: "11 min",
        content:
          "No technician should carry out work they are not trained, authorised or equipped to do.\n\n1. Know the limits of your training\n2. Ask before stepping beyond them\n3. Do not improvise with chemicals or equipment\n4. Follow supervisor direction and company process\n\nCompetence is not assumed; it is demonstrated and maintained.",
      },
      {
        id: "pa3",
        title: "Documentation and Compliance Habits",
        duration: "12 min",
        content:
          "Compliance is made up of small reliable habits.\n\n**Keep accurate:**\n- Treatment records\n- Product information\n- Stock and storage checks\n- Incident or spill reports\n\nIf records are weak, the work is weak.",
      },
    ],
  },
  {
    id: "office-call-handling",
    title: "Telephone Call Manners & Front Desk Handling",
    description: "The basics of answering calls well, guiding conversations and giving customers confidence from the first minute.",
    icon: "Phone",
    category: "Role-Specific",
    estimatedTime: "35 min",
    roles: ["office"],
    stage: "role-foundations",
    lessons: [
      {
        id: "oc1",
        title: "Answering Calls Professionally",
        duration: "12 min",
        content:
          "The first ten seconds of a call set the tone.\n\n**Answer with:**\n- A clear greeting\n- The company name\n- A calm, ready-to-help tone\n\nSmile while speaking, slow your pace slightly, and never sound like the customer is interrupting you.",
      },
      {
        id: "oc2",
        title: "Guiding the Conversation",
        duration: "11 min",
        content:
          "Good call handling keeps the customer relaxed while gathering the right information.\n\nAsk for:\n- Name and address\n- The reason for the call\n- Any urgency or deadline\n- Preferred next step\n\nLead the call without sounding scripted or robotic.",
      },
      {
        id: "oc3",
        title: "Transfers, Hold and Call Backs",
        duration: "12 min",
        content:
          "If you need to place someone on hold or transfer them, do it with confidence and context.\n\n1. Explain what you are doing\n2. Give a realistic wait expectation\n3. Return promptly or arrange a clear callback\n4. Pass on all relevant details when transferring\n\nCustomers should never feel dropped between people.",
      },
    ],
  },
  {
    id: "service-assistant",
    title: "Service Assistant, Shared Directory & Call Routing",
    description: "The key office systems used to track customer information, locate resources and route calls correctly.",
    icon: "FileText",
    category: "Role-Specific",
    estimatedTime: "45 min",
    roles: ["office"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "sa1",
        title: "Using Service Assistant Day to Day",
        duration: "15 min",
        content:
          "Service Assistant should become the office team's single source of truth for service-related updates.\n\nUse it to:\n- Review customer history\n- Add clear notes\n- Confirm upcoming work\n- Record actions taken on a call\n\nIf work happens but the system is not updated, the business cannot rely on it.",
      },
      {
        id: "sa2",
        title: "Using the Shared Directory Properly",
        duration: "15 min",
        content:
          "The shared directory helps the team access contacts, files and reference material without reinventing the wheel.\n\n**Best practice:**\n- Use the agreed naming structure\n- Store information in the right place first time\n- Avoid duplicate copies where possible\n- Leave a clear trail for the next person",
      },
      {
        id: "sa3",
        title: "Routing Calls to the Right Person",
        duration: "15 min",
        content:
          "Strong call routing saves time and reduces frustration.\n\nBefore routing, understand:\n- Is this scheduling, billing, treatment advice or a complaint?\n- Does the caller need a manager, office colleague or field follow-up?\n- What context must be passed on?\n\nThe receiving person should not have to start from scratch.",
      },
    ],
  },
  {
    id: "scheduling-routing",
    title: "Scheduling, Rescheduling & Route Coordination",
    description: "How office staff keep the calendar accurate, the routes realistic and customers informed when plans change.",
    icon: "Calendar",
    category: "Role-Specific",
    estimatedTime: "40 min",
    roles: ["office"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "sr1",
        title: "Building a Sensible Schedule",
        duration: "13 min",
        content:
          "A good schedule balances customer expectations, geography, crew capacity and service type.\n\nCheck for:\n- Travel efficiency\n- Suitable service windows\n- Repeat visit spacing\n- Crew skill requirements\n\nAn overfull calendar creates downstream problems for everyone.",
      },
      {
        id: "sr2",
        title: "Weather Calls and Service Changes",
        duration: "13 min",
        content:
          "Rescheduling is part of lawncare operations. Handle it early and clearly.\n\n**When plans change:**\n- Update the system first\n- Inform the customer with a clear reason\n- Give the next likely step or timeframe\n- Alert the relevant internal team members\n\nClarity matters more than perfection when a schedule shifts.",
      },
      {
        id: "sr3",
        title: "Supporting Complex Service Queries",
        duration: "14 min",
        content:
          "Some calls involve route issues, access issues, repeat complaints or service confusion.\n\nDocument:\n- What happened\n- What has already been tried\n- Who needs to act next\n- Any deadlines or customer sensitivity\n\nAdvanced coordination is really disciplined communication under pressure.",
      },
    ],
  },
  {
    id: "lawn-health",
    title: "Lawn Health Basics",
    description: "Shared lawncare knowledge covering grass types, common issues and the seasonal patterns everyone should understand.",
    icon: "Leaf",
    category: "Shared Knowledge",
    estimatedTime: "40 min",
    roles: ["technician", "office"],
    stage: "lawn-knowledge",
    isShared: true,
    lessons: [
      {
        id: "l1",
        title: "Grass Types and What They Mean",
        duration: "14 min",
        content:
          "Knowing the main grass types helps both technicians and office staff make better sense of service needs.\n\n**Understand:**\n- How fine and coarse grasses differ\n- Why growth rate changes through the year\n- Why some lawns hold colour or density better than others\n\nBasic lawn knowledge improves confidence in both field notes and customer conversations.",
      },
      {
        id: "l2",
        title: "Spotting Weeds, Pests and Disease Early",
        duration: "14 min",
        content:
          "Early recognition helps the business respond faster and more accurately.\n\nLook out for:\n- Thinning areas\n- Discolouration patterns\n- Visible weed pressure\n- Insect activity or surface damage\n- Signs that fungal disease may be developing\n\nYou do not always need the final diagnosis immediately, but you should know when something needs escalation.",
      },
      {
        id: "l3",
        title: "Seasonal Lawncare Awareness",
        duration: "12 min",
        content:
          "Customer expectations should line up with the season.\n\n1. Spring brings growth and visible improvement work\n2. Summer can bring stress, drought and slower recovery\n3. Autumn supports renovation and recovery\n4. Winter changes what is realistic and urgent\n\nSeasonal context helps both service teams and office teams explain the 'why' behind our decisions.",
      },
    ],
  },
  {
    id: "weed-control-mastery",
    title: "Weed Control: From Fundamentals to Mastery",
    description:
      "A complete grounding in how weed control actually works — biology, identification, every control method (cultural, mechanical, biological, chemical), herbicide families, application craft, and integrated decision-making. Built for full professional knowledge across the team.",
    icon: "Sprout",
    category: "Shared Knowledge",
    estimatedTime: "2 h 30 min",
    roles: ["technician", "office"],
    stage: "lawn-knowledge",
    isShared: true,
    lessons: [
      {
        id: "wc1",
        title: "What a Weed Actually Is",
        duration: "10 min",
        content:
          "A weed is simply a plant growing where it is not wanted. There is nothing biologically special about a 'weed' — a wildflower in a meadow can become a weed on a customer's lawn.\n\n**Why this matters in practice:**\n- The same plant may need treating on one site and tolerating on another\n- Customer expectations define what counts as acceptable\n- Removing every wild plant is rarely the goal — the goal is a healthy, even, attractive lawn\n\n**Three things make a plant a problem in turf:**\n1. It out-competes the grass for light, water or nutrients\n2. It looks visually disruptive (yellow flowers, broad leaves, bare patches around it)\n3. It spreads quickly if left alone\n\nUnderstanding 'why this is a weed here' is the start of every good treatment decision.",
      },
      {
        id: "wc2",
        title: "How Weeds Live and Spread",
        duration: "12 min",
        content:
          "To control weeds well, you have to know how they survive. Weeds are grouped by their **life cycle**:\n\n**Annuals** — germinate, flower, seed and die in a single year (e.g. annual meadow grass, chickweed). Best controlled before they set seed.\n\n**Biennials** — grow leaves in year one, flower and seed in year two. Hit them in year one while they are still a rosette.\n\n**Perennials** — live for many years and regrow from roots, runners or rhizomes (e.g. dandelion, plantain, clover, creeping buttercup, yarrow). These are the bulk of lawn weeds and the hardest to kill, because cutting the top off does nothing if the root survives.\n\n**How they spread:**\n- **Seed** — wind, mowers, shoes, birds, soil disturbance\n- **Stolons** (above-ground runners) — clover, creeping buttercup\n- **Rhizomes** (underground stems) — couch grass, yarrow\n- **Tap roots** — dandelion, dock — break the root and you get two plants\n- **Bulbils / corms** — lesser celandine, oxalis\n\n**The seed bank rule:** every soil contains thousands of dormant weed seeds per square metre. You are never 'clearing' the seed bank — you are managing what germinates.",
      },
      {
        id: "wc3",
        title: "Identifying the Common UK Lawn Weeds",
        duration: "15 min",
        content:
          "Accurate ID drives the right treatment. Get into the habit of naming what you see before deciding what to do.\n\n**Broadleaf perennials (most common in lawns):**\n- **Dandelion** — deep tap root, jagged leaves, yellow flower, parachute seeds\n- **Daisy** — small rosettes, white-petal flower, spreads by short runners\n- **Plantain** (greater & ribwort) — flat ribbed leaves, very tough\n- **White clover** — three-leaf trefoil, white flower, fixes its own nitrogen so thrives in poor lawns\n- **Creeping buttercup** — glossy lobed leaves, runners, loves wet compacted ground\n- **Self-heal** — low purple flower spikes, mat-forming\n- **Yarrow** — feathery leaves, drought-tolerant, hard to kill\n- **Speedwell** (several species) — tiny blue flowers, mat-forming, notoriously herbicide-resistant\n- **Mouse-ear chickweed** — hairy small leaves, low rosettes\n\n**Grass weeds (much harder to control selectively):**\n- **Annual meadow grass (Poa annua)** — pale, seeds at very low height, almost universal\n- **Yorkshire fog** — soft, hairy, grey-green tufts\n- **Couch grass** — coarse blades, aggressive rhizomes\n\n**Moss** — not a weed in the herbicide sense, but treated as one. A symptom of shade, wet, low fertility, scalping or compaction.\n\n**Field tip:** photograph anything you cannot ID and check before treating. Treating the wrong target wastes product and can damage the lawn.",
      },
      {
        id: "wc4",
        title: "Why Weeds Appear — The Real Root Causes",
        duration: "10 min",
        content:
          "Spraying without fixing the cause means the same weeds return every season. Always ask: **why is this lawn vulnerable?**\n\n**Common underlying causes:**\n- **Thin or sparse grass** — bare soil is an invitation; weed seeds need light to germinate\n- **Low fertility** — clover and yarrow thrive where grass is starved of nitrogen\n- **Compaction** — plantain, buttercup, annual meadow grass love hard ground\n- **Poor drainage / wet soil** — moss, buttercup, sedges\n- **Scalping (mowing too short)** — weakens grass, lets low-growing weeds (speedwell, daisy) take over\n- **Shade** — moss and woodland weeds dominate\n- **Acidic or alkaline pH extremes** — stress the grass, favour certain weeds\n- **Recent disturbance** — new turf, scarification or aeration brings buried seeds to the surface\n\n**The professional mindset:** weed control + lawn improvement always go together. Treatment kills what is there now; **dense healthy grass** is what stops the next wave.",
      },
      {
        id: "wc5",
        title: "Integrated Weed Management — The Big Picture",
        duration: "12 min",
        content:
          "Integrated Weed Management (IWM) is the professional standard. It means combining several methods so you rely less on any one of them — especially less on chemicals.\n\n**The four pillars:**\n\n1. **Cultural control** — mowing height, feeding, watering, overseeding, aeration, scarification. Strong grass crowds weeds out.\n2. **Mechanical / physical control** — hand-pulling, hoeing, removing seed heads before they ripen.\n3. **Biological control** — encouraging natural competition; in turf this mostly means letting grass species themselves out-compete weeds.\n4. **Chemical control** — selective herbicides used precisely when other methods are not enough.\n\n**Why IWM matters:**\n- Reduces herbicide resistance (yes, lawn weeds are developing it)\n- Reduces chemical load on the environment\n- Produces longer-lasting results\n- Protects customer trust — they see steady improvement, not a chemical-dependent lawn\n\nA technician who reaches for the sprayer first every time is not yet a professional. A technician who diagnoses, plans cultural fixes, and uses chemicals as one tool among several — that is professional weed control.",
      },
      {
        id: "wc6",
        title: "Cultural Control — The Most Powerful Tool You Have",
        duration: "12 min",
        content:
          "Cultural control means changing how the lawn is managed so the grass wins on its own. It is unglamorous, slow, and the single most effective long-term weed control method.\n\n**Mowing height** — most UK lawns should be cut at 25–40 mm. Cutting shorter scalps the grass, lets light reach weed seeds, and favours low creeping weeds. Raising the mow height is often the single biggest improvement.\n\n**Mowing frequency** — never remove more than one third of the leaf in a single cut. Regular light cuts strengthen grass; infrequent heavy cuts weaken it.\n\n**Feeding** — a balanced fertiliser programme (typically spring, summer, autumn) thickens the sward. Clover and yarrow noticeably retreat once nitrogen is restored.\n\n**Watering** — deep, infrequent watering encourages deep grass roots. Light frequent watering favours shallow-rooted weeds.\n\n**Overseeding** — fills gaps before weeds can. Always pair renovation work (scarification, aeration) with overseeding.\n\n**Aeration** — relieves compaction so grass roots can breathe; weeds that thrive on compaction lose their advantage.\n\n**Scarification** — removes thatch and moss, opens the sward; must be followed by overseeding or you simply create germination beds for new weeds.\n\n**The cultural control rule:** every weed treatment job should be paired with at least one cultural recommendation. Without it, you are treating symptoms.",
      },
      {
        id: "wc7",
        title: "Mechanical & Manual Control",
        duration: "10 min",
        content:
          "For small infestations, isolated weeds, or sensitive sites where chemicals are unsuitable, physical removal is often the right call.\n\n**Hand-pulling / weeding knife:**\n- Best for tap-rooted weeds (dandelion, dock, plantain) when soil is moist\n- You must remove the **whole** root — broken tap roots regenerate\n- Refill the hole with soil and overseed, or you have just created a perfect spot for the next weed\n\n**Daisy grubber / weed puller tools:**\n- Work well in soft moist ground\n- Less effective on mat-forming weeds (speedwell, clover, yarrow)\n\n**De-heading / removing seed heads:**\n- Crucial for annuals (annual meadow grass, chickweed) — stop them setting seed and you break next year's cycle\n- Mowing before flowering achieves the same result for many species\n\n**When mechanical control is the right choice:**\n- Customer prefers a chemical-free approach\n- Edges, ornamental beds, near ponds, near edible plants\n- Very small infestations where spraying would be excessive\n- Schools, nurseries, or sites with restricted access for treated areas\n\n**Limitations:** labour-intensive, ineffective against mat-formers and rhizomatous weeds, and useless on heavy infestations. Know when to switch tools.",
      },
      {
        id: "wc8",
        title: "Chemical Control — How Herbicides Actually Work",
        duration: "15 min",
        content:
          "Herbicides are not all the same. Choosing the right one depends on understanding **how** it acts.\n\n**By selectivity:**\n- **Selective** — kills certain plants while leaving others (e.g. broadleaf weed killers leave grass alive). The bulk of lawn herbicides are selective.\n- **Non-selective / total** — kills everything green (e.g. glyphosate). Used for path edges, full lawn renovation, never on a lawn you intend to keep.\n\n**By movement in the plant:**\n- **Systemic** — absorbed and moved through the plant, killing roots as well as leaves. Slower visible result (1–3 weeks) but kills the whole weed. Essential for perennials.\n- **Contact** — kills only the tissue it touches. Fast visible result but the weed often regrows from the root. Limited use in lawns.\n\n**By timing:**\n- **Pre-emergent** — applied before weed seeds germinate; forms a barrier in the surface soil. Used for annual weeds (e.g. annual meadow grass).\n- **Post-emergent** — applied to growing weeds. The vast majority of lawn weed control is post-emergent.\n\n**Common selective lawn herbicide active ingredients (UK):**\n- **2,4-D**, **MCPA**, **dicamba**, **mecoprop-P**, **fluroxypyr**, **clopyralid**, **florasulam** — almost always sold as combination products because no single active controls every broadleaf weed well.\n\n**The combination rule:** mixed actives cover a wider spectrum (clover + dandelion + speedwell + buttercup) and reduce resistance pressure. This is why professional lawn weedkillers contain 2–4 actives.\n\n**Mode of action matters because:** the same weed treated repeatedly with the same active will eventually resist it. Rotating chemistry is part of professional practice.",
      },
      {
        id: "wc9",
        title: "Application Methods and When to Use Each",
        duration: "12 min",
        content:
          "Choosing **how** to apply is as important as choosing **what** to apply.\n\n**Knapsack / pressure sprayer (PA6 territory)**\n- Most common method for lawn weed control\n- Even coverage across larger areas\n- Requires calibration, correct nozzle, steady walking pace\n- Best for whole-lawn or large-patch treatments\n\n**Spot spraying (handheld trigger sprayer)**\n- Targets individual weeds or small clusters\n- Massively reduces total chemical use\n- Ideal for isolated dandelions, scattered plantains, edges\n- Slower per-weed but efficient where weed pressure is light\n\n**Weed wiping**\n- Herbicide applied via a wick or sponge directly to the weed\n- Excellent where weeds stand taller than the grass (docks, tall thistles)\n- Almost zero off-target risk\n- Slow, but very precise\n\n**Granular feed-and-weed**\n- Fertiliser combined with herbicide in granule form\n- Applied by spreader; activated by moisture on weed leaves (apply when leaves are damp, lawn is dry underfoot)\n- Convenient but less precise than liquid spraying\n- Good for general broadleaf pressure across a healthy lawn\n\n**Choosing the right method:**\n- Whole lawn, even pressure → knapsack\n- Scattered weeds → spot spray\n- Tall weeds among short grass → wiper\n- Combined feed cycle → granular\n- Edges near beds, ponds, paths → spot spray or wiper, never broadcast\n\n**The professional habit:** match the method to the weed pressure, not to convenience.",
      },
      {
        id: "wc10",
        title: "Conditions, Timing and Calibration",
        duration: "12 min",
        content:
          "Even the right product applied the wrong way will fail. The conditions of application decide the result.\n\n**Weather window for liquid herbicides:**\n- Air temperature ideally **10–20°C**; below 8°C uptake is poor, above 25°C risks scorch and volatility\n- **No rain forecast for 6 hours** (some products need 12–24 hours rain-free) — check the label\n- **Low wind** (under ~10 mph / Beaufort 3) to prevent drift\n- **Dry leaves** at application — wet leaves dilute the spray\n- Avoid **drought-stressed lawns** — weeds are not actively growing, uptake fails\n\n**Best season:**\n- **Spring (April–June)** and **early autumn (September)** are the prime windows — weeds are actively growing, lawn can recover\n- Mid-summer drought, late autumn cold, and frost periods are poor windows\n\n**Cutting before/after:**\n- Do **not mow 3–4 days before** treatment — leaves need surface area to absorb\n- Do **not mow 3–4 days after** — gives the systemic herbicide time to translocate to the roots\n\n**Calibration (knapsack):**\n1. Measure a 10 m × 1 m strip\n2. Time how long it takes you to walk the strip at your normal spraying pace\n3. Spray water into a measuring jug for the same time at the same pressure\n4. Multiply up to find litres per 100 m² — compare against the label rate\n5. Adjust nozzle, pressure or pace until output matches label\n\n**Under-applying** wastes the visit and breeds resistance. **Over-applying** scorches the lawn, breaches label rules, and is illegal under PPP regulations.",
      },
      {
        id: "wc11",
        title: "Specific Weeds, Specific Strategies",
        duration: "13 min",
        content:
          "Different weeds need different approaches. A few worked examples:\n\n**Dandelion** — deep tap root. Systemic selective herbicide in spring or early autumn while in active leaf. Spot spray is usually enough. Hand-pulling works only if the entire root comes out.\n\n**Daisy** — shallow rooted but spreads by runners. Responds well to standard selective herbicides; usually controlled inside one or two applications. Raise mowing height to discourage return.\n\n**White clover** — nitrogen-fixing, thrives in under-fed lawns. Treat with a clover-active herbicide (fluroxypyr or florasulam-containing products). **Crucially: feed the lawn at the same time** — without nitrogen, clover comes straight back.\n\n**Speedwell** — notoriously resistant. Often needs repeat treatments and a combination product including fluroxypyr. Cultural improvement (raise mowing height, thicken sward) is essential.\n\n**Yarrow** — drought-tolerant, deep-rooted, resists many herbicides. Often needs two or three treatments through the growing season plus aggressive overseeding to crowd it out.\n\n**Creeping buttercup** — symptom of wet, compacted ground. Selective herbicide will knock it back, but **aeration and drainage improvement** is what stops it returning.\n\n**Plantain** — easy kill with most selective broadleaf products. Aerate to address the compaction it loves.\n\n**Annual meadow grass (Poa annua)** — no truly selective control in amenity lawns. Manage culturally: avoid scalping, avoid over-watering, overseed competitively, and accept some presence.\n\n**Moss** — not a herbicide problem; it is an environmental problem. Iron sulphate (lawn sand or liquid iron) blackens it, then it must be physically scarified out, **followed by overseeding** and addressing the cause (shade, drainage, fertility, mowing height).\n\n**The pattern:** for every weed, the question is *kill the plant + fix the conditions*. Doing only one is half the job.",
      },
      {
        id: "wc12",
        title: "Safety, Compliance and Record Keeping",
        duration: "12 min",
        content:
          "Professional weed control is a regulated activity. Cutting corners here is not just unsafe — it is illegal.\n\n**Certification (UK):**\n- **PA1** — Foundation: safe use of pesticides (the underpinning theory)\n- **PA6** — Handheld applicators (knapsack and handheld sprayers — what most lawn techs use)\n- Required for anyone born after 31 December 1964 applying professional plant protection products\n- Spraying without certification on customer property is an offence under the Plant Protection Products (Sustainable Use) Regulations\n\n**Only use approved professional products:**\n- Every product must have a current UK approval and an MAPP / HSE registration number\n- Always read the label — it is a legal document, not a suggestion\n- Use only at the approved rate, on the approved crop (turf / amenity grass), in the approved way\n\n**PPE for spraying:**\n- Coveralls or chemical-resistant overalls\n- Nitrile gloves (not standard rubber)\n- Eye protection / face shield when mixing\n- Sturdy boots\n- Respirator if the label specifies\n\n**Mixing and storage:**\n- Mix in a designated area, away from drains, watercourses and food\n- Use a clean dedicated measuring jug\n- Never decant into unmarked containers\n- Lock chemicals away; keep an up-to-date inventory\n\n**Record keeping (legally required, kept for 3 years):**\n- Date and time of application\n- Product name and MAPP number\n- Active ingredient and rate applied\n- Area treated and total quantity used\n- Operator name and certification number\n- Weather conditions (temp, wind, rain forecast)\n- Crop / target weed\n\n**Spill response:**\n- Contain immediately with absorbent (sand, spill kit)\n- Never wash into a drain or watercourse\n- Report any significant spill internally and, if applicable, to the Environment Agency\n\n**The professional standard:** if you cannot show the record, the work did not happen.",
      },
      {
        id: "wc13",
        title: "Diagnosing Failure — Why a Treatment Didn't Work",
        duration: "10 min",
        content:
          "Not every treatment delivers a clean result. Knowing why is what separates a competent technician from an excellent one.\n\n**If weeds are still standing after 4 weeks, work through this checklist:**\n\n1. **Was it actively growing?** Drought stress, frost, or dormancy stops uptake. Re-treat when the weed resumes growth.\n2. **Was the right product used for the species?** Speedwell, yarrow, clover all need specific actives. A generic broadleaf product may not touch them.\n3. **Was the rate correct?** Under-dosing is the single most common cause of failure. Re-check calibration.\n4. **Did rain wash it off?** If rain fell within the rain-fast window, the application failed — re-treat.\n5. **Was it mown too soon before or after?** Removed leaf surface = reduced uptake.\n6. **Coverage gaps?** Walking too fast, blocked nozzle, low pressure — patches of weed left untreated.\n7. **Resistance?** If the same active has been used repeatedly on the same lawn, switch chemistry next time.\n8. **Wrong ID?** Re-examine the weed. Sedges and grass weeds will not respond to broadleaf herbicides at all.\n\n**For perennials specifically:**\n- A single treatment rarely eliminates a deep-rooted perennial. Two or three treatments across a season is normal.\n- Set this expectation with the customer **before** the first visit. Under-promise, over-deliver.\n\n**Communication on revisits:**\n- Document what was treated, when, with what, and why\n- Note environmental conditions\n- Record what the next step is and the expected timeframe\n\nA professional treatment report tells the next visitor — or the office — exactly what happened, why, and what to do next. That is the level of weed control knowledge we are working towards.",
      },
    ],
  },
];
