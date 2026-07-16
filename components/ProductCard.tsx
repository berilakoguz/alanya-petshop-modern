"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/data/site";
import { breedSizeLabels, getProductProfile, grainPreferenceLabels, lifeStageLabels } from "@/lib/product-intelligence";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const profile = getProductProfile(product);
  const detailBadges = [
    profile.lifeStage !== "belirsiz" ? lifeStageLabels[profile.lifeStage] : null,
    product.category === "kopek" && profile.breedSize !== "belirsiz" ? breedSizeLabels[profile.breedSize] : null,
    profile.grainPreference !== "belirsiz" ? grainPreferenceLabels[profile.grainPreference] : null,
    profile.proteinPercent ? `%${profile.proteinPercent} protein` : null
  ].filter((badge): badge is string => Boolean(badge));

  function handleAddToCart() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group grid overflow-hidden rounded-[8px] border hairline bg-white shadow-sm"
    >
      <div className={cn("relative bg-bone", compact ? "aspect-[4/3]" : "aspect-[6/5]")}>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: product.objectPosition }}
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-[8px] bg-amber px-3 py-1 text-xs font-black text-ink">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          aria-label="Favorilere ekle"
          onClick={() => setLiked((value) => !value)}
          className={cn(
            "absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/92 text-ink shadow-sm transition hover:scale-105",
            liked && "bg-coral text-white"
          )}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="grid gap-4 p-5">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-bold text-leaf-600">{product.brand}</span>
          <span className="inline-flex items-center gap-1 font-bold text-neutral-600">
            <Star size={15} fill="#ffc107" className="text-amber" />
            {product.rating}
          </span>
        </div>
        <div>
          <h3 className="min-h-14 text-lg font-black leading-7 text-ink">{product.name}</h3>
          <p className="mt-2 min-h-14 text-sm leading-7 text-neutral-600">{product.description}</p>
        </div>
        {!compact && detailBadges.length ? (
          <div className="flex min-h-8 flex-wrap gap-2">
            {detailBadges.slice(0, 4).map((badge) => (
              <span key={badge} className="rounded-[8px] bg-leaf-50 px-2 py-1 text-[11px] font-black text-leaf-700">
                {badge}
              </span>
            ))}
          </div>
        ) : null}
        <div className="flex items-end justify-between gap-3">
          <div>
            {product.oldPrice ? (
              <p className="text-sm font-semibold text-neutral-400 line-through">{formatPrice(product.oldPrice)}</p>
            ) : null}
            <p className="text-2xl font-black text-ink">{formatPrice(product.price)}</p>
          </div>
          <span className="text-xs font-black uppercase tracking-[0.14em] text-aqua">{product.stock}</span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-ink px-4 py-3 text-sm font-black text-white transition hover:bg-leaf-600 focus:outline-none focus:ring-4 focus:ring-leaf-100"
        >
          <ShoppingBag size={18} aria-hidden="true" />
          {added ? "Sepete Eklendi" : "Sepete Ekle"}
        </button>
      </div>
    </motion.article>
  );
}
