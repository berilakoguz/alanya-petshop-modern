import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { categories, products } from "@/data/site";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Kategori" };
  }

  return {
    title: `${category.name} Ürünleri`,
    description: category.description
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.category === category.slug);
  const otherCategories = categories.filter((item) => item.slug !== category.slug).slice(0, 3);

  return (
    <main>
      <PageHero
        eyebrow={`${category.count} seçili ürün`}
        title={`${category.name} kategorisi`}
        description={category.description}
        image={category.image}
      />

      <section className="py-16">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Kategori Ürünleri"
              title={`${category.name} için öne çıkan ürünler`}
              description="Popüler ürünleri inceleyebilir veya tüm katalogdan filtrelemeye devam edebilirsiniz."
            />
            <ButtonLink href="/urunler" variant="light" className="self-start md:self-auto">
              Tüm Katalog
            </ButtonLink>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.04}>
                  <ProductCard product={product} />
                </Reveal>
              ))
            ) : (
              <div className="rounded-[8px] border hairline bg-white p-8 shadow-sm lg:col-span-4">
                <p className="text-xl font-black text-ink">Bu kategori için ürünler yakında eklenecek.</p>
                <p className="mt-2 text-neutral-600">WhatsApp üzerinden stok ve marka bilgisi alabilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Diğer Kategoriler"
              title="Farklı ihtiyaçlara da hızlıca göz atın."
              description="Dostunuzun günlük rutini için tamamlayıcı ürün kategorileri."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {otherCategories.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <CategoryCard category={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
