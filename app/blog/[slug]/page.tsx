import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, CheckCircle2, Clock } from "lucide-react";
import { blogPosts } from "@/data/site";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Blog Yazısı"
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image]
    }
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  const otherPosts = blogPosts.filter((item) => item.slug !== slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <section className="relative isolate overflow-hidden bg-ink py-16 text-white md:py-24">
          <img src={post.image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/82 to-ink/36" />
          <div className="container-shell max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-black text-white/76 hover:text-amber">
              <ArrowLeft size={17} />
              Bloga Dön
            </Link>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold text-white/72">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} /> {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={17} /> {post.readTime} okuma
              </span>
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl font-black leading-tight md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">{post.excerpt}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-shell grid gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
            <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm md:p-10">
              <div className="space-y-7 text-lg leading-9 text-neutral-700">
                {post.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="sticky top-32 grid gap-5">
              <div className="rounded-[8px] border hairline bg-bone p-6">
                <h2 className="text-xl font-black text-ink">Kısa Notlar</h2>
                <div className="mt-5 grid gap-4">
                  {post.tips.map((tip) => (
                    <div key={tip} className="flex gap-3 text-sm leading-7 text-neutral-700">
                      <CheckCircle2 size={19} className="mt-1 shrink-0 text-leaf-600" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {otherPosts.length > 0 ? (
                <div className="rounded-[8px] border hairline bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-black text-ink">Diğer Yazılar</h2>
                  <div className="mt-5 grid gap-4">
                    {otherPosts.map((item) => (
                      <Link key={item.slug} href={item.href} className="group block rounded-[8px] bg-bone p-4">
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-neutral-500">{item.date}</p>
                        <h3 className="mt-2 text-sm font-black leading-6 text-ink group-hover:text-leaf-700">
                          {item.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
