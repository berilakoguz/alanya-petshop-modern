import type { Metadata } from "next";
import { BarChart3, Boxes, Megaphone, PlusCircle, Tags } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { categories, campaigns, products } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  description: "Pozitif Petshop demo yönetim paneli."
};

export default function AdminPage() {
  const metrics = [
    { label: "Ürün", value: products.length, icon: Boxes },
    { label: "Kategori", value: categories.length, icon: Tags },
    { label: "Kampanya", value: campaigns.length, icon: Megaphone },
    { label: "Ortalama puan", value: "4.8", icon: BarChart3 }
  ];

  return (
    <main>
      <PageHero
        eyebrow="Admin"
        title="Ürün, kategori ve kampanya yönetimi için demo panel."
        description="Bu sayfa statik demo olarak hazırlandı. İleride gerçek veritabanı veya CMS bağlantısıyla geliştirilebilir."
        image="/images/product-assortment.png"
      />
      <section className="py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Panel"
              title="Mağaza operasyonunu tek ekrandan takip edin."
              description="Statik verilerle hazırlanmış modern bir yönetim arayüzü örneği."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Reveal key={metric.label} delay={index * 0.04}>
                  <article className="rounded-[8px] border hairline bg-white p-5 shadow-sm">
                    <Icon size={24} className="text-leaf-600" aria-hidden="true" />
                    <p className="mt-5 text-4xl font-black text-ink">{metric.value}</p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-neutral-500">{metric.label}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="overflow-hidden rounded-[8px] border hairline bg-white shadow-sm">
                <div className="flex items-center justify-between gap-4 border-b hairline p-5">
                  <h2 className="text-xl font-black text-ink">Ürün Listesi</h2>
                  <button className="inline-flex min-h-10 items-center gap-2 rounded-[8px] bg-leaf-500 px-4 text-sm font-black text-white">
                    <PlusCircle size={18} /> Ürün Ekle
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead className="bg-bone text-xs uppercase tracking-[0.14em] text-neutral-500">
                      <tr>
                        <th className="px-5 py-4">Ürün</th>
                        <th className="px-5 py-4">Marka</th>
                        <th className="px-5 py-4">Kategori</th>
                        <th className="px-5 py-4">Fiyat</th>
                        <th className="px-5 py-4">Stok</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 6).map((product) => (
                        <tr key={product.id} className="border-t hairline">
                          <td className="px-5 py-4 font-black text-ink">{product.name}</td>
                          <td className="px-5 py-4 text-neutral-600">{product.brand}</td>
                          <td className="px-5 py-4 text-neutral-600">{product.category}</td>
                          <td className="px-5 py-4 font-black text-ink">{formatPrice(product.price)}</td>
                          <td className="px-5 py-4 text-aqua">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <form className="grid gap-4 rounded-[8px] border hairline bg-white p-6 shadow-sm">
                <h2 className="text-xl font-black text-ink">Hızlı Ürün Ekle</h2>
                {["Ürün adı", "Marka", "Kategori", "Fiyat"].map((label) => (
                  <label key={label} className="grid gap-2 text-sm font-black text-ink">
                    {label}
                    <input
                      className="min-h-11 rounded-[8px] border hairline bg-bone px-4 text-sm font-semibold outline-none focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
                      placeholder={label}
                    />
                  </label>
                ))}
                <label className="grid gap-2 text-sm font-black text-ink">
                  Açıklama
                  <textarea
                    className="min-h-28 resize-none rounded-[8px] border hairline bg-bone px-4 py-3 text-sm font-semibold outline-none focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
                    placeholder="Kısa ürün açıklaması"
                  />
                </label>
                <button
                  type="button"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-black text-white"
                >
                  <PlusCircle size={18} /> Kaydet
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
