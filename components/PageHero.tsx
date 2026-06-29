import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  className?: string;
};

export function PageHero({ eyebrow, title, description, image = "/images/hero-store.png", className }: PageHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink py-20 text-white md:py-28", className)}>
      <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/78 to-ink/30" />
      <div className="container-shell max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-amber">{eyebrow}</p>
        <h1 className="mt-4 text-balance font-display text-4xl font-black leading-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{description}</p>
      </div>
    </section>
  );
}
