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
      href={`/kategori/${category.slug}`}
      className="group grid overflow-hidden rounded-[8px] border hairline bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="image-sheen aspect-[5/3]">
        <img
          src={category.image}
          alt={`${category.name} kategorisi`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          style={{ objectPosition: category.objectPosition }}
        />
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex items-center justify-between gap-4">
          <div
            className="grid size-11 place-items-center rounded-[8px] text-white"
            style={{ backgroundColor: category.accent }}
            aria-hidden="true"
          >
            <Icon size={22} strokeWidth={2.4} />
          </div>
          <span className="text-sm font-bold text-neutral-500">{category.count} ürün</span>
        </div>
        <div>
          <h3 className="text-xl font-black text-ink">{category.name}</h3>
          <p className="mt-2 min-h-14 text-sm leading-7 text-neutral-600">{category.description}</p>
        </div>
      </div>
    </Link>
  );
}
