import { X, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { whatsNew } from "@/data/whats-new";

const DISMISS_KEY = "sf-banner-dismissed";

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false);
  const latest = [...whatsNew].sort((a, b) => b.date.localeCompare(a.date))[0];

  useEffect(() => {
    if (!latest) return;
    const dismissed = sessionStorage.getItem(DISMISS_KEY);
    if (dismissed !== latest.id) setVisible(true);
  }, [latest?.id]);

  if (!visible || !latest) return null;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, latest.id);
    setVisible(false);
  };

  const isPolicy = latest.kind === "policy";

  return (
    <div
      className={`w-full px-4 py-2 flex items-center gap-3 text-sm font-body ${
        isPolicy
          ? "bg-amber-500 text-white"
          : "bg-primary text-primary-foreground"
      }`}
    >
      <Bell className="h-3.5 w-3.5 flex-shrink-0 opacity-80" />
      <p className="flex-1 text-center text-sm leading-snug">
        <span className="font-semibold">{latest.title}</span>
        <span className="opacity-75 ml-2 hidden sm:inline">— {latest.description}</span>
      </p>
      <Link
        to={latest.href}
        className="font-semibold text-xs underline underline-offset-2 opacity-90 hover:opacity-100 flex-shrink-0 hidden sm:block"
      >
        View →
      </Link>
      <button
        onClick={dismiss}
        className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity ml-1"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
