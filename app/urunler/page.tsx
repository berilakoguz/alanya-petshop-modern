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
        description="Premium mama, ödül, oyuncak, bakım ve akvaryum ürünlerini kategoriye göre hızlıca filtreleyin."
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
