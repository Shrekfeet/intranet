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
        description: "Build your understanding of grass, thatch, soil and safe site practices — the knowledge base for everything that follows.",
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
        label: "Stage 4 · Field Operations",
        description: "Master the day-to-day operational standards, scenario handling, certifications and advanced service delivery.",
        navLabel: "Stage 4 · Operations",
      },
      {
        id: "lawn-knowledge",
        label: "Stage 5 · Deep Lawncare Knowledge",
        description: "Deepen your expertise in diseases, pests, weed science and complex lawn problem-solving.",
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
        label: "Stage 2 · Lawncare Foundations",
        description: "Understand enough about grass, soil and treatments to handle customer queries and explain our services with confidence.",
        navLabel: "Stage 2 · Foundations",
      },
      {
        id: "systems-workflows",
        label: "Stage 3 · Treatment Programmes",
        description: "Learn the treatment plan structure, seasonal timeline and what each service code means — essential for scheduling and customer calls.",
        navLabel: "Stage 3 · Programmes",
      },
      {
        id: "advanced-operations",
        label: "Stage 4 · Operational Standards",
        description: "Handle more complex routing, service changes, complaint escalation and cross-team coordination with confidence.",
        navLabel: "Stage 4 · Operations",
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
  // ─── STAGE 1: COMPANY BASICS ───────────────────────────────────────────────
  {
    id: "company-basics",
    title: "How Shrekfeet Works",
    description: "Who we are, how the team is structured, what's expected from day one, and how work flows through the business.",
    icon: "BookOpen",
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
          "Shrekfeet is an independent lawn treatment company servicing domestic customers across our regional patch. We sit between the big national franchises and one-man-band operators — professional kit and qualifications, with the personal service of a local team.\n\n**The leadership team:**\n- Ian Kenyon — Managing Director. Responsible for the overall direction, finances, marketing and growth of the business.\n- Harry White — Operations Manager. Your direct line manager if you're a technician. Responsible for van/technical issues, equipment failure, product stock, holiday and working hours, 121s, customer reviews, customer satisfaction, HR reporting, performance, development, new sales leads and salary reviews.\n- Joseph Chavoshi-Nasab — Customer Experience Manager. Leads customer scheduling, communications and satisfaction tracking.\n- Paul Scorey — Business Development. Handles new customer onboarding, initial lawn surveys and estimate follow-ups.\n\n**Day-to-day escalation:**\n- Operational issues → Harry White\n- Scheduling and customer queries → Joseph/the office team\n- Business or financial matters → Ian Kenyon\n\nKnowing who to go to matters. Don't sit on a problem — the right person can usually fix it the same day.",
      },
      {
        id: "cb2",
        title: "Our Standards and Culture",
        duration: "10 min",
        content:
          "We operate as a tight team. The standards below are non-negotiable and apply to everyone regardless of role or experience.\n\n**What we expect from everyone:**\n- Punctual: ready and working by your agreed start time.\n- Presentable: clean uniform, ID badge visible, vehicle tidy.\n- Honest: if you've made a mistake, tell the team the same day. We can fix mistakes; we can't fix cover-ups.\n- Proactive: don't wait to be asked. If you can see a problem forming, flag it early.\n- Customer-first: if a customer is unhappy, listen first, fix what you can, escalate the rest.\n\n**On dishonesty:**\nWe take misconduct seriously. We expect the same from everyone we hire. If we tolerate poor behaviour, we lose good people and good customers. The culture of this team is set by the standards we hold each other to — that starts with you.\n\n**On communication:**\nCommunication is king at Shrekfeet. Always cover what the other person is about to ask before they need to ask it. If something has gone wrong, don't wait for someone to notice — tell them.",
      },
      {
        id: "cb3",
        title: "How Work Moves Through the Business",
        duration: "10 min",
        content:
          "From the first customer contact to service completion, every step should feel joined up. Here's how work flows:\n\n1. Paul onboards a new customer — lawn survey, AutoPay setup, SA5 account created.\n2. Joseph builds the schedule — routes, job timing, technician assignment.\n3. The technician carries out the treatment, logs notes and condition codes in SA5, raises any flags or estimates.\n4. The office reviews call logs, follows up on estimates, handles callbacks and reschedules.\n5. Harry oversees performance, reviews, HR and equipment supply.\n\n**The key principle:** every person in the chain needs accurate information to do their job well. Incomplete notes, missed call logs and unclosed estimates create work for someone else down the line.\n\n**Service Assistant 5 (SA5)** is our job management system — built on the RealGreen platform. Every customer, every visit, every note lives in SA5. If it happened but it's not in SA5, it didn't happen as far as the business is concerned.",
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
          question: "If you arrive late, make a mistake or notice a problem forming — what is the expected behaviour?",
          options: [
            "Wait to see if anyone notices before raising it",
            "Flag it to a colleague and let them decide",
            "Communicate proactively and the same day — don't sit on it",
            "Write it in your personal notes for the next review",
          ],
          correct: 2,
          explanation: "Proactive communication is a core Shrekfeet standard. Flag problems early — we can fix mistakes, but we can't fix cover-ups.",
        },
        {
          id: "cb-q3",
          question: "What is Service Assistant 5 (SA5) used for?",
          options: [
            "Clocking in and out of shifts",
            "Job management — every customer, visit, note and condition code",
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
          explanation: "Paul Scorey handles business development — new customer onboarding, lawn surveys and closing estimates.",
        },
      ],
    },
  },
  {
    id: "customer-service",
    title: "Customer Communication Standards",
    description: "The shared tone, behaviours and communication habits expected from every Shrekfeet employee.",
    icon: "Users",
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
          "Understanding why customers cancel is as important as understanding what we sell. The research is consistent: customers leave when they feel undervalued or ignored — not because of a single bad treatment.\n\n**The most common reasons customers cancel:**\n- Lack of communication or feeling out of the loop\n- Complicated processes or long wait times for resolutions\n- Inconsistency — different quality or approach each visit\n- Hidden fees or unclear policies\n- Feeling like just an account number, not a person\n\n**What keeps them:**\n- Personalised service — knowing their name, their lawn, their concerns\n- Quick and effective resolution when something goes wrong\n- Consistent quality on every visit\n- Proactive updates before they need to ask\n\n**Your role in retention:**\nEvery customer interaction — a call, a doorstep conversation, a treatment note — either adds to or subtracts from the customer's confidence in us. Retention is not just a management responsibility. It starts with every employee on every visit.",
      },
      {
        id: "cc2",
        title: "The FAB Framework and Selling with Logic",
        duration: "10 min",
        content:
          "When recommending additional services — whether on a doorstep or over the phone — use the FAB framework:\n\n**Feature:** what the service does (mechanically)\n**Advantage:** why that matters for this lawn\n**Benefit:** what the customer actually gains\n\n**Example — recommending a One-Time Moss Treatment:**\n- Feature: 'This product dehydrates the moss, turning it black within an hour.'\n- Advantage: 'Once dry, the moss is much easier to rake out. It won't smother the grass.'\n- Benefit: 'Your grass will have space to spread and fill in, giving you a denser, healthier lawn.'\n\n**Waterproofing the sale:**\nAlways explain what the customer will see happen — especially if it looks alarming. Moss going black after treatment surprises customers who weren't warned. A customer who calls in concerned is a retention risk. A customer who was told what to expect calls to say thank you.\n\n**The key question:** 'Can you see how that will benefit your lawn?' — invites them to confirm understanding, not just passive agreement.\n\n**If they nod, they understand. If they understand, they are more likely to say yes. And if the lawn looks better, they stay.**",
      },
      {
        id: "cc3",
        title: "Professional Language and Logging",
        duration: "10 min",
        content:
          "Customers remember how we make them feel. Keep communication calm, friendly and direct.\n\n**Do:**\n- Use the customer's name (it's in SA5 as soon as you've located their account)\n- Speak clearly and respectfully\n- Confirm the next step before ending any conversation\n- Log every customer interaction with specific notes\n\n**Do not:**\n- Sound rushed or dismissive\n- Over-promise outcomes or specific timelines you can't guarantee\n- Guess when you're unsure — escalate instead\n\n**Note quality matters:**\nInclude what was discussed, what was promised, any dates or constraints, and what follow-up is outstanding. Short, factual notes are better than long vague ones. The next person to open that account should be able to pick up exactly where you left off.\n\n**Remember:** when a customer visits ends with 'What happens next?', always give them a clear answer. 'I'll log this and someone will contact you by Thursday' is infinitely better than 'we'll be in touch.'",
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
            "Failing to 'waterproof the sale' — not explaining what the customer would see",
            "Normal customer behaviour that doesn't need addressing",
            "A scheduling error by the office team",
          ],
          correct: 1,
          explanation: "Waterproofing the sale means explaining upfront what will happen — especially anything that might look alarming. This prevents surprise calls and builds trust.",
        },
        {
          id: "cs-q3",
          question: "What is the most common reason customers cancel their lawn treatment plan?",
          options: [
            "Price increases",
            "A single bad treatment result",
            "Feeling undervalued or ignored — lack of communication and consistency",
            "Not understanding what they signed up for",
          ],
          correct: 2,
          explanation: "Research consistently shows customers leave when they feel undervalued or ignored — not usually because of one bad outcome. Communication and consistency are the biggest drivers of retention.",
        },
      ],
    },
  },

  // ─── STAGE 2: ROLE FOUNDATIONS ─────────────────────────────────────────────
  {
    id: "grass-thatch-soil",
    title: "Grass, Thatch & Soil",
    description: "The biological foundation of lawn treatment — grass anatomy, germination, the main UK grass families, thatch management and core soil types.",
    icon: "Leaf",
    category: "Shared Foundations",
    estimatedTime: "60 min",
    roles: ["technician", "office"],
    stage: "role-foundations",
    isShared: true,
    lessons: [
      {
        id: "gts-anatomy",
        title: "Grass Anatomy — How the Plant Is Built",
        section: "Grass",
        duration: "8 min",
        content:
          "Before you can diagnose a lawn, you need to understand how a grass plant is structured. Every part of the plant has a specific function — and knowing which parts are vulnerable, and which are resilient, directly influences how you treat.\n\n**The key parts of a grass plant:**\n\n**Roots**\nAnchor the plant and absorb water and nutrients from the soil. Shallow root systems are a sign of stress — shallow-rooted lawns are the first to suffer in drought. Compaction, thatch and waterlogging all restrict root depth.\n\n**Crown**\nThe most important part of the plant. This is the growth point, located just above soil level, where new leaves emerge. Damage to the crown kills the plant. This is why scalping (mowing too short) is so damaging — you risk cutting into or exposing the crown.\n\n**Stem (culm)**\nThe short stem that supports the leaf structure. In turf grasses, the stem is usually very compressed — most of the visible plant is leaf.\n\n**Leaf blade**\nThe visible, green part of the plant. Photosynthesis happens here. When we assess a lawn, we're largely assessing the health of the leaf blade — its colour, density, and condition.\n\n**Stolons**\nAbove-ground horizontal runners that spread the plant across the soil surface. Creeping red fescue and bent grass spread via stolons — they can 'fill in' thin patches naturally if the crown isn't damaged.\n\n**Rhizomes**\nBelow-ground horizontal stems that allow the plant to spread underground. Some species (smooth-stalked meadow grass / Poa pratensis) spread via rhizomes, giving the sward a tight, mat-like quality.\n\n**Why anatomy matters in practice:**\n- A lawn with shallow roots is drought-vulnerable — aeration and correct watering advice helps\n- Scalping exposes or damages the crown — a common cause of bare patches\n- Stoloniferous grasses can self-repair thin areas — useful to know when advising on renovation\n- Understanding leaf density helps explain why fine fescues feel different underfoot to ryegrass lawns",
      },
      {
        id: "gts-germination",
        title: "Germination & Establishment — Why Timing Matters",
        section: "Grass",
        duration: "8 min",
        content:
          "Two terms you'll hear constantly when seeding work is involved: germination and establishment. They are not the same thing — and confusing them can lead to costly mistakes.\n\n**Germination**\nGermination is when the seed sprouts and the first shoot breaks through the soil surface. It requires:\n- Soil temperature above ~8°C (most UK grass species)\n- Consistent moisture at the seed surface\n- Good seed-to-soil contact — seeds need to touch the soil to absorb moisture\n\nTypical germination times at the right conditions:\n- Perennial ryegrass: 7–10 days\n- Fine fescues: 10–14 days\n- Bent grass: 14–21 days\n\n**Establishment**\nEstablishment is when the plant has developed sufficient root depth and leaf area to tolerate foot traffic and — critically — treatments. This takes considerably longer than germination.\n- Minimum time before weed control can be applied: **42–56 days after germination**\n- The seedlings must have been mown at least 2–3 times before herbicide is considered\n\n**Why this matters on a job:**\nApplying weed control too early — before the grass is established — will damage or kill the seedlings. If a customer has had overseeding (OVS) carried out, their account will flag this. In SA5, if OVS has been accepted, the SPN treatment switches to SPW (weed control delayed until establishment is confirmed).\n\n**Ideal seeding windows in the UK:**\n- **Autumn (September–October):** best overall — warm soil, cooler air, less competition from weeds and less drought risk\n- **Spring (March–April):** acceptable — soil warming but weed pressure rises as the season progresses\n- **Summer:** not recommended — drought risk before establishment is high\n- **Winter:** not recommended — soil too cold for reliable germination\n\n**Seed-to-soil contact:**\nThe single most common reason for poor germination is poor seed-to-soil contact. After overseeding, lightly raking or top-dressing beds the seed into the surface. A roller can also help. Without contact, the seed sits in the air, dries out and fails to germinate.",
      },
      {
        id: "gts-fescues",
        title: "Fine Fescues — Festuca",
        section: "Grass",
        duration: "8 min",
        content:
          "Fine fescues are the most shade-tolerant and drought-resistant of the three main UK lawn grass families. They're found in ornamental lawns, older domestic lawns and areas where the conditions suit a finer-textured sward.\n\n**Key characteristics:**\n- Very fine, narrow leaf blade — gives a dense, soft appearance\n- Low to moderate nitrogen requirement — doesn't need heavy feeding\n- Slow to establish but long-lived once in\n- Performs best at lower mowing heights (25–40mm)\n- Spreads via both tillers and, in some species (creeping red fescue), via stolons\n\n**Common fescue species in UK lawns:**\n\n**Creeping red fescue (Festuca rubra subsp. rubra)**\nThe most common fine fescue in domestic lawns. Spreads via stolons — fills in gaps naturally. Good shade and drought tolerance. Most susceptible species for **Red Thread disease** — a common summer fungal problem that presents as pink-red patches.\n\n**Chewings fescue (Festuca rubra subsp. commutata)**\nNon-creeping, forms dense clumps. Fine texture, good mowing quality. Used in luxury lawn mixes.\n\n**Hard fescue (Festuca longifolia)**\nExtremely drought tolerant, low maintenance. Used in low-input and wildflower-adjacent turf. Doesn't form the dense sward of other fescues.\n\n**Sheep's fescue (Festuca ovina)**\nVery fine, blue-green appearance. Low growing, low maintenance. Not common in domestic lawns but found in drier and upland locations.\n\n**How fescues feel and look:**\nA fescue-dominant lawn feels softer and denser than a ryegrass lawn. The leaf blade is significantly finer. In dry summers, fescues go dormant and brown but recover when moisture returns — they look worse in drought but are more drought-resilient than they appear.\n\n**Red Thread risk:**\nIf you see pink-red webbing or patches in a lawn, and fescues are present, Red Thread is the likely cause. The lawn is usually starved — nitrogen deficiency is the primary trigger. Feeding the lawn is the first response. Fungicide (curative) and liquid iron can assist recovery.",
      },
      {
        id: "gts-ryegrass",
        title: "Perennial Ryegrass — Lolium perenne",
        section: "Grass",
        duration: "8 min",
        content:
          "Perennial ryegrass is the backbone of the UK domestic lawn. If a customer has had a re-seed, renovation or new build lawn laid, it's almost certainly predominantly perennial ryegrass. Understanding it is non-negotiable.\n\n**Key characteristics:**\n- Broad, shiny leaf blade — the most recognisable feature; the underside of the leaf has a distinctive gloss\n- Coarse texture compared to fescues — feels firmer underfoot\n- Hardwearing — handles foot traffic better than any other domestic lawn grass\n- Fastest to establish: germinates in **7–10 days** under the right conditions\n- Excellent response to fertiliser — shows visible green-up rapidly after a feed\n- Lower shade tolerance than fescues — thins out significantly under tree canopies\n- Moderate drought tolerance — goes dormant in severe drought but recovers\n\n**Why it dominates domestic lawns:**\nDomestic customers want results quickly and need a lawn that can handle children, dogs and foot traffic. Perennial ryegrass delivers on all counts. It's also widely available, relatively cheap, and responds well to standard treatment programmes.\n\n**Typical seed mix proportions:**\n- Family/utility lawn: 70–80% perennial ryegrass, remainder fine fescue and bent\n- Ornamental/fine lawn: heavier fescue content, lower or no ryegrass\n- Sports/high-wear area: near 100% perennial ryegrass or specialist hard-wearing cultivars\n\n**On the job:**\nRecognising a ryegrass-dominant lawn helps set expectations. When a customer asks why their lawn doesn't look like a bowling green, the answer is often variety — a ryegrass lawn cannot achieve the same texture as a fine fescue or bent grass lawn without complete renovation.\n\n**Common problems in ryegrass lawns:**\n- Thins in shade — recommend overseed with fescue in shadier areas\n- Susceptible to Leatherjacket and Chafer Grub damage — both feed on roots; ryegrass has shallow roots and can be lifted easily when grubs are present\n- Leaf Spot disease can appear in wet, humid conditions",
      },
      {
        id: "gts-bents",
        title: "Bent Grasses & Meadow Grasses — Agrostis & Poa",
        section: "Grass",
        duration: "8 min",
        content:
          "The third group covers the finer and often more specialised grasses you'll encounter — primarily the bent grasses (Agrostis) and smooth-stalked meadow grass (Poa pratensis). Annual meadow grass (Poa annua) also belongs here and is a common problem in domestic lawns.\n\n**Bent Grasses (Agrostis)**\n\n**Browntop bent (Agrostis capillaris)**\nThe most common bent in UK domestic lawns. Extremely fine-leaved, forms a dense creeping mat via stolons. Often found in older, ornamental or low-mow lawns. Responds well to high inputs and tight mowing, which is why it dominates golf greens. In domestic lawns it's usually found as a component of a mixed sward, not the dominant species.\n\n- Fine texture — feels like a carpet when healthy\n- Spreads quickly via stolons — competitive ground-coverer\n- High maintenance at its best; lower inputs mean it cohabits with ryegrass and fescue\n- Prone to surface thatch build-up due to its dense mat-forming habit\n\n**Velvet bent (Agrostis canina)** and **Creeping bent (Agrostis stolonifera)**\nPrimarily golf/sports turf species. Unlikely in domestic lawns but you may encounter them on high-spec domestic projects. Very high maintenance.\n\n---\n\n**Smooth-stalked Meadow Grass (Poa pratensis)**\nA rhizomatous species — spreads underground, giving excellent repair and fill-in ability. More common in parks, sports surfaces and older domestic lawns. Hardy, dark green, tolerates close mowing. Slow to establish but fills in well once established.\n\n---\n\n**Annual Meadow Grass (Poa annua) — the problem species**\nUnlike its cousins, Poa annua is annual — it completes its life cycle in one year and seeds itself prolifically. You'll recognise it by:\n- Pale, yellow-green colour\n- Seed heads visible even at low mowing heights\n- Compressed habit — flat-growing\n- Often found in worn, compacted areas\n\nThere is **no selective herbicide** that controls Poa annua without damaging the surrounding grass. Cultural control only:\n- Avoid scalping (Poa annua thrives in low, stressed grass)\n- Overseed densely to crowd it out — a thick sward is the best defence\n- Aeration reduces compaction, which favours Poa annua establishment\n\nOn a doorstep, if a customer asks about the pale patches with seed heads, this is a common culprit — set honest expectations that it requires ongoing management, not a single treatment fix.",
      },
      {
        id: "gts-thatch-what",
        title: "Thatch — What It Is & Why It Builds Up",
        section: "Thatch",
        duration: "6 min",
        content:
          "Thatch is one of the most common problems in UK domestic lawns — and one of the most misunderstood by customers. Being able to explain it clearly on the doorstep is one of the most valuable skills a technician can develop.\n\n**What is thatch?**\nThatch is the layer of dead and dying organic matter — old stems, roots and cellular debris — that accumulates between the green leaf blades and the soil surface. It is a natural by-product of grass growth. A thin layer (under 10mm) is normal and beneficial, acting as cushioning and insulation. Beyond 10mm, it starts to cause problems.\n\n**Why does it build up?**\nThatch forms when organic matter accumulates faster than soil microbes can break it down. The balance tips in the wrong direction when:\n\n- **Over-fertilising with nitrogen:** rapid growth produces more organic matter than the soil's microbial population can decompose. The grass grows faster than the system can recycle it.\n- **Infrequent or absent aeration:** without air channels into the soil, microbial activity drops and decomposition slows significantly. Microbes need oxygen.\n- **Heavy or frequent watering:** keeps the surface saturated, reducing oxygen levels in the soil and slowing the breakdown process.\n- **Coarse grass varieties:** ryegrass produces more bulk organic matter per season than finer species like fescues or bents.\n- **Low mowing height:** compresses the thatch layer rather than allowing natural airflow around the base of the plant.\n- **Heavy clay or compacted soils:** poor drainage creates anaerobic (low-oxygen) conditions at the soil surface, where microbial breakdown is very slow.\n\n**A useful way to explain it to customers:**\nImagine the lawn has a recycling system — microbes in the soil break down old plant material and return it to the soil as nutrients. When you over-fertilise, water too heavily, or cut off the air supply by not aerating, that recycling system gets overwhelmed. The organic matter piles up faster than it can be processed — and that pile is thatch.",
      },
      {
        id: "gts-thatch-effects",
        title: "Thatch — Effects & How to Measure It",
        section: "Thatch",
        duration: "6 min",
        content:
          "Understanding what excess thatch actually does to a lawn helps you explain to customers why treatments are underperforming — and why scarification is worth investing in.\n\n**What does excess thatch do?**\n\n**Blocks water and air penetration**\nRainfall and fertiliser land on the thatch layer and often stay there, never reaching the rootzone below. Liquid iron applied to a heavily thatched lawn largely stays in the thatch — which is why the same lawn treated twice can still look yellow. This is one of the most common reasons treatments underperform. A customer complaining that their fertiliser 'doesn't seem to be working' may simply have a thatch problem.\n\n**Creates ideal disease conditions**\nWarm, moist, low-airflow environments are exactly what fungal pathogens need. Red Thread, Fusarium and other lawn diseases thrive in heavy thatch. If a lawn has recurring disease issues, high thatch is almost always a contributing factor.\n\n**Encourages shallow rooting**\nGrass roots will grow upward into the moist thatch rather than downward into the soil — it's the path of least resistance. Shallow roots mean the lawn is highly vulnerable to drought; the moment the thatch dries out, the grass has no reservoir to draw from.\n\n**Creates a spongy surface**\nWalk on a heavily thatched lawn and it feels soft or springy underfoot. Customers often describe it as 'bouncy'. The thatch is acting as a cushion between the foot and the soil. It can also create uneven ground as thatch builds up at different rates across the lawn.\n\n**Locks out nutrients**\nNutrients from fertiliser can become chemically bound up in the thatch layer and rendered unavailable to the plant. You're paying for feed that the grass can't access.\n\n---\n\n**How to measure thatch depth:**\nUse a soil probe or a penknife to cut a small plug from the lawn. Look at the profile in cross-section — you'll see three distinct layers:\n1. Green layer at the top (living grass)\n2. Brown/grey spongy layer between green and soil = thatch\n3. Dark soil beneath\n\nMeasure the thatch layer in millimetres:\n- **Under 10mm:** healthy — no action needed\n- **10–20mm:** moderate — preventive scarification recommended\n- **20–30mm:** significant — curative scarification required\n- **30mm+:** severe — deep scarification, likely multi-pass; manage customer expectations on recovery time\n\nAlways take a reading before quoting a scarification job — the depth directly affects the price weighting.",
      },
      {
        id: "gts2",
        title: "Thatch — Control Methods & Scarification Weighting",
        section: "Thatch",
        duration: "6 min",
        content:
          "Once you've identified excess thatch and explained the problem, the customer needs to know what can be done about it. There are three main approaches — one curative, two preventive.\n\n**Scarification (curative)**\nMechanical raking or flailing to physically remove accumulated thatch from the lawn. This is the primary curative method and the most impactful single service we offer for thatch management.\n\n- Uses rotating flails or spring-tine blades to tear the thatch out of the sward\n- Produces significant arisings (waste material) that must be collected and removed\n- Should always be followed by overseeding — scarification opens the soil and creates the ideal seedbed, but it also stresses the existing grass. Overseeding fills the gaps and thickens the sward.\n- Timing: primarily **autumn** (September–October) when soil is warm and growing conditions remain. A lighter spring pass may be done if the lawn is very thatchy coming out of winter.\n- Warn customers: the lawn will look worse before it looks better. A freshly scarified lawn can look quite rough — this is normal.\n\n**Aeration (preventive)**\nImproves drainage and introduces oxygen into the soil, which stimulates the microbial activity that breaks thatch down naturally. Regular annual aeration significantly slows thatch accumulation over time.\n\n- **Hollow-tine aeration** removes cores of soil and thatch — more effective for thatch management than solid-tine\n- **Solid-tine** improves airflow and drainage but doesn't remove material\n- For heavily thatched lawns, hollow-tine aeration combined with scarification is the gold standard\n\n**Balanced nutrition**\nAvoiding excessive nitrogen applications reduces the rate of organic matter production. This is a preventive measure, not a cure. Autumn programmes are deliberately low in nitrogen partly for this reason.\n\n---\n\n**Scarification difficulty weighting:**\nFor quoting scarification jobs, we use a five-factor difficulty weighting system. Each factor adds a multiplier to the base price for that lawn size:\n\n1. **Thatch depth** — 0–30mm = standard, 30–60mm = +0.10, 60mm+ = +0.25\n2. **Lawn slope** — level = 0, gentle slope = +0.10, steep = +0.25\n3. **Layout complexity** — simple 1–2 zones = 0, difficult 3–5 zones = +0.10, complex 5+ = +0.25\n4. **Access restrictions** — open access = 0, steps or tight gates = +0.10\n5. **Disposal distance** — next to lawn = 0, within 5m = +0.10, over 5m = +0.25\n\nAdd all applicable factors together and apply the total as a multiplier to the base price. A lawn with 40mm thatch, on a gentle slope, with 4 zones and steps = +0.30 total.",
      },
      {
        id: "gts-clay",
        title: "Clay Soil — Identification & Treatment",
        section: "Soil Types",
        duration: "6 min",
        content:
          "Clay is one of the most common soil types in UK gardens and the one that causes the most visible problems for lawns. Recognising it quickly and understanding what it means for treatment is a key field skill.\n\n**The squeeze test:**\nTake a handful of moist (not wet, not dry) soil from just below the surface. Squeeze it firmly, then press it with your thumb.\n- **Clay result:** holds a solid ball shape — and smears or ribbons when you press it. It feels dense and sticky. It won't crumble.\n\n**Why clay behaves the way it does:**\nClay particles are extremely small — much finer than sand or silt. This gives clay soil a huge surface area, which is why it retains water and nutrients so effectively. The downside is that the particles pack tightly together, leaving little room for air or water to move through.\n\n**Characteristics:**\n- Heavy and slow-draining — prone to waterlogging in wet periods\n- Prone to compaction under foot traffic and machinery\n- Sticky and plastic when wet; shrinks, cracks and sets hard when dry\n- High nutrient content — but nutrients may be inaccessible when structure is poor\n- Warms slowly in spring — lawns are slow to green up and come out of dormancy\n\n**What this means for treatment:**\n\n- **Aeration is essential** — hollow-tine aeration breaks up compaction, improves drainage and introduces oxygen. The single most impactful service for clay lawns.\n- **Wetting agents help** — in dry periods, clay can become hydrophobic (water-repellent), causing water to run off rather than penetrate. Wetting agents restore penetration.\n- **Nutrients are not usually the limiting factor** — clay holds nutrients well. The problem is structure and drainage, not starvation.\n- **Fertiliser timing matters** — applying granular fertiliser to a waterlogged clay lawn risks runoff and waste. Wait for the surface to drain.\n\n**Weeds that point to clay soil:**\n- Creeping buttercup — wet, compacted conditions\n- Greater plantain — compacted soil\n- Dock — wet, heavy soil\n\nIf you see these weeds alongside a slow-draining, puddling lawn, clay is almost certainly the underlying soil.",
      },
      {
        id: "gts-loam",
        title: "Loam Soil — Identification & Treatment",
        section: "Soil Types",
        duration: "5 min",
        content:
          "Loam is the gold standard for lawns — a balanced mixture of sand, silt and clay that gives good drainage, good moisture retention and good nutrient-holding capacity. Most treatments work exactly as expected on loam.\n\n**The squeeze test:**\nTake a handful of moist soil from just below the surface. Squeeze it firmly.\n- **Loam result:** holds a ball shape but crumbles when you prod or press it. It's not sticky, it's not dust. It holds together just enough, then lets go.\n\n**Why loam works so well:**\nLoam sits in the middle ground. The sand fraction keeps drainage open. The clay fraction retains moisture and nutrients. The silt fraction fills the gaps and gives a stable structure. None of the extremes of clay (too wet, too compacted) or sand (too dry, too hungry) apply.\n\n**Characteristics:**\n- Good drainage without being drought-prone\n- Good nutrient retention without waterlogging\n- Easy to work — crumbles well, doesn't compact severely\n- Most UK domestic gardens have a loam component, though it's rarely pure loam\n- Warms at a moderate rate in spring\n\n**What this means for treatment:**\n- Responds well to the full standard programme — fertiliser, herbicides, iron, wetting agents all behave predictably\n- Aeration is still beneficial annually but less urgent than on clay or sandy soils\n- Irrigation advice: moderately drought-tolerant, but deep watering during dry spells is better than frequent shallow watering\n- Standard fertiliser rates and timings apply without adjustment\n\n**On the doorstep:**\nIf a customer's lawn is on loam and still struggling, the cause is more likely to be cultural (wrong mowing height, poor watering habits, disease, shade) rather than a fundamental soil problem. Loam is forgiving — look elsewhere for the explanation.",
      },
      {
        id: "gts3",
        title: "Sandy Soil — Identification & Treatment",
        section: "Soil Types",
        duration: "6 min",
        content:
          "Sandy soil is at the opposite end of the spectrum from clay. Where clay holds everything, sand lets everything go — water drains through quickly, nutrients leach away and the lawn dries out fast. Lawns on sandy soil have very specific needs.\n\n**The squeeze test:**\nTake a handful of moist soil from just below the surface. Squeeze it firmly.\n- **Sandy result:** barely holds shape at all — crumbles immediately when you open your hand, or won't compact into a ball in the first place. Feels gritty.\n\n**Why sandy soil behaves the way it does:**\nSand particles are large — much larger than silt or clay. The spaces between particles are big enough for water to drain through freely and quickly. There's no surface area to hold onto water or nutrients the way clay does.\n\n**Characteristics:**\n- Very free-draining — water moves through rapidly, especially after rain\n- Low nutrient retention — fertiliser leaches downward, especially nitrogen and potassium\n- Warms up fast in spring — good for early green-up and germination\n- Drought-prone in summer — no reservoir of moisture to sustain the grass\n- Light and easy to work\n\n**What this means for treatment:**\n\n- **Fertiliser strategy:** more frequent applications at lower rates. A heavy single application will leach before the grass can use it — split feeds are more effective.\n- **Wetting agents are highly valuable:** in dry periods, sandy soils can become hydrophobic (the sand particles develop a waxy coating that repels water — it balls off rather than penetrating). Wetting agents restore absorption and help water reach the rootzone.\n- **Irrigation advice:** infrequent but deep watering is better than light daily watering. Deep watering encourages roots to follow moisture downward — building drought resilience. Light daily watering keeps roots shallow.\n- **Overseeding:** sandy lawns thin quickly under drought. Overseeding with drought-tolerant species (hard fescue, chewings fescue) improves resilience.\n\n**Weeds that point to sandy soil:**\n- Yarrow — thrives in dry, poor, infertile conditions\n- Trefoil/clover — nitrogen-fixing, outcompetes starved grass\n- Mouse-ear chickweed — low-fertility indicator\n\n**Soil pH and grass (applies to all soil types):**\nRegardless of soil type, pH directly affects whether nutrients are available to the plant. Most UK lawn grasses prefer **pH 6.0–7.0**.\n- Below 6.0 (acidic): grass struggles, moss and acid-tolerant weeds thrive — liming can help\n- Above 7.5 (alkaline): iron and manganese become chemically locked out, causing yellowing\n\nNote: silty, peaty and chalky soils are covered in the Advanced Soil Types module.",
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
            "The seed head — the part that produces new seeds",
            "The above-ground runner that spreads the plant sideways",
            "The growth point just above soil level — damaging it kills the plant",
            "The top 5mm of the root system",
          ],
          correct: 2,
          explanation: "The crown is the growth point where new leaves emerge, located just above soil level. Scalping or damaging the crown kills the plant — which is why cutting too short causes bare patches.",
        },
        {
          id: "gts-q3",
          question: "A customer has had overseeding (OVS) carried out six weeks ago. They ask when weed control can be applied. What do you tell them?",
          options: [
            "Immediately — the grass is established enough after three weeks",
            "Not yet — weed control must wait at least 42–56 days from germination and at least 2–3 mows",
            "Weed control cannot be applied for 6 months after seeding",
            "It depends on the weed species present",
          ],
          correct: 1,
          explanation: "The grass must be fully established — which means 42–56 days from germination and having been mown at least 2–3 times. Applying herbicide too early damages or kills the seedlings.",
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
          explanation: "Creeping red fescue is the most susceptible species to Red Thread. The primary trigger is nitrogen deficiency — feeding the lawn is the first response alongside fungicide if needed.",
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
          explanation: "Clay soil holds a firm ball and smears when touched — it's sticky, slow-draining and prone to compaction.",
        },
        {
          id: "gts-q7",
          question: "A sandy soil lawn needs fertilising. Compared to a loam lawn, how should you approach the application?",
          options: [
            "Apply at double the rate — nutrients wash through sandy soil faster",
            "Apply at lower rates more frequently — nutrients leach through quickly",
            "Apply once per year — sandy soils retain nutrients well",
            "No difference — soil type doesn't affect fertiliser requirements",
          ],
          correct: 1,
          explanation: "Sandy soils have low nutrient retention — fertiliser leaches through quickly, especially after rain. More frequent, lower-rate applications maintain a steadier feed without waste or scorch risk.",
        },
        {
          id: "gts-q8",
          question: "Annual meadow grass (Poa annua) is present throughout a customer's lawn. What is the most effective treatment?",
          options: [
            "Apply a selective herbicide — this will remove Poa annua without harming the surrounding grass",
            "Apply a total herbicide and re-seed the entire lawn",
            "Cultural management only — dense overseeding and avoiding scalping; no selective herbicide is available",
            "Apply iron sulphate — this will suppress Poa annua effectively",
          ],
          correct: 2,
          explanation: "There is no selective herbicide that controls Poa annua without damaging surrounding grass. Cultural control — competitive overseeding and maintaining mowing height — is the only realistic approach.",
        },
      ],
    },
  },
  {
    id: "safety-basics",
    title: "Technician Health & Safety",
    description: "Site safety, PPE, manual handling and safe behaviour expected from technicians in the field.",
    icon: "ShieldCheck",
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
          "Technicians must start each day with the right kit and the right checks.\n\n**Required PPE (by task):**\n- Safety boots: always when on customer property\n- Nitrile gloves: when handling any chemical product (standard rubber gloves are not adequate)\n- Eye protection / face shield: when mixing chemicals\n- Waterproofs: over chemical-resistant overalls where specified on the label\n- Wellies: when applying liquid iron — it stains boots and dries out skin\n- Respirator: when the product label specifies\n\n**Iron staining — specific caution:**\nDrips and footprints on pale surfaces WILL stain permanently. Walk carefully between a wet treated lawn and hard surfaces. Dry your wellies before stepping onto pale surfaces. Never mix product on customer hard surfaces — always inside the van or on the main road.\n\nBefore leaving base each morning: confirm equipment condition, vehicle walk-around complete, PPE in the van and ready.",
      },
      {
        id: "s2",
        title: "Manual Handling and Dynamic Risk Assessment",
        duration: "10 min",
        content:
          "Field work includes repeated lifting, uneven ground and changing conditions. Every property visit requires a brief dynamic risk assessment before you start work.\n\n**Manual handling:**\n1. Assess the load before lifting\n2. Use proper lifting posture — straight back, bend the knees\n3. Keep the load close to your body\n4. Ask for help with anything over 25kg\n\n**Dynamic risk assessment — ask yourself:**\n- Are there any slip, trip or fall hazards (wet grass, uneven paths, steps)?\n- Is access clear and safe?\n- Is the ground stable enough for machinery?\n- Are there children, pets or vulnerable individuals present?\n\nStop work if a hazard makes the task unsafe. Do not work around it — address it or escalate to the office.",
      },
      {
        id: "s3",
        title: "Incident Reporting",
        duration: "10 min",
        content:
          "If something goes wrong or nearly goes wrong, report it the same day. Do not quietly work around a safety problem.\n\n**Road Traffic Collision (RTC) procedure:**\n1. Switch off engine, turn on hazard warning lights\n2. Ensure you and others are okay\n3. Call 999 if someone is in danger, seriously injured, a serious offence has been committed, or the road is obstructed\n4. Exchange details with anyone involved (name, address, vehicle registration)\n5. Check the van\n6. Draw a sketch of the incident\n7. Take photos of all damage\n8. Ensure dashcam recorded — secure the footage\n9. Call Harry (Operations Manager) — explain what happened, what you have done, what is happening next\n\n**Accidents and near misses** must go in the accident book — it's a legal requirement. Always carry a head torch and high-vis vest.",
      },
    ],
  },
  {
    id: "doorstep-conduct",
    title: "Doorstep Conduct for Technicians",
    description: "How to arrive, communicate and behave on customer property from first contact to departure.",
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
          "The customer often judges service quality before work even begins. A clean, organised, professional arrival sets the tone for the whole visit.\n\n**On arrival:**\n- Park considerately — don't block driveways or cause obstruction\n- Present a clean, tidy appearance\n- Approach the property calmly — ring the bell or knock if the customer is visible\n- Use any agreed access process (gate code, side entrance, etc.)\n\n**The story structure (Paul Scorey's framework):**\nIf a customer is present, take the time to run through your visit story:\n- **Start:** what I came to do\n- **Middle:** what I did\n- **End:** what I found, what I'm recommending and why\n\nA smile goes a long way. Eye contact builds trust. Ask questions — understand what the customer wants to achieve with their lawn.",
      },
      {
        id: "dc2",
        title: "Speaking with Customers on the Job",
        duration: "9 min",
        content:
          "Technicians are the face of Shrekfeet. What you say on a doorstep has commercial and relational consequences.\n\n**Do:**\n- Explain what service you're carrying out\n- Mention any access needs or short-term restrictions (keep off treated areas, watering advice)\n- Recommend additional services using the FAB framework — walk the customer around the lawn if possible\n- Ask for reviews if the visit has gone well and the customer is happy\n\n**Do not:**\n- Discuss pricing or commitments outside your authority\n- Promise dates or specific outcomes that haven't been confirmed in SA5\n- Make negative comments about the business, colleagues or other customers\n\n**Raising estimates:**\nIf you identify a service the customer could benefit from (scarification, aeration, overseeding, moss treatment), raise an estimate manually in SA5 using the correct status code. Do not rely on condition codes to auto-generate estimates — they won't.",
      },
      {
        id: "dc3",
        title: "Leaving the Property Well",
        duration: "8 min",
        content:
          "A strong finish is part of good service. Before leaving, confirm everything is in order.\n\n**Before you leave:**\n- Close all gates that were closed on arrival\n- Remove all debris from the property (aeration cores, scarification arisings — unless agreed otherwise)\n- Check hard surfaces for product drips or footprints\n- Ensure equipment is packed away safely and the van is closed\n- Log your visit notes and condition codes in SA5 before moving to the next job\n\n**Photos:**\nTake before and after photos on every visit where a visible treatment or renovation has been completed. This protects both the customer and the business if there is ever a query about work completed. A customer who claims aeration wasn't done — without photos — is a problem. A customer who claims aeration wasn't done when you have timestamped before/after shots — is not.",
      },
    ],
  },

  // ─── STAGE 3: PRODUCTS & TREATMENT ─────────────────────────────────────────
  {
    id: "fertilisers-ppps",
    title: "Fertilisers, PPPs & Weed Identification",
    description: "Fertiliser types, NPK, micronutrients, herbicides, fungicides, insecticides and UK regulations. Tech-only module.",
    icon: "Sprout",
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
          "Fertilisers provide the nutrients grass needs to grow, recover and maintain colour. Understanding the different release types and what each nutrient does is essential before you start handling products.\n\n**Release types:**\n\n**Quick release (soluble nitrogen)**\nDissolves immediately on contact with moisture. Fast green-up visible within 3–5 days. Short longevity (2–4 weeks). Risk of scorch if over-applied in dry or hot conditions. Used when rapid colour response is needed.\n\n**Slow release (coated granule)**\nNutrient encapsulated in a coating that breaks down over time. Releases over 6–12 weeks depending on the coating. Less scorch risk. Used in spring and summer programmes where steady feeding is wanted.\n\n**Controlled release (polymer-coated, temperature-activated)**\nReleases in response to soil temperature. In cold soil, little release; as soil warms, release ramps up. Longevity typically 3–5 months. Most expensive but most consistent. The Calci-Complex Sport product (14-2-5+Ca+Mg) is an example — applied at 25–40g/m² depending on grass type and soil.\n\n**NPK — the three macronutrients:**\n\n**N — Nitrogen**\nDrives leaf growth, green colour and photosynthesis. The most visible nutrient response. High nitrogen = rapid growth = darker green. Autumn programmes use lower nitrogen to avoid promoting soft growth before winter.\n\n**P — Phosphorus**\nRoot development and stress resistance. Critical at establishment (seeding). Less visible effect in established lawns but important for drought tolerance.\n\n**K — Potassium**\nCell wall strength, water retention, hardiness. Improves the plant's ability to tolerate drought, cold and disease. Autumn feeds are typically high-K for this reason.\n\n**Micronutrients in our products:**\n- Iron (Fe): mobilises oxygen, improves chlorophyll production. Also blackens moss — so iron-containing products have a dual function\n- Magnesium (Mg): green colouring of leaves, chlorophyll synthesis\n- Manganese (Mn): plant growth, nitrogen utilisation\n- Boron (B): cell wall formation, movement of sugars\n- Copper (Cu): photosynthesis and respiration\n- Zinc (Zn): growth regulation\n- Molybdenum (Mo): converts nitrate for amino acid utilisation\n\n**Our ANM product (Autumn Nutrition Mix):**\n2-0-6 + 6Fe + trace elements (Mg, B, Cu, Mn, Mo, Zn)\nThe low nitrogen content (2) avoids promoting soft growth before winter. High potassium (6) builds cell wall strength for frost tolerance. Iron (6Fe) inhibits moss.\n\n**Calci-Complex Sport:**\n14-2-5 + Ca + Mg, applied at 25–40g/m². Application rate varies by grass type and soil — use the spreader settings guidance provided.",
      },
      {
        id: "fp2",
        title: "Plant Protection Products — Herbicides, Fungicides, Insecticides",
        duration: "18 min",
        content:
          "Plant Protection Products (PPPs) are regulated substances. In the UK, anyone born after 31 December 1964 must hold a valid PA1 + PA6 certification to apply them professionally. Using PPPs without certification on customer property is an offence.\n\n**Herbicides (weed control):**\n\n*Selective vs non-selective:*\n- Selective: kills certain plants (broadleaf weeds) while leaving grass unharmed. The vast majority of our weed treatments use selective herbicides.\n- Non-selective (total): kills all green plant material. Glyphosate is the most common example — used only for complete lawn renovation, never on an active lawn.\n\n*Systemic vs contact:*\n- Systemic: absorbed into the plant and translocated through the vascular system — kills roots as well as leaves. Slower visible result (1–3 weeks) but kills the whole plant. Essential for perennials (dandelion, plantain, clover).\n- Contact: kills only the tissue it directly touches. Fast visible burn but weeds often regrow from the root. Limited use in professional lawn treatment.\n\n**Fungicides:**\n- Preventative: applied before disease develops, typically as a barrier. Best used where a lawn is at high risk (red fescue-dominated, known history of Red Thread).\n- Curative: applied after disease is identified. Stops progression and helps recovery. Products like Rejuvenate contain nutrients and micronutrients to assist recovery alongside the fungicidal action.\n- Liquid iron: acts to dry out fungal spores. A component of many curative approaches for Red Thread and Rust — not a fungicide in the traditional sense but effective.\n\n**Insecticides:**\n- Contact: kills insects on direct contact. Fast-acting but shorter residual.\n- Systemic: absorbed by the plant and ingested by insects feeding on it. Slower but longer-lasting.\n- Acelepryn: our primary grub treatment. 95% success rate against Leatherjackets, 70% against Chafer Grubs. Requires minimum 3 years' sequential treatment for best results.\n- Nematodes: biological control for grubs. Applied to moist soil; larvae infect and kill the grubs. Used to 'close the gap' alongside Acelepryn.\n\n**Calibration reminder:**\nEvery time you change a nozzle, fix your sprayer, or change application conditions — calibrate your sprayer. Accurate application is as important as turning up to the customer's property.",
      },
      {
        id: "fp3",
        title: "Weed Identification and What Weeds Tell You",
        duration: "14 min",
        content:
          "Being able to name a weed on sight is a core technician skill. But the real professional value is understanding what a weed's presence tells you about the soil and lawn condition — and using that to recommend the right solution.\n\n**Common UK lawn weeds and their soil indicators:**\n\n**Dandelion:** deep tap root, jagged leaves, yellow flower. Thrives in compacted, under-fertilised soil. Systemic selective herbicide; hand-pulling only effective if the entire root comes out.\n\n**White clover:** trefoil leaves, white flower, nitrogen-fixing. Thrives wherever grass is under-fed. Indicator: low nitrogen. Treatment must include feeding the lawn — without it, clover returns immediately.\n\n**Plantain (greater & ribwort):** flat ribbed leaves, very tough rosette. Indicator: compacted soil. Selective herbicide works well; recommend aeration to address the cause.\n\n**Creeping buttercup:** glossy lobed leaves, runners, yellow flower. Indicator: wet, compacted, poorly drained soil. Selective herbicide knocks it back; aeration and drainage improvement prevents return.\n\n**Yarrow:** feathery leaves, drought-tolerant, deep-rooted. Indicator: poor, dry, under-fed soil. Hard to control — often needs 2–3 treatments plus a combination product. Overseeding to crowd it out is essential.\n\n**Speedwell:** tiny blue flowers, mat-forming. Notoriously resistant to many herbicides. Requires a fluroxypyr-containing combination product. Raise mowing height and thicken sward culturally.\n\n**Annual meadow grass (Poa annua):** pale, seeds even when mown very short. No truly selective control available. Cultural management only — avoid scalping, competitive overseeding.\n\n**Moss:** not a true weed but treated as one. Indicator of: shade, wet/poor drainage, low fertility, acidic pH, scalping (mowing too short), or compaction. Iron sulphate blackens it for raking; scarification removes the dead material; **overseeding always follows.** Addressing the underlying cause is what prevents return.\n\n**The professional rule:** for every weed, identify the cause and make a recommendation to address it — not just the chemical treatment. 'Kill the plant + fix the conditions' is the full job.",
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
            "There is no functional difference — both achieve the same result",
          ],
          correct: 1,
          explanation: "Systemic herbicides are absorbed and translocated through the plant, killing roots as well as leaves. Contact herbicides only kill the tissue they directly touch — weeds often regrow from the root.",
        },
        {
          id: "fp-q3",
          question: "A customer's lawn has lots of white clover. What does this indicate and what should you recommend?",
          options: [
            "Acidic soil — recommend lime application",
            "Low nitrogen — treat clover with herbicide AND restore the lawn's nitrogen programme",
            "Waterlogged soil — recommend aeration only",
            "Alkaline soil — recommend pH-adjusting products",
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
          explanation: "PA1 (the theory underpinning) and PA6 (handheld applicators — knapsack and handheld sprayers) are the required certifications for professional lawn treatment work.",
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
          "Shrekfeet offers two core treatment plans plus a range of additional services. Understanding the service codes is essential — they appear in SA5 on every customer account.\n\n**Professional Lawn Treatment Plan (LTP):**\nOur full programme — 8 visits per year.\n- WIT — Winter Lawn Tonic\n- WIM — Winter Moss Control\n- SPN — Spring Nutrition\n- SPW — Spring Weed Control\n- SUN — Summer Nutrition\n- SUW — Summer Weed Control\n- ANM — Autumn Nutrition Mix\n- AUW — Autumn Weed Control\n\n**Essential Lawn Treatment Plan (ETP):**\nOur entry-level programme — 3 visits per year.\n- WMC — Winter Moss Control\n- SPF — Spring Nutrition (feed)\n- SPC — Spring Weed Control\n\n**Wetting Agent Plan (WAP):**\n- WAE — Wetting Agent Drench (Early)\n- WAL — Wetting Agent Drench (Late)\n\nGranular wetting agent: applied at 20g/m² in spring. Helps water penetrate hydrophobic soils — particularly important on sandy and thatchy lawns.\n\n**Additional services (charged separately):**\n- AAA — Annual Autumn Aeration\n- Scarification, Overseeding (OVS), Top-Dressing (TD)\n- One-time moss control (OTM)\n- Grub X, Acelepryn, Nematodes\n- Hard Surface Treatments (HST)\n- Rejuvenate (fungicide/micronutrient product)\n- Wetting agents (one-time)\n\n**BIB/BUB (Bag it and Bin / Bag it and Bag):**\nScarification waste disposal. Before completing the job, go into the BIB/BUB service in SA5, modify the weighting to the number of waste bags, update the pricing, and send a call log to Joseph with the number of bags.",
      },
      {
        id: "tp2",
        title: "The Seasonal Timeline",
        duration: "12 min",
        content:
          "Our treatment calendar runs year-round. Knowing what's happening in each season helps you have better conversations with customers and understand why jobs are scheduled the way they are.\n\n**Autumn (end of October → Christmas break):**\nPrimary renovation season. ANM + AUW delivered to LTP customers. Scarification, aeration and overseeding campaigns run here. Leaves on lawns protocol in effect — assess whether leaves impact treatment effectiveness, check for 'No paid for leaf blowing' flag.\n\n**Winter (January–February):**\nWIT and WIM delivered. Lower activity — weather-dependent. Stock checks and equipment preparation. This is when the quarterly training sessions typically happen.\n\n**Spring (March–May):**\nSPN and SPW delivered. Key rule: if a customer has accepted overseeding (OVS), switch SPN to SPW — you cannot apply weed control until 42–56 days after seeding (grass must be established first). Weed control applied before establishment will damage seedlings.\n\n**Summer (June–August):**\nSUN and SUW. Wetting agents (WAL). Watch for drought stress — de-watered lawns should not receive herbicide treatments (poor uptake, risk of scorch). Summer is also prime time for disease pressure (Leaf Spot in hot humid spells).\n\n**Autumn renovation review:**\nAt the end of each autumn renovation season, all overseeding customers who didn't receive an OTM (one-time moss treatment) represent a potential add-on. After scarification, recommend an OTM — the lawn is clear and the moss has nowhere to hide.\n\n**Christmas break target (2025):**\nTechnicians aim to finish on Friday 19 December; return on Monday 5 January. Any remaining accrued hours paid at regular day rate in December salary.",
      },
      {
        id: "tp3",
        title: "Autumn Treatments in Detail",
        duration: "11 min",
        content:
          "Autumn is our most important treatment period. The services we deliver in autumn set the lawn up for the following year.\n\n**ANM (Autumn Nutrition Mix) product:**\n2-0-6 + 6Fe + trace elements (Mg, B, Cu, Mn, Mo, Zn)\n\nWhat each component does:\n- Nitrogen (2): minimal — avoids promoting soft growth before winter\n- Potassium (6): cell wall development, water retention, frost tolerance\n- Iron (6Fe): chlorophyll production, moss inhibition\n- Trace elements: support plant health through the dormant season\n\n**Autumn Weed Control:**\nUse up remaining weed control products in the Chem Store. Remember to order Enstar for winter. When with customers, remember to discuss how their lawn is likely to look next year and recommend services accordingly — this is key for retention and advance sales of renovation services.\n\n**Leaves on lawns (protocol):**\n1. Determine whether the number of leaves will impact treatment effectiveness\n2. Check the customer's account for the 'No paid leaf blowing' flag\n3. If the flag exists: do not blow leaves, treat as normal\n4. If no flag and you have time: blow leaves, add 'Leaf Blowing' service to their account and produce the service\n5. If no flag and you don't have time: mark the job as non-serviceable\n\n**Ensuring all autumn leaf customers have the 'Autumn Leaf Issues' flag:**\nAny customer who experiences autumn leaf problems should have this flag on their account — it helps the office spot recurring issues and plan accordingly.",
      },
    ],
    quiz: {
      passMark: 80,
      questions: [
        {
          id: "tp-q1",
          question: "What does 'LTP' stand for and how many treatment visits does it include per year?",
          options: [
            "Lawn Treatment Package — 6 visits",
            "Professional Lawn Treatment Plan — 8 visits",
            "Long-Term Programme — 4 visits",
            "Lawn Treatment Protocol — 12 visits",
          ],
          correct: 1,
          explanation: "LTP is the Professional Lawn Treatment Plan, covering 8 visits per year: WIT, WIM, SPN, SPW, SUN, SUW, ANM and AUW.",
        },
        {
          id: "tp-q2",
          question: "A customer on LTP accepts an overseeding (OVS) job. What happens to their SPN?",
          options: [
            "SPN is cancelled — no spring treatment needed",
            "SPN is delivered first, then OVS is added",
            "SPN is swapped to SPW (weed control) — weed control must wait 42–56 days post-seeding",
            "SPN is duplicated so the customer receives both nutrition and weed control",
          ],
          correct: 2,
          explanation: "When OVS is accepted, SPN becomes SPW. Weed control cannot be applied until 42–56 days after seeding — the grass must be established first or the seedlings will be damaged.",
        },
        {
          id: "tp-q3",
          question: "A customer's lawn has significant leaf coverage when you arrive for an autumn treatment. There is no 'No paid leaf blowing' flag on the account and you don't have time to clear them. What do you do?",
          options: [
            "Treat through the leaves — they won't make much difference",
            "Mark the job as non-serviceable and continue with your day",
            "Clear the leaves for free and treat — customer satisfaction comes first",
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
          "Before any application or mechanical work, check equipment properly.\n\n1. Inspect tanks, hoses and nozzles — look for cracks, blockages or wear\n2. Confirm calibration and output settings — recalibrate every time you change a nozzle or fix the sprayer\n3. Check fuel, battery and general mechanical condition for power equipment\n4. Verify labels and materials match the day plan\n5. Confirm PPE is correct for the products being used\n\nDo not use equipment that is leaking, damaged or unverified. If something sounds or feels wrong mid-job, stop, turn the machine off, and diagnose before continuing.",
      },
      {
        id: "e2",
        title: "Calibration and Application Accuracy",
        duration: "15 min",
        content:
          "Treatment accuracy protects results, compliance and customer trust. You must calibrate every time you change a nozzle, fix your sprayer, or change application conditions.\n\n**Knapsack calibration procedure:**\n1. Measure a 10m × 1m strip\n2. Time how long it takes to walk the strip at your normal spraying pace\n3. Spray clean water into a measuring jug for the same time at the same pressure\n4. Multiply up to find litres per 100m² — compare against the label rate\n5. Adjust nozzle, pressure or pace until output matches the label\n\n**Granular application:**\nSpread calibration should be verified before each job — especially if you've changed the hopper or spreader settings. Apply a test run over a measured area and weigh the output.\n\n**Under-applying** wastes the visit and may not deliver the desired result. **Over-applying** can scorch the lawn, breach label rules, and is illegal under PPP regulations.",
      },
      {
        id: "e3",
        title: "Post-Treatment Equipment Care and Stock",
        duration: "13 min",
        content:
          "After work is complete, equipment must be cleaned, stored and logged.\n\n**End-of-day equipment care:**\n- Rinse sprayer tanks and hoses with clean water (triple-rinse where required by product label)\n- Store chemical products securely in the designated Chem Store — never in unsecured locations\n- Report any faults or wear that needs addressing before the next day\n- Refill fertiliser and chemical stocks as needed before leaving\n\n**Van stock management:**\n- Every time you take stock from the unit, fill in the stock form: forms.monday.com (link in your onboarding pack)\n- Every Monday morning: complete the van stock count form (wkf.ms/3VYQHDE)\n- These forms are part of your P&P deliverables (record keeping)\n- Eventually, calibrations will also be formally recorded — start building the habit now\n\n**Fuel card:**\nYour fuel card is issued in your name. Use only at your designated Esso garage. Personal use of the fuel card is gross misconduct.",
      },
    ],
  },

  // ─── STAGE 4: FIELD OPERATIONS / ADVANCED ──────────────────────────────────
  {
    id: "operational-standards",
    title: "Operational Standards & Field Scenarios",
    description: "The day-to-day processes, protocols and decision-making expected from every Shrekfeet employee in the field.",
    icon: "ClipboardList",
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
          "The single most consistent message across all Shrekfeet training: proactive communication prevents almost every operational problem.\n\n**The rule:** always cover what the other person will ask before they need to ask it.\n\n**In practice — for technicians:**\n- If you're going to be late: call before you're late, not after\n- If a job has taken longer than expected: call the office before the affected customers call in\n- If you've found an issue at a property: message the WhatsApp group or Harry/Joseph directly while on site — don't wait until debrief\n- If you can't complete all visits: review your schedule after lunch, not at end of day\n\n**In practice — for office staff:**\n- If a reschedule affects other appointments: notify the customer before they expect the visit\n- If a complaint is logged: chase for resolution, don't wait for the customer to call back\n- If a technician flags a problem on a lawn: update the account before the customer calls with a question\n\n**Why it matters:**\nCustomers leave when they feel out of the loop. A proactive call from us — even with bad news — is infinitely better than a frustrated customer who had to chase us for information.",
      },
      {
        id: "os2",
        title: "Managing Non-Serviceable Jobs",
        duration: "12 min",
        content:
          "A non-serviceable job is any visit you cannot complete as scheduled. Handling these correctly protects the customer relationship and gives the office what they need to reschedule effectively.\n\n**When you think you won't make all your visits:**\n1. After lunch, review your schedule — not at the end of the day\n2. Identify customers you are unlikely to reach\n3. Check each customer's account for a 'Promised' tag — these are priority\n4. If uncertain about priorities, call the office — we'll tell you who to prioritise\n5. One exception: if you have two jobs (one LSV, one 'Promised'), prioritise the 'Promised'\n6. Call affected customers as soon as possible:\n   - If no answer: Voicemail → Text → Ask the office to email\n7. Raise a 'Call Log' for Joseph that includes:\n   - Reasoning why (never say 'too much work scheduled' — say 'previous jobs took longer than expected')\n   - What you've done (calls made, voicemail left, etc.)\n   - Any dates or customer requirements from your call\n8. Mark the job as non-serviceable in SA5\n\n**Same process applies towards end of day** — do this as early as possible, not at 5pm.",
      },
      {
        id: "os3",
        title: "Common Field Scenarios",
        duration: "15 min",
        content:
          "These scenarios come up regularly. Know the process before you face them on a customer's property.\n\n**Partial treatment (e.g. locked rear gate):**\n1. Mark the job as complete\n2. In technician notes, write which lawn was treated and state you will return for the other\n3. Send a call log to the office stating which lawns were partially treated and which still need treating\n4. The office creates a service call for a return visit and treats it as a lockout under T&Cs\n\n**Equipment failure:**\n1. Turn the machine off and diagnose the issue\n2. Attempt to repair in a safe place if possible\n3. If completely non-functional: call the office — explain what happened, the lawn progress, what you've tried, and how this affects your day\n4. Office will check if alternative equipment can be arranged\n5. If not possible: apologise to the customer, mark as incomplete — 'Equipment failure', call any other affected customers\n\n**Equipment making unusual noises:**\nTurn it off. Diagnose. If it still sounds unsafe after repair attempts — stop using it immediately. Same process as above.\n\n**Leaves on lawns:**\nSee the Treatment Programmes module — follow the three-step protocol (assess, check flag, blow or mark non-serviceable).\n\n**Raise a flag — unknown lawn condition:**\n1. Arrive → inspect lawn → identify issue you cannot diagnose\n2. Take photos\n3. Dig a hole to inspect the soil profile\n4. Message the WhatsApp group or Harry/Joseph directly while on site\n5. If still unsure: raise a flag condition code in SA5 and be honest with the customer ('We've identified an issue, we're investigating and will be in touch')\n6. Summarise findings and actions in job notes, mark as complete",
      },
      {
        id: "os4",
        title: "Terms & Conditions and Customer Protocols",
        duration: "10 min",
        content:
          "Knowing our T&Cs protects you, the customer and the business. These are the key points every employee should know.\n\n**Lockouts:**\n- First lockout: customer receives a written warning\n- Repeated lockouts: standard charge applies (50% of the service price)\n\n**Dog faeces:**\n- More than 3 faeces per 100m²: we reserve the right to cancel the treatment and apply standard charge\n\n**Fallen leaves:**\n- If significant leaf coverage and technician doesn't have time to clear: standard charge applies\n\n**Furniture and toys on the lawn:**\n- We treat around them and charge 100%\n- If items restrict access to the lawn: standard charge\n\n**Cancellation of scheduled work:**\n- Must be done outside a 3-day window from the service date\n- Failure to cancel in time: standard charge applies\n\n**Cancellation of services (within 12 months):**\n- We charge the sum of remaining payments due, or £100, whichever is lowest\n\n**Standard charge = 50% of the service price**\n\nWhen services are activated on a customer's account, this commences the agreement of our Terms & Conditions. The customer does not need to sign a separate document — account activation is acceptance.",
      },
      {
        id: "os5",
        title: "Estimates, Condition Codes and Stock",
        duration: "8 min",
        content:
          "Two operational disciplines every technician must get right: estimate management and stock recording.\n\n**Estimate status codes:**\n- Status 0 — No Status: DO NOT USE\n- Status 1 — Estimated Printed: the office has already discussed the service with the customer. The estimate exists to inform you that the customer has been briefed.\n- Status 2 — Gave Estimate: sends automated follow-up emails confirming the price. Use when you have NOT had a verbal conversation with the customer.\n- Status 3 — Gave Estimate (Call Customer): same as Status 2, but flags the office to call the customer because you've already had a verbal conversation about it.\n\n**Important:** estimate services must be raised manually. Condition codes no longer auto-generate estimates — this was changed because it created inaccurate pipeline data.\n\n**Top-Rated Lawn condition code:**\nFlag any lawn that looks exceptional. The office uses these to request reviews, referrals and social media content. If we gain a review from a flagged lawn, the technician receives a share of the review bonus.\n\n**Van stock:**\n- Take stock from the unit? Fill in the form immediately.\n- Every Monday morning: complete the van stock count (wkf.ms/3VYQHDE).\n- These are P&P deliverables — they count toward your performance assessment.",
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
            "Mark the job as complete without notes — the office will figure it out",
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
            "Do not use — reserved for the office",
            "The office has printed an estimate; use this to inform yourself that the customer has been briefed",
            "You have had a verbal conversation with the customer — office needs to call to follow up",
            "The customer has rejected the estimate",
          ],
          correct: 2,
          explanation: "Status 3 (Gave Estimate — Call Customer) works the same as Status 2 (sends follow-up emails) but also flags the office to make a follow-up call because you've had a verbal conversation with the customer about the service.",
        },
        {
          id: "os-q5",
          question: "When should you fill in the van stock form?",
          options: [
            "Once per week, on Monday mornings",
            "Every time you take stock from the unit AND every Monday morning for the weekly van stock count",
            "Only when you've used an entire product — not for partial use",
            "At the end of each month for the monthly review",
          ],
          correct: 1,
          explanation: "Two triggers: (1) every time you take stock from the unit — fill the form immediately; and (2) every Monday morning — complete the full van stock count.",
        },
      ],
    },
  },
  {
    id: "weed-treatment",
    title: "Weed Treatment & Spraying Basics",
    description: "The practical service knowledge technicians need for treating weeds safely, effectively and consistently.",
    icon: "Sprout",
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
          "Not every weed problem should be treated immediately. Consider timing, growth stage, weather and lawn condition.\n\n**Weather window for liquid herbicides:**\n- Temperature ideally 10–20°C; below 8°C uptake is poor, above 25°C risks scorch\n- No rain forecast for 6 hours (some products need 12–24 hours — check the label)\n- Low wind (under ~10 mph) to prevent drift\n- Dry leaves at application\n\n**Avoid treating:**\n- Drought-stressed lawns (weeds not actively growing; risk of scorch)\n- Newly seeded areas (wait 42–56 days after seeding)\n- Frozen or frost-covered ground\n\n**Best seasons:** spring (April–June) and early autumn (September) are prime windows.",
      },
      {
        id: "wt2",
        title: "Targeting Weeds and Recording Results",
        duration: "12 min",
        content:
          "Accurate weed control starts with accurate ID. Before applying anything, name what you're treating.\n\n**Common scenarios:**\n- Patchy infestation: spot spray is more appropriate than broadcast\n- Whole-lawn broadleaf pressure: knapsack with selective herbicide\n- Resistant weeds (speedwell, yarrow): combination product required, expect 2–3 treatments\n- Clover: treat AND feed — without nitrogen, clover returns\n\n**After treatment:**\nRecord what was applied, weather conditions, lawn response expected (yellowing within 1–3 weeks for systemic), and whether a revisit may be needed. Set realistic customer expectations — systemic herbicides take 1–3 weeks to show visible kill.",
      },
      {
        id: "wt3",
        title: "Spray Drift Awareness",
        duration: "11 min",
        content:
          "Spray drift is a serious compliance and liability issue. Any non-target contamination — neighbouring flower beds, vegetable gardens, ponds, ornamental plants — is a problem.\n\n**Preventing drift:**\n- Always check wind speed before spraying — over ~10 mph, postpone\n- Use low-drift nozzles on windy days\n- Keep the nozzle close to the target surface\n- Never spray near watercourses, drains or ornamental planting without appropriate precautions\n- Calibrate every time conditions change\n\n**If drift occurs:**\n- Log it in SA5 immediately\n- Inform the office the same day\n- Do not attempt to manage a neighbour complaint yourself — escalate immediately",
      },
    ],
  },
  {
    id: "pa1-pa6",
    title: "PA1 & PA6 Awareness",
    description: "Certification, compliance and safe working expectations around pesticide application work.",
    icon: "ShieldCheck",
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
          "PA1 and PA6 are the two core pesticide certifications for UK lawn technicians. Both are required before you can apply professional plant protection products unsupervised.\n\n**PA1 — Foundation Pesticide Application (theory)**\nCovers the legal framework, risk assessment, environmental protection, product labelling and safe use principles. Underpins all other PA modules.\n\n**PA6 — Handheld Applicators (practical)**\nCovers the safe use of knapsack sprayers and handheld trigger sprayers — the equipment you'll use on domestic lawns every day.\n\n**Legal position:**\nAnyone born after 31 December 1964 must hold valid PA certification to apply professional plant protection products. Spraying without it on a customer's property is an offence under the Plant Protection Products (Sustainable Use) Regulations.\n\nShrekfeet books and pays for these. We expect you to prepare and take them seriously.",
      },
      {
        id: "pa2",
        title: "Working Within Competence",
        duration: "10 min",
        content:
          "No technician should carry out work they are not trained, authorised or equipped to do.\n\n**Principles:**\n- Know the limits of your certification — PA6 covers handheld equipment, not vehicle-mounted booms (that's PA2)\n- Ask before stepping beyond your training\n- Do not improvise with chemicals or equipment\n- Follow supervisor direction and company process\n\n**BASIS Lawn Assured:**\nBASIS is the industry body for responsible pesticide use. Shrekfeet operates to BASIS standards. This demonstrates to customers that we know what we're doing and do it safely — it's a differentiator when talking to customers on lawn surveys.",
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
          "The first ten seconds of a call set the tone for everything that follows.\n\n**Answer within 3 rings where possible** — customers notice when calls go unanswered.\n\n**Opening the call:**\n- Clear greeting + company name + your name\n- Calm, ready-to-help tone — never sound like the customer is interrupting you\n- Smile while speaking — it genuinely affects how your voice sounds\n\n**Use the customer's name** as soon as you've found their account in SA5. It changes the dynamic of the conversation immediately.\n\n**Listen fully before jumping to a solution.** Customers want to feel heard before they want to be fixed. Acknowledge the concern first, then move to the resolution.\n\n**Common call types:**\n- Treatment questions ('Is it safe to let my dog out?', 'Why has my lawn gone yellow?')\n- Booking changes and reschedules\n- Complaints and callbacks\n- Payment queries\n- New customer enquiries",
      },
      {
        id: "oc2",
        title: "Guiding and Closing the Conversation",
        duration: "11 min",
        content:
          "A good call handler leads the conversation without sounding scripted. Your goal is accurate information gathered efficiently, with the customer feeling looked after.\n\n**Gathering information:**\n- Name and address (locate the account in SA5 early — it gives you context for everything they say)\n- The reason for the call\n- Any urgency or deadline\n- Preferred next step\n\n**Handling complaints:**\n- Log in SA5 immediately, even if unresolved\n- Acknowledge, apologise where appropriate, action\n- Escalate to Operations Manager if you can't resolve on the call\n- Never promise a specific technician or exact arrival time unless confirmed in SA5\n\n**Closing every call:**\nAlways confirm what happens next before hanging up.\n'I'll reschedule that for next Tuesday and you'll receive a text confirmation.' is infinitely better than 'we'll sort that out for you.'\n\nVague closings create callbacks. Specific closings build confidence.",
      },
      {
        id: "oc3",
        title: "Transfers, Hold and Escalation",
        duration: "12 min",
        content:
          "If you need to place someone on hold or transfer them, do it with confidence and clear communication.\n\n**Before putting on hold:**\n- Explain why\n- Give a realistic wait time\n- Return as promised — if it's taking longer, check back in\n\n**Transferring:**\n- Pass all relevant context to the receiving person before the customer speaks to them\n- The customer should never have to repeat their story from scratch\n\n**Escalation to Harry (Operations Manager):**\n- Complaints you cannot resolve\n- Safeguarding concerns\n- Property damage claims\n- Any HR-related customer contact\n\n**Escalation to Ian (MD):**\n- Serious service failures\n- Legal or regulatory queries\n- Media or public complaints",
      },
    ],
  },
  {
    id: "service-assistant",
    title: "Service Assistant & Key Office Systems",
    description: "The key office systems used to track customer information, log visits and coordinate scheduling.",
    icon: "FileText",
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
          "Service Assistant 5 (SA5), built on the RealGreen platform, is the single source of truth for all job management at Shrekfeet. Everything lives here: customer accounts, job history, visit notes, condition codes, flags, estimates and call logs.\n\n**Core tasks in SA5:**\n- Review customer history before and after calls\n- Add clear visit and call notes\n- Raise and update estimates (Status 1/2/3)\n- Log call logs for technician actions\n- Set and check account flags ('Promised', 'No paid leaf blowing', etc.)\n- Update service statuses (complete, non-serviceable, incomplete)\n\n**The rule:** if it happened and it's not in SA5, it didn't happen as far as the business is concerned. Every customer interaction — call, visit, complaint, recommendation — must be logged.",
      },
      {
        id: "sa2",
        title: "Scheduling and Route Management",
        duration: "15 min",
        content:
          "The office team (led by Joseph) owns scheduling. Understanding how routes and job timing work helps you handle customer queries and rescheduling calls correctly.\n\n**Key scheduling principles:**\n- Leigh/Joseph reviews workload at lunchtime — technicians with excess load are identified early\n- 'Promised' tag: flags a customer who has been rescheduled and promised a visit — these are priority\n- LSV (Lawn Survey Visit): if you have both an LSV and a 'Promised' job, prioritise Promised\n- Rescheduled visits are flagged in SA5 so technicians know which lawns need treating on their return\n\n**Supporting technicians:**\nWhen a technician raises a call log, the office uses it to delay instalments, identify suitable reschedule slots and mark the rescheduled visit as 'Promised'.",
      },
      {
        id: "sa3",
        title: "Other Systems: Email, VoIP and Finance",
        duration: "10 min",
        content:
          "Beyond SA5, the office team uses several other systems day-to-day.\n\n**Email:**\nCustomer correspondence goes through the shared office inbox. All significant correspondence should be logged or summarised in SA5 so there's a single customer record.\n\n**VoIP telephone system:**\nWe use a hosted VoIP system. Learn how to handle call queues, transfers and voicemail — ask during your first week for a walk-through of the specific system in use.\n\n**Finance/invoicing:**\nPayment queries, direct debit mandates, invoice generation. Training will be provided — ask Harry or Ian to arrange this in your first month.\n\n**This intranet:**\nHow-to guides, seasonal calendar, supplier directory, policies and condition code references. It's designed to be your day-to-day reference — bookmark it.",
      },
    ],
  },

  // ─── STAGE 5: LAWN KNOWLEDGE ────────────────────────────────────────────────
  {
    id: "lawn-diseases",
    title: "Lawn Diseases",
    description: "How to identify, understand and recommend treatment for the most common UK lawn diseases — from Red Thread to Fusarium Patch.",
    icon: "AlertTriangle",
    category: "Role-Specific",
    estimatedTime: "50 min",
    roles: ["technician"],
    stage: "lawn-knowledge",
    lessons: [
      {
        id: "ld1",
        title: "Red Thread and Fairy Rings",
        duration: "17 min",
        content:
          "**Red Thread (Laetisaria fuciformis)**\n\nScientific name: Laetisaria fuciformis\nPlants affected: all turf grasses; red fescues are most susceptible\nMain symptoms: brown patches with distinctive red, thread-like fungal growth\nTiming: year-round, but more common in early spring and autumn\n\nBiology:\n- Lives in the soil for up to 2 years\n- Spreads via airborne or waterborne spores, and on contaminated tools or shoes\n- Requires prolonged leaf wetness to establish infection (wet summer, heavy autumn dews)\n\nKey facts:\n- Rarely kills the grass completely — affected patches will recover with appropriate action\n- Red fescue varieties are most likely affected, but it can attack any grass\n\nPrevention:\n- Preventive fungicide to reduce risk\n- Aeration and scarification to improve airflow through the sward\n- Soil conditioners to boost the plant's defence system\n\nCurative treatment:\n- Nitrogen (to help grass recover and outcompete the fungus)\n- Micronutrients (to ensure macro access)\n- Liquid iron (to dry out spores)\n- Rejuvenate (our curative product)\n\n---\n\n**Fairy Rings (Marasmius oreades and other fungi)**\n\nScientific name: Marasmius oreades and related fungi\nMain symptoms: circular or arced rings of dead/lush grass, often with toadstools\nTiming: year-round, more common in late summer and autumn\n\nBiology:\n- Airborne spores from toadstools form colonies below ground in the rootzone\n- Mycelium spreads outwards (dying in the centre), growing by approximately 30cm per year\n- The fungus is water-repellent — creates hydrophobic soil in the ring\n\nKey facts:\n- The fungus itself is harmless to grass plants — the problem is the water-repellent soil it creates and the toadstools\n- The rings are permanent and expand each year without intervention\n\nPrevention and curative:\n- Annual aeration and wetting agents — the most effective management approach",
      },
      {
        id: "ld2",
        title: "Rust, Leaf Spot and Fusarium Patch",
        duration: "18 min",
        content:
          "**Rust (Puccinia species and others)**\n\nMain symptoms: patches of grass turn yellow; orange/rust-coloured pustules on leaf surfaces\nTiming: all year round, but more common in late summer and autumn\n\nBiology:\n- Airborne spores require several hours of damp, wet conditions to germinate\n- Large numbers of spore-producing pustules break through leaf surfaces\n- Spores can transfer and stain footwear, skin and clothes\n\nKey facts:\n- Rust does not usually kill the grass, but severely affected leaves can brown and shrivel\n\nPrevention:\n- Regular feeding (well-fed grass is less susceptible)\n- Avoid high-nitrogen fertilisers in autumn — the resultant soft growth is more prone to attack\n- Mow regularly and remove clippings to reduce affected leaves\n- Improve air circulation by pruning overhanging trees/shrubs\n\nCurative: liquid iron to dry out spores\n\n---\n\n**Leaf Spot (Bipolaris, Curvularia and Drechslera species)**\n\nMain symptoms: minor infections — lesions on leaves; severe infections — thin sward, dieback and patches of very weak grass\nTiming: during summer, when temperatures are high; humid conditions trigger outbreaks\n\nPrevention:\n- Regular thatch removal\n- Improve airflow through the sward\n- Raise mowing height and wash blades regularly\n- Preventive fungicide\n\nCurative: nitrogen + micronutrients + Rejuvenate\n\n---\n\n**Fusarium Patch / Snow Mould (Microdochium nivale)**\n\nMain symptoms: first noticed as small patches of yellow, dying grass that turn brown and expand up to 30cm in diameter, often merging. In wet conditions, white or pinkish cottony growth appears around the perimeter.\nTiming: between late autumn and spring\n\nBiology: spreads rapidly in cold, wet, still conditions — hence the nickname 'Snow Mould' (common after heavy snowfall)\n\nKey facts:\n- First appears as small tennis ball-sized yellow patches that can grow to dinner plate size\n- Can be dangerously devastating to lawns if left unmanaged\n- More common in golf courses but occurs in domestic lawns — do not ignore it\n\nPrevention:\n- Raise mowing height where possible\n- Remove excess thatch regularly\n- Aerate compacted lawns\n- Improve airflow through the lawn\n- Preventive fungicide\n\nCurative: nitrogen + micronutrients + liquid iron + Rejuvenate",
      },
      {
        id: "ld3",
        title: "Other UK Lawn Diseases",
        duration: "15 min",
        content:
          "**Anthracnose**\nMost common in bent grass and Poa annua. Causes both foliar blight and basal stem rot. Grass appears bronze/orange. Most common in summer. Causes: poor airflow, excess thatch, shade, foot traffic, drought.\nControl: improve soil conditions, preventive fungicide.\n\n**Dollar Spot**\nCauses small silver dollar-sized patches of brown/yellow grass. Mostly found in closely mown grasses — golf courses are most affected, but can occur in domestic lawns.\nCauses: poor airflow, excess thatch, shade, foot traffic, drought.\nControl: regular thatch removal, regular aeration, correct watering regime, fungicide.\n\n**Necrotic Ring Spot**\nDifficult to diagnose due to similarities with other patch diseases and pest problems. Can kill grass. Look for light-green patches, straw-coloured rings and root rot — it is primarily a root disease.\nCauses: poorly aerated soil, irregular irrigation.\nControl: regular aeration, correct watering regime.\n\n**Powdery Mildew**\nWhite powdery substance appears on the upper surface of leaves, increasing in density. Really severe outbreaks turn lawns a dull white.\nCauses: damp, shaded conditions.\nControl: improve airflow, prune overhanging trees/shrubs to let more light through.\n⚠️ DO NOT treat with fungicides or fertilisers — this can make the problem significantly worse.\n\n**Slime Mould**\nCompletely harmless. Varies greatly in size, colour and form. Creates fragile, spore-producing structures that disintegrate when touched. Appears overnight and may disappear the next day.\nCauses: lack of nutrition in the soil.\nControl: none required.\n\n**Take All Patch**\nSoil-dwelling fungus, very damaging to bent grasses. Causes serious root rot — roots blacken and decay. Creates patches/rings of browning grass.\nCauses: high-alkaline water, excessive thatch, poor drainage, lack of manganese.\nControl: avoid increasing pH, regular aeration/scarification.",
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
          explanation: "The fairy ring fungus is not directly toxic to grass — the problem is that it creates water-repellent (hydrophobic) soil, preventing water and nutrient penetration.",
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
          explanation: "Powdery Mildew must NOT be treated with fungicides or fertilisers — this makes the condition significantly worse. Improving airflow and reducing shade are the correct approaches.",
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
    category: "Shared Knowledge",
    estimatedTime: "35 min",
    roles: ["office"],
    stage: "lawn-knowledge",
    isShared: false,
    lessons: [
      {
        id: "l1",
        title: "Treatment Services — What They Are and What to Say",
        duration: "12 min",
        content:
          "When customers call about their treatments, they often ask what a product does or why their lawn looks a certain way. You don't need to be a botanist — but you do need to know the key talking points.\n\n**After a liquid iron treatment:**\nThe lawn may briefly look darker or have yellow-green discolouration. Iron improves chlorophyll production and is also used to control moss. If moss is present, it will blacken after treatment — this is normal and expected. The moss should then be raked out (by scarification).\n\n**After weed control:**\nWeeds die over 1–3 weeks — they don't disappear overnight. Some initial wilting and yellowing of weeds is expected. The grass itself may temporarily look slightly tired but should recover with the next mowing cycle.\n\n**After scarification:**\nThe lawn will look significantly worse before it looks better. Scarification removes dead material and opens up the sward — for 2–4 weeks, the lawn can look thin and patchy. This is completely normal. Overseeding follows to fill the gaps.\n\n**After aeration:**\nSmall plugs of soil will be on the surface of the lawn. These are topdressed or left to break down naturally. They are not damage — they're evidence the work was done.",
      },
      {
        id: "l2",
        title: "Seasonal Customer Call Patterns",
        duration: "12 min",
        content:
          "Customer enquiries follow predictable seasonal patterns. Knowing what's coming helps you prepare better answers.\n\n**Spring (March–May):**\n- 'Why hasn't my technician been yet?' — spring treatments follow the programme schedule\n- 'Why is there still moss?' — winter moss control will be raked out during spring or a scarification may be needed\n- 'When will my new seed germinate?' — typically 7–14 days in good spring conditions; establishment takes 4–6 weeks\n\n**Summer (June–August):**\n- 'My lawn has gone yellow/brown — is it dead?' — almost certainly drought stress, not dead; explain rehydration timelines\n- 'Why aren't you treating my lawn?' — some customers skip summer treatments on ETP; check their plan\n\n**Autumn (September–November):**\n- 'When are you doing the aeration/scarification?' — these are renovation season jobs, typically Sep–Nov\n- 'The technician left the lawn in a terrible state!' — post-scarification appearance is temporarily very rough\n\n**Winter:**\n- 'Why haven't you visited since November?' — winter tonic/moss is typically Jan–Feb; check their programme",
      },
      {
        id: "l3",
        title: "Common Customer Lawn Problems and How to Respond",
        duration: "11 min",
        content:
          "Customers often call with a described problem rather than a service request. Your job is to gather enough information to log the issue accurately and set the right next step.\n\n**'My lawn has brown patches':**\nCould be: drought stress, disease (Red Thread, Fusarium), grub damage, leatherjacket damage, or chemical scorch. Ask: when did it appear? Is it spreading? What's been done recently? Has it been dry? Log it, raise a callback flag for a technician, or schedule a survey.\n\n**'There's something red/pink in the grass':**\nAlmost certainly Red Thread. Not immediately dangerous to the lawn — the grass will recover. Flag for the technician on the next visit to recommend Rejuvenate.\n\n**'My grass is going yellow':**\nPossible causes: low nitrogen (hungry lawn), drought stress, waterlogging, or iron/manganese lockout in high pH soil. Log the description, note the season, flag for technician assessment.\n\n**'Mushrooms have appeared in the lawn':**\nFairy Rings or general soil fungi — both usually harmless. Reassure the customer, log it, flag for technician to inspect on next visit.",
      },
    ],
  },
  {
    id: "weed-control-mastery",
    title: "Weed Control: Fundamentals to Mastery",
    description:
      "A complete grounding in how weed control actually works — biology, identification, control methods, herbicide families, application craft and integrated decision-making.",
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
          "A weed is simply a plant growing where it is not wanted. There is nothing biologically special about a 'weed' — a wildflower in a meadow can become a weed on a customer's lawn.\n\n**Three things make a plant a problem in turf:**\n1. It out-competes the grass for light, water or nutrients\n2. It looks visually disruptive (yellow flowers, broad leaves, bare patches around it)\n3. It spreads quickly if left alone\n\nUnderstanding 'why this is a weed here' is the start of every good treatment decision.",
      },
      {
        id: "wc2",
        title: "How Weeds Live and Spread",
        duration: "12 min",
        content:
          "Weeds are grouped by their life cycle:\n\n**Annuals** — germinate, flower, seed and die in a single year (e.g. annual meadow grass, chickweed). Best controlled before they set seed.\n\n**Biennials** — grow leaves in year one, flower and seed in year two. Hit them in year one while they're still a rosette.\n\n**Perennials** — live for many years and regrow from roots, runners or rhizomes (e.g. dandelion, plantain, clover). These are the bulk of lawn weeds and the hardest to kill.\n\n**How they spread:**\n- Seed — wind, mowers, shoes, birds, soil disturbance\n- Stolons (above-ground runners) — clover, creeping buttercup\n- Rhizomes (underground stems) — couch grass, yarrow\n- Tap roots — dandelion, dock — break the root and you get two plants\n\n**The seed bank rule:** every soil contains thousands of dormant weed seeds per square metre. You are never 'clearing' the seed bank — you are managing what germinates.",
      },
      {
        id: "wc3",
        title: "Identifying the Common UK Lawn Weeds",
        duration: "15 min",
        content:
          "**Broadleaf perennials (most common):**\n- Dandelion — deep tap root, jagged leaves, yellow flower, parachute seeds\n- Daisy — small rosettes, white-petal flower, spreads by runners\n- Plantain (greater & ribwort) — flat ribbed leaves, very tough\n- White clover — three-leaf trefoil, white flower, nitrogen-fixing\n- Creeping buttercup — glossy lobed leaves, runners, loves wet compacted ground\n- Self-heal — low purple flower spikes, mat-forming\n- Yarrow — feathery leaves, drought-tolerant, hard to kill\n- Speedwell — tiny blue flowers, mat-forming, notoriously herbicide-resistant\n- Mouse-ear chickweed — hairy small leaves, low rosettes\n\n**Grass weeds:**\n- Annual meadow grass (Poa annua) — pale, seeds at very low height, almost universal\n- Yorkshire fog — soft, hairy, grey-green tufts\n- Couch grass — coarse blades, aggressive rhizomes\n\n**Moss** — not a weed in the herbicide sense, but treated as one. A symptom of shade, wet, low fertility, scalping or compaction.",
      },
      {
        id: "wc4",
        title: "Why Weeds Appear — Root Causes",
        duration: "10 min",
        content:
          "Spraying without fixing the cause means the same weeds return every season. Always ask: why is this lawn vulnerable?\n\n**Common underlying causes:**\n- Thin or sparse grass — bare soil invites weed seeds\n- Low fertility — clover and yarrow thrive where grass is starved\n- Compaction — plantain, buttercup, annual meadow grass love hard ground\n- Poor drainage — moss, buttercup, sedges\n- Scalping — weakens grass, lets low-growing weeds take over\n- Shade — moss and woodland weeds dominate\n- Recent disturbance — renovation brings buried seeds to the surface\n\n**The professional mindset:** weed control + lawn improvement always go together. Treatment kills what's there now; dense healthy grass is what stops the next wave.",
      },
      {
        id: "wc5",
        title: "Integrated Weed Management",
        duration: "12 min",
        content:
          "Integrated Weed Management (IWM) combines several methods so you rely less on any single one — especially chemicals.\n\n**The four pillars:**\n1. Cultural control — mowing height, feeding, watering, overseeding, aeration, scarification\n2. Mechanical / physical control — hand-pulling, hoeing, removing seed heads\n3. Biological control — encouraging grass to out-compete weeds\n4. Chemical control — selective herbicides when other methods aren't enough\n\nA technician who reaches for the sprayer first is not yet a professional. A technician who diagnoses, plans cultural fixes, and uses chemicals as one tool among several — that is professional weed control.",
      },
      {
        id: "wc6",
        title: "Cultural Control — The Most Powerful Tool",
        duration: "12 min",
        content:
          "Cultural control means changing how the lawn is managed so the grass wins on its own.\n\n**Mowing height** — most UK lawns should be cut at 25–40mm. Cutting shorter scalps the grass, lets light reach weed seeds, and favours low creeping weeds.\n\n**Feeding** — a balanced fertiliser programme thickens the sward. Clover and yarrow noticeably retreat once nitrogen is restored.\n\n**Aeration** — relieves compaction so grass roots can breathe; weeds that thrive on compaction lose their advantage.\n\n**Overseeding** — fills gaps before weeds can. Always pair renovation work with overseeding.\n\n**Scarification** — removes thatch and moss; must be followed by overseeding or you simply create germination beds for weeds.\n\n**The cultural control rule:** every weed treatment job should be paired with at least one cultural recommendation.",
      },
      {
        id: "wc7",
        title: "Mechanical and Manual Control",
        duration: "10 min",
        content:
          "For small infestations or chemical-sensitive sites, physical removal is often the right call.\n\n**Hand-pulling / weeding knife:**\nBest for tap-rooted weeds (dandelion, dock, plantain) when soil is moist. Must remove the whole root — broken tap roots regenerate. Refill the hole and overseed.\n\n**De-heading:**\nCrucial for annuals — remove seed heads before they ripen. Mowing before flowering achieves the same result.\n\n**When mechanical is the right choice:**\n- Customer prefers chemical-free\n- Near ponds, edible plants or ornamental beds\n- Very small infestations where spraying would be excessive\n\n**Limitations:** ineffective on mat-formers and rhizomatous weeds; useless on heavy infestations.",
      },
      {
        id: "wc8",
        title: "Chemical Control — How Herbicides Work",
        duration: "15 min",
        content:
          "**By selectivity:**\n- Selective — kills certain plants while leaving others. The bulk of lawn herbicides.\n- Non-selective (total) — kills everything green. Only for full renovation, never on an active lawn.\n\n**By movement:**\n- Systemic — absorbed and translocated through the plant, killing roots as well as leaves. Slower (1–3 weeks) but kills the whole weed. Essential for perennials.\n- Contact — kills only tissue it touches. Fast visible result but weeds regrow from root.\n\n**By timing:**\n- Pre-emergent — applied before weed seeds germinate; forms a soil barrier\n- Post-emergent — applied to growing weeds (the vast majority of lawn weed control)\n\n**Common UK active ingredients:** 2,4-D, MCPA, dicamba, mecoprop-P, fluroxypyr, clopyralid, florasulam — almost always sold as combination products.\n\n**The combination rule:** mixed actives cover a wider spectrum and reduce resistance pressure.",
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
          "**Dandelion** — systemic selective herbicide in spring/early autumn while in active leaf. Spot spray usually enough.\n\n**White clover** — fluroxypyr or florasulam-containing products. Feed the lawn simultaneously — without nitrogen, clover comes straight back.\n\n**Speedwell** — notoriously resistant; repeat treatments, combination product with fluroxypyr. Cultural improvement (raise mowing height) essential.\n\n**Yarrow** — often needs 2–3 treatments plus aggressive overseeding to crowd it out.\n\n**Creeping buttercup** — selective herbicide + aeration and drainage improvement to prevent return.\n\n**Plantain** — easy kill with most selective broadleaf products. Aerate to address compaction.\n\n**Annual meadow grass (Poa annua)** — no truly selective control in amenity lawns. Cultural management only.\n\n**Moss** — iron sulphate blackens it; scarify to remove; always overseed after; fix the underlying cause.\n\n**The pattern:** kill the plant + fix the conditions. Doing only one is half the job.",
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
            "It translocates through the entire plant, killing the root — contact herbicides only kill the tissue they touch",
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
            "Restore the lawn's nitrogen programme — clover thrives where grass is under-fed",
            "Increase mowing frequency significantly",
          ],
          correct: 2,
          explanation: "Clover fixes its own nitrogen and thrives in under-fed lawns. Without restoring nitrogen, clover will return immediately after treatment.",
        },
        {
          id: "wc-q3",
          question: "What is the minimum rain-free window typically required after applying a liquid selective herbicide?",
          options: ["30 minutes", "2 hours", "6 hours (check the label — some need 12–24 hours)", "48 hours"],
          correct: 2,
          explanation: "Most liquid herbicides require at least 6 hours rain-free for the product to be absorbed. Always check the specific product label — some require up to 24 hours.",
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
  },
];
