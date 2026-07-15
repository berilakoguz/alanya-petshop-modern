import Link from "next/link";
import { ArrowRight, BadgePercent, Fish, Gift } from "lucide-react";
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
  slug: string;
  description: string;
  eyebrow: string;
  tone: keyof typeof toneStyles;
  discountLabel: string;
};

export function PromoCard({ title, description, eyebrow, tone, slug, discountLabel }: PromoCardProps) {
  const toneStyle = toneStyles[tone];
  const Icon = toneStyle.icon;

  return (
    <Link
      href={`/kampanyalar/${slug}`}
      className={cn(
        "group grid min-h-64 content-between rounded-[8px] p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift",
        toneStyle.className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.18em] text-white/80">{eyebrow}</span>
        <span className="grid size-11 place-items-center rounded-full bg-white/16">
          <Icon size={22} aria-hidden="true" />
        </span>
      </div>
      <div>
        <span className="mb-4 inline-flex rounded-[8px] bg-white/16 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-white">
          {discountLabel}
        </span>
        <h3 className="text-2xl font-black leading-tight">{title}</h3>
        <p className="mt-4 text-sm leading-7 text-white/82">{description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-white">
          Kampanyayı İncele
          <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
