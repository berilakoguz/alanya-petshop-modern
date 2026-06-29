import { BadgePercent, Fish, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const toneStyles = {
  leaf: {
    className: "bg-leaf-700 text-white",
    icon: BadgePercent
  },
  aqua: {
    className: "bg-aqua text-white",
    icon: Fish
  },
  coral: {
    className: "bg-coral text-white",
    icon: Gift
  }
};

type PromoCardProps = {
  title: string;
  description: string;
  eyebrow: string;
  tone: keyof typeof toneStyles;
};

export function PromoCard({ title, description, eyebrow, tone }: PromoCardProps) {
  const toneStyle = toneStyles[tone];
  const Icon = toneStyle.icon;

  return (
    <article className={cn("grid min-h-64 content-between rounded-[8px] p-6 shadow-soft", toneStyle.className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-white/80">{eyebrow}</span>
        <span className="grid size-11 place-items-center rounded-full bg-white/16">
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-black leading-tight">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/82">{description}</p>
      </div>
    </article>
  );
}
