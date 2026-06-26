export type WhatsNewKind = "module" | "triage" | "lawn-id" | "policy" | "scheduling" | "suppliers" | "calendar";

export interface WhatsNewItem {
  id: string;
  date: string; // ISO date
  kind: WhatsNewKind;
  title: string;
  description: string;
  href: string;
}

export const whatsNew: WhatsNewItem[] = [
  {
    id: "wn-suppliers",
    date: "2026-06-26",
    kind: "suppliers",
    title: "Supplier Directory launched",
    description: "All 36 active suppliers with contacts, payment terms and service details — searchable and filterable by category.",
    href: "/suppliers",
  },
  {
    id: "wn-seasonal-calendar",
    date: "2026-06-26",
    kind: "calendar",
    title: "Seasonal Treatment Calendar added",
    description: "Month-by-month lawn care programme for Hampshire, Berkshire, West Sussex and Surrey — with this month's focus highlighted.",
    href: "/seasonal-calendar",
  },
  {
    id: "wn-lawn-id",
    date: "2025-04-20",
    kind: "lawn-id",
    title: "Lawn ID knowledge centre launched",
    description: "Identify grasses, pests, diseases, weeds and abiotic issues with linked treatment guides.",
    href: "/lawn-id",
  },
  {
    id: "wn-policies",
    date: "2025-04-20",
    kind: "policy",
    title: "Policies & Documents area added",
    description: "All company policies — H&S, HR, Operations, Compliance and Customer — in one place.",
    href: "/policies",
  },
  {
    id: "wn-scheduling",
    date: "2025-04-20",
    kind: "scheduling",
    title: "Scheduling Hub now live",
    description: "Lessons on route planning, weather decisions and key-account priority, plus interactive tools.",
    href: "/scheduling",
  },
  {
    id: "wn-smart-triage",
    date: "2025-04-18",
    kind: "triage",
    title: "Smart Triage added to Operations",
    description: "Universal entry point that routes any issue to the right troubleshooting flow.",
    href: "/operations/smart-triage",
  },
  {
    id: "wn-ops-hub",
    date: "2025-04-17",
    kind: "triage",
    title: "Operations Hub & 5 triage flows",
    description: "Step-by-step decision trees for weed control, yellow lawn, moss, bare patches and cut quality.",
    href: "/operations",
  },
  {
    id: "wn-modules",
    date: "2025-04-12",
    kind: "module",
    title: "Training modules expanded",
    description: "Five core onboarding modules covering safety, mowing, equipment, customer service and lawn health.",
    href: "/modules",
  },
];
