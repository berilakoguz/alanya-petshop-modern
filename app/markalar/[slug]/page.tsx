import { notFound } from "next/navigation";
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
    notFound();
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
