import { BadgeCheck, MapPin, ShieldCheck, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { stats, storeInfo } from "@/data/site";

export function Hero() {
  return (
    <section className="relative isolate min-h-[82svh] overflow-visible bg-ink text-white">
      <img
        src="/images/hero-store.png"
        alt="Pozitif Petshop Alanya mağaza atmosferi"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/72 to-ink/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/72 to-transparent" />

      <div className="container-shell grid min-h-[82svh] items-center py-16">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-bold text-white backdrop-blur">
            <BadgeCheck size={18} className="text-amber" aria-hidden="true" />
            Alanya içi hızlı servis ve uzman ürün danışmanlığı
          </div>

          <h1 className="text-balance font-display text-5xl font-black leading-[1.02] md:text-7xl">
            {storeInfo.name}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/84 md:text-xl">
            Mama, oyuncak, bakım ve akvaryum ihtiyaçlarını tek yerde; modern mağaza deneyimi,
            güvenilir markalar ve aynı gün teslimatla sunuyoruz.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/urunler">Ürünleri Keşfet</ButtonLink>
            <ButtonLink href="/iletisim" variant="outline">
              Mağazaya Ulaş
            </ButtonLink>
          </div>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-white/22 pl-4">
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/64">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-shell relative z-10 grid translate-y-1/2 gap-3 md:grid-cols-3">
        {[
          { icon: Truck, title: "Aynı gün servis", text: storeInfo.freeDelivery },
          { icon: ShieldCheck, title: "Uzman seçim", text: "Yaş, ırk ve hassasiyete göre ürün tavsiyesi" },
          { icon: MapPin, title: "Alanya merkez", text: "Mağazadan teslim veya hızlı yerel dağıtım" }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-[8px] border hairline bg-white p-5 text-ink shadow-soft">
              <Icon size={24} className="text-leaf-600" aria-hidden="true" />
              <h2 className="mt-3 text-base font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
