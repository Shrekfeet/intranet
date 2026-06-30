import * as React from "react";
import {
  Home,
  Wrench,
  Calendar,
  FileText,
  Sprout,
  Phone,
  HelpCircle,
  Tag,
  ClipboardList,
  Scale,
  PartyPopper,
  Leaf,
  ShieldCheck,
  Building2,
  CalendarDays,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.ico";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type SidebarItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: string;
};

const generalItems: SidebarItem[] = [
  { title: "Dashboard", url: "/", icon: Home, exact: true },
  { title: "Welcome Pack", url: "/welcome", icon: PartyPopper, exact: true, badge: "In Dev" },
  { title: "How-To Guides", url: "/how-to", icon: HelpCircle, badge: "In Dev" },
  { title: "Seasonal Calendar", url: "/seasonal-calendar", icon: CalendarDays, exact: true },
  { title: "Policies & Docs", url: "/policies", icon: FileText, exact: true },
];

const operationsItems: SidebarItem[] = [
  { title: "Troubleshooting Hub", url: "/operations", icon: Wrench, exact: true, badge: "In Dev" },
  { title: "Scheduling Hub", url: "/scheduling", icon: Calendar, exact: true, badge: "In Dev" },
];

const knowledgeItems: SidebarItem[] = [
  { title: "Lawn ID", url: "/lawn-id", icon: Leaf, exact: true, badge: "In Dev" },
  { title: "Supplier Directory", url: "/suppliers", icon: Building2, exact: true },
  { title: "Account Flags", url: "/account-flags", icon: Tag, exact: true },
  { title: "Condition Codes", url: "/condition-codes", icon: ClipboardList, exact: true },
  { title: "Terms & Disputes", url: "/terms", icon: Scale, exact: true },
];

const trainingItems: SidebarItem[] = [
  { title: "Technician Path", url: "/modules?role=technician", icon: Sprout, badge: "In Dev" },
  { title: "Office Path", url: "/modules?role=office", icon: Phone, badge: "In Dev" },
];

const SIDEBAR_SCROLL_KEY = "sf-sidebar-scroll";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { isAdmin } = useAuth();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
    if (saved) el.scrollTop = Number(saved) || 0;
    const onScroll = () => {
      sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(el.scrollTop));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent ref={scrollRef}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-2.5">
          <img src={logo} alt="Shrekfeet logo" className="h-8 w-8 rounded-lg object-contain flex-shrink-0" />
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-heading text-base text-sidebar-foreground tracking-tight leading-tight">
                Shrekfeet
              </span>
              <span className="text-[10px] font-body font-bold px-1.5 py-0.5 rounded bg-sidebar-foreground/20 text-sidebar-foreground uppercase tracking-wider flex-shrink-0">
                Live
              </span>
            </div>
          )}
        </div>

        <NavGroup label="General" items={generalItems} collapsed={collapsed} location={location} />
        <NavGroup label="Operations" items={operationsItems} collapsed={collapsed} location={location} />
        <NavGroup label="Knowledge" items={knowledgeItems} collapsed={collapsed} location={location} />
        <NavGroup label="Training" items={trainingItems} collapsed={collapsed} location={location} />
        {isAdmin && (
          <NavGroup
            label="Admin"
            items={[{ title: "Team Progress", url: "/admin", icon: ShieldCheck, exact: true }]}
            collapsed={collapsed}
            location={location}
          />
        )}
      </SidebarContent>
    </Sidebar>
  );
}

function NavGroup({
  label,
  items,
  collapsed,
  location,
}: {
  label: string;
  items: SidebarItem[];
  collapsed: boolean;
  location: ReturnType<typeof useLocation>;
}) {
  return (
    <SidebarGroup className="py-1">
      <SidebarGroupLabel className="text-[11px] uppercase tracking-wider opacity-80">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active = isItemActive(item, location);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={cn(
                      "flex items-center rounded-md px-2 py-1 hover:bg-sidebar-accent/50 transition-colors border-l-2",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-sidebar-primary"
                        : "border-transparent",
                    )}
                  >
                    <item.icon className={cn("mr-2 h-4 w-4 flex-shrink-0", active ? "text-sidebar-foreground" : "text-sidebar-foreground/80")} />
                    {!collapsed && (
                      <span className="flex items-center gap-1.5 min-w-0 flex-1">
                        <span className="text-sm truncate">{item.title}</span>
                        {item.badge && (
                          <span className="text-[9px] font-body font-bold uppercase tracking-wide px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-600 flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function isItemActive(item: SidebarItem, location: ReturnType<typeof useLocation>) {
  const target = new URL(item.url, "https://lovable.local");
  const current = new URL(`${location.pathname}${location.search}`, "https://lovable.local");

  if (target.pathname !== current.pathname) return false;
  if (item.exact) return target.search === current.search;
  if (!target.search) return current.pathname === target.pathname;

  return Array.from(target.searchParams.entries()).every(
    ([key, value]) => current.searchParams.get(key) === value,
  );
}
