import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductExplorer } from "@/components/ProductExplorer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "Pozitif Petshop Alanya ürün kataloğu ve kategori filtreleri."
};

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ürün Kataloğu"
        title="Kedi, köpek, kuş ve akvaryum için seçili ürünler."
        description="Marka, fiyat, yaş, ırk, protein, tahıl durumu, paket kilosu ve sıralama seçenekleriyle hızlı seçim yapın."
        image="/images/product-assortment.png"
      />
      <section className="py-16">
        <div className="container-shell">
          <Reveal>
            <ProductExplorer />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
