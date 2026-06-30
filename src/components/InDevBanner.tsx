import { Construction } from "lucide-react";

interface InDevBannerProps {
  reason?: string;
}

export function InDevBanner({ reason }: InDevBannerProps) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 mb-6">
      <Construction className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <p className="text-sm font-body font-semibold text-amber-800">This section is still in development</p>
        <p className="text-xs font-body text-amber-700">
          {reason ?? "Content is being reviewed and personalised to Shrekfeet's processes. Some information may be incomplete or not yet accurate."}
        </p>
      </div>
    </div>
  );
}
