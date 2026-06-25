export type TermsCategory =
  | "Cancellation & Ending"
  | "Payment & Pricing"
  | "Access & Lockouts"
  | "Complaints & Remediation"
  | "Liability & Damage"
  | "Service Changes"
  | "Garden Condition";

export interface TermsClause {
  id: string;
  title: string;
  category: TermsCategory;
  summary: string;
  keyPoints: string[];
  /** What office staff should say / do when this comes up in a dispute. */
  officeGuidance?: string[];
  /** Reference to the matching numbered clause(s) in the published T&Cs. */
  reference: string;
}

export const termsCategories: TermsCategory[] = [
  "Cancellation & Ending",
  "Payment & Pricing",
  "Access & Lockouts",
  "Complaints & Remediation",
  "Liability & Damage",
  "Service Changes",
  "Garden Condition",
];

export const termsClauses: TermsClause[] = [
  // --- Cancellation & Ending ---
  {
    id: "auto-renewal",
    title: "Services auto-renew each year",
    category: "Cancellation & Ending",
    summary:
      "Treatment plans are an ongoing maintenance service and auto-renew annually unless the customer instructs us otherwise.",
    keyPoints: [
      "Default is auto-renewal — silence is not cancellation.",
      "To stop renewal, the customer must contact us in writing.",
    ],
    officeGuidance: [
      "If the customer says 'I never asked to renew', point to clause 6.2 — renewal is the default.",
      "Confirm whether they want to cancel now and follow the cancellation rules in clause 7.",
    ],
    reference: "6.2",
  },
  {
    id: "cancellation-12-month",
    title: "Cancellation within the first 12 months",
    category: "Cancellation & Ending",
    summary:
      "Customers can cancel a treatment plan within the first 12 months, but a charge may apply equal to the lower of the remaining payments due to the end of the 12-month period or £100.",
    keyPoints: [
      "Charge = whichever is LOWER: remaining payments to end of year 1, OR £100.",
      "The agreement still ends immediately on request.",
      "Outstanding invoices must still be settled.",
    ],
    officeGuidance: [
      "Calculate remaining scheduled visits × price, compare to £100, charge the smaller figure.",
      "Send written confirmation that the plan has ended and the cancellation fee invoice.",
    ],
    reference: "7.3",
  },
  {
    id: "cancellation-short-notice",
    title: "Cancellation within 3 working days of an appointment",
    category: "Cancellation & Ending",
    summary:
      "If a customer cancels within 3 working days of a scheduled appointment, 50% of the service charge is incurred.",
    keyPoints: [
      "Applies to short-notice cancellations of an already-scheduled visit.",
      "Charge = 50% of the service price.",
    ],
    officeGuidance: [
      "Check the scheduled date vs the cancellation date — count working days only.",
      "Raise the 50% charge and explain the reason in writing.",
    ],
    reference: "7.3",
  },
  {
    id: "cooling-off-14-days",
    title: "14-day cooling off after estimate",
    category: "Cancellation & Ending",
    summary:
      "Customers can cancel without reason within 14 days of accepting an estimate, provided we haven't already notified them of a scheduled visit.",
    keyPoints: [
      "Free cancellation only if NO scheduled visit has been notified within those 14 days.",
      "After 14 days, lawn renovation services (scarification, aeration, over-seeding, top-dressing) attract a 15% cancellation fee on the total invoice value.",
    ],
    officeGuidance: [
      "Check the date the estimate was accepted and whether a visit date was issued.",
      "For renovation cancellations after 14 days, raise the 15% fee.",
    ],
    reference: "7.4",
  },
  {
    id: "cancellation-for-cause",
    title: "Cancellation for a valid reason (no fee)",
    category: "Cancellation & Ending",
    summary:
      "Customers can end the agreement immediately and get a full refund for unprovided services if any of clause 7.2's reasons apply.",
    keyPoints: [
      "Reasons include: change of terms they don't accept, error in price/description, delay >3 months due to events outside our control, suspension >3 months, or our breach.",
      "Outstanding invoices for services already delivered must still be settled.",
    ],
    officeGuidance: [
      "Identify whether the customer's reason maps to one of the 7.2 grounds — if yes, no cancellation fee.",
      "Refund any prepaid value for services not yet delivered.",
    ],
    reference: "7.2",
  },
  {
    id: "we-end-agreement",
    title: "When we can end the agreement",
    category: "Cancellation & Ending",
    summary:
      "We can end the agreement if the customer fails to pay (after a 7-day reminder), fails to provide required information, or fails to give us access.",
    keyPoints: [
      "Trigger after a written 7-day payment reminder is ignored.",
      "We may deduct reasonable compensation per clauses 7.3/7.4 from any refund.",
    ],
    officeGuidance: [
      "Always send a written 7-day reminder before suspending or ending the account.",
      "Document the reason and refund balance calculation.",
    ],
    reference: "8.1, 8.2",
  },

  // --- Payment & Pricing ---
  {
    id: "payment-due-on-day",
    title: "Payment is due on the day of service",
    category: "Payment & Pricing",
    summary:
      "Payment is due on the day the service is completed unless agreed otherwise in writing. We do not offer credit without prior written notification.",
    keyPoints: [
      "Statutory interest accrues daily on overdue invoices from the due date.",
      "We do not accept cash or cheque payments.",
    ],
    officeGuidance: [
      "If a customer disputes statutory interest, point to clause 9.7 — it accrues automatically.",
      "Confirm any non-standard payment terms are recorded in writing on the account.",
    ],
    reference: "9.7",
  },
  {
    id: "advance-payment-1000",
    title: "50% advance for jobs over £1,000",
    category: "Payment & Pricing",
    summary:
      "For services valued above £1,000 (including VAT), we may request a 50% advance payment before starting work.",
    keyPoints: [
      "Balance is invoiced on completion.",
      "Each invoice is due when presented.",
    ],
    reference: "10.7",
  },
  {
    id: "price-adjustments",
    title: "Pricing changes for unforeseen work",
    category: "Payment & Pricing",
    summary:
      "If a job needs more work than originally quoted (size changes, thatch, grubs, stones, access issues), we re-quote rather than performing the wrong service level.",
    keyPoints: [
      "Treatment areas larger than estimated are re-priced per current published charts.",
      "We reserve the right to charge the correct price even if the original estimate was lower.",
      "Customer is responsible for ensuring the estimated area matches reality.",
    ],
    officeGuidance: [
      "If a customer disputes the price uplift, refer to clauses 10.4–10.6 and the technician's site notes.",
    ],
    reference: "10.4, 10.5, 10.6",
  },
  {
    id: "pricing-errors",
    title: "Pricing errors",
    category: "Payment & Pricing",
    summary:
      "If a quoted price is obviously wrong, we may end the agreement and refund. If the correct price is lower, we charge the lower amount.",
    keyPoints: [
      "Genuine mispricing the customer should reasonably have spotted = we can void the order.",
    ],
    reference: "10.3",
  },
  {
    id: "vat-changes",
    title: "VAT rate changes",
    category: "Payment & Pricing",
    summary:
      "If the VAT rate changes between order date and service date, we adjust the rate, unless the customer has already paid in full.",
    keyPoints: ["Prepaid in full = the original VAT rate sticks."],
    reference: "10.2",
  },

  // --- Access & Lockouts ---
  {
    id: "lockouts",
    title: "Lockouts — 50% charge",
    category: "Access & Lockouts",
    summary:
      "If we can't access the property on a scheduled visit after notifying the customer, we may charge 50% of the service price to cover incurred losses.",
    keyPoints: [
      "Charge applies once a scheduled date has been notified.",
      "Treatment is then rescheduled at full price.",
    ],
    officeGuidance: [
      "Verify the technician's lockout note and the original visit notification before raising the charge.",
      "Send the lockout charge invoice with a clear explanation referencing clause 6.4.",
    ],
    reference: "6.4",
  },
  {
    id: "cancellation-confirmation",
    title: "Cancelling a scheduled appointment",
    category: "Access & Lockouts",
    summary:
      "Appointment cancellations must be made by email AND the customer must receive our written confirmation. Without our confirmation, the appointment stands.",
    keyPoints: [
      "No confirmation from us = the appointment is still scheduled.",
      "Phone/voicemail messages do not count as cancellation.",
    ],
    officeGuidance: [
      "If a customer says 'I cancelled by phone', refer to clause 6.4(1) — written confirmation required.",
      "Always reply to email cancellations promptly with confirmation so the trail is clean.",
    ],
    reference: "6.4(1)",
  },
  {
    id: "access-information",
    title: "Customer must provide access info",
    category: "Access & Lockouts",
    summary:
      "Customers must give us property access, up-to-date contact details, and the location of irrigation, shallow pipes, washing-line holders and other hidden hazards.",
    keyPoints: [
      "Failure can lead to ending the agreement OR an additional reasonable charge.",
      "Late or missing information is the customer's risk, not ours.",
    ],
    reference: "6.5",
  },
  {
    id: "partial-access",
    title: "Partial access on the day",
    category: "Access & Lockouts",
    summary:
      "If access restrictions stop us doing part of the service, the full price still applies — this is outside our control.",
    keyPoints: ["Customer is liable for the full quoted price even if part of the area is inaccessible."],
    reference: "10.8",
  },

  // --- Complaints & Remediation ---
  {
    id: "complaint-timeframes",
    title: "Complaint reporting timeframes",
    category: "Complaints & Remediation",
    summary:
      "Customers must report problems within set timeframes or we may refuse action due to lack of evidence.",
    keyPoints: [
      "General complaints / aeration: within 2 weeks of the service.",
      "Treatment-related complaints: within 3 weeks of the service.",
      "Renovation-related complaints: within 2 months of the service.",
    ],
    officeGuidance: [
      "Always check the date the service was completed against the date the complaint was raised.",
      "If outside the window, we may decline action — but always handle the conversation politely.",
    ],
    reference: "9.3",
  },
  {
    id: "complaint-acknowledgement",
    title: "How we handle a complaint",
    category: "Complaints & Remediation",
    summary:
      "We acknowledge promptly, investigate with a senior person, and respond comprehensively within 28 days (or up to 8 weeks max with notice).",
    keyPoints: [
      "Initial response target: 28 days.",
      "If not possible, notify the customer and extend up to 8 weeks total.",
      "Customer Experience Manager owns client-care issues.",
    ],
    reference: "9.4",
  },
  {
    id: "complaint-escalation",
    title: "Escalation & Legal Ombudsman",
    category: "Complaints & Remediation",
    summary:
      "If still dissatisfied, a senior manager not involved in the matter reviews the decision within 28 days. After that, the Legal Ombudsman Service can be contacted within 6 months.",
    keyPoints: [
      "Internal review: 28 days from the customer's request.",
      "Ombudsman window: within 6 months of our final response.",
    ],
    reference: "9.5, 9.6",
  },
  {
    id: "third-party-overwrite",
    title: "Third-party remediation voids our liability",
    category: "Complaints & Remediation",
    summary:
      "If the customer or a third party overwrites our work without our prior agreement, our responsibility to resolve the complaint is negated.",
    keyPoints: [
      "Customer must give us the chance to remedy first.",
      "Always document this in writing if the customer mentions another contractor.",
    ],
    reference: "9.3",
  },

  // --- Liability & Damage ---
  {
    id: "damage-we-cause",
    title: "Damage we cause to the property",
    category: "Liability & Damage",
    summary:
      "We make good any damage to the property caused by us. We are not responsible for repairing pre-existing faults discovered during work.",
    keyPoints: [
      "Pre-existing damage discovered on site is not our responsibility.",
      "Photograph evidence on arrival is critical.",
    ],
    reference: "11.3",
  },
  {
    id: "no-liability-exceptions",
    title: "When we are NOT liable",
    category: "Liability & Damage",
    summary:
      "We do not accept liability for damage caused by routing through the customer's house/garage, or for damaging hidden cables/irrigation/wiring the customer didn't notify us about in writing.",
    keyPoints: [
      "Access through the property = customer's risk.",
      "Hidden services not declared in writing = customer's risk.",
      "Planters, plant pots, garden furniture, ornaments — never our liability.",
      "Spray staining of items left in treatment areas — never our liability.",
    ],
    officeGuidance: [
      "Ask: did the customer notify us in writing about hidden services? Check the account notes / flags.",
      "If items were left out, refer to clauses 11.4, 11.5 and 13.2.",
    ],
    reference: "11.4, 11.5",
  },
  {
    id: "circumstances-beyond-control",
    title: "Circumstances beyond our control",
    category: "Liability & Damage",
    summary:
      "We cannot be held responsible for weather effects, Acts of God, insect/animal damage, plant disease, new weed/moss growth after treatment, or damage caused by the customer or another contractor.",
    keyPoints: [
      "Treatments target EXISTING weeds and moss only — new growth is not a treatment failure.",
      "Poor results from the customer not following aftercare advice (watering, mowing) are not our liability.",
    ],
    officeGuidance: [
      "Many 'it didn't work' complaints fall under 14.1 — confirm aftercare was followed before accepting fault.",
    ],
    reference: "14.1",
  },

  // --- Service Changes ---
  {
    id: "events-outside-control",
    title: "Events outside our control",
    category: "Service Changes",
    summary:
      "Weather, machinery breakdown/theft, staff absence and supplier failure may delay services. We contact the customer as soon as possible and minimise the delay.",
    keyPoints: [
      "These delays do not entitle the customer to compensation.",
      "Delays beyond 3 months trigger the customer's right to end the agreement (clause 7.2).",
    ],
    reference: "6.3",
  },
  {
    id: "we-change-terms",
    title: "We can change the services or terms",
    category: "Service Changes",
    summary:
      "We may amend services or terms but will notify the customer, who can then end the agreement before changes take effect.",
    keyPoints: ["Customer's only remedy for a change they don't accept is to end the agreement."],
    reference: "5.2",
  },
  {
    id: "service-suspension",
    title: "Suspending the service",
    category: "Service Changes",
    summary:
      "We may suspend services for technical/legal reasons or for non-payment. Suspension over 3 months entitles the customer to end the agreement and get a refund of prepaid amounts.",
    keyPoints: [
      "Non-payment suspension follows a 7-day written reminder.",
    ],
    reference: "6.6, 6.7, 6.8",
  },

  // --- Garden Condition ---
  {
    id: "leaf-litter",
    title: "Leaf litter on visit day",
    category: "Garden Condition",
    summary:
      "Leaves must be cleared before our visit. Significant cover may lead to cancellation with a 50% incurred-loss charge; the treatment is then rescheduled at full price.",
    keyPoints: [
      "Light cover: technician may clear it free of charge if time allows.",
      "Significant cover: 50% charge + reschedule at full price.",
    ],
    reference: "13.2(1)",
  },
  {
    id: "dog-faeces",
    title: "Dog faeces threshold",
    category: "Garden Condition",
    summary:
      "More than 3 faeces per 100m² entitles us to cancel the visit with a 50% charge. Treatment is rescheduled at full price.",
    keyPoints: ["Threshold is per 100m² of treatment area."],
    reference: "13.2(2)",
  },
  {
    id: "obstructions",
    title: "Furniture, toys & obstructions",
    category: "Garden Condition",
    summary:
      "If items obstruct treatment areas, the technician treats around them and the full charge applies. If access is blocked entirely, the visit is rescheduled with a 50% incurred-loss charge.",
    keyPoints: [
      "We do not accept liability for damage or staining to items left in the treatment area.",
    ],
    reference: "13.2(3)",
  },
  {
    id: "waste-removal",
    title: "Garden waste removal",
    category: "Garden Condition",
    summary:
      "We are licensed for waste removal but do NOT remove garden waste unless agreed in writing in advance.",
    keyPoints: ["No agreement in writing = no removal."],
    reference: "13.1",
  },
];

// ----------------------------------------------------------------
// Decision tree for handling a customer dispute
// ----------------------------------------------------------------

export type DisputeOutcome = {
  type: "outcome";
  id: string;
  title: string;
  summary: string;
  steps: string[];
  references: string[]; // clause numbers
  tone?: "info" | "charge" | "refund" | "escalate";
};

export type DisputeQuestion = {
  type: "question";
  id: string;
  question: string;
  helper?: string;
  options: { label: string; nextId: string }[];
};

export type DisputeNode = DisputeQuestion | DisputeOutcome;

export const disputeTreeStartId = "q-topic";

export const disputeTree: Record<string, DisputeNode> = {
  // ---------- Top-level topic ----------
  "q-topic": {
    type: "question",
    id: "q-topic",
    question: "What is the dispute about?",
    options: [
      { label: "Cancellation or wanting to end the plan", nextId: "q-cancel-when" },
      { label: "A charge they don't think is fair", nextId: "q-charge-type" },
      { label: "Service quality / treatment didn't work", nextId: "q-quality-when" },
      { label: "Damage to their property", nextId: "q-damage-cause" },
      { label: "Access or lockout dispute", nextId: "q-access" },
    ],
  },

  // ---------- Cancellation branch ----------
  "q-cancel-when": {
    type: "question",
    id: "q-cancel-when",
    question: "When did they accept the estimate / start the plan?",
    options: [
      { label: "Within the last 14 days, no visit notified yet", nextId: "out-cooling-off" },
      { label: "Within the last 14 days, but a visit date has been notified", nextId: "q-cancel-reason" },
      { label: "Less than 12 months ago", nextId: "q-cancel-reason" },
      { label: "More than 12 months ago", nextId: "q-cancel-reason" },
    ],
  },
  "q-cancel-reason": {
    type: "question",
    id: "q-cancel-reason",
    question: "Are they cancelling for a valid 7.2 reason?",
    helper:
      "Valid reasons: a change to terms or services they don't accept, a price/description error, a delay >3 months outside our control, a suspension >3 months, or a breach by us.",
    options: [
      { label: "Yes — one of the 7.2 reasons applies", nextId: "out-no-fee-cancel" },
      { label: "No — they're cancelling by choice", nextId: "q-cancel-timing" },
    ],
  },
  "q-cancel-timing": {
    type: "question",
    id: "q-cancel-timing",
    question: "How close is the next scheduled visit?",
    options: [
      { label: "Within 3 working days", nextId: "out-50pct-short-notice" },
      { label: "More than 3 working days away", nextId: "q-cancel-year-one" },
    ],
  },
  "q-cancel-year-one": {
    type: "question",
    id: "q-cancel-year-one",
    question: "Are they within the first 12 months of the plan?",
    options: [
      { label: "Yes — within first 12 months", nextId: "out-year-one-fee" },
      { label: "No — past first 12 months", nextId: "q-renovation" },
    ],
  },
  "q-renovation": {
    type: "question",
    id: "q-renovation",
    question: "Is the cancellation for a lawn renovation service (scarification, aeration, over-seeding, top-dressing)?",
    options: [
      { label: "Yes — renovation service, past 14 days", nextId: "out-renovation-fee" },
      { label: "No — standard treatment plan", nextId: "out-end-no-fee" },
    ],
  },

  // ---------- Charge branch ----------
  "q-charge-type": {
    type: "question",
    id: "q-charge-type",
    question: "What charge are they disputing?",
    options: [
      { label: "Lockout / no-access charge (50%)", nextId: "out-lockout-defence" },
      { label: "Cancellation fee", nextId: "q-cancel-when" },
      { label: "Price uplift after re-measure / re-quote", nextId: "out-reprice-defence" },
      { label: "Statutory interest on overdue invoice", nextId: "out-interest-defence" },
      { label: "Garden-condition charge (leaves / dog mess / obstructions)", nextId: "out-garden-defence" },
    ],
  },

  // ---------- Quality branch ----------
  "q-quality-when": {
    type: "question",
    id: "q-quality-when",
    question: "When was the service completed vs when did they raise it?",
    options: [
      { label: "General / aeration: within 2 weeks", nextId: "q-quality-aftercare" },
      { label: "Treatment: within 3 weeks", nextId: "q-quality-aftercare" },
      { label: "Renovation: within 2 months", nextId: "q-quality-aftercare" },
      { label: "Outside the relevant window", nextId: "out-out-of-window" },
    ],
  },
  "q-quality-aftercare": {
    type: "question",
    id: "q-quality-aftercare",
    question: "Did the customer follow our aftercare advice (watering, mowing timing) and avoid third-party work over the top?",
    options: [
      { label: "Yes — aftercare followed, no third-party work", nextId: "out-investigate-quality" },
      { label: "No — aftercare missed OR third-party overwrote our work", nextId: "out-quality-defence" },
    ],
  },

  // ---------- Damage branch ----------
  "q-damage-cause": {
    type: "question",
    id: "q-damage-cause",
    question: "What was the cause of the damage?",
    options: [
      { label: "Direct damage from our equipment / staff", nextId: "out-damage-make-good" },
      { label: "Hidden cable / irrigation / pipe not declared in writing", nextId: "out-no-liability-hidden" },
      { label: "Routed through their house / garage / structure", nextId: "out-no-liability-route" },
      { label: "Planters, pots, ornaments, furniture or items left in treatment area", nextId: "out-no-liability-items" },
      { label: "Pre-existing damage discovered on site", nextId: "out-no-liability-preexisting" },
    ],
  },

  // ---------- Access branch ----------
  "q-access": {
    type: "question",
    id: "q-access",
    question: "What is the access issue?",
    options: [
      { label: "We were locked out on a scheduled visit", nextId: "out-lockout-defence" },
      { label: "Customer says they cancelled by phone / voicemail", nextId: "out-cancel-no-confirmation" },
      { label: "Part of the area was inaccessible on the day", nextId: "out-partial-access" },
    ],
  },

  // ---------- Outcomes ----------
  "out-cooling-off": {
    type: "outcome",
    id: "out-cooling-off",
    title: "Free cancellation — within 14-day cooling off",
    summary:
      "They accepted the estimate within the last 14 days and no visit has been notified. They can cancel without reason and without a fee.",
    steps: [
      "Confirm the date the estimate was accepted.",
      "Confirm no scheduled visit has been notified.",
      "End the agreement and refund any prepaid amount in full.",
      "Send written confirmation of cancellation.",
    ],
    references: ["7.4"],
    tone: "refund",
  },
  "out-no-fee-cancel": {
    type: "outcome",
    id: "out-no-fee-cancel",
    title: "End immediately, no cancellation fee",
    summary:
      "A clause 7.2 reason applies — the agreement ends immediately and we refund prepaid amounts for services not yet provided.",
    steps: [
      "Document the specific 7.2 reason in the account notes.",
      "Refund prepaid value for unprovided services.",
      "Settle any outstanding invoices for services already delivered.",
      "Send written confirmation.",
    ],
    references: ["7.2"],
    tone: "refund",
  },
  "out-50pct-short-notice": {
    type: "outcome",
    id: "out-50pct-short-notice",
    title: "50% short-notice cancellation charge applies",
    summary:
      "Cancellation is within 3 working days of the scheduled visit. 50% of the service charge is incurred to cover loss of slot.",
    steps: [
      "Confirm the scheduled date and the cancellation date — count working days only.",
      "Raise an invoice for 50% of the service price.",
      "Explain the charge in writing, citing clause 7.3.",
    ],
    references: ["7.3"],
    tone: "charge",
  },
  "out-year-one-fee": {
    type: "outcome",
    id: "out-year-one-fee",
    title: "Year-one cancellation fee — lower of remaining payments or £100",
    summary:
      "Within the first 12 months, the cancellation fee is the LOWER of the remaining scheduled payments to end of year 1, or £100.",
    steps: [
      "Calculate remaining scheduled visits × price for the rest of year 1.",
      "Compare to £100 — charge whichever is lower.",
      "End the agreement immediately and settle outstanding invoices.",
      "Send written confirmation including the fee calculation.",
    ],
    references: ["7.3"],
    tone: "charge",
  },
  "out-renovation-fee": {
    type: "outcome",
    id: "out-renovation-fee",
    title: "Renovation cancellation — 15% of total invoice",
    summary:
      "Lawn renovation cancellations outside the 14-day window attract a 15% charge on the total invoice value.",
    steps: [
      "Confirm the service falls under renovation (scarification / aeration / over-seeding / top-dressing).",
      "Raise a 15% charge on the total invoice value.",
      "Send written confirmation citing clause 7.4.",
    ],
    references: ["7.4"],
    tone: "charge",
  },
  "out-end-no-fee": {
    type: "outcome",
    id: "out-end-no-fee",
    title: "End the agreement — no further fee",
    summary:
      "Past the first 12 months, on a standard treatment plan, with no short-notice trigger — the plan can end without further fee. Any outstanding invoices still settle.",
    steps: [
      "End the plan and turn off auto-renewal.",
      "Settle any outstanding invoices.",
      "Send written confirmation.",
    ],
    references: ["6.2", "7.3"],
    tone: "info",
  },

  "out-lockout-defence": {
    type: "outcome",
    id: "out-lockout-defence",
    title: "Lockout charge stands — 50% of service price",
    summary:
      "Where we notified the customer of the visit and could not gain access, a 50% charge applies and the visit reschedules at full price.",
    steps: [
      "Confirm the visit notification was sent.",
      "Confirm the technician's lockout note (and any photo).",
      "Send the customer the charge with a clear explanation of clause 6.4.",
    ],
    references: ["6.4"],
    tone: "charge",
  },
  "out-reprice-defence": {
    type: "outcome",
    id: "out-reprice-defence",
    title: "Re-price is permitted",
    summary:
      "If the area or conditions differ from the estimate (size, thatch, grubs, stones, access), we re-quote and may charge the correct price even if higher than the original estimate.",
    steps: [
      "Show the customer the technician's site notes / measurement.",
      "Reference the published price chart.",
      "Offer to discuss alternative service options if they don't wish to proceed.",
    ],
    references: ["10.4", "10.5", "10.6"],
    tone: "info",
  },
  "out-interest-defence": {
    type: "outcome",
    id: "out-interest-defence",
    title: "Statutory interest accrues automatically",
    summary:
      "Interest accrues daily on overdue invoices from the due date until paid. We do not offer credit without prior written agreement.",
    steps: [
      "Confirm the invoice due date and the period overdue.",
      "Show the interest calculation.",
      "Politely cite clause 9.7.",
    ],
    references: ["9.7"],
    tone: "charge",
  },
  "out-garden-defence": {
    type: "outcome",
    id: "out-garden-defence",
    title: "Garden-condition charge stands",
    summary:
      "Where leaves, dog mess (>3 per 100m²) or obstructions prevented or obstructed treatment, the relevant charge applies and the visit reschedules at full price.",
    steps: [
      "Confirm the technician's notes / photos.",
      "Match to the relevant sub-clause (leaves / dog mess / obstructions).",
      "Send the customer the charge with a clear written explanation.",
    ],
    references: ["13.2"],
    tone: "charge",
  },

  "out-out-of-window": {
    type: "outcome",
    id: "out-out-of-window",
    title: "Outside the complaint window — we may decline",
    summary:
      "Reported outside the relevant timeframe (2 weeks general/aeration, 3 weeks treatment, 2 months renovation). We reserve the right to refuse action due to lack of evidence.",
    steps: [
      "Politely explain the reporting window in clause 9.3.",
      "Offer goodwill options only if commercially appropriate — do not commit to remediation.",
      "Document the decision in the account notes.",
    ],
    references: ["9.3"],
    tone: "escalate",
  },
  "out-investigate-quality": {
    type: "outcome",
    id: "out-investigate-quality",
    title: "Investigate — possible remediation owed",
    summary:
      "Inside the window and aftercare followed — we should investigate properly and remedy free of charge, or refund if remediation isn't possible.",
    steps: [
      "Acknowledge the complaint promptly.",
      "Have a senior person investigate.",
      "Aim to respond comprehensively within 28 days (max 8 weeks with notice).",
      "Either remedy free of charge or refund if remediation isn't possible.",
    ],
    references: ["9.4", "9.3"],
    tone: "escalate",
  },
  "out-quality-defence": {
    type: "outcome",
    id: "out-quality-defence",
    title: "Liability negated — aftercare missed or third-party overwrite",
    summary:
      "If aftercare advice wasn't followed, or a third party overwrote our work without our agreement, our responsibility to remedy is negated.",
    steps: [
      "Document the aftercare gap or third-party intervention.",
      "Politely explain clauses 9.3 and 14.1.",
      "Offer paid remedial options if appropriate.",
    ],
    references: ["9.3", "14.1"],
    tone: "info",
  },

  "out-damage-make-good": {
    type: "outcome",
    id: "out-damage-make-good",
    title: "We make good — damage caused by us",
    summary:
      "Direct damage caused by our equipment or staff is our responsibility — we will make good.",
    steps: [
      "Capture photo evidence and the technician's account.",
      "Agree the remediation approach with the customer.",
      "Action promptly and document the resolution.",
    ],
    references: ["11.1", "11.3"],
    tone: "refund",
  },
  "out-no-liability-hidden": {
    type: "outcome",
    id: "out-no-liability-hidden",
    title: "No liability — hidden services not declared",
    summary:
      "If the customer didn't notify us in writing of cables, irrigation or wiring before machinery work, we don't accept liability for damage to those items.",
    steps: [
      "Check the account for any prior written notification or 'irrigation' flag.",
      "Politely explain clause 11.4 in writing.",
    ],
    references: ["11.4", "6.5"],
    tone: "info",
  },
  "out-no-liability-route": {
    type: "outcome",
    id: "out-no-liability-route",
    title: "No liability — access through house / garage",
    summary:
      "Where we accessed the garden via the house, garage or adjoining structures at the customer's request, we don't accept liability for damage caused on that route.",
    steps: ["Confirm access was via the property at the customer's request.", "Cite clause 11.4 in your written reply."],
    references: ["11.4"],
    tone: "info",
  },
  "out-no-liability-items": {
    type: "outcome",
    id: "out-no-liability-items",
    title: "No liability — items left in the treatment area",
    summary:
      "We don't accept liability for damage or staining to planters, pots, ornaments, furniture or items left in the treatment area.",
    steps: ["Cite clauses 11.5 and 13.2(3) in your written reply."],
    references: ["11.5", "13.2"],
    tone: "info",
  },
  "out-no-liability-preexisting": {
    type: "outcome",
    id: "out-no-liability-preexisting",
    title: "No liability — pre-existing damage",
    summary:
      "Pre-existing damage discovered while we work is not our responsibility to repair.",
    steps: [
      "Show photos / technician notes from arrival.",
      "Cite clause 11.3 in writing.",
    ],
    references: ["11.3"],
    tone: "info",
  },
  "out-cancel-no-confirmation": {
    type: "outcome",
    id: "out-cancel-no-confirmation",
    title: "Cancellation invalid without our written confirmation",
    summary:
      "Cancellations must be made by email AND the customer must receive our written confirmation. Without it, the appointment stood.",
    steps: [
      "Search inbox for any prior cancellation email from the customer.",
      "If none, politely explain clause 6.4(1) — phone / voicemail is not enough.",
      "If there's evidence we received but didn't reply, treat as cancelled and waive the lockout charge.",
    ],
    references: ["6.4"],
    tone: "info",
  },
  "out-partial-access": {
    type: "outcome",
    id: "out-partial-access",
    title: "Full price applies for partial access",
    summary:
      "Where access restrictions stop us doing part of the area, the full price still applies — this is outside our control.",
    steps: ["Cite clause 10.8 in your written reply.", "Confirm the parts that were treated in the technician's notes."],
    references: ["10.8"],
    tone: "info",
  },
};
