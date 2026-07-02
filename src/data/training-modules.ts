export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  section?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface Quiz {
  questions: QuizQuestion[];
  passMark: number;
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
  emoji?: string;
  category: string;
  estimatedTime: string;
  roles: TrainingRoleId[];
  stage: TrainingStageId;
  isShared?: boolean;
  lessons: Lesson[];
  quiz?: Quiz;
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
        description: "Learn what we do, who we are, and the service standards every Shrekfeet employee follows from day one.",
        navLabel: "Stage 1 · Basics",
      },
      {
        id: "role-foundations",
        label: "Stage 2 · Lawncare Foundations",
        description: "Build your understanding of grass, thatch, soil and safe site practices \u2014 the knowledge base for everything that follows.",
        navLabel: "Stage 2 · Foundations",
      },
      {
        id: "systems-workflows",
        label: "Stage 3 · Products & Treatment",
        description: "Learn our fertiliser products, pesticide categories, treatment programme structure and operational workflows.",
        navLabel: "Stage 3 · Treatment",
      },
      {
        id: "advanced-operations",
        label: "Stage 4 \u00B7 Field Operations",
        description: "Master day-to-day operational standards, weed treatment workflows, PA certification awareness and professional service delivery at the doorstep.",
        navLabel: "Stage 4 \u00B7 Operations",
      },
      {
        id: "diagnostic-foundations",
        label: "Stage 5 \u00B7 Diagnostic Foundations",
        description: "Build the applied science knowledge that underpins excellent diagnosis \u2014 nutrients, soil biology, drought physiology and weed science.",
        navLabel: "Stage 5 \u00B7 Diagnostics",
      },
      {
        id: "specialist-knowledge",
        label: "Stage 6 \u00B7 Specialist Knowledge",
        description: "Advanced expertise in lawn diseases, herbicide application, weed control mastery and the plant science behind yellowing and drought stress.",
        navLabel: "Stage 6 \u00B7 Specialist",
      },
      {
        id: "lawn-knowledge",
        label: "Stage 7 \u00B7 Deep Lawn Science",
        description: "The deepest layer of lawncare science \u2014 soil chemistry, plant nutrition in depth, soil biology, mycorrhizal networks and advanced grass structure.",
        navLabel: "Stage 7 \u00B7 Deep Science",
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
        label: "Stage 2 · Lawncare Foundations",
        description: "Understand enough about grass, soil and treatments to handle customer queries and explain our services with confidence.",
        navLabel: "Stage 2 · Foundations",
      },
      {
        id: "systems-workflows",
        label: "Stage 3 · Treatment Programmes",
        description: "Learn the treatment plan structure, seasonal timeline and what each service code means \u2014 essential for scheduling and customer calls.",
        navLabel: "Stage 3 · Programmes",
      },
      {
        id: "advanced-operations",
        label: "Stage 4 \u00B7 Operational Standards",
        description: "Handle complex routing, service changes, complaint escalation and cross-team coordination with confidence.",
        navLabel: "Stage 4 \u00B7 Operations",
      },
      {
        id: "diagnostic-foundations",
        label: "Stage 5 \u00B7 Lawncare Science",
        description: "Build enough applied science knowledge to support customer calls about nutrients, drought, and lawn health.",
        navLabel: "Stage 5 \u00B7 Science",
      },
      {
        id: "specialist-knowledge",
        label: "Stage 6 \u00B7 Specialist Knowledge",
        description: "Deeper expertise in diseases, weed control and advanced lawn conditions \u2014 supports complex customer conversations.",
        navLabel: "Stage 6 \u00B7 Specialist",
      },
      {
        id: "lawn-knowledge",
        label: "Stage 7 \u00B7 Deep Lawn Science",
        description: "The full science curriculum \u2014 for office staff who want the deepest possible understanding of what the field team is doing.",
        navLabel: "Stage 7 \u00B7 Deep Science",
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
  // ─── STAGE 1: COMPANY BASICS ───────────────────────────────────────────────
  {
    id: "company-basics",
    title: "How Shrekfeet Works",
    description: "Who we are, how the team is structured, what's expected from day one, and how work flows through the business.",
    icon: "BookOpen",
    emoji: "⚙️",
    category: "Shared Foundations",
    estimatedTime: "30 min",
    roles: ["technician", "office"],
    stage: "company-basics",
    isShared: true,
    lessons: [
      {
        id: "cb1",
        title: "The Team and Who Does What",
        duration: "10 min",
        content:
          "Shrekfeet is an independent lawn treatment company servicing domestic customers across our regional patch. We sit between the big national franchises and one-man-band operators \u2014 professional kit and qualifications, with the personal service of a local team.\n\n**The leadership team:**\n- Ian Kenyon \u2014 Managing Director. Responsible for the overall direction, finances, marketing and growth of the business.\n- Harry White \u2014 Operations Manager. Your direct line manager if you're a technician. Responsible for van/technical issues, equipment failure, product stock, holiday and working hours, 121s, customer reviews, customer satisfaction, HR reporting, performance, development, new sales leads and salary reviews.\n- Joseph Chavoshi-Nasab \u2014 Customer Experience Manager. Leads customer scheduling, communications and satisfaction tracking.\n- Paul Scorey \u2014 Business Development. Handles new customer onboarding, initial lawn surveys and estimate follow-ups.\n\n**Day-to-day escalation:**\n- Operational issues → Harry White\n- Scheduling and customer queries → Joseph/the office team\n- Business or financial matters → Ian Kenyon\n\nKnowing who to go to matters. Don't sit on a problem \u2014 the right person can usually fix it the same day.",
      },
      {
        id: "cb2",
        title: "Our Standards and Culture",
        duration: "10 min",
        content:
          "We operate as a tight team. The standards below are non-negotiable and apply to everyone regardless of role or experience.\n\n**What we expect from everyone:**\n- Punctual: ready and working by your agreed start time.\n- Presentable: clean uniform, ID badge visible, vehicle tidy.\n- Honest: if you've made a mistake, tell the team the same day. We can fix mistakes; we can't fix cover-ups.\n- Proactive: don't wait to be asked. If you can see a problem forming, flag it early.\n- Customer-first: if a customer is unhappy, listen first, fix what you can, escalate the rest.\n\n**On dishonesty:**\nWe take misconduct seriously. We expect the same from everyone we hire. If we tolerate poor behaviour, we lose good people and good customers. The culture of this team is set by the standards we hold each other to \u2014 that starts with you.\n\n**On communication:**\nCommunication is king at Shrekfeet. Always cover what the other person is about to ask before they need to ask it. If something has gone wrong, don't wait for someone to notice \u2014 tell them.",
      },
      {
        id: "cb3",
        title: "How Work Moves Through the Business",
        duration: "10 min",
        content:
          "From the first customer contact to service completion, every step should feel joined up. Here's how work flows:\n\n1. Paul onboards a new customer \u2014 lawn survey, AutoPay setup, SA5 account created.\n2. Joseph builds the schedule \u2014 routes, job timing, technician assignment.\n3. The technician carries out the treatment, logs notes and condition codes in SA5, raises any flags or estimates.\n4. The office reviews call logs, follows up on estimates, handles callbacks and reschedules.\n5. Harry oversees performance, reviews, HR and equipment supply.\n\n**The key principle:** every person in the chain needs accurate information to do their job well. Incomplete notes, missed call logs and unclosed estimates create work for someone else down the line.\n\n**Service Assistant 5 (SA5)** is our job management system \u2014 built on the RealGreen platform. Every customer, every visit, every note lives in SA5. If it happened but it's not in SA5, it didn't happen as far as the business is concerned.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "cb-q1",
          question: "Who is responsible for van issues, equipment failure, stock, holidays and technician performance?",
          options: ["Ian Kenyon", "Harry White", "Joseph Chavoshi-Nasab", "Paul Scorey"],
          correct: 1,
          explanation: "Harry White is the Operations Manager and is the direct line manager for technicians, covering all operational and HR matters.",
        },
        {
          id: "cb-q2",
          question: "If you arrive late, make a mistake or notice a problem forming \u2014 what is the expected behaviour?",
          options: [
            "Wait to see if anyone notices before raising it",
            "Flag it to a colleague and let them decide",
            "Communicate proactively and the same day \u2014 don't sit on it",
            "Write it in your personal notes for the next review",
          ],
          correct: 2,
          explanation: "Proactive communication is a core Shrekfeet standard. Flag problems early \u2014 we can fix mistakes, but we can't fix cover-ups.",
        },
        {
          id: "cb-q3",
          question: "What is Service Assistant 5 (SA5) used for?",
          options: [
            "Clocking in and out of shifts",
            "Job management \u2014 every customer, visit, note and condition code",
            "Van maintenance scheduling only",
            "Ordering stock and products",
          ],
          correct: 1,
          explanation: "SA5 (built on RealGreen) is the central job management system. Every customer record, visit, note and condition code lives there.",
        },
        {
          id: "cb-q4",
          question: "Who handles new customer onboarding, initial lawn surveys and estimate follow-ups?",
          options: ["Harry White", "Ian Kenyon", "Paul Scorey", "Joseph Chavoshi-Nasab"],
          correct: 2,
          explanation: "Paul Scorey handles business development \u2014 new customer onboarding, lawn surveys and closing estimates.",
        },
      ],
    },
  },
  {
    id: "customer-service",
    title: "Customer Communication Standards",
    description: "The shared tone, behaviours and communication habits expected from every Shrekfeet employee.",
    icon: "Users",
    emoji: "💬",
    category: "Shared Foundations",
    estimatedTime: "30 min",
    roles: ["technician", "office"],
    stage: "company-basics",
    isShared: true,
    lessons: [
      {
        id: "cc1",
        title: "Why Customers Stay (and Why They Leave)",
        duration: "10 min",
        content:
          "Understanding why customers cancel is as important as understanding what we sell. The research is consistent: customers leave when they feel undervalued or ignored \u2014 not because of a single bad treatment.\n\n**The most common reasons customers cancel:**\n- Lack of communication or feeling out of the loop\n- Complicated processes or long wait times for resolutions\n- Inconsistency \u2014 different quality or approach each visit\n- Hidden fees or unclear policies\n- Feeling like just an account number, not a person\n\n**What keeps them:**\n- Personalised service \u2014 knowing their name, their lawn, their concerns\n- Quick and effective resolution when something goes wrong\n- Consistent quality on every visit\n- Proactive updates before they need to ask\n\n**Your role in retention:**\nEvery customer interaction \u2014 a call, a doorstep conversation, a treatment note \u2014 either adds to or subtracts from the customer's confidence in us. Retention is not just a management responsibility. It starts with every employee on every visit.",
      },
      {
        id: "cc2",
        title: "The FAB Framework and Selling with Logic",
        duration: "10 min",
        content:
          "When recommending additional services \u2014 whether on a doorstep or over the phone \u2014 use the FAB framework:\n\n**Feature:** what the service does (mechanically)\n**Advantage:** why that matters for this lawn\n**Benefit:** what the customer actually gains\n\n**Example \u2014 recommending a One-Time Moss Treatment:**\n- Feature: 'This product dehydrates the moss, turning it black within an hour.'\n- Advantage: 'Once dry, the moss is much easier to rake out. It won't smother the grass.'\n- Benefit: 'Your grass will have space to spread and fill in, giving you a denser, healthier lawn.'\n\n**Waterproofing the sale:**\nAlways explain what the customer will see happen \u2014 especially if it looks alarming. Moss going black after treatment surprises customers who weren't warned. A customer who calls in concerned is a retention risk. A customer who was told what to expect calls to say thank you.\n\n**The key question:** 'Can you see how that will benefit your lawn?' \u2014 invites them to confirm understanding, not just passive agreement.\n\n**If they nod, they understand. If they understand, they are more likely to say yes. And if the lawn looks better, they stay.**",
      },
      {
        id: "cc3",
        title: "Professional Language and Logging",
        duration: "10 min",
        content:
          "Customers remember how we make them feel. Keep communication calm, friendly and direct.\n\n**Do:**\n- Use the customer's name (it's in SA5 as soon as you've located their account)\n- Speak clearly and respectfully\n- Confirm the next step before ending any conversation\n- Log every customer interaction with specific notes\n\n**Do not:**\n- Sound rushed or dismissive\n- Over-promise outcomes or specific timelines you can't guarantee\n- Guess when you're unsure \u2014 escalate instead\n\n**Note quality matters:**\nInclude what was discussed, what was promised, any dates or constraints, and what follow-up is outstanding. Short, factual notes are better than long vague ones. The next person to open that account should be able to pick up exactly where you left off.\n\n**Remember:** when a customer visits ends with 'What happens next?', always give them a clear answer. 'I'll log this and someone will contact you by Thursday' is infinitely better than 'we'll be in touch.'",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "cs-q1",
          question: "What is the FAB framework used for?",
          options: [
            "Filling out the accident book",
            "Structuring service recommendations (Feature, Advantage, Benefit)",
            "Managing customer complaints by escalation priority",
            "Calculating fertiliser application rates",
          ],
          correct: 1,
          explanation: "FAB (Feature, Advantage, Benefit) is the framework for recommending additional services in a logical, customer-friendly way.",
        },
        {
          id: "cs-q2",
          question: "A customer was not warned that moss goes black after treatment. They call the office concerned. What is this an example of?",
          options: [
            "A product defect that needs escalating",
            "Failing to 'waterproof the sale' \u2014 not explaining what the customer would see",
            "Normal customer behaviour that doesn't need addressing",
            "A scheduling error by the office team",
          ],
          correct: 1,
          explanation: "Waterproofing the sale means explaining upfront what will happen \u2014 especially anything that might look alarming. This prevents surprise calls and builds trust.",
        },
        {
          id: "cs-q3",
          question: "What is the most common reason customers cancel their lawn treatment plan?",
          options: [
            "Price increases",
            "A single bad treatment result",
            "Feeling undervalued or ignored \u2014 lack of communication and consistency",
            "Not understanding what they signed up for",
          ],
          correct: 2,
          explanation: "Research consistently shows customers leave when they feel undervalued or ignored \u2014 not usually because of one bad outcome. Communication and consistency are the biggest drivers of retention.",
        },
      ],
    },
  },

  // ─── STAGE 2: ROLE FOUNDATIONS ─────────────────────────────────────────────
  {
    id: "grass-thatch-soil",
    title: "Grass, Thatch & Soil",
    description: "The biological foundation of lawn treatment \u2014 grass anatomy, germination, the main UK grass families, thatch management and core soil types.",
    icon: "Leaf",
    emoji: "🌱",
    category: "Shared Foundations",
    estimatedTime: "65 min",
    roles: ["technician", "office"],
    stage: "role-foundations",
    isShared: true,
    lessons: [
      {
        id: "gts-anatomy",
        title: "Grass Anatomy \u2014 How the Plant Is Built",
        section: "Grass",
        duration: "8 min",
        content:
          "Before you can diagnose a lawn, you need to understand how a grass plant is structured. Every part of the plant has a specific function \u2014 and knowing which parts are vulnerable, and which are resilient, directly influences how you treat.\n\n**The key parts of a grass plant:**\n\n**Roots**\nAnchor the plant and absorb water and nutrients from the soil. Shallow root systems are a sign of stress \u2014 shallow-rooted lawns are the first to suffer in drought. Compaction, thatch and waterlogging all restrict root depth.\n\n**Crown**\nThe most important part of the plant. This is the growth point, located just above soil level, where new leaves emerge. Damage to the crown kills the plant. This is why scalping (mowing too short) is so damaging \u2014 you risk cutting into or exposing the crown.\n\n**Stem (culm)**\nThe short stem that supports the leaf structure. In turf grasses, the stem is usually very compressed \u2014 most of the visible plant is leaf.\n\n**Leaf blade**\nThe visible, green part of the plant. Photosynthesis happens here. When we assess a lawn, we're largely assessing the health of the leaf blade \u2014 its colour, density, and condition.\n\n**Stolons**\nAbove-ground horizontal runners that spread the plant across the soil surface. Creeping red fescue and bent grass spread via stolons \u2014 they can 'fill in' thin patches naturally if the crown isn't damaged.\n\n**Rhizomes**\nBelow-ground horizontal stems that allow the plant to spread underground. Some species (smooth-stalked meadow grass / Poa pratensis) spread via rhizomes, giving the sward a tight, mat-like quality.\n\n**Why anatomy matters in practice:**\n- A lawn with shallow roots is drought-vulnerable \u2014 aeration and correct watering advice helps\n- Scalping exposes or damages the crown \u2014 a common cause of bare patches\n- Stoloniferous grasses can self-repair thin areas \u2014 useful to know when advising on renovation\n- Understanding leaf density helps explain why fine fescues feel different underfoot to ryegrass lawns",
      },
      {
        id: "gts-germination",
        title: "Germination & Establishment \u2014 Why Timing Matters",
        section: "Grass",
        duration: "8 min",
        content:
          "Two terms you'll hear constantly when seeding work is involved: germination and establishment. They are not the same thing \u2014 and confusing them can lead to costly mistakes.\n\n**Germination**\nGermination is when the seed sprouts and the first shoot breaks through the soil surface. It requires:\n- Soil temperature above ~8°C (most UK grass species)\n- Consistent moisture at the seed surface\n- Good seed-to-soil contact \u2014 seeds need to touch the soil to absorb moisture\n\nTypical germination times at the right conditions:\n- Perennial ryegrass: 7–10 days\n- Fine fescues: 10–14 days\n- Bent grass: 14–21 days\n\n**Establishment**\nEstablishment is when the plant has developed sufficient root depth and leaf area to tolerate foot traffic and \u2014 critically \u2014 treatments. This takes considerably longer than germination.\n- Minimum time before weed control can be applied: **42–56 days after germination**\n- The seedlings must have been mown at least 2–3 times before herbicide is considered\n\n**Why this matters on a job:**\nApplying weed control too early \u2014 before the grass is established \u2014 will damage or kill the seedlings. If a customer has had overseeding (OVS) carried out, their account will flag this. In SA5, if OVS has been accepted, the SPN treatment switches to SPW (weed control delayed until establishment is confirmed).\n\n**Ideal seeding windows in the UK:**\n- **Autumn (September–October):** best overall \u2014 warm soil, cooler air, less competition from weeds and less drought risk\n- **Spring (March–April):** acceptable \u2014 soil warming but weed pressure rises as the season progresses\n- **Summer:** not recommended \u2014 drought risk before establishment is high\n- **Winter:** not recommended \u2014 soil too cold for reliable germination\n\n**Seed-to-soil contact:**\nThe single most common reason for poor germination is poor seed-to-soil contact. After overseeding, lightly raking or top-dressing beds the seed into the surface. A roller can also help. Without contact, the seed sits in the air, dries out and fails to germinate.",
      },
      {
        id: "gts-fescues",
        title: "Fine Fescues \u2014 Festuca",
        section: "Grass",
        duration: "8 min",
        content:
          "Fine fescues are the most shade-tolerant and drought-resistant of the three main UK lawn grass families. They're found in ornamental lawns, older domestic lawns and areas where the conditions suit a finer-textured sward.\n\n## Key characteristics\n- Very fine, narrow leaf blade \u2014 gives a dense, soft appearance\n- Low to moderate nitrogen requirement \u2014 doesn't need heavy feeding\n- Slow to establish but long-lived once in\n- Performs best at lower mowing heights (25\u201440mm)\n- Spreads via both tillers and, in some species (creeping red fescue), via stolons\n\n## Creeping red fescue (Festuca rubra)\n\nThe most common fine fescue in domestic lawns. Found in the vast majority of UK domestic lawn seed mixes. Spreads via stolons, giving excellent self-repair ability.\n\n### How to identify\n- Very fine, hair-like leaves \u2014 rolled in cross-section (circular, not flat like ryegrass)\n- Mid-green, sometimes with a slight blue-grey tinge\n- Spreads via stolons \u2014 short horizontal runners visible on the soil surface\n- In a mixed sward: look for patches that feel noticeably denser and finer than surrounding ryegrass\n- Seed head: loose, nodding panicle\n\n### Uses\n- Core component of domestic lawn seed mixes\n- Excellent for shaded, dry or low-maintenance areas\n- Self-repairing \u2014 fills thin patches via stolon spread\n- Tolerates lower mowing heights than ryegrass\n\n## Slender vs Strong creeping red fescue\n\nCreeping red fescue has two main subspecies that look nearly identical but behave quite differently. This distinction matters when specifying seed mixes or explaining why a lawn spreads aggressively.\n\n**Slender creeping red fescue (Festuca rubra subsp. litoralis)**\n- Short stolons \u2014 spreads slowly, forms a tighter and more uniform sward\n- More tolerant of close mowing \u2014 used in fine lawn and golf fairway mixes\n- Preferred for ornamental and formal lawns where a neat finish is needed\n\n**Strong creeping red fescue (Festuca rubra subsp. rubra)**\n- Long stolons \u2014 spreads aggressively, fills gaps quickly\n- Slightly coarser texture than slender creeping red\n- Excellent self-repair ability; more common in utility and domestic lawns\n- Can be invasive if included in a fine ornamental mix\n\n[tip]\nOn the doorstep, both look identical. The clue is sward behaviour: a lawn that aggressively fills bare patches on its own is likely strong creeping red. Both are desirable \u2014 the distinction matters mainly when specifying seed mixes for fine or ornamental work.\n[/tip]\n\n## Chewings fescue (Festuca rubra subsp. commutata)\n\nNon-creeping, dense clumps. Good mowing quality. Used in luxury and fine ornamental lawn mixes.\n\n### How to identify\n- Fine, rolled leaves \u2014 similar to creeping red fescue, but with no stolons\n- Grows in distinct clumps, doesn't spread outward\n- Very upright growth habit \u2014 stands more erect than creeping types\n\n### Uses\n- Luxury and fine lawn mixes, often combined with slender creeping red\n- Tolerates very close mowing\n\n## Hard fescue (Festuca longifolia)\n\nExtremely drought tolerant, distinctive blue-green colour, very low maintenance.\n\n### How to identify\n- Grey-green or blue-green leaf colour \u2014 distinctive and unmistakeable\n- Very fine, stiff, almost needle-like leaves\n- Dense, compact tufts; stays low naturally without mowing\n\n### Uses\n- Low-maintenance verges, banks, slopes and wildflower mixes\n- Drought-prone sites without irrigation\n- Not suitable for high-traffic or formal domestic lawns\n\n## Sheep's fescue (Festuca ovina)\n\nVery fine, steel-blue, the most drought-tolerant fescue. Rarely found in domestic lawns.\n\n### How to identify\n- Steel-blue to grey-green colouration \u2014 very distinctive\n- Extremely fine, bristle-like leaves\n- Dense, cushion-like, low clump growth\n\n### Uses\n- Dry, poor soils and exposed upland or coastal locations\n- Not suited to domestic lawn situations \u2014 too slow-growing and specialised\n\n## Red Thread risk\n\n[warning]\nCreeping red fescue is the most susceptible species to Red Thread disease. Nitrogen deficiency is the primary trigger. If a fescue-dominant lawn has recurring Red Thread, check the nutrition programme first \u2014 under-feeding is almost always a contributing factor. Feeding the lawn is the first response; fungicide and liquid iron assist recovery.\n[/warning]"
      },
      {
        id: "gts-ryegrass",
        title: "Perennial Ryegrass \u2014 Lolium perenne",
        section: "Grass",
        duration: "8 min",
        content:
          "Perennial ryegrass is the backbone of the UK domestic lawn. If a customer has had a re-seed, renovation or new build lawn laid, it's almost certainly predominantly perennial ryegrass. Understanding it is non-negotiable.\n\n## Key characteristics\n- Broad, shiny leaf blade \u2014 the most recognisable feature; the underside of the leaf has a distinctive gloss\n- Coarse texture compared to fescues \u2014 feels firmer underfoot\n- Hardwearing \u2014 handles foot traffic better than any other domestic lawn grass\n- Fastest to establish: germinates in **7\u201410 days** under the right conditions\n- Excellent response to fertiliser \u2014 shows visible green-up rapidly after a feed\n- Lower shade tolerance than fescues \u2014 thins out significantly under tree canopies\n- Moderate drought tolerance \u2014 goes dormant in severe drought but recovers\n\n## How to identify\n\n### Leaf\n- Wide, flat leaf blade with a very distinctive **gloss on the underside** \u2014 hold a leaf up to the light and flip it; ryegrass shines clearly\n- Sharply pointed leaf tip\n- Prominent midrib (central vein) on the upper surface\n- Bright, fresh green colour \u2014 more vivid than fescues\n\n### Base of plant\n- Compressed, flattened shoot at the base \u2014 oval cross-section when looked at end-on\n- Reddish-pink or purplish colouring at the base of the sheath in many cultivars\n- No stolons or rhizomes \u2014 forms a clump, doesn't spread sideways\n\n[note]\nThe gloss test is the quickest field ID. Pick a leaf, flip it over \u2014 a shiny underside means ryegrass. No gloss = fescue or meadow grass. This works in seconds on the doorstep.\n[/note]\n\n## Uses\n\n- Family and utility lawns \u2014 handles foot traffic from children and dogs better than any other domestic grass\n- New-build and renovation seed mixes \u2014 fast establishment gets a result quickly\n- High-wear play and sports areas\n- Not suited to ornamental or fine lawns where texture and appearance are the priority\n\n**Typical seed mix proportions:**\n- Family/utility lawn: 70\u201480% perennial ryegrass, remainder fine fescue and bent\n- Ornamental/fine lawn: heavier fescue content, lower or no ryegrass\n- Sports/high-wear area: near 100% perennial ryegrass or specialist hard-wearing cultivars\n\n## Why it dominates domestic lawns\n\nDomestic customers want results quickly and need a lawn that handles real life. Perennial ryegrass delivers on all counts. When a customer asks why their lawn doesn't look like a bowling green, the answer is often variety \u2014 a ryegrass lawn cannot achieve the same texture as a fine fescue lawn without complete renovation.\n\n## Common problems in ryegrass lawns\n\n- **Thins in shade** \u2014 recommend overseeding with shade-tolerant fescue in shadier areas\n- **Susceptible to Leatherjacket and Chafer Grub damage** \u2014 both feed on roots; shallow-rooted ryegrass can be lifted easily when grubs are present\n- **Leaf Spot disease** \u2014 appears in wet, humid conditions; dark lesions on the leaf blade\n- **Poa annua invasion** \u2014 annual meadow grass loves the gaps created by stressed or scalped ryegrass"
      },
      {
        id: "gts-bents",
        title: "Bent Grasses \u2014 Agrostis",
        section: "Grass",
        duration: "5 min",
        content:
          "Bent grasses are the finest-textured grasses you'll encounter in UK domestic lawns. They're most at home in ornamental and low-mow situations, and dominate golf and bowling greens at their extreme.\n\n## Browntop bent (Agrostis capillaris)\n\nThe most common bent in domestic lawns. Extremely fine-leaved, forms a dense creeping mat via stolons. Often found in older, ornamental or low-mow lawns.\n\n### How to identify\n- Extremely fine, flat leaf blade \u2014 noticeably finer than fescues\n- Pointed leaf tip; very short ligule (membrane at the leaf base)\n- Dense, mat-forming habit \u2014 a healthy browntop bent lawn feels like a carpet\n- Spreads visibly via stolons (above-ground runners) \u2014 a clear giveaway\n- In a mixed sward: browntop bent appears as the finest, densest patch\n\n### Uses\n- Ornamental lawns and low-mow or meadow-style domestic lawns\n- Tolerates lower mowing heights than ryegrass\n- Suited to low-nitrogen regimes \u2014 feeds sparingly\n- Self-repairs via stolons, but accumulates thatch rapidly as a result\n\n[warning]\nA lawn with a high browntop bent component will build thatch significantly faster than a fescue or ryegrass lawn. If thatch is a recurring problem and the sward feels particularly fine and mat-like, bent grass is likely a significant component. Annual hollow-tine aeration is especially important in these lawns.\n[/warning]\n\n## Velvet bent (Agrostis canina)\n\nExtremely fine, low-growing. A golf and bowling green species. Very unlikely in domestic lawns.\n\n### How to identify\n- The finest-leaved bent species \u2014 almost moss-like in texture\n- Very dark green, very low-growing\n- Requires very close mowing (under 10mm) to thrive \u2014 dies out at domestic mowing heights\n\n### Uses\n- Golf putting greens and bowling greens at very close cut heights\n- No practical role in domestic lawns\n\n## Creeping bent (Agrostis stolonifera)\n\nThe benchmark golf green grass. Requires very high inputs and precise management. Not a domestic lawn species.\n\n### How to identify\n- Coarser than velvet bent; spreads very aggressively via long stolons\n- Pale green; wide-spreading stolon habit visible on the surface\n- More likely found in turf that was previously managed as a golf or bowling surface\n\n### Uses\n- Golf putting greens and highly managed sports turf only\n- In domestic lawns it's a nuisance \u2014 spreads aggressively and accumulates heavy thatch\n\n## What to look for on a job\n\nA lawn with a high bent component will feel dense and carpet-like. It will also tend to accumulate thatch faster than a fescue or ryegrass lawn. If thatch is a recurring issue and the lawn feels very fine and mat-like, bent grass is likely a significant component of the sward.\n\n[tip]\nBent grass lawns aren't inherently a problem \u2014 they can be beautiful. But they need more aggressive thatch management. When recommending aeration on a bent-dominant lawn, explain that the mat-forming nature of bent grass makes regular aeration more important than on a typical ryegrass lawn.\n[/tip]"
      },
      {
        id: "gts-meadow",
        title: "Meadow Grasses \u2014 Poa",
        section: "Grass",
        duration: "6 min",
        content:
          "The Poa family includes both one of the most useful grasses in UK turf and one of the most troublesome weeds. Knowing which is which matters on every job.\n\n## Smooth-stalked meadow grass (Poa pratensis)\n\nA rhizomatous species \u2014 it spreads underground, giving excellent self-repair and fill-in ability. Found in parks, sports surfaces and older domestic lawns.\n\n### How to identify\n- **Boat-shaped leaf tip** \u2014 the definitive Poa identifier; the very tip of the blade curves upward like the prow of a boat\n- Dark, mid-green colour \u2014 noticeably darker than Poa annua\n- Flat leaf blade, slightly compressed at the base of the shoot\n- Spreads outward in patches \u2014 the rhizome spread creates a slightly uniform, mat-like effect over time\n- Stems are smooth (hence 'smooth-stalked') and slightly flattened\n\n### Uses\n- Parks, sports surfaces, and older domestic lawns\n- Excellent self-repair ability via rhizomes \u2014 can fill bare patches without overseeding\n- Good wear tolerance; handles moderate foot traffic well\n- A desirable component in many lawn mixes where self-repair matters\n\n## Annual meadow grass (Poa annua) \u2014 the weed species\n\nUnlike its cousin, Poa annua is annual \u2014 it completes its life cycle in one year and seeds itself prolifically. It is one of the most common lawn weeds in the UK.\n\n### How to identify\n- **Boat-shaped leaf tip** \u2014 same as Poa pratensis; this identifies all Poa species\n- **Pale, yellow-green colour** compared to the surrounding grass \u2014 the clearest visual indicator\n- Seed heads visible even at low mowing heights \u2014 seeds constantly throughout the season\n- Flat, compressed, almost prostrate habit \u2014 lies along the ground rather than growing upright\n- Often concentrated in worn, compacted or thin areas of the lawn\n\n[note]\nThe boat-shaped leaf tip identifies all Poa species. Colour is the quickest way to separate Poa annua (pale yellow-green) from Poa pratensis (dark green). You'll often find both in the same lawn \u2014 look for the pale, seeding patches.\n[/note]\n\n### Uses\n- None \u2014 Poa annua is a weed grass. It seeds prolifically, looks pale and untidy, and weakens the sward by competing with desirable grasses.\n\n## Managing Poa annua\n\nThere is no selective herbicide that controls Poa annua without damaging surrounding grass. Management is cultural only:\n- **Dense overseeding** \u2014 a thick sward is the best long-term defence; Poa annua thrives in thin, gappy lawns\n- **Avoid scalping** \u2014 low, stressed turf is exactly where Poa annua establishes most readily\n- **Aeration** \u2014 reduces the compaction that favours Poa annua germination\n- **Scarification** \u2014 removes some seed-bearing plants before they set seed\n\n[warning]\nSet honest expectations at the doorstep. If a customer points out pale patches with visible seed heads, Poa annua is the likely cause. There is no quick fix \u2014 cultural management over multiple seasons is the only approach. Be clear about this early to avoid disappointed customers later.\n[/warning]"
      },
      {
        id: "gts-thatch-what",
        title: "Thatch \u2014 What It Is & Why It Builds Up",
        section: "Thatch",
        duration: "6 min",
        content:
          "Thatch is one of the most common problems in UK domestic lawns \u2014 and one of the most misunderstood by customers. Being able to explain it clearly on the doorstep is one of the most valuable skills a technician can develop.\n\n**What is thatch?**\nThatch is the layer of dead and dying organic matter \u2014 old stems, roots and cellular debris \u2014 that accumulates between the green leaf blades and the soil surface. It is a natural by-product of grass growth. A thin layer (under 10mm) is normal and beneficial, acting as cushioning and insulation. Beyond 10mm, it starts to cause problems.\n\n**Why does it build up?**\nThatch forms when organic matter accumulates faster than soil microbes can break it down. The balance tips in the wrong direction when:\n\n- **Over-fertilising with nitrogen:** rapid growth produces more organic matter than the soil's microbial population can decompose. The grass grows faster than the system can recycle it.\n- **Infrequent or absent aeration:** without air channels into the soil, microbial activity drops and decomposition slows significantly. Microbes need oxygen.\n- **Heavy or frequent watering:** keeps the surface saturated, reducing oxygen levels in the soil and slowing the breakdown process.\n- **Coarse grass varieties:** ryegrass produces more bulk organic matter per season than finer species like fescues or bents.\n- **Low mowing height:** compresses the thatch layer rather than allowing natural airflow around the base of the plant.\n- **Heavy clay or compacted soils:** poor drainage creates anaerobic (low-oxygen) conditions at the soil surface, where microbial breakdown is very slow.\n\n**A useful way to explain it to customers:**\nImagine the lawn has a recycling system \u2014 microbes in the soil break down old plant material and return it to the soil as nutrients. When you over-fertilise, water too heavily, or cut off the air supply by not aerating, that recycling system gets overwhelmed. The organic matter piles up faster than it can be processed \u2014 and that pile is thatch.",
      },
      {
        id: "gts-thatch-effects",
        title: "Thatch \u2014 Effects & How to Measure It",
        section: "Thatch",
        duration: "6 min",
        content:
          "Understanding what excess thatch actually does to a lawn helps you explain to customers why treatments are underperforming \u2014 and why scarification is worth investing in.\n\n**What does excess thatch do?**\n\n**Blocks water and air penetration**\nRainfall and fertiliser land on the thatch layer and often stay there, never reaching the rootzone below. Liquid iron applied to a heavily thatched lawn largely stays in the thatch \u2014 which is why the same lawn treated twice can still look yellow. This is one of the most common reasons treatments underperform. A customer complaining that their fertiliser 'doesn't seem to be working' may simply have a thatch problem.\n\n**Creates ideal disease conditions**\nWarm, moist, low-airflow environments are exactly what fungal pathogens need. Red Thread, Fusarium and other lawn diseases thrive in heavy thatch. If a lawn has recurring disease issues, high thatch is almost always a contributing factor.\n\n**Encourages shallow rooting**\nGrass roots will grow upward into the moist thatch rather than downward into the soil \u2014 it's the path of least resistance. Shallow roots mean the lawn is highly vulnerable to drought; the moment the thatch dries out, the grass has no reservoir to draw from.\n\n**Creates a spongy surface**\nWalk on a heavily thatched lawn and it feels soft or springy underfoot. Customers often describe it as 'bouncy'. The thatch is acting as a cushion between the foot and the soil. It can also create uneven ground as thatch builds up at different rates across the lawn.\n\n**Locks out nutrients**\nNutrients from fertiliser can become chemically bound up in the thatch layer and rendered unavailable to the plant. You're paying for feed that the grass can't access.\n\n---\n\n**How to measure thatch depth:**\nUse a soil probe or a penknife to cut a small plug from the lawn. Look at the profile in cross-section \u2014 you'll see three distinct layers:\n1. Green layer at the top (living grass)\n2. Brown/grey spongy layer between green and soil = thatch\n3. Dark soil beneath\n\nMeasure the thatch layer in millimetres:\n- **Under 10mm:** healthy \u2014 no action needed\n- **10–20mm:** moderate \u2014 preventive scarification recommended\n- **20–30mm:** significant \u2014 curative scarification required\n- **30mm+:** severe \u2014 deep scarification, likely multi-pass; manage customer expectations on recovery time\n\nAlways take a reading before quoting a scarification job \u2014 the depth directly affects the price weighting.",
      },
      {
        id: "gts2",
        title: "Thatch \u2014 Control Methods & Scarification Weighting",
        section: "Thatch",
        duration: "6 min",
        content:
          "Once you've identified excess thatch and explained the problem, the customer needs to know what can be done about it. There are three main approaches \u2014 one curative, two preventive.\n\n**Scarification (curative)**\nMechanical raking or flailing to physically remove accumulated thatch from the lawn. This is the primary curative method and the most impactful single service we offer for thatch management.\n\n- Uses rotating flails or spring-tine blades to tear the thatch out of the sward\n- Produces significant arisings (waste material) that must be collected and removed\n- Should always be followed by overseeding \u2014 scarification opens the soil and creates the ideal seedbed, but it also stresses the existing grass. Overseeding fills the gaps and thickens the sward.\n- Timing: primarily **autumn** (September–October) when soil is warm and growing conditions remain. A lighter spring pass may be done if the lawn is very thatchy coming out of winter.\n- Warn customers: the lawn will look worse before it looks better. A freshly scarified lawn can look quite rough \u2014 this is normal.\n\n**Aeration (preventive)**\nImproves drainage and introduces oxygen into the soil, which stimulates the microbial activity that breaks thatch down naturally. Regular annual aeration significantly slows thatch accumulation over time.\n\n- **Hollow-tine aeration** removes cores of soil and thatch \u2014 more effective for thatch management than solid-tine\n- **Solid-tine** improves airflow and drainage but doesn't remove material\n- For heavily thatched lawns, hollow-tine aeration combined with scarification is the gold standard\n\n**Balanced nutrition**\nAvoiding excessive nitrogen applications reduces the rate of organic matter production. This is a preventive measure, not a cure. Autumn programmes are deliberately low in nitrogen partly for this reason.\n\n---\n\n**Scarification difficulty weighting:**\nFor quoting scarification jobs, we use a five-factor difficulty weighting system. Each factor adds a multiplier to the base price for that lawn size:\n\n1. **Thatch depth** \u2014 0–30mm = standard, 30–60mm = +0.10, 60mm+ = +0.25\n2. **Lawn slope** \u2014 level = 0, gentle slope = +0.10, steep = +0.25\n3. **Layout complexity** \u2014 simple 1–2 zones = 0, difficult 3–5 zones = +0.10, complex 5+ = +0.25\n4. **Access restrictions** \u2014 open access = 0, steps or tight gates = +0.10\n5. **Disposal distance** \u2014 next to lawn = 0, within 5m = +0.10, over 5m = +0.25\n\nAdd all applicable factors together and apply the total as a multiplier to the base price. A lawn with 40mm thatch, on a gentle slope, with 4 zones and steps = +0.30 total.",
      },
      {
        id: "gts-clay",
        title: "Clay Soil \u2014 Identification & Treatment",
        section: "Soil Types",
        duration: "6 min",
        content:
          "Clay is one of the most common soil types in UK gardens and the one that causes the most visible problems for lawns. Recognising it quickly and understanding what it means for treatment is a key field skill.\n\n**The squeeze test:**\nTake a handful of moist (not wet, not dry) soil from just below the surface. Squeeze it firmly, then press it with your thumb.\n- **Clay result:** holds a solid ball shape \u2014 and smears or ribbons when you press it. It feels dense and sticky. It won't crumble.\n\n**Why clay behaves the way it does:**\nClay particles are extremely small \u2014 much finer than sand or silt. This gives clay soil a huge surface area, which is why it retains water and nutrients so effectively. The downside is that the particles pack tightly together, leaving little room for air or water to move through.\n\n**Characteristics:**\n- Heavy and slow-draining \u2014 prone to waterlogging in wet periods\n- Prone to compaction under foot traffic and machinery\n- Sticky and plastic when wet; shrinks, cracks and sets hard when dry\n- High nutrient content \u2014 but nutrients may be inaccessible when structure is poor\n- Warms slowly in spring \u2014 lawns are slow to green up and come out of dormancy\n\n**What this means for treatment:**\n\n- **Aeration is essential** \u2014 hollow-tine aeration breaks up compaction, improves drainage and introduces oxygen. The single most impactful service for clay lawns.\n- **Wetting agents help** \u2014 in dry periods, clay can become hydrophobic (water-repellent), causing water to run off rather than penetrate. Wetting agents restore penetration.\n- **Nutrients are not usually the limiting factor** \u2014 clay holds nutrients well. The problem is structure and drainage, not starvation.\n- **Fertiliser timing matters** \u2014 applying granular fertiliser to a waterlogged clay lawn risks runoff and waste. Wait for the surface to drain.\n\n**Weeds that point to clay soil:**\n- Creeping buttercup \u2014 wet, compacted conditions\n- Greater plantain \u2014 compacted soil\n- Dock \u2014 wet, heavy soil\n\nIf you see these weeds alongside a slow-draining, puddling lawn, clay is almost certainly the underlying soil.",
      },
      {
        id: "gts-loam",
        title: "Loam Soil \u2014 Identification & Treatment",
        section: "Soil Types",
        duration: "5 min",
        content:
          "Loam is the gold standard for lawns \u2014 a balanced mixture of sand, silt and clay that gives good drainage, good moisture retention and good nutrient-holding capacity. Most treatments work exactly as expected on loam.\n\n**The squeeze test:**\nTake a handful of moist soil from just below the surface. Squeeze it firmly.\n- **Loam result:** holds a ball shape but crumbles when you prod or press it. It's not sticky, it's not dust. It holds together just enough, then lets go.\n\n**Why loam works so well:**\nLoam sits in the middle ground. The sand fraction keeps drainage open. The clay fraction retains moisture and nutrients. The silt fraction fills the gaps and gives a stable structure. None of the extremes of clay (too wet, too compacted) or sand (too dry, too hungry) apply.\n\n**Characteristics:**\n- Good drainage without being drought-prone\n- Good nutrient retention without waterlogging\n- Easy to work \u2014 crumbles well, doesn't compact severely\n- Most UK domestic gardens have a loam component, though it's rarely pure loam\n- Warms at a moderate rate in spring\n\n**What this means for treatment:**\n- Responds well to the full standard programme \u2014 fertiliser, herbicides, iron, wetting agents all behave predictably\n- Aeration is still beneficial annually but less urgent than on clay or sandy soils\n- Irrigation advice: moderately drought-tolerant, but deep watering during dry spells is better than frequent shallow watering\n- Standard fertiliser rates and timings apply without adjustment\n\n**On the doorstep:**\nIf a customer's lawn is on loam and still struggling, the cause is more likely to be cultural (wrong mowing height, poor watering habits, disease, shade) rather than a fundamental soil problem. Loam is forgiving \u2014 look elsewhere for the explanation.",
      },
      {
        id: "gts3",
        title: "Sandy Soil \u2014 Identification & Treatment",
        section: "Soil Types",
        duration: "6 min",
        content:
          "Sandy soil is at the opposite end of the spectrum from clay. Where clay holds everything, sand lets everything go \u2014 water drains through quickly, nutrients leach away and the lawn dries out fast. Lawns on sandy soil have very specific needs.\n\n**The squeeze test:**\nTake a handful of moist soil from just below the surface. Squeeze it firmly.\n- **Sandy result:** barely holds shape at all \u2014 crumbles immediately when you open your hand, or won't compact into a ball in the first place. Feels gritty.\n\n**Why sandy soil behaves the way it does:**\nSand particles are large \u2014 much larger than silt or clay. The spaces between particles are big enough for water to drain through freely and quickly. There's no surface area to hold onto water or nutrients the way clay does.\n\n**Characteristics:**\n- Very free-draining \u2014 water moves through rapidly, especially after rain\n- Low nutrient retention \u2014 fertiliser leaches downward, especially nitrogen and potassium\n- Warms up fast in spring \u2014 good for early green-up and germination\n- Drought-prone in summer \u2014 no reservoir of moisture to sustain the grass\n- Light and easy to work\n\n**What this means for treatment:**\n\n- **Fertiliser strategy:** more frequent applications at lower rates. A heavy single application will leach before the grass can use it \u2014 split feeds are more effective.\n- **Wetting agents are highly valuable:** in dry periods, sandy soils can become hydrophobic (the sand particles develop a waxy coating that repels water \u2014 it balls off rather than penetrating). Wetting agents restore absorption and help water reach the rootzone.\n- **Irrigation advice:** infrequent but deep watering is better than light daily watering. Deep watering encourages roots to follow moisture downward \u2014 building drought resilience. Light daily watering keeps roots shallow.\n- **Overseeding:** sandy lawns thin quickly under drought. Overseeding with drought-tolerant species (hard fescue, chewings fescue) improves resilience.\n\n**Weeds that point to sandy soil:**\n- Yarrow \u2014 thrives in dry, poor, infertile conditions\n- Trefoil/clover \u2014 nitrogen-fixing, outcompetes starved grass\n- Mouse-ear chickweed \u2014 low-fertility indicator\n\n**Soil pH and grass (applies to all soil types):**\nRegardless of soil type, pH directly affects whether nutrients are available to the plant. Most UK lawn grasses prefer **pH 6.0–7.0**.\n- Below 6.0 (acidic): grass struggles, moss and acid-tolerant weeds thrive \u2014 liming can help\n- Above 7.5 (alkaline): iron and manganese become chemically locked out, causing yellowing\n\nNote: silty, peaty and chalky soils are covered in the Advanced Soil Types module.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "gts-q1",
          question: "Which grass family is most commonly found in domestic UK lawn seed mixes?",
          options: ["Fescues (Festuca)", "Bents (Agrostis)", "Ryegrass (Lolium perenne)", "Yorkshire fog"],
          correct: 2,
          explanation: "Perennial ryegrass dominates domestic UK lawn seed mixes due to its quick establishment, hardwearing nature and good response to fertiliser.",
        },
        {
          id: "gts-q2",
          question: "What is the crown of a grass plant and why does it matter?",
          options: [
            "The seed head \u2014 the part that produces new seeds",
            "The above-ground runner that spreads the plant sideways",
            "The growth point just above soil level \u2014 damaging it kills the plant",
            "The top 5mm of the root system",
          ],
          correct: 2,
          explanation: "The crown is the growth point where new leaves emerge, located just above soil level. Scalping or damaging the crown kills the plant \u2014 which is why cutting too short causes bare patches.",
        },
        {
          id: "gts-q3",
          question: "A customer has had overseeding (OVS) carried out six weeks ago. They ask when weed control can be applied. What do you tell them?",
          options: [
            "Immediately \u2014 the grass is established enough after three weeks",
            "Not yet \u2014 weed control must wait at least 42–56 days from germination and at least 2–3 mows",
            "Weed control cannot be applied for 6 months after seeding",
            "It depends on the weed species present",
          ],
          correct: 1,
          explanation: "The grass must be fully established \u2014 which means 42–56 days from germination and having been mown at least 2–3 times. Applying herbicide too early damages or kills the seedlings.",
        },
        {
          id: "gts-q4",
          question: "Which fine fescue species is most associated with Red Thread disease in domestic lawns?",
          options: [
            "Hard fescue (Festuca longifolia)",
            "Sheep's fescue (Festuca ovina)",
            "Creeping red fescue (Festuca rubra subsp. rubra)",
            "Chewings fescue (Festuca rubra subsp. commutata)",
          ],
          correct: 2,
          explanation: "Creeping red fescue is the most susceptible species to Red Thread. The primary trigger is nitrogen deficiency \u2014 feeding the lawn is the first response alongside fungicide if needed.",
        },
        {
          id: "gts-q5",
          question: "What is thatch?",
          options: [
            "A type of soil fungus that causes brown patches",
            "The layer of dead organic matter between the green leaf and the soil",
            "Dead grass clippings left after mowing",
            "The crown area of the grass plant",
          ],
          correct: 1,
          explanation: "Thatch is the accumulated layer of dead and dying organic matter (stems, roots, debris) between the living grass and the soil surface. Under 10mm is normal; beyond that it becomes a problem.",
        },
        {
          id: "gts-q6",
          question: "You squeeze a handful of moist soil and it holds a firm ball but smears when you press it with your thumb. What soil type is this?",
          options: ["Sandy soil", "Loam soil", "Clay soil", "Silty soil"],
          correct: 2,
          explanation: "Clay soil holds a firm ball and smears when touched \u2014 it's sticky, slow-draining and prone to compaction.",
        },
        {
          id: "gts-q7",
          question: "A sandy soil lawn needs fertilising. Compared to a loam lawn, how should you approach the application?",
          options: [
            "Apply at double the rate \u2014 nutrients wash through sandy soil faster",
            "Apply at lower rates more frequently \u2014 nutrients leach through quickly",
            "Apply once per year \u2014 sandy soils retain nutrients well",
            "No difference \u2014 soil type doesn't affect fertiliser requirements",
          ],
          correct: 1,
          explanation: "Sandy soils have low nutrient retention \u2014 fertiliser leaches through quickly, especially after rain. More frequent, lower-rate applications maintain a steadier feed without waste or scorch risk.",
        },
        {
          id: "gts-q8",
          question: "Annual meadow grass (Poa annua) is present throughout a customer's lawn. What is the most effective treatment?",
          options: [
            "Apply a selective herbicide \u2014 this will remove Poa annua without harming the surrounding grass",
            "Apply a total herbicide and re-seed the entire lawn",
            "Cultural management only \u2014 dense overseeding and avoiding scalping; no selective herbicide is available",
            "Apply iron sulphate \u2014 this will suppress Poa annua effectively",
          ],
          correct: 2,
          explanation: "There is no selective herbicide that controls Poa annua without damaging surrounding grass. Cultural control \u2014 competitive overseeding and maintaining mowing height \u2014 is the only realistic approach.",
        },
      ],
    },
  },
  {
    id: "safety-basics",
    title: "Technician Health & Safety",
    description: "Site safety, PPE, manual handling and safe behaviour expected from technicians in the field.",
    icon: "ShieldCheck",
    emoji: "🦺",
    category: "Role-Specific",
    estimatedTime: "30 min",
    roles: ["technician"],
    stage: "role-foundations",
    lessons: [
      {
        id: "s1",
        title: "PPE and Daily Safety Checks",
        duration: "10 min",
        content:
          "Technicians must start each day with the right kit and the right checks.\n\n**Required PPE (by task):**\n- Safety boots: always when on customer property\n- Nitrile gloves: when handling any chemical product (standard rubber gloves are not adequate)\n- Eye protection / face shield: when mixing chemicals\n- Waterproofs: over chemical-resistant overalls where specified on the label\n- Wellies: when applying liquid iron \u2014 it stains boots and dries out skin\n- Respirator: when the product label specifies\n\n**Iron staining \u2014 specific caution:**\nDrips and footprints on pale surfaces WILL stain permanently. Walk carefully between a wet treated lawn and hard surfaces. Dry your wellies before stepping onto pale surfaces. Never mix product on customer hard surfaces \u2014 always inside the van or on the main road.\n\nBefore leaving base each morning: confirm equipment condition, vehicle walk-around complete, PPE in the van and ready.",
      },
      {
        id: "s2",
        title: "Manual Handling and Dynamic Risk Assessment",
        duration: "10 min",
        content:
          "Field work includes repeated lifting, uneven ground and changing conditions. Every property visit requires a brief dynamic risk assessment before you start work.\n\n**Manual handling:**\n1. Assess the load before lifting\n2. Use proper lifting posture \u2014 straight back, bend the knees\n3. Keep the load close to your body\n4. Ask for help with anything over 25kg\n\n**Dynamic risk assessment \u2014 ask yourself:**\n- Are there any slip, trip or fall hazards (wet grass, uneven paths, steps)?\n- Is access clear and safe?\n- Is the ground stable enough for machinery?\n- Are there children, pets or vulnerable individuals present?\n\nStop work if a hazard makes the task unsafe. Do not work around it \u2014 address it or escalate to the office.",
      },
      {
        id: "s3",
        title: "Incident Reporting",
        duration: "10 min",
        content:
          "If something goes wrong or nearly goes wrong, report it the same day. Do not quietly work around a safety problem.\n\n**Road Traffic Collision (RTC) procedure:**\n1. Switch off engine, turn on hazard warning lights\n2. Ensure you and others are okay\n3. Call 999 if someone is in danger, seriously injured, a serious offence has been committed, or the road is obstructed\n4. Exchange details with anyone involved (name, address, vehicle registration)\n5. Check the van\n6. Draw a sketch of the incident\n7. Take photos of all damage\n8. Ensure dashcam recorded \u2014 secure the footage\n9. Call Harry (Operations Manager) \u2014 explain what happened, what you have done, what is happening next\n\n**Accidents and near misses** must go in the accident book \u2014 it's a legal requirement. Always carry a head torch and high-vis vest.",
      },
    ],
  },
  {
    id: "doorstep-conduct",
    title: "Doorstep Conduct for Technicians",
    description: "How to arrive, communicate and behave on customer property from first contact to departure.",
    icon: "Users",
    emoji: "🚪",
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
          "The customer often judges service quality before work even begins. A clean, organised, professional arrival sets the tone for the whole visit.\n\n**On arrival:**\n- Park considerately \u2014 don't block driveways or cause obstruction\n- Present a clean, tidy appearance\n- Approach the property calmly \u2014 ring the bell or knock if the customer is visible\n- Use any agreed access process (gate code, side entrance, etc.)\n\n**The story structure (Paul Scorey's framework):**\nIf a customer is present, take the time to run through your visit story:\n- **Start:** what I came to do\n- **Middle:** what I did\n- **End:** what I found, what I'm recommending and why\n\nA smile goes a long way. Eye contact builds trust. Ask questions \u2014 understand what the customer wants to achieve with their lawn.",
      },
      {
        id: "dc2",
        title: "Speaking with Customers on the Job",
        duration: "9 min",
        content:
          "Technicians are the face of Shrekfeet. What you say on a doorstep has commercial and relational consequences.\n\n**Do:**\n- Explain what service you're carrying out\n- Mention any access needs or short-term restrictions (keep off treated areas, watering advice)\n- Recommend additional services using the FAB framework \u2014 walk the customer around the lawn if possible\n- Ask for reviews if the visit has gone well and the customer is happy\n\n**Do not:**\n- Discuss pricing or commitments outside your authority\n- Promise dates or specific outcomes that haven't been confirmed in SA5\n- Make negative comments about the business, colleagues or other customers\n\n**Raising estimates:**\nIf you identify a service the customer could benefit from (scarification, aeration, overseeding, moss treatment), raise an estimate manually in SA5 using the correct status code. Do not rely on condition codes to auto-generate estimates \u2014 they won't.",
      },
      {
        id: "dc3",
        title: "Leaving the Property Well",
        duration: "8 min",
        content:
          "A strong finish is part of good service. Before leaving, confirm everything is in order.\n\n**Before you leave:**\n- Close all gates that were closed on arrival\n- Remove all debris from the property (aeration cores, scarification arisings \u2014 unless agreed otherwise)\n- Check hard surfaces for product drips or footprints\n- Ensure equipment is packed away safely and the van is closed\n- Log your visit notes and condition codes in SA5 before moving to the next job\n\n**Photos:**\nTake before and after photos on every visit where a visible treatment or renovation has been completed. This protects both the customer and the business if there is ever a query about work completed. A customer who claims aeration wasn't done \u2014 without photos \u2014 is a problem. A customer who claims aeration wasn't done when you have timestamped before/after shots \u2014 is not.",
      },
    ],
  },

  // ─── STAGE 3: PRODUCTS & TREATMENT ─────────────────────────────────────────
  {
    id: "fertilisers-ppps",
    title: "Fertilisers, PPPs & Weed Identification",
    description: "Fertiliser types, NPK, micronutrients, herbicides, fungicides, insecticides and UK regulations. Tech-only module.",
    icon: "Sprout",
    emoji: "⚗️",
    category: "Role-Specific",
    estimatedTime: "50 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "fp1",
        title: "Fertiliser Types and NPK",
        duration: "18 min",
        content:
          "Fertilisers provide the nutrients grass needs to grow, recover and maintain colour. Understanding the different release types and what each nutrient does is essential before you start handling products.\n\n**Release types:**\n\n**Quick release (soluble nitrogen)**\nDissolves immediately on contact with moisture. Fast green-up visible within 3–5 days. Short longevity (2–4 weeks). Risk of scorch if over-applied in dry or hot conditions. Used when rapid colour response is needed.\n\n**Slow release (coated granule)**\nNutrient encapsulated in a coating that breaks down over time. Releases over 6–12 weeks depending on the coating. Less scorch risk. Used in spring and summer programmes where steady feeding is wanted.\n\n**Controlled release (polymer-coated, temperature-activated)**\nReleases in response to soil temperature. In cold soil, little release; as soil warms, release ramps up. Longevity typically 3–5 months. Most expensive but most consistent. The Calci-Complex Sport product (14-2-5+Ca+Mg) is an example \u2014 applied at 25–40g/m² depending on grass type and soil.\n\n**NPK \u2014 the three macronutrients:**\n\n**N \u2014 Nitrogen**\nDrives leaf growth, green colour and photosynthesis. The most visible nutrient response. High nitrogen = rapid growth = darker green. Autumn programmes use lower nitrogen to avoid promoting soft growth before winter.\n\n**P \u2014 Phosphorus**\nRoot development and stress resistance. Critical at establishment (seeding). Less visible effect in established lawns but important for drought tolerance.\n\n**K \u2014 Potassium**\nCell wall strength, water retention, hardiness. Improves the plant's ability to tolerate drought, cold and disease. Autumn feeds are typically high-K for this reason.\n\n**Micronutrients in our products:**\n- Iron (Fe): mobilises oxygen, improves chlorophyll production. Also blackens moss \u2014 so iron-containing products have a dual function\n- Magnesium (Mg): green colouring of leaves, chlorophyll synthesis\n- Manganese (Mn): plant growth, nitrogen utilisation\n- Boron (B): cell wall formation, movement of sugars\n- Copper (Cu): photosynthesis and respiration\n- Zinc (Zn): growth regulation\n- Molybdenum (Mo): converts nitrate for amino acid utilisation\n\n**Our ANM product (Autumn Nutrition Mix):**\n2-0-6 + 6Fe + trace elements (Mg, B, Cu, Mn, Mo, Zn)\nThe low nitrogen content (2) avoids promoting soft growth before winter. High potassium (6) builds cell wall strength for frost tolerance. Iron (6Fe) inhibits moss.\n\n**Calci-Complex Sport:**\n14-2-5 + Ca + Mg, applied at 25–40g/m². Application rate varies by grass type and soil \u2014 use the spreader settings guidance provided.",
      },
      {
        id: "fp2",
        title: "Plant Protection Products \u2014 Herbicides, Fungicides, Insecticides",
        duration: "18 min",
        content:
          "Plant Protection Products (PPPs) are regulated substances. In the UK, anyone born after 31 December 1964 must hold a valid PA1 + PA6 certification to apply them professionally. Using PPPs without certification on customer property is an offence.\n\n**Herbicides (weed control):**\n\n*Selective vs non-selective:*\n- Selective: kills certain plants (broadleaf weeds) while leaving grass unharmed. The vast majority of our weed treatments use selective herbicides.\n- Non-selective (total): kills all green plant material. Glyphosate is the most common example \u2014 used only for complete lawn renovation, never on an active lawn.\n\n*Systemic vs contact:*\n- Systemic: absorbed into the plant and translocated through the vascular system \u2014 kills roots as well as leaves. Slower visible result (1–3 weeks) but kills the whole plant. Essential for perennials (dandelion, plantain, clover).\n- Contact: kills only the tissue it directly touches. Fast visible burn but weeds often regrow from the root. Limited use in professional lawn treatment.\n\n**Fungicides:**\n- Preventative: applied before disease develops, typically as a barrier. Best used where a lawn is at high risk (red fescue-dominated, known history of Red Thread).\n- Curative: applied after disease is identified. Stops progression and helps recovery. Products like Rejuvenate contain nutrients and micronutrients to assist recovery alongside the fungicidal action.\n- Liquid iron: acts to dry out fungal spores. A component of many curative approaches for Red Thread and Rust \u2014 not a fungicide in the traditional sense but effective.\n\n**Insecticides:**\n- Contact: kills insects on direct contact. Fast-acting but shorter residual.\n- Systemic: absorbed by the plant and ingested by insects feeding on it. Slower but longer-lasting.\n- Acelepryn: our primary grub treatment. 95% success rate against Leatherjackets, 70% against Chafer Grubs. Requires minimum 3 years' sequential treatment for best results.\n- Nematodes: biological control for grubs. Applied to moist soil; larvae infect and kill the grubs. Used to 'close the gap' alongside Acelepryn.\n\n**Calibration reminder:**\nEvery time you change a nozzle, fix your sprayer, or change application conditions \u2014 calibrate your sprayer. Accurate application is as important as turning up to the customer's property.",
      },
      {
        id: "fp3",
        title: "Weed Identification and What Weeds Tell You",
        duration: "14 min",
        content:
          "Being able to name a weed on sight is a core technician skill. But the real professional value is understanding what a weed's presence tells you about the soil and lawn condition \u2014 and using that to recommend the right solution.\n\n**Common UK lawn weeds and their soil indicators:**\n\n**Dandelion:** deep tap root, jagged leaves, yellow flower. Thrives in compacted, under-fertilised soil. Systemic selective herbicide; hand-pulling only effective if the entire root comes out.\n\n**White clover:** trefoil leaves, white flower, nitrogen-fixing. Thrives wherever grass is under-fed. Indicator: low nitrogen. Treatment must include feeding the lawn \u2014 without it, clover returns immediately.\n\n**Plantain (greater & ribwort):** flat ribbed leaves, very tough rosette. Indicator: compacted soil. Selective herbicide works well; recommend aeration to address the cause.\n\n**Creeping buttercup:** glossy lobed leaves, runners, yellow flower. Indicator: wet, compacted, poorly drained soil. Selective herbicide knocks it back; aeration and drainage improvement prevents return.\n\n**Yarrow:** feathery leaves, drought-tolerant, deep-rooted. Indicator: poor, dry, under-fed soil. Hard to control \u2014 often needs 2–3 treatments plus a combination product. Overseeding to crowd it out is essential.\n\n**Speedwell:** tiny blue flowers, mat-forming. Notoriously resistant to many herbicides. Requires a fluroxypyr-containing combination product. Raise mowing height and thicken sward culturally.\n\n**Annual meadow grass (Poa annua):** pale, seeds even when mown very short. No truly selective control available. Cultural management only \u2014 avoid scalping, competitive overseeding.\n\n**Moss:** not a true weed but treated as one. Indicator of: shade, wet/poor drainage, low fertility, acidic pH, scalping (mowing too short), or compaction. Iron sulphate blackens it for raking; scarification removes the dead material; **overseeding always follows.** Addressing the underlying cause is what prevents return.\n\n**The professional rule:** for every weed, identify the cause and make a recommendation to address it \u2014 not just the chemical treatment. 'Kill the plant + fix the conditions' is the full job.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "fp-q1",
          question: "What does nitrogen (N) primarily drive in grass?",
          options: [
            "Root depth and stress resistance",
            "Cell wall strength and frost tolerance",
            "Leaf growth, green colour and photosynthesis",
            "Soil pH balance",
          ],
          correct: 2,
          explanation: "Nitrogen drives leaf growth, green colour and photosynthesis. It's the nutrient with the most visible effect on grass appearance.",
        },
        {
          id: "fp-q2",
          question: "What is the difference between a systemic and a contact herbicide?",
          options: [
            "Systemic is faster-acting; contact is slower",
            "Systemic moves through the whole plant killing the roots; contact only kills tissue it directly touches",
            "Systemic kills grass; contact is selective for weeds",
            "There is no functional difference \u2014 both achieve the same result",
          ],
          correct: 1,
          explanation: "Systemic herbicides are absorbed and translocated through the plant, killing roots as well as leaves. Contact herbicides only kill the tissue they directly touch \u2014 weeds often regrow from the root.",
        },
        {
          id: "fp-q3",
          question: "A customer's lawn has lots of white clover. What does this indicate and what should you recommend?",
          options: [
            "Acidic soil \u2014 recommend lime application",
            "Low nitrogen \u2014 treat clover with herbicide AND restore the lawn's nitrogen programme",
            "Waterlogged soil \u2014 recommend aeration only",
            "Alkaline soil \u2014 recommend pH-adjusting products",
          ],
          correct: 1,
          explanation: "White clover is a nitrogen-fixer that thrives in under-fed lawns. Without restoring nitrogen alongside the herbicide treatment, clover returns immediately.",
        },
        {
          id: "fp-q4",
          question: "Which certifications are required before a UK technician can apply Plant Protection Products unsupervised?",
          options: [
            "First Aid at Work and Manual Handling",
            "BASIS Amenity and PA2",
            "PA1 (foundation theory) and PA6 (handheld application)",
            "Lantra Level 2 and PA1 only",
          ],
          correct: 2,
          explanation: "PA1 (the theory underpinning) and PA6 (handheld applicators \u2014 knapsack and handheld sprayers) are the required certifications for professional lawn treatment work.",
        },
        {
          id: "fp-q5",
          question: "Our Autumn Nutrition Mix (ANM) has the analysis 2-0-6+6Fe. Why is nitrogen kept low in autumn formulations?",
          options: [
            "To save cost on the product",
            "High nitrogen in autumn promotes soft growth vulnerable to frost and disease",
            "Because grass does not absorb nitrogen in autumn",
            "To prevent the product staining hard surfaces",
          ],
          correct: 1,
          explanation: "High nitrogen in autumn promotes lush, soft growth that is more susceptible to frost damage and disease (especially Rust). Autumn feeds are high-K for hardiness, with low N.",
        },
      ],
    },
  },
  {
    id: "treatment-programmes",
    title: "Treatment Programmes & Seasonal Services",
    description: "How our LTP, ETP and additional services are structured, what each service code means, and the seasonal timeline.",
    icon: "Calendar",
    emoji: "📋",
    category: "Shared Foundations",
    estimatedTime: "35 min",
    roles: ["technician", "office"],
    stage: "systems-workflows",
    isShared: true,
    lessons: [
      {
        id: "tp1",
        title: "LTP, ETP and What Each Code Means",
        duration: "12 min",
        content:
          "Shrekfeet offers two core treatment plans plus a range of additional services. Understanding the service codes is essential \u2014 they appear in SA5 on every customer account.\n\n**Professional Lawn Treatment Plan (LTP):**\nOur full programme \u2014 8 visits per year.\n- WIT \u2014 Winter Lawn Tonic\n- WIM \u2014 Winter Moss Control\n- SPN \u2014 Spring Nutrition\n- SPW \u2014 Spring Weed Control\n- SUN \u2014 Summer Nutrition\n- SUW \u2014 Summer Weed Control\n- ANM \u2014 Autumn Nutrition Mix\n- AUW \u2014 Autumn Weed Control\n\n**Essential Lawn Treatment Plan (ETP):**\nOur entry-level programme \u2014 3 visits per year.\n- WMC \u2014 Winter Moss Control\n- SPF \u2014 Spring Nutrition (feed)\n- SPC \u2014 Spring Weed Control\n\n**Wetting Agent Plan (WAP):**\n- WAE \u2014 Wetting Agent Drench (Early)\n- WAL \u2014 Wetting Agent Drench (Late)\n\nGranular wetting agent: applied at 20g/m² in spring. Helps water penetrate hydrophobic soils \u2014 particularly important on sandy and thatchy lawns.\n\n**Additional services (charged separately):**\n- AAA \u2014 Annual Autumn Aeration\n- Scarification, Overseeding (OVS), Top-Dressing (TD)\n- One-time moss control (OTM)\n- Grub X, Acelepryn, Nematodes\n- Hard Surface Treatments (HST)\n- Rejuvenate (fungicide/micronutrient product)\n- Wetting agents (one-time)\n\n**BIB/BUB (Bag it and Bin / Bag it and Bag):**\nScarification waste disposal. Before completing the job, go into the BIB/BUB service in SA5, modify the weighting to the number of waste bags, update the pricing, and send a call log to Joseph with the number of bags.",
      },
      {
        id: "tp2",
        title: "The Seasonal Timeline",
        duration: "12 min",
        content:
          "Our treatment calendar runs year-round. Knowing what's happening in each season helps you have better conversations with customers and understand why jobs are scheduled the way they are.\n\n**Autumn (end of October → Christmas break):**\nPrimary renovation season. ANM + AUW delivered to LTP customers. Scarification, aeration and overseeding campaigns run here. Leaves on lawns protocol in effect \u2014 assess whether leaves impact treatment effectiveness, check for 'No paid for leaf blowing' flag.\n\n**Winter (January–February):**\nWIT and WIM delivered. Lower activity \u2014 weather-dependent. Stock checks and equipment preparation. This is when the quarterly training sessions typically happen.\n\n**Spring (March–May):**\nSPN and SPW delivered. Key rule: if a customer has accepted overseeding (OVS), switch SPN to SPW \u2014 you cannot apply weed control until 42–56 days after seeding (grass must be established first). Weed control applied before establishment will damage seedlings.\n\n**Summer (June–August):**\nSUN and SUW. Wetting agents (WAL). Watch for drought stress \u2014 de-watered lawns should not receive herbicide treatments (poor uptake, risk of scorch). Summer is also prime time for disease pressure (Leaf Spot in hot humid spells).\n\n**Autumn renovation review:**\nAt the end of each autumn renovation season, all overseeding customers who didn't receive an OTM (one-time moss treatment) represent a potential add-on. After scarification, recommend an OTM \u2014 the lawn is clear and the moss has nowhere to hide.\n\n**Christmas break target (2025):**\nTechnicians aim to finish on Friday 19 December; return on Monday 5 January. Any remaining accrued hours paid at regular day rate in December salary.",
      },
      {
        id: "tp3",
        title: "Autumn Treatments in Detail",
        duration: "11 min",
        content:
          "Autumn is our most important treatment period. The services we deliver in autumn set the lawn up for the following year.\n\n**ANM (Autumn Nutrition Mix) product:**\n2-0-6 + 6Fe + trace elements (Mg, B, Cu, Mn, Mo, Zn)\n\nWhat each component does:\n- Nitrogen (2): minimal \u2014 avoids promoting soft growth before winter\n- Potassium (6): cell wall development, water retention, frost tolerance\n- Iron (6Fe): chlorophyll production, moss inhibition\n- Trace elements: support plant health through the dormant season\n\n**Autumn Weed Control:**\nUse up remaining weed control products in the Chem Store. Remember to order Enstar for winter. When with customers, remember to discuss how their lawn is likely to look next year and recommend services accordingly \u2014 this is key for retention and advance sales of renovation services.\n\n**Leaves on lawns (protocol):**\n1. Determine whether the number of leaves will impact treatment effectiveness\n2. Check the customer's account for the 'No paid leaf blowing' flag\n3. If the flag exists: do not blow leaves, treat as normal\n4. If no flag and you have time: blow leaves, add 'Leaf Blowing' service to their account and produce the service\n5. If no flag and you don't have time: mark the job as non-serviceable\n\n**Ensuring all autumn leaf customers have the 'Autumn Leaf Issues' flag:**\nAny customer who experiences autumn leaf problems should have this flag on their account \u2014 it helps the office spot recurring issues and plan accordingly.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "tp-q1",
          question: "What does 'LTP' stand for and how many treatment visits does it include per year?",
          options: [
            "Lawn Treatment Package \u2014 6 visits",
            "Professional Lawn Treatment Plan \u2014 8 visits",
            "Long-Term Programme \u2014 4 visits",
            "Lawn Treatment Protocol \u2014 12 visits",
          ],
          correct: 1,
          explanation: "LTP is the Professional Lawn Treatment Plan, covering 8 visits per year: WIT, WIM, SPN, SPW, SUN, SUW, ANM and AUW.",
        },
        {
          id: "tp-q2",
          question: "A customer on LTP accepts an overseeding (OVS) job. What happens to their SPN?",
          options: [
            "SPN is cancelled \u2014 no spring treatment needed",
            "SPN is delivered first, then OVS is added",
            "SPN is swapped to SPW (weed control) \u2014 weed control must wait 42–56 days post-seeding",
            "SPN is duplicated so the customer receives both nutrition and weed control",
          ],
          correct: 2,
          explanation: "When OVS is accepted, SPN becomes SPW. Weed control cannot be applied until 42–56 days after seeding \u2014 the grass must be established first or the seedlings will be damaged.",
        },
        {
          id: "tp-q3",
          question: "A customer's lawn has significant leaf coverage when you arrive for an autumn treatment. There is no 'No paid leaf blowing' flag on the account and you don't have time to clear them. What do you do?",
          options: [
            "Treat through the leaves \u2014 they won't make much difference",
            "Mark the job as non-serviceable and continue with your day",
            "Clear the leaves for free and treat \u2014 customer satisfaction comes first",
            "Call the office and wait for instructions before making any decision",
          ],
          correct: 1,
          explanation: "Without the 'No paid leaf blowing' flag and without time to clear them, the correct action is to mark the job as non-serviceable. The office will reschedule.",
        },
        {
          id: "tp-q4",
          question: "Why does the ANM autumn product have a very low nitrogen content (2-0-6)?",
          options: [
            "Autumn grass doesn't absorb nitrogen",
            "To reduce the cost of the product",
            "To avoid promoting soft, lush growth vulnerable to frost and disease before winter",
            "Because nitrogen causes iron staining on hard surfaces",
          ],
          correct: 2,
          explanation: "High nitrogen in autumn promotes soft growth that's vulnerable to frost damage and fungal disease. Autumn feeds are high-K for hardiness, low-N to avoid this risk.",
        },
      ],
    },
  },
  {
    id: "equipment-operation",
    title: "Equipment, Spraying & Application Prep",
    description: "The technician workflows for equipment readiness, safe spraying setup and accurate treatment preparation.",
    icon: "Wrench",
    emoji: "🔧",
    category: "Role-Specific",
    estimatedTime: "40 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "e1",
        title: "Pre-Use Equipment Checks",
        duration: "12 min",
        content:
          "Before any application or mechanical work, check equipment properly.\n\n1. Inspect tanks, hoses and nozzles \u2014 look for cracks, blockages or wear\n2. Confirm calibration and output settings \u2014 recalibrate every time you change a nozzle or fix the sprayer\n3. Check fuel, battery and general mechanical condition for power equipment\n4. Verify labels and materials match the day plan\n5. Confirm PPE is correct for the products being used\n\nDo not use equipment that is leaking, damaged or unverified. If something sounds or feels wrong mid-job, stop, turn the machine off, and diagnose before continuing.",
      },
      {
        id: "e2",
        title: "Calibration and Application Accuracy",
        duration: "15 min",
        content:
          "Treatment accuracy protects results, compliance and customer trust. You must calibrate every time you change a nozzle, fix your sprayer, or change application conditions.\n\n**Knapsack calibration procedure:**\n1. Measure a 10m × 1m strip\n2. Time how long it takes to walk the strip at your normal spraying pace\n3. Spray clean water into a measuring jug for the same time at the same pressure\n4. Multiply up to find litres per 100m² \u2014 compare against the label rate\n5. Adjust nozzle, pressure or pace until output matches the label\n\n**Granular application:**\nSpread calibration should be verified before each job \u2014 especially if you've changed the hopper or spreader settings. Apply a test run over a measured area and weigh the output.\n\n**Under-applying** wastes the visit and may not deliver the desired result. **Over-applying** can scorch the lawn, breach label rules, and is illegal under PPP regulations.",
      },
      {
        id: "e3",
        title: "Post-Treatment Equipment Care and Stock",
        duration: "13 min",
        content:
          "After work is complete, equipment must be cleaned, stored and logged.\n\n**End-of-day equipment care:**\n- Rinse sprayer tanks and hoses with clean water (triple-rinse where required by product label)\n- Store chemical products securely in the designated Chem Store \u2014 never in unsecured locations\n- Report any faults or wear that needs addressing before the next day\n- Refill fertiliser and chemical stocks as needed before leaving\n\n**Van stock management:**\n- Every time you take stock from the unit, fill in the stock form: forms.monday.com (link in your onboarding pack)\n- Every Monday morning: complete the van stock count form (wkf.ms/3VYQHDE)\n- These forms are part of your P&P deliverables (record keeping)\n- Eventually, calibrations will also be formally recorded \u2014 start building the habit now\n\n**Fuel card:**\nYour fuel card is issued in your name. Use only at your designated Esso garage. Personal use of the fuel card is gross misconduct.",
      },
    ],
  },

  // ─── STAGE 4: FIELD OPERATIONS / ADVANCED ──────────────────────────────────
  {
    id: "operational-standards",
    title: "Operational Standards & Field Scenarios",
    description: "The day-to-day processes, protocols and decision-making expected from every Shrekfeet employee in the field.",
    icon: "ClipboardList",
    emoji: "⭐",
    category: "Shared Foundations",
    estimatedTime: "55 min",
    roles: ["technician", "office"],
    stage: "advanced-operations",
    isShared: true,
    lessons: [
      {
        id: "os1",
        title: "Communication is King",
        duration: "10 min",
        content:
          "The single most consistent message across all Shrekfeet training: proactive communication prevents almost every operational problem.\n\n**The rule:** always cover what the other person will ask before they need to ask it.\n\n**In practice \u2014 for technicians:**\n- If you're going to be late: call before you're late, not after\n- If a job has taken longer than expected: call the office before the affected customers call in\n- If you've found an issue at a property: message the WhatsApp group or Harry/Joseph directly while on site \u2014 don't wait until debrief\n- If you can't complete all visits: review your schedule after lunch, not at end of day\n\n**In practice \u2014 for office staff:**\n- If a reschedule affects other appointments: notify the customer before they expect the visit\n- If a complaint is logged: chase for resolution, don't wait for the customer to call back\n- If a technician flags a problem on a lawn: update the account before the customer calls with a question\n\n**Why it matters:**\nCustomers leave when they feel out of the loop. A proactive call from us \u2014 even with bad news \u2014 is infinitely better than a frustrated customer who had to chase us for information.",
      },
      {
        id: "os2",
        title: "Managing Non-Serviceable Jobs",
        duration: "12 min",
        content:
          "A non-serviceable job is any visit you cannot complete as scheduled. Handling these correctly protects the customer relationship and gives the office what they need to reschedule effectively.\n\n**When you think you won't make all your visits:**\n1. After lunch, review your schedule \u2014 not at the end of the day\n2. Identify customers you are unlikely to reach\n3. Check each customer's account for a 'Promised' tag \u2014 these are priority\n4. If uncertain about priorities, call the office \u2014 we'll tell you who to prioritise\n5. One exception: if you have two jobs (one LSV, one 'Promised'), prioritise the 'Promised'\n6. Call affected customers as soon as possible:\n   - If no answer: Voicemail → Text → Ask the office to email\n7. Raise a 'Call Log' for Joseph that includes:\n   - Reasoning why (never say 'too much work scheduled' \u2014 say 'previous jobs took longer than expected')\n   - What you've done (calls made, voicemail left, etc.)\n   - Any dates or customer requirements from your call\n8. Mark the job as non-serviceable in SA5\n\n**Same process applies towards end of day** \u2014 do this as early as possible, not at 5pm.",
      },
      {
        id: "os3",
        title: "Common Field Scenarios",
        duration: "15 min",
        content:
          "These scenarios come up regularly. Know the process before you face them on a customer's property.\n\n**Partial treatment (e.g. locked rear gate):**\n1. Mark the job as complete\n2. In technician notes, write which lawn was treated and state you will return for the other\n3. Send a call log to the office stating which lawns were partially treated and which still need treating\n4. The office creates a service call for a return visit and treats it as a lockout under T&Cs\n\n**Equipment failure:**\n1. Turn the machine off and diagnose the issue\n2. Attempt to repair in a safe place if possible\n3. If completely non-functional: call the office \u2014 explain what happened, the lawn progress, what you've tried, and how this affects your day\n4. Office will check if alternative equipment can be arranged\n5. If not possible: apologise to the customer, mark as incomplete \u2014 'Equipment failure', call any other affected customers\n\n**Equipment making unusual noises:**\nTurn it off. Diagnose. If it still sounds unsafe after repair attempts \u2014 stop using it immediately. Same process as above.\n\n**Leaves on lawns:**\nSee the Treatment Programmes module \u2014 follow the three-step protocol (assess, check flag, blow or mark non-serviceable).\n\n**Raise a flag \u2014 unknown lawn condition:**\n1. Arrive → inspect lawn → identify issue you cannot diagnose\n2. Take photos\n3. Dig a hole to inspect the soil profile\n4. Message the WhatsApp group or Harry/Joseph directly while on site\n5. If still unsure: raise a flag condition code in SA5 and be honest with the customer ('We've identified an issue, we're investigating and will be in touch')\n6. Summarise findings and actions in job notes, mark as complete",
      },
      {
        id: "os4",
        title: "Terms & Conditions and Customer Protocols",
        duration: "10 min",
        content:
          "Knowing our T&Cs protects you, the customer and the business. These are the key points every employee should know.\n\n**Lockouts:**\n- First lockout: customer receives a written warning\n- Repeated lockouts: standard charge applies (50% of the service price)\n\n**Dog faeces:**\n- More than 3 faeces per 100m²: we reserve the right to cancel the treatment and apply standard charge\n\n**Fallen leaves:**\n- If significant leaf coverage and technician doesn't have time to clear: standard charge applies\n\n**Furniture and toys on the lawn:**\n- We treat around them and charge 100%\n- If items restrict access to the lawn: standard charge\n\n**Cancellation of scheduled work:**\n- Must be done outside a 3-day window from the service date\n- Failure to cancel in time: standard charge applies\n\n**Cancellation of services (within 12 months):**\n- We charge the sum of remaining payments due, or £100, whichever is lowest\n\n**Standard charge = 50% of the service price**\n\nWhen services are activated on a customer's account, this commences the agreement of our Terms & Conditions. The customer does not need to sign a separate document \u2014 account activation is acceptance.",
      },
      {
        id: "os5",
        title: "Estimates, Condition Codes and Stock",
        duration: "8 min",
        content:
          "Two operational disciplines every technician must get right: estimate management and stock recording.\n\n**Estimate status codes:**\n- Status 0 \u2014 No Status: DO NOT USE\n- Status 1 \u2014 Estimated Printed: the office has already discussed the service with the customer. The estimate exists to inform you that the customer has been briefed.\n- Status 2 \u2014 Gave Estimate: sends automated follow-up emails confirming the price. Use when you have NOT had a verbal conversation with the customer.\n- Status 3 \u2014 Gave Estimate (Call Customer): same as Status 2, but flags the office to call the customer because you've already had a verbal conversation about it.\n\n**Important:** estimate services must be raised manually. Condition codes no longer auto-generate estimates \u2014 this was changed because it created inaccurate pipeline data.\n\n**Top-Rated Lawn condition code:**\nFlag any lawn that looks exceptional. The office uses these to request reviews, referrals and social media content. If we gain a review from a flagged lawn, the technician receives a share of the review bonus.\n\n**Van stock:**\n- Take stock from the unit? Fill in the form immediately.\n- Every Monday morning: complete the van stock count (wkf.ms/3VYQHDE).\n- These are P&P deliverables \u2014 they count toward your performance assessment.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "os-q1",
          question: "You realise at 2pm that you won't complete all your visits. What should you do first?",
          options: [
            "Finish your current jobs and call customers at end of day",
            "Call the office immediately so they can cancel the remaining visits",
            "Review your schedule, identify customers you won't reach, check for 'Promised' tags, then call affected customers as early as possible",
            "Skip lunch and try to complete all jobs",
          ],
          correct: 2,
          explanation: "The process: review after lunch, identify at-risk visits, check for Promised tags, call affected customers early. Never wait until end of day.",
        },
        {
          id: "os-q2",
          question: "You arrive at a property and the rear gate is locked. You treat the front but can't access the back. What do you log?",
          options: [
            "Mark the job as non-serviceable and leave",
            "Mark the job as complete, note in tech notes which lawns were treated, send a call log to the office about the partial treatment",
            "Mark the job as complete without notes \u2014 the office will figure it out",
            "Call the customer, and if they don't answer, don't treat any part of the lawn",
          ],
          correct: 1,
          explanation: "Mark complete, note which lawns were treated in tech notes, and send a call log to the office. They'll create a return service call and process it as a lockout.",
        },
        {
          id: "os-q3",
          question: "What is the standard charge applied to lockouts and similar service disruptions?",
          options: ["25% of the service price", "50% of the service price", "100% of the service price", "A flat £50 charge"],
          correct: 1,
          explanation: "Standard charge is 50% of the service price. It applies to repeated lockouts, excessive dog faeces, fallen leaves (without time to clear), access blockages and missed cancellation windows.",
        },
        {
          id: "os-q4",
          question: "What does Estimate Status 3 mean?",
          options: [
            "Do not use \u2014 reserved for the office",
            "The office has printed an estimate; use this to inform yourself that the customer has been briefed",
            "You have had a verbal conversation with the customer \u2014 office needs to call to follow up",
            "The customer has rejected the estimate",
          ],
          correct: 2,
          explanation: "Status 3 (Gave Estimate \u2014 Call Customer) works the same as Status 2 (sends follow-up emails) but also flags the office to make a follow-up call because you've had a verbal conversation with the customer about the service.",
        },
        {
          id: "os-q5",
          question: "When should you fill in the van stock form?",
          options: [
            "Once per week, on Monday mornings",
            "Every time you take stock from the unit AND every Monday morning for the weekly van stock count",
            "Only when you've used an entire product \u2014 not for partial use",
            "At the end of each month for the monthly review",
          ],
          correct: 1,
          explanation: "Two triggers: (1) every time you take stock from the unit \u2014 fill the form immediately; and (2) every Monday morning \u2014 complete the full van stock count.",
        },
      ],
    },
  },
  {
    id: "weed-treatment",
    title: "Weed Treatment & Spraying Basics",
    description: "The practical service knowledge technicians need for treating weeds safely, effectively and consistently.",
    icon: "Sprout",
    emoji: "🌾",
    category: "Role-Specific",
    estimatedTime: "35 min",
    roles: ["technician"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "wt1",
        title: "When Weed Treatments Should Be Applied",
        duration: "12 min",
        content:
          "Not every weed problem should be treated immediately. Consider timing, growth stage, weather and lawn condition.\n\n**Weather window for liquid herbicides:**\n- Temperature ideally 10–20°C; below 8°C uptake is poor, above 25°C risks scorch\n- No rain forecast for 6 hours (some products need 12–24 hours \u2014 check the label)\n- Low wind (under ~10 mph) to prevent drift\n- Dry leaves at application\n\n**Avoid treating:**\n- Drought-stressed lawns (weeds not actively growing; risk of scorch)\n- Newly seeded areas (wait 42–56 days after seeding)\n- Frozen or frost-covered ground\n\n**Best seasons:** spring (April–June) and early autumn (September) are prime windows.",
      },
      {
        id: "wt2",
        title: "Targeting Weeds and Recording Results",
        duration: "12 min",
        content:
          "Accurate weed control starts with accurate ID. Before applying anything, name what you're treating.\n\n**Common scenarios:**\n- Patchy infestation: spot spray is more appropriate than broadcast\n- Whole-lawn broadleaf pressure: knapsack with selective herbicide\n- Resistant weeds (speedwell, yarrow): combination product required, expect 2–3 treatments\n- Clover: treat AND feed \u2014 without nitrogen, clover returns\n\n**After treatment:**\nRecord what was applied, weather conditions, lawn response expected (yellowing within 1–3 weeks for systemic), and whether a revisit may be needed. Set realistic customer expectations \u2014 systemic herbicides take 1–3 weeks to show visible kill.",
      },
      {
        id: "wt3",
        title: "Spray Drift Awareness",
        duration: "11 min",
        content:
          "Spray drift is a serious compliance and liability issue. Any non-target contamination \u2014 neighbouring flower beds, vegetable gardens, ponds, ornamental plants \u2014 is a problem.\n\n**Preventing drift:**\n- Always check wind speed before spraying \u2014 over ~10 mph, postpone\n- Use low-drift nozzles on windy days\n- Keep the nozzle close to the target surface\n- Never spray near watercourses, drains or ornamental planting without appropriate precautions\n- Calibrate every time conditions change\n\n**If drift occurs:**\n- Log it in SA5 immediately\n- Inform the office the same day\n- Do not attempt to manage a neighbour complaint yourself \u2014 escalate immediately",
      },
    ],
  },
  {
    id: "pa1-pa6",
    title: "PA1 & PA6 Awareness",
    description: "Certification, compliance and safe working expectations around pesticide application work.",
    icon: "ShieldCheck",
    emoji: "🪪",
    category: "Role-Specific",
    estimatedTime: "30 min",
    roles: ["technician"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "pa1",
        title: "What PA1 and PA6 Cover",
        duration: "10 min",
        content:
          "PA1 and PA6 are the two core pesticide certifications for UK lawn technicians. Both are required before you can apply professional plant protection products unsupervised.\n\n**PA1 \u2014 Foundation Pesticide Application (theory)**\nCovers the legal framework, risk assessment, environmental protection, product labelling and safe use principles. Underpins all other PA modules.\n\n**PA6 \u2014 Handheld Applicators (practical)**\nCovers the safe use of knapsack sprayers and handheld trigger sprayers \u2014 the equipment you'll use on domestic lawns every day.\n\n**Legal position:**\nAnyone born after 31 December 1964 must hold valid PA certification to apply professional plant protection products. Spraying without it on a customer's property is an offence under the Plant Protection Products (Sustainable Use) Regulations.\n\nShrekfeet books and pays for these. We expect you to prepare and take them seriously.",
      },
      {
        id: "pa2",
        title: "Working Within Competence",
        duration: "10 min",
        content:
          "No technician should carry out work they are not trained, authorised or equipped to do.\n\n**Principles:**\n- Know the limits of your certification \u2014 PA6 covers handheld equipment, not vehicle-mounted booms (that's PA2)\n- Ask before stepping beyond your training\n- Do not improvise with chemicals or equipment\n- Follow supervisor direction and company process\n\n**BASIS Lawn Assured:**\nBASIS is the industry body for responsible pesticide use. Shrekfeet operates to BASIS standards. This demonstrates to customers that we know what we're doing and do it safely \u2014 it's a differentiator when talking to customers on lawn surveys.",
      },
      {
        id: "pa3",
        title: "Record Keeping and Compliance",
        duration: "10 min",
        content:
          "Records kept for every PPP application (legally required, retained for 3 years):\n- Date and time\n- Product name and MAPP number\n- Active ingredient and rate applied\n- Area treated and total quantity used\n- Operator name and certification number\n- Weather conditions at time of application\n- Target pest/weed\n\n**Spill response:**\n1. Contain immediately with absorbent material (sand, spill kit)\n2. Never wash into a drain or watercourse\n3. Report internally and, if significant, to the Environment Agency\n\nThe standard: if you cannot show the record, the work did not happen from a compliance perspective.",
      },
    ],
  },
  {
    id: "office-call-handling",
    title: "Telephone Call Handling & Front Desk",
    description: "The basics of answering calls well, guiding conversations and giving customers confidence from the first minute.",
    icon: "Phone",
    emoji: "📞",
    category: "Role-Specific",
    estimatedTime: "35 min",
    roles: ["office"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "oc1",
        title: "Answering Calls Professionally",
        duration: "12 min",
        content:
          "The first ten seconds of a call set the tone for everything that follows.\n\n**Answer within 3 rings where possible** \u2014 customers notice when calls go unanswered.\n\n**Opening the call:**\n- Clear greeting + company name + your name\n- Calm, ready-to-help tone \u2014 never sound like the customer is interrupting you\n- Smile while speaking \u2014 it genuinely affects how your voice sounds\n\n**Use the customer's name** as soon as you've found their account in SA5. It changes the dynamic of the conversation immediately.\n\n**Listen fully before jumping to a solution.** Customers want to feel heard before they want to be fixed. Acknowledge the concern first, then move to the resolution.\n\n**Common call types:**\n- Treatment questions ('Is it safe to let my dog out?', 'Why has my lawn gone yellow?')\n- Booking changes and reschedules\n- Complaints and callbacks\n- Payment queries\n- New customer enquiries",
      },
      {
        id: "oc2",
        title: "Guiding and Closing the Conversation",
        duration: "11 min",
        content:
          "A good call handler leads the conversation without sounding scripted. Your goal is accurate information gathered efficiently, with the customer feeling looked after.\n\n**Gathering information:**\n- Name and address (locate the account in SA5 early \u2014 it gives you context for everything they say)\n- The reason for the call\n- Any urgency or deadline\n- Preferred next step\n\n**Handling complaints:**\n- Log in SA5 immediately, even if unresolved\n- Acknowledge, apologise where appropriate, action\n- Escalate to Operations Manager if you can't resolve on the call\n- Never promise a specific technician or exact arrival time unless confirmed in SA5\n\n**Closing every call:**\nAlways confirm what happens next before hanging up.\n'I'll reschedule that for next Tuesday and you'll receive a text confirmation.' is infinitely better than 'we'll sort that out for you.'\n\nVague closings create callbacks. Specific closings build confidence.",
      },
      {
        id: "oc3",
        title: "Transfers, Hold and Escalation",
        duration: "12 min",
        content:
          "If you need to place someone on hold or transfer them, do it with confidence and clear communication.\n\n**Before putting on hold:**\n- Explain why\n- Give a realistic wait time\n- Return as promised \u2014 if it's taking longer, check back in\n\n**Transferring:**\n- Pass all relevant context to the receiving person before the customer speaks to them\n- The customer should never have to repeat their story from scratch\n\n**Escalation to Harry (Operations Manager):**\n- Complaints you cannot resolve\n- Safeguarding concerns\n- Property damage claims\n- Any HR-related customer contact\n\n**Escalation to Ian (MD):**\n- Serious service failures\n- Legal or regulatory queries\n- Media or public complaints",
      },
    ],
  },
  {
    id: "service-assistant",
    title: "Service Assistant & Key Office Systems",
    description: "The key office systems used to track customer information, log visits and coordinate scheduling.",
    icon: "FileText",
    emoji: "🗂️",
    category: "Role-Specific",
    estimatedTime: "40 min",
    roles: ["office"],
    stage: "advanced-operations",
    lessons: [
      {
        id: "sa1",
        title: "SA5 Day to Day",
        duration: "15 min",
        content:
          "Service Assistant 5 (SA5), built on the RealGreen platform, is the single source of truth for all job management at Shrekfeet. Everything lives here: customer accounts, job history, visit notes, condition codes, flags, estimates and call logs.\n\n**Core tasks in SA5:**\n- Review customer history before and after calls\n- Add clear visit and call notes\n- Raise and update estimates (Status 1/2/3)\n- Log call logs for technician actions\n- Set and check account flags ('Promised', 'No paid leaf blowing', etc.)\n- Update service statuses (complete, non-serviceable, incomplete)\n\n**The rule:** if it happened and it's not in SA5, it didn't happen as far as the business is concerned. Every customer interaction \u2014 call, visit, complaint, recommendation \u2014 must be logged.",
      },
      {
        id: "sa2",
        title: "Scheduling and Route Management",
        duration: "15 min",
        content:
          "The office team (led by Joseph) owns scheduling. Understanding how routes and job timing work helps you handle customer queries and rescheduling calls correctly.\n\n**Key scheduling principles:**\n- Leigh/Joseph reviews workload at lunchtime \u2014 technicians with excess load are identified early\n- 'Promised' tag: flags a customer who has been rescheduled and promised a visit \u2014 these are priority\n- LSV (Lawn Survey Visit): if you have both an LSV and a 'Promised' job, prioritise Promised\n- Rescheduled visits are flagged in SA5 so technicians know which lawns need treating on their return\n\n**Supporting technicians:**\nWhen a technician raises a call log, the office uses it to delay instalments, identify suitable reschedule slots and mark the rescheduled visit as 'Promised'.",
      },
      {
        id: "sa3",
        title: "Other Systems: Email, VoIP and Finance",
        duration: "10 min",
        content:
          "Beyond SA5, the office team uses several other systems day-to-day.\n\n**Email:**\nCustomer correspondence goes through the shared office inbox. All significant correspondence should be logged or summarised in SA5 so there's a single customer record.\n\n**VoIP telephone system:**\nWe use a hosted VoIP system. Learn how to handle call queues, transfers and voicemail \u2014 ask during your first week for a walk-through of the specific system in use.\n\n**Finance/invoicing:**\nPayment queries, direct debit mandates, invoice generation. Training will be provided \u2014 ask Harry or Ian to arrange this in your first month.\n\n**This intranet:**\nHow-to guides, seasonal calendar, supplier directory, policies and condition code references. It's designed to be your day-to-day reference \u2014 bookmark it.",
      },
    ],
  },

  // ─── STAGE 5: LAWN KNOWLEDGE ────────────────────────────────────────────────
  {
    id: "lawn-diseases",
    title: "Lawn Diseases",
    description: "How to identify, understand and recommend treatment for the most common UK lawn diseases \u2014 from Red Thread to Fusarium Patch.",
    icon: "AlertTriangle",
    emoji: "🔴",
    category: "Role-Specific",
    estimatedTime: "50 min",
    roles: ["technician"],
    stage: "specialist-knowledge",
    lessons: [
      {
        id: "ld1",
        title: "Red Thread and Fairy Rings",
        duration: "17 min",
        content:
          "**Red Thread (Laetisaria fuciformis)**\n\nScientific name: Laetisaria fuciformis\nPlants affected: all turf grasses; red fescues are most susceptible\nMain symptoms: brown patches with distinctive red, thread-like fungal growth\nTiming: year-round, but more common in early spring and autumn\n\nBiology:\n- Lives in the soil for up to 2 years\n- Spreads via airborne or waterborne spores, and on contaminated tools or shoes\n- Requires prolonged leaf wetness to establish infection (wet summer, heavy autumn dews)\n\nKey facts:\n- Rarely kills the grass completely \u2014 affected patches will recover with appropriate action\n- Red fescue varieties are most likely affected, but it can attack any grass\n\nPrevention:\n- Preventive fungicide to reduce risk\n- Aeration and scarification to improve airflow through the sward\n- Soil conditioners to boost the plant's defence system\n\nCurative treatment:\n- Nitrogen (to help grass recover and outcompete the fungus)\n- Micronutrients (to ensure macro access)\n- Liquid iron (to dry out spores)\n- Rejuvenate (our curative product)\n\n---\n\n**Fairy Rings (Marasmius oreades and other fungi)**\n\nScientific name: Marasmius oreades and related fungi\nMain symptoms: circular or arced rings of dead/lush grass, often with toadstools\nTiming: year-round, more common in late summer and autumn\n\nBiology:\n- Airborne spores from toadstools form colonies below ground in the rootzone\n- Mycelium spreads outwards (dying in the centre), growing by approximately 30cm per year\n- The fungus is water-repellent \u2014 creates hydrophobic soil in the ring\n\nKey facts:\n- The fungus itself is harmless to grass plants \u2014 the problem is the water-repellent soil it creates and the toadstools\n- The rings are permanent and expand each year without intervention\n\nPrevention and curative:\n- Annual aeration and wetting agents \u2014 the most effective management approach",
      },
      {
        id: "ld2",
        title: "Rust, Leaf Spot and Fusarium Patch",
        duration: "18 min",
        content:
          "**Rust (Puccinia species and others)**\n\nMain symptoms: patches of grass turn yellow; orange/rust-coloured pustules on leaf surfaces\nTiming: all year round, but more common in late summer and autumn\n\nBiology:\n- Airborne spores require several hours of damp, wet conditions to germinate\n- Large numbers of spore-producing pustules break through leaf surfaces\n- Spores can transfer and stain footwear, skin and clothes\n\nKey facts:\n- Rust does not usually kill the grass, but severely affected leaves can brown and shrivel\n\nPrevention:\n- Regular feeding (well-fed grass is less susceptible)\n- Avoid high-nitrogen fertilisers in autumn \u2014 the resultant soft growth is more prone to attack\n- Mow regularly and remove clippings to reduce affected leaves\n- Improve air circulation by pruning overhanging trees/shrubs\n\nCurative: liquid iron to dry out spores\n\n---\n\n**Leaf Spot (Bipolaris, Curvularia and Drechslera species)**\n\nMain symptoms: minor infections \u2014 lesions on leaves; severe infections \u2014 thin sward, dieback and patches of very weak grass\nTiming: during summer, when temperatures are high; humid conditions trigger outbreaks\n\nPrevention:\n- Regular thatch removal\n- Improve airflow through the sward\n- Raise mowing height and wash blades regularly\n- Preventive fungicide\n\nCurative: nitrogen + micronutrients + Rejuvenate\n\n---\n\n**Fusarium Patch / Snow Mould (Microdochium nivale)**\n\nMain symptoms: first noticed as small patches of yellow, dying grass that turn brown and expand up to 30cm in diameter, often merging. In wet conditions, white or pinkish cottony growth appears around the perimeter.\nTiming: between late autumn and spring\n\nBiology: spreads rapidly in cold, wet, still conditions \u2014 hence the nickname 'Snow Mould' (common after heavy snowfall)\n\nKey facts:\n- First appears as small tennis ball-sized yellow patches that can grow to dinner plate size\n- Can be dangerously devastating to lawns if left unmanaged\n- More common in golf courses but occurs in domestic lawns \u2014 do not ignore it\n\nPrevention:\n- Raise mowing height where possible\n- Remove excess thatch regularly\n- Aerate compacted lawns\n- Improve airflow through the lawn\n- Preventive fungicide\n\nCurative: nitrogen + micronutrients + liquid iron + Rejuvenate",
      },
      {
        id: "ld3",
        title: "Other UK Lawn Diseases",
        duration: "15 min",
        content:
          "**Anthracnose**\nMost common in bent grass and Poa annua. Causes both foliar blight and basal stem rot. Grass appears bronze/orange. Most common in summer. Causes: poor airflow, excess thatch, shade, foot traffic, drought.\nControl: improve soil conditions, preventive fungicide.\n\n**Dollar Spot**\nCauses small silver dollar-sized patches of brown/yellow grass. Mostly found in closely mown grasses \u2014 golf courses are most affected, but can occur in domestic lawns.\nCauses: poor airflow, excess thatch, shade, foot traffic, drought.\nControl: regular thatch removal, regular aeration, correct watering regime, fungicide.\n\n**Necrotic Ring Spot**\nDifficult to diagnose due to similarities with other patch diseases and pest problems. Can kill grass. Look for light-green patches, straw-coloured rings and root rot \u2014 it is primarily a root disease.\nCauses: poorly aerated soil, irregular irrigation.\nControl: regular aeration, correct watering regime.\n\n**Powdery Mildew**\nWhite powdery substance appears on the upper surface of leaves, increasing in density. Really severe outbreaks turn lawns a dull white.\nCauses: damp, shaded conditions.\nControl: improve airflow, prune overhanging trees/shrubs to let more light through.\n⚠️ DO NOT treat with fungicides or fertilisers \u2014 this can make the problem significantly worse.\n\n**Slime Mould**\nCompletely harmless. Varies greatly in size, colour and form. Creates fragile, spore-producing structures that disintegrate when touched. Appears overnight and may disappear the next day.\nCauses: lack of nutrition in the soil.\nControl: none required.\n\n**Take All Patch**\nSoil-dwelling fungus, very damaging to bent grasses. Causes serious root rot \u2014 roots blacken and decay. Creates patches/rings of browning grass.\nCauses: high-alkaline water, excessive thatch, poor drainage, lack of manganese.\nControl: avoid increasing pH, regular aeration/scarification.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "ld-q1",
          question: "Which grass variety is most susceptible to Red Thread?",
          options: ["Perennial ryegrass", "Red fescue", "Annual meadow grass (Poa annua)", "Creeping bent"],
          correct: 1,
          explanation: "Red fescues are the most susceptible to Red Thread (Laetisaria fuciformis), though it can attack any grass variety.",
        },
        {
          id: "ld-q2",
          question: "What makes Fairy Rings problematic for lawns, beyond the visible rings?",
          options: [
            "The toadstools release toxins that kill grass roots",
            "The fungal mycelium creates hydrophobic (water-repellent) soil within the ring",
            "The fungus prevents nutrient uptake by blocking soil pores",
            "The rings spread disease to neighbouring plants",
          ],
          correct: 1,
          explanation: "The fairy ring fungus is not directly toxic to grass \u2014 the problem is that it creates water-repellent (hydrophobic) soil, preventing water and nutrient penetration.",
        },
        {
          id: "ld-q3",
          question: "Fusarium Patch is also commonly known as:",
          options: ["Red Death", "Snow Mould", "Autumn Scorch", "Turf Wilt"],
          correct: 1,
          explanation: "Fusarium Patch (Microdochium nivale) is commonly called Snow Mould because it is particularly common following heavy snowfall in cold, wet conditions.",
        },
        {
          id: "ld-q4",
          question: "A customer's lawn has patches of white powdery material on the grass blades. What should you NOT do?",
          options: [
            "Improve airflow by pruning overhanging trees",
            "Apply a preventive fungicide or fertiliser",
            "Recommend reducing shade on the lawn",
            "Photograph the issue and raise a flag",
          ],
          correct: 1,
          explanation: "Powdery Mildew must NOT be treated with fungicides or fertilisers \u2014 this makes the condition significantly worse. Improving airflow and reducing shade are the correct approaches.",
        },
        {
          id: "ld-q5",
          question: "Which disease is described as 'completely harmless', appears overnight and requires no treatment?",
          options: ["Dollar Spot", "Take All Patch", "Slime Mould", "Anthracnose"],
          correct: 2,
          explanation: "Slime Mould is completely harmless to grass, creates fragile spore-producing structures that disintegrate when touched, and may appear and disappear within 24 hours. No control is required.",
        },
      ],
    },
  },
  {
    id: "lawn-health",
    title: "Lawncare Awareness for Office Staff",
    description: "Enough lawncare knowledge to triage customer calls, explain our services and support the field team with confidence.",
    icon: "Leaf",
    emoji: "💚",
    category: "Shared Knowledge",
    estimatedTime: "35 min",
    roles: ["office"],
    stage: "lawn-knowledge",
    isShared: false,
    lessons: [
      {
        id: "l1",
        title: "Treatment Services \u2014 What They Are and What to Say",
        duration: "12 min",
        content:
          "When customers call about their treatments, they often ask what a product does or why their lawn looks a certain way. You don't need to be a botanist \u2014 but you do need to know the key talking points.\n\n**After a liquid iron treatment:**\nThe lawn may briefly look darker or have yellow-green discolouration. Iron improves chlorophyll production and is also used to control moss. If moss is present, it will blacken after treatment \u2014 this is normal and expected. The moss should then be raked out (by scarification).\n\n**After weed control:**\nWeeds die over 1–3 weeks \u2014 they don't disappear overnight. Some initial wilting and yellowing of weeds is expected. The grass itself may temporarily look slightly tired but should recover with the next mowing cycle.\n\n**After scarification:**\nThe lawn will look significantly worse before it looks better. Scarification removes dead material and opens up the sward \u2014 for 2–4 weeks, the lawn can look thin and patchy. This is completely normal. Overseeding follows to fill the gaps.\n\n**After aeration:**\nSmall plugs of soil will be on the surface of the lawn. These are topdressed or left to break down naturally. They are not damage \u2014 they're evidence the work was done.",
      },
      {
        id: "l2",
        title: "Seasonal Customer Call Patterns",
        duration: "12 min",
        content:
          "Customer enquiries follow predictable seasonal patterns. Knowing what's coming helps you prepare better answers.\n\n**Spring (March–May):**\n- 'Why hasn't my technician been yet?' \u2014 spring treatments follow the programme schedule\n- 'Why is there still moss?' \u2014 winter moss control will be raked out during spring or a scarification may be needed\n- 'When will my new seed germinate?' \u2014 typically 7–14 days in good spring conditions; establishment takes 4–6 weeks\n\n**Summer (June–August):**\n- 'My lawn has gone yellow/brown \u2014 is it dead?' \u2014 almost certainly drought stress, not dead; explain rehydration timelines\n- 'Why aren't you treating my lawn?' \u2014 some customers skip summer treatments on ETP; check their plan\n\n**Autumn (September–November):**\n- 'When are you doing the aeration/scarification?' \u2014 these are renovation season jobs, typically Sep–Nov\n- 'The technician left the lawn in a terrible state!' \u2014 post-scarification appearance is temporarily very rough\n\n**Winter:**\n- 'Why haven't you visited since November?' \u2014 winter tonic/moss is typically Jan–Feb; check their programme",
      },
      {
        id: "l3",
        title: "Common Customer Lawn Problems and How to Respond",
        duration: "11 min",
        content:
          "Customers often call with a described problem rather than a service request. Your job is to gather enough information to log the issue accurately and set the right next step.\n\n**'My lawn has brown patches':**\nCould be: drought stress, disease (Red Thread, Fusarium), grub damage, leatherjacket damage, or chemical scorch. Ask: when did it appear? Is it spreading? What's been done recently? Has it been dry? Log it, raise a callback flag for a technician, or schedule a survey.\n\n**'There's something red/pink in the grass':**\nAlmost certainly Red Thread. Not immediately dangerous to the lawn \u2014 the grass will recover. Flag for the technician on the next visit to recommend Rejuvenate.\n\n**'My grass is going yellow':**\nPossible causes: low nitrogen (hungry lawn), drought stress, waterlogging, or iron/manganese lockout in high pH soil. Log the description, note the season, flag for technician assessment.\n\n**'Mushrooms have appeared in the lawn':**\nFairy Rings or general soil fungi \u2014 both usually harmless. Reassure the customer, log it, flag for technician to inspect on next visit.",
      },
    ],
  },
  {
id: "weed-control-mastery",
    title: "Weed Control \u2014 Application and Mastery",
    description:
      "A complete grounding in how weed control actually works \u2014 biology, identification, control methods, herbicide families, application craft and integrated decision-making.",
    icon: "Sprout",
    emoji: "🌿",
    category: "Shared Knowledge",
    estimatedTime: "1 h 25 min",
    roles: ["technician", "office"],
    stage: "specialist-knowledge",
    isShared: true,
    lessons: [
      {
        id: "wc7",
        title: "Mechanical and Manual Control",
        duration: "10 min",
        content:
          "For small infestations or chemical-sensitive sites, physical removal is often the right call.\n\n**Hand-pulling / weeding knife:**\nBest for tap-rooted weeds (dandelion, dock, plantain) when soil is moist. Must remove the whole root \u2014 broken tap roots regenerate. Refill the hole and overseed.\n\n**De-heading:**\nCrucial for annuals \u2014 remove seed heads before they ripen. Mowing before flowering achieves the same result.\n\n**When mechanical is the right choice:**\n- Customer prefers chemical-free\n- Near ponds, edible plants or ornamental beds\n- Very small infestations where spraying would be excessive\n\n**Limitations:** ineffective on mat-formers and rhizomatous weeds; useless on heavy infestations.",
      },
      {
        id: "wc8",
        title: "Chemical Control \u2014 How Herbicides Work",
        duration: "15 min",
        content:
          "**By selectivity:**\n- Selective \u2014 kills certain plants while leaving others. The bulk of lawn herbicides.\n- Non-selective (total) \u2014 kills everything green. Only for full renovation, never on an active lawn.\n\n**By movement:**\n- Systemic \u2014 absorbed and translocated through the plant, killing roots as well as leaves. Slower (1–3 weeks) but kills the whole weed. Essential for perennials.\n- Contact \u2014 kills only tissue it touches. Fast visible result but weeds regrow from root.\n\n**By timing:**\n- Pre-emergent \u2014 applied before weed seeds germinate; forms a soil barrier\n- Post-emergent \u2014 applied to growing weeds (the vast majority of lawn weed control)\n\n**Common UK active ingredients:** 2,4-D, MCPA, dicamba, mecoprop-P, fluroxypyr, clopyralid, florasulam \u2014 almost always sold as combination products.\n\n**The combination rule:** mixed actives cover a wider spectrum and reduce resistance pressure.",
      },
      {
        id: "wc9",
        title: "Application Methods",
        duration: "12 min",
        content:
          "**Knapsack / pressure sprayer (PA6 territory)**\nEven coverage across larger areas. Requires calibration, correct nozzle, steady walking pace. Best for whole-lawn or large-patch treatments.\n\n**Spot spraying (handheld trigger)**\nTargets individual weeds. Massively reduces total chemical use. Ideal for isolated dandelions, scattered plantains.\n\n**Weed wiping**\nHerbicide via wick/sponge directly to the weed. Where weeds stand taller than the grass. Almost zero off-target risk.\n\n**Granular feed-and-weed**\nApply when leaves are damp, lawn dry underfoot. Good for general broadleaf pressure across a healthy lawn.\n\n**Choosing the method:** match it to weed pressure, not convenience.",
      },
      {
        id: "wc10",
        title: "Conditions, Timing and Calibration",
        duration: "12 min",
        content:
          "**Weather window:**\n- Temperature ideally 10–20°C\n- No rain forecast for 6 hours (check label)\n- Low wind (under ~10 mph)\n- Dry leaves at application\n- Avoid drought-stressed lawns\n\n**Best season:** spring (April–June) and early autumn (September)\n\n**Mowing rules:**\n- Do not mow 3–4 days BEFORE treatment (leaves need surface area)\n- Do not mow 3–4 days AFTER (allow systemic translocation)\n\n**Calibration:**\n1. Measure a 10m × 1m strip\n2. Time your walk at normal spraying pace\n3. Spray water into a jug for the same time at the same pressure\n4. Multiply up to find litres per 100m²\n5. Compare against label rate; adjust until matched",
      },
      {
        id: "wc11",
        title: "Specific Weeds, Specific Strategies",
        duration: "13 min",
        content:
          "**Dandelion** \u2014 systemic selective herbicide in spring/early autumn while in active leaf. Spot spray usually enough.\n\n**White clover** \u2014 fluroxypyr or florasulam-containing products. Feed the lawn simultaneously \u2014 without nitrogen, clover comes straight back.\n\n**Speedwell** \u2014 notoriously resistant; repeat treatments, combination product with fluroxypyr. Cultural improvement (raise mowing height) essential.\n\n**Yarrow** \u2014 often needs 2–3 treatments plus aggressive overseeding to crowd it out.\n\n**Creeping buttercup** \u2014 selective herbicide + aeration and drainage improvement to prevent return.\n\n**Plantain** \u2014 easy kill with most selective broadleaf products. Aerate to address compaction.\n\n**Annual meadow grass (Poa annua)** \u2014 no truly selective control in amenity lawns. Cultural management only.\n\n**Moss** \u2014 iron sulphate blackens it; scarify to remove; always overseed after; fix the underlying cause.\n\n**The pattern:** kill the plant + fix the conditions. Doing only one is half the job.",
      },
      {
        id: "wc12",
        title: "Safety, Compliance and Record Keeping",
        duration: "12 min",
        content:
          "**Certification:** PA1 + PA6 required for anyone born after 31 December 1964 applying professional PPPs. Spraying without certification is an offence.\n\n**Approved products only:** every product must have a current UK approval and MAPP/HSE registration. The label is a legal document.\n\n**PPE for spraying:** coveralls, nitrile gloves, eye protection when mixing, sturdy boots, respirator if label specifies.\n\n**Record keeping (legally required, kept 3 years):**\n- Date/time, product name and MAPP number\n- Active ingredient and rate applied\n- Area treated and quantity used\n- Operator name and certification number\n- Weather conditions\n- Target pest/weed\n\n**Spill response:** contain with absorbent, never wash into drain, report internally and to Environment Agency if significant.",
      },
      {
        id: "wc13",
        title: "Diagnosing Why a Treatment Failed",
        duration: "10 min",
        content:
          "If weeds are still standing after 4 weeks, work through this checklist:\n\n1. Was it actively growing? Drought, frost or dormancy stops uptake.\n2. Was the right product used for this species?\n3. Was the rate correct? Under-dosing is the most common failure cause.\n4. Did rain wash it off within the rain-fast window?\n5. Was it mown too soon before or after?\n6. Were there coverage gaps (walking too fast, blocked nozzle, low pressure)?\n7. Resistance? If the same active has been used repeatedly, switch chemistry.\n8. Wrong ID? Sedges and grass weeds won't respond to broadleaf herbicides at all.\n\n**For perennials:** 2–3 treatments across a season is normal. Set this expectation before the first visit.\n\n**Communication:** document what was treated, when, with what, environmental conditions, and what the next step is. That is the level of professional practice we expect.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "wc-q1",
          question: "A systemic herbicide is described as 'slower to show results' compared to a contact herbicide. Why is it still preferred for perennial weeds?",
          options: [
            "It is cheaper per litre",
            "It translocates through the entire plant, killing the root \u2014 contact herbicides only kill the tissue they touch",
            "It is less likely to cause drift onto neighbouring plants",
            "It can be applied in colder temperatures",
          ],
          correct: 1,
          explanation: "Systemic herbicides move through the plant's vascular system to kill roots as well as leaves. Contact herbicides leave the root intact, so perennial weeds regrow.",
        },
        {
          id: "wc-q2",
          question: "A customer's lawn has heavy white clover across most of its area. You treat with herbicide. What must you do alongside the treatment to prevent clover returning?",
          options: [
            "Apply a fungicide to address underlying soil issues",
            "Scarify first, then treat",
            "Restore the lawn's nitrogen programme \u2014 clover thrives where grass is under-fed",
            "Increase mowing frequency significantly",
          ],
          correct: 2,
          explanation: "Clover fixes its own nitrogen and thrives in under-fed lawns. Without restoring nitrogen, clover will return immediately after treatment.",
        },
        {
          id: "wc-q3",
          question: "What is the minimum rain-free window typically required after applying a liquid selective herbicide?",
          options: ["30 minutes", "2 hours", "6 hours (check the label \u2014 some need 12–24 hours)", "48 hours"],
          correct: 2,
          explanation: "Most liquid herbicides require at least 6 hours rain-free for the product to be absorbed. Always check the specific product label \u2014 some require up to 24 hours.",
        },
        {
          id: "wc-q4",
          question: "Which weed is described as 'notoriously resistant' and typically requires a fluroxypyr-containing combination product?",
          options: ["Dandelion", "Daisy", "Speedwell", "Yarrow"],
          correct: 2,
          explanation: "Speedwell is notoriously herbicide-resistant, often requiring a combination product containing fluroxypyr plus cultural improvements (raising mowing height).",
        },
      ],
    },
  },,

  {
    id: "doorstep-recommendations",
    title: "Recommending Services at the Doorstep",
    description: "Why recommending the right services is a professional duty \u2014 not just a sales exercise \u2014 and how to do it with confidence.",
    icon: "MessageSquare",
    emoji: "🤝",
    category: "Customer Service",
    estimatedTime: "28 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "dr-mindset",
        title: "The Expert Advisor Mindset",
        section: "Foundations",
        duration: "6 min",
        content:
          "The way you approach a doorstep recommendation matters enormously. The difference between a customer who agrees and one who doesn't often comes down to how the conversation started.\n\n## You are not a salesperson\n\nYou are a lawn expert giving professional advice. That distinction changes everything.\n\nThink about it from the customer's perspective: they hired a specialist because they want their lawn to be better. They expect expert guidance \u2014 not just the visit that was booked, but an honest assessment of what their lawn actually needs.\n\nA customer who paid a plumber and the plumber spotted a corroded joint and mentioned it would be grateful. One who didn't mention it would be furious when it later burst. We are the experts. If we see something that needs addressing and don't mention it, we haven't done our job.\n\n## The professional duty framing\n\nThis isn't about hitting sales targets. It's about:\n\n1. **Doing right by the customer's lawn** \u2014 if we know it needs something and don't say so, we're not providing the expert service they're paying for\n2. **Protecting our professional reputation** \u2014 a lawn that fails to respond to treatment, when the underlying problem was obvious and unreported, reflects poorly on us\n3. **Covering ourselves** \u2014 if a customer later asks 'why didn't you tell me this needed scarifying?' the answer 'I didn't want to seem pushy' is not acceptable\n\n[tip]\nA useful mindset shift: instead of thinking 'should I mention this?' think 'would I want to know this if it was my lawn?' The answer is almost always yes.\n[/tip]\n\n## Building confidence\n\nMost hesitation around doorstep recommendations comes from fear of rejection or seeming pushy. The antidote is framing. You are not pitching \u2014 you are reporting.\n\n'I've had a look at your lawn today and I've noticed...'\n'One thing I'd recommend we consider before autumn is...'\n'The thatch layer here is around 15mm \u2014 this is the point where it starts to affect how well your treatments work...'\n\nSaid clearly, calmly, and with obvious knowledge behind it \u2014 that's not pushy. That's professional.",
      },
      {
        id: "dr-duty",
        title: "Why It Matters — and When We Get It Wrong",
        section: "Foundations",
        duration: "7 min",
        content:
          "There are real consequences when technicians don't recommend services. This lesson goes through the most common failures and why they happen.\n\n## The renovation gap\n\nThe most common scenario: a customer books scarification and overseeding. The technician carries out the job. Germination is poor. The customer calls to complain.\n\nWhat happened? The lawn needed top-dressing as part of the renovation \u2014 it helps seed settle into the soil, retains moisture during germination and significantly improves strike rates. The technician knew this (or should have). It wasn't recommended. The customer would have said yes.\n\nNow the lawn looks patchy, the customer is disappointed, and we have to explain why we didn't mention it at the time.\n\n[warning]\nNever recommend scarification and overseeding without also mentioning top-dressing. These three services work as a package. Recommending two without the third leaves the job incomplete \u2014 and if germination is poor, it comes back on us.\n[/warning]\n\n## Other common gaps\n\n- **Aeration without explaining why** \u2014 customers often see aeration as optional. When you explain that their clay lawn's treatments are underperforming because there's no oxygen in the soil and the fertiliser isn't reaching the roots, it stops being optional.\n\n- **Iron without addressing the cause** \u2014 iron treats moss symptoms. Aeration and better drainage treat the cause. Recommending iron but not the follow-up aeration means the moss comes back next season.\n\n- **Scarification without managing expectations** \u2014 customers who aren't warned that the lawn will look rough for 3\u20144 weeks after scarification will call in a panic. Setting expectations is part of the recommendation.\n\n## The record-keeping angle\n\nWhen you make a recommendation and the customer declines, note it. If the lawn later suffers exactly the problem you warned about, you're covered \u2014 and you can reference the conversation constructively.\n\nWhen you make a recommendation and the customer accepts, follow through on what you said it would achieve. Your credibility builds with every accurate prediction.",
      },
      {
        id: "dr-reading",
        title: "Reading the Lawn — What to Spot and When to Raise It",
        section: "On the Doorstep",
        duration: "8 min",
        content:
          "Every visit starts the same way: a proper assessment of the lawn before you do anything else. This is not just procedural \u2014 it's where recommendations are earned.\n\n## What to check on every visit\n\n**Thatch**: Press the palm of your hand into the lawn. A springy, spongy response suggests significant thatch build-up. Confirm with a probe or penknife. Anything over 10\u201415mm is worth mentioning.\n\n**Grass density**: Are there bare or thin areas? Overseeding opportunity \u2014 and if it's late summer, they'd be missing the best window if you don't raise it now.\n\n**Weed pressure**: Significant broadleaf weeds visible? If treatment is already planned, fine. If not, it's worth noting that selective herbicide is available.\n\n**Moss**: Visible moss patches \u2014 especially in spring \u2014 suggest shade, compaction, poor drainage, or a combination. Iron treats the moss; aeration and drainage improvement prevent it coming back.\n\n**Soil compaction**: Does the lawn feel firm underfoot? Is water sitting on the surface after rain? Is the soil profile dense and hard when probed? These point to aeration need.\n\n**Upcoming season**: Visiting in late summer? The autumn renovation window is coming. If the lawn has thatch, thin patches or bare areas, this is the moment to raise it.\n\n## Timing your recommendation\n\nThe best time to raise a recommendation is when the evidence is right there in front of the customer.\n\nWalk the customer to the problem area. Show them what you're seeing. Let the lawn make the case for you.\n\n'See how the surface bounces when I press it? That's the thatch \u2014 it's acting like a barrier between the fertiliser and the soil. That's why the treatments aren't giving you the results you'd expect.'\n\nA customer who can see and feel what you're describing is far more likely to act on it than one who has to take your word for it.\n\n[tip]\nAsk permission to walk the lawn with the customer whenever possible. 'Do you have two minutes \u2014 I'd like to show you something?' Most customers say yes. Once they're looking at the evidence with you, the conversation becomes much easier.\n[/tip]",
      },
      {
        id: "dr-scenarios",
        title: "Common Scenarios — What to Say",
        section: "On the Doorstep",
        duration: "7 min",
        content:
          "This lesson covers the most common recommendation scenarios and gives you a framework for each conversation.\n\n## Autumn renovation (scarification + overseeding + top-dressing)\n\n**When to raise it**: any summer visit where the lawn has thatch, thin patches or bare areas.\n\n**What to say**: 'Your lawn would benefit from a full autumn renovation \u2014 scarification to clear the thatch, overseeding to thicken it up, and top-dressing to help the seed settle. The ideal time is September\u2013October when the soil is still warm. I'd suggest we get this booked in now before the slots fill up.'\n\n**Always include top-dressing**: 'Top-dressing is worth adding to the package \u2014 it significantly improves germination rates by giving the seed better contact with the soil surface. Without it, you might find the seeding is patchy.'\n\n## Aeration for clay or compacted lawns\n\n**When to raise it**: any visit where the lawn is slow-draining, feels firm, or where treatments aren't working as expected.\n\n**What to say**: 'The issue here is compaction \u2014 the soil is quite dense, which means water and nutrients can't get through properly. That's why you're not seeing the response to treatment that you'd expect. Hollow-tine aeration opens up the soil, improves drainage and makes every subsequent treatment more effective.'\n\n## Moss control follow-up\n\n**When to raise it**: after applying iron for moss, or when moss is a recurring problem.\n\n**What to say**: 'The iron will blacken the moss and it'll die back, but to stop it coming back we need to address the underlying cause. In your case it's the compaction \u2014 the soil isn't draining properly, which moss loves. I'd recommend aeration after the moss has died back to treat the cause rather than just the symptom.'\n\n## Managing objections\n\n**'It's too expensive right now'** \u2014 acknowledge it. 'Completely understand. The window for this is autumn \u2014 if we leave it until next year the lawn will be another season behind. But if now isn't the right time, I'll make a note and we can look at it next year.'\n\n**'I'm not sure it needs it'** \u2014 bring the evidence. Walk them to the problem area. Let them touch the spongy thatch, see the bare patches, feel the compaction.\n\n**'I'll think about it'** \u2014 that's fine. 'I'll put a note on your account \u2014 one of the team can call you to discuss if you'd like more information.'\n\n[note]\nYou never need to pressure. If the customer says no, that's their decision. Your job is to make sure they have the information \u2014 clearly, honestly, and with the evidence in front of them. What they do with it is up to them.\n[/note]",
      }
    ],
  },

  {
    id: "lawn-diagnostics",
    title: "Diagnosing a Lawn That Isn't Right",
    description: "A structured approach to assessing underperforming lawns \u2014 soil, roots, grass species, environment and what to tell the customer.",
    icon: "Search",
    emoji: "🔬",
    category: "Lawn Care",
    estimatedTime: "38 min",
    roles: ["technician"],
    stage: "diagnostic-foundations",
    lessons: [
      {
        id: "ld-approach",
        title: "How to Start a Diagnostic Visit",
        section: "Assessment",
        duration: "7 min",
        content:
          "When a lawn isn't performing \u2014 not responding to treatment, looking thin, yellowing, patchy \u2014 the worst thing you can do is rush to a conclusion. A proper diagnosis takes a few minutes and builds enormous credibility with the customer.\n\n## Slow down first\n\nBefore touching anything, walk the lawn. Note:\n- Where the problems are concentrated (even distribution vs. patches vs. edges vs. specific zones)\n- How the surface feels underfoot (spongy, firm, wet, dry)\n- The overall colour and density of the grass\n- Any visible moss, weeds, disease symptoms or pest damage\n\nPatterns tell stories. A problem that follows the line of a fence is shade. A problem in a ring might be disease. A problem along an edge might be herbicide drift from a neighbour. Even distribution often points to a nutritional or soil chemistry issue.\n\n## Ask the right questions\n\nTalk to the customer before drawing conclusions:\n- 'When did you first notice this?'\n- 'Has anything changed recently \u2014 new trees, different watering habits, renovation work nearby?'\n- 'How often are you mowing and at what height?'\n- 'How often are you watering, and how much?'\n\n## The diagnostic checklist\n\nWork through this every time:\n\n1. Surface assessment \u2014 colour, density, moss, weeds, bare patches\n2. Soil smell test \u2014 anaerobic activity?\n3. Thatch measurement \u2014 depth with probe or penknife\n4. Root depth check \u2014 pull a small plug\n5. Soil type identification \u2014 squeeze test\n6. Environmental factors \u2014 shade, slope, drainage, nearby trees\n7. Grass species identification \u2014 what's in the sward and is it appropriate?\n\n[tip]\nDoing this visibly in front of the customer \u2014 taking the probe out, kneeling down, pulling a plug \u2014 looks and feels professional. Most customers have never seen someone assess their lawn this thoroughly. It builds trust immediately.\n[/tip]",
      },
      {
        id: "ld-soil",
        title: "Soil Assessment — Smell, Feel and Depth",
        section: "Assessment",
        duration: "8 min",
        content:
          "The soil tells you more than the lawn surface. Get down on your knees. Every diagnostic visit should include a hands-on soil check.\n\n## The smell test\n\nPush your finger or a probe 50\u201475mm into the soil. Pull it out and smell it.\n\n**Normal smell**: earthy, slightly mineral \u2014 the smell of healthy soil microbial activity.\n\n**Drain or egg smell**: anaerobic activity. Waterlogged soil with no oxygen becomes anaerobic. Bacteria produce hydrogen sulphide \u2014 that's the drain smell. This means the rootzone is effectively suffocating. Treatments applied to anaerobic soil are largely wasted \u2014 the roots can't function properly.\n\nAnaerobic conditions = poor drainage + compaction + overwatering. The fix is aeration + drainage improvement, and often a wetting agent to help break the surface.\n\n**Sour or musty smell**: fungal activity in the thatch layer. Not always a problem, but worth noting alongside any disease symptoms visible on the surface.\n\n## The feel and bounce test\n\nPress the palm of your hand firmly into the lawn. Bounce it gently.\n\n- **Spongy and springy**: high thatch\n- **Firm**: compaction\n- **Wet and squashy**: waterlogging\n- **Dry with water beading off**: hydrophobic soil \u2014 water isn't penetrating\n\n## Thatch depth\n\nCut a small plug and look at the cross-section in three layers:\n1. Green living grass at the top\n2. Brown/grey spongy material between grass and soil = thatch\n3. Dark soil beneath\n\nMeasure in millimetres:\n- Under 10mm: healthy\n- 10\u201420mm: moderate \u2014 preventive scarification recommended\n- 20\u201430mm: significant \u2014 curative scarification required\n- 30mm+: severe \u2014 deep scarification, manage customer expectations on recovery\n\n## Soil type check\n\nTake a small ball of moist soil from just below the surface. Squeeze it.\n\n- **Clay**: holds a ball, smears and ribbons when pressed \u2014 sticky\n- **Loam**: holds a ball but crumbles when prodded \u2014 balanced\n- **Sandy**: barely holds shape, crumbles immediately \u2014 gritty\n- **Silty**: smooth and silky feel, holds shape but less plastic than clay",
      },
      {
        id: "ld-roots",
        title: "Root Depth, Grass Colour and Health Indicators",
        section: "Assessment",
        duration: "7 min",
        content:
          "Root depth is a direct measure of lawn health. Once you know what to look for, it tells you immediately how stressed the lawn is.\n\n## Checking root depth\n\nPull a small turf plug \u2014 ease out a chunk about 50mm wide and 100mm deep. Shake off the loose soil and look at how far the roots go.\n\n**Healthy**: roots 80\u2014150mm deep, white or cream coloured, firm\n**Stressed**: roots 20\u201440mm, possibly brown or matted into the thatch layer\n**Very stressed**: roots barely below the thatch, almost no soil penetration\n\nCommon causes of shallow rooting:\n- High thatch \u2014 roots grow upward into the moist thatch rather than downward into the soil\n- Compaction \u2014 roots can't penetrate the dense soil layer\n- Waterlogging \u2014 anaerobic conditions prevent root development\n- Frequent shallow watering \u2014 roots follow moisture upward rather than down\n\n## Reading grass colour\n\nColour gives you fast information before you've touched anything:\n\n- **Yellow-green overall**: nitrogen deficiency or waterlogging\n- **Reddish-pink webbing on patches**: Red Thread disease (check for nitrogen deficiency)\n- **Pale patches with visible seed heads**: Poa annua (annual meadow grass)\n- **Brown dead patches in dry weather**: drought stress \u2014 check root depth\n- **Dark green then sudden yellowing despite fertilising**: iron deficiency \u2014 check soil pH\n- **Purple or red colouration at leaf base**: perennial ryegrass response to cold stress, usually fine\n\n## Combining the signals\n\nNo single indicator tells the whole story. The skill is reading them together:\n\n- Shallow roots + spongy thatch + yellowing = thatch blocking nutrient and water uptake\n- Shallow roots + compacted soil + puddling after rain = drainage and aeration issue\n- Good roots + poor colour + correct treatment programme = pH or nutrient availability problem\n- Good roots + thin sward + good soil = species issue or shade\n\n[note]\nWhen you've completed the root check, explain what you found to the customer in plain terms. 'The roots are only going about 20mm deep \u2014 they should be three or four times that. This tells us the lawn is struggling to access the nutrients and water it needs.' Most customers have never heard this. It changes how they understand the lawn's behaviour.\n[/note]",
      },
      {
        id: "ld-species",
        title: "Is the Right Grass in the Right Place?",
        section: "Analysis",
        duration: "8 min",
        content:
          "Part of a thorough diagnosis is asking whether the grass species in the sward are suited to the conditions. Mismatched grass species are a common and often overlooked cause of persistent lawn problems.\n\n## Common mismatches to spot\n\n**Perennial ryegrass in dense shade**\nRyegrass needs light. In shaded lawns under dense tree canopies, ryegrass thins progressively until only shade-tolerant species remain \u2014 or bare soil. A shaded lawn being seeded with a standard ryegrass mix will fail repeatedly.\nRecommendation: overseed with shade-tolerant fine fescue mixes in the shaded areas. Reduce mowing height slightly to allow more leaf area for photosynthesis.\n\n**Fine fescues on a high-traffic family lawn**\nFine fescues and bent grasses are beautiful but fragile. They don't tolerate heavy foot traffic, pets or children. A formal-looking fine fescue lawn on a family garden will thin in the high-traffic areas.\nRecommendation: either manage expectations or renovate the high-traffic areas with a ryegrass-dominant mix.\n\n**High bent grass content with no thatch management plan**\nBent grasses are prolific thatch producers due to their dense mat-forming habit. A lawn that is predominantly browntop bent without annual hollow-tine aeration will accumulate thatch rapidly.\n\n**Poa annua dominating thin or worn areas**\nNo selective herbicide \u2014 cultural control only. The lawn needs densifying. Overseed with appropriate species for the conditions to crowd it out over time.\n\n## Environmental cross-references\n\nAlways consider whether grass issues might be driven by environmental factors:\n\n- **pH too low (acidic)**: moss thrives, grass responds poorly to treatment, Red Thread more common. Liming can help.\n- **pH too high (alkaline)**: yellowing despite adequate nitrogen and iron. Chelated iron applications help.\n- **Tree root competition**: trees actively compete for water and nutrients. Lawns near large trees may be starving even with a full treatment programme.\n- **Allelopathic trees**: walnut, yew and laurel release chemicals from leaf drip that inhibit grass growth. Can look like disease or nutrient deficiency.\n- **Slope**: water runs off before penetrating. Irrigation needs to compensate with more frequent, shorter runs. Aeration helps penetration.",
      },
      {
        id: "ld-conclusion",
        title: "Putting It Together — Talking to the Customer",
        section: "Analysis",
        duration: "8 min",
        content:
          "After a thorough diagnostic walk-through, the customer deserves a clear, honest explanation of what you found and what you recommend. How you communicate this is as important as the findings themselves.\n\n## Structure your feedback\n\n**1. What you found**\nStart with the facts \u2014 what you observed, measured or identified. Be specific.\n\n'I've measured the thatch at about 20mm \u2014 that's above the threshold where it starts to cause problems.'\n'The roots are only going down about 25mm \u2014 they should be three or four times that depth.'\n'The soil is quite compacted \u2014 I can feel it through the probe and water isn't draining after rain.'\n\n**2. What it means for the lawn**\nTranslate the finding into visible behaviour the customer has been noticing.\n\n'That thatch depth is why the fertiliser isn't working as well as it should \u2014 it's sitting in the thatch layer rather than getting to the roots.'\n'Shallow roots mean the lawn dries out quickly in warm weather.'\n\n**3. What you recommend and why**\nBe direct and give a clear reason.\n\n'I'd recommend hollow-tine aeration this autumn \u2014 it will improve drainage, introduce oxygen to the rootzone, and give every subsequent treatment a better chance of working.'\n\n**4. What the customer can do themselves**\nGive one or two practical actions. It shows you're interested in their lawn's success.\n\n'In the meantime, try raising the mowing height to 35\u201440mm \u2014 that alone will reduce stress significantly.'\n\n## Setting honest expectations\n\nIf the lawn has multiple problems \u2014 compaction, high thatch, wrong species, poor drainage \u2014 a realistic recovery plan might take two to three seasons of targeted treatment. Say so.\n\nA customer who expects one scarification to transform a neglected lawn will be disappointed. One who understands it's a process will feel good about gradual progress.\n\n[tip]\nEnd every diagnostic conversation with a clear next step. 'I'll add a note to your account recommending autumn aeration and scarification \u2014 one of the team will be in touch to get that booked.' Leaving the customer knowing what happens next makes the visit feel complete.\n[/tip]",
      }
    ],
  },

  {
    id: "customer-cultural-practices",
    title: "Customer Cultural Practices",
    description: "Mowing, watering, seasonal care and setting expectations \u2014 the guidance every technician should be giving customers.",
    icon: "Scissors",
    emoji: "📋",
    category: "Customer Guidance",
    estimatedTime: "23 min",
    roles: ["technician", "office"],
    stage: "role-foundations",
    isShared: true,
    lessons: [
      {
        id: "ccp-mowing",
        title: "Mowing — The Most Important Cultural Practice",
        section: "Cultural Practices",
        duration: "8 min",
        content:
          "More lawn problems are caused or worsened by incorrect mowing than almost any other factor. This is the single most impactful piece of advice you can give a customer.\n\n## Mowing height\n\nMost domestic lawns should be mowed at **30\u201440mm**. This gives the grass enough leaf area to photosynthesise while keeping it tidy and manageable.\n\nScalping (cutting below 20mm) is one of the most common customer mistakes:\n- Removes the majority of the leaf area needed for photosynthesis\n- Exposes or damages the crown \u2014 the growth point of the plant\n- Creates bare or thin patches where weed seeds germinate\n- Stresses the plant, reducing drought and disease resistance\n\n[alert]\nScalping is the single most common cause of customer-made lawn damage. If a customer describes cutting it 'really short to give it more time between cuts' \u2014 that's scalping. Address it directly: raise the height and let the lawn recover.\n[/alert]\n\n## The one-third rule\n\nNever remove more than one-third of the leaf blade in a single cut. If the grass has grown long \u2014 after a holiday, wet period or irregular schedule \u2014 resist the temptation to cut it all at once.\n\nThe correct approach: raise the mowing height, cut once, wait a few days, lower slightly, cut again. Repeat until you reach target height.\n\n## Mowing frequency\n\nDuring the growing season (roughly March\u2013November), a typical domestic lawn should be mowed **once per week**. In peak growth periods (late spring), twice a week may be needed on vigorous ryegrass lawns.\n\n## Clippings\n\nModern research supports leaving fine clippings on the lawn if mowing is frequent enough that they're small \u2014 they decompose and return nitrogen. However:\n- Long or wet clippings mat on the surface and smother the grass beneath \u2014 remove these\n- If the lawn already has significant thatch, adding clippings will worsen it\n\n## Mower blade condition\n\nBlunt mower blades tear the grass rather than cutting cleanly. Torn leaf tips go yellow within days and create entry points for fungal disease \u2014 a key contributor to Red Thread in summer. Customers should sharpen or replace mower blades at least once a season.",
      },
      {
        id: "ccp-watering",
        title: "Watering — How, When and How Much",
        section: "Cultural Practices",
        duration: "8 min",
        content:
          "Incorrect watering is the second most common customer mistake after scalping. The standard instinct \u2014 a little water every day \u2014 is exactly the wrong approach.\n\n## The golden rule: deep and infrequent\n\nThe goal of watering is to push moisture down into the soil so that roots follow it downward. If moisture is always near the surface, roots stay shallow. Shallow roots = drought-vulnerable lawn.\n\n**Correct approach**: water deeply (25\u201430mm per event) once or twice per week, allowing the soil to dry partially between events. This pushes roots down 100\u2013150mm or more.\n\n**Common mistake**: 5\u201410 minutes of watering every day. This wets only the top 20\u201430mm of soil. Roots stay shallow. The lawn becomes more drought-sensitive despite daily watering.\n\n## How to measure 25\u201430mm\n\nPut a flat-bottomed container (a tuna tin, for example) on the lawn when irrigating. Water until it has 25\u201430mm in it. That's the depth you're applying.\n\nFor customers with irrigation systems: most automatic schedules are set incorrectly \u2014 daily, short run times. Reprogramming to 2 runs per week at longer duration produces a healthier lawn.\n\n## When to water\n\n**Best time**: early morning. The surface dries during the day, reducing disease risk.\n\n**Worst time**: evening. Leaves stay wet overnight \u2014 ideal conditions for fungal disease, especially Red Thread and Fusarium.\n\n## Drought stress signals\n\nHelp customers recognise when the lawn actually needs water:\n- **Footprints remain visible** \u2014 the grass isn't springing back. Earliest and most reliable sign.\n- **Leaf blades curl lengthwise** \u2014 the plant is conserving water\n- **Colour shifts from green to blue-green** \u2014 just before browning begins\n\nBrowning in drought is not death \u2014 it's dormancy. Most grass species recover when moisture returns. Customers often panic at the first sign of browning.\n\n## Soil type and watering\n\n- **Sandy soil**: dries out fast, needs more frequent watering \u2014 perhaps every 3\u20134 days rather than weekly\n- **Clay soil**: retains moisture longer; may only need watering every 10\u201414 days\n- **Hydrophobic soil**: water beads off rather than penetrating. A wetting agent should be applied before irrigation",
      },
      {
        id: "ccp-seasonal",
        title: "Seasonal Care and Setting Expectations",
        section: "Cultural Practices",
        duration: "7 min",
        content:
          "Many customer worry calls are caused by not understanding the natural cycle of a lawn. Setting expectations on what is normal at each time of year prevents unnecessary panic.\n\n## Spring (March \u2013 May)\n\nThe lawn wakes up. Growth restarts, colour returns, and the lawn recovers from winter.\n\n- **Mowing**: raise the height first cut \u2014 don't cut straight to summer height\n- **First treatment**: spring fertiliser kick-starts growth; moss may be treated if needed\n- **Weeds become visible**: as the lawn grows, weeds emerge. This is normal \u2014 they've just grown enough to see\n- **What looks bad**: some discolouration, dead patches from winter, moss. These are normal starting points\n\n## Summer (June \u2013 August)\n\nGrowth slows in dry heat. The lawn shows drought stress.\n\n- **Mowing frequency**: may reduce in dry spells \u2014 don't cut stressed drought-dormant grass\n- **Browning is normal**: drought dormancy is not death. The lawn will recover when moisture returns\n- **What customers do wrong**: panic-water shallowly and frequently, or cut the browning grass short. Both make things worse\n- **Your message**: 'Hold off on watering until you see footprints staying visible \u2014 then water deeply. Don't cut it short.'\n\n## Autumn (September \u2013 November)\n\nThe renovation season. The most important time of year for lawn improvement.\n\n- **Scarification, aeration, overseeding, top-dressing**: ideal conditions \u2014 soil still warm, lower weed competition\n- **Leaf clearance**: fallen leaves must be cleared weekly. Leaf cover kills grass beneath within 2\u20133 weeks by blocking light completely\n- **Growth continues**: the lawn is still actively growing. This is when renovations establish best.\n\n[tip]\nThe autumn window is worth raising on every summer visit: 'The best time to address your lawn's thatch and thinness is September\u2013October \u2014 shall I make a note to get that booked in when we get closer?'\n[/tip]\n\n## Winter (December \u2013 February)\n\nDormancy. Growth stops or slows significantly.\n\n- **Do not walk on frosted grass**: ice crystals in the leaf cells shatter when walked on, causing blackened, damaged patches\n- **Avoid working on waterlogged lawns**: compaction risk is very high when soil is saturated\n- **What's normal**: pale colour, slow growth, some moss reappearing. Spring will address it",
      }
    ],
  },

  {
    id: "advanced-grass-thatch-soil",
    title: "Advanced Grass, Thatch & Soil Knowledge",
    description: "A deeper dive into grass species identification, soil chemistry, thatch biology and environmental matching for experienced technicians.",
    icon: "Microscope",
    emoji: "🧬",
    category: "Horticulture",
    estimatedTime: "55 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "agts-id",
        title: "Advanced Grass Species Identification",
        section: "Grass",
        duration: "10 min",
        content:
          "This lesson goes beyond the basics \u2014 into the precise morphological features that allow confident identification of grass species in the field, including weed grasses that shouldn't be in domestic lawns.\n\n## The key identification structures\n\nTo confidently identify grass species, you need to know four structures at the base of each leaf:\n\n**Ligule**: A membrane or fringe of hairs at the junction between the leaf blade and the leaf sheath. Species vary in ligule length, shape and type.\n\n**Auricles**: Claw-like projections at the base of the leaf blade that clasp the stem. Present in some species, absent in others \u2014 their presence is a definitive ID feature.\n\n**Vernation**: How the young leaf is arranged in the shoot before it unfurls. Either rolled (circular cross-section) or folded (flat cross-section).\n\n**Sheath**: The lower part of the leaf that wraps around the stem. Can be round or flattened, smooth or hairy, red-tinged or green.\n\n## Perennial ryegrass (Lolium perenne)\n- Vernation: **folded** (flat shoot cross-section)\n- Ligule: short, blunt, membranous\n- Auricles: small but present \u2014 short, blunt claw-like projections\n- Sheath: flattened, often reddish-pink at base\n- Leaf: glossy underside \u2014 the quickest ID at a glance\n\n## Fine fescues (Festuca spp.)\n- Vernation: **rolled** (needle-like circular cross-section)\n- Ligule: very short, membranous\n- Auricles: absent\n- The rolled cross-section distinguishes all fescues from ryegrass immediately\n\n## Bent grasses (Agrostis spp.)\n- Vernation: **rolled** (very fine \u2014 similar to fine fescues)\n- Ligule: longer than fescues, pointed, membranous \u2014 useful distinguishing feature\n- Auricles: absent\n- The stolon (above-ground runner) is often the clearest bent grass identifier in the field\n\n## Meadow grasses (Poa spp.)\n- Vernation: **folded**\n- Ligule: short, blunt\n- Auricles: absent\n- Leaf tip: **boat-shaped** \u2014 the definitive Poa identifier; the tip curves upward like the prow of a canoe\n\n## Weed grasses to recognise\n\n### Yorkshire fog (Holcus lanatus)\n- **Soft, velvety, hairy leaves** \u2014 the texture is unmistakeable once felt\n- Grey-green colouration, loose clumps\n- No selective control \u2014 physical removal or renovation required\n\n### Cocksfoot (Dactylis glomerata)\n- **Coarse, ridged leaves with a strong keel on the underside**\n- Grows in distinct clumps \u2014 tufted, not spreading\n- No selective control \u2014 renovation required\n\n[tip]\nA 10x hand lens is an inexpensive tool that dramatically improves your ability to identify grass species in the field. Being able to show a customer the exact structural feature you're looking at is impressive and builds credibility.\n[/tip]",
      },
      {
        id: "agts-suitability",
        title: "Matching Grass Species to Environment",
        section: "Grass",
        duration: "8 min",
        content:
          "Understanding which grass species performs best in which conditions is the foundation of renovation and overseeding advice.\n\n## Shade tolerance (most to least)\n1. **Fine fescues** \u2014 best; tolerate up to 60\u201470% shade\n2. **Smooth-stalked meadow grass (Poa pratensis)** \u2014 moderate shade tolerance\n3. **Browntop bent** \u2014 moderate shade tolerance\n4. **Perennial ryegrass** \u2014 poor; thins rapidly under dense canopies\n\nAny area receiving fewer than 4 hours of direct sunlight should be overseeded with shade-tolerant fine fescue mixes. Ryegrass in heavy shade is a losing battle.\n\n## Drought tolerance (most to least)\n1. **Hard fescue and sheep's fescue** \u2014 excellent; very low water requirement\n2. **Chewings fescue** \u2014 good\n3. **Creeping red fescue** \u2014 moderate; goes dormant but recovers\n4. **Perennial ryegrass** \u2014 moderate; dormancy common in dry UK summers\n5. **Poa annua** \u2014 poor; dies readily in drought (one silver lining)\n\n## Traffic and wear tolerance\n1. **Perennial ryegrass** \u2014 best\n2. **Smooth-stalked meadow grass** \u2014 good; spreads to self-repair worn areas\n3. **Fine fescues** \u2014 poor; not suitable for high-use family lawns\n\n## pH sensitivity\n\nMost UK lawn grasses prefer pH 6.0\u20137.0.\n\n**Below 5.5 (acidic):**\n- Grass struggles; moss and acid-tolerant weeds dominate\n- Phosphorus becomes locked; aluminium and manganese can become toxic\n- Lime application raises pH gradually \u2014 25\u201450g/m² maximum per application\n\n**Above 7.5 (alkaline):**\n- Iron and manganese become chemically unavailable \u2014 yellowing despite feeding\n- Worm activity declines \u2014 thatch accumulates faster\n- Chelated iron remains plant-available across a wider pH range\n\n[note]\nSoil pH affects everything downstream. Before concluding a lawn is failing due to disease or cultural problems, a simple pH test rules out the most fundamental underlying issue. pH test strips or meters are cheap and fast.\n[/note]",
      },
      {
        id: "agts-thatch-bio",
        title: "Thatch Biology — What's Actually Happening",
        section: "Thatch",
        duration: "9 min",
        content:
          "The basics module covers what thatch is and what it does. This lesson goes into the biology \u2014 why thatch accumulates at different rates in different lawns.\n\n## The microbial decomposition system\n\nThatch decomposition is almost entirely carried out by soil microorganisms \u2014 primarily bacteria and fungi. For this system to work, they need:\n- **Oxygen** \u2014 they are aerobic organisms; anaerobic conditions kill them off\n- **Moisture** \u2014 damp, not saturated\n- **Temperature** \u2014 decomposition slows dramatically below 8°C\n- **Adequate nitrogen** \u2014 feeds the microbes as well as the grass\n\nThis is why a modest nitrogen programme actually helps thatch management.\n\n## Why some lawns accumulate thatch faster\n\n**Species-dependent production rate**: bent grasses produce more surface organic matter per unit area than fescues or ryegrass, due to their dense stolon mat. Bent-dominant lawns need more aggressive thatch management.\n\n**Soil microbial population**: healthy, well-aerated soil with good worm activity decomposes organic matter faster. Compacted, acidic or waterlogged soil has a depleted microbial community \u2014 decomposition slows.\n\n**Worm activity**: earthworms are the most efficient organic matter processors in the soil food web. A healthy worm population significantly reduces thatch accumulation. Worm-hostile conditions (acidic, compacted, waterlogged) accelerate build-up.\n\n**Nitrogen over-application**: excessive nitrogen dramatically increases shoot growth rate, producing organic matter faster than the microbial system can decompose it.\n\n## Biological thatch management\n\nSome products contain thatch-degrading microorganisms or enzymes that stimulate decomposition. These biological products can support thatch management between mechanical interventions \u2014 though they are not a substitute for scarification in severely thatched lawns.\n\n[tip]\nWhen explaining thatch build-up to a customer with a bent-dominant lawn, use the recycling system analogy: the system that breaks down organic matter in their lawn is being overwhelmed. Aeration opens it back up. Scarification gives it a reset. The goal is to get decomposition keeping pace with production.\n[/tip]",
      },
      {
        id: "agts-soil-chem",
        title: "Soil Chemistry — Nutrients, pH and Availability",
        section: "Soil",
        duration: "10 min",
        content:
          "Understanding why nutrients become unavailable explains many lawn problems that look like disease or cultural failure but are actually soil chemistry issues.\n\n## The major nutrients\n\n**Nitrogen (N)**: drives leaf growth, colour and density. Nitrogen exists in soil in multiple forms:\n- Ammoniacal (NH4+): rapid uptake, quick green-up; can acidify soil over time\n- Nitrate (NO3-): plant-ready; leaches easily through sandy soils\n- Slow-release (SCU, IBDU, polymer-coated): releases gradually over weeks; less leaching risk\n\n**Potassium (K)**: disease resistance, drought hardiness, root cell function. Autumn programmes are deliberately high-K \u2014 it's the 'hardening' nutrient that prepares the lawn for winter. Sandy soils are particularly K-deficient because it leaches readily.\n\n**Phosphorus (P)**: root development and energy transfer. Critical in seeding situations. Established lawns on normal soils rarely need supplementary phosphorus.\n\n## The minor nutrients\n\n**Iron (Fe)**: chlorophyll formation, colour and hardening. Becomes unavailable above pH 7.5 or in waterlogged conditions. Applied as iron sulphate or chelated iron. Also controls moss \u2014 moss cells are more sensitive to iron than grass cells at the concentrations used.\n\n**Manganese (Mn)**: chlorophyll, photosynthesis. Deficiency shows as interveinal yellowing. Becomes unavailable at high pH like iron.\n\n## pH and nutrient lockout\n\nAt pH 6.0\u20137.0: all major and micro-nutrients are available.\nBelow pH 5.5: phosphorus locked; Al and Mn can become toxic.\nAbove pH 7.5: iron and manganese become unavailable. Chelated iron bypasses this issue.\n\nThis is why a lawn on chalky soil can yellow despite regular feeding \u2014 the iron is there, but the plant can't access it.\n\n## Cation Exchange Capacity (CEC)\n\nCEC is the soil's ability to hold positively charged nutrient ions and release them to plant roots:\n- **Clay soils**: very high CEC \u2014 excellent nutrient retention\n- **Sandy soils**: very low CEC \u2014 nutrients leach quickly\n- **Organic matter**: significantly increases CEC in all soil types\n\n[note]\nWhen a lawn on sandy soil isn't responding to fertiliser, low CEC is often the explanation \u2014 nutrients are being applied but leaching before the roots can access them. Split feeding (more frequent, lower rates) is the practical response.\n[/note]",
      },
      {
        id: "agts-soils",
        title: "Silty, Peaty and Chalky Soils",
        section: "Soil",
        duration: "9 min",
        content:
          "The basics module covers clay, loam and sandy soils. This lesson adds the three remaining soil types you'll encounter less frequently but need to understand.\n\n## Silty soil\n\nSilt particles sit between sand and clay in size. They feel smooth or silky rather than gritty or sticky.\n\n**Squeeze test**: holds a ball, feels smooth and silky. Smears very slightly but less plastic than clay.\n\n**Characteristics:**\n- Good moisture retention\n- Prone to **surface capping** \u2014 when dry, silt particles form a crust that water struggles to penetrate\n- Moderate drainage \u2014 not as prone to waterlogging as clay, not as free-draining as sand\n\n**Treatment implications:**\n- Aeration helps prevent capping and maintains structure\n- Wetting agents are valuable when the capped surface has become hydrophobic\n- Responds well to standard treatment programmes\n\n## Peaty soil\n\nHigh organic matter content. Dark brown to black, spongy, very light.\n\n**Squeeze test**: spongy, light and fibrous. Very dark. Doesn't compact well.\n\n**Characteristics:**\n- **Very acidic** \u2014 typically pH 3.5\u20135.5\n- Holds enormous amounts of water\n- Excellent nutrient reservoir when pH is corrected\n\n**Treatment implications:**\n- Liming is almost always necessary before good grass growth is achievable\n- Raise pH gradually to 6.0\u20136.5 before renovation\n- Don't overseed or renovate until pH is within acceptable range\n\n## Chalky / calcareous soil\n\nFormed over chalk or limestone. Pale-coloured with visible chalk fragments. Very alkaline.\n\n**Squeeze test**: free-draining, light. May feel slightly gritty with visible chalk fragments.\n\n**Characteristics:**\n- **Highly alkaline** \u2014 pH 7.5\u20138.5 or higher\n- Free-draining like sandy soil\n- Iron and manganese unavailable \u2014 grass yellows despite feeding\n- Worm populations reduced \u2014 thatch accumulates faster\n\n**Treatment implications:**\n- **Chelated iron** applied regularly overcomes iron unavailability\n- Acidifying fertilisers can lower pH very slowly over years\n- Manage symptoms rather than expecting permanent correction\n\n[warning]\nOn chalky soils, standard iron sulphate treatments may give disappointing results \u2014 the iron becomes unavailable almost immediately at high pH. Chelated iron (EDTA or DTPA chelated) remains plant-available across a much wider pH range and should be specified instead.\n[/warning]",
      },
      {
        id: "agts-structure",
        title: "Soil Structure, Compaction and Restoration",
        section: "Soil",
        duration: "9 min",
        content:
          "Soil structure is the arrangement of particles into aggregates \u2014 clumps held together by organic matter and microbial activity. Good structure is the foundation of a healthy lawn.\n\n## What good soil structure looks like\n\nGood structure means stable aggregates with pore spaces between them:\n- **Macropores**: large spaces between aggregates \u2014 carry water downward and allow gas exchange\n- **Micropores**: tiny spaces within aggregates \u2014 hold water against gravity, making it available to roots\n\nA well-structured soil drains freely after rain (macropores drain) but retains moisture for root uptake (micropores hold). It also has good gas exchange \u2014 oxygen enters as water drains.\n\n## How compaction destroys structure\n\nWhen soil is walked on repeatedly while wet, or subjected to machinery, the aggregates collapse. Macropores \u2014 the drainage and aeration channels \u2014 are crushed. The result:\n- Water ponds on the surface\n- Oxygen can't enter \u2014 anaerobic conditions develop\n- Roots can't penetrate the dense layer\n- Fertiliser and treatments can't reach the rootzone\n\nCompaction is worst in clay soils but occurs in all soil types under sufficient pressure.\n\n## Mechanical restoration \u2014 aeration\n\n**Hollow-tine aeration**: removes cores of compacted soil (typically 10\u201415mm diameter, 75\u2013100mm deep). The holes immediately create channels for water, air and root penetration. Removed cores can be top-dressed over, filling the holes with improved material.\n\n**Solid-tine aeration**: drives tines into the soil without removing material. Less effective for severe compaction but improves gas exchange and drainage.\n\nThe effects of hollow-tine aeration are significant but temporary \u2014 soil eventually recompacts. Annual aeration is recommended for regularly used lawns.\n\n## The role of organic matter\n\nHumus \u2014 the stable end-product of organic matter decomposition \u2014 is the glue of good soil structure. It:\n- Binds mineral particles into stable aggregates\n- Improves drainage in clay soils\n- Improves moisture retention in sandy soils\n- Provides food for soil microorganisms\n- Increases CEC \u2014 the soil's ability to hold and release nutrients\n\n**Top-dressing with organic material** delivers organic matter to the surface, where it is gradually incorporated by worms and rainfall. The effect on soil structure is cumulative \u2014 annual top-dressing over 3\u20135 seasons produces measurable improvement in soil quality.\n\n[tip]\nWhen selling top-dressing as part of a renovation package, the seed contact argument is convincing for the immediate job. But the long-term argument \u2014 'each top-dressing improves your soil's structure and quality over time' \u2014 is the reason to keep doing it annually.\n[/tip]",
      }
    ],
  },

  {
    id: "soil-ph",
    title: "Soil pH \u2014 Why It Matters",
    description: "Understanding soil acidity and alkalinity, how pH controls nutrient availability, and how to test and correct it.",
    icon: "FlaskConical",
    emoji: "🧪",
    category: "Soil Science",
    estimatedTime: "27 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "ph-what-is-ph",
        title: "What Is pH and Why Does It Matter?",
        section: "Foundations",
        duration: "7 min",
        content:
          "pH is the measure of how acidic or alkaline the soil is, on a scale of 0 to 14. Seven is neutral. Below 7 is acidic; above 7 is alkaline.\n\nMost UK lawn grasses perform best in a range of **pH 6.0 to 7.0** \u2014 slightly acidic to neutral. Outside this range, even a perfect treatment programme will underperform, because pH controls whether nutrients are chemically available to the plant at all.\n\n## Why pH governs nutrient availability\n\nNutrients exist in the soil in various chemical forms. Whether the plant can access them depends almost entirely on pH.\n\nAt the correct pH range (6.0\u20137.0):\n- Nitrogen, phosphorus and potassium are all plant-available\n- Iron and manganese are soluble enough to be taken up by roots\n- Beneficial soil microbes thrive \u2014 they decompose organic matter and cycle nutrients\n\nMove outside this range and the chemistry changes:\n- Below pH 5.5: phosphorus becomes locked in aluminium compounds; aluminium itself becomes toxic at very low pH\n- Above pH 7.5: iron and manganese precipitate out \u2014 they're present in the soil but in a form the plant can't access\n\n## The UK soil context\n\nThe UK's predominant soil pH is slightly acidic \u2014 much of England and Wales sits naturally between pH 5.5 and 6.5. Rainfall is a key driver: as water moves through soil, it leaches out calcium (which is alkaline), gradually acidifying the soil over time.\n\nThe exceptions:\n- **Chalky or limestone areas** (Chilterns, South Downs, Yorkshire Wolds, much of Lincolnshire): naturally alkaline, often pH 7.5\u20138.5\n- **Peat-heavy or upland areas**: strongly acidic, sometimes pH 4.0\u20135.0\n\n[tip]\nA simple pH test (strips or meter, available cheaply) before a renovation job tells you whether liming is needed before overseeding. Seeding into very acidic or very alkaline soil without correcting pH first risks poor germination and slow establishment.\n[/tip]",
      },
      {
        id: "ph-low",
        title: "Low pH — Acidic Soils: Signs, Causes and Correction",
        section: "Acidic Soils",
        duration: "8 min",
        content:
          "Acidic soil is the more common problem in UK lawns. Recognising it and knowing how to correct it gradually is a core skill.\n\n## Signs of acidic soil\n\n- **Moss dominates** \u2014 moss thrives in acidic, poorly drained conditions; it's the most visible indicator\n- **Grass responds poorly to treatment** \u2014 fertilisers applied to highly acidic soil have diminished effect\n- **Poa annua and other acid-tolerant weeds** establish more readily\n- **Red Thread disease is more common** \u2014 the fungus that causes it prefers acidic, nitrogen-deficient conditions\n- **Slow decomposition** \u2014 organic matter (thatch) builds up faster because the microbial decomposition system is suppressed below pH 5.5\n\n## Common causes of acidification\n\n- **Rainfall** \u2014 the single biggest driver; rainwater is mildly acidic and leaches calcium from the soil over years\n- **Ammoniacal nitrogen fertilisers** \u2014 the most common turf nitrogen sources acidify soil with repeated use\n- **Organic matter decomposition** \u2014 produces weak acids as a byproduct\n- **Conifer or oak leaf fall** \u2014 these species produce acidic needle/leaf litter; lawns under them may be significantly more acidic than surrounding areas\n\n## Correcting acidic soil \u2014 liming\n\nGround limestone (calcium carbonate) or calcified seaweed is applied to raise pH. The process is slow \u2014 pH doesn't change overnight.\n\n**Typical rate**: 25\u201350g/m² of ground limestone per application. Always follow product guidance.\n\n**Maximum single application**: do not apply more than 50g/m² at one time \u2014 over-liming can swing pH too far in the opposite direction and create an alkaline problem.\n\n**Frequency**: pH rises slowly \u2014 allow 3\u20136 months before re-testing. For lawns below pH 5.5, correction over 2\u20133 seasons is realistic.\n\n**Best timing**: autumn, so the lime has winter rainfall to work it in before the growing season.\n\n[warning]\nNever apply lime and nitrogen fertiliser at the same time. Lime causes nitrogen to be released as ammonia gas \u2014 you lose the fertiliser to the atmosphere. Leave at least 2\u20134 weeks between lime and nitrogen applications.\n[/warning]",
      },
      {
        id: "ph-high",
        title: "High pH — Alkaline Soils: Signs, Causes and Management",
        section: "Alkaline Soils",
        duration: "7 min",
        content:
          "Alkaline soil is less common but occurs in specific regions and soil types. It presents a distinct set of challenges that require a different management approach.\n\n## Signs of alkaline soil\n\n- **Yellowing despite regular feeding** \u2014 the classic symptom; iron and manganese are present but locked up\n- **Poor response to standard iron treatments** \u2014 iron sulphate at standard concentrations may give little visible effect\n- **Thin, sparse sward** \u2014 nutrients are available on paper but the plant can't access them\n- **Worm populations reduced** \u2014 earthworms prefer slightly acidic to neutral soil; fewer worms means slower thatch decomposition\n\n## Common alkaline soil situations\n\n- **Chalky or limestone parent material** \u2014 found across significant parts of southern and eastern England\n- **Concrete or mortar leaching** \u2014 new-build lawns near foundations, paths or walls may have very high localised pH from calcium hydroxide leaching into the soil\n- **Tap water irrigation in hard water areas** \u2014 years of irrigation with hard (calcium-rich) water can gradually raise pH, particularly in the rootzone\n\n## Managing alkaline soils\n\nUnlike acidity, alkalinity is very difficult to permanently correct in the field. The practical approach is to manage the symptoms while making incremental improvements.\n\n**Chelated iron**: standard iron sulphate becomes unavailable above pH 7.5 almost immediately. Chelated iron (EDTA or DTPA chelated) remains plant-available across a much wider pH range \u2014 specify this on chalky soils.\n\n**Sulphur applications**: elemental sulphur oxidises in the soil to produce sulphuric acid, gradually lowering pH. Effect is very slow (months to years) and more practical on sandy than clay soils.\n\n**Acidifying fertilisers**: ammonium sulphate and sulphate of ammonia have an acidifying effect with long-term use \u2014 useful on alkaline soils where you'd normally want to avoid further acidification.\n\n**Expectation setting**: be honest with customers on chalky soil. Complete pH correction is not realistic. Good management with chelated iron, appropriate fertilisers and regular aeration can produce a very acceptable lawn, but it will always require more attention than a lawn on neutral soil.\n\n[note]\nOn a new-build or renovation in a hard-water area, always test pH before specifying a seed mix or treatment programme. A lawn that repeatedly fails despite correct treatment often has an undiagnosed pH problem underneath.\n[/note]",
      },
      {
        id: "ph-testing",
        title: "Testing and Monitoring Soil pH",
        section: "Practice",
        duration: "5 min",
        content:
          "Testing pH should be a routine part of any diagnostic visit or renovation specification. It takes minutes and can change the entire treatment plan.\n\n## Testing methods\n\n**Colour indicator strips**: cheapest option, accurate to within about 0.5 pH units. Adequate for most field use \u2014 sufficient to determine whether liming or pH management is needed.\n\n**Electronic pH meters**: more precise (±0.1 pH units); useful for monitoring gradual pH changes over time. Probe must be kept clean and calibrated.\n\n**Soil lab analysis**: most accurate; also reports major and minor nutrient levels. Worth recommending on persistently underperforming lawns where pH alone doesn't explain the problem.\n\n## How to take a representative sample\n\nA single reading from one spot is often misleading \u2014 pH varies across a lawn, especially near boundaries, paths, trees or areas of different drainage.\n\nFor a typical domestic lawn:\n1. Take 5\u20138 small soil samples from different areas, avoiding edges and obvious anomalies\n2. Mix them together in a clean container\n3. Test the composite sample \u2014 this gives you a representative average\n4. If you find one area with a dramatically different reading, test that zone separately\n\n## Interpreting results\n\n| pH Range | Status | Action |\n| Below 5.5 | Strongly acidic | Lime \u2014 multiple seasons of correction needed |\n| 5.5\u20136.0 | Acidic | Lime recommended before renovation |\n| 6.0\u20137.0 | Ideal | No correction needed |\n| 7.0\u20137.5 | Mildly alkaline | Monitor; chelated iron may help |\n| Above 7.5 | Alkaline | Chelated iron; acidifying programme; manage expectations |\n\n[tip]\nKeep a record of pH readings on customer accounts. A lawn moving from 5.8 to 6.4 over two seasons of liming is progress \u2014 showing this to the customer demonstrates the value of the programme and builds confidence in the treatment plan.\n[/tip]",
      }
    ],
  },

  {
    id: "plant-nutrients",
    title: "Plant Nutrients \u2014 Advanced",    description: "N, P and K plus the secondary nutrients \u2014 what each does for the grass plant, deficiency signs, and a seasonal nutrition guide.",
    icon: "Leaf",
    emoji: "🌿",
    category: "Nutrition",
    estimatedTime: "31 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "nut-npk",
        title: "The Major Nutrients — N, P and K",
        section: "Major Nutrients",
        duration: "9 min",
        content:
          "Every lawn fertiliser contains a combination of the three major nutrients: nitrogen (N), phosphorus (P) and potassium (K). Understanding what each one does \u2014 and what deficiency looks like \u2014 is the foundation of any fertiliser recommendation.\n\n## Nitrogen (N) \u2014 the growth driver\n\nNitrogen is the most important nutrient for lawns and the one that delivers the most visible results.\n\n**What it does:**\n- Drives shoot and leaf growth \u2014 more nitrogen = faster, denser top growth\n- Responsible for chlorophyll production \u2014 the pigment that makes grass green\n- Without adequate nitrogen, the plant cannot photosynthesise efficiently or build new tissue\n\n**What deficiency looks like:**\n- Overall pale yellow-green colour across the entire sward\n- Slow or absent growth response\n- Increased Red Thread susceptibility \u2014 the fungus that causes Red Thread thrives when nitrogen is low\n\n**Nitrogen forms in fertiliser:**\n- **Ammoniacal (NH4+)**: fast-release, quick green-up, risk of acidifying soil over time\n- **Nitrate (NO3-)**: immediately plant-available; leaches easily in sandy or wet soils\n- **Slow-release (SCU, polymer-coated, IBDU, methylene urea)**: releases over weeks; sustained feeding with reduced leaching risk and lower scorch risk\n\n**Seasonal use**: high-nitrogen spring and summer programmes drive growth and colour. Autumn programmes use lower nitrogen to avoid pushing soft, frost-vulnerable growth before winter.\n\n## Phosphorus (P) \u2014 the root builder\n\nPhosphorus is critical early in a plant's life and during establishment \u2014 it drives root development and energy transfer within the plant.\n\n**What it does:**\n- Essential for root cell division and elongation \u2014 the primary root development nutrient\n- Central to energy transfer (ATP \u2014 the plant's energy currency)\n- Promotes seedling establishment and tillering (the production of new shoots from the base)\n\n**What deficiency looks like:**\n- Thin, poor establishment after overseeding\n- Reddish or purple tinge to leaf blades (especially in cold weather when uptake is impaired)\n- Slow recovery from renovation\n\n**Practical note**: established lawns on most UK soils rarely need supplementary phosphorus \u2014 it accumulates and doesn't leach significantly. Phosphorus matters most in seeding mixes and renovation programmes. Look for 'pre-seeding' fertilisers with higher P content when germination is the goal.\n\n## Potassium (K) \u2014 the hardener\n\nPotassium is the 'insurance' nutrient. It doesn't produce dramatic visual results but it protects the plant against stress of all kinds.\n\n**What it does:**\n- Regulates water movement in and out of plant cells via osmosis \u2014 critical for drought resistance\n- Strengthens cell walls \u2014 makes the plant more resistant to frost, disease and physical damage\n- Improves root function and nutrient uptake efficiency\n- Autumn fertilisers deliberately have high potassium (K) content to harden the plant before winter\n\n**What deficiency looks like:**\n- Increased disease susceptibility, especially fungal diseases\n- Poor drought recovery \u2014 lawns go dormant earlier and recover more slowly\n- Scorched or browning leaf margins in severe cases\n\n**Where it matters most**: sandy soils. Potassium leaches readily from sandy profiles \u2014 lawns on sandy soil need higher potassium inputs to compensate.",
      },
      {
        id: "nut-secondary",
        title: "Secondary and Trace Nutrients",
        section: "Secondary Nutrients",
        duration: "8 min",
        content:
          "Beyond N, P and K, grass plants need a range of secondary and trace nutrients. Deficiencies in these are less common on balanced soils but become significant in specific situations \u2014 alkaline soils, sandy soils, or after intensive high-nitrogen programmes.\n\n## Iron (Fe) \u2014 colour, hardening and moss control\n\nIron is the most commonly applied secondary nutrient in turf management. It has two distinct roles:\n\n**In the plant:**\n- Required for chlorophyll synthesis \u2014 without adequate iron, leaves yellow (interveinal chlorosis)\n- Hardens the plant \u2014 iron application increases disease resistance and winter toughness\n- Firms up soft, sappy growth produced by high nitrogen feeding\n\n**As a moss suppressant:**\n- Moss cells are more sensitive to iron than grass cells at the concentrations used in lawn treatments\n- Iron sulphate applied at 35g/m² or more blackens and kills moss\n- This is symptomatic control \u2014 it does not address the underlying cause of moss (shade, compaction, poor drainage, acidity)\n\n**Iron availability and pH:**\n- Iron becomes unavailable above pH 7.5 \u2014 iron sulphate gives poor results on alkaline soils\n- **Chelated iron** (EDTA or DTPA chelated) remains plant-available at higher pH and should be specified for alkaline soils and hard-water areas\n\n## Manganese (Mn)\n\n- Required for chlorophyll production and photosynthesis; works alongside iron\n- Deficiency produces interveinal yellowing, similar to iron deficiency\n- Also becomes unavailable at high pH\n- Combined iron and manganese products address both deficiencies simultaneously\n\n## Calcium (Ca)\n\n- Structural component of cell walls \u2014 important for root tip growth and overall cell integrity\n- Rarely deficient in UK soils \u2014 it's the dominant cation in most soils and leaches from limestone or chalk parent material\n- Lime applications supply calcium while raising pH\n\n## Magnesium (Mg)\n\n- The central atom in every chlorophyll molecule \u2014 without it, the plant cannot be green\n- Leaches readily from sandy, acidic soils\n- Deficiency shows as interveinal yellowing (similar to iron but usually in older leaves first)\n- Corrected with Epsom salts (magnesium sulphate) applied as a foliar spray or granular treatment\n\n## Sulphur (S)\n\n- Required for protein synthesis and enzyme function\n- Has an acidifying effect \u2014 useful on alkaline soils as a gradual pH-lowering treatment\n- Rarely deficient in its own right since many fertilisers supply it as ammonium sulphate or sulphate of potash\n\n[note]\nWhen a lawn shows yellowing that doesn't respond to nitrogen, the next step is to consider iron, manganese and magnesium deficiency \u2014 especially if the soil is alkaline, sandy or has been intensively fed with high-nitrogen products. A combined iron/manganese/magnesium liquid treatment is a useful diagnostic-and-treatment tool.\n[/note]",
      },
      {
        id: "nut-seasonal",
        title: "Seasonal Nutrition — What to Apply and When",
        section: "Nutrition Programmes",
        duration: "8 min",
        content:
          "The wrong nutrient at the wrong time of year can do more harm than no nutrient at all. A seasonal approach matches what the plant needs at each stage of its growth cycle.\n\n## Spring (March\u2013May) \u2014 growth and recovery\n\n**Goal**: restart growth after winter dormancy, rebuild leaf density, correct any deficiencies that developed over winter.\n\n**Nutrient focus:**\n- **High nitrogen (N)**: drives the growth response \u2014 fast green-up and density recovery\n- **Iron**: hardens sappy spring growth and suppresses any moss that survived winter\n- **Moderate potassium (K)**: supports root function as soil temperature rises\n\n**Typical NPK ratio**: something like 12-0-4 or 14-3-7 \u2014 nitrogen-led with supporting K\n\n**What to avoid**: high phosphorus in spring on established lawns \u2014 unnecessary and can encourage weed growth in some soils\n\n## Summer (June\u2013August) \u2014 maintenance and stress management\n\n**Goal**: maintain colour and density without driving excessive soft growth that increases drought stress and disease risk.\n\n**Nutrient focus:**\n- **Moderate nitrogen, slow-release preferred**: sustained feeding without flush growth spikes\n- **High potassium**: drought resistance and disease protection \u2014 this is when the K really earns its place\n- **Iron**: maintains hardness and colour without pushing growth\n\n**Typical NPK ratio**: something like 8-0-10 or 9-0-12 \u2014 lower nitrogen, higher K\n\n**What to avoid**: high ammoniacal nitrogen in dry periods \u2014 scorching risk without soil moisture to dilute\n\n## Autumn (September\u2013November) \u2014 hardening and preparation\n\n**Goal**: prepare the plant for winter \u2014 strengthen cells, improve root reserves, reduce susceptibility to frost and disease.\n\n**Nutrient focus:**\n- **Low nitrogen**: just enough to maintain colour and support recovery after any renovation work; too much nitrogen pushes soft growth that is frost-vulnerable\n- **Very high potassium**: the key autumn nutrient \u2014 cell hardening, frost resistance, disease resistance\n- **Iron**: hardening, disease resistance, moss suppression\n- **Phosphorus (if renovation done)**: root development in overseeded areas\n\n**Typical NPK ratio**: something like 4-5-12 or 3-8-10 \u2014 low N, high K, supportive P\n\n## Winter (December\u2013February) \u2014 minimal or none\n\nGrass is dormant or near-dormant. Nitrogen applied in winter is not taken up \u2014 it leaches from the soil and is wasted. Iron can be applied in mild spells to suppress moss and maintain a degree of hardness.\n\n[tip]\nWhen recommending an autumn treatment to a customer, lead with the protection story rather than the growth story. 'This is about getting your lawn through winter in good shape \u2014 the potassium strengthens the cells against frost and disease' is more compelling than 'it's just a feed' for a product that doesn't produce visible green-up.\n[/tip]",
      },
      {
        id: "nut-reading",
        title: "Reading a Fertiliser Label and Nutrient Ratios",
        section: "Practice",
        duration: "6 min",
        content:
          "Being able to read and explain a fertiliser label confidently is a basic professional skill. Customers will ask what they're putting on their lawn \u2014 you need to be able to answer.\n\n## The NPK number\n\nEvery fertiliser label shows an NPK ratio \u2014 three numbers separated by hyphens or dashes. For example: **12-4-8**\n\n- The first number is always nitrogen (N) \u2014 percentage by weight\n- The second is phosphorus (P, expressed as P2O5)\n- The third is potassium (K, expressed as K2O)\n\nSo a 50kg bag labelled 12-4-8 contains:\n- 6kg of nitrogen\n- 2kg of phosphorus\n- 4kg of potassium\n\n## What the numbers tell you about the product\n\n- **High first number (N)**: a growth/colour product \u2014 spring and summer use\n- **High third number (K)**: a hardening product \u2014 autumn/winter use or high-stress periods\n- **Equal or balanced (e.g. 7-7-7)**: a general-purpose maintenance product\n- **Second number (P) highlighted**: a seeding or establishment product\n\n## Slow-release indicators\n\nLabels may include terms like:\n- **SCU** (sulphur-coated urea): nitrogen released as coating degrades \u2014 typically 6\u201310 weeks\n- **Polymer-coated**: longer, more even release \u2014 10\u201316 weeks depending on product\n- **IBDU / methylene urea**: slower release, temperature-dependent\n- **MO** or **organic N**: the proportion from organic sources (slow, dependent on microbial activity)\n\nA product described as '70% slow-release nitrogen' will give a steadier, lower-scorch feeding response than one with predominantly fast-release nitrogen.\n\n## Application rates\n\nMost granular lawn fertilisers are applied at 35\u201350g/m². Always check the specific product rate.\n\n[alert]\nNever double-dose or over-apply fertiliser to try to accelerate results. Excess nitrogen causes scorch \u2014 brown, bleached patches that can take weeks to recover. It also increases disease risk and leaches nitrogen into groundwater. Stick to product rates.\n[/alert]",
      }
    ],
  },

  {
    id: "soil-biology",
    title: "Soil Biology and the Food Web \u2014 Advanced",    description: "The living community beneath your feet \u2014 bacteria, fungi, earthworms, nematodes, and how they interact to support lawn health.",
    icon: "Bug",
    emoji: "🦠",
    category: "Soil Science",
    estimatedTime: "37 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "bio-intro",
        title: "The Soil Food Web — an Overview",
        section: "Foundations",
        duration: "7 min",
        content:
          "Soil is not an inert growing medium. A single teaspoon of healthy topsoil contains more living organisms than there are people on Earth. Understanding this biological system explains why some treatments work and others don't, why some lawns thrive and others plateau, and why mechanical and cultural management decisions have knock-on effects far beyond the immediate visible result.\n\n## What is the soil food web?\n\nThe soil food web is the community of organisms that live in, eat, and are eaten by each other in the soil. It is a complex ecosystem with multiple trophic levels (feeding levels):\n\n1. **Primary producers**: plants and algae \u2014 produce organic matter via photosynthesis\n2. **Primary consumers**: bacteria, fungi, nematodes, protozoa \u2014 break down fresh organic matter\n3. **Secondary consumers**: predatory nematodes, mites, springtails \u2014 eat the primary consumers\n4. **Tertiary consumers**: larger invertebrates, beetles, centipedes \u2014 eat the secondary consumers\n\nEach level controls the one below it. A healthy food web is self-regulating \u2014 populations of pathogens and pest species are kept in check by their natural predators.\n\n## Why it matters for lawn management\n\nEvery management decision you make affects the soil food web:\n\n- **Aeration** opens up oxygen channels, allowing aerobic bacteria and fungi to colonise deeper\n- **Top-dressing with organic material** provides food for the decomposer community, feeding the whole food web upward\n- **Overuse of fungicide** kills pathogenic fungi but also suppresses beneficial mycorrhizal fungi and decomposers\n- **Compaction** collapses the pore space that the food web depends on\n- **Anaerobic conditions** shift the microbial community from aerobic (beneficial) to anaerobic (often toxic) organisms\n\n[tip]\nTreating the soil as a living system \u2014 not just a rooting medium \u2014 changes how you think about treatments. The goal isn't just to feed the grass. It's to support the system that supports the grass.\n[/tip]",
      },
      {
        id: "bio-bacteria",
        title: "Bacteria — The Decomposers and Nitrogen Cyclers",
        section: "Key Organisms",
        duration: "8 min",
        content:
          "Bacteria are the most numerous organisms in the soil and the foundation of nutrient cycling. Without them, the organic matter that enters the soil would simply accumulate \u2014 thatch would never break down, nutrients would stay locked in dead plant material, and the lawn would slowly choke.\n\n## What bacteria do\n\n**Decomposition**: break down dead organic matter (thatch, root debris, leaf fragments) into simpler compounds \u2014 releasing carbon dioxide, water and nutrients back into the soil solution where plants can access them.\n\n**Nitrogen cycling**: the most important bacterial process for lawn management:\n- **Ammonification**: bacteria convert organic nitrogen (from dead tissue) into ammonium (NH4+) \u2014 a plant-available form\n- **Nitrification**: specialist bacteria (Nitrosomonas and Nitrobacter) convert ammonium to nitrate (NO3-) \u2014 another plant-available form\n- **Nitrogen fixation**: some bacteria (Azotobacter, Rhizobium) capture atmospheric nitrogen and convert it to plant-available forms \u2014 the ultimate free nitrogen source\n\n**Disease suppression**: a diverse, active bacterial community outcompetes many soil-borne pathogens for resources and space \u2014 this is the biological mechanism behind the concept of 'soil health' reducing disease pressure.\n\n## What bacteria need to function\n\n- **Oxygen**: most soil bacteria are aerobic \u2014 they require oxygen. Compacted, waterlogged or anaerobic soils have a reduced and often harmful bacterial community\n- **Moisture**: bacteria are aquatic organisms living in the water films around soil particles \u2014 soil that is too dry halts bacterial activity\n- **Temperature**: bacterial activity is very low below 8°C, which is why decomposition slows dramatically in winter\n- **Organic matter as food**: a soil with no organic matter has little to feed the bacterial community\n\n## Practical implications\n\n- **Aeration** restores oxygen \u2014 directly stimulates aerobic bacterial activity and decomposition\n- **Top-dressing** with organic material feeds the bacterial community\n- **Avoiding anaerobic conditions** (via drainage and aeration) keeps the microbial community beneficial\n- **Soil temperature**: spring treatment programmes become effective when soil temperature consistently exceeds 8\u201310°C \u2014 below this, bacteria aren't active enough to cycle the nutrients being applied",
      },
      {
        id: "bio-fungi-gen",
        title: "Fungi — Decomposers, Pathogens and Beneficials",
        section: "Key Organisms",
        duration: "8 min",
        content:
          "Fungi in soil have a reputation problem \u2014 most people associate them with lawn diseases. In reality, the vast majority of soil fungi are beneficial decomposers or mutualistic partners of grass plants. The pathogenic species are a small minority.\n\n## Beneficial fungi \u2014 decomposers\n\nSaprophytic fungi break down the toughest components of organic matter that bacteria struggle with:\n\n- **Lignin**: the structural component of woody cell walls \u2014 fungi are the primary degraders of lignin in soil\n- **Cellulose**: the main structural carbohydrate in plant cell walls\n\nThese fungi are essential for thatch decomposition. In a soil with good fungal activity, lignin-rich thatch is broken down far faster than in one where fungi have been suppressed.\n\n## Pathogenic fungi \u2014 the minority\n\nThe fungi that cause lawn diseases \u2014 Laetisaria fuciformis (Red Thread), Microdochium nivale (Fusarium), Rhizoctonia solani (Brown Patch) \u2014 are real and significant, but they thrive in specific conditions:\n\n- **Red Thread**: nitrogen deficiency, acidic conditions, wet/humid weather\n- **Fusarium**: wet, mild autumn/winter conditions; excessive nitrogen in late season\n- **Dollar Spot**: warm, humid days and cool nights; low potassium\n\nThe most effective disease management is cultural: the right nutrition programme, correct mowing height, appropriate aeration, and conditions that favour the grass plant over the pathogen.\n\n## The balance between beneficial and pathogenic fungi\n\nA soil with a diverse, active fungal community has natural disease suppression \u2014 beneficial fungi compete with pathogens for space and resources. When fungicide is applied repeatedly, it doesn't discriminate: it suppresses beneficial fungi alongside pathogens.\n\n[warning]\nRepeated preventive fungicide use without cultural improvement is counterproductive in the long run. It suppresses the beneficial fungal community that naturally limits pathogen populations, and it can select for fungicide-resistant strains of pathogens. Fungicide is best used curatively \u2014 after cultural management has been maximised.\n[/warning]",
      },
      {
        id: "bio-invertebrates",
        title: "Earthworms, Nematodes and Soil Invertebrates",
        section: "Key Organisms",
        duration: "7 min",
        content:
          "The visible end of the soil food web \u2014 earthworms, nematodes, insects and other invertebrates \u2014 are the engineers and regulators of soil structure and biology.\n\n## Earthworms \u2014 the soil engineers\n\nEarthworms are the most important macro-organism in the soil food web for practical lawn management.\n\n**What they do:**\n- Consume organic matter and excrete it as worm casts \u2014 which are nutrient-rich aggregates with excellent structure\n- Create channels and burrows that improve drainage and aeration \u2014 a lawn with healthy earthworm populations aerates itself to a degree\n- Mix organic matter downward into the mineral soil \u2014 the best natural top-dressing mechanism\n- Their casts have a pH closer to neutral than surrounding soil \u2014 they naturally moderate soil pH over time\n\n**What threatens earthworm populations:**\n- Acidic soil (pH below 5.5) \u2014 earthworms are highly sensitive to acidity\n- Compaction \u2014 they can't move through dense soil\n- Waterlogging \u2014 anaerobic conditions are lethal to them\n- Some pesticides \u2014 particularly certain insecticides; be aware of product ecotoxicity data\n\n**The worm cast dilemma**: on highly managed fine turf, worm casts are a problem (they smother fine grasses and create muddy, slippery surfaces). On domestic lawns, they are a sign of a healthy, biologically active soil. Discourage worm eradication on domestic lawns \u2014 the cost to soil health is not worth the cosmetic benefit.\n\n## Nematodes\n\nMicroscopic roundworms \u2014 billions per square metre in healthy soil. Most are beneficial:\n- **Bacterial-feeding nematodes**: consume bacteria, releasing nutrients locked inside into plant-available forms\n- **Fungal-feeding nematodes**: graze on fungal hyphae \u2014 part of the food web regulation\n- **Predatory nematodes**: eat other nematodes and small soil invertebrates \u2014 population regulators\n\n**Pathogenic nematodes** (e.g. stem nematodes affecting grass) exist but are rarely a significant problem in UK domestic lawns.\n\n**Beneficial nematodes as biocontrol**: Steinernema and Heterorhabditis nematodes are commercially available and are applied as a biological control for Leatherjacket and Chafer Grub larvae. They enter the larvae, release symbiotic bacteria, and kill the host within days.\n\n[tip]\nWhen explaining nematode treatments to customers, reassure them that nematodes are natural, already present in healthy soil, and target only specific larvae \u2014 they're not a pesticide. This often makes customers more comfortable than hearing 'chemical treatment'.\n[/tip]",
      },
      {
        id: "bio-management",
        title: "Managing for Soil Biology",
        section: "Practical Management",
        duration: "7 min",
        content:
          "Understanding the soil food web changes how you approach lawn management. Instead of treating each problem in isolation, you think about how management decisions affect the whole biological system.\n\n## Building biological activity\n\n**Aeration** is the single most impactful action for soil biology. It:\n- Restores oxygen \u2014 the fuel of the aerobic microbial community\n- Reduces waterlogging \u2014 eliminates the anaerobic conditions that suppress beneficial organisms\n- Creates channels for fungi to colonise deeper horizons\n\n**Organic matter input** feeds the food web from the bottom up. Top-dressing with organic material, leaving fine clippings, and including composted materials in top-dressing mixes all contribute.\n\n**Avoiding overuse of pesticides** \u2014 fungicides and some insecticides affect non-target organisms. This doesn't mean never using them, but it means using them purposefully and curatively rather than routinely.\n\n**Maintaining adequate pH** \u2014 the soil food web is most active and diverse in the pH 6.0\u20137.0 range. Acidic conditions suppress it significantly.\n\n## Biological products\n\nA growing range of commercial products contains beneficial soil microorganisms:\n- **Bacterial inoculants**: introduce nitrogen-fixing or decomposition-enhancing bacteria\n- **Mycorrhizal inoculants**: colonise roots (covered in the mycorrhizal fungi module)\n- **Seaweed and humate products**: stimulate existing microbial activity rather than introducing new organisms\n\nThese products are most effective when applied to soils that have the conditions to support them \u2014 adequate aeration, correct pH, and organic matter. They cannot compensate for fundamentally hostile soil conditions.\n\n## The big picture\n\nA lawn with a healthy soil food web:\n- Requires fewer inputs to maintain colour and density\n- Breaks down thatch naturally \u2014 reducing the need for mechanical scarification\n- Has better disease suppression \u2014 reducing fungicide dependence\n- Recovers faster from stress \u2014 drought, wear, disease\n\nThis is why long-term, consistent care produces a better lawn than episodic intensive treatment. You are building a biological system, not just feeding a plant.",
      }
    ],
  },

  {
    id: "mycorrhizal-fungi",
    title: "Mycorrhizal Fungi \u2014 The Root Partnership",
    description: "The ancient symbiosis between fungi and grass roots \u2014 how it works, the benefits it delivers, and how management decisions support or undermine it.",
    icon: "Network",
    emoji: "🍄",
    category: "Soil Science",
    estimatedTime: "31 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "myco-what",
        title: "What Are Mycorrhizal Fungi?",
        section: "Foundations",
        duration: "7 min",
        content:
          "Mycorrhizal fungi form one of the most important and ancient partnerships in plant biology. The name comes from the Greek: mykos (fungus) + rhiza (root). These fungi live in close association with plant roots in a relationship that is mutually beneficial \u2014 a true symbiosis.\n\n## How old is this relationship?\n\nFossil evidence suggests that mycorrhizal associations have existed for over **450 million years** \u2014 predating vascular plants. It is thought that early plants were only able to colonise land with the help of fungal partners that could extract minerals from bare rock. The relationship is, in an evolutionary sense, what allowed plants to exist on land at all.\n\nAn estimated 80\u201390% of all plant species on Earth form mycorrhizal associations. Grass plants are included \u2014 most lawn grasses, including perennial ryegrass, fescues and bents, can form mycorrhizal associations.\n\n## The basic mechanism\n\nMycorrhizal fungi colonise the root tissue of the grass plant. Their thread-like structures (hyphae) extend far beyond the root surface into the surrounding soil \u2014 creating a vastly expanded network for water and nutrient uptake.\n\nTo visualise the scale: a well-colonised root system may have hundreds of metres of fungal hyphae per gram of root, each hypha only a few micrometres wide, exploring soil pores that roots themselves could never penetrate.\n\n**What the plant gives the fungus:**\n- Carbohydrates (sugars) \u2014 produced by photosynthesis; the fungus cannot photosynthesise itself\n\n**What the fungus gives the plant:**\n- Extended water and nutrient uptake reach\n- Access to phosphorus, nitrogen, zinc, copper and other minerals in forms the root alone could not access\n- Improved drought tolerance\n- Enhanced disease resistance\n\nThis exchange \u2014 carbon for minerals \u2014 is the heart of the symbiosis.",
      },
      {
        id: "myco-types",
        title: "Types of Mycorrhizal Fungi and How They Work",
        section: "Biology",
        duration: "8 min",
        content:
          "There are two main categories of mycorrhizal fungi. They differ in how they interact with root cells \u2014 and their distribution in plant species is different.\n\n## Ectomycorrhizae\n\nForm a sheath (mantle) around the outside of root tips. Their hyphae penetrate between root cells but not inside them.\n\n- Associated mainly with trees \u2014 oak, pine, beech, birch\n- Create the visible 'clubs' and swollen root tips seen when examining tree roots\n- The fungi in this category include many edible mushroom species (truffles, porcini, chanterelles)\n- Not typically associated with grass plants\n\n## Arbuscular Mycorrhizae (AM fungi) \u2014 the grass plant partner\n\nThese are the mycorrhizal fungi most relevant to lawn management. They:\n- Penetrate inside root cells, forming branched structures called **arbuscules** \u2014 the actual exchange surfaces where nutrients and carbon are traded\n- Also form storage structures called **vesicles** inside root cells\n- Are classified as **Glomeromycota** \u2014 a distinct fungal group\n- Cannot be cultured in isolation (they can only grow in association with a living plant root)\n\n**How the arbuscule works:**\nThe arbuscule is an enormously branched structure that maximises surface area inside the root cell without breaching the cell membrane. Phosphorus, nitrogen and water move from the fungus across this interface into the plant. Carbon moves in the opposite direction.\n\n## The hyphal network\n\nThe hyphae (fungal threads) extending outward from the root surface are the key structural advantage of the association:\n\n- Hyphae are 2\u20135 micrometres wide \u2014 10\u201350 times narrower than even fine root hairs\n- They penetrate soil pores and aggregate spaces that roots cannot reach\n- A single plant may have hyphal networks extending metres beyond the root zone\n- Hyphae of different plants can connect \u2014 AM fungal networks link multiple plants, enabling chemical signalling between them\n\n[note]\nThe hyphal network surrounding a colonised root is sometimes called the **Wood Wide Web** in popular science \u2014 though this term is more accurately applied to forest tree networks. The principle is the same: fungal hyphae connect plants and enable resource sharing in ways the plants alone could not achieve.\n[/note]",
      },
      {
        id: "myco-benefits",
        title: "Benefits to Grass Plants — and the Implications for Management",
        section: "Practical Benefits",
        duration: "9 min",
        content:
          "The mycorrhizal association delivers measurable benefits to grass plants across several dimensions. Understanding these helps explain why soil health matters \u2014 and why some management practices undermine long-term performance.\n\n## Phosphorus uptake\n\nPhosphorus is the most significant nutrient delivered by mycorrhizal fungi. Phosphorus moves very slowly through soil \u2014 it doesn't flow with water the way nitrogen does. Instead, it diffuses extremely slowly from soil particles to root surfaces.\n\nThe problem: roots quickly deplete phosphorus in the immediate soil around them, creating a depletion zone. The plant has no way to reach phosphorus beyond this zone \u2014 except via mycorrhizal hyphae, which extend far beyond it.\n\n**Practical implication**: mycorrhizal fungi can dramatically improve phosphorus uptake efficiency in soils where phosphorus exists but is poorly accessible. This is particularly relevant on soils where pH problems make phosphorus less available.\n\n## Drought tolerance\n\nThe extended hyphal network accesses water in smaller soil pores than roots can reach. In dry conditions:\n- A mycorrhizal plant maintains water uptake longer than a non-mycorrhizal plant\n- The plant shows delayed wilting and faster recovery after drought\n- This effect is most pronounced in sandy or free-draining soils\n\n## Disease resistance\n\nMycorrhizal colonisation activates the plant's own defence systems (systemic induced resistance). Colonised plants show:\n- Greater resistance to soil-borne fungal pathogens\n- Faster recovery from pathogen attack\n- This is partly because mycorrhizal fungi occupy root space that pathogens would otherwise colonise\n\n## What suppresses mycorrhizal colonisation\n\n[warning]\nSeveral common lawn management practices significantly reduce mycorrhizal colonisation:\n\n- **High phosphorus fertiliser**: when phosphorus is abundant, the plant has less incentive to invest carbon in the fungal partnership and actively reduces colonisation. Regular high-phosphorus feeding progressively reduces the mycorrhizal association.\n- **Broad-spectrum fungicide**: kills or suppresses mycorrhizal fungi alongside pathogenic species\n- **Soil disturbance**: deep cultivation, rotavation and aggressive scarification disrupt the hyphal network\n- **Bare soil between renovations**: AM fungi cannot survive without a living host root \u2014 long periods of bare soil after renovation reduce fungal populations\n[/warning]",
      },
      {
        id: "myco-products",
        title: "Mycorrhizal Inoculants — What They Are and When to Use Them",
        section: "Application",
        duration: "7 min",
        content:
          "Mycorrhizal inoculant products have become increasingly common in the turf and horticulture market. Understanding what they contain and when they actually help \u2014 versus when they're redundant \u2014 is important for honest customer advice.\n\n## What mycorrhizal inoculants contain\n\nMost commercial inoculants contain spores or colonised root fragments of Arbuscular Mycorrhizal (AM) fungi \u2014 typically species from the genus Rhizophagus (formerly Glomus) and related Glomeromycota.\n\nSome products also include:\n- Beneficial bacteria (Trichoderma, Bacillus, Pseudomonas species) alongside the fungi\n- Humates, seaweed or other biostimulants to support establishment\n\n## When inoculants are genuinely beneficial\n\n**Renovation and seeding**: at seeding, there are no established mycorrhizal networks in the rootzone. Applying inoculant in the seed bed or as a seed coating gives new seedlings access to the fungal partnership from the earliest stage \u2014 improving establishment rate and drought tolerance.\n\n**Soil disturbance after renovation**: aggressive scarification and aeration disrupts existing hyphal networks. Inoculant application after renovation reintroduces fungi into disturbed soil.\n\n**Soils with depleted fungal populations**: heavily managed soils with a history of fungicide use, repeated cultivation, or long periods of bare soil may have reduced native AM fungal populations. Inoculants can help restore diversity.\n\n**Transplanted turf**: when laying turf rolls, the mycorrhizal network from the turf's original growing site is disrupted. Inoculant applied to the soil before laying turf can accelerate re-establishment.\n\n## When inoculants are likely redundant\n\n- **Healthy, established lawns with good soil biology**: native AM fungal populations are already present and will colonise roots naturally\n- **High-phosphorus soils**: excess phosphorus suppresses mycorrhizal colonisation regardless of inoculant application\n- **Immediately before fungicide application**: obvious conflict\n\n## Honest expectations\n\nMycorrhizal inoculants are not a quick fix. Their effect is cumulative and most visible over a full growing season or more. The most important condition for them to work is that the soil environment supports fungal activity \u2014 correct pH, adequate aeration, and organic matter.\n\n[tip]\nMycorrhizal inoculant as part of a renovation seed bed preparation is a credible, evidence-based recommendation \u2014 particularly on new-build soils or heavily managed sites. Position it alongside correct pH, good seed-to-soil contact and a pre-seeding fertiliser as part of a complete renovation package.\n[/tip]",
      }
    ],
  },

  {
    id: "plant-nutrients-basic",
    title: "Plant Nutrients \u2014 The Essentials",
    description: "What N, P, K, iron and magnesium do for grass plants, how to recognise deficiencies, and a plain-terms seasonal feeding guide.",
    icon: "Leaf",
    emoji: "🌿",
    category: "Nutrition",
    estimatedTime: "35 min",
    roles: ["technician"],
    stage: "diagnostic-foundations",
    lessons: [
      {
        id: "pnb-intro",
        title: "Why Plants Need Nutrients",
        section: "Foundations",
        duration: "6 min",
        content:
          "Every treatment you apply \u2014 fertiliser, iron, liquid feed \u2014 is putting nutrients into the plant's environment. Understanding what those nutrients do is what separates a technician who knows what they're applying from one who's just following instructions.\n\n## Plants make their own food \u2014 but they need raw materials\n\nGrass plants produce their own energy via photosynthesis \u2014 sunlight + water + carbon dioxide = sugars. But photosynthesis alone isn't enough. Plants also need mineral nutrients absorbed from the soil through their roots.\n\nWithout nutrients:\n- The plant can't produce chlorophyll (no green colour)\n- It can't build new cells (no growth)\n- It can't regulate water (no drought resilience)\n- It can't fight off disease (reduced resistance)\n\n## The three major nutrients\n\nEvery fertiliser product is built around three letters: **N, P and K**.\n\n- **N** = Nitrogen \u2014 drives leaf growth and green colour\n- **P** = Phosphorus \u2014 drives root development\n- **K** = Potassium \u2014 builds resilience against stress, disease and frost\n\nThese appear as a three-number ratio on every fertiliser label \u2014 for example, 12-4-8 means 12% nitrogen, 4% phosphorus, 8% potassium.\n\n## Why balance matters\n\nMore isn't always better. A lawn fed with very high nitrogen but low potassium produces soft, lush top growth that's vulnerable to disease and drought. A lawn fed with too much phosphorus on an already phosphorus-rich soil gains little \u2014 the nutrient is locked up, unavailable.\n\nGood nutrition is about the right nutrients at the right time in the right amounts.\n\n[tip]\nWhen a customer asks what the treatment does, the simplest honest answer is: 'It's a balanced feed \u2014 nitrogen for colour and growth, potassium for strength and disease resistance.' Most customers respond well to that level of plain-language explanation.\n[/tip]",
      },
      {
        id: "pnb-nitrogen",
        title: "Nitrogen — Growth, Colour and How to Apply It",
        section: "Major Nutrients",
        duration: "8 min",
        content:
          "Nitrogen is the nutrient that produces the most visible and immediate results. It's also the most easily over-applied \u2014 and the most commonly wasted. Understanding it properly is one of the highest-value things a technician can learn.\n\n## What nitrogen does in the plant\n\n- **Chlorophyll production**: nitrogen is the central atom in the chlorophyll molecule. More nitrogen = more chlorophyll = deeper green colour\n- **Cell division and growth**: nitrogen drives the production of new leaf tissue; it's the reason nitrogen treatments produce visible green-up within days\n- **Protein synthesis**: all enzymes and structural proteins require nitrogen\n\n## What deficiency looks like\n\n- **Overall pale yellow-green colour** across the whole lawn \u2014 not patches, the whole sward\n- **Slow or absent growth response** \u2014 the lawn isn't thickening\n- **Increased Red Thread susceptibility** \u2014 the fungal pathogen that causes Red Thread thrives when nitrogen is low\n\nThe key diagnostic: if the entire lawn is yellowing evenly, nitrogen deficiency is likely. If patches are yellow and the rest is green, look at iron, disease or waterlogging instead.\n\n## Fast-release vs slow-release nitrogen\n\nNot all nitrogen works the same way:\n\n- **Fast-release (ammoniacal, urea)**: absorbed quickly \u2014 visible green-up within 5\u20137 days; higher scorch risk if applied in dry conditions; can acidify soil with long-term use\n- **Slow-release (polymer-coated, SCU, IBDU)**: releases gradually over 8\u201316 weeks; lower scorch risk; sustained feeding without growth peaks\n\nSpring and summer products often blend both: fast-release for immediate response, slow-release for sustained feeding.\n\n## What to avoid\n\n[alert]\nNever apply high-nitrogen fertiliser to a drought-stressed or dry lawn without adequate soil moisture. The concentrated nitrogen in dry soil scorches roots and leaf bases \u2014 you'll see brown, bleached patches within a few days. When in doubt, check the soil moisture before applying.\n[/alert]",
      },
      {
        id: "pnb-pk",
        title: "Phosphorus and Potassium — Roots, Hardness and Recovery",
        section: "Major Nutrients",
        duration: "7 min",
        content:
          "Phosphorus and potassium are less visible in their day-to-day effects than nitrogen, but they're responsible for the structural resilience that makes a lawn perform well through stress.\n\n## Phosphorus (P) \u2014 building roots and establishing plants\n\nPhosphorus drives root cell division and energy transfer within the plant. It's most important during:\n- **Germination and establishment** \u2014 seedlings need phosphorus to develop a root system\n- **Renovation recovery** \u2014 after scarification and overseeding, phosphorus supports the new seedlings' root establishment\n\n**What deficiency looks like:**\n- Poor germination or slow establishment after overseeding\n- Reddish or purple discolouration of leaf blades, especially in cold weather or on compacted soils\n- Thin, slow recovery after renovation\n\n**Practical note**: established lawns on UK soil rarely need extra phosphorus. It accumulates and doesn't leach easily. Phosphorus matters most in **pre-seeding fertilisers** \u2014 look for a higher middle number (e.g. 5-10-5) for overseeding situations.\n\n## Potassium (K) \u2014 resilience, hardening and protection\n\nPotassium is often described as the 'insurance' nutrient. It doesn't produce dramatic visual changes, but it protects the plant from stress of all kinds:\n\n- **Regulates water movement** through cell membranes \u2014 critical for drought resistance and rapid drought recovery\n- **Strengthens cell walls** \u2014 more resistant to frost damage, wear and disease pressure\n- **Improves root function** and overall nutrient uptake efficiency\n\n**What deficiency looks like:**\n- Increased disease susceptibility, particularly fungal diseases in autumn\n- Slower drought recovery \u2014 the lawn goes dormant earlier and takes longer to green up\n- Scorched or browning leaf margins in severe cases\n\n**Autumn programmes are deliberately high-K** \u2014 this is when potassium earns its place most visibly. The winter hardening effect is the main reason autumn treatments matter beyond just feeding.\n\n[tip]\nWhen explaining autumn treatment to a customer, lead with potassium: 'The high potassium in this programme hardens the grass cells against frost \u2014 it's about getting the lawn through winter in the best possible condition, not just about feeding it.'\n[/tip]",
      },
      {
        id: "pnb-iron-mag",
        title: "Iron and Magnesium — The Colour Nutrients",
        section: "Key Secondary Nutrients",
        duration: "7 min",
        content:
          "Beyond N, P and K, two secondary nutrients are particularly relevant to everyday lawn management: iron and magnesium. Both affect colour directly, and both are commonly deficient in specific soil types.\n\n## Iron (Fe) \u2014 colour, hardening and moss control\n\nIron has three distinct roles in lawn management:\n\n**1. Chlorophyll synthesis**: iron is required to produce chlorophyll \u2014 without adequate iron, leaves yellow between the veins (interveinal chlorosis). The veins stay green but the tissue between them turns yellow.\n\n**2. Plant hardening**: iron applications firm up soft, sappy growth \u2014 particularly valuable after high-nitrogen feeding. A lawn treated with iron alongside nitrogen is darker, denser and more disease-resistant.\n\n**3. Moss suppression**: at application concentrations used in lawn treatments, iron is more toxic to moss cells than grass cells. This is why iron sulphate is the standard moss control treatment. Important: it kills the moss but doesn't address the cause (shade, compaction, poor drainage, acidity).\n\n**When standard iron treatments underperform**: above pH 7.5, iron sulphate becomes chemically unavailable almost immediately after application. In alkaline or hard-water soils, specify **chelated iron** instead \u2014 it remains plant-available across a much wider pH range.\n\n## Magnesium (Mg) \u2014 the heart of every chlorophyll molecule\n\nEvery chlorophyll molecule has a magnesium atom at its centre. Without magnesium, the plant literally cannot be green.\n\n**What deficiency looks like:**\n- Interveinal yellowing \u2014 similar to iron deficiency, but tends to appear in older leaves first (magnesium is mobile and moves from old to new growth)\n- Most common on sandy, acidic or heavily leached soils\n\n**How to correct it:**\n- Epsom salts (magnesium sulphate) applied as a foliar spray or granular treatment \u2014 fast response\n- Commonly included in combined liquid iron/magnesium products\n\n[note]\nIf a lawn is yellowing and doesn't respond to a standard nitrogen application, the next step is combined iron and magnesium. These cover the two most common secondary deficiencies and produce visible results within a week on a responsive lawn.\n[/note]",
      },
      {
        id: "pnb-programme",
        title: "The Seasonal Nutrition Programme in Plain Terms",
        section: "Nutrition in Practice",
        duration: "7 min",
        content:
          "A seasonal nutrition programme matches what the plant needs at each stage of the year. Applying the wrong nutrient at the wrong time can be counterproductive \u2014 high nitrogen in autumn pushes soft growth that's frost-vulnerable; no potassium in summer leaves the plant exposed to disease.\n\n## Spring (March\u2013May) \u2014 restart and rebuild\n\n**What the plant needs**: nitrogen to restart growth, iron to harden spring growth and suppress moss, moderate potassium to support root function.\n\n**What to apply**: a high-nitrogen spring fertiliser, typically combined with iron. Look for something in the region of 12-0-4 or 14-3-7.\n\n**What to avoid**: heavy potassium at this stage \u2014 the grass is in growth mode and needs nitrogen, not stress protection.\n\n**Timing**: as soon as soil temperature consistently reaches 8\u201310°C and conditions allow. Early spring treatments can be wasted if soil is too cold for root activity.\n\n## Summer (June\u2013August) \u2014 maintain without overdoing it\n\n**What the plant needs**: steady, moderate nitrogen (not a flush of growth), high potassium for drought and disease resilience.\n\n**What to apply**: a maintenance product with moderate nitrogen and higher potassium \u2014 something like 8-0-10 or 9-0-12. Slow-release nitrogen preferred.\n\n**In drought**: reduce or pause nitrogen applications. Nitrogen applied to drought-stressed grass increases scorch risk without the growth benefit.\n\n## Autumn (September\u2013November) \u2014 harden and prepare for winter\n\n**What the plant needs**: low nitrogen (just enough to maintain colour and support renovation recovery), very high potassium, iron, and phosphorus if overseeding.\n\n**What to apply**: an autumn/winter hardener \u2014 something like 4-5-12 or 3-8-10. Combined with iron.\n\n**Critical point**: do NOT apply high nitrogen in autumn. Soft, lush growth produced by excess autumn nitrogen is vulnerable to frost damage and Fusarium (snow mould). The high potassium of autumn products is the active ingredient.\n\n## Winter (December\u2013February) \u2014 minimal\n\nGrass is near-dormant. Nitrogen applied in winter is largely wasted \u2014 it leaches from the soil before roots can access it. Iron can be applied in mild spells to suppress moss.\n\n[tip]\nA common customer question in early spring: 'Why has the treatment made it look worse?' They're often seeing iron-blackened moss that's died back. Prepare customers before autumn iron/moss treatments: 'The lawn will look darker and a bit patchy as the moss dies \u2014 that's the treatment working. It'll clear in a few weeks.'\n[/tip]",
      }
    ],
  },

  {
    id: "soil-biology-basic",
    title: "Soil Biology \u2014 The Essentials",
    description: "What lives in the soil, why it matters for lawn health, how to assess biological activity in the field, and which management decisions help or harm.",
    icon: "Sprout",
    emoji: "🪱",
    category: "Soil Science",
    estimatedTime: "33 min",
    roles: ["technician"],
    stage: "diagnostic-foundations",
    lessons: [
      {
        id: "sbb-intro",
        title: "The Living Soil — Why Biology Matters",
        section: "Foundations",
        duration: "6 min",
        content:
          "Most people treat soil as a passive growing medium \u2014 something grass sits in. In reality, healthy soil is one of the most biologically complex environments on the planet. A single teaspoon contains more living organisms than there are people on Earth.\n\nThis isn't just an interesting fact \u2014 it has direct practical implications for how a lawn responds to treatments, how thatch accumulates, how nutrients become available, and how quickly a lawn recovers from stress.\n\n## What's actually down there\n\nSoil life exists at multiple scales:\n\n- **Bacteria** \u2014 the most numerous; decompose organic matter and cycle nutrients\n- **Fungi** \u2014 break down tough organic material (lignin, cellulose); some form partnerships with roots\n- **Earthworms** \u2014 physical engineers; mix soil, create drainage channels, process organic matter\n- **Nematodes** \u2014 microscopic roundworms; most are beneficial decomposers and predators\n- **Protozoa** \u2014 microscopic single-celled organisms; consume bacteria and release nutrients\n- **Insects and mites** \u2014 shred organic matter into smaller pieces for bacteria to process\n\nThese groups form a food web \u2014 each group feeds on others, keeping populations balanced.\n\n## Why this matters for your work\n\n- **Thatch decomposition** is driven by soil organisms, not mechanical processes alone. Aeration creates the conditions they need. Compacted, anaerobic soil has a depleted biological community \u2014 thatch accumulates faster.\n- **Nutrient availability** depends on bacteria converting organic matter into plant-available forms. Cold, waterlogged or compacted soil slows this process \u2014 treatments become less effective.\n- **Disease suppression** \u2014 a diverse biological community competes with pathogens for space and resources. A biologically depleted soil is more vulnerable to disease.\n\n[tip]\nThe soil smell test \u2014 earthy and mineral = healthy aerobic biology; drain/egg smell = anaerobic, depleted biology. You can assess soil health in seconds by smell alone. Show customers this test \u2014 it's instantly compelling.\n[/tip]",
      },
      {
        id: "sbb-earthworms",
        title: "Earthworms — The Soil's Best Engineers",
        section: "Key Organisms",
        duration: "7 min",
        content:
          "Of all the organisms in the soil, earthworms are the most important for the practical lawn manager. They are visible, measurable, and their presence or absence tells you a great deal about soil health.\n\n## What earthworms do\n\n**Physical engineering:**\n- Create channels and burrows that improve drainage and aeration\n- A healthy earthworm population aerates a lawn naturally to a meaningful degree \u2014 their burrows go down 300\u2013500mm\n- Mix organic matter down from the surface into the soil profile\n\n**Nutrient cycling:**\n- Consume organic matter and excrete it as **worm casts** \u2014 concentrated, nutrient-rich aggregates with excellent soil structure\n- Worm casts have a pH closer to neutral than the surrounding soil \u2014 earthworms naturally buffer extreme soil pH over time\n- The nutrient content of worm casts is several times higher than the surrounding soil\n\n## What their presence tells you\n\nA lawn with visible worm activity (casts on the surface after rain, worms visible when probing) has:\n- Adequate moisture\n- pH above 5.5 (earthworms are highly sensitive to acidity)\n- Reasonable organic matter content\n- Not recently treated with chemicals that harm earthworms\n\nAbsence of earthworms in a lawn that should support them suggests: strongly acidic soil, severe compaction, waterlogging, or a history of harmful chemical use.\n\n## The worm cast issue\n\nOn highly managed lawns, worm casts are a cosmetic problem \u2014 they smear and create muddy, uneven surfaces. On domestic lawns, however, they're a positive sign. The biological benefit of a healthy worm population vastly outweighs the cosmetic issue.\n\n[note]\nEncourage customers to leave worm casts alone in dry weather \u2014 they'll dry out and disperse with wind and mowing. Smearing wet casts creates muddy patches. If they're persistent and bothersome, a lawn with good drainage will have fewer.\n[/note]",
      },
      {
        id: "sbb-bacteria",
        title: "Bacteria and Nutrient Cycling — How the Lawn Feeds Itself",
        section: "Key Organisms",
        duration: "7 min",
        content:
          "Bacteria are the primary decomposers in soil \u2014 they break down dead organic matter and, in doing so, release nutrients that the grass can use. Without bacteria, organic matter would just pile up and nutrients would stay locked in dead material indefinitely.\n\n## The decomposition process in plain terms\n\nWhen grass clippings, thatch, dead roots and other organic material are broken down by bacteria, the process releases:\n- **Carbon dioxide** \u2014 returns to the atmosphere\n- **Water** \u2014 returns to the soil\n- **Mineral nutrients** \u2014 become plant-available in the soil solution\n\nThis is why a biologically active soil feeds the grass even between fertiliser applications. The microbial community is continuously processing organic matter and releasing nutrients.\n\n## Nitrogen cycling \u2014 the most important bacterial function\n\nNitrogen exists in dead organic matter in an organic form the plant can't use directly. Bacteria convert it through two steps:\n\n1. **Ammonification**: bacteria convert organic nitrogen to ammonium (NH4+) \u2014 a form plants can absorb\n2. **Nitrification**: specialist bacteria convert ammonium to nitrate (NO3-) \u2014 another plant-available form\n\nThis is why soil temperature matters: bacterial activity drops dramatically below 8°C. Fertiliser applied in cold, biologically inactive soil produces a much slower response \u2014 the bacteria aren't active enough to complete the conversion.\n\n## What bacteria need to work\n\n- **Oxygen** \u2014 most soil bacteria are aerobic; compacted, waterlogged soil kills the beneficial community\n- **Moisture** \u2014 bacteria live in the water films around soil particles; drought halts activity\n- **Temperature** \u2014 below 8°C activity drops sharply; peak activity at 20\u201330°C\n- **Organic matter** \u2014 their food source\n\n[tip]\nThis is why hollow-tine aeration improves treatment response beyond just mechanical compaction relief. It restores oxygen to the bacterial community, which then becomes more active, cycling nutrients faster and making fertiliser treatments more effective.\n[/tip]",
      },
      {
        id: "sbb-health",
        title: "What Healthy Soil Looks, Smells and Feels Like",
        section: "Field Assessment",
        duration: "6 min",
        content:
          "Being able to read soil biology in the field \u2014 quickly and without equipment \u2014 is a skill that builds credibility with customers and informs every recommendation you make.\n\n## The smell test\n\nPush your finger or a probe 50\u201375mm into the soil. Pull it out and smell it.\n\n**Good (earthy/mineral smell)**: a classic 'fresh earth' smell is produced by Geosmin \u2014 a compound released by actinobacteria. This is healthy aerobic biological activity. You want this smell.\n\n**Bad (drain/egg smell)**: hydrogen sulphide is released by anaerobic bacteria that thrive when oxygen is absent. Anaerobic soil means waterlogging, compaction, or both. Treatments applied to anaerobic soil are largely wasted \u2014 roots can't function properly, and the bacterial community that normally cycles nutrients is replaced by one that produces toxic by-products.\n\n**Sour or musty**: elevated fungal activity in the thatch layer. Not always a problem, but worth noting alongside any disease symptoms.\n\n## The bounce test\n\nPress your palm firmly into the lawn and bounce it gently:\n- **Springy/spongy**: significant thatch \u2014 the biological decomposition system has fallen behind production\n- **Firm**: compaction \u2014 the pore space that biology needs has been crushed\n- **Wet and squashy**: waterlogging \u2014 almost certainly anaerobic below\n\n## What healthy soil looks like\n\nWhen you pull a plug or cut a cross-section:\n- **Dark colour** \u2014 indicates organic matter content; pale soil is low in organic matter\n- **Visible fine roots** penetrating well into the profile\n- **Small pores and channels** visible under magnification \u2014 these are the spaces biology lives in\n- **Earthworm evidence** \u2014 channels, casts, or earthworms themselves\n\nCompare this to a compacted lawn: pale, dense, roots matted near the surface, no visible pore structure.",
      },
      {
        id: "sbb-management",
        title: "Management Choices That Help or Harm Soil Life",
        section: "Practical Management",
        duration: "7 min",
        content:
          "Every management decision you make affects the biological community in the soil. Most of the damage is done through good intentions \u2014 over-treating, under-aerating, or applying the wrong product at the wrong time.\n\n## The most impactful positive actions\n\n**Hollow-tine aeration** is the single most biologically beneficial treatment you can apply:\n- Restores oxygen \u2014 directly stimulates aerobic bacterial activity\n- Removes compacted material \u2014 creates space for biological colonisation\n- Reduces waterlogging \u2014 eliminates anaerobic conditions\n- Effect: measurably improved biological activity within weeks of aeration\n\n**Top-dressing with organic material** feeds the biological community from the bottom up. Organic top-dressing supplies food for bacteria and fungi, increasing decomposer activity and nutrient cycling.\n\n**Maintaining correct pH** (6.0\u20137.0) \u2014 the biological community is most diverse and active in this range. Below 5.5, many beneficial species become less active or absent.\n\n## Common mistakes that suppress biology\n\n- **Overuse of fungicide**: doesn't discriminate between pathogenic and beneficial fungi. Repeated preventive applications reduce the beneficial fungal community that competes with pathogens\n- **Excessive pesticide use generally**: earthworms and other invertebrates are sensitive to many products\n- **Ignoring anaerobic conditions**: waterlogged or severely compacted soil progressively loses its biological community. Treatments become less effective over time as the system degrades\n- **Scalping the lawn**: removing the leaf canopy exposes soil to UV and temperature extremes, reducing surface moisture and suppressing the microbial activity that occurs at the soil surface\n\n[note]\nThe practical takeaway: aeration and organic top-dressing do more to support long-term lawn health than almost any chemical treatment. They fix the system that everything else depends on.\n[/note]",
      }
    ],
  },

  {
    id: "weed-basics",
    title: "Weed Control \u2014 The Basics",
    description: "What weeds are, how they establish, identification of the five most common UK lawn weeds, and first-line cultural and chemical control.",
    icon: "Scissors",
    emoji: "🌾",
    category: "Weed Management",
    estimatedTime: "33 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "wb-what",
        title: "What Is a Weed and Why Does It Matter?",
        section: "Foundations",
        duration: "6 min",
        content:
          "In technical terms, a weed is simply a plant growing where it isn't wanted. In lawn management, weeds matter because they compete with grass for water, nutrients and light \u2014 and in sufficient numbers, they change the character of the lawn entirely.\n\n## Annual vs perennial weeds\n\nUnderstanding weed life cycles changes how you approach control.\n\n**Annual weeds** complete their life cycle in one growing season. They germinate, grow, flower, set seed and die within a year. Some are **ephemerals** \u2014 they can complete multiple cycles in a single season.\n- Poa annua (annual meadow grass) is the most common annual weed in UK lawns\n- Key characteristic: they produce vast quantities of seed; control them before they set seed\n\n**Perennial weeds** live for many years. They have underground storage organs (taproots, rhizomes, stolons) that allow them to regenerate even after the visible top growth is removed.\n- Dandelion, plantain, clover, speedwell, buttercup \u2014 all perennial\n- Key characteristic: they regrow if not properly controlled; repeat treatment or physical removal needed\n\n## Broadleaf weeds vs weed grasses\n\nThis distinction matters because it determines what controls are available:\n\n**Broadleaf weeds** (dandelion, plantain, clover, etc.): can be selectively controlled with broadleaf herbicides that target dicotyledon (two-seed-leaf) plants without harming monocotyledon grass\n\n**Weed grasses** (Poa annua, Yorkshire fog, couch grass): there is no selective herbicide that kills these without also killing lawn grass. Control is cultural only \u2014 density, mowing, renovation\n\n[note]\nCustomers often ask 'can you spray that?' about weed grasses like Yorkshire fog. The honest answer is no \u2014 any product that kills it will also kill the lawn grass. Renovation (scarification + overseeding) is the only effective approach for significant weed grass infestation.\n[/note]",
      },
      {
        id: "wb-how",
        title: "How Weeds Establish — the Opportunity Gap",
        section: "Foundations",
        duration: "7 min",
        content:
          "Weeds don't invade a healthy, dense lawn \u2014 they exploit gaps. Understanding how weeds get established is the foundation of cultural weed management.\n\n## The opportunity gap\n\nEvery bare or thin patch of soil is an opportunity for a weed seed to germinate. Weed seeds are in the soil seed bank in virtually every garden \u2014 waiting for the right conditions. The conditions they need are:\n\n- **Light reaching the soil surface** \u2014 most weed seeds require light to germinate\n- **Reduced competition from grass** \u2014 a thin sward means less root competition\n- **Disturbed soil** \u2014 soil brought to the surface (by aeration, scarification, burrowing) contains dormant seeds that germinate when exposed to light\n\n**The implication**: the number-one weed prevention strategy is maintaining a dense lawn. A thick, healthy sward physically prevents light reaching the soil surface and outcompetes weed seedlings for water and nutrients.\n\n## How perennial weeds spread once established\n\nOnce a broadleaf weed is established, it spreads by:\n- **Seed production**: a single dandelion can produce 15,000 seeds per season\n- **Stolon spread**: clover and creeping speedwell spread via horizontal runners\n- **Rhizome spread**: some species spread underground (less common in domestic lawns)\n\n## The post-scarification window\n\nScarification creates the ideal weed establishment environment: bare soil, disturbed, light-exposed. This is why overseeding immediately after scarification is non-negotiable \u2014 you're racing to close the opportunity gap with desirable grass before weeds exploit it.\n\n[warning]\nAvoid applying selective broadleaf herbicide to newly overseeded areas. Most selective herbicides will damage or kill establishing seedlings. Wait until new grass has been mown at least three times before treating weeds in a recently renovated lawn.\n[/warning]",
      },
      {
        id: "wb-top5",
        title: "The Five Most Common UK Lawn Weeds",
        section: "Identification",
        duration: "8 min",
        content:
          "Confident visual identification of the most common broadleaf weeds is a basic field skill. You'll encounter these on almost every job.\n\n## Dandelion (Taraxacum officinale)\n\n**ID**: distinctive toothed leaves in a flat rosette; hollow stem; bright yellow composite flower; characteristic clock seed head. Deep taproot.\n\n**Behaviour**: spreads by wind-blown seed; perennial \u2014 the taproot regenerates even if the rosette is removed. Tap roots can reach 200\u2013300mm deep.\n\n**Why it thrives**: compacted, thin lawns. Dandelions open up damaged or bare areas quickly.\n\n## Plantain (Plantago lanceolata \u2014 ribwort; P. major \u2014 broadleaf)\n\n**ID**: ribwort has narrow, ribbed leaves in a rosette; broadleaf has wide, oval leaves with prominent parallel veins. Both are very low-growing and flatten under mowing.\n\n**Behaviour**: perennial with a fibrous root system. Extremely tolerant of mowing \u2014 the growing point is below mowing height. Spreads by seed.\n\n**Why it thrives**: compacted lawns with low grass density.\n\n## Clover (Trifolium repens \u2014 white clover)\n\n**ID**: three-leafed compound leaves with distinctive pale chevron marking; white spherical flower heads in summer.\n\n**Behaviour**: spreads by both seed and stolons. Fixes atmospheric nitrogen \u2014 can thrive in lawns with low fertility because it supplies its own.\n\n**Selective control note**: clover is more difficult to control selectively than most broadleaf weeds; some species have developed resistance to common MCPA/mecoprop herbicides. Products containing fluroxypyr or combination actives are more reliable.\n\n## Lesser Celandine / Buttercup (Ranunculus spp.)\n\n**ID**: heart-shaped, glossy leaves; bright yellow flowers in spring (celandine) or summer (creeping buttercup). Creeping buttercup spreads by runners along the surface.\n\n**Behaviour**: perennial; creeping buttercup spreads aggressively via stolons in moist, poorly-drained lawns.\n\n## Speedwell (Veronica filiformis \u2014 slender speedwell)\n\n**ID**: tiny, round, slightly hairy leaves; minute pale blue flowers in spring. Spreads in a creeping mat.\n\n**Behaviour**: spreads primarily vegetatively via fragments \u2014 mowing distributes it. Very difficult to control chemically; requires persistent repeat treatment.\n\n[tip]\nIdentification confidence comes from handling plants. On every job, take 30 seconds to identify any broadleaf weeds you see \u2014 name them in your head. After a few months this becomes automatic.\n[/tip]",
      },
      {
        id: "wb-indicators",
        title: "Weeds as Indicators — What They Tell You About the Lawn",
        section: "Interpretation",
        duration: "6 min",
        content:
          "Experienced lawn managers read weeds diagnostically. Which weeds are present \u2014 and where \u2014 tells you something about the underlying conditions. This is one of the most useful field skills you can develop.\n\n## Weeds that indicate compaction\n\n- **Plantain** \u2014 very compaction-tolerant; thrives where other grasses give up\n- **Moss** \u2014 not a weed but thrives in compacted, waterlogged or acidic conditions\n- **Annual meadow grass (Poa annua)** \u2014 establishes readily in thin, compacted areas\n- **Self-heal (Prunella vulgaris)** \u2014 common in waterlogged, compacted or badly-drained lawns\n\n## Weeds that indicate low fertility\n\n- **Clover** \u2014 fixes its own nitrogen; dominates lawns that are under-fed\n- **Yarrow (Achillea millefolium)** \u2014 extremely drought and low-nutrient tolerant; indicates poor, low-fertility soil\n- **Mouse-ear chickweed** \u2014 common in thin, unfertilised lawns\n\n## Weeds that indicate acidity\n\n- **Moss** \u2014 most moss species prefer acidic, moist conditions\n- **Sorrel (Rumex acetosella)** \u2014 strongly acidic soil indicator\n- **Tormentil** \u2014 upland indicator; strongly acidic soils\n\n## Weeds that indicate high moisture / poor drainage\n\n- **Creeping buttercup** \u2014 spreads aggressively in poorly-drained, moist lawns\n- **Self-heal** \u2014 prefers damp, poorly-aerated soil\n- **Rushes (Juncus spp.)** \u2014 very wet, acidic conditions (not typical domestic lawns but occasionally seen in low-lying gardens)\n\n[note]\nUsing weeds diagnostically in front of a customer is impressive. 'The plantain here and the dense moss in this area are telling me the soil is compacted and possibly slightly acidic \u2014 that's why the grass is struggling in this section.' It positions you as an expert and opens the conversation about aeration and pH.\n[/note]",
      },
      {
        id: "wb-first",
        title: "First Steps in Weed Control — Culture Before Chemistry",
        section: "Control",
        duration: "6 min",
        content:
          "The most effective long-term weed control isn't herbicide \u2014 it's cultural management that makes the lawn inhospitable to weed establishment. Herbicide has a role, but it treats symptoms; culture addresses the cause.\n\n## Step 1: Correct mowing height\n\nMowing too short is the single biggest cultural factor that allows weeds in. Grass mowed at 30\u201340mm shades the soil surface \u2014 most weed seeds need light to germinate. Scalped grass at 10\u201320mm exposes bare soil and weakens the grass to the point where weeds can outcompete it.\n\nRaising the mowing height is the first recommendation for a persistently weedy lawn.\n\n## Step 2: Thicken the sward\n\nA dense lawn is the best weed barrier. Overseeding thin areas closes the gaps weeds establish in.\n\nThe timing matters: overseed in late summer/early autumn. The soil is still warm, competition from weed germination reduces, and new grass has time to establish before winter.\n\n## Step 3: Address underlying conditions\n\nIf weeds are telling you about compaction, acidity or poor drainage \u2014 treat the cause. Aeration, liming and improved drainage reduce the conditions that favour weed establishment, independently of any herbicide application.\n\n## Step 4: Selective herbicide where needed\n\nFor established broadleaf weeds, selective herbicide (MCPA, mecoprop-P, dicamba, fluroxypyr or combination products) applied when weeds are actively growing in warm, moist conditions gives good results.\n\nBest timing: actively growing weeds in spring or early autumn. Not in drought, not in cold, and not on recently seeded areas.\n\n[tip]\nExplain the culture-first approach to customers who expect herbicide to solve everything. 'The spray is effective at removing the weeds that are there now, but if we don't address why they're there \u2014 the thin patches, the compaction \u2014 they'll be back next season.' This sets realistic expectations and opens the conversation about renovation.\n[/tip]",
      }
    ],
  },

  {
    id: "drought-yellowing-basic",
    title: "Drought Stress and Lawn Yellowing \u2014 The Essentials",
    description: "The five common causes of yellowing, how to read the pattern, drought dormancy explained, and how to communicate with customers.",
    icon: "Sun",
    emoji: "☀️",
    category: "Lawn Health",
    estimatedTime: "25 min",
    roles: ["technician", "office"],
    stage: "diagnostic-foundations",
    isShared: true,
    lessons: [
      {
        id: "dyb-causes",
        title: "Why Lawns Turn Yellow — The Five Common Causes",
        section: "Foundations",
        duration: "7 min",
        content:
          "A yellowing lawn is the most common customer worry call. Before you can respond usefully, you need to identify which of the five main causes you're looking at \u2014 because the response is different for each.\n\n## The five causes of lawn yellowing\n\n**1. Nitrogen deficiency**\n- Appearance: even, uniform pale yellow-green across the whole lawn\n- No patches \u2014 the whole sward is affected equally\n- Grass is still growing but slowly and without colour\n- Fix: nitrogen application (allow 5\u201310 days for visible response)\n\n**2. Iron deficiency / high pH**\n- Appearance: yellowing between the leaf veins (interveinal chlorosis); veins stay green, tissue between them turns yellow\n- Most common on chalky, alkaline or heavy-clay soils\n- Standard iron sulphate gives poor results above pH 7.5\n- Fix: chelated iron application\n\n**3. Drought stress**\n- Appearance: overall fading from green to grey-green to straw colour; usually starts in higher, drier areas of the lawn\n- Footprints remain visible \u2014 grass lacks turgor to spring back\n- Leaf blades may curl lengthways\n- Fix: deep watering; the lawn is usually dormant, not dead\n\n**4. Waterlogging / anaerobic conditions**\n- Appearance: yellowing concentrated in low areas or areas with poor drainage; persists despite adequate rainfall\n- Soil smells of drains or eggs when probed\n- Fix: aeration, improved drainage, wetting agent application\n\n**5. Disease (Red Thread, Fusarium)**\n- Appearance: patches, often with pink or white mycelium visible\n- Not even distribution \u2014 distinct irregular patches\n- Fix: identify the disease first; cultural management (nitrogen for Red Thread); fungicide if severe\n\n[tip]\nThe fastest first filter: is the yellowing even across the whole lawn, or is it in patches? Even = likely nitrogen deficiency or drought stress. Patchy = likely disease, iron deficiency in specific soil zones, waterlogging, or pest damage. This question alone halves your diagnostic time.\n[/tip]",
      },
      {
        id: "dyb-drought",
        title: "Drought Stress — Signs, Dormancy and Recovery",
        section: "Drought",
        duration: "7 min",
        content:
          "Drought stress is one of the most misunderstood lawn conditions. Customers frequently panic at the first sign of browning \u2014 when in reality, dormancy is a completely normal and healthy response to water stress.\n\n## The drought stress progression\n\nGrass doesn't go from healthy to dead in a straight line. It goes through a series of physiological changes as water becomes scarce:\n\n**Stage 1 \u2014 Early stress (still green)**\n- Stomata (pores on the leaf) begin closing to reduce water loss\n- Growth slows noticeably\n- Colour starts to grey slightly \u2014 a blue-green tinge replaces the usual fresh green\n- **Key sign**: footprints remain visible in the lawn. The plant lacks enough turgor pressure to push the compressed grass back upright. This is the earliest and most reliable sign of drought stress.\n\n**Stage 2 \u2014 Active stress**\n- Leaf blades roll or fold lengthwise \u2014 reducing surface area exposed to sun and wind\n- Colour shifts from grey-green to olive or dull brown at leaf tips\n- Growth has largely stopped\n\n**Stage 3 \u2014 Dormancy**\n- The whole sward turns straw-coloured\n- This looks alarming but is a survival mechanism. Established grass can remain dormant for 4\u20136 weeks without permanent damage\n- Growth points (crowns) survive even when the leaf tissue is completely brown\n\n## Recovery\n\nMost UK lawn grasses (perennial ryegrass, fescues) recover well from dormancy when moisture returns. Deep watering or rainfall allows rehydration and greening within 7\u201314 days.\n\n**What customers do wrong**: panic-water shallowly every day. This keeps the surface moist but doesn't push water down to the root zone \u2014 and it doesn't help the dormant lawn recover any faster.\n\n[warning]\nMowing a dormant, drought-stressed lawn causes additional damage. The mower blade tears already-stressed tissue. If the lawn is brown and not growing, don't mow it. Wait for moisture and regrowth before cutting.\n[/warning]",
      },
      {
        id: "dyb-patterns",
        title: "Reading the Pattern — What Shape Tells You",
        section: "Diagnosis",
        duration: "6 min",
        content:
          "The spatial pattern of yellowing and browning is often the most diagnostic feature. Before probing or testing, look at the shape, location and distribution of the affected areas.\n\n## Even, whole-lawn yellowing\n\n**Most likely causes:**\n- Nitrogen deficiency\n- Drought stress (though this often starts in elevated, drier areas first)\n- pH-related iron unavailability (especially on alkaline soils)\n\n## Patches in rings or irregular circles\n\n**Most likely causes:**\n- Fairy rings \u2014 ring of darker green or browning in a roughly circular pattern; mushrooms may be visible at the edge\n- Disease (Red Thread, Fusarium, Dollar Spot) \u2014 irregular patch shapes, often with visible mycelium\n- Leatherjacket or chafer grub damage \u2014 irregular browning, grass lifts easily from the surface (roots eaten)\n\n## Yellow/brown patches following the line of drainage, paths or edges\n\n**Most likely causes:**\n- Concrete or path runoff \u2014 alkaline leaching near hard landscaping\n- Shade variation \u2014 areas receiving less light than the open lawn\n- Soil depth variation \u2014 thin soil over builders rubble dries out faster\n- Herbicide drift \u2014 if the pattern follows a straight line parallel to a path or neighbouring garden\n\n## Yellow in low-lying areas\n\n**Most likely causes:**\n- Waterlogging \u2014 poor drainage; test with smell (anaerobic if it smells of drains)\n- Frost pockets \u2014 low areas collect cold air; slower spring greenup\n\n## Elevated areas brown first\n\n**Most likely cause:** drought \u2014 higher ground dries out faster. Confirm with the footprint test.\n\n[note]\nTaking a 30-second pattern assessment before touching the soil gives you a hypothesis before any investigation. 'I can see it's patchy and concentrated in the lower areas \u2014 I'm going to check for drainage issues and smell the soil' is a professional approach that builds customer confidence.\n[/note]",
      },
      {
        id: "dyb-customer",
        title: "Managing Customer Expectations About Yellow Lawns",
        section: "Communication",
        duration: "5 min",
        content:
          "Yellowing lawns generate more worried customer calls than almost any other issue. How you handle these calls \u2014 and what you say on the doorstep \u2014 significantly affects customer confidence and satisfaction.\n\n## The summer drought call\n\n'My lawn has gone completely brown \u2014 did your treatment do this?'\n\n**What's happening**: drought dormancy. Normal. Seasonal. The treatment hasn't caused it.\n\n**What to say**: 'This time of year, grass naturally goes dormant when there's not enough rainfall \u2014 it's a survival mechanism. The lawn isn't dead; the growth points are fine. When we get some rain, or when you water it deeply, it'll green up within a couple of weeks. In the meantime, don't mow it and avoid walking on it if you can \u2014 the blades are more fragile than usual.'\n\n## The spring yellow-after-treatment call\n\n'The lawn looks yellower than before you came \u2014 is something wrong?'\n\n**What's happening**: often iron-blackened moss dying back, or the treatment temporarily stressing the leaf tissue slightly before the nitrogen green-up arrives.\n\n**What to say**: 'It takes 7\u201310 days for the nitrogen to produce visible green-up \u2014 the colour will improve. If you treated for moss, the blackening and dieback of the moss can temporarily make it look patchy before it clears.'\n\n## Setting expectations in advance\n\nThe best time to prepare a customer for a yellow lawn is before it happens \u2014 ideally in the spring visit. 'If we get a dry summer, the lawn may go straw-coloured. That's normal \u2014 it's dormancy, not death. I'll note this on your account so the team can reassure you if you call.'\n\n[tip]\nAdding a seasonal expectation note to the customer's account ('advised on summer dormancy \u2014 will follow up if dry spell expected') means any team member who takes a summer worry call can immediately reassure the customer with context, not confusion.\n[/tip]",
      }
    ],
  },

  {
    id: "drought-yellowing-advanced",
    title: "Drought Stress and Yellowing \u2014 Advanced Plant Science",
    description: "The physiology of drought, anthocyanins and stress pigments, chlorophyll degradation, differential diagnosis, and cellular recovery mechanisms.",
    icon: "FlaskConical",
    emoji: "🧪",
    category: "Plant Science",
    estimatedTime: "38 min",
    roles: ["technician"],
    stage: "specialist-knowledge",
    lessons: [
      {
        id: "dya-physiology",
        title: "The Physiology of Drought — What Happens Inside the Plant",
        section: "Plant Physiology",
        duration: "8 min",
        content:
          "Understanding drought at the cellular level explains why certain management decisions help and others harm \u2014 and equips you to explain the science behind what customers are observing.\n\n## Water and turgor pressure\n\nPlant cells maintain their shape and rigidity through **turgor pressure** \u2014 the outward pressure of water inside the cell against the cell wall. When a plant is well-hydrated, cells are fully turgid, shoots are upright, and leaves are erect.\n\nAs water deficit increases:\n- Cells lose turgor \u2014 leaves wilt and flatten\n- The stomata (tiny pores on the leaf surface) close to reduce water loss via transpiration\n- Closing stomata also reduces CO2 entry \u2014 so photosynthesis slows\n- Growth stops as energy is redirected to stress responses\n\n## Stomatal regulation\n\nStomata are controlled by **guard cells** \u2014 specialised cells that open and close the pore in response to water status, light and CO2 concentration. During drought:\n- Abscisic acid (ABA), a plant stress hormone, is produced and signals guard cells to close stomata\n- This reduces water loss but also reduces photosynthesis and, consequently, growth\n- This is why a drought-stressed lawn stops growing before it turns brown \u2014 the growth shutdown precedes the visual symptoms\n\n## Osmotic adjustment\n\nSome grass species can partially compensate for water deficit through **osmotic adjustment** \u2014 accumulating compatible solutes (sugars, amino acids, potassium ions) inside cells. This lowers the cell's water potential, allowing it to continue absorbing water from a drier soil.\n\n- Perennial ryegrass has moderate osmotic adjustment capacity\n- Fine fescues, particularly hard and sheep's fescue, have superior osmotic adjustment \u2014 explaining their better drought tolerance\n- This process takes 2\u20134 days to reach full effect after drought stress begins\n\n## Root depth and drought resilience\n\nRoot depth is the primary determinant of drought tolerance at the plant level. A deep root system accesses water long after the topsoil has dried. This is why:\n- Frequent shallow watering produces drought-vulnerable lawns \u2014 roots stay near the surface where the moisture is\n- Deep, infrequent watering encourages root descent and dramatically improves drought resilience",
      },
      {
        id: "dya-anthocyanins",
        title: "Anthocyanins and Stress Pigments — Why Grass Goes Red or Purple",
        section: "Plant Biochemistry",
        duration: "9 min",
        content:
          "One of the most diagnostically interesting lawn phenomena is when grass turns red, purple or bronze. This pigmentation is produced by the plant itself \u2014 and understanding why tells you a great deal about what the plant is experiencing.\n\n## What are anthocyanins?\n\nAnthocyanins are a class of water-soluble pigments in the flavonoid family. They are produced by plants in response to a range of stresses and produce colours from pink through red, purple and blue depending on the plant's cellular pH.\n\nYou've seen anthocyanins your whole life: they're what makes blueberries blue, red cabbage purple, and autumn leaves red. In grass, they appear as a reddish-purple flush on the leaf blades.\n\n## Why does grass produce anthocyanins under stress?\n\nSeveral hypotheses exist \u2014 the current scientific understanding is that anthocyanins serve multiple protective functions under stress:\n\n**1. Photoprotection**: anthocyanins absorb high-energy light wavelengths that would otherwise damage the photosynthetic machinery when the plant is stressed. Under drought or cold, the photosynthetic system is partially shut down but the leaf is still exposed to light. Anthocyanins act as a kind of sunscreen at the cellular level.\n\n**2. Antioxidant function**: metabolic stress produces reactive oxygen species (ROS) that can damage cell membranes and proteins. Anthocyanins are powerful antioxidants that neutralise these damaging molecules.\n\n**3. Osmotic function**: as compatible solutes accumulate during osmotic adjustment, the associated metabolic pathways may produce anthocyanins as a byproduct.\n\n## What triggers anthocyanin production in lawn grass?\n\n- **Cold temperatures** (particularly below 10°C, especially at night): the most common trigger. Purple colouration in perennial ryegrass in early spring and late autumn is almost always cold-induced anthocyanin. It's temporary and resolves as temperatures rise.\n- **Phosphorus deficiency**: a classic signal. Reddish-purple colouration, especially in seedlings and young grass, in cold weather is a reliable indicator of phosphorus unavailability (often due to cold soil reducing root uptake rather than actual soil deficiency)\n- **Drought stress combined with high light**: during dry, sunny periods when the photosynthetic machinery is stressed\n- **Some cultivar differences**: certain perennial ryegrass and fescue cultivars are more prone to anthocyanin expression than others\n\n## Diagnostic value\n\nPurple/red colouration tells you:\n- In spring, after cold nights: normal cold stress. Clears with warming. No action needed.\n- In spring seedlings: check soil temperature and consider whether phosphorus availability is low (cold soil blocks uptake even from phosphorus-rich soil)\n- In midsummer: investigate \u2014 cold-induced anthocyanins don't occur in warm weather; look for other stressors\n\n[note]\nCold-induced anthocyanin in perennial ryegrass is one of the most commonly misidentified lawn conditions. Customers see red/purple grass and panic. The diagnosis is instant: 'This is normal in cool weather \u2014 it's the plant's cold-weather pigment. It'll clear as the soil warms up, usually by late April.'\n[/note]",
      },
      {
        id: "dya-chlorophyll",
        title: "Chlorophyll Degradation — The Science of Yellowing",
        section: "Plant Biochemistry",
        duration: "7 min",
        content:
          "Yellowing is the most common symptom a lawn manager encounters. Understanding what actually causes the yellow colour \u2014 at the molecular level \u2014 makes you a better diagnostician and a more credible expert.\n\n## What is chlorophyll?\n\nChlorophyll is the green pigment responsible for photosynthesis. It exists in two main forms in plants:\n- **Chlorophyll a**: blue-green; directly involved in the light reactions of photosynthesis\n- **Chlorophyll b**: yellow-green; an accessory pigment that broadens the range of light wavelengths captured\n\nBoth forms have a magnesium atom at their centre (which is why magnesium deficiency causes yellowing \u2014 without magnesium, the chlorophyll molecule cannot be assembled).\n\n## Why does chlorophyll break down?\n\nChlorophyll is constantly being broken down and resynthesised in healthy plants. The equilibrium tips toward yellowing when:\n\n**1. Raw materials are insufficient**: nitrogen is essential for chlorophyll production. Without nitrogen, the plant cannot synthesise new chlorophyll to replace what degrades. Iron is needed for the enzymatic processes that build chlorophyll. Magnesium is structurally essential.\n\n**2. Light stress degrades existing chlorophyll**: intense sunlight in a drought-stressed plant with closed stomata causes **photooxidative damage** \u2014 reactive oxygen species generated by light energy attack and degrade chlorophyll molecules faster than the plant can replace them.\n\n**3. Temperature extremes slow resynthesis**: below 8°C, the enzyme systems that build chlorophyll operate very slowly. This is why grass goes pale in winter and at altitude.\n\n## Xanthophylls \u2014 the yellow pigments beneath\n\nGrass actually contains yellow pigments (xanthophylls) alongside chlorophyll at all times. They're normally masked by the much more abundant green chlorophyll. When chlorophyll breaks down \u2014 whether from deficiency, stress or cold \u2014 the underlying yellow xanthophylls are revealed.\n\nThis explains why deficient or stressed grass turns yellow rather than white: there's always a yellow pigment ready to show through.\n\nThe same mechanism explains autumn leaf colour in deciduous trees: as day length shortens, chlorophyll is broken down and the yellows, oranges and reds beneath are revealed.",
      },
      {
        id: "dya-differential",
        title: "Differential Diagnosis — Drought vs Deficiency vs Disease",
        section: "Advanced Diagnosis",
        duration: "8 min",
        content:
          "Multiple conditions cause yellowing, and they can co-occur. This lesson builds a systematic diagnostic framework for distinguishing the most commonly confused presentations.\n\n## Nitrogen deficiency vs drought stress\n\n**Both**: produce overall yellowing of the sward.\n\n**Key differences:**\n\n| Feature | Nitrogen Deficiency | Drought Stress |\n| Soil moisture | Normal or high | Dry |\n| Footprint test | Grass springs back | Footprints remain |\n| Response to nitrogen | Greens up in 7\u201310 days | No response until moisture restored |\n| Growth | Slow but present | Essentially stopped |\n| Leaf texture | Soft | Rolled or folded, firm |\n| Seasonal timing | Any season | Dry, hot periods |\n\n**Field rule**: check soil moisture first. If soil is dry, address moisture before nitrogen. Applying nitrogen to drought-stressed grass risks scorch and is wasted until uptake resumes.\n\n## Iron deficiency vs nitrogen deficiency\n\n**Both**: produce overall yellowing.\n\n**Key differences:**\n\n| Feature | Nitrogen Deficiency | Iron Deficiency |\n| Pattern | Even, whole leaf yellow | Interveinal \u2014 veins stay green, tissue between yellows |\n| Which leaves | Older leaves first, then uniform | Younger leaves often more affected |\n| Soil pH | Any | More common above pH 7.0 |\n| Response to nitrogen | Greens up | No response |\n| Response to iron | Slight greening only | Greens up noticeably |\n\n**Field test**: apply chelated iron liquid to a small test area. If it greens up within 5\u20137 days, iron deficiency is confirmed.\n\n## Disease patches vs drought patches\n\n**Both**: produce areas of brown/yellow turf.\n\n**Key differences:**\n- Disease patches have **irregular, defined edges**; drought browning is diffuse and follows topography\n- Disease patches may have **visible mycelium** (pink/white threads) particularly at patch margins in the morning\n- Drought-affected grass pulls up cleanly; grub-damaged grass (often confused with drought) pulls up easily because roots are eaten\n- Disease patches do not respond to watering; drought patches green up within a week of moisture\n\n[note]\nIn practice, combinations are common. A drought-stressed, nitrogen-deficient lawn with slightly elevated pH is simultaneously showing symptoms from three causes. Treat the most acute first (restore moisture, then address nutrition and pH over subsequent visits) rather than trying to fix everything at once.\n[/note]",
      },
      {
        id: "dya-recovery",
        title: "Heat Stress, Cellular Mechanisms and Recovery",
        section: "Plant Physiology",
        duration: "6 min",
        content:
          "Heat stress and drought stress frequently co-occur \u2014 UK summers combine low rainfall with temperatures that can exceed 30°C. Understanding what happens at the cellular level during heat stress explains why recovery programmes matter as much as the immediate response.\n\n## What heat stress does to grass cells\n\nAbove approximately **35\u201338°C** (leaf temperature, not air temperature \u2014 leaf temperature can exceed air temperature by 5\u201310°C in direct sunlight), proteins begin to denature \u2014 they lose their three-dimensional shape and stop functioning.\n\n**Key proteins affected:**\n- **Photosynthetic enzymes** (Rubisco, ATP synthase): photosynthesis efficiency drops sharply above 35°C\n- **Membrane proteins**: cell membranes become leaky as temperature disrupts the lipid bilayer structure\n- **Metabolic enzymes**: general cellular metabolism slows as enzyme function is impaired\n\n## Heat shock proteins\n\nPlants (and all organisms) respond to heat stress by upregulating **heat shock proteins (HSPs)**. These molecular chaperones:\n- Bind to partially denatured proteins and help them refold correctly\n- Prevent aggregation of damaged proteins\n- Are produced within minutes of heat exposure\n\nGrass species with more efficient HSP production recover faster from heat stress. This is a key differentiator between heat-tolerant and heat-sensitive grass cultivars.\n\n## Recovery \u2014 what supports it\n\nAfter heat and drought stress, recovery is driven by:\n- **Moisture restoration** \u2014 rehydrates cells and allows turgor restoration\n- **Moderate temperature** \u2014 enzyme systems re-activate; photosynthesis resumes\n- **Available nitrogen** \u2014 resynthesises chlorophyll and builds new tissue\n- **Potassium availability** \u2014 restores osmotic regulation and membrane function\n\n**Avoid immediately after heat/drought stress:**\n- Heavy nitrogen application \u2014 stimulates growth the damaged root system can't support; increases disease risk\n- Mowing too soon \u2014 let the grass recover turgor before cutting; mowing mechanically stressed turf delays recovery\n\n[tip]\nAfter a prolonged drought break, advise customers to water first and wait two weeks before any treatment application. The lawn needs to restore structure before it can effectively absorb and respond to nutrients. A single deep watering session immediately after rainfall helps accelerate root rehydration.\n[/tip]",
      }
    ],
  },

  {
    id: "weed-knowledge",
    title: "Weed Knowledge \u2014 Understanding and Identification",
    description: "What weeds are, how they live and spread, identification of the most common UK lawn weeds, root causes of weed pressure, integrated management principles and cultural control.",
    icon: "Search",
    emoji: "\uD83D\uDD0D",
    category: "Weed Management",
    estimatedTime: "1 h 5 min",
    roles: ["technician"],
    stage: "diagnostic-foundations",
    lessons: [
      {
        id: "wc1",
        title: "What a Weed Actually Is",
        duration: "10 min",
        content:
          "A weed is simply a plant growing where it is not wanted. There is nothing biologically special about a 'weed' \u2014 a wildflower in a meadow can become a weed on a customer's lawn.\n\n**Three things make a plant a problem in turf:**\n1. It out-competes the grass for light, water or nutrients\n2. It looks visually disruptive (yellow flowers, broad leaves, bare patches around it)\n3. It spreads quickly if left alone\n\nUnderstanding 'why this is a weed here' is the start of every good treatment decision.",
      },
      {
        id: "wc2",
        title: "How Weeds Live and Spread",
        duration: "12 min",
        content:
          "Weeds are grouped by their life cycle:\n\n**Annuals** \u2014 germinate, flower, seed and die in a single year (e.g. annual meadow grass, chickweed). Best controlled before they set seed.\n\n**Biennials** \u2014 grow leaves in year one, flower and seed in year two. Hit them in year one while they're still a rosette.\n\n**Perennials** \u2014 live for many years and regrow from roots, runners or rhizomes (e.g. dandelion, plantain, clover). These are the bulk of lawn weeds and the hardest to kill.\n\n**How they spread:**\n- Seed \u2014 wind, mowers, shoes, birds, soil disturbance\n- Stolons (above-ground runners) \u2014 clover, creeping buttercup\n- Rhizomes (underground stems) \u2014 couch grass, yarrow\n- Tap roots \u2014 dandelion, dock \u2014 break the root and you get two plants\n\n**The seed bank rule:** every soil contains thousands of dormant weed seeds per square metre. You are never 'clearing' the seed bank \u2014 you are managing what germinates.",
      },
      {
        id: "wc3",
        title: "Identifying the Common UK Lawn Weeds",
        duration: "15 min",
        content:
          "**Broadleaf perennials (most common):**\n- Dandelion \u2014 deep tap root, jagged leaves, yellow flower, parachute seeds\n- Daisy \u2014 small rosettes, white-petal flower, spreads by runners\n- Plantain (greater & ribwort) \u2014 flat ribbed leaves, very tough\n- White clover \u2014 three-leaf trefoil, white flower, nitrogen-fixing\n- Creeping buttercup \u2014 glossy lobed leaves, runners, loves wet compacted ground\n- Self-heal \u2014 low purple flower spikes, mat-forming\n- Yarrow \u2014 feathery leaves, drought-tolerant, hard to kill\n- Speedwell \u2014 tiny blue flowers, mat-forming, notoriously herbicide-resistant\n- Mouse-ear chickweed \u2014 hairy small leaves, low rosettes\n\n**Grass weeds:**\n- Annual meadow grass (Poa annua) \u2014 pale, seeds at very low height, almost universal\n- Yorkshire fog \u2014 soft, hairy, grey-green tufts\n- Couch grass \u2014 coarse blades, aggressive rhizomes\n\n**Moss** \u2014 not a weed in the herbicide sense, but treated as one. A symptom of shade, wet, low fertility, scalping or compaction.",
      },
      {
        id: "wc4",
        title: "Why Weeds Appear \u2014 Root Causes",
        duration: "10 min",
        content:
          "Spraying without fixing the cause means the same weeds return every season. Always ask: why is this lawn vulnerable?\n\n**Common underlying causes:**\n- Thin or sparse grass \u2014 bare soil invites weed seeds\n- Low fertility \u2014 clover and yarrow thrive where grass is starved\n- Compaction \u2014 plantain, buttercup, annual meadow grass love hard ground\n- Poor drainage \u2014 moss, buttercup, sedges\n- Scalping \u2014 weakens grass, lets low-growing weeds take over\n- Shade \u2014 moss and woodland weeds dominate\n- Recent disturbance \u2014 renovation brings buried seeds to the surface\n\n**The professional mindset:** weed control + lawn improvement always go together. Treatment kills what's there now; dense healthy grass is what stops the next wave.",
      },
      {
        id: "wc5",
        title: "Integrated Weed Management",
        duration: "12 min",
        content:
          "Integrated Weed Management (IWM) combines several methods so you rely less on any single one \u2014 especially chemicals.\n\n**The four pillars:**\n1. Cultural control \u2014 mowing height, feeding, watering, overseeding, aeration, scarification\n2. Mechanical / physical control \u2014 hand-pulling, hoeing, removing seed heads\n3. Biological control \u2014 encouraging grass to out-compete weeds\n4. Chemical control \u2014 selective herbicides when other methods aren't enough\n\nA technician who reaches for the sprayer first is not yet a professional. A technician who diagnoses, plans cultural fixes, and uses chemicals as one tool among several \u2014 that is professional weed control.",
      },
      {
        id: "wc6",
        title: "Cultural Control \u2014 The Most Powerful Tool",
        duration: "12 min",
        content:
          "Cultural control means changing how the lawn is managed so the grass wins on its own.\n\n**Mowing height** \u2014 most UK lawns should be cut at 25–40mm. Cutting shorter scalps the grass, lets light reach weed seeds, and favours low creeping weeds.\n\n**Feeding** \u2014 a balanced fertiliser programme thickens the sward. Clover and yarrow noticeably retreat once nitrogen is restored.\n\n**Aeration** \u2014 relieves compaction so grass roots can breathe; weeds that thrive on compaction lose their advantage.\n\n**Overseeding** \u2014 fills gaps before weeds can. Always pair renovation work with overseeding.\n\n**Scarification** \u2014 removes thatch and moss; must be followed by overseeding or you simply create germination beds for weeds.\n\n**The cultural control rule:** every weed treatment job should be paired with at least one cultural recommendation.",
      },
    ],
  }
,

  {
    id: "lawn-disease-recognition",
    title: "Lawn Disease Recognition in the Field",
    description: "How to distinguish disease from disorder, identify Red Thread and Fusarium Patch with confidence, recognise rust, dollar spot and fairy rings, and respond professionally on the doorstep.",
    icon: "Eye",
    emoji: "\uD83E\uDE7A",
    category: "Disease Management",
    estimatedTime: "27 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "ldr-biotic",
        title: "Disease vs Disorder — Knowing the Difference",
        section: "Foundations",
        duration: "6 min",
        content:
          "When a technician encounters a problem lawn, the first question is always: is this caused by a living organism (biotic) or by an environmental or nutritional factor (abiotic)? Getting this distinction right determines every subsequent decision.\n\n## Biotic problems \u2014 caused by living pathogens\n\nA biotic problem involves a pathogen \u2014 most commonly a fungal organism \u2014 actively infecting and damaging the grass plant. Key characteristics:\n\n- **Identifiable progression**: the damage spreads or changes over time in a consistent pattern\n- **Mycelium or spores may be visible**: fine threads, powder or pustules on or around the affected grass\n- **Shape and distribution**: often patches, rings or streaks; rarely completely uniform\n- **Seasonal timing**: most diseases have a season \u2014 Red Thread in warm, humid summers; Fusarium in cold, wet autumns/winters\n\nCommon biotic problems you'll encounter: Red Thread, Fusarium Patch, Rust, Leaf Spot, Dollar Spot, Take-All Patch.\n\n## Abiotic problems \u2014 caused by environment or nutrition\n\nAn abiotic problem has no pathogen involved. The grass is being damaged by its conditions, not by infection. Characteristics:\n\n- **Pattern often follows environment**: dry areas on slopes, waterlogged hollows, shade edges, compacted zones\n- **No mycelium or spores**\n- **Responds to correcting the underlying cause** (watering, feeding, aeration) not to fungicide\n\nCommon abiotic problems: drought stress, nitrogen deficiency, iron chlorosis, waterlogging, compaction, frost damage, dog urine scorch.\n\n## Why this matters practically\n\nApplying fungicide to an abiotic problem wastes money and does nothing. Feeding a diseased lawn with high nitrogen when it already has Fusarium makes the disease dramatically worse (Fusarium thrives on lush, soft growth). The initial biotic/abiotic triage changes everything.\n\n[tip]\nFirst observation rule: get down to lawn level and look at the affected area from a low angle in the morning. Biotic problems often show mycelium \u2014 visible only in the early morning when dew is present. If you see fine threads (especially pink or white), you have a fungal disease.\n[/tip]",
      },
      {
        id: "ldr-red-thread",
        title: "Red Thread and Fusarium — The Two You'll See Most",
        section: "Key Diseases",
        duration: "8 min",
        content:
          "Red Thread and Fusarium Patch are the two diseases you'll encounter most frequently in UK domestic lawn care. Confident identification of both is essential.\n\n## Red Thread (Laetisaria fuciformis)\n\n**When it appears**: warm, humid weather \u2014 typically late spring through early autumn; peak in July\u2013September. Does NOT require standing water.\n\n**Visual ID:**\n- Irregular pink-red patches, typically 5\u201325cm diameter\n- The diagnostic feature: **red needle-like threads** (Coral fungal strands) protruding 1\u20132cm from the leaf tips; visible to the naked eye in dry conditions\n- In very humid conditions, fluffy pink mycelium is visible at patch edges in the morning\n- The grass within the patch is bleached/tan, not slimy\n\n**What conditions trigger it**: low nitrogen, humid air, moderate temperatures (15\u201325°C). It is almost always associated with under-fed lawns.\n\n**Response:**\n- Nitrogen application is the first treatment \u2014 Red Thread is rarely severe enough in domestic lawns to require fungicide\n- The grass recovers; the red threads fall away as nitrogen greens the sward\n- Fungicide only if the problem is persistent or very extensive\n\n## Fusarium Patch / Snow Mould (Microdochium nivale)\n\n**When it appears**: autumn through winter and early spring \u2014 particularly after high-nitrogen autumn feeding, in humid conditions, or after snow cover.\n\n**Visual ID:**\n- Water-soaked, orange-brown patches, 2\u201330cm diameter, expanding from a central point\n- In moist conditions, **white or pale pink cottony mycelium** at the patch edge \u2014 diagnostic\n- Grass in the patch is slimy and matted, not just bleached\n- Can merge into large irregular areas if untreated in a wet autumn\n\n**What conditions trigger it**: cool temperatures (2\u201315°C), high humidity, high nitrogen (particularly after autumn nitrogen excess), poor air circulation, heavy thatch.\n\n**Response:**\n- Cultural: avoid high-nitrogen autumn treatments; reduce thatch; improve drainage\n- Fungicide: effective if applied early in disease development \u2014 contact fungicides (propiconazole, iprodione) or systemic products\n- Do not mow when disease is active \u2014 spreads spores\n\n[warning]\nFusarium is the most serious disease you'll regularly encounter on domestic lawns. In a bad autumn, an untreated lawn can lose 30\u201340% of its surface to Fusarium Patch. Early identification and prompt action (or customer advisory) is important.\n[/warning]",
      },
      {
        id: "ldr-rust-other",
        title: "Rust, Dollar Spot and Other Conditions to Recognise",
        section: "Key Diseases",
        duration: "7 min",
        content:
          "Beyond Red Thread and Fusarium, several other diseases and conditions appear regularly in UK domestic lawns. Knowing what they look like prevents misidentification and unnecessary or incorrect treatment.\n\n## Rust (Puccinia spp.)\n\n**When it appears**: late summer into autumn, particularly after a dry summer followed by cool, moist conditions. Most common on perennial ryegrass cultivars.\n\n**Visual ID:**\n- **Orange or yellow powdery pustules** covering the leaf blade \u2014 easily rubbed off on a finger\n- In heavy infections, the lawn appears orange-yellow from a distance\n- Individual leaves show elongated orange pustules when examined closely\n\n**What to tell a customer**: Rust is disfiguring but not usually lawn-threatening. It's most common on stressed or slow-growing grass \u2014 improving nitrogen and mowing to remove infected leaf tips resolves most cases. Fungicide is rarely warranted on domestic lawns.\n\n## Dollar Spot (Clarireedia jacksonii)\n\n**When it appears**: warm, humid weather with cool nights (characteristic dew); increasingly common in the UK with warmer summers.\n\n**Visual ID:**\n- Small (5\u201310cm), straw-coloured circular spots, each about the diameter of a coin \u2014 hence the name\n- In the morning dew, **white cottony mycelium** across the affected spots\n- Multiple spots may coalesce as the disease progresses\n- Individual leaf blades show a tan lesion with a reddish-brown margin\n\n**What triggers it**: low nitrogen, dew, low mowing, poor air circulation.\n\n## Fairy Ring (various Basidiomycetes)\n\n**Visual ID:** One of three types:\n- **Type 1**: ring of dead or depressed grass\n- **Type 2**: ring of stimulated, darker green grass\n- **Type 3**: ring of fruiting bodies (mushrooms/toadstools) only, no grass damage\n\nType 1 is the most problematic \u2014 caused by fungal mycelium making the soil hydrophobic (repels water). No chemical treatment is registered as reliably effective. Hollow-tine aeration + wetting agent application + irrigation is the practical management approach.\n\n[note]\nA customer will often describe 'dark green rings' and assume something is wrong. Type 2 and Type 3 fairy rings are not harming the lawn \u2014 the stimulated green ring is caused by nitrogen released by the fungal decomposition of organic matter. Reassure accordingly.\n[/note]",
      },
      {
        id: "ldr-response",
        title: "What to Do When You Spot a Disease",
        section: "Field Response",
        duration: "6 min",
        content:
          "Field identification is only the first step. What happens next \u2014 what you do, what you say to the customer, and what you record \u2014 matters just as much as getting the diagnosis right.\n\n## Step 1: Confirm it's biotic\n\nBefore assuming disease, rule out the obvious abiotic causes:\n- Is this the pattern of drought, compaction or poor drainage?\n- Is there evidence of dog urine (round patches with green ring)?\n- Is there a recent treatment that could have caused chemical scorch?\n\nIf the pattern, timing and visual features all point to disease, proceed to identification.\n\n## Step 2: Don't touch the affected area unnecessarily\n\nFungal spores spread via mowing equipment, boots and hands. If you're walking through the affected patch, you're distributing spores across the rest of the lawn. Avoid unnecessary contact and clean boots before moving to another garden.\n\n## Step 3: Photograph and record\n\nAlways photograph a disease occurrence:\n- Overall patch \u2014 showing size, shape, distribution\n- Close-up \u2014 showing mycelium, pustules, thread structures or leaf symptoms\n- Note the date, conditions (recent weather, recent treatments), and your diagnosis\n\nThis record protects you, informs the next technician, and allows the office to track disease patterns.\n\n## Step 4: Tell the customer clearly and calmly\n\nMost customers panic at the word 'disease.' Frame it helpfully:\n- Name the disease and explain it's common and manageable\n- Explain what triggered it (usually nutritional or environmental) \u2014 this avoids implying you caused it\n- Give a clear next step: 'We'll increase the nitrogen to address this' or 'We'd recommend a fungicide application \u2014 I'll flag it to the office'\n\n## Step 5: Know when to escalate\n\nEscalate to the office or senior technician when:\n- The disease is unidentified or unusual\n- The damage is extensive (>25% of the lawn surface)\n- The customer is distressed or asking for a specific treatment commitment\n- The disease has appeared immediately after one of your treatments (defensive recording is important here)\n\n[tip]\nThe most professional response to disease discovery is a calm, specific, solutions-focused conversation. Avoid vague language ('it's got something on it') or panic. Customers remember how you handle it, not just what the problem was.\n[/tip]",
      }
    ],
  }
,

  {
    id: "van-care",
    title: "Van Care, Safety and Professional Use",
    description: "How to look after your company vehicle, what dash cams and GPS tracking record, daily checks, road standards, and loading and chemical storage requirements.",
    icon: "Truck",
    emoji: "🚐",
    category: "Vehicle Standards",
    estimatedTime: "27 min",
    roles: ["technician"],
    stage: "role-foundations",
    lessons: [
      {
        id: "van-mindset",
        title: "Your Van — Not Yours, But Yours to Look After",
        section: "The Right Mindset",
        duration: "5 min",
        content:
          "The van parked outside a customer's house is often the first physical impression Shrekfeet makes. Before the doorbell is rung, before a word is spoken, the state of the vehicle has already said something about the company. It needs to say the right thing.\n\n## A company asset, not a personal vehicle\n\nThe van isn't yours \u2014 it belongs to the business. That means every scratch, every piece of rubbish left in the cab, every shortcut taken with maintenance, costs the business money and reflects on everyone who works here. Treat it accordingly.\n\nThis isn't about being precious. It's about professional pride and basic respect for something you've been trusted with. Most people wouldn't leave food wrappers in a hire car or let the fuel run to zero in a borrowed vehicle. Apply that same standard here, every day.\n\n## What it says about you\n\nA clean, well-presented van signals a professional technician. Customers notice. A muddy, cluttered van with a cracked bumper and a random assortment of personal belongings visible through the windows signals the opposite \u2014 and that impression sticks.\n\nYou represent Shrekfeet from the moment you pull up. The van is part of that representation.\n\n## The simple standard\n\n- Keep the cab tidy \u2014 no food waste, no unnecessary personal items, no clutter on the dashboard\n- Keep the exterior clean \u2014 the company will arrange washes but you're responsible for flagging when it's needed\n- Report any damage, however minor, immediately \u2014 do not wait to see if anyone notices\n- Never use the van for personal errands or journeys outside of work duties without prior approval\n\n[tip]\nThe easiest way to think about it: if you borrowed a van from a friend who had lent it to you in good faith, how would you return it? That's the standard.\n[/tip]",
      },
      {
        id: "van-road",
        title: "On the Road — Rules, Standards and Common Sense",
        section: "On the Road",
        duration: "6 min",
        content:
          "A Shrekfeet van on public roads is a moving advertisement for the company. Every other road user who sees it \u2014 and every customer who watches it arrive and leave \u2014 is forming an opinion.\n\n## Legal requirements\n\nThese are non-negotiable and the responsibility of the driver:\n\n- **Speed limits**: obey all posted limits at all times. Speeding fines and penalty points are the driver's responsibility, not the company's. Any fixed penalty notice received while driving a company vehicle will be passed to the named driver.\n- **Mobile phones**: it is illegal to use a hand-held phone while driving. This includes texting, checking maps, answering calls without a hands-free kit. Pull over safely if you need to use your phone. A hands-free kit is provided in the van \u2014 use it.\n- **Seatbelt**: always worn. Every journey, no exceptions.\n- **Drink and drugs**: absolute zero tolerance. Driving a company vehicle while impaired will result in immediate dismissal.\n\n## Standards beyond the legal minimum\n\nFollowing the law is the floor, not the ceiling. We also expect:\n\n- **Considerate parking**: park where you won't inconvenience neighbours, block driveways or cause hazards. If parking is difficult, take a moment to choose well rather than just stopping wherever is easiest.\n- **Courteous driving**: no aggressive overtaking, no tailgating, no horn unless genuinely necessary. Road rage in a branded van is a PR incident.\n- **Appropriate speed for conditions**: the limit is a maximum, not a target. Drive to the conditions.\n\n## Incidents and accidents\n\nIf you are involved in any incident \u2014 however minor \u2014 while driving a company vehicle:\n1. Ensure the scene is safe\n2. Photograph the damage and the other vehicle's plate if involved\n3. Exchange details if another party is involved\n4. Report to the office **the same day**, regardless of how minor it seems\n\n[warning]\nFailing to report an incident, even a minor parking scrape, is considered a disciplinary matter. The sooner it's reported, the easier it is to handle. Delayed reporting always makes things worse.\n[/warning]",
      },
      {
        id: "van-tracking",
        title: "Dash Cams and Vehicle Tracking — What's Recorded and Why",
        section: "Monitoring Systems",
        duration: "6 min",
        content:
          "All company vans are fitted with dash cameras and GPS tracking. This lesson explains exactly what is recorded, how it is used, and what the policy is around these systems.\n\n## Dash cameras\n\nEvery van has a dash cam recording continuously while the engine is running. Most also record when the vehicle is parked (with motion detection).\n\n**What the footage is used for:**\n- Incident investigation \u2014 if there is a road traffic incident, the footage protects you as much as it protects the company. In the majority of cases, dash cam footage has exonerated drivers from false claims made by other road users\n- Complaint investigation \u2014 if a customer or member of the public makes a complaint about driving behaviour, footage allows the company to investigate fairly\n- Periodic review of driving standards as part of staff development\n\n**What it is not used for:**\nRoutine surveillance of your personal conversations or movements during breaks. Footage is only reviewed when there is a specific reason to do so.\n\n## GPS vehicle tracking\n\nEvery van's location is logged continuously throughout the working day. This data is used to:\n\n- **Log start and finish times**: when the van first moves in the morning and when it returns or parks up for the end of the day is how we confirm working hours for payroll and scheduling\n- **Monitor route efficiency**: the routing data helps the operations team improve job scheduling\n- **Customer verification**: if there is a query about whether a visit took place or when it occurred, GPS data provides an accurate record\n\n## The policy on tampering\n\n[alert]\nTampering with, covering, disabling or attempting to interfere with a dash camera or GPS tracker in any way is a serious disciplinary offence and will result in immediate dismissal. These systems exist to protect you, the company and the public. There is no legitimate reason to interfere with them.\n[/alert]\n\n## The practical takeaway\n\nDrive as if someone whose opinion of you matters is watching \u2014 because the record exists. If you're driving professionally, following the rules and behaving sensibly, these systems are entirely on your side.",
      },
      {
        id: "van-checks",
        title: "Daily Checks and Keeping the Van in Good Order",
        section: "Vehicle Maintenance",
        duration: "5 min",
        content:
          "You don't need to be a mechanic to keep a company van in good working order. You do need to spend 2 minutes before every shift confirming the basics. Catching a problem before it causes a breakdown or an accident is everyone's responsibility.\n\n## The pre-drive check \u2014 do this every morning\n\nWalk around the vehicle before you get in:\n\n**Tyres**\n- Check for obvious flats or damage\n- Tyre pressure gauges are available in the van \u2014 check pressure weekly as a minimum\n- Minimum legal tread depth is 1.6mm across the central three-quarters of the tyre. If you're unsure, report it\n\n**Lights**\n- Confirm headlights, brake lights and indicators are working (ask someone to check brake lights if you're alone, or use a reflection)\n- A blown bulb is a fixed penalty notice waiting to happen\n\n**Windscreen**\n- Check for cracks or chips. A small chip can be repaired cheaply; left to spread it becomes a full windscreen replacement\n- Report any new damage immediately\n\n**Fluid levels** (check weekly, or flag to the office if warning lights appear)\n- Engine oil\n- Coolant\n- Washer fluid \u2014 particularly important in winter\n\n## Reporting faults\n\nIf anything is wrong \u2014 a warning light on the dashboard, a noise that wasn't there yesterday, a tyre that seems low, a door that doesn't close properly \u2014 report it to the office the same day. Do not wait for the next service.\n\n[note]\nWarning lights should never be ignored or covered. Some are advisory (a minor issue to monitor); some indicate immediate action is needed. If you're unsure what a dashboard warning light means, photograph it and call the office.\n[/note]\n\n## Keeping it clean\n\n- Remove any rubbish from the cab at the end of every working day\n- Wipe down surfaces if product or soil has been tracked in\n- Report when the van needs an external wash rather than waiting for it to be noticed",
      },
      {
        id: "van-loading",
        title: "Loading, Equipment and Safe Transportation",
        section: "Equipment and Loading",
        duration: "5 min",
        content:
          "The way equipment and chemicals are loaded into a van affects safety on the road, the condition of the products when they arrive, and the legal compliance of the vehicle. This isn't optional.\n\n## Securing equipment properly\n\nUnsecured equipment in a moving vehicle is a hazard. In an emergency stop, a loose spreader, backpack sprayer or box of granules becomes a projectile. More practically, unsecured equipment bouncing around in the rear of the van causes damage to the equipment and the vehicle.\n\n- Spreaders and sprayers must be secured against movement \u2014 use the racking and securing points provided\n- Boxes of granular product must be stacked stably and not top-heavy\n- Liquid products must be upright and sealed \u2014 never transported on their side\n- Loose small items (funnels, gloves, hand tools) belong in the storage containers provided, not loose in the load area\n\n## Chemical storage in the van\n\nPesticide and fertiliser products have specific storage requirements:\n\n- **Do not leave pesticide products in a hot van overnight or over the weekend.** Heat degrades some active ingredients and high temperatures can cause container distortion or pressure build-up in liquid products\n- Products must be in their original, labelled containers at all times \u2014 decanting into unlabelled containers is illegal under COSHH regulations\n- Any spill in the load area must be cleaned up immediately \u2014 do not allow product residue to accumulate\n- PPE required for handling the products must be in the van before you carry those products\n\n## Locking and security\n\n- Lock the van every time you leave it, even briefly\n- Do not leave pesticide products, valuable equipment or the company fuel card visible or accessible in an unattended van\n- If you need to leave the van unattended for an extended period (lunch break, etc.), ensure all equipment is secured in the locked load area, not the cab\n\n[tip]\nAt the start of each week, check your van stock against your job list. Running out of a product mid-route is avoidable with 5 minutes of planning. Report low stock to the office in advance \u2014 do not wait until you've run out.\n[/tip]",
      }
    ],
  }
,

  {
    id: "customer-visit-procedure",
    title: "The Customer Visit \u2014 Full Procedure",
    description: "The complete customer visit from arrival and pre-checks through greeting, lawn assessment, recommendations, safe treatment delivery and closing up correctly in Mobile Live.",
    icon: "ClipboardList",
    emoji: "\uD83C\uDFE1",
    category: "Field Operations",
    estimatedTime: "47 min",
    roles: ["technician"],
    stage: "systems-workflows",
    lessons: [
      {
        id: "cv-pre",
        title: "Arrival, Parking and Pre-Visit Checks",
        section: "Before You Knock",
        duration: "7 min",
        content:
          "Everything that happens before you knock on the door sets the tone for the visit. Arriving prepared, parking considerately and checking the details in advance is what separates a professional technician from someone just turning up.\n\n## Parking\n\nPark on the road or pavement where possible, rather than blocking the customer's drive. A blocked drive is an immediate friction point, especially if the customer needs to leave or a neighbour is inconvenienced.\n\nIf parking is genuinely difficult, choose the option that causes the least disruption and be aware that you may need to stop mid-job and move. Avoid this where possible.\n\n[note]\nBe aware that many properties now have CCTV cameras with audio recording. Conduct yourself at all times as if you're being recorded \\u2014 because often you are. No swearing, no negative comments about the property, no unprofessional conversations near the vehicle or garden.\n[/note]\n\n## Checking Mobile Live before you knock\n\nBefore leaving the van, open the job in Mobile Live and check the following:\n\n**Verify the address**: confirm that Mobile Live has directed you to the correct property. If the geocode is wrong, correct it so future visits route correctly. Do not proceed to an incorrect property.\n\n**Customer name**: note the customer's name \\u2014 you'll use it immediately at the door. Referring to a customer by name is a small thing that makes an immediate positive impression.\n\n**Service visit notes**: read these carefully. Pay particular attention to:\n- The size of the lawn (affects how much product you'll need)\n- Exactly which services are being delivered today \\u2014 not every customer has the same package\n- Any specific instructions, access notes, or requests left by the office or a previous technician\n\n## Checking service history\n\nSpend 60 seconds reviewing the customer's service history before the visit:\n\n**What has the customer had recently?** Recent services affect how the lawn looks today. A customer treated for moss two weeks ago will have blackening and die-back \\u2014 if you don't know that, it looks like a problem rather than a treatment response.\n\n**What services does the customer have regularly?** There's no point recommending a service they already have scheduled. Know their programme before you speak to them.\n\n**What could be recommended?** Pre-think one or two services that might be appropriate based on the time of year and what you know about the lawn. You'll assess in more detail on the ground, but having a hypothesis in advance makes the recommendation conversation more confident.\n\nClick Confirm in Mobile Live to start the timer. Then lock the van \\u2014 every time you leave it, even briefly.",
      },
      {
        id: "cv-access",
        title: "Access Issues and What to Do When No One Is Home",
        section: "Before You Knock",
        duration: "5 min",
        content:
          "Not every customer will be in when you arrive, and not every property will have clear access. Knowing the correct procedure for both protects you, the customer and the business.\n\n## Knocking and waiting\n\nKnock on the customer's door. If the van is clearly visible from the property \\u2014 the customer can see you're here \\u2014 you do not need to wait for a reply before beginning preparation. If the van is not visible from the door, give adequate time for the customer to answer.\n\n## If there is no access to all areas\n\nCheck whether access exists via an alternative entrance before concluding the property is inaccessible. Many gardens have side gates or rear lane access that isn't obvious from the front.\n\nIf access is genuinely unavailable and the customer is not at home:\n\n1. **Call the customer** on every number listed on their account. If there is no answer, leave a voicemail.\n2. **Photograph or video** the access obstruction clearly \\u2014 a locked gate, a parked vehicle blocking access, a dog in the garden. Send this evidence to the office.\n3. **Do not treat any part of the property** \\u2014 not the front, not any accessible area, nothing. A partial treatment creates billing complications and customer confusion.\n4. **Mark the job as Not Serviceable** in Mobile Live with a clear note explaining why.\n\n[warning]\nNever treat part of a property and leave the rest. Either the full service is delivered or none of it is. Partial treatments are not billable and create more problems than they solve.\n[/warning]\n\n## If the customer is home but access is obstructed\n\nKnock and explain the issue clearly. Ask the customer to resolve the obstruction (move the dog, unlock the gate) before you begin. Do not attempt to work around it without their knowledge.",
      },
      {
        id: "cv-greeting",
        title: "The Customer Greeting and Opening Conversation",
        section: "At the Door",
        duration: "7 min",
        content:
          "The first 60 seconds at the door sets the tone for the entire relationship. A confident, warm, professional greeting reassures the customer that the right person has arrived and that they're in good hands.\n\n## The standard greeting\n\nUse this structure every time \\u2014 adapt the wording naturally, but keep all the elements:\n\n**'Hello [Mrs/Mr Smith], I'm [your name] and today I'm here to [brief description of service]. Hopefully you were expecting me? We'll be applying [product/treatment] for [purpose/benefit]. Do you have any concerns, and how are you feeling about how the lawn is looking?'**\n\nBreaking this down:\n- **Name the customer** \\u2014 immediately signals you've prepared and know who they are\n- **Introduce yourself by first name** \\u2014 makes the interaction personal, not transactional\n- **State what you're doing** \\u2014 removes uncertainty; some customers worry when a van arrives unexpectedly\n- **Confirm they were expecting you** \\u2014 if they weren't, this is the moment to find out\n- **Name the treatment and its benefit** \\u2014 'nitrogen fertiliser for colour and growth' is more reassuring than 'a feed'\n- **Open the floor** \\u2014 'any concerns' and 'how is it looking' invite the customer to share things you need to know\n\n## Checking the pre-visit email\n\nConfirm the customer received our before-service email: 'Did you get our email before today's visit?'\n\nIf they didn't: check their email address on the account. If it appears correct, raise a call log for the office to investigate. If it's wrong, update it and advise the office.\n\n## Asking whether they need to see you afterwards\n\nBefore starting work, ask: 'Do you need me to come and find you when I'm finished, or are you happy for me to let myself out?'\n\nThis is courteous and prevents the customer feeling ignored. If you've spotted something you need to discuss \\u2014 a disease patch, damage, an access concern \\u2014 tell them you will come and find them.\n\n[tip]\nIf the customer wants to talk at the door, be warm but purposeful. Acknowledge what they're saying, answer their question, then redirect: 'I'll have a good look while I'm treating \\u2014 I'll come and let you know what I find.' Unnecessary delay at the door affects your schedule and theirs.\n[/tip]",
      },
      {
        id: "cv-assessment",
        title: "Pre-Treatment Assessment \u2014 Hazards, Lawn and Photos",
        section: "On the Lawn",
        duration: "7 min",
        content:
          "Before applying any treatment, you need to check the site is safe, understand the condition of the lawn, and create a photographic record. This protects you, informs your recommendations and ensures accurate record-keeping.\n\n## Hazard check\n\nBefore you begin working, identify any hazards:\n\n- **Dogs**: confirm they are secured away from the treatment area. Do not treat with animals present in the lawn area.\n- **Slippery surfaces**: wet decking, algae-covered paving, steep slopes \\u2014 note these and take care when moving around the property\n- **Overhanging branches**: relevant when operating equipment such as spreaders or sprayers near low vegetation\n- **Children's items on the lawn**: move small items (balls, toys, hoses) neatly to one side before treating. Do not move large items \\u2014 trampolines, goalposts, heavy furniture \\u2014 without customer permission\n\n## Lawn assessment\n\nTake a cursory look over the whole lawn before you begin. You'll see more detail when you're walking the lawn to apply treatment, but an initial overview helps you:\n- Identify obvious issues (disease patches, drought stress, severe weed infestation) that you should photograph and discuss\n- Confirm the lawn matches what's described in the visit notes\n- Begin forming any recommendations you'll make at the end\n\n## Photographs in Mobile Live\n\nTake photos of all areas being treated, and of any issues or conditions you identify. Label them correctly using the standard notation:\n\n[cols]\n**Format**: Area code + number + space + description\n**Examples**:\nSPN 23 \\u2014 chafer damage\nSUN 24 \\u2014 drought stress\nFLW 24 \\u2014 Red Thread, front left\n[/cols]\n\nPhotos serve multiple purposes: they protect you if a customer later disputes the condition of the lawn, they inform future technicians, and they provide the office with the information they need to discuss treatments with the customer.\n\n[note]\nIf the customer comes out of the house while you are working, stop what you are doing. Greet them by name, ask whether they have concerns or want to bring anything to your attention, then return to work. Never keep working with your back to a customer who has come to speak to you.\n[/note]",
      },
      {
        id: "cv-recommend",
        title: "Identifying Issues and Making Recommendations",
        section: "Recommendations",
        duration: "8 min",
        content:
          "One of the most valuable things you do on a visit is identify problems and recommend corrective services. This is not sales \\u2014 it is professional advice. A customer who pays for a lawncare programme trusts you to tell them when their lawn needs something.\n\n## The recommendation framework\n\nWhen you identify an issue, follow this structure:\n\n1. **Describe what you see** \\u2014 show the customer the problem in the lawn, name it\n2. **Explain the cause** \\u2014 in plain terms, why has this happened?\n3. **Give the solution** \\u2014 what can be done about it?\n4. **Give an indication of cost** \\u2014 roughly what the service costs (check ML for the estimate)\n5. **Ask for a decision** \\u2014 'Would you like me to add that to your lawncare plan?'\n\nThe close is always: **'Would you like me to add that to your lawncare plan?'** This framing is important \\u2014 it's adding to a plan, not selling an extra.\n\n## Common recommendations and when to make them\n\n**Mossy lawns**: recommend scarification in spring. Note: autumn scarification on a mossy lawn opens it up to more moss \\u2014 be able to explain why when asked.\n\n**Thatchy lawns or finer grasses**: recommend scarification in autumn.\n\n**Every lawn**: recommend annual hollow-tine aeration in autumn, unless aeration was done in spring \\u2014 in that case, suggest the following spring.\n\n**Bare patches or dog urine damage**: recommend scarification and overseeding each autumn.\n\n**Uneven surface or poor soil structure**: recommend top dressing.\n\n**Dry or free-draining lawns**: recommend Drench wetting agent application.\n\n**Lawns with persistent Red Thread**: recommend a preventative fungicide or Rejuvenate programme.\n\n## Raising the estimate in Mobile Live\n\nRaise estimates for any additional services in Mobile Live during or immediately after the visit. Select the correct status (recommended/pending customer decision). Do not leave estimates unraised \\u2014 if the customer calls the office later about a recommendation you made, there should be a record.\n\n## Leaving leaflets\n\nIf there is a leaflet available for the service you're recommending, leave it with the customer \\u2014 either hand it over in person or put it through the door. A physical leaflet gives the customer something to refer back to.\n\n[tip]\nThe best recommendations come from looking at the lawn, not from a script. If you know your lawn science, the right recommendations present themselves naturally. The doorstep-recommendations module covers the mindset behind this in more depth.\n[/tip]",
      },
      {
        id: "cv-ppe-application",
        title: "PPE, Safe Application and Protecting Surfaces",
        section: "Treatment Delivery",
        duration: "6 min",
        content:
          "Every treatment must be applied safely, with the correct PPE in place and appropriate measures taken to protect surfaces and the customer's property. This isn't bureaucracy \\u2014 it's professional practice and legal compliance.\n\n## PPE\n\nWear the PPE specified for the products you're applying, as per your health and safety training. The required PPE for each product is on its label and in the COSHH data for that product.\n\nBefore starting: ensure pets are secured and people are not at risk of exposure to the product being applied.\n\n## Protecting surfaces from staining \\u2014 liquid treatments\n\n**Drip-tray**: always use a drip-tray when filling sprayers over hard surfaces, driveways, paving or decking. Iron-containing products stain concrete and stone permanently. A single spill on a customer's driveway is a significant problem.\n\n**Overshoes**: when applying moss treatments, wear protective overshoes before stepping from the lawn onto any hard surface that could stain. Wet iron product on a lawn and carried onto paving by boots leaves a rust stain that is extremely difficult to remove.\n\n**Spill mat**: dry your feet on a spill mat before transitioning from lawn to hard surface.\n\n## Protecting surfaces from granular products\n\nAfter applying granular fertilisers or other granular treatments, inspect all adjacent hard surfaces \\u2014 driveways, paths, patio edges, steps. Blow or brush off any granules before finishing.\n\nGranular fertiliser left on hard surfaces:\n- Stains when wet (particularly iron-containing products)\n- Creates a slip hazard when wet\n- Causes customer complaints\n\nThis takes 60 seconds and should be done on every job without exception.\n\n[warning]\nIron product stains on hard surfaces are the most common source of customer complaints about treatment damage. The staining is orange-red, difficult to remove and highly visible. Prevention is straightforward \\u2014 a drip-tray when filling, overshoes when crossing surfaces, and clearing granules after application. These are non-negotiable steps.\n[/warning]",
      },
      {
        id: "cv-close",
        title: "Completing the Visit \u2014 Mobile Live, Reviews and Closing Up",
        section: "After Treatment",
        duration: "7 min",
        content:
          "How you finish a visit is as important as how you start it. Completing Mobile Live accurately, asking for a review, and leaving the property in good order closes the visit professionally and feeds accurate records back to the office.\n\n## Checking in with the customer\n\nBefore packing up, confirm the customer is happy with today's service. If they came out and spoke to you during the visit, this is a natural continuation. If not, and you have something to bring to their attention, knock and let them know.\n\n## Asking for a review\n\nAsk the customer to leave a review: **'If you've been happy with the service today, would you be able to leave us a Google review? I actually get a bonus when customers leave a review, and it really helps the business.'**\n\nLeave the review card with them. Being direct and honest about the bonus makes the ask feel genuine rather than scripted.\n\n## Completing Mobile Live\n\nBefore you move on, complete the job in Mobile Live:\n\n- **Select the relevant condition codes** for everything you observed \\u2014 be accurate and specific\n- **Raise estimates** for any recommended additional services with the correct status\n- **Notes**: use the notes section to draw attention to any concerns. If there are no concerns, add a positive note \\u2014 lawn condition, good mowing, healthy colour, whatever is genuinely relevant. Save regularly used notes as Quick Notes to avoid retyping.\n- **Check for duplicated notes**: when skipping through services, notes sometimes auto-duplicate into the next service. Delete any notes that have copied over incorrectly.\n- **Mark the job as Completed** in Mobile Live\n\n[note]\nCondition codes and notes in Mobile Live are how the office and future technicians understand what you found. Vague or missing notes mean the next person arrives with no context. Accurate notes take 90 seconds and make a material difference to service quality over time.\n[/note]\n\n## Leafleting neighbouring properties\n\nBefore leaving, leaflet the properties on either side and across the road \\u2014 unless the property is remote or has no immediate neighbours. This is a standard part of every visit.\n\n## Leaving the property\n\n**Leave all gates exactly as you found them** \\u2014 open gates closed, closed gates open. A gate left in the wrong position is a security or pet safety issue for the customer.\n\nBefore pulling away, sense-check the directions to your next job in Mobile Live rather than simply following the map app without thought. If something looks wrong, check it before committing.",
      }
    ],
  }

];