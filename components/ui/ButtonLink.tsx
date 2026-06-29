import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] px-5 py-3 text-sm font-bold transition duration-200 focus:outline-none focus:ring-4 focus:ring-amber/30",
        variant === "primary" && "bg-leaf-500 text-white shadow-soft hover:bg-leaf-600",
        variant === "light" && "bg-white text-ink shadow-soft hover:bg-bone",
        variant === "outline" && "border border-white/45 text-white hover:bg-white hover:text-ink",
        className
      )}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
    </Link>
  );
}
