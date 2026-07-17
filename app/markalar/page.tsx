import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
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
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {brands.map((brand, index) => (
              <Reveal key={brand} delay={index * 0.03}>
                <Link
                  href={`/markalar/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex h-full min-h-0 flex-col rounded-[8px] border hairline bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:min-h-48 sm:p-5"
                >
                  <div className="flex min-h-0 flex-col items-start gap-2 sm:min-h-16 sm:flex-row sm:items-center sm:gap-4">
                    <BrandLogo brand={brand} className="size-11 p-1.5 sm:size-16 sm:p-2" />
                    <h2 className="w-full break-words text-base font-black leading-tight text-ink sm:min-w-0 sm:text-xl">
                      {brand}
                    </h2>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-neutral-600 sm:mt-5 sm:text-sm sm:leading-7">
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
