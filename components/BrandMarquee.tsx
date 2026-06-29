import { brands } from "@/data/site";

export function BrandMarquee() {
  const loop = [...brands, ...brands];

  return (
    <div className="overflow-hidden border-y hairline bg-white py-5">
      <div className="marquee gap-4">
        {loop.map((brand, index) => (
          <span
            key={`${brand}-${index}`}
            className="mx-2 inline-flex min-w-40 items-center justify-center rounded-[8px] border hairline bg-bone px-5 py-3 text-sm font-black text-ink"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
