import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { storeInfo } from "@/data/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Pozitif Petshop Alanya telefon, WhatsApp, adres ve çalışma saatleri."
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, title: "Telefon", text: storeInfo.phone, href: `tel:${storeInfo.phone.replaceAll(" ", "")}` },
    { icon: MessageCircle, title: "WhatsApp", text: "Hızlı sipariş ve stok bilgisi", href: `https://wa.me/${storeInfo.whatsapp}` },
    { icon: Mail, title: "E-posta", text: storeInfo.email, href: `mailto:${storeInfo.email}` },
    { icon: Clock, title: "Çalışma Saatleri", text: storeInfo.hours, href: "/iletisim" }
  ];

  return (
    <main>
      <PageHero
        eyebrow="İletişim"
        title="Mağazaya gelin, WhatsApp'tan yazın veya hızlıca arayın."
        description="Ürün stoğu, kampanya koşulları ve teslimat için en hızlı kanal WhatsApp hattımızdır."
      />
      <section className="py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeader
              eyebrow="Bize Ulaşın"
              title="Alanya içi servis ve mağaza desteği."
              description="Siparişiniz, mama seçiminiz veya akvaryum kurulumunuz için hızlı dönüş alabilirsiniz."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <a
                    key={card.title}
                    href={card.href}
                    className="rounded-[8px] border hairline bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lift"
                  >
                    <Icon size={24} className="text-leaf-600" aria-hidden="true" />
                    <h2 className="mt-4 text-lg font-black text-ink">{card.title}</h2>
                    <p className="mt-2 text-sm leading-7 text-neutral-600">{card.text}</p>
                  </a>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`https://wa.me/${storeInfo.whatsapp}`}>WhatsApp'tan Yaz</ButtonLink>
              <ButtonLink href="/urunler" variant="light">
                Ürünleri İncele
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-5">
              <div className="overflow-hidden rounded-[8px] border hairline bg-white shadow-soft">
                <iframe
                  title="Pozitif Petshop Alanya harita"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6410.633903887283!2d32.005344!3d36.54647!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dc987bc288f091%3A0xc18f1911605923a3!2sPozitif%20PetShop!5e0!3m2!1str!2str!4v1784108682537!5m2!1str!2str"
                  className="h-[420px] w-full border-0"
                  loading="lazy"
                />
              </div>
              <div className="flex items-start gap-3 rounded-[8px] bg-ink p-5 text-white">
                <MapPin size={24} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-black">{storeInfo.address}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/68">
                   
                    
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
