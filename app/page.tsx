import { ArrowUpRight, CalendarDays, CheckCircle2, MapPin, Phone, Quote, Star } from "lucide-react";
import Link from "next/link";
import { BrandMarquee } from "@/components/BrandMarquee";
import { CategoryCard } from "@/components/CategoryCard";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { PromoCard } from "@/components/PromoCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { blogPosts, campaigns, categories, products, storeInfo, testimonials } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <main className="pt-28">
        <section
        id="kategoriler"
        className="scroll-mt-16 py-16"
>
          <div className="container-shell">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Kategoriler"
                title="Evcil dostunuzun ihtiyacına göre hızlı seçim."
                description="Mama, aksesuar, bakım ve akvaryum ürünlerini düzenli kategori yapısıyla keşfedin."
              />
              <ButtonLink href="/urunler" variant="light" className="self-start md:self-auto">
                Tüm Ürünler
              </ButtonLink>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Reveal key={category.slug} delay={index * 0.04}>
                  <CategoryCard category={category} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal>
              <SectionHeader
                eyebrow="Kampanyalar"
                title="Alanya teslimatlı güncel fırsatlar."
                description="Seçili ürünlerde dönemsel indirimler, paket avantajları ve yerinde danışmanlık desteği."
              />
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href="/kampanyalar">Kampanyalara Bak</ButtonLink>
                <ButtonLink href={`https://wa.me/${storeInfo.whatsapp}`} variant="light">
                  WhatsApp Sipariş
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="image-sheen overflow-hidden rounded-[8px] shadow-soft">
                <img
                  src="/images/product-assortment.png"
                  alt="Pet shop ürün vitrini"
                  className="aspect-[16/10] h-full w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="container-shell mt-10 grid gap-5 md:grid-cols-3">
            {campaigns.map((campaign, index) => (
              <Reveal key={campaign.title} delay={index * 0.05}>
                <PromoCard {...campaign} />
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="container-shell">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Çok Satanlar"
                title="Raflardan en hızlı çıkan favoriler."
                description="Kedi, köpek, kuş ve akvaryum ürünlerinde güvenilir markalar ve dengeli fiyatlar."
              />
              <ButtonLink href="/urunler" variant="light" className="self-start md:self-auto">
                Mağazayı Aç
              </ButtonLink>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {products.slice(0, 4).map((product, index) => (
                <Reveal key={product.id} delay={index * 0.04}>
                  <ProductCard product={product} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-10">
          <BrandMarquee />
        </section>

        <section className="bg-bone py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <Reveal>
              <SectionHeader
                eyebrow="Mağaza Deneyimi"
                title="Sadece ürün satmayan, doğru ürünü seçtiren pet shop."
                description="Pozitif Petshop Alanya; mama değişimi, hassasiyet, yaş, ırk, tüy ve akvaryum bakımı gibi konularda hızlı karar vermenizi kolaylaştırır."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Yaş ve ırka göre mama önerisi",
                  "Aynı gün Alanya içi servis",
                  "Akvaryum başlangıç danışmanlığı",
                  "Kedi ve köpek bakım ürün rehberliği"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-[8px] bg-white p-4 shadow-sm">
                    <CheckCircle2 size={21} className="shrink-0 text-leaf-600" aria-hidden="true" />
                    <span className="text-sm font-black text-ink">{item}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-4 rounded-[8px] bg-ink p-6 text-white shadow-soft">
                <div className="flex items-center gap-2 text-amber">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Star key={item} size={20} fill="currentColor" />
                  ))}
                </div>
                <p className="text-2xl font-black leading-tight">
                  "Ürün seçimi net, teslimat hızlı, mağaza dili çok güven verici."
                </p>
                <p className="text-sm leading-7 text-white/68">
                  Yerel pet shop sıcaklığını modern e-ticaret hızıyla birleştiren sade ve premium deneyim.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="py-16">
          <div className="container-shell">
            <Reveal>
              <SectionHeader
                eyebrow="Yorumlar"
                title="Alanya'daki pet ailelerinden gelenler."
                description="Güven, hız ve doğru ürün seçimi en çok tekrar edilen geri bildirimler."
                align="center"
              />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((item, index) => (
                <Reveal key={item.name} delay={index * 0.05}>
                  <article className="h-full rounded-[8px] border hairline bg-white p-6 shadow-sm">
                    <Quote size={26} className="text-amber" aria-hidden="true" />
                    <p className="mt-5 min-h-24 text-base leading-8 text-neutral-700">{item.text}</p>
                    <div className="mt-6 border-t hairline pt-5">
                      <p className="font-black text-ink">{item.name}</p>
                      <p className="mt-1 text-sm font-semibold text-neutral-500">
                        {(item as { pet?: string }).pet ?? "Pozitif Petshop müşterisi"}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container-shell">
            <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Blog"
                title="Kısa, işe yarar bakım rehberleri."
                description="Mama değişimi, yaz bakımı ve akvaryum başlangıcı gibi konularda pratik içerikler."
              />
              <ButtonLink href="/blog" variant="light" className="self-start md:self-auto">
                Yazıları Oku
              </ButtonLink>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {blogPosts.map((post, index) => (
                <Reveal key={post.title} delay={index * 0.05}>
                  <Link
                    href={post.href}
                    className="group grid h-full rounded-[8px] border hairline bg-bone p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lift"
                  >
                    <CalendarDays size={23} className="text-leaf-600" aria-hidden="true" />
                    <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{post.date}</p>
                    <h3 className="mt-3 text-xl font-black leading-tight text-ink">{post.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-neutral-600">{post.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-leaf-700">
                      Devamını oku
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-shell grid gap-5 rounded-[8px] bg-leaf-700 p-7 text-white shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/62">Hızlı iletişim</p>
              <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">Bugün hangi dostumuz için alışveriş yapıyoruz?</h2>
              <div className="mt-5 flex flex-wrap gap-5 text-sm font-bold text-white/78">
                <span className="inline-flex items-center gap-2">
                  <Phone size={18} /> {storeInfo.phone}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={18} /> {storeInfo.address}
                </span>
              </div>
            </div>
            <ButtonLink href="/iletisim" variant="light">
              İletişime Geç
            </ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}
