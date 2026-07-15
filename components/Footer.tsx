import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { categories, navigation, storeInfo } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="inline-flex rounded-[8px] bg-white p-3 shadow-soft">
            <img
              src="/images/alanya-petshop-1.png"
              alt={storeInfo.name}
              className="h-16 w-auto max-w-[340px] object-contain"
            />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/68">{storeInfo.tagline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://www.instagram.com/pozitifpetmarket?igsh=MzZsb3loaHJ0b3h0"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-ink"
            >
              <Instagram size={19} />
            </a>
            <a
              href="https://www.facebook.com/share/1Yon8C6JDC/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-ink"
            >
              <Facebook size={19} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/48">Menü</h2>
          <div className="mt-5 grid gap-3">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="text-sm font-semibold text-white/72 hover:text-amber">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/48">Kategoriler</h2>
          <div className="mt-5 grid gap-3">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/kategori/${item.slug}`}
                className="text-sm font-semibold text-white/72 hover:text-amber"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-white/48">İletişim</h2>
          <div className="mt-5 grid gap-4 text-sm text-white/72">
            <a href={`tel:${storeInfo.phone.replaceAll(" ", "")}`} className="flex gap-3 hover:text-amber">
              <Phone size={18} className="shrink-0" />
              {storeInfo.phone}
            </a>
            <a href={`mailto:${storeInfo.email}`} className="flex gap-3 hover:text-amber">
              <Mail size={18} className="shrink-0" />
              {storeInfo.email}
            </a>
            <a href={storeInfo.mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:text-amber">
              <MapPin size={18} className="shrink-0" />
              {storeInfo.address}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container-shell flex flex-wrap items-center justify-between gap-3 text-sm text-white/52">
          <p>© 2026 {storeInfo.name}. Tüm hakları saklıdır.</p>
          <Link href="/admin" className="hover:text-amber">
            Yönetim paneli
          </Link>
        </div>
      </div>
    </footer>
  );
}
