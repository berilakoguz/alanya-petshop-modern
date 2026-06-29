import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { BrandMarquee } from "@/components/BrandMarquee";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { brands } from "@/data/site";

export const metadata: Metadata = {
  title: "Markalar",
  description: "Pozitif Petshop Alanya marka seçkisi."
};

export default function BrandsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Marka Seçkisi"
        title="Güvenilir premium pet markaları tek vitrinde."
        description="Kedi, köpek, kuş ve akvaryum ürünlerinde sık tercih edilen markaları raflarımızda bulabilirsiniz."
        image="/images/product-assortment.png"
      />
      <section className="py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Markalar"
              title="Düzenli stok, doğru alternatif."
              description="Aradığınız marka mağazada yoksa aynı ihtiyaca uygun muadil önerisi için bizimle iletişime geçebilirsiniz."
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <Reveal key={brand} delay={index * 0.03}>
                <Link
  href={`/markalar/${brand.toLowerCase().replace(/\s+/g, "-")}`}
  className="block rounded-[8px] border hairline bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>
  <CheckCircle2 size={22} className="text-leaf-600" aria-hidden="true" />
  <h2 className="mt-4 text-xl font-black text-ink">{brand}</h2>
  <p className="mt-2 text-sm leading-7 text-neutral-600">
    Seçili ürünler, kampanya dönemleri ve alternatif öneriler.
  </p>
</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <BrandMarquee />
    </main>
  );
}
