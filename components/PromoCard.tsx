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
        "group grid min-h-48 content-between rounded-[8px] p-4 shadow-soft transition hover:-translate-y-1 hover:shadow-lift md:min-h-64 md:p-6",
        toneStyle.className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-black uppercase tracking-[0.12em] text-white/80 md:text-xs md:tracking-[0.18em]">{eyebrow}</span>
        <span className="grid size-9 place-items-center rounded-full bg-white/16 md:size-11">
          <Icon size={18} className="md:size-[22px]" aria-hidden="true" />
        </span>
      </div>
      <div>
        <span className="mb-3 inline-flex rounded-[8px] bg-white/16 px-2 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white md:mb-4 md:px-3 md:text-xs md:tracking-[0.12em]">
          {discountLabel}
        </span>
        <h3 className="text-lg font-black leading-tight md:text-2xl">{title}</h3>
        <p className="mt-2 text-xs leading-5 text-white/82 md:mt-4 md:text-sm md:leading-7">{description}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-white md:mt-6 md:gap-2 md:text-sm">
          Kampanyayı İncele
          <ArrowRight size={15} className="transition group-hover:translate-x-1 md:size-[17px]" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
