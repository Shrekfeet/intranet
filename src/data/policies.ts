export type PolicyCategory = "Health & Safety" | "HR" | "Operations" | "Compliance" | "Customer";

export interface Policy {
  id: string;
  title: string;
  category: PolicyCategory;
  summary: string;
  updated: string; // ISO date
  body: string; // markdown-ish plain text
}

export const policies: Policy[] = [
  {
    id: "health-and-safety",
    title: "Health & Safety Policy",
    category: "Health & Safety",
    summary: "Our overarching commitment to safe working practices on every site.",
    updated: "2025-03-10",
    body: `## Purpose
GreenCrew is committed to providing a safe working environment for all employees, customers and members of the public.

## Responsibilities
- **Management** is responsible for risk assessments, equipment maintenance and training.
- **Crew members** are responsible for following safe working practices and reporting hazards.

## Key requirements
1. Complete a site-specific risk assessment before starting any new job.
2. Wear PPE at all times when operating equipment.
3. Report all near-misses and incidents within 24 hours.
4. Never operate machinery whilst impaired by fatigue, medication, alcohol or drugs.

## Review
This policy is reviewed annually or after any significant incident.`,
  },
  {
    id: "ppe-policy",
    title: "PPE Policy",
    category: "Health & Safety",
    summary: "Mandatory personal protective equipment for each task type.",
    updated: "2025-02-18",
    body: `## Mandatory PPE by task

| Task | PPE |
|------|-----|
| Mowing | Safety boots, eye protection, ear defenders, hi-vis |
| Strimming | Boots, eye protection, ear defenders, leg guards, hi-vis |
| Chemical application | Nitrile gloves, eye protection, RPE per SDS, coveralls |
| Roadside work | Hi-vis vest or jacket at all times |

## Care and replacement
- Inspect PPE at the start of each shift.
- Replace any damaged item before starting work.
- Replacement PPE is supplied free of charge — speak to your supervisor.`,
  },
  {
    id: "vehicle-use",
    title: "Vehicle Use Policy",
    category: "Operations",
    summary: "Rules for the use of company vans, trailers and towing equipment.",
    updated: "2025-01-22",
    body: `## Driver requirements
- Hold a valid UK driving licence appropriate to the vehicle/trailer category.
- Disclose any change in licence status (points, medical) immediately.

## Daily checks
Complete the daily walk-around check before driving:
- Tyres, lights, fluids, mirrors, wipers, load security.

## Trailers
- Always perform a coupling check before moving.
- Maximum legal speed on trailers: 50 mph dual carriageway / 60 mph motorway.

## Incidents
Report all incidents and damage on the day, with photos.`,
  },
  {
    id: "uniform",
    title: "Uniform & Appearance",
    category: "HR",
    summary: "How we present ourselves to customers on every visit.",
    updated: "2024-11-04",
    body: `## Uniform standard
- Branded polo or t-shirt (clean, no significant stains).
- Branded fleece or jacket in cooler weather.
- Hi-vis when on roadside or busy commercial sites.
- Safety boots — no trainers on site.

## Appearance
- Smart, tidy presentation.
- Visible ID badge.
- Long hair tied back when operating machinery.`,
  },
  {
    id: "chemical-handling",
    title: "Chemical Handling & Storage",
    category: "Compliance",
    summary: "COSHH-aligned handling of fertilisers, herbicides, fungicides and pesticides.",
    updated: "2025-04-01",
    body: `## Before use
- Read the Safety Data Sheet (SDS).
- Confirm the operator holds the correct PA1/PA6 qualifications for pesticide application.
- Calculate the correct dose for the area to be treated.

## During use
- Wear PPE specified by the SDS.
- Do not eat, drink or smoke.
- Avoid application in wind speeds above 10 mph or before forecast rain.

## Storage and disposal
- Store in original containers in the locked chemical cabinet.
- Triple-rinse empty containers and dispose of as hazardous waste.
- Maintain the application logbook for every treatment.`,
  },
  {
    id: "customer-communication",
    title: "Customer Communication Standards",
    category: "Customer",
    summary: "How we contact, update and respond to customers.",
    updated: "2025-03-28",
    body: `## Tone
Friendly, professional, plain English. No jargon without explanation.

## Response times
- New enquiries: respond same business day.
- Existing customer queries: respond within 4 working hours.
- Complaints: acknowledge same day, full response within 48 hours.

## On-site
- Knock to announce arrival on residential jobs.
- Leave a service card or message confirming what was done.
- Photograph any concerns and flag to the office.

## Complaints
Always thank the customer for raising it, listen fully, and never argue on the doorstep — escalate to the office.`,
  },
  {
    id: "incident-reporting",
    title: "Incident & Near-miss Reporting",
    category: "Health & Safety",
    summary: "What to report, when, and to whom.",
    updated: "2025-02-02",
    body: `## What to report
- Any injury, however minor.
- Any damage to property (ours or the customer's).
- Any near-miss — incidents that could have caused harm.

## How to report
1. Make the area safe.
2. Inform your supervisor immediately by phone.
3. Complete the incident form within 24 hours.
4. Provide photos where possible.

## RIDDOR
Specified injuries, dangerous occurrences and over-7-day injuries are reportable to the HSE. The office handles RIDDOR submissions.`,
  },
  {
    id: "leave-and-absence",
    title: "Leave & Absence",
    category: "HR",
    summary: "Booking holiday and reporting sickness.",
    updated: "2024-12-15",
    body: `## Holiday
- Submit holiday requests at least 4 weeks in advance via the office.
- Peak season (April–September) requests handled on a first-come basis.

## Sickness
- Notify your supervisor by 7am on the day.
- Self-certify for absences up to 7 days; fit note required after.

## Compassionate / emergency leave
Speak to the office — handled case by case.`,
  },
];

export const policyCategories: PolicyCategory[] = [
  "Health & Safety",
  "HR",
  "Operations",
  "Compliance",
  "Customer",
];

export function getPolicy(id: string) {
  return policies.find((p) => p.id === id);
}
