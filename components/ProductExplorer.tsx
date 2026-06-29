"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/data/site";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";

export function ProductExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const searchMatch = `${product.name} ${product.brand} ${product.description}`
        .toLocaleLowerCase("tr-TR")
        .includes(query.toLocaleLowerCase("tr-TR"));
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 rounded-[8px] border hairline bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
        <label className="relative block">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Mama, marka veya kategori ara"
            className="min-h-12 w-full rounded-[8px] border hairline bg-bone pl-12 pr-4 text-sm font-semibold outline-none transition focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-[8px] border px-4 text-sm font-black transition",
              activeCategory === "all" ? "border-ink bg-ink text-white" : "hairline bg-white text-neutral-700 hover:bg-bone"
            )}
          >
            <SlidersHorizontal size={17} aria-hidden="true" />
            Tümü
          </button>
          {categories.map((category) => (
            <button
              type="button"
              key={category.slug}
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "min-h-10 rounded-[8px] border px-4 text-sm font-black transition",
                activeCategory === category.slug
                  ? "border-leaf-500 bg-leaf-500 text-white"
                  : "hairline bg-white text-neutral-700 hover:bg-bone"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-[8px] border hairline bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-black text-ink">Bu filtreyle ürün bulunamadı.</p>
          <p className="mt-2 text-sm text-neutral-600">Farklı bir kategori veya arama kelimesi deneyin.</p>
        </div>
      ) : null}
    </div>
  );
}
