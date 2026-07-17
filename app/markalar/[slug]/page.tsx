import Link from "next/link";
import { products } from "@/data/site";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;

  const brandName = slug.replace(/-/g, " ").toLowerCase();

  const brandProducts = products.filter((product) =>
    product.brand.toLowerCase().includes(brandName)
  );

  if (brandProducts.length === 0) {
    return (
      <main className="container-shell py-16 sm:py-20">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-600">Marka seçkisi</p>
        <h1 className="mt-3 text-3xl font-black capitalize text-ink sm:text-4xl">{brandName}</h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-neutral-600">
          Bu markaya ait ürünler şu anda çevrim içi katalogda listelenmiyor. Mağazadaki güncel stok ve alternatifler için ürünlere göz atabilirsiniz.
        </p>
        <Link
          href="/urunler"
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-[8px] bg-ink px-5 py-3 text-sm font-black text-white transition hover:bg-leaf-600"
        >
          Tüm ürünleri görüntüle
        </Link>
      </main>
    );
  }

  return (
    <main className="container-shell py-16">
      <h1 className="mb-8 text-4xl font-black capitalize">
        {brandName}
      </h1>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {brandProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
