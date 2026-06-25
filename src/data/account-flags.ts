export type FlagCategory =
  | "Access"
  | "Property"
  | "Lawn Condition"
  | "Pets & Hazards"
  | "Customer History"
  | "Account Status"
  | "Service Notes"
  | "Billing & Payment"
  | "Marketing & Campaigns"
  | "Communication";

export type FlagTone =
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "pink"
  | "teal"
  | "highlight"
  | "neutral";

export interface AccountFlag {
  id: string;
  label: string;
  tone: FlagTone;
  /** True if the flag is shown with bold/emphasis in the customer system. */
  emphasis?: boolean;
  category: FlagCategory;
  shortMeaning: string;
  details?: string;
  whatToDo?: string[];
  examples?: string[];
}

export const flagCategories: readonly FlagCategory[] = [
  "Access",
  "Property",
  "Lawn Condition",
  "Pets & Hazards",
  "Customer History",
  "Account Status",
  "Service Notes",
  "Billing & Payment",
  "Marketing & Campaigns",
  "Communication",
] as const;

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Build the flag list. Where we have rich operational guidance we add details +
// what-to-do; otherwise we just include a short meaning so the glossary covers
// every flag from the customer system.
const make = (
  label: string,
  category: FlagCategory,
  tone: FlagTone,
  shortMeaning: string,
  extra?: { emphasis?: boolean; details?: string; whatToDo?: string[] },
): AccountFlag => ({
  id: slug(label),
  label,
  tone,
  category,
  shortMeaning,
  emphasis: extra?.emphasis,
  details: extra?.details,
  whatToDo: extra?.whatToDo,
});

export const accountFlags: AccountFlag[] = [
  // ────────────────────────────────────────────────────────────── Access
  make(
    "2+ Tech Renos",
    "Access",
    "blue",
    "Heavy machinery / renovation work requires two technicians to attend.",
    {
      emphasis: true,
      details:
        "Usually flagged due to access issues — narrow gates, steep gardens, long carries from the van, or awkward terrain that makes operating renovation kit alone unsafe or impractical.",
      whatToDo: [
        "When scheduling renovations (scarification, aeration, overseeding, top-dressing), always book two technicians.",
        "Check the visit notes for the specific access reason before assigning the second tech.",
        "Allow extra time on the route for the additional carry/setup.",
      ],
    },
  ),
  make("Access - Narrow Equipment", "Access", "yellow", "Only narrow equipment will fit through access points.", {
    emphasis: true,
    details: "Standard machinery won't fit. Plan kit selection (narrow scarifier, push-mower, knapsack) before the visit.",
  }),
  make("Access - Garage", "Access", "blue", "Access to the lawn is via the garage.", { emphasis: true }),
  make("Access - Ride-On", "Access", "blue", "Lawn is suitable for ride-on mower access."),
  make("Access - Hold a Key", "Access", "neutral", "We hold a key to the property — collect from the office before the visit.", {
    emphasis: true,
  }),
  make("Access - Electric Gate Code", "Access", "blue", "Property has an electric gate — code is on the account.", {
    emphasis: true,
    whatToDo: [
      "Pull the code from the account before leaving the depot.",
      "If the code doesn't work, call the customer before forcing access.",
    ],
  }),
  make("Access - Steep Steps", "Access", "blue", "Property has steep steps — careful carry of kit required.", {
    emphasis: true,
    whatToDo: [
      "Wear appropriate footwear and take loads in smaller trips.",
      "Consider whether two-tech attendance is needed for renovation visits.",
    ],
  }),
  make("Access - Through House", "Access", "yellow", "Lawn is only accessible by walking through the customer's house.", {
    emphasis: true,
    whatToDo: [
      "Customer must be home — confirm before travelling.",
      "Use boot covers / wipe equipment before passing through.",
      "Keep knapsacks empty until in the garden — never carry chemicals through the house.",
    ],
  }),

  // ────────────────────────────────────────────────────────────── Property
  make("Irrigation", "Property", "teal", "Property has an installed irrigation system in the lawn.", {
    details:
      "Critical safety and operational flag. Aeration, deep scarification or any spike/blade work risks puncturing irrigation pipes if you don't know the layout.",
    whatToDo: [
      "Ask the customer to show the irrigation layout before any spike or blade work.",
      "Avoid hollow-tine aeration unless the layout is confirmed.",
      "Note that irrigated lawns may show different stress and disease patterns vs. rain-fed lawns.",
    ],
  }),
  make("Hidden Cables", "Property", "red", "Lawn has hidden cables under the surface — no spike/blade work without checking.", {
    emphasis: true,
  }),
  make("Robotic Mower - Hidden Cables", "Property", "red", "Robotic mower boundary cables are buried in the lawn.", {
    emphasis: true,
    whatToDo: [
      "Do not aerate or scarify until cable locations are confirmed.",
      "Lift any visible cables before machinery work where possible.",
    ],
  }),
  make("New Build Property", "Property", "pink", "New build — soil is usually poor (compacted subsoil, builders' rubble).", {
    details:
      "New builds typically have shallow topsoil over compacted clay or rubble. Drainage is often poor, drought stress is common, and weed pressure from disturbed soil is high in year 1–2.",
    whatToDo: [
      "Set realistic expectations — recovery takes 1–2 seasons.",
      "Recommend aeration and top-dressing early in the relationship.",
      "Watch for drainage issues, moss in shaded compacted areas, and broadleaf weed germination.",
    ],
  }),
  make("Complex Lawn Layout", "Property", "blue", "Lawn has multiple sections / awkward shape — extra time needed."),
  make("Compost On-Site", "Property", "green", "Customer has a compost heap on-site."),
  make("Swimming Pool", "Property", "teal", "Property has a swimming pool — keep chemicals well away."),
  make("Tennis Court", "Property", "teal", "Property has a tennis court."),
  make("Home For Sale", "Property", "yellow", "Property is currently on the market — check ownership before each visit.", {
    emphasis: true,
  }),
  make("Water Course - Pond / Lake", "Property", "blue", "Pond, lake or ditch on property — strict spray buffer required.", {
    details:
      "Legal and environmental flag. Many pesticides are not permitted within set distances of water (typically 5m+, check label). Run-off into water courses is a serious offence.",
    whatToDo: [
      "Check product label for the no-spray buffer distance.",
      "Use spot treatment or hand-pulling within the buffer zone.",
      "Record buffer compliance on the spray record sheet.",
    ],
  }),
  make("Water Course - River", "Property", "blue", "River runs through or alongside the property — strict spray buffer required.", {
    whatToDo: [
      "Check product label for no-spray buffer distance.",
      "Use spot treatment or hand-pulling within the buffer zone.",
    ],
  }),

  // ────────────────────────────────────────────────────────────── Lawn Condition
  make("Soil - Loamy", "Lawn Condition", "blue", "Loamy soil — well balanced, generally easy to work with."),
  make("Soil - Sandy", "Lawn Condition", "blue", "Sandy soil — drains fast, dries out quickly, lower nutrient retention.", {
    whatToDo: [
      "Watch for drought stress in summer.",
      "More frequent, lower-rate feeding works better than infrequent heavy feeds.",
    ],
  }),
  make("Soil - Clay", "Lawn Condition", "blue", "Heavy clay — drainage, compaction and seasonal stress patterns differ.", {
    details:
      "Clay soils hold water in winter (waterlogging, moss, disease pressure) and crack/dry hard in summer (drought stress). Aeration is high-value on these lawns.",
    whatToDo: [
      "Recommend hollow-tine aeration and top-dressing with a sandy loam.",
      "Expect more moss in winter and more drought stress in summer.",
      "Avoid working the lawn when soil is saturated — compaction worsens fast.",
    ],
  }),
  make("Soil - Chalky", "Lawn Condition", "blue", "Chalky / alkaline soil — can lock out iron and trace nutrients."),
  make("Soil - Peaty", "Lawn Condition", "blue", "Peaty soil — high organic content, holds moisture, can be acidic."),
  make("Soil - Silty", "Lawn Condition", "blue", "Silty soil — fertile but compacts easily and holds water."),
  make("Grass - Fescue", "Lawn Condition", "green", "Predominantly fescue — adjust mowing height and treatment plan accordingly.", {
    details:
      "Fescues prefer drier conditions, lower nitrogen and a higher cut. Over-feeding or scalping fescue lawns causes thin patches and weed invasion.",
    whatToDo: [
      "Avoid heavy spring/summer nitrogen — use balanced or potassium-led feeds.",
      "Recommend a cut height of 25–40mm.",
      "Be cautious with iron and aggressive scarification.",
    ],
  }),
  make("Grass - Rye", "Lawn Condition", "green", "Predominantly perennial ryegrass — hard-wearing, responds well to feed."),
  make("Grass - Bent", "Lawn Condition", "green", "Predominantly bent grass — fine-leaved, prefers low cut and lower N."),
  make("Red Thread", "Lawn Condition", "red", "Lawn is prone to Red Thread disease — monitor and treat proactively.", {
    emphasis: true,
    details:
      "Red Thread is a fungal disease that thrives in humid conditions on under-fed lawns. Flagged accounts have a recurring history and need closer attention.",
    whatToDo: [
      "Inspect carefully on every visit, especially late spring through autumn.",
      "Ensure nitrogen feed is on schedule — under-fed turf is most susceptible.",
      "Recommend fungicide treatment if active outbreak is found.",
    ],
  }),
  make("Leather Jackets", "Lawn Condition", "yellow", "Lawn has a known history of leather jacket grub damage.", {
    emphasis: true,
    whatToDo: [
      "Inspect for damage in autumn/spring.",
      "Recommend nematode application at the right soil temperature window.",
    ],
  }),
  make("Chafer Grubs", "Lawn Condition", "yellow", "Lawn has a known history of chafer grub damage.", {
    whatToDo: [
      "Inspect for damage and bird/fox digging.",
      "Recommend nematode application at the right soil temperature window.",
    ],
  }),
  make("Autumn Leaf Issues", "Lawn Condition", "yellow", "Lawn is prone to heavy autumn leaf coverage — schedule autumn early.", {
    details:
      "Heavy leaf fall blocks light, traps moisture and causes turf decline. These customers must be visited before leaves accumulate, otherwise the autumn treatment can't be applied effectively.",
    whatToDo: [
      "Bring autumn round forward in the schedule for these accounts.",
      "Advise the customer (politely) that regular leaf clearing on their part helps the lawn recover.",
      "Note any disease pressure (Red Thread, Fusarium) caused by leaf coverage.",
    ],
  }),

  // ────────────────────────────────────────────────────────────── Pets & Hazards
  make("Pets - Dogs", "Pets & Hazards", "blue", "Dog(s) on property — confine before treatment and watch for urine damage.", {
    whatToDo: [
      "Ask the customer to keep dogs indoors during treatment and until product is dry/watered in.",
      "Pick up any deposits from the lawn before mowing or spraying.",
      "Check for typical urine-burn patterns before diagnosing disease.",
    ],
  }),
  make("Pets - Cats", "Pets & Hazards", "blue", "Cats on property — chemical safety re-entry applies."),
  make("Pets - Chickens", "Pets & Hazards", "blue", "Customer keeps chickens — check whether they free-range on the lawn.", {
    details:
      "Chemical safety and damage flag. Chickens may need to be confined during/after treatment, and their scratching causes localised lawn damage.",
    whatToDo: [
      "Ask the customer to confine chickens before treatment.",
      "Follow product label re-entry guidance.",
      "Don't misdiagnose chicken-scratched bare patches as disease or pest damage.",
    ],
  }),
  make("Pets - Tortoises", "Pets & Hazards", "blue", "Tortoise(s) graze on the lawn — chemical safety critical.", {
    whatToDo: [
      "Confirm tortoise is securely contained away from the lawn before any treatment.",
      "Allow product to dry/water in fully before re-entry.",
    ],
  }),
  make("Pets - Guinea Pigs", "Pets & Hazards", "blue", "Guinea pigs graze on the lawn — chemical safety critical.", {
    whatToDo: [
      "Confirm animals are securely contained off the lawn before any treatment.",
      "Allow product to dry/water in fully before re-entry.",
    ],
  }),

  // ────────────────────────────────────────────────────────────── Customer History
  make("New to Lawncare", "Customer History", "blue", "Never had professional lawn care before — extra explanation needed.", {
    whatToDo: [
      "Talk them through the treatment plan on the first visit.",
      "Leave clear written aftercare advice.",
      "Don't assume they know lawn care basics — explain mowing height, watering, etc.",
    ],
  }),
  make("Ex-Greensleeves", "Customer History", "blue", "Previously used Greensleeves for lawn care."),
  make("Ex-GreenThumb", "Customer History", "blue", "Previously used GreenThumb for lawn care."),
  make("Ex-Lawnrite", "Customer History", "blue", "Previously used Lawnrite for lawn care."),
  make("Ex-Lawntech", "Customer History", "blue", "Previously used Lawntech for lawn care."),
  make("Ex-LawnMaster", "Customer History", "blue", "Previously used LawnMaster for lawn care."),
  make("Ex-Luxury Lawns", "Customer History", "blue", "Previously used Luxury Lawns for lawn care."),
  make("Ex-Thames Valley Lawncare", "Customer History", "blue", "Previously used Thames Valley Lawncare."),
  make("DIY - Scarification", "Customer History", "blue", "Customer scarifies the lawn themselves.", {
    whatToDo: [
      "Don't quote/upsell scarification unless the customer raises it.",
      "Factor in customer's DIY work when diagnosing thin or damaged turf.",
    ],
  }),
  make("DIY - Aeration", "Customer History", "blue", "Customer aerates the lawn themselves."),
  make("DIY - Overseeding", "Customer History", "blue", "Customer overseeds the lawn themselves."),
  make("DIY - Top-Dressing", "Customer History", "blue", "Customer top-dresses the lawn themselves."),
  make("Undesirable Win-back Customer", "Customer History", "red", "Previous customer who should NOT be re-signed.", {
    emphasis: true,
    whatToDo: ["Do not re-sign without manager approval.", "Flag any incoming enquiries to the office manager."],
  }),
  make("Referred", "Customer History", "green", "Came to us via a customer referral — credit the referrer."),
  make("New Cust Since 1st Feb 24", "Customer History", "neutral", "Customer joined on or after 1 Feb 2024."),
  make("Joined 01/04/24 - 25/03/25", "Customer History", "neutral", "Customer joined between 1 Apr 2024 and 25 Mar 2025."),
  make("Status 0-3 Before 2025", "Customer History", "neutral", "Account was at status 0–3 before 2025."),

  // ────────────────────────────────────────────────────────────── Account Status
  make("KEY ACCOUNT", "Account Status", "highlight", "High-value or strategically important — prioritise scheduling and quality.", {
    emphasis: true,
    details:
      "Key accounts get priority on weather calls, rescheduling and complaint handling. They are the customers we cannot afford to lose.",
    whatToDo: [
      "Schedule visits within preferred windows where possible.",
      "Escalate any complaints or service issues immediately to the office manager.",
      "Always notify in advance of any delay or reschedule.",
    ],
  }),
  make("Sample Account to Test", "Account Status", "blue", "Internal test account — not a real customer.", {
    whatToDo: [
      "Skip if it appears in a route or call list.",
      "Flag to the office if a sample account accidentally enters a live workflow.",
    ],
  }),
  make("No Machine Work", "Account Status", "red", "Do not carry out any machine work on this lawn.", { emphasis: true }),
  make("No Auto Opt-In", "Account Status", "red", "Do NOT auto-opt this customer in to additional services.", { emphasis: true }),
  make("Hard of Hearing", "Account Status", "blue", "Customer is hard of hearing — speak clearly, consider written comms."),
  make("Email Submission Only", "Account Status", "blue", "Customer prefers all submissions/communications via email only."),
  make("Email Invoice", "Account Status", "blue", "Send invoices by email rather than post.", { emphasis: true }),
  make("Newsletter", "Account Status", "neutral", "Customer is opted in to receive the newsletter."),
  make("Signup Tool User", "Account Status", "neutral", "Customer signed up via the online sign-up tool."),
  make("New Owner - Send Letter", "Account Status", "red", "Property has changed hands — send the new-owner introduction letter.", {
    emphasis: true,
  }),

  // ────────────────────────────────────────────────────────────── Service Notes
  make("Pre-Approved Rejuvenate", "Service Notes", "green", "Customer has pre-approved a Rejuvenate package."),
  make("Mulch-mowing", "Service Notes", "green", "Customer mulch-mows — clippings stay on the lawn."),
  make("No Paid Leaf Blowing 24", "Service Notes", "yellow", "Customer declined paid leaf blowing in 2024."),
  make("No Paid Leaf Blowing 25", "Service Notes", "yellow", "Customer declined paid leaf blowing in 2025."),
  make("AAA Only Autumn 2025", "Service Notes", "neutral", "Autumn 2025: aeration only, no other extras."),
  make("AAA/OVS Upsell Aut 25", "Service Notes", "neutral", "Targeted for aeration + overseeding upsell, autumn 2025."),
  make("SCA Aut 25", "Service Notes", "neutral", "Booked in for scarification autumn 2025."),
  make("OVS Aut 25", "Service Notes", "neutral", "Booked in for overseeding autumn 2025."),
  make("OVS Completed September 25", "Service Notes", "green", "Overseeding completed in September 2025."),
  make("OVS Completed October 25", "Service Notes", "green", "Overseeding completed in October 2025."),
  make("No SCA Aut 25", "Service Notes", "yellow", "Customer declined scarification autumn 2025."),
  make("No WET w/ OVS Spring 24", "Service Notes", "neutral", "No wetting agent included with overseeding, spring 2024."),
  make("No WET w/ OVS Spring 25", "Service Notes", "neutral", "No wetting agent included with overseeding, spring 2025."),
  make("No WET w/ OVS Spring 26", "Service Notes", "neutral", "No wetting agent included with overseeding, spring 2026."),
  make("Free SCC 2026", "Service Notes", "green", "Customer is entitled to a free SCC visit in 2026."),

  // ────────────────────────────────────────────────────────────── Billing & Payment
  make("Pre-Pay", "Billing & Payment", "green", "Customer pays in advance — maintain prepay balance."),
  make("£ - Annually", "Billing & Payment", "neutral", "Annual billing terms."),
  make("£ - AP Instalment", "Billing & Payment", "neutral", "Annual plan paid in instalments."),
  make("£ - After Service", "Billing & Payment", "neutral", "Billed after each service."),
  make("£ - BACS Instalment", "Billing & Payment", "neutral", "BACS instalment payment plan."),
  make("£ - Ian approved no AP", "Billing & Payment", "yellow", "Ian has approved this account to skip annual plan billing.", {
    emphasis: true,
  }),
  make("Instalment Conversion 24", "Billing & Payment", "neutral", "Converted to instalment billing in 2024."),
  make("IK BACS Approved", "Billing & Payment", "neutral", "Ian has approved BACS payment for this account."),
  make("Pre 2023 Estimates", "Billing & Payment", "neutral", "Pricing is on pre-2023 estimates."),

  // ────────────────────────────────────────────────────────────── Marketing & Campaigns
  make("Marketing Import 22/02/2022", "Marketing & Campaigns", "neutral", "Imported via marketing campaign 22/02/2022."),
  make("DM Spring 23", "Marketing & Campaigns", "neutral", "Direct mail campaign — spring 2023."),
  make("DM Spring 24", "Marketing & Campaigns", "neutral", "Direct mail campaign — spring 2024."),
  make("ETP 2026", "Marketing & Campaigns", "neutral", "Enrolled in the 2026 ETP campaign."),
  make("Lawnrite BnW Cancelled Jan 23", "Marketing & Campaigns", "neutral", "Ex-Lawnrite black-and-white cancellation, Jan 2023."),
  make("TVL Marketing Import 06/03/25", "Marketing & Campaigns", "neutral", "Thames Valley Lawncare marketing import, 06/03/2025."),
  make("WS lead Feb24-Apr26", "Marketing & Campaigns", "neutral", "Web sign-up lead between Feb 2024 and Apr 2026."),

  // ────────────────────────────────────────────────────────────── Communication / Channel
  make("Initial Channel - Online", "Communication", "teal", "Originally enquired online."),
  make("Initial Channel - Email", "Communication", "teal", "Originally enquired by email."),
  make("Initial Channel - Telephone", "Communication", "teal", "Originally enquired by telephone."),
  make("Initial Channel - WhatsApp", "Communication", "teal", "Originally enquired via WhatsApp."),
  make("Initial Channel - Technician", "Communication", "teal", "Originally signed up by a technician on the doorstep."),
];

export const getAccountFlag = (id: string) => accountFlags.find((f) => f.id === id);
