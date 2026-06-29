import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PromoCard } from "@/components/PromoCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { campaigns } from "@/data/site";

export const metadata: Metadata = {
  title: "Kampanyalar",
  description: "Pozitif Petshop Alanya güncel kampanya ve fırsatları."
};

export default function CampaignsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Fırsatlar"
        title="Dostunuzun ihtiyaçlarını avantajlı tamamlayın."
        description="Mama, oyuncak, bakım ve akvaryum ürünlerinde dönemsel kampanyaları takip edin."
        image="/images/product-assortment.png"
      />
      <section className="py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Güncel"
              title="Bu hafta öne çıkan fırsatlar."
              description="Kampanya koşulları stok ve döneme göre değişebilir. En hızlı bilgi için WhatsApp hattından ulaşabilirsiniz."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {campaigns.map((campaign, index) => (
              <Reveal key={campaign.title} delay={index * 0.05}>
                <PromoCard {...campaign} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
