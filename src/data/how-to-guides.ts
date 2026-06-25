/**
 * "How To" guides — searchable, step-by-step SOPs.
 *
 * Each guide is structured into sections so the detail page can render a clean,
 * visual layout (numbered steps, callouts, tables, key points) instead of a wall
 * of markdown. Add new guides by appending to `howToGuides`.
 */

export type HowToCategory =
  | "Operations"
  | "Customer Care"
  | "Finance"
  | "Health & Safety"
  | "Office Admin"
  | "Field Work";

export const howToCategories: HowToCategory[] = [
  "Operations",
  "Customer Care",
  "Finance",
  "Health & Safety",
  "Office Admin",
  "Field Work",
];

export type HowToBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "numbered"; items: string[] }
  | {
      kind: "callout";
      tone: "info" | "warning" | "success" | "rule";
      title?: string;
      text: string;
    }
  | {
      kind: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      kind: "keyvalue";
      items: { label: string; value: string }[];
    }
  | {
      kind: "stat";
      items: { label: string; value: string; sub?: string }[];
    }
  | {
      kind: "audience";
      label: "Technicians & Office" | "Customer-Facing";
    };

export type HowToStep = {
  /** Optional explicit number — defaults to the step's index (1-based) within its section. */
  number?: number;
  title: string;
  blocks: HowToBlock[];
  /** Short outcome / "what you should have now" line shown at the bottom of the step. */
  output?: string;
};

export type HowToSection =
  | {
      kind: "intro";
      id: string;
      title: string;
      blocks: HowToBlock[];
    }
  | {
      kind: "steps";
      id: string;
      title: string;
      /** Optional intro paragraph above the steps. */
      intro?: string;
      steps: HowToStep[];
    }
  | {
      kind: "notes";
      id: string;
      title: string;
      blocks: HowToBlock[];
    };

export type HowToGuide = {
  id: string;
  title: string;
  summary: string;
  category: HowToCategory;
  /** Free-form tags used by search. */
  tags: string[];
  owner?: string;
  approver?: string;
  estimatedTime?: string;
  updated: string;
  /** Lucide icon name string — resolved on the page. */
  icon?: "PackageSearch" | "Wallet" | "ShieldAlert" | "Phone" | "Sprout" | "FileSignature";
  sections: HowToSection[];
};

export const howToGuides: HowToGuide[] = [
  {
    id: "product-ordering-supplier-liaison",
    title: "Order products & liaise with suppliers",
    summary:
      "End-to-end SOP for sourcing, approving, ordering, receiving and reconciling treatment products across both depots.",
    category: "Operations",
    tags: [
      "ordering",
      "suppliers",
      "purchase order",
      "PO",
      "monday.com",
      "fertiliser",
      "stock",
      "depot",
      "delivery",
      "invoice",
    ],
    owner: "Operations Assistant",
    approver: "Operations Manager (final sign-off before order placement)",
    estimatedTime: "Begin no later than 1 month before each treatment cycle",
    updated: "2026-04-10",
    icon: "PackageSearch",
    sections: [
      {
        kind: "intro",
        id: "purpose",
        title: "Purpose",
        blocks: [
          {
            kind: "paragraph",
            text: "Make sure all products required for each treatment cycle are correctly specified, competitively sourced, ordered in good time, accurately allocated across depots, and properly received, stored and recorded.",
          },
          {
            kind: "bullets",
            items: [
              "Correctly specified",
              "Competitively sourced",
              "Ordered in a timely manner",
              "Accurately allocated across depots",
              "Properly received, stored, and recorded",
            ],
          },
        ],
      },
      {
        kind: "intro",
        id: "timing",
        title: "Timing",
        blocks: [
          {
            kind: "callout",
            tone: "warning",
            title: "Start at least 1 month before the cycle",
            text: "Suppliers may need to manufacture and ship product. Starting late risks running out for the first treatments of the cycle.",
          },
          {
            kind: "table",
            headers: ["Treatment period", "Start of cycle"],
            rows: [
              ["Winter", "1st week of Jan"],
              ["Early Spring", "2nd week of Feb"],
              ["Late Spring", "2nd week of May"],
              ["Summer", "1st week of July"],
              ["Autumn", "1st week of Nov"],
            ],
          },
        ],
      },
      {
        kind: "intro",
        id: "principles",
        title: "Key principles",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Only use approved suppliers listed in the “Suppliers” board in Monday.com",
              "Always obtain 2–3 supplier options per product where possible",
              "Always confirm requirements before requesting quotes",
              "Always check stock and depot capacity before ordering",
              "Always get final approval from the Operations Manager before placing an order",
              "Always create a PO and upload the invoice in Monday.com",
              "Always plan for storage, delivery logistics and site constraints",
            ],
          },
        ],
      },
      {
        kind: "steps",
        id: "process",
        title: "Step-by-step process",
        intro:
          "Follow each step in order. If anything is unclear at any point, confirm with the Operations Manager before continuing.",
        steps: [
          {
            title: "Review treatment cycle requirements",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Review the upcoming treatment cycle plan",
                  "List all required products",
                ],
              },
              {
                kind: "paragraph",
                text: "For each product, confirm:",
              },
              {
                kind: "bullets",
                items: [
                  "N input (fertiliser only)",
                  "PK + TE (fertiliser only)",
                  "Coverage (m²)",
                  "Application rate",
                  "Liquid or granular preference",
                ],
              },
              {
                kind: "callout",
                tone: "info",
                title: "Don't forget the spring buffer",
                text: "Include a buffer for new customers, especially during spring when sign-ups spike.",
              },
            ],
            output: "Confirmed product requirements + estimated total demand.",
          },
          {
            title: "Check current stock & capacity",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Review stock levels at both depots",
                  "Record current quantities and usable vs allocated stock",
                  "Check available storage space at each depot",
                  "Identify any space limitations or constraints",
                ],
              },
              {
                kind: "callout",
                tone: "rule",
                title: "Rule",
                text: "Only order what is needed after deducting existing usable stock.",
              },
            ],
            output: "Net quantity required + storage constraints.",
          },
          {
            title: "Calculate depot allocation",
            blocks: [
              {
                kind: "paragraph",
                text: "Review the number of customers per depot and route coverage, then allocate proportionally.",
              },
              {
                kind: "bullets",
                items: [
                  "Allocate product quantities proportionally to demand",
                  "Adjust based on depot storage limits",
                  "Adjust based on delivery practicality",
                ],
              },
            ],
            output: "Quantity split for each depot.",
          },
          {
            title: "Contact approved suppliers",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Open the Suppliers board in Monday.com",
                  "Identify the relevant approved suppliers",
                  "Contact each supplier by email and/or phone",
                ],
              },
              {
                kind: "paragraph",
                text: "When you make contact, provide:",
              },
              {
                kind: "bullets",
                items: [
                  "Treatment purpose",
                  "Required spec (N / PK + TE)",
                  "Coverage",
                  "Quantity",
                  "Delivery locations",
                  "Required delivery date",
                ],
              },
              {
                kind: "paragraph",
                text: "And request:",
              },
              {
                kind: "bullets",
                items: [
                  "2–3 product recommendations",
                  "Specification",
                  "Pack size",
                  "Pricing",
                  "Delivery cost",
                  "Lead time",
                  "Availability",
                ],
              },
              {
                kind: "callout",
                tone: "info",
                text: "Confirm details over email wherever possible — it gives you an audit trail.",
              },
            ],
            output: "Supplier quotes and product options.",
          },
          {
            title: "Compare supplier options",
            blocks: [
              {
                kind: "paragraph",
                text: "Evaluate each option against the full picture, not just price:",
              },
              {
                kind: "bullets",
                items: [
                  "Suitability to spec",
                  "Cost (unit + total)",
                  "Delivery cost",
                  "Lead time",
                  "Availability",
                  "Pack size practicality",
                  "Storage impact",
                  "Supplier reliability",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                text: "Do not select on price alone.",
              },
            ],
            output: "Preferred option selected per product.",
          },
          {
            title: "Submit for approval",
            blocks: [
              {
                kind: "paragraph",
                text: "Present the chosen option(s) to the Operations Manager with:",
              },
              {
                kind: "bullets",
                items: [
                  "Supplier comparisons",
                  "Pricing breakdown",
                  "Reasoning for the selection",
                ],
              },
              {
                kind: "callout",
                tone: "rule",
                title: "Rule",
                text: "Do not place any order without approval.",
              },
            ],
            output: "Approved order plan.",
          },
          {
            title: "Place the order & raise the PO",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Place the order with the selected supplier",
                ],
              },
              {
                kind: "paragraph",
                text: "Confirm with the supplier:",
              },
              {
                kind: "bullets",
                items: [
                  "Product",
                  "Quantity",
                  "Depot split",
                  "Delivery addresses",
                  "Delivery date",
                  "Pricing",
                ],
              },
              {
                kind: "paragraph",
                text: "Then create a Purchase Order (PO) in the PO system in Monday.com:",
              },
              {
                kind: "bullets",
                items: [
                  "Generate a PO number",
                  "Record the full order details",
                  "Save the supplier confirmation against the PO",
                ],
              },
            ],
            output: "Order placed + PO created.",
          },
          {
            title: "Plan delivery & site logistics",
            blocks: [
              {
                kind: "keyvalue",
                items: [
                  {
                    label: "Reading depot",
                    value:
                      "Notify Claire (Site Manager) of the delivery date. Confirm whether a forklift is required (chargeable). Make sure a technician attends on delivery day and the product is moved straight into the container — no stock left outside.",
                  },
                  {
                    label: "Why it matters",
                    value: "Prevent weather damage, prevent theft, and avoid leaving items outside the container.",
                  },
                  {
                    label: "Alresford depot",
                    value:
                      "Ensure delivery is tail lift (no forklift available). Confirm the supplier is aware in advance.",
                  },
                ],
              },
            ],
          },
          {
            title: "Record the order & prepare for receipt",
            blocks: [
              {
                kind: "paragraph",
                text: "Update the PO / order tracker in Monday.com with:",
              },
              {
                kind: "bullets",
                items: [
                  "Supplier",
                  "Product",
                  "Quantity",
                  "Cost",
                  "Delivery date",
                  "Depot allocation",
                ],
              },
              {
                kind: "paragraph",
                text: "Upload all documentation (supplier confirmation, pricing details) and schedule technician attendance for delivery day.",
              },
            ],
          },
          {
            title: "Monitor the order",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Track order progress",
                  "Chase the supplier if needed",
                  "Confirm delivery remains on schedule",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                title: "Escalate immediately",
                text: "Delays, shortages, or substitutions (substitutions are not permitted without approval).",
              },
            ],
          },
          {
            title: "Goods receipt & storage",
            blocks: [
              {
                kind: "paragraph",
                text: "On delivery, confirm:",
              },
              {
                kind: "bullets",
                items: [
                  "Correct product",
                  "Correct quantity",
                  "No damage",
                ],
              },
              {
                kind: "paragraph",
                text: "Then ensure:",
              },
              {
                kind: "bullets",
                items: [
                  "Product is stored immediately",
                  "No stock is left exposed outside",
                  "Discrepancies are reported immediately",
                ],
              },
            ],
          },
          {
            title: "Final admin & invoice reconciliation",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Upload the supplier invoice to the PO in Monday.com",
                  "Check the invoice matches the PO",
                  "Check the pricing is correct",
                  "Flag any discrepancies immediately",
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "rules",
        title: "Additional rules & notes",
        blocks: [
          {
            kind: "keyvalue",
            items: [
              {
                label: "Suppliers",
                value:
                  "Only use suppliers listed on the approved Suppliers board. Credit terms are pre-listed there.",
              },
              {
                label: "Substitutions",
                value: "Not allowed without Operations Manager approval.",
              },
              {
                label: "Buffer stock",
                value: "Always include a contingency, especially in spring.",
              },
              {
                label: "Accountability",
                value: "Orders must always be traceable via the PO system.",
              },
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "tools",
        title: "Suggested tools",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Supplier comparison sheet (optional but recommended)",
              "Monday.com — Suppliers board",
              "Monday.com — PO system",
              "Monday.com — Inventory stock board",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Service calls & attaching to scheduled visits                  */
  /* -------------------------------------------------------------- */
  {
    id: "scheduling-service-calls",
    title: "Schedule a service call & attach it to an existing visit",
    summary:
      "How to book a service call (revisit / complaint / top-up) and, where possible, attach it to a customer's next scheduled treatment to save a journey.",
    category: "Office Admin",
    tags: ["service call", "scheduling", "revisit", "complaint", "SA5", "RealGreen"],
    owner: "Office Team",
    estimatedTime: "5–10 min per call",
    updated: "2026-05-22",
    icon: "Phone",
    sections: [
      {
        kind: "intro",
        id: "when",
        title: "When to use a service call",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Customer reports an issue with a recent treatment (weed re-growth, moss, scorch)",
              "Free top-up / re-treat agreed with the office",
              "Spot job that doesn't fit a normal treatment slot",
              "Diagnostic visit before a full treatment is quoted",
            ],
          },
          {
            kind: "callout",
            tone: "rule",
            title: "Default rule",
            text: "Always try to attach a service call to the customer's next scheduled visit unless time-sensitivity prevents it. Standalone visits cost us a journey.",
          },
        ],
      },
      {
        kind: "steps",
        id: "process",
        title: "Booking process",
        steps: [
          {
            title: "Confirm the issue & resolution with the customer",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Use the relevant triage flow first (Weed, Moss, Disease, Cut Quality)",
                  "Confirm what we are agreeing to do and whether it is chargeable or goodwill",
                  "Log photos / notes against the customer account",
                ],
              },
            ],
            output: "A clear, agreed action with the customer.",
          },
          {
            title: "Check the customer's next scheduled visit",
            blocks: [
              {
                kind: "paragraph",
                text: "In Service Assistant 5, open the customer and view their forward schedule.",
              },
              {
                kind: "bullets",
                items: [
                  "If next visit is within the time window the customer can wait — attach the service call to it",
                  "If next visit is too far out, schedule the service call as a standalone job",
                ],
              },
              {
                kind: "table",
                headers: ["Issue type", "Acceptable wait window"],
                rows: [
                  ["Weed re-treat", "Up to 14 days"],
                  ["Moss top-up", "Up to 14 days"],
                  ["Disease diagnostic", "3–5 days (sooner if spreading)"],
                  ["Cut quality re-cut", "3–5 days"],
                  ["Scorch / damage assessment", "ASAP — standalone"],
                ],
              },
            ],
            output: "Decision: attach vs standalone.",
          },
          {
            title: "Attach the service call to the existing visit",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Open the scheduled job in SA5",
                  "Add a service call line with code matching the work (e.g. WR-TOP, MS-TOP, SPOT)",
                  "Mark as 'No charge' if it's a goodwill revisit",
                  "Add a clear technician-facing note: what to do, where on the lawn, who agreed it",
                  "Save — confirm it now shows under both 'Scheduled visit' and 'Service calls'",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                title: "Don't double-book",
                text: "If you create a standalone service call AND attach one to the next visit, the technician will do the work twice. Pick one.",
              },
            ],
            output: "Service call linked to the next visit with clear instructions.",
          },
          {
            title: "Confirm with the customer & log it",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Send confirmation message: visit date + what we'll do + whether it's chargeable",
                  "Add a note on the customer file with date booked, who agreed it, and the triage outcome reference",
                  "If the issue is goodwill, log it under 'Complimentary visits' for tracking",
                ],
              },
            ],
            output: "Customer informed, audit trail in place.",
          },
        ],
      },
      {
        kind: "notes",
        id: "tips",
        title: "Tips",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Always quote the specific date — never 'next visit' without a date",
              "Tell the customer the technician's ETA window (AM / PM)",
              "Flag key accounts so the route planner sees them",
              "If the wait window doesn't work, escalate to the route planner rather than promising a date you can't keep",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Undoing invoiced jobs                                          */
  /* -------------------------------------------------------------- */
  {
    id: "undoing-invoiced-jobs",
    title: "Skip / undo a job on an already-invoiced visit",
    summary:
      "Customer has two services on one invoice and wants to skip one. How to remove the service correctly without breaking the invoice or duplicating credit.",
    category: "Finance",
    tags: ["invoice", "credit", "skip", "void", "SA5", "RealGreen", "billing"],
    owner: "Office Team",
    approver: "Finance (for credits over £100)",
    estimatedTime: "10 min",
    updated: "2026-05-22",
    icon: "Wallet",
    sections: [
      {
        kind: "intro",
        id: "context",
        title: "When this applies",
        blocks: [
          {
            kind: "paragraph",
            text: "A single visit can carry multiple chargeable services (e.g. seasonal treatment + scarification). Once invoiced, you cannot simply delete one line — it must be reversed correctly so the invoice, ledger and customer account all reconcile.",
          },
          {
            kind: "callout",
            tone: "rule",
            title: "Never edit a posted invoice directly",
            text: "Always credit, then re-issue if needed. Editing a posted invoice breaks VAT and audit trail.",
          },
        ],
      },
      {
        kind: "steps",
        id: "process",
        title: "Reversing the skipped service",
        steps: [
          {
            title: "Confirm what's being skipped & why",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Confirm which specific service the customer wants to drop",
                  "Confirm the reason (not done, not wanted, duplicate)",
                  "Check the job card to confirm whether the work was carried out — if it was, do NOT credit",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                title: "If the work was done",
                text: "We do not credit completed work just because the customer changes their mind. Escalate to the manager before promising anything.",
              },
            ],
            output: "Clear decision on whether a credit is warranted.",
          },
          {
            title: "Raise a credit note for the specific service line",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Open the original invoice in SA5",
                  "Use 'Credit invoice' → select only the line being reversed (not the whole invoice)",
                  "Match the credit value to the exact ex-VAT amount of the service line",
                  "Set the credit reason: 'Service skipped — not carried out' or 'Duplicate'",
                  "Post the credit to the same invoice number for clean reconciliation",
                ],
              },
            ],
            output: "Credit note posted against the original invoice.",
          },
          {
            title: "Cancel the underlying job in the schedule",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Mark the job 'Cancelled — service skipped'",
                  "Remove it from any forward instalment schedule",
                  "If the customer is on an instalment plan, follow the Instalment Adjustment SOP (linked guide)",
                ],
              },
            ],
            output: "Schedule cleaned up so the job doesn't reappear.",
          },
          {
            title: "Reissue or adjust the customer's balance",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "If the invoice is unpaid: apply the credit to the outstanding balance",
                  "If the invoice is paid: refund OR hold as account credit — confirm with customer",
                  "Send the customer the credit note PDF + a short explainer email",
                ],
              },
            ],
            output: "Customer ledger correct and customer informed.",
          },
        ],
      },
      {
        kind: "notes",
        id: "checks",
        title: "Final checks",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Invoice + credit + (re-issued invoice if any) all carry the same job/visit reference",
              "Customer balance matches expected total after the skip",
              "Forward instalment schedule has been recalculated where applicable",
              "Note on customer file: who authorised, date, reason",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Instalment payments vs missed treatments                       */
  /* -------------------------------------------------------------- */
  {
    id: "instalments-missed-treatments",
    title: "Instalment payments & missed / skipped treatments",
    summary:
      "How monthly instalments are calculated, what happens when a treatment is missed or skipped, and how to explain it to customers without losing trust.",
    category: "Finance",
    tags: ["instalments", "direct debit", "skip", "missed", "billing", "prepay"],
    owner: "Office Team",
    approver: "Finance",
    estimatedTime: "10 min",
    updated: "2026-05-22",
    icon: "Wallet",
    sections: [
      {
        kind: "intro",
        id: "concept",
        title: "How the instalment plan works",
        blocks: [
          {
            kind: "paragraph",
            text: "Instalment plans spread the annual cost of treatments over equal monthly payments. They are NOT 'pay-per-visit' — the customer pays the total annual programme cost smoothed across the year.",
          },
          {
            kind: "keyvalue",
            items: [
              { label: "Annual programme cost", value: "Sum of all scheduled treatments + any agreed extras (scarification, aeration)" },
              { label: "Monthly instalment", value: "Annual cost ÷ number of months in the plan (usually 12)" },
              { label: "First payment", value: "Taken on agreed DD date — covers first month of cover, NOT first treatment" },
              { label: "Final treatment delivered", value: "Before the final instalment is taken" },
            ],
          },
        ],
      },
      {
        kind: "intro",
        id: "math",
        title: "Worked example",
        blocks: [
          {
            kind: "table",
            headers: ["Treatment", "Cost"],
            rows: [
              ["Early Spring", "£42"],
              ["Late Spring", "£42"],
              ["Summer", "£42"],
              ["Autumn", "£42"],
              ["Winter", "£42"],
              ["Annual total", "£210"],
              ["Monthly instalment (÷12)", "£17.50"],
            ],
          },
          {
            kind: "callout",
            tone: "info",
            title: "Why it isn't 'one payment per treatment'",
            text: "The customer pays the same £17.50 every month whether that month contains a treatment or not. Across the year it balances out exactly to the programme cost.",
          },
        ],
      },
      {
        kind: "steps",
        id: "missed",
        title: "When a treatment is missed or skipped",
        intro:
          "How a missed visit affects the instalment depends on WHO caused it. The rule is: the customer should never be worse off when we fail to deliver, and shouldn't get a discount when they choose to skip.",
        steps: [
          {
            title: "Treatment missed because of us (weather cancellation, technician issue)",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Reschedule the treatment within the same season window",
                  "Do NOT adjust the instalment — the annual cost is unchanged",
                  "If we cannot reschedule before the season closes, credit the treatment value (e.g. £42) to the customer account",
                  "Account credit reduces the next year's annual cost, NOT this year's instalments",
                ],
              },
              {
                kind: "callout",
                tone: "success",
                title: "Customer message",
                text: "'Your instalment stays the same — we'll either rebook the visit or, if we can't, you'll have £42 credit toward next year's programme.'",
              },
            ],
          },
          {
            title: "Treatment skipped by the customer's choice",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Confirm the skip in writing (email / SMS)",
                  "No refund or credit — the annual programme cost stands",
                  "Reason: instalments cover the year of cover, not individual visits; skipping one visit doesn't reduce overheads, routing or product allocation already committed",
                  "Note clearly on the customer file: skipped <date>, by customer choice",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                title: "Watch for repeat skipping",
                text: "If a customer skips 2+ treatments in a season, move them off instalments at renewal and quote pay-per-visit — the plan no longer suits them.",
              },
            ],
          },
          {
            title: "Treatment skipped — customer wants money off",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Explain the instalment model using the worked example above",
                  "Offer either: rebook within the same season, OR carry the value to next year (manager approval needed)",
                  "Never agree to mid-year instalment reductions — it breaks the model",
                  "Escalate if customer disputes — the manager may agree a goodwill credit in some cases",
                ],
              },
            ],
          },
          {
            title: "Re-calculating after a programme change",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "If treatments are added/removed permanently (e.g. dropping scarification), recalculate from the change date",
                  "Formula: (remaining annual value − value already taken in instalments) ÷ months remaining in plan",
                  "Confirm the new monthly figure in writing before changing the DD mandate",
                  "Update SA5, the DD provider, and the customer file together — never in isolation",
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "scripts",
        title: "Phone scripts",
        blocks: [
          {
            kind: "bullets",
            items: [
              "'Your instalment covers the whole year's programme, not each individual visit, so it stays the same whether a visit is busy or quiet that month.'",
              "'If we can't deliver a treatment, you don't lose out — we'll either rebook it or credit the value to your account.'",
              "'If you choose to skip, we keep the slot in our diary for you and the materials are already allocated, so the cost stands.'",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Grubs — timeframes & treatments                                */
  /* -------------------------------------------------------------- */
  {
    id: "grubs-timing-treatments",
    title: "Leatherjackets & chafer grubs — timing, treatments & customer education",
    summary:
      "Lifecycles, the only legal control windows, what we can/can't do, and how to set customer expectations.",
    category: "Field Work",
    tags: ["pest", "grubs", "leatherjacket", "chafer", "nematode", "biological"],
    owner: "Operations Manager",
    estimatedTime: "Read once — refer back each season",
    updated: "2026-05-22",
    icon: "Sprout",
    sections: [
      {
        kind: "intro",
        id: "context",
        title: "Why this matters",
        blocks: [
          {
            kind: "paragraph",
            text: "Since the withdrawal of synthetic insecticides for amenity turf, our only effective control for grubs is biological nematodes — and those work for only a few weeks of the year. Timing is everything; outside the window we can't treat, only manage damage.",
          },
          {
            kind: "callout",
            tone: "rule",
            title: "Plain truth for customers",
            text: "We cannot 'spray for grubs' on demand. Nematodes work for a 4–6 week window per pest per year. If we miss it, we wait until next year.",
          },
        ],
      },
      {
        kind: "intro",
        id: "leatherjackets",
        title: "Leatherjackets (crane fly larvae — Tipula spp.)",
        blocks: [
          {
            kind: "table",
            headers: ["Stage", "When"],
            rows: [
              ["Adults (crane flies / daddy long-legs) lay eggs", "Late Aug – early Oct"],
              ["Eggs hatch, young larvae feed on roots", "Sept – Oct"],
              ["Larvae overwinter in soil", "Nov – Feb"],
              ["Larvae feed actively again, damage visible", "March – May"],
              ["Pupate, emerge as adults", "July – Aug"],
            ],
          },
          {
            kind: "keyvalue",
            items: [
              { label: "Nematode species", value: "Steinernema feltiae" },
              { label: "Treatment window", value: "Late Aug – mid Oct (soil ≥ 12°C, moist)" },
              { label: "Application", value: "Drench with watering can / sprayer, lawn must be watered before and after for 2 weeks" },
              { label: "Expected control", value: "60–80% reduction if applied in window" },
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            title: "Common customer complaint",
            text: "Customer calls in March with damage. We CANNOT treat now — soil is too cold for nematodes. Manage with overseeding + cultural recovery; quote autumn treatment.",
          },
        ],
      },
      {
        kind: "intro",
        id: "chafers",
        title: "Chafer grubs",
        blocks: [
          {
            kind: "paragraph",
            text: "Several species, slightly different timings but similar control window. Most common in UK turf:",
          },
          {
            kind: "table",
            headers: ["Species", "Adult emergence", "Notes"],
            rows: [
              ["Garden chafer (Phyllopertha horticola)", "May–June", "Small (~1cm), most common in fine turf"],
              ["Welsh chafer (Hoplia philanthus)", "June–July", "Worse on damp, heavier soils"],
              ["Cockchafer / May bug (Melolontha melolontha)", "May–June", "Larger grubs, 3-year cycle, severe damage"],
              ["Summer chafer (Amphimallon solstitiale)", "June–July", "Less common, lighter damage"],
            ],
          },
          {
            kind: "keyvalue",
            items: [
              { label: "Nematode species", value: "Heterorhabditis bacteriophora" },
              { label: "Treatment window", value: "Mid July – early Sept (soil ≥ 14°C, moist)" },
              { label: "Application", value: "Drench, then keep lawn moist for 14 days" },
              { label: "Expected control", value: "50–70% reduction; mammal damage often does more harm than grubs themselves" },
            ],
          },
        ],
      },
      {
        kind: "steps",
        id: "office-script",
        title: "Office response by season",
        steps: [
          {
            title: "Spring call (March–May): 'My lawn is wrecked'",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Most likely leatherjackets (or mammal digging finding chafer grubs)",
                  "Explain: it is OUTSIDE the legal treatment window — no nematode will work",
                  "Quote: overseeding + recovery feed now, nematode treatment in Sept (leatherjacket) or July (chafer)",
                  "Book a diagnostic visit to confirm species before quoting next year's programme",
                ],
              },
            ],
          },
          {
            title: "Summer call (July–Aug): 'Patches appearing, birds digging'",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Likely chafer — we ARE in window for Heterorhabditis treatment",
                  "Book diagnostic + nematode application within 2 weeks",
                  "Explain watering requirement: customer must water lawn for 2 weeks after — non-negotiable",
                ],
              },
            ],
          },
          {
            title: "Autumn call (Sept–Oct): 'Worried about leatherjackets again'",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "We ARE in window for Steinernema feltiae",
                  "Book preventative application especially for properties with damage history",
                  "Pair with autumn feed and aeration where possible",
                ],
              },
            ],
          },
          {
            title: "Winter call (Nov–Feb): 'Can you do anything?'",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "No active treatment possible — soil temperature too low for nematodes",
                  "Reassure: visible damage will be addressed in spring with overseeding",
                  "Schedule July (chafer) or Sept (leatherjacket) treatment for the year ahead",
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "education",
        title: "How to educate customers (key points)",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Be honest: chemical grub-killers for amenity turf no longer exist in the UK",
              "Nematodes are living organisms — they need warmth, moisture, and a specific time of year",
              "The customer's role (watering for 2 weeks) is as important as the application itself",
              "Damage is often made worse by foxes and badgers digging — fencing / scent deterrents help",
              "A single treatment is not a cure — properties with grub history benefit from annual preventative applications",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Posting jobs in Service Assistant 5                            */
  /* -------------------------------------------------------------- */
  {
    id: "posting-jobs-sa5",
    title: "Manually post completed jobs in Service Assistant 5",
    summary:
      "How to post technician-completed jobs in SA5 (RealGreen) when they haven't auto-posted from the mobile app, and the checks to run before posting.",
    category: "Office Admin",
    tags: ["SA5", "RealGreen", "posting", "jobs", "invoicing", "technician"],
    owner: "Office Team",
    estimatedTime: "5 min per batch",
    updated: "2026-05-22",
    icon: "FileSignature",
    sections: [
      {
        kind: "intro",
        id: "when",
        title: "When to use this",
        blocks: [
          {
            kind: "bullets",
            items: [
              "Technician finished a job but the mobile sync failed",
              "A paper job ticket has come back from the field",
              "Job needs to be backdated to the actual completion date",
              "Office is closing the day's work for invoicing",
            ],
          },
          {
            kind: "callout",
            tone: "rule",
            title: "Don't post blind",
            text: "Posting commits the job to the customer ledger and triggers invoicing. Always run the pre-checks below first.",
          },
        ],
      },
      {
        kind: "steps",
        id: "pre-checks",
        title: "Pre-posting checks",
        steps: [
          {
            title: "Job actually completed",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Confirm against technician's day sheet / WhatsApp / paper ticket",
                  "If unsure, call the technician before posting — do not assume",
                ],
              },
            ],
          },
          {
            title: "Products & quantities match the job card",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Cross-check product codes match the treatment type",
                  "Check rate/area is sensible (e.g. fertiliser at 35 g/m², not 350)",
                  "Verify any extras (scarification, top-dressing) the technician added on-site",
                ],
              },
            ],
          },
          {
            title: "Pricing & charges are correct",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Standard treatment uses customer's contract price, not list",
                  "Goodwill / no-charge jobs flagged BEFORE posting — once posted they will invoice",
                  "Confirm any agreed discount is applied to the line, not as a separate adjustment",
                ],
              },
            ],
          },
          {
            title: "Date is correct",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Use the date the work was actually carried out — not today's date",
                  "Backdated jobs are fine within the current accounting period — flag to finance if older",
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "steps",
        id: "posting",
        title: "Posting steps in SA5",
        steps: [
          {
            title: "Open the day's batch",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Routes → Daily Posting → select the route and date",
                  "Filter to 'Completed — not posted'",
                ],
              },
            ],
          },
          {
            title: "Review each job line",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Open each job, verify products, quantities, price and notes",
                  "Add any missing technician notes from the paper ticket",
                  "Mark any 'do not invoice' lines as no-charge before posting",
                ],
              },
            ],
          },
          {
            title: "Post the batch",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Click 'Post selected' (or 'Post all' if reviewed)",
                  "Confirm the date prompt matches the work date",
                  "Wait for the success confirmation before closing — partial posts are a pain to unwind",
                ],
              },
              {
                kind: "callout",
                tone: "warning",
                title: "If a post fails mid-batch",
                text: "Note which jobs succeeded vs failed. Do NOT re-post the whole batch — that creates duplicates. Re-post only the failed lines.",
              },
            ],
          },
          {
            title: "Post-posting checks",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Spot-check 2–3 customer ledgers to confirm the charge landed correctly",
                  "Confirm the route's day total matches the technician's expected revenue",
                  "Email any anomalies to the operations manager same day",
                ],
              },
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "tips",
        title: "Common issues & fixes",
        blocks: [
          {
            kind: "table",
            headers: ["Issue", "Fix"],
            rows: [
              ["Job won't post — 'customer on hold'", "Check finance hold reason; release only with finance approval"],
              ["Wrong price posted", "Credit the line, re-issue at correct price (see Undoing Invoiced Jobs guide)"],
              ["Duplicate post", "Credit duplicate immediately; do not edit the posted invoice"],
              ["Technician used unapproved product", "Post the job, then flag to ops manager — coaching point, not a billing issue"],
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Scarification + moss interaction                               */
  /* -------------------------------------------------------------- */
  {
    id: "scarification-moss-interaction",
    title: "How scarification & related services tackle moss",
    summary:
      "Why moss control alone doesn't fix mossy lawns, how scarification, aeration, feeding and overseeding work together, and what to recommend to customers.",
    category: "Field Work",
    tags: ["moss", "scarification", "aeration", "overseeding", "treatments"],
    owner: "Operations Manager",
    estimatedTime: "Read once",
    updated: "2026-05-22",
    icon: "Sprout",
    sections: [
      {
        kind: "intro",
        id: "principle",
        title: "Core principle",
        blocks: [
          {
            kind: "callout",
            tone: "rule",
            title: "Moss control kills. Scarification removes. Feeding & overseeding replace.",
            text: "All three are needed to fix a mossy lawn long-term. Doing only one is why customers say 'the moss came back'.",
          },
          {
            kind: "paragraph",
            text: "Moss thrives where grass is weak: short cuts, compaction, shade, poor drainage, low fertility. Iron-based moss treatments kill the moss currently present, but they don't change the conditions that let moss win in the first place. The fix is a sequence of complementary services.",
          },
        ],
      },
      {
        kind: "intro",
        id: "services",
        title: "What each service does",
        blocks: [
          {
            kind: "table",
            headers: ["Service", "What it does", "Effect on moss"],
            rows: [
              ["Moss control (iron sulphate)", "Blackens and kills live moss in 7–21 days", "Kills but does not remove — dead moss stays in the sward"],
              ["Scarification", "Mechanically rakes out dead moss & thatch", "Physically removes the moss; opens the sward for grass to recover"],
              ["Hollow-tine aeration", "Removes soil cores, reduces compaction", "Improves drainage & root depth — long-term moss prevention"],
              ["Overseeding", "Introduces new grass plants", "Fills bare ground exposed by scarification so moss can't recolonise"],
              ["Top-dressing", "Thin layer of sandy loam", "Improves surface drainage, levels low spots that hold water"],
              ["Balanced feeding", "Encourages dense, vigorous grass", "Stronger grass out-competes moss"],
              ["Raising cut height", "Cultural change", "Stronger root system, less stress, less moss-friendly conditions"],
            ],
          },
        ],
      },
      {
        kind: "intro",
        id: "sequence",
        title: "The recommended sequence",
        blocks: [
          {
            kind: "paragraph",
            text: "For a properly mossy lawn (>20% moss coverage), use this sequence over a single season:",
          },
          {
            kind: "table",
            headers: ["Step", "Timing", "Service"],
            rows: [
              ["1", "Late winter / early spring", "Moss control treatment"],
              ["2", "2–3 weeks later", "Scarification (once moss is blackened)"],
              ["3", "Immediately after scarification", "Overseeding + balanced spring feed"],
              ["4", "Late spring", "Aeration (hollow-tine on heavy/compact lawns)"],
              ["5", "Through summer", "Standard feeds + raised cut height"],
              ["6", "Autumn", "Second moss control + light scarification if needed"],
            ],
          },
          {
            kind: "callout",
            tone: "success",
            title: "Why this works",
            text: "Each step builds on the previous: kill → remove → improve conditions → replace with healthy grass → maintain. Skip any step and moss returns.",
          },
        ],
      },
      {
        kind: "intro",
        id: "shortcut-cost",
        title: "What happens if customers skip steps",
        blocks: [
          {
            kind: "table",
            headers: ["They do…", "What happens"],
            rows: [
              ["Moss treatment only", "Black moss visible for weeks. Regrows within 8–12 weeks because dead moss holds moisture and seeds"],
              ["Scarification only (no moss control first)", "Moss spreads — scarifying live moss disperses fragments which re-root"],
              ["Treatment + scarification, no overseeding", "Bare ground colonised by moss again within a season"],
              ["Treatment + scarification + overseeding, no aeration", "Better, but compaction keeps recreating the conditions for moss"],
              ["All steps", "Lasting improvement — typically 12+ months before moss management is needed again"],
            ],
          },
        ],
      },
      {
        kind: "notes",
        id: "scripts",
        title: "Office scripts",
        blocks: [
          {
            kind: "bullets",
            items: [
              "'Our moss treatment kills the moss — but it doesn't physically take it out of the lawn. That's what scarification does.'",
              "'Scarifying without treating first actually spreads moss, so the order matters.'",
              "'The reason most moss returns is bare ground left after scarification — we always recommend overseeding the same day.'",
              "'If your lawn is shaded or wet, we can manage moss but we can't eliminate it without addressing the underlying conditions.'",
              "'Customers who do the full sequence typically see lasting results; those who only do one step usually call us back next year.'",
            ],
          },
        ],
      },
    ],
  },

  /* -------------------------------------------------------------- */
  /* Watering guide — Hampshire, Berkshire, West Sussex & Surrey    */
  /* -------------------------------------------------------------- */
  {
    id: "watering-guide-regional",
    title: "Watering lawns in Hampshire, Berkshire, West Sussex & Surrey",
    summary:
      "In-depth technical guide covering soil types, climate, evapotranspiration, root zone management, dormancy and seasonal watering for our region — plus a simple customer-facing version.",
    category: "Field Work",
    tags: [
      "watering",
      "irrigation",
      "drought",
      "dormancy",
      "evapotranspiration",
      "root zone",
      "field capacity",
      "wilting point",
      "sandy soil",
      "clay soil",
      "chalk",
      "newly seeded",
      "overseeding",
      "summer",
      "established lawn",
    ],
    owner: "Operations Manager",
    estimatedTime: "Read once — refer back seasonally",
    updated: "2026-06-25",
    icon: "Sprout",
    sections: [
      /* ── INTRO ─────────────────────────────────────────────── */
      {
        kind: "intro",
        id: "overview",
        title: "Why watering is a skill, not just a task",
        blocks: [
          {
            kind: "audience",
            label: "Technicians & Office",
          },
          {
            kind: "paragraph",
            text: "Our four-county operating area — Hampshire, Berkshire, West Sussex and Surrey — sits in the driest part of England. Average annual rainfall across the region is 600–750 mm, but that figure is misleading: most of it falls outside the growing season. May to August typically delivers fewer than 200 mm spread unevenly, and dry spells of 3–6 weeks are routine every summer.",
          },
          {
            kind: "stat",
            items: [
              { label: "Annual rainfall", value: "600–750mm", sub: "vs UK avg ~885mm" },
              { label: "Summer rainfall", value: "<200mm", sub: "May–Aug combined" },
              { label: "Peak ET", value: "5–6mm", sub: "per day in July/Aug" },
              { label: "Dry spell risk", value: "3–6 wks", sub: "routine every summer" },
            ],
          },
          {
            kind: "paragraph",
            text: "The combination of low rainfall, free-draining soils and warm, often windy summers means water stress is the single most common cause of customer complaints in Q3. Getting watering right means understanding how the soil holds water, how the grass uses it, and how environmental conditions change demand week to week.",
          },
          {
            kind: "callout",
            tone: "info",
            title: "Two versions in this guide",
            text: "Sections 1–7 (soil science, key concepts, seasonal details) are for technicians and office staff. The final section — 'Simple guide for customers' — is plain English you can read out over the phone or share directly.",
          },
        ],
      },

      /* ── SOILS ──────────────────────────────────────────────── */
      {
        kind: "intro",
        id: "soils",
        title: "Soils across our region",
        blocks: [
          {
            kind: "paragraph",
            text: "Soil type dictates how quickly water drains away, how much the grass can store between waterings, and how often irrigation is needed. Our region has three dominant soil types, often mixing on the same property.",
          },
          {
            kind: "table",
            headers: ["Soil type", "Where common", "Key watering implication"],
            rows: [
              [
                "Chalk / thin calcareous soils",
                "Much of Hampshire (South Downs fringe, Test Valley, Winchester area), parts of West Sussex (South Downs)",
                "Very low water-holding capacity — field capacity reached quickly and drains almost as fast. Lawns need little and often watering; drought stress appears within 7–10 days of dry weather.",
              ],
              [
                "Sandy loam / greensand",
                "Surrey (Guildford, Godalming, Dorking area), NE Hampshire, Berkshire (Sandhurst, Camberley corridor)",
                "Fast-draining, low water retention. Similar to chalk — high irrigation frequency needed in summer. Easy to underwater, hard to overwater.",
              ],
              [
                "Heavy clay / London Clay",
                "North Surrey (Epsom, Sutton, Croydon fringe), North Berkshire, parts of West Sussex (Horsham)",
                "High water-holding capacity — holds moisture well but drains slowly. Risk of surface run-off if watered too fast. Drought stress appears later but is more severe when it does (clay shrinks and cracks, severing roots). Slow to rewet once fully dry.",
              ],
              [
                "Mixed/loam",
                "Widespread across the region, especially river valleys (Test, Wey, Mole)",
                "More forgiving — moderate drainage, moderate retention. Standard advice applies well.",
              ],
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            title: "Clay re-wetting lag",
            text: "A clay lawn that has fully dried out and cracked can take 2–3 heavy waterings over 5–7 days to fully rewet the root zone. The first watering mostly runs off or sits on cracks. Don't let clay lawns get to this point — recovery is slow.",
          },
        ],
      },

      /* ── CLIMATE ────────────────────────────────────────────── */
      {
        kind: "intro",
        id: "climate",
        title: "Climate and rainfall patterns",
        blocks: [
          {
            kind: "paragraph",
            text: "The south-east of England is the driest region in the UK, and our patch sits squarely in it. Rainfall is not the problem in winter — it's the summer that counts.",
          },
          {
            kind: "table",
            headers: ["Month window", "What's happening", "Risk level"],
            rows: [
              ["Oct – Jan", "Most rainfall arrives. Soil at or near field capacity. Grass growth slow.", "Low"],
              ["Feb – Apr", "Growth resumes. ET rising. Rainfall variable — chalk and sand drain fast after showers.", "Low–Medium"],
              ["May – Jun", "ET overtakes rainfall on most soils. First drought stress risk on sandy/chalk lawns.", "Medium–High"],
              ["Jul – Aug", "Peak drought. ET 4–6 mm/day. Hosepipe bans common. Most complaints received.", "High"],
              ["Sep – Oct", "Temperatures fall, rainfall returns. Best renovation window of the year.", "Low–Medium"],
            ],
          },
          {
            kind: "callout",
            tone: "rule",
            title: "The fundamental problem",
            text: "In a dry summer, our lawns lose more water through evapotranspiration than falls as rain. On sandy or chalk soils, this deficit builds from late May. On clay, it hits harder and later — but recovery is much slower.",
          },
          {
            kind: "bullets",
            items: [
              "Average July max temperature: 22–24°C — heat events above 30°C are increasingly common",
              "Exposed sites (South Downs, Berkshire Downs) have drying winds that significantly increase ET",
              "Southern Water and Thames Water regularly impose hosepipe bans June–Sept in dry years",
              "Potential evapotranspiration (PET) across our region: 600–700 mm/year — nearly equal to total rainfall",
            ],
          },
        ],
      },

      /* ── KEY CONCEPTS ───────────────────────────────────────── */
      {
        kind: "intro",
        id: "concepts",
        title: "Key turf science concepts",
        blocks: [
          {
            kind: "audience",
            label: "Technicians & Office",
          },
          {
            kind: "paragraph",
            text: "These concepts underpin every watering decision. Technicians should be able to explain each one to a customer in plain language.",
          },
          {
            kind: "keyvalue",
            items: [
              {
                label: "Field capacity (FC)",
                value:
                  "The maximum water a soil can hold after free drainage — reached 24–48 hrs after heavy rain or watering. This is the target state: soil fully charged but not waterlogged. Sandy soils reach FC quickly and hold less; clay holds more. Watering beyond FC is wasteful — excess drains straight through.",
              },
              {
                label: "Permanent wilting point (PWP)",
                value:
                  "The moisture level below which roots can no longer extract water — it's bound too tightly to soil particles. Irreversible damage begins here: roots die. On chalk and sandy soils this is reached in as little as 7–14 days of summer drought. Our goal: keep soil moisture between FC and PWP at all times.",
              },
              {
                label: "Plant-available water (PAW)",
                value:
                  "The usable water held between FC and PWP. Sandy soils: ~7–10% PAW. Heavy clay: ~15–20%. A deeper root zone = a larger reservoir — another reason why deep rooting matters so much.",
              },
              {
                label: "Root zone",
                value:
                  "The active root depth. Established lawns in our region: typically 10–20 cm. Newly seeded or shallow-rooted lawns: just 2–5 cm. Water must penetrate the full root zone to be useful. Shallow watering creates shallow roots — making the lawn progressively less drought-tolerant.",
              },
              {
                label: "Evapotranspiration (ET)",
                value:
                  "Combined water loss from soil evaporation + plant transpiration. The main driver of water demand. Rises with temperature, wind, sunshine, and low humidity. Peak ET in our region (hot July/August): 5–6 mm/day. A sandy lawn at field capacity can reach stress in under 10 days with no rain.",
              },
              {
                label: "Irrigation efficiency",
                value:
                  "Not all applied water reaches the root zone. Runoff (slopes, clay), surface evaporation, and shallow application reduce efficiency. Early morning watering is best — lower evaporation loss and leaves dry before evening, reducing fungal disease risk.",
              },
              {
                label: "Dormancy",
                value:
                  "In prolonged drought, cool-season grasses (rye, fescue, bent) stop growing and go straw-coloured. The crowns and roots remain alive — dormancy is survival, not death. Most established lawns in our region can survive 4–6 weeks dormant and recover fully. Caution: rehydrating a dormant lawn too quickly can trigger Fusarium and other fungal outbreaks.",
              },
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            title: "Wilt stress sequence — act before stage 3",
            text: "Grass follows a predictable decline: footprints stay visible → colour dulls to blue-grey → leaf roll → full browning. Stages 1–2 are fully reversible with one good watering. By stage 3 (leaf roll), recovery takes days. Stage 4–5 with extended duration causes root and crown death.",
          },
          {
            kind: "numbered",
            items: [
              "Footprinting visible — grass doesn't spring back within 30 seconds",
              "Colour dulls from bright green to blue-grey",
              "Leaf roll — blades curl lengthways to reduce water loss (act now)",
              "Full wilt — grass lies flat, colour turning straw",
              "Browning — drought dormancy or permanent damage depending on duration",
            ],
          },
        ],
      },

      /* ── GRASS TYPES ────────────────────────────────────────── */
      {
        kind: "intro",
        id: "grass-types",
        title: "Grass types in our region and their water needs",
        blocks: [
          {
            kind: "paragraph",
            text: "Most residential lawns in Hampshire, Berkshire, West Sussex and Surrey are predominantly cool-season species. The typical lawn is a blend of several of these, and the mix affects drought tolerance significantly.",
          },
          {
            kind: "table",
            headers: ["Species", "Typical presence", "Drought tolerance", "Watering note"],
            rows: [
              [
                "Perennial ryegrass (Lolium perenne)",
                "Very common — most lawn seed mixes, most overseeding",
                "Moderate — enters dormancy under extended drought",
                "Needs most water of common UK species. Root system is relatively shallow (10–15 cm on most garden lawns). First to show wilt.",
              ],
              [
                "Smooth-stalked meadow grass / Kentucky bluegrass (Poa pratensis)",
                "Present in many older lawns",
                "Better than rye — spreads by rhizomes and can recover well from dormancy",
                "Deeper roots than rye if conditions allow. Benefits from deep, infrequent watering to encourage root depth.",
              ],
              [
                "Annual meadow grass (Poa annua)",
                "Ubiquitous weed grass — almost every lawn",
                "Poor — shallow rooted, first to die in drought",
                "Drought kills it — which is not necessarily bad, but customers notice brown patches. Nothing to do; reseeds naturally.",
              ],
              [
                "Fine fescues (Festuca rubra / Festuca ovina)",
                "Higher-quality lawn mixes, shaded areas, drier locations",
                "Best of all common UK species — deeper roots, lower ET, native to dry grassland",
                "Can survive longer without watering. Sandy and chalk soils often favour fescues over time. Less irrigation needed on predominantly fescue lawns.",
              ],
              [
                "Browntop bent (Agrostis tenuis)",
                "High-quality mixes, lawns managed at lower heights",
                "Moderate — can go dormant and recover",
                "Performs well on acidic, lower-fertility soils. Drought recovery generally good.",
              ],
            ],
          },
          {
            kind: "callout",
            tone: "info",
            title: "Species shift over time",
            text: "In our region's dry summers, repeated drought progressively shifts lawns away from perennial ryegrass (which dies) toward fine fescues (which survive). This is actually a positive change — drought-tolerant lawns need less irrigation long-term. Don't overseed badly drought-affected lawns with pure rye; use a mix with a high fescue proportion.",
          },
        ],
      },

      /* ── ESTABLISHED LAWNS ─────────────────────────────────── */
      {
        kind: "intro",
        id: "established",
        title: "Established lawns — technical watering guidance",
        blocks: [
          {
            kind: "audience",
            label: "Technicians & Office",
          },
          {
            kind: "paragraph",
            text: "An established lawn has a root system that, if managed correctly, has penetrated to 10–20 cm. The goal of every watering decision is to keep the root zone between field capacity and permanent wilting point, and to encourage deep rooting by watering deeply and infrequently.",
          },
          {
            kind: "keyvalue",
            items: [
              {
                label: "The single most important principle",
                value:
                  "Water deeply and infrequently — not little and often. Frequent shallow watering keeps moisture only in the top 2–3 cm, which encourages shallow surface rooting. Shallow-rooted lawns need more watering, not less. A deep watering (20–25 mm) that penetrates the full root zone, followed by a dry period until the soil dries to mid-root depth, trains roots to follow water downwards.",
              },
              {
                label: "How much per session?",
                value:
                  "Target 20–25 mm per watering. This is enough to wet a sandy loam to 15–20 cm and a clay loam to 10–15 cm. Use a rain gauge or a tin can to measure — most sprinklers and hose attachments deliver 5–15 mm per hour. A common mistake is moving the sprinkler before 20 mm has been applied.",
              },
              {
                label: "How often?",
                value:
                  "Depends on soil type and weather. Sandy/chalk soils in a dry spell: every 5–7 days. Loam: every 7–10 days. Clay: every 10–14 days (and water slowly to avoid runoff — use multiple shorter passes). As a rule of thumb, water when the top 2–3 cm of soil is dry and the grass just begins to dull in colour.",
              },
              {
                label: "When to water?",
                value:
                  "Early morning (5–9 am) is strongly preferred. Reduces surface evaporation loss, allows leaves to dry before evening (reducing disease pressure), and water is in the root zone before peak ET of the day. Late evening is acceptable but increases risk of fungal disease (Fusarium, red thread). Midday watering in full sun is inefficient but does not scorch the grass — that is a myth.",
              },
              {
                label: "Recognising stress before damage occurs",
                value:
                  "Walk across the lawn and look back — if footprints stay visible for more than 30 seconds, the grass has lost turgidity and is in early stress. Act now: water before colour change or leaf roll develops. At this stage one good deep watering halts the decline.",
              },
            ],
          },
          {
            kind: "table",
            headers: ["Soil type", "Recommended volume per session", "Frequency in dry spell"],
            rows: [
              ["Chalk / thin calcareous", "15–20 mm (soil can't hold more — split into two passes)", "Every 4–6 days"],
              ["Sandy loam / greensand", "20–25 mm", "Every 5–7 days"],
              ["Loam / mixed", "20–25 mm", "Every 7–10 days"],
              ["Heavy clay", "20–25 mm in 2–3 short passes, letting it soak between", "Every 10–14 days"],
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            title: "Managing a dormant lawn",
            text: "If an established lawn enters full dormancy (straw-coloured, no growth), do not suddenly apply heavy irrigation — the shock can cause rapid Fusarium and other fungal outbreaks. Instead: apply 5–6 mm every 2–3 days for the first 2 weeks to slowly rehydrate the root zone, then step back up to normal deep watering once the grass begins to green up.",
          },
        ],
      },

      /* ── NEW SEED ───────────────────────────────────────────── */
      {
        kind: "intro",
        id: "new-seed",
        title: "Newly seeded lawns — completely different rules",
        blocks: [
          {
            kind: "audience",
            label: "Technicians & Office",
          },
          {
            kind: "paragraph",
            text: "Everything above applies to established lawns with an existing root system. Newly seeded areas — whether full lawn establishment or overseeding — have no root system whatsoever at germination. The seedling's only water source is the top 5–10 mm of soil. This fundamentally changes the watering approach.",
          },
          {
            kind: "callout",
            tone: "rule",
            title: "The golden rule for new seed",
            text: "Keep the top 5 mm of soil consistently moist from sowing until the grass is 5 cm tall and has been cut once. Never let it dry out. Never waterlog it. Little and often — the complete opposite of the established lawn rule.",
          },
          {
            kind: "keyvalue",
            items: [
              {
                label: "Why it's different",
                value:
                  "A germinating seed sends down a radicle (first root) just 1–3 mm long. This tiny root can only access moisture in the immediate surface zone. If the top 5 mm dries out for even 12–24 hours on a hot day, germination halts and newly emerged seedlings die. There is no established root to reach deeper moisture.",
              },
              {
                label: "Pre-germination (day 0 to ~day 7–21 depending on species and temperature)",
                value:
                  "Light, frequent watering: 3–5 mm, 2–3 times per day in warm weather (>18°C), or once daily in cooler conditions. The surface should never feel dry. Avoid heavy downpours — they wash seed into furrows. Use a fine rose or misting head.",
              },
              {
                label: "Post-germination (seedlings visible) to first cut",
                value:
                  "Gradually reduce frequency but maintain moisture. Move toward once daily (5–8 mm), still keeping the top 2–3 cm moist. Avoid puddling — overwatering at this stage causes 'damping off' (fungal collapse of seedlings at the soil surface).",
              },
              {
                label: "After first cut (lawn at 5 cm, cut to ~4 cm)",
                value:
                  "Begin transitioning to the deep-and-infrequent approach over 2–4 weeks. At this stage the roots have reached 3–5 cm. Start extending intervals: every 2 days, then every 3–4, progressively training roots deeper. Full transition to established-lawn watering normally takes 8–12 weeks after germination.",
              },
              {
                label: "Germination temperature — critical context",
                value:
                  "Perennial ryegrass germinates best at 10–25°C soil temperature. In our region: reliable germination from mid-April through September. Outside this window, seed sits dormant in the soil longer — and sits in moist soil longer, increasing disease risk. Spring and early autumn sowings (Apr–May, Aug–Sep) are optimal in our climate.",
              },
              {
                label: "Overseeding vs full establishment",
                value:
                  "Overseeding into an existing lawn is slightly more forgiving because the existing turf provides some shade and moisture retention at surface level. But the principle is the same: surface moisture must be maintained until seedlings are established. Existing grass competing for water makes it even more important to water consistently.",
              },
            ],
          },
          {
            kind: "table",
            headers: ["Stage", "Volume per session", "Frequency", "Key risk"],
            rows: [
              ["Pre-germination", "3–5 mm (misting)", "2–3× per day in heat, 1× in cool", "Surface drying out — kills germination"],
              ["Seedlings emerged, pre-cut", "5–8 mm", "Once daily", "Damping off from overwatering; drying out from under-watering"],
              ["Post-first cut (transition)", "10–15 mm", "Every 2–3 days, extending", "Reverting to shallow watering — risks shallow roots permanently"],
              ["8–12 weeks post-germination", "20–25 mm", "Every 5–10 days (soil-dependent)", "None — treating like an established lawn from here"],
            ],
          },
          {
            kind: "callout",
            tone: "warning",
            title: "Hosepipe ban risk for new seed",
            text: "If a hosepipe ban is in force and a customer has just sown seed, this is a major problem — watering cans alone are rarely sufficient for larger lawns. Advise customers to check ban exceptions (hand-held hoses are sometimes still permitted), and strongly consider timing overseeding for early autumn when bans typically lift and temperatures are still warm enough for germination.",
          },
        ],
      },

      /* ── SEASONAL CALENDAR ──────────────────────────────────── */
      {
        kind: "intro",
        id: "seasonal",
        title: "Seasonal watering calendar for our region",
        blocks: [
          {
            kind: "table",
            headers: ["Season", "Typical conditions", "Established lawn", "New seed"],
            rows: [
              [
                "Jan–Feb",
                "Cold, low ET, dormant grass. Rainfall usually adequate.",
                "No watering needed. Soil at or near FC from winter rain.",
                "Not suitable for seeding (too cold for germination).",
              ],
              [
                "Mar–Apr",
                "Growth resumes. ET rising. Rainfall variable — can be dry. Chalk drains fast after spring showers.",
                "Monitor chalk and sandy lawns. Water if 10+ dry days with no rain. Not usually urgent.",
                "Late April onwards viable. Ideal timing. Surface moisture critical. Begin watering routine from day of sowing.",
              ],
              [
                "May",
                "Growth peak. ET rising sharply. Often drier than expected. First real drought stress risk, especially on chalk and sand.",
                "Begin monitoring. Start deep watering if no significant rain for 7+ days. Sandy/chalk lawns need attention first.",
                "Prime seeding month (early May). Warm soil, rising temps — fast germination. High watering demand. Up to 3× daily possible.",
              ],
              [
                "June–July",
                "Peak drought risk. ET often 4–5 mm/day. Hosepipe bans possible. Most lawn complaints.",
                "Full irrigation regime. Sandy/chalk: every 4–6 days at 20–25 mm. Clay: every 10–14 days, slowly applied. Watch for dormancy trigger.",
                "Viable but highest risk — very high watering demand, and new seedlings die fast in heat. Only seed June/July with guaranteed irrigation. Not recommended for most customers.",
              ],
              [
                "August",
                "Continues dry and hot. ET still high. Some late summer storms.",
                "Maintain irrigation. If dormancy has set in, follow dormancy re-wetting protocol. Begin planning autumn recovery.",
                "Possible from mid-August as temperatures begin to moderate. Good establishment window with reliable irrigation.",
              ],
              [
                "Sept–Oct",
                "Best all-round period for lawn renovation. Warm soil, cooler air, rising rainfall, lower ET.",
                "Reduce watering as rainfall returns. Deep water only if extended dry spell. Soil usually begins self-managing by late Oct.",
                "Optimal seeding window. Best germination and establishment success rate. Water 1–2× daily initially; rainfall often takes over within 2–3 weeks.",
              ],
              [
                "Nov–Dec",
                "Low ET, frequent rain, soil near or at FC. Frost risk.",
                "No watering needed. Grass may be dormant.",
                "Too cold for reliable germination. Frost risk damages seedlings. Avoid.",
              ],
            ],
          },
        ],
      },

      /* ── TECHNICIAN IN-FIELD CHECKLIST ──────────────────────── */
      {
        kind: "steps",
        id: "technician-checks",
        title: "Technician: diagnosing watering issues on a visit",
        intro:
          "When a lawn shows drought stress signs, work through this sequence before advising the customer.",
        steps: [
          {
            title: "Identify the stress stage",
            blocks: [
              {
                kind: "table",
                headers: ["What you see", "Stage", "Action"],
                rows: [
                  ["Footprints visible, grass dull blue-green", "Early stress — turgidity lost", "Water tonight or tomorrow. One deep watering will fix it."],
                  ["Leaf roll visible, grass grey-green", "Moderate stress", "Water today. Repeat in 5–7 days. Check soil type — may need to increase frequency."],
                  ["Straw colour, no growth, dry at 5 cm depth", "Dormancy or near-dormancy", "Do not apply heavy irrigation. Rehydrate gradually over 7–14 days."],
                  ["Patches of dead grass, roots pull free", "Root death — permanent damage", "Assess extent. May need overseeding in autumn. Adjust watering regime urgently."],
                ],
              },
            ],
            output: "Clear picture of stress severity before advising.",
          },
          {
            title: "Check the soil",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Push a screwdriver or soil probe to 10–15 cm — does it go in easily or is the soil iron-hard?",
                  "If iron-hard: clay has dried and cracked — slow rehydration protocol needed",
                  "If dry at 5 cm but loose: sandy / chalk — increase frequency",
                  "If moist below 5 cm: roots may be too shallow — stress from shallow rooting, not lack of water overall",
                ],
              },
            ],
            output: "Understand whether the problem is under-watering, wrong technique, or shallow roots.",
          },
          {
            title: "Ask about the customer's watering habits",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "How long do they water for? (volume, not time, is what matters — ask if they use a sprinkler or hosepipe and estimate mm applied)",
                  "What time of day? (evening watering increases disease risk)",
                  "How often? (daily shallow watering is common and counter-productive on established lawns)",
                  "Are they under a hosepipe ban? (Southern Water or Thames Water restrictions in force?)",
                ],
              },
            ],
            output: "Identify the specific watering mistake to correct.",
          },
          {
            title: "Assess grass species",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Does the lawn have significant fine fescue content? (Blue-green, fine-leaved, often in drier or older lawns) — advise less watering needed than they think",
                  "Is it predominantly annual meadow grass? (Pale green, flat leaves, dies in drought) — set expectation that dead patches are Poa annua, not true lawn grass",
                  "Primarily ryegrass? — most demanding; ensure deep watering advice is followed precisely",
                ],
              },
            ],
          },
          {
            title: "Confirm whether it's a newly seeded area",
            blocks: [
              {
                kind: "callout",
                tone: "warning",
                title: "Never give established-lawn watering advice for new seed",
                text: "If any area was overseeded or newly sown in the last 8 weeks, it requires a separate and completely different regime. Clarify what was done and when before giving any watering advice.",
              },
            ],
          },
        ],
      },

      /* ── HOSEPIPE BAN GUIDANCE ──────────────────────────────── */
      {
        kind: "notes",
        id: "hosepipe-ban",
        title: "Hosepipe ban — what customers can and cannot do",
        blocks: [
          {
            kind: "paragraph",
            text: "Southern Water and Thames Water serve the majority of our area. Both have imposed temporary use bans (TUBs) in recent dry summers. During a ban, use of a hosepipe connected to a tap to water a garden or lawn is prohibited.",
          },
          {
            kind: "table",
            headers: ["Activity", "Permitted during ban?"],
            rows: [
              ["Hosepipe connected to mains tap — watering lawn", "No"],
              ["Watering can filled from tap — watering lawn", "Yes"],
              ["Using water from a water butt", "Yes — always"],
              ["Drip/trickle irrigation connected to mains", "No (usually — check the specific ban notice)"],
              ["Watering newly seeded lawns (some bans exempt new seed)", "Check the specific ban — exemptions vary"],
              ["Commercial irrigation for a business", "Separate licence — not a domestic TUB issue"],
            ],
          },
          {
            kind: "callout",
            tone: "info",
            title: "Proactive advice to customers",
            text: "In spring, advise at-risk customers (sandy/chalk soils, newly seeded lawns) to install a water butt and to check their water company's drought restrictions page. We can't control the ban, but we can ensure customers aren't caught off guard.",
          },
        ],
      },

      /* ── CUSTOMER GUIDE ─────────────────────────────────────── */
      {
        kind: "steps",
        id: "customer-guide",
        title: "Simple guide for customers — what to tell them",
        intro:
          "Plain English — no jargon. Use this when explaining watering to a customer over the phone or on a visit. Each step covers a key topic you can work through with them.",
        steps: [
          {
            title: "Established lawn: the basics",
            blocks: [
              {
                kind: "audience",
                label: "Customer-Facing",
              },
              {
                kind: "paragraph",
                text: "This is what to tell a customer with an existing, established lawn:",
              },
              {
                kind: "bullets",
                items: [
                  "Water deeply but not too often — aim for a good long soak once or twice a week rather than a quick spray every day.",
                  "You want the water to reach about 15 cm into the soil. A quick test: push a screwdriver in after watering — it should go in smoothly to that depth.",
                  "Best time to water is early morning. This means less water is lost to evaporation and the grass dries before evening, which reduces disease risk.",
                  "Don't water in short bursts every day — this keeps moisture only at the surface and trains the roots to stay shallow. Shallow roots make the lawn less resilient in dry spells.",
                  "In our area, a sandy or chalky lawn needs watering around every 5–7 days in a dry spell. A heavier clay-type lawn can often go 10–14 days.",
                ],
              },
            ],
            output: "Customer understands deep and infrequent watering principle.",
          },
          {
            title: "Established lawn: what to look for",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Walk across the lawn and look back. If your footprints stay visible and the grass doesn't spring back, it's time to water.",
                  "If the grass starts to look grey-blue instead of bright green, act quickly — this is the plant telling you it's running out of water.",
                  "Brown and straw-coloured grass doesn't always mean it's dead. In dry summers, lawns go dormant — they're alive but resting. Most will recover when rain returns or you resume watering.",
                ],
              },
              {
                kind: "callout",
                tone: "success",
                title: "Reassurance about dormancy",
                text: "A brown lawn in August is not always dead. Cool-season grasses like ryegrass and fescue can go dormant and fully recover. The lawn is very likely still alive — it has just paused growth to conserve water. It will green up again when moisture returns.",
              },
            ],
          },
          {
            title: "Established lawn: common mistakes to avoid",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "Watering little and often — this creates shallow roots and makes things worse over time.",
                  "Watering in the middle of a sunny day — you don't lose as much as people think, but morning is still best.",
                  "Watering when the lawn is already dormant — if the grass has gone fully brown, don't suddenly flood it. Give it a light soak every few days and gradually increase as it starts to come back.",
                  "Expecting results overnight — a stressed lawn needs a good watering and then 7–10 days of continued moisture to fully recover.",
                ],
              },
            ],
          },
          {
            title: "New seed: completely different advice",
            blocks: [
              {
                kind: "callout",
                tone: "warning",
                title: "Important — new seed needs watering differently",
                text: "If your lawn has been newly seeded or overseeded, ignore everything above. New seed needs the opposite approach.",
              },
              {
                kind: "bullets",
                items: [
                  "The seed can only get water from the very top layer of soil — just 5 mm. If that dries out, the seed or seedlings will die.",
                  "Water little and often — 2–3 times a day in warm weather, at least once a day in cooler conditions.",
                  "Use a sprinkler or a gentle setting on a hose — avoid a strong jet that will move the seed around.",
                  "Keep going until the grass is about 5 cm (2 inches) tall and has been cut for the first time.",
                  "After the first cut, gradually water less often but more at each session — moving toward the once-or-twice-a-week routine over the next few weeks.",
                ],
              },
            ],
            output: "Customer understands why new seed needs different treatment.",
          },
          {
            title: "When we get a hosepipe ban",
            blocks: [
              {
                kind: "bullets",
                items: [
                  "You cannot use a hosepipe or sprinkler connected to your mains tap during a ban.",
                  "You can use a watering can filled from the tap — it's just slower.",
                  "If you have a water butt, now is the time to use it — butt water is always allowed.",
                  "For a large lawn, a watering can is often not practical enough. In this case, focus on areas that matter most (near the house, newly seeded areas) and accept that the lawn may go brown. It will recover.",
                  "Always check your water company's website for exact ban rules — some bans include exemptions for new turf or newly seeded lawns.",
                ],
              },
            ],
          },
          {
            title: "Quick reference: how much and how often?",
            blocks: [
              {
                kind: "table",
                headers: ["Lawn type", "How much each time", "How often in dry weather"],
                rows: [
                  ["Established — sandy or chalky soil", "20–25 mm (about 20 minutes with a standard sprinkler)", "Every 5–7 days"],
                  ["Established — clay or mixed soil", "20–25 mm, applied slowly in 2–3 passes", "Every 10–14 days"],
                  ["New seed — before germination", "Light misting, 3–5 mm", "2–3 times a day"],
                  ["New seed — seedlings visible, pre-cut", "5–8 mm", "Once daily"],
                  ["New seed — after first cut", "Gradually increase to 20 mm", "Extend from every 2–3 days up to weekly"],
                ],
              },
            ],
            output: "Customer has a clear, practical reference to follow.",
          },
        ],
      },

      /* ── NOTES ─────────────────────────────────────────────── */
      {
        kind: "notes",
        id: "regional-notes",
        title: "Regional notes for our specific area",
        blocks: [
          {
            kind: "keyvalue",
            items: [
              {
                label: "Hampshire (Test Valley, Winchester, South Downs fringe)",
                value:
                  "Predominantly chalk and thin calcareous soils. Extremely fast-draining. Water retention is very low — these are some of the most drought-vulnerable lawns in our patch. Established lawns need watering every 4–6 days in a dry spell. Customers often underestimate how quickly chalk drains. Fescues perform significantly better than ryegrass on chalk — factor into overseeding recommendations.",
              },
              {
                label: "Surrey (Guildford, Godalming, Dorking, Epsom belt)",
                value:
                  "Mixed — greensand and sandy loam in the south-west (very fast draining, similar to chalk), London Clay in the north (slow draining, but shrinks severely when dry). Identify the soil type on first visit — advice differs significantly between north and south Surrey.",
              },
              {
                label: "Berkshire (Camberley, Sandhurst, Bracknell area)",
                value:
                  "Largely sandy/heathland soils (greensand, Bagshot Sand). Among the most drought-susceptible lawns in our whole area. These lawns often look brown by mid-June in a dry year. Manage customer expectations early in the season — these lawns will struggle without regular irrigation.",
              },
              {
                label: "West Sussex (Chichester Plain, South Downs, Horsham)",
                value:
                  "South Downs fringe: chalk, very similar to Hampshire. Coastal plain (Chichester area): generally more loamy, better water retention. Horsham and north: heavier soils, slower drainage. Significant variation across the county — assess on a property-by-property basis.",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const getHowToGuide = (id: string) =>
  howToGuides.find((g) => g.id === id);
