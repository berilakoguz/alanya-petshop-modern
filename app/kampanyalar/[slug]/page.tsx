import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgePercent, CalendarDays, PackageCheck } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { campaigns, products } from "@/data/site";

type CampaignDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({ params }: CampaignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = campaigns.find((item) => item.slug === slug);

  if (!campaign) {
    return { title: "Kampanya" };
  }

  return {
    title: campaign.title,
    description: campaign.description
  };
}

export default async function CampaignDetailPage({ params }: CampaignDetailPageProps) {
  const { slug } = await params;
  const campaign = campaigns.find((item) => item.slug === slug);

  if (!campaign) {
    notFound();
  }

  const campaignProducts = products
    .filter((product) => {
      const productMatch = campaign.productIds?.includes(product.id) ?? false;
      const categoryMatch = campaign.categorySlugs.includes(product.category);
      return productMatch || categoryMatch;
    })
    .filter((product) => product.price > 0)
    .slice(0, 12);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-24">
        <img src="/images/product-assortment.png" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/82 to-ink/36" />
        <div className="container-shell max-w-4xl">
          <Link href="/kampanyalar" className="inline-flex items-center gap-2 text-sm font-black text-white/76 hover:text-amber">
            <ArrowLeft size={17} />
            Kampanyalara Dön
          </Link>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber px-4 py-2 text-sm font-black text-ink">
              <BadgePercent size={17} className="text-ink" />
              Sepette uygulanır: {campaign.discountLabel}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/14 px-4 py-2 text-sm font-black text-white">
              <CalendarDays size={17} className="text-amber" />
              {campaign.validUntil}
            </span>
          </div>
          <h1 className="mt-5 text-balance font-display text-4xl font-black leading-tight md:text-6xl">
            {campaign.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{campaign.description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={campaign.eyebrow}
              title="Bu kampanyaya dahil ürünler"
              description="Ürünleri sepete ekleyebilir, sepet panelinden WhatsApp ile hızlı sipariş oluşturabilirsiniz."
            />
            <div className="rounded-[8px] border hairline bg-white p-4 shadow-sm">
              <p className="inline-flex items-center gap-2 text-sm font-black text-ink">
                <PackageCheck size={18} className="text-leaf-600" />
                {campaignProducts.length} ürün listeleniyor
              </p>
            </div>
          </Reveal>

          {campaignProducts.length > 0 ? (
            <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {campaignProducts.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.03}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mt-10 rounded-[8px] border hairline bg-white p-8 text-center shadow-sm">
                <PackageCheck size={36} className="mx-auto text-leaf-600" />
                <h2 className="mt-4 text-2xl font-black text-ink">Bu kampanya için ürünler yakında eklenecek.</h2>
                <p className="mt-3 text-neutral-600">Stok ve kampanya bilgisi için WhatsApp hattından bize yazabilirsiniz.</p>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
