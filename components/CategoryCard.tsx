import Link from "next/link";
import { Bird, Cat, Dog, Fish, Rabbit, Sparkles } from "lucide-react";
import type { Category } from "@/data/site";

const iconMap = {
  dog: Dog,
  cat: Cat,
  bird: Bird,
  fish: Fish,
  rabbit: Rabbit,
  sparkles: Sparkles
};

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon];

  return (
    <Link
     href={
  category.slug === "kampanyalar"
    ? "/kampanyalar"
    : `/kategori/${category.slug}`
}
      className="group grid overflow-hidden rounded-[8px] border hairline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="image-sheen aspect-[4/3] sm:aspect-[5/3]">
        <img
          src={category.image}
          alt={`${category.name} kategorisi`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: category.objectPosition }}
        />
      </div>
      <div className="grid gap-3 p-3 sm:gap-4 sm:p-5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div
            className="grid size-9 place-items-center rounded-[8px] text-white sm:size-11"
            style={{ backgroundColor: category.accent }}
            aria-hidden="true"
          >
            <Icon size={18} className="sm:size-[22px]" strokeWidth={2.4} />
          </div>
          <span className="text-xs font-bold text-neutral-500 sm:text-sm">{category.count} ürün</span>
        </div>
        <div>
          <h3 className="text-base font-black text-ink sm:text-xl">{category.name}</h3>
          <p className="mt-2 min-h-0 text-xs leading-5 text-neutral-600 sm:min-h-14 sm:text-sm sm:leading-7">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
