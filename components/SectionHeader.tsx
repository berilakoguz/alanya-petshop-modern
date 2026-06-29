import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-leaf-600">{eyebrow}</p>
      ) : null}
      <h2 className="text-balance font-display text-3xl font-black leading-tight text-ink md:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-neutral-600 md:text-lg">{description}</p> : null}
    </div>
  );
}
