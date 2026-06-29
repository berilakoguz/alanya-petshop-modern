import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-[70svh] place-items-center px-4 py-20 text-center">
      <div className="max-w-lg">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-leaf-600">404</p>
        <h1 className="mt-4 text-4xl font-black leading-tight text-ink md:text-5xl">Aradığınız sayfa bulunamadı.</h1>
        <p className="mt-4 text-neutral-600">Ana sayfaya dönerek kategorileri ve ürünleri keşfetmeye devam edebilirsiniz.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-black text-white"
        >
          <Home size={18} />
          Ana Sayfa
        </Link>
      </div>
    </main>
  );
}
