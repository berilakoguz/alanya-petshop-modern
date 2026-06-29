import type { Metadata } from "next";
import { HeartHandshake, MapPinned, PackageCheck, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { storeInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Pozitif Petshop Alanya mağaza yaklaşımı ve hizmet anlayışı."
};

export default function AboutPage() {
  const timeline = [
    {
      year: "01",
      title: "Doğru ürün seçimi",
      text: "Yaş, ırk, hassasiyet ve yaşam rutinine göre mama ve bakım önerisi."
    },
    {
      year: "02",
      title: "Yerel hızlı servis",
      text: "Alanya içi siparişlerde aynı gün teslimat ve düzenli stok takibi."
    },
    {
      year: "03",
      title: "Satış sonrası destek",
      text: "Mama geçişi, akvaryum kurulumu ve bakım alışkanlıkları için rehberlik."
    }
  ];

  return (
    <main>
      <PageHero
        eyebrow="Hakkımızda"
        title="Alanya'da pet aileleri için güvenilir, sıcak ve modern mağaza."
        description={storeInfo.tagline}
      />
      <section className="py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="image-sheen overflow-hidden rounded-[8px] shadow-soft">
              <img
                src="/images/hero-store.png"
                alt="Pozitif Petshop mağaza içi"
                className="aspect-[4/5] h-full w-full object-cover"
                style={{ objectPosition: "68% 50%" }}
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <SectionHeader
              eyebrow="Yaklaşım"
              title="Raf doluluğu kadar doğru yönlendirmeyi de önemsiyoruz."
              description="Pozitif Petshop Alanya, evcil dostunuz için ürün seçimini karmaşık olmaktan çıkarır. Ürünleri sadece marka ve fiyatla değil, gerçek ihtiyaçla eşleştirir."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: HeartHandshake, title: "Samimi danışmanlık" },
                { icon: ShieldCheck, title: "Güvenilir ürün seçimi" },
                { icon: PackageCheck, title: "Düzenli stok yönetimi" },
                { icon: MapPinned, title: "Alanya içi hızlı servis" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[8px] border hairline bg-white p-5 shadow-sm">
                    <Icon size={24} className="text-leaf-600" aria-hidden="true" />
                    <h2 className="mt-4 text-lg font-black text-ink">{item.title}</h2>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Süreç"
              title="Mağaza deneyimini üç adımda sadeleştirdik."
              description="Hızlı seçim, net tavsiye ve teslimat desteği aynı deneyimin parçaları."
              align="center"
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {timeline.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <article className="h-full rounded-[8px] border hairline bg-bone p-6">
                  <p className="text-4xl font-black text-leaf-600">{item.year}</p>
                  <h2 className="mt-5 text-xl font-black text-ink">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-neutral-600">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
