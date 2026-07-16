# Alanya Pet Shop Modern Website

Modern Next.js 15, React 19, TailwindCSS ve Framer Motion ile hazırlanmış Pozitif Petshop Alanya vitrin sitesi.

## Kurulum

```bash
npm install
npm run dev
```

Gerçek yapay zeka sohbeti için `.env.local` dosyası oluşturup OpenAI API anahtarını ekleyin:

```bash
OPENAI_API_KEY=sk-proj-your-api-key
OPENAI_MODEL=gpt-5.6
```

Tarayıcıda aç:

```bash
http://localhost:3000
```

## Sayfalar

- `/`
- `/urunler`
- `/kategori/kopek`
- `/kategori/kedi`
- `/markalar`
- `/kampanyalar`
- `/hakkimizda`
- `/blog`
- `/iletisim`
- `/admin`

## Düzenleme

Ana içerikler `data/site.ts` içinden yönetilir. Görseller `public/images` klasöründedir.
