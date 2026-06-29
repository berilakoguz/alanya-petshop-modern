import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { blogPosts } from "@/data/site";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Blog",
  description: "Pozitif Petshop Alanya bakım ve ürün seçimi rehberleri."
};

export default function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title="Pet bakımı için kısa ve uygulanabilir rehberler."
        description="Mama geçişinden sıcak hava bakımına kadar günlük hayatta işinize yarayacak içerikler."
        image="/images/category-flatlay.png"
      />
      <section className="py-16">
        <div className="container-shell">
          <Reveal>
            <SectionHeader
              eyebrow="Rehberler"
              title="Son yazılar"
              description="Veteriner tavsiyesinin yerini tutmaz; günlük bakım kararlarını kolaylaştıran pratik notlar sunar."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post, index) => (
              <Reveal key={post.title} delay={index * 0.05}>
                <article className="grid h-full rounded-[8px] border hairline bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4 text-sm font-bold text-neutral-500">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays size={17} /> {post.date}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={17} /> 4 dk
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black leading-tight text-ink">{post.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-neutral-600">{post.excerpt}</p>
                  <div className="mt-6 rounded-[8px] bg-bone p-4 text-sm leading-7 text-neutral-700">
                    Bu içerik alanı örnek yapı olarak hazırlandı. Gerçek blog metinlerini aynı kart yapısı içinde
                    genişletebilirsiniz.
                  </div>
                  <Link
                    href={post.href}
                    className="mt-6 inline-flex items-center font-bold text-green-700 hover:underline"
                  >
                 Devamını Oku →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
