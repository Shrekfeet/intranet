export type LawnIdCategory =
  | "Grass Type"
  | "Pest"
  | "Disease"
  | "Weed"
  | "Cultural Practice"
  | "Stress / Abiotic"
  | "Treatment";

export interface LawnIdEntry {
  id: string;
  name: string;
  category: LawnIdCategory;
  shortDescription: string;
  description: string;
  symptoms: string[];
  diagnosis: string[];
  treatment: string[];
  knockOnEffects: string[];
  related: string[]; // ids of related entries
  tags: string[];
  image?: string; // optional override; falls back to placeholder
  gallery?: { src: string; caption: string }[];
}

export const lawnIdEntries: LawnIdEntry[] = [
  // ---------------- Grass Types ----------------
  {
    id: "fescues",
    name: "Fescues",
    category: "Grass Type",
    shortDescription: "Fine-leaved, drought-tolerant grasses common in fine and ornamental lawns.",
    description:
      "Fescues are a group of fine-leaved cool-season grasses (Festuca spp.) prized for their drought tolerance, low fertility requirements and ability to thrive in poorer soils. They are a key component of fine ornamental lawns and traditional UK turf.",
    symptoms: [
      "Very fine, needle-like leaf blades",
      "Often deep green to blue-green",
      "Tufted or slowly creeping habit depending on species",
    ],
    diagnosis: [
      "Compare leaf width to a sheet of paper — fescues are noticeably thinner than ryegrass",
      "Look for a tightly bunched, upright tuft rather than broad blades",
      "Common in older, low-fertility lawns and shaded areas",
    ],
    treatment: [
      "Mow no shorter than 25 mm — scalping kills fescues quickly",
      "Avoid heavy nitrogen — feed lightly with a balanced spring/autumn fertiliser",
      "Overseed thin areas in early autumn for best establishment",
    ],
    knockOnEffects: [
      "Out-competed by ryegrass and Poa annua under heavy wear or high N",
      "Loss of fescue often correlates with increased thatch and moss return",
    ],
    related: ["bents", "overseeding", "moss"],
    tags: ["grass", "id", "fine-turf"],
  },
  {
    id: "bents",
    name: "Bents (Agrostis)",
    category: "Grass Type",
    shortDescription: "Fine, creeping grasses that form dense, low-cut sward — classic on greens.",
    description:
      "Bent grasses (Agrostis spp.) are fine-leaved, creeping cool-season grasses that tolerate very low mowing heights. Common on bowling greens and high-end lawns, often paired with fescues.",
    symptoms: [
      "Very fine leaves with a slightly shiny underside",
      "Spreads via stolons forming dense patches",
      "Tolerates mowing down to 5–10 mm",
    ],
    diagnosis: [
      "Look for stolons running across the soil surface",
      "Patches often appear as a slightly different green to the surrounding turf",
    ],
    treatment: [
      "Regulate growth with light, frequent mowing",
      "Manage thatch with annual scarification",
      "Avoid drought stress — bents are shallow-rooted",
    ],
    knockOnEffects: [
      "Heavy thatch build-up if left unmanaged",
      "Susceptible to fusarium patch in damp autumn conditions",
    ],
    related: ["fescues", "fusarium-patch", "scarification"],
    tags: ["grass", "id", "fine-turf"],
  },

  // ---------------- Pests ----------------
  {
    id: "leatherjackets",
    name: "Leatherjackets",
    category: "Pest",
    shortDescription: "Crane fly larvae that feed on grass roots, causing yellow patches and bird damage.",
    description:
      "Leatherjackets are the larvae of crane flies (daddy long-legs). They live in the top few centimetres of soil and feed on grass roots, weakening turf. Damage is often worst in late winter and spring.",
    symptoms: [
      "Irregular yellow or brown patches",
      "Turf lifts easily like a loose carpet",
      "Birds (especially crows, magpies, starlings) tearing up the lawn",
      "Holes pecked in soft ground",
    ],
    diagnosis: [
      "Cut a 30 cm square of turf and lift it — count grey-brown legless grubs in the soil",
      "More than 5–10 per square foot indicates a treatable population",
      "Soak an area overnight with a tarp — grubs come to the surface by morning",
    ],
    treatment: [
      "Apply biological nematodes (Steinernema feltiae) when soil is >12°C and moist",
      "Keep the area damp for 2 weeks after application",
      "Repair damaged turf via overseeding or returfing",
    ],
    knockOnEffects: [
      "Severe bird damage compounds the original injury",
      "Thinned turf invites moss and weed invasion",
    ],
    related: ["chafer-grubs", "yellowing", "overseeding"],
    tags: ["pest", "id", "lawn-damage"],
  },
  {
    id: "chafer-grubs",
    name: "Chafer Grubs",
    category: "Pest",
    shortDescription: "C-shaped white beetle larvae that destroy roots, causing turf to peel away.",
    description:
      "Chafer grubs are the larvae of chafer beetles. They feed voraciously on grass roots through summer and autumn, often causing severe damage that is exacerbated by foxes and badgers digging for them.",
    symptoms: [
      "Turf can be rolled back like a rug",
      "Spongy, weak feel underfoot",
      "Mammal damage — foxes/badgers tearing up large areas overnight",
      "Yellowing patches that don't recover with watering",
    ],
    diagnosis: [
      "Look for fat, white, C-shaped grubs with a brown head in the top 5 cm of soil",
      "Distinguish from leatherjackets (grey, legless, straight)",
    ],
    treatment: [
      "Apply Heterorhabditis bacteriophora nematodes in late summer when soil is warm and moist",
      "Repair via heavy overseeding and top-dressing",
      "Consider returfing for severe areas",
    ],
    knockOnEffects: [
      "Mammal digging often does more damage than the grubs themselves",
      "Bare areas colonised by weeds and moss the following season",
    ],
    related: ["leatherjackets", "overseeding", "top-dressing"],
    tags: ["pest", "id", "lawn-damage"],
  },

  // ---------------- Diseases ----------------
  {
    id: "red-thread",
    name: "Red Thread",
    category: "Disease",
    shortDescription: "Pink-red fungal threads on grass blades.",
    description:
      "Red thread (Laetisaria fuciformis) is a foliar fungal disease that thrives in mild, humid conditions on under-fed turf. It rarely kills the plant outright but is unsightly and indicates a nutrient deficiency.",
    symptoms: [
      "Pink or red gel-like threads on leaf tips",
      "Bleached patches 5–25 cm across",
      "Pinkish hue across the lawn from a distance",
    ],
    diagnosis: [
      "Inspect leaf blades closely for the pink stromata",
      "Check feeding history — symptoms usually appear when nitrogen is low",
    ],
    treatment: [
      "Apply a balanced nitrogen feed to push fresh growth",
      "Mow regularly to remove infected tips",
      "Improve airflow by reducing shade and clearing debris",
    ],
    knockOnEffects: [
      "Recurring red thread is a strong indicator that the feeding programme needs review",
      "Stressed turf is more vulnerable to follow-on diseases",
    ],
    related: ["rust", "fusarium-patch", "preventative-fungicides"],
    tags: ["disease", "id", "fungal"],
    image: new URL("../assets/lawn-id/red-thread-main.jpg", import.meta.url).href,
    gallery: [
      { src: new URL("../assets/lawn-id/red-thread-closeup.jpg", import.meta.url).href, caption: "Close-up: pink stromata on bleached blade tips" },
      { src: new URL("../assets/lawn-id/red-thread-distance.jpg", import.meta.url).href, caption: "From a distance: scattered pink-bleached patches across the sward" },
      { src: new URL("../assets/lawn-id/red-thread-field.jpg", import.meta.url).href, caption: "Often discrete: the symptoms are not always obvious from afar" },
    ],
  },
  {
    id: "rust",
    name: "Rust",
    category: "Disease",
    shortDescription: "Orange-brown spores on leaves that rub off on shoes and mower wheels.",
    description:
      "Rust diseases (Puccinia spp.) appear as orange-brown pustules on grass blades, typically in late summer and autumn on slow-growing or stressed turf.",
    symptoms: [
      "Orange/yellow dust on shoes after walking the lawn",
      "Yellowing and thinning of affected blades",
      "Patches more common in shade and on under-fed turf",
    ],
    diagnosis: [
      "Wipe a blade with a white tissue — rust leaves an orange smear",
      "Confirm by checking pustules on the leaf surface",
    ],
    treatment: [
      "Apply a light nitrogen feed to stimulate new growth",
      "Mow regularly and collect clippings",
      "Improve light and airflow",
    ],
    knockOnEffects: [
      "Weakens turf going into winter",
      "Often co-occurs with red thread in under-fed lawns",
    ],
    related: ["red-thread", "preventative-fungicides", "drought-stress"],
    tags: ["disease", "id", "fungal"],
  },
  {
    id: "anthracnose",
    name: "Anthracnose",
    category: "Disease",
    shortDescription: "Yellowing and basal rot, mainly on stressed Poa annua in summer.",
    description:
      "Anthracnose (Colletotrichum cereale) appears in two forms — foliar blight in hot weather and basal rot in cool wet weather. It primarily attacks weakened annual meadow grass (Poa annua).",
    symptoms: [
      "Yellow-bronze patches on Poa annua",
      "Black fruiting bodies (acervuli) visible with a hand lens",
      "Plants pull out easily with rotted bases",
    ],
    diagnosis: [
      "Confirm with a hand lens — the black spiny acervuli are diagnostic",
      "Common on stressed, low-fertility, tightly-mown turf",
    ],
    treatment: [
      "Reduce stress: raise mowing height, irrigate deeply, feed lightly but regularly",
      "Improve drainage and reduce thatch",
      "Curative fungicides may be needed in severe cases",
    ],
    knockOnEffects: [
      "Loss of Poa annua opens space for weeds",
      "Often appears alongside soil compaction and drought stress",
    ],
    related: ["fusarium-patch", "soil-compaction", "preventative-fungicides"],
    tags: ["disease", "id", "fungal"],
  },
  {
    id: "fusarium-patch",
    name: "Fusarium Patch",
    category: "Disease",
    shortDescription: "Slimy orange-brown rings, often the most damaging UK turf disease.",
    description:
      "Fusarium patch (Microdochium nivale) is the most damaging turf disease in the UK. It is most active in cool, damp conditions in autumn, winter and spring.",
    symptoms: [
      "Small orange-brown patches that enlarge to 30 cm rings",
      "White or pinkish mycelium in early morning dew",
      "Patches often have a darker outer edge",
    ],
    diagnosis: [
      "Best identified at dawn when mycelium is visible",
      "Risk highest after autumn nitrogen flushes or heavy dew",
    ],
    treatment: [
      "Remove dew daily by switching or brushing",
      "Avoid late-autumn high-nitrogen feeds — switch to autumn formulations",
      "Apply preventative fungicide programmes in high-risk windows",
    ],
    knockOnEffects: [
      "Severely thinned turf colonised by moss over winter",
      "Recurring outbreaks indicate cultural problems (drainage, feeding, thatch)",
    ],
    related: ["preventative-fungicides", "moss", "scarification"],
    tags: ["disease", "id", "fungal", "high-risk"],
  },

  // ---------------- Weeds / Other ----------------
  {
    id: "moss",
    name: "Moss",
    category: "Weed",
    shortDescription: "Cushioned green growth in damp, shaded, compacted or under-fed lawns.",
    description:
      "Moss isn't a single species but a symptom — turf that is too thin, too wet, too shaded, too short or too compacted to outcompete moss. Treating moss without fixing the cause guarantees it returns.",
    symptoms: [
      "Soft, cushioned green growth between grass plants",
      "Worse in shade and on north-facing slopes",
      "Often follows winter or scalping",
    ],
    diagnosis: [
      "Walk the lawn — note shaded, compacted or wet areas",
      "Check mowing height — scalping is a common cause",
      "Test for thatch >15 mm",
    ],
    treatment: [
      "Apply ferrous sulphate moss killer; wait until black, then scarify",
      "Aerate to reduce compaction and improve drainage",
      "Overseed bare areas immediately to prevent re-colonisation",
      "Raise mowing height and address shade where possible",
    ],
    knockOnEffects: [
      "Thatched, mossy lawns hold disease and pests",
      "Repeated moss treatment without aeration/overseeding wastes money",
    ],
    related: ["scarification", "aeration", "overseeding", "soil-compaction"],
    tags: ["weed", "id", "moisture"],
  },

  // ---------------- Stress / Abiotic ----------------
  {
    id: "drought-stress",
    name: "Drought Stress",
    category: "Stress / Abiotic",
    shortDescription: "Footprints stay visible and turf turns blue-grey then straw-coloured.",
    description:
      "Drought stress occurs when transpiration exceeds water uptake. Cool-season turf typically goes dormant rather than dying, but extended drought thins the sward.",
    symptoms: [
      "Footprints remain visible long after walking across",
      "Blue-grey cast across the lawn",
      "Leaves roll inwards to conserve water",
      "Eventually straw-coloured patches",
    ],
    diagnosis: [
      "Push a screwdriver into the soil — if it stops in the top 5 cm, soil moisture is critically low",
      "Check rainfall over the previous 14 days",
    ],
    treatment: [
      "Irrigate deeply (15–20 mm) and infrequently to encourage deep rooting",
      "Raise mowing height by 5–10 mm",
      "Apply wetting agent on hydrophobic soils",
    ],
    knockOnEffects: [
      "Drought-stressed turf is highly vulnerable to disease and weed invasion",
      "Often confused with chafer/leatherjacket damage — check roots before treating",
    ],
    related: ["soil-compaction", "rust", "abiotic-factors"],
    tags: ["abiotic", "id", "stress"],
  },
  {
    id: "soil-compaction",
    name: "Soil Compaction",
    category: "Stress / Abiotic",
    shortDescription: "Hard, poorly-draining soil that suffocates roots and encourages moss.",
    description:
      "Compaction occurs when soil pore space is reduced by foot or machinery traffic. Roots can't access oxygen or water, the lawn thins, and moss/weeds move in.",
    symptoms: [
      "Water pools on the surface after rain",
      "Hard to push a screwdriver into the soil",
      "Thin turf with shallow roots",
      "Moss colonisation",
    ],
    diagnosis: [
      "Screwdriver test — should push in 100 mm with light pressure",
      "Inspect a soil core for layered, dense bands",
    ],
    treatment: [
      "Hollow-tine aeration in autumn",
      "Top-dress with a sandy loam to improve structure",
      "Solid-tine aerate during the growing season for relief",
    ],
    knockOnEffects: [
      "Persistent moss return",
      "Increased disease pressure",
      "Drought stress in summer despite watering",
    ],
    related: ["aeration", "top-dressing", "moss", "drought-stress"],
    tags: ["abiotic", "id", "soil"],
  },
  {
    id: "abiotic-factors",
    name: "Abiotic Factors",
    category: "Stress / Abiotic",
    shortDescription: "Non-living causes of damage: chemicals, scalping, shade, salt, urine, heat.",
    description:
      "Abiotic factors are environmental or mechanical causes of turf damage that are not pests or diseases. They are commonly misdiagnosed as fungal disease.",
    symptoms: [
      "Sharp, geometric patterns (spills, tracks, spreader misses)",
      "Damage that doesn't spread over time",
      "No fungal signs (mycelium, pustules, threads)",
    ],
    diagnosis: [
      "Look for patterns matching equipment, paths or wildlife behaviour",
      "Question the customer about pets, recent treatments, or contractors",
    ],
    treatment: [
      "Identify and remove the cause",
      "Flush chemical spills with water",
      "Repair via overseeding or returfing",
    ],
    knockOnEffects: [
      "Misdiagnosis leads to wasted fungicide applications",
      "Recurring abiotic damage points to a process problem",
    ],
    related: ["drought-stress", "soil-compaction", "overseeding"],
    tags: ["abiotic", "id", "diagnosis"],
  },

  // ---------------- Cultural Practices / Treatments ----------------
  {
    id: "aeration",
    name: "Aeration",
    category: "Cultural Practice",
    shortDescription: "Removing or fracturing soil cores to relieve compaction and improve roots.",
    description:
      "Aeration relieves compaction, improves gas exchange, and increases water and nutrient infiltration. Hollow-tining removes cores; solid-tining fractures the soil without removing material.",
    symptoms: [],
    diagnosis: [
      "Screwdriver test difficult",
      "Persistent moss or surface ponding",
      "Thatch >15 mm",
    ],
    treatment: [
      "Hollow-tine in early autumn when soil is moist but not saturated",
      "Brush in a sandy top-dressing afterwards",
      "Avoid in drought or frozen conditions",
    ],
    knockOnEffects: [
      "Major reduction in moss return when paired with overseeding",
      "Improved drought tolerance the following summer",
    ],
    related: ["soil-compaction", "top-dressing", "scarification", "overseeding"],
    tags: ["treatment", "id", "renovation"],
  },
  {
    id: "scarification",
    name: "Scarification",
    category: "Cultural Practice",
    shortDescription: "Mechanical removal of thatch and dead moss to revive the sward.",
    description:
      "Scarification uses vertical blades to cut through and remove thatch — the layer of dead organic matter at the soil surface. Essential after moss treatment.",
    symptoms: [],
    diagnosis: [
      "Thatch layer >15 mm in a soil core",
      "Spongy feel underfoot",
      "Following any moss control treatment",
    ],
    treatment: [
      "Scarify in spring or early autumn when turf is actively growing",
      "Multiple light passes are better than one aggressive pass",
      "Always overseed and feed afterwards",
    ],
    knockOnEffects: [
      "Heavy initial appearance — set customer expectations",
      "Disease pressure drops dramatically with reduced thatch",
    ],
    related: ["moss", "overseeding", "aeration", "fusarium-patch"],
    tags: ["treatment", "id", "renovation"],
  },
  {
    id: "overseeding",
    name: "Overseeding",
    category: "Cultural Practice",
    shortDescription: "Introducing new seed into existing turf to thicken and improve quality.",
    description:
      "Overseeding restores density, improves disease resistance and updates the sward with modern cultivars. Best done in early autumn or late spring.",
    symptoms: [],
    diagnosis: [
      "Thinning lawn",
      "Following scarification or aeration",
      "After pest or disease damage",
    ],
    treatment: [
      "Use a high-quality cultivar mix appropriate to the site",
      "Ensure seed-to-soil contact via aeration or scarification",
      "Keep moist for 14–21 days after sowing",
      "Don't mow until seedlings are 60 mm tall, then reduce gradually",
    ],
    knockOnEffects: [
      "Repeated overseeding shifts the sward toward more desirable species",
      "Reduces weed and moss invasion long-term",
    ],
    related: ["scarification", "aeration", "top-dressing", "moss"],
    tags: ["treatment", "id", "renovation"],
  },
  {
    id: "top-dressing",
    name: "Top-dressing",
    category: "Cultural Practice",
    shortDescription: "Applying a thin layer of sand/loam to level, improve soil and protect seed.",
    description:
      "Top-dressing improves soil structure over time, smooths surface irregularities, and protects newly-applied seed. Most effective when paired with aeration and overseeding.",
    symptoms: [],
    diagnosis: [
      "Uneven surface",
      "Heavy clay or compacted soils",
      "After hollow-tine aeration or overseeding",
    ],
    treatment: [
      "Apply 2–4 mm of sandy loam evenly",
      "Brush/drag in until grass blades are visible",
      "Repeat annually for cumulative improvement",
    ],
    knockOnEffects: [
      "Improved drainage and root depth season-on-season",
      "Better seed germination and survival",
    ],
    related: ["aeration", "overseeding", "soil-compaction"],
    tags: ["treatment", "id", "renovation"],
  },
  {
    id: "preventative-fungicides",
    name: "Preventative Fungicides",
    category: "Treatment",
    shortDescription: "Scheduled fungicide programmes to prevent disease before it appears.",
    description:
      "Preventative fungicide programmes target high-risk windows (typically autumn for fusarium) before disease becomes visible. Far more effective than curative applications.",
    symptoms: [],
    diagnosis: [
      "History of recurring fusarium, anthracnose or red thread",
      "High-value lawns where any disease is unacceptable",
    ],
    treatment: [
      "Identify the target disease and its high-risk window",
      "Apply approved product at label rates with correct water volume",
      "Rotate active ingredients to avoid resistance",
      "Always pair with cultural improvements — fungicides alone are not a fix",
    ],
    knockOnEffects: [
      "Reduced disease pressure across the season",
      "Over-reliance without cultural work leads to resistance and repeat callouts",
    ],
    related: ["fusarium-patch", "red-thread", "rust", "anthracnose"],
    tags: ["treatment", "id", "chemical"],
  },
];

export const lawnIdCategories: LawnIdCategory[] = [
  "Grass Type",
  "Pest",
  "Disease",
  "Weed",
  "Stress / Abiotic",
  "Cultural Practice",
  "Treatment",
];

export function getLawnIdEntry(id: string) {
  return lawnIdEntries.find((e) => e.id === id);
}
