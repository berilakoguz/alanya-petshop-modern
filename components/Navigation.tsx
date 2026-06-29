"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { navigation, storeInfo } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openCart, totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b hairline bg-white/88 backdrop-blur-xl">
      <div className="bg-ink text-white">
        <div className="container-shell flex min-h-10 flex-wrap items-center justify-center gap-x-6 gap-y-2 py-2 text-center text-xs font-bold md:justify-between md:text-sm">
          <span>{storeInfo.freeDelivery}</span>
          <a href={`tel:${storeInfo.phone.replaceAll(" ", "")}`} className="hover:text-amber">
            {storeInfo.phone}
          </a>
        </div>
      </div>

      <nav className="container-shell flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Ana sayfa">
          <span className="grid size-11 shrink-0 place-items-center rounded-[8px] bg-leaf-500 text-lg font-black text-white">
            P+
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-black leading-tight text-ink md:text-xl">
              {storeInfo.shortName}
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-neutral-500 sm:block">
              Alanya
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[8px] px-3 py-2 text-sm font-bold text-neutral-600 transition hover:bg-leaf-50 hover:text-leaf-700",
                pathname === item.href && "bg-leaf-50 text-leaf-700"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Ara"
            className="hidden size-11 place-items-center rounded-full border hairline bg-white text-ink transition hover:bg-bone md:grid"
          >
            <Search size={20} />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label="Sepeti aç"
            className="relative grid size-11 place-items-center rounded-full bg-ink text-white transition hover:bg-leaf-600"
          >
            <ShoppingBag size={20} />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-amber px-1 text-[11px] font-black text-ink">
                {totalItems}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setOpen((value) => !value)}
            className="grid size-11 place-items-center rounded-full border hairline bg-white text-ink lg:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t hairline bg-white lg:hidden">
          <div className="container-shell grid gap-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-[8px] px-4 py-3 text-sm font-black text-neutral-700",
                  pathname === item.href && "bg-leaf-50 text-leaf-700"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
