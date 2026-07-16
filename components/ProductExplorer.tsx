"use client";

import { useMemo, useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { categories, products } from "@/data/site";
import {
  breedSizeLabels,
  getProductProfile,
  getProductSearchText,
  grainPreferenceLabels,
  lifeStageLabels,
  matchesPackageWeightBucket,
  normalizeTerm,
  packageWeightLabels,
  type BreedSize,
  type GrainPreference,
  type LifeStage,
  type PackageWeightBucket
} from "@/lib/product-intelligence";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const collator = new Intl.Collator("tr-TR", { sensitivity: "base" });

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "featured", label: "Öne çıkan" },
  { value: "price-asc", label: "Fiyat artan" },
  { value: "price-desc", label: "Fiyat azalan" },
  { value: "name-asc", label: "Alfabetik A-Z" },
  { value: "name-desc", label: "Alfabetik Z-A" }
];

const ageOptions: Array<{ value: LifeStage | "all"; label: string }> = [
  { value: "all", label: "Tüm yaşlar" },
  { value: "yavru", label: lifeStageLabels.yavru },
  { value: "yetiskin", label: lifeStageLabels.yetiskin },
  { value: "senior", label: lifeStageLabels.senior }
];

const breedOptions: Array<{ value: BreedSize | "all"; label: string }> = [
  { value: "all", label: "Tüm ırklar" },
  { value: "kucuk", label: breedSizeLabels.kucuk },
  { value: "orta-buyuk", label: breedSizeLabels["orta-buyuk"] },
  { value: "tum", label: breedSizeLabels.tum }
];

const grainOptions: Array<{ value: GrainPreference | "all"; label: string }> = [
  { value: "all", label: "Tüm tahıl durumları" },
  { value: "tahilsiz", label: grainPreferenceLabels.tahilsiz },
  { value: "dusuk-tahilli", label: grainPreferenceLabels["dusuk-tahilli"] },
  { value: "tahilli", label: grainPreferenceLabels.tahilli }
];

const packageWeightOptions: Array<{ value: PackageWeightBucket | "all"; label: string }> = [
  { value: "all", label: "Tüm paket kiloları" },
  { value: "mini", label: packageWeightLabels.mini },
  { value: "small", label: packageWeightLabels.small },
  { value: "medium", label: packageWeightLabels.medium },
  { value: "large", label: packageWeightLabels.large }
];

export function ProductExplorer() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedAge, setSelectedAge] = useState<LifeStage | "all">("all");
  const [selectedBreedSize, setSelectedBreedSize] = useState<BreedSize | "all">("all");
  const [selectedGrain, setSelectedGrain] = useState<GrainPreference | "all">("all");
  const [minProtein, setMinProtein] = useState("");
  const [selectedPackageWeight, setSelectedPackageWeight] = useState<PackageWeightBucket | "all">("all");
  const [sortOrder, setSortOrder] = useState<SortOption>("featured");

  const brandOptions = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand.trim()).filter(Boolean))).sort(collator.compare),
    []
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeTerm(query);
    const parsedMinPrice = parseOptionalNumber(minPrice);
    const parsedMaxPrice = parseOptionalNumber(maxPrice);
    const parsedMinProtein = parseOptionalNumber(minProtein);

    return products
      .filter((product) => {
        const profile = getProductProfile(product);
        const priceKnown = product.price > 0;
        const categoryMatch = activeCategory === "all" || product.category === activeCategory;
        const searchMatch = getProductSearchText(product).includes(normalizedQuery);
        const brandMatch = selectedBrand === "all" || product.brand.trim() === selectedBrand;
        const priceMatch =
          parsedMinPrice === undefined && parsedMaxPrice === undefined
            ? true
            : priceKnown &&
              (parsedMinPrice === undefined || product.price >= parsedMinPrice) &&
              (parsedMaxPrice === undefined || product.price <= parsedMaxPrice);
        const ageMatch = selectedAge === "all" || profile.lifeStage === selectedAge;
        const breedMatch = selectedBreedSize === "all" || profile.breedSize === selectedBreedSize;
        const grainMatch = selectedGrain === "all" || profile.grainPreference === selectedGrain;
        const proteinMatch =
          parsedMinProtein === undefined ||
          (profile.proteinPercent !== undefined && profile.proteinPercent >= parsedMinProtein);
        const packageWeightMatch = matchesPackageWeightBucket(profile.packageWeightKg, selectedPackageWeight);

        return (
          categoryMatch &&
          searchMatch &&
          brandMatch &&
          priceMatch &&
          ageMatch &&
          breedMatch &&
          grainMatch &&
          proteinMatch &&
          packageWeightMatch
        );
      })
      .sort((first, second) => sortProducts(first, second, sortOrder));
  }, [
    activeCategory,
    maxPrice,
    minPrice,
    minProtein,
    query,
    selectedAge,
    selectedBrand,
    selectedBreedSize,
    selectedGrain,
    selectedPackageWeight,
    sortOrder
  ]);

  function resetFilters() {
    setActiveCategory("all");
    setQuery("");
    setSelectedBrand("all");
    setMinPrice("");
    setMaxPrice("");
    setSelectedAge("all");
    setSelectedBreedSize("all");
    setSelectedGrain("all");
    setMinProtein("");
    setSelectedPackageWeight("all");
    setSortOrder("featured");
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-5 rounded-[8px] border hairline bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
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

        <div className="grid gap-4 border-t hairline pt-5 md:grid-cols-2 lg:grid-cols-4">
          <FilterSelect label="Marka" value={selectedBrand} onChange={setSelectedBrand}>
            <option value="all">Tüm markalar</option>
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect label="Yaş" value={selectedAge} onChange={(value) => setSelectedAge(value as LifeStage | "all")}>
            {ageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Irk boyutu"
            value={selectedBreedSize}
            onChange={(value) => setSelectedBreedSize(value as BreedSize | "all")}
          >
            {breedOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Tahıl durumu"
            value={selectedGrain}
            onChange={(value) => setSelectedGrain(value as GrainPreference | "all")}
          >
            {grainOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>

          <FilterInput label="Min fiyat" value={minPrice} onChange={setMinPrice} placeholder="TL" />
          <FilterInput label="Maks fiyat" value={maxPrice} onChange={setMaxPrice} placeholder="TL" />
          <FilterInput label="Min protein" value={minProtein} onChange={setMinProtein} placeholder="%" />

          <FilterSelect
            label="Paket kilosu"
            value={selectedPackageWeight}
            onChange={(value) => setSelectedPackageWeight(value as PackageWeightBucket | "all")}
          >
            {packageWeightOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </FilterSelect>
        </div>

        <div className="flex flex-col gap-3 border-t hairline pt-5 md:flex-row md:items-end md:justify-between">
          <p className="text-sm font-bold text-neutral-600">
            <span className="font-black text-ink">{filteredProducts.length}</span> ürün listeleniyor
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <FilterSelect label="Sıralama" value={sortOrder} onChange={(value) => setSortOrder(value as SortOption)}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FilterSelect>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border hairline bg-white px-4 text-sm font-black text-neutral-700 transition hover:bg-bone"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Sıfırla
            </button>
          </div>
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

function FilterInput({
  label,
  value,
  onChange,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-neutral-700">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        inputMode="decimal"
        placeholder={placeholder}
        className="min-h-11 rounded-[8px] border hairline bg-bone px-3 text-sm outline-none transition focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
      />
    </label>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold text-neutral-700">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 rounded-[8px] border hairline bg-bone px-3 text-sm outline-none transition focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
      >
        {children}
      </select>
    </label>
  );
}

function parseOptionalNumber(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function sortProducts(first: (typeof products)[number], second: (typeof products)[number], sortOrder: SortOption) {
  if (sortOrder === "price-asc") {
    return priceForSort(first, "asc") - priceForSort(second, "asc");
  }

  if (sortOrder === "price-desc") {
    return priceForSort(second, "desc") - priceForSort(first, "desc");
  }

  if (sortOrder === "name-asc") {
    return collator.compare(first.name, second.name);
  }

  if (sortOrder === "name-desc") {
    return collator.compare(second.name, first.name);
  }

  return 0;
}

function priceForSort(product: (typeof products)[number], direction: "asc" | "desc") {
  if (product.price > 0) return product.price;
  return direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
}
