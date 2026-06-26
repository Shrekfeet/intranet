import { useLocation, Link } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/modules": "Training",
  "/operations": "Troubleshooting Hub",
  "/operations/smart-triage": "Smart Triage",
  "/how-to": "How-To Guides",
  "/lawn-id": "Lawn ID",
  "/scheduling": "Scheduling Hub",
  "/policies": "Policies & Docs",
  "/account-flags": "Account Flags",
  "/condition-codes": "Condition Codes",
  "/terms": "Terms & Disputes",
  "/welcome": "New Starter Welcome",
  "/admin": "Admin Dashboard",
  "/suppliers": "Supplier Directory",
  "/seasonal-calendar": "Seasonal Calendar",
  "/dev": "Dev Tools",
};

function getBreadcrumb(pathname: string): string {
  if (breadcrumbMap[pathname]) return breadcrumbMap[pathname];
  const parent = breadcrumbMap[pathname.split("/").slice(0, -1).join("/") || "/"];
  if (parent) return parent;
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const crumb = getBreadcrumb(location.pathname);
  const { user, isAdmin, signOut } = useAuth();

  const displayName = user?.name ?? "User";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AnnouncementBanner />
          <header className="h-16 flex items-center border-b bg-gradient-to-r from-primary/8 via-background/95 to-background/95 backdrop-blur-sm sticky top-0 z-10 px-4 gap-3">
            <SidebarTrigger />
            <div className="h-5 w-px bg-border" />
            <span className="text-sm text-muted-foreground font-body flex-1">{crumb}</span>

            {/* Right side: admin link + user chip + sign out */}
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary hover:underline"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Admin
                </Link>
              )}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border bg-card px-3 py-1">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    {displayName.charAt(0)}
                  </span>
                </div>
                <span className="text-xs font-body font-medium text-foreground/80 max-w-24 truncate">
                  {displayName}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8 w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
