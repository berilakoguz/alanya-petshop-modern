export type Category = {
  name: string;
  slug: string;
  description: string;
  icon: "dog" | "cat" | "bird" | "fish" | "rabbit" | "sparkles";
  accent: string;
  image: string;
  objectPosition: string;
  count: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  rating: number;
  stock: "Stokta" | "Az kaldı";
  image: string;
  objectPosition: string;
};

export type Campaign = {
  title: string;
  description: string;
  eyebrow: string;
  tone: "leaf" | "aqua" | "coral";
};

export const storeInfo = {
  name: "Pozitif Petshop Alanya",
  shortName: "Pozitif Petshop",
  tagline: "Alanya'da evcil dostlar için premium mama, aksesuar ve bakım deneyimi.",
  phone: "+90 555 222 00 82",
  whatsapp: "905552220082",
  email: "info@alanyapetshops.com",
  address: "Saray Mahallesi, Alanya / Antalya",
  hours: "Haftanın 7 günü 09:00 - 22:00",
  freeDelivery: "Alanya içi 500 TL üzeri ücretsiz servis",
  mapsUrl: "https://maps.google.com/?q=Alanya%20Pet%20Shop"
};

export const navigation = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Kategoriler", href: "/kategori/kopek" },
  { label: "Markalar", href: "/markalar" },
  { label: "Kampanyalar", href: "/kampanyalar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "İletişim", href: "/iletisim" }
];

export const categories: Category[] = [
  {
    name: "Köpek",
    slug: "kopek",
    description: "Irka, yaşa ve hassasiyetlere göre mama, ödül ve bakım.",
    icon: "dog",
    accent: "#1f7a3d",
    image: "/images/category-flatlay.png",
    objectPosition: "18% 8%",
    count: 126
  },
  {
    name: "Kedi",
    slug: "kedi",
    description: "Sterilised, yavru, hassas sindirim ve tüy topağı çözümleri.",
    icon: "cat",
    accent: "#f26a4f",
    image: "/images/category-flatlay.png",
    objectPosition: "78% 14%",
    count: 142
  },
  {
    name: "Kuş",
    slug: "kus",
    description: "Yem, vitamin, kraker, oyuncak ve kafes ekipmanları.",
    icon: "bird",
    accent: "#ffc107",
    image: "/images/category-flatlay.png",
    objectPosition: "10% 68%",
    count: 54
  },
  {
    name: "Akvaryum",
    slug: "akvaryum",
    description: "Balık yemi, dekor, filtre, bakım ve akvaryum aksesuarları.",
    icon: "fish",
    accent: "#1aa6a6",
    image: "/images/category-flatlay.png",
    objectPosition: "23% 88%",
    count: 61
  },
  {
    name: "Kemirgen",
    slug: "kemirgen",
    description: "Hamster, tavşan ve guinea pig için doğal ürünler.",
    icon: "rabbit",
    accent: "#8d6e63",
    image: "/images/category-flatlay.png",
    objectPosition: "78% 88%",
    count: 38
  },
  {
    name: "Bakım",
    slug: "bakim",
    description: "Tüy, pati, deri, ağız ve hijyen bakımı için seçili ürünler.",
    icon: "sparkles",
    accent: "#6c63ff",
    image: "/images/category-flatlay.png",
    objectPosition: "60% 62%",
    count: 49
  }
];

export const brands = [
  "Royal Canin",
  "Pro Plan",
  "Acana",
  "Brit Care",
  "Hill's",
  "Reflex",
  "Animonda",
  "N&D",
  "GimCat",
  "Tetra",
  "Beaphar",
  "Vitakraft"
];

export const products: Product[] = [
  {
    id: "royal-canin-mini-adult",
    name: "Royal Canin Mini Adult Köpek Maması",
    category: "kopek",
    brand: "Royal Canin",
    description: "Küçük ırk yetişkin köpekler için dengeli günlük beslenme.",
    price: 1050,
    oldPrice: 1550,
    badge: "Çok Satan",
    rating: 4.9,
    stock: "Stokta",
    image: "/images/royal-canin-mini-adult.jpg",
    objectPosition: "50% 50%"
  },
  {
    id: "pro-plan-sterilised-salmon",
    name: "Pro Plan Sterilised Somonlu Kedi Maması",
    category: "kedi",
    brand: "Pro Plan",
    description: "Kısırlaştırılmış kediler için somonlu, yüksek proteinli formül.",
    price: 1000,
    oldPrice: 1699,
    badge: "Avantajlı",
    rating: 4.8,
    stock: "Stokta",
    image: "/images/pro-plan-kisirlastirilmis-somon-balikli-kedi-mamasi-1-5-kg-kedi-kuru-mamalari-pro-plan-19629-12-B.jpg",
    objectPosition: "50% 40%"
  },
  {
    id: "reflex-plus-lamb",
    name: "Reflex Plus Kuzu Etli Yetişkin Mama",
    category: "kopek",
    brand: "Reflex",
    description: "Hassas sindirimli yetişkin dostlar için kuzu etli lezzet.",
    price: 1149,
    badge: "Yeni",
    rating: 4.7,
    stock: "Stokta",
    image: "/images/product-assortment.png",
    objectPosition: "58% 40%"
  },
  {
    id: "tetramin-flakes",
    name: "TetraMin Tropical Flakes Balık Yemi",
    category: "akvaryum",
    brand: "Tetra",
    description: "Tropikal balıklar için dengeli pul yem karışımı.",
    price: 249,
    rating: 4.8,
    stock: "Az kaldı",
    image: "/images/product-assortment.png",
    objectPosition: "88% 47%"
  },
  {
    id: "Gold-Wings-Kanarya",
    name: "Gold Wings Classic Kanarya Yemi",
    category: "kus",
    brand: "Gold Wings",
    description: "Günlük aktiviteyi destekleyen ballı ve vitaminli ödül.",
    price: 89,
    badge: "3 al 2 öde",
    rating: 4.6,
    stock: "Stokta",
    image: "/images/JPM019141_62118.jpg",
    objectPosition: "74% 54%"
  },
  {
    id: "catit-water-fountain",
    name: "Catit Sessiz Kedi Su Pınarı",
    category: "kedi",
    brand: "Catit",
    description: "Daha fazla su içmeyi teşvik eden sessiz filtre sistemi.",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    stock: "Az kaldı",
    image: "/images/category-flatlay.png",
    objectPosition: "88% 56%"
  },
  {
    id: "eastland-harness",
    name: "Eastland Ayarlanabilir Göğüs Tasması",
    category: "kopek",
    brand: "Eastland",
    description: "Günlük yürüyüşlerde konforlu, sağlam ve hafif tasarım.",
    price: 329,
    rating: 4.7,
    stock: "Stokta",
    image: "/images/product-assortment.png",
    objectPosition: "38% 88%"
  },
  {
    id: "beaphar-malt-paste",
    name: "Beaphar Malt Paste Tüy Yumağı Desteği",
    category: "bakim",
    brand: "Beaphar",
    description: "Kedilerde tüy yumağı oluşumuna karşı günlük destek.",
    price: 219,
    badge: "Bakım",
    rating: 4.8,
    stock: "Stokta",
    image: "/images/product-assortment.png",
    objectPosition: "64% 60%"
  }
  ,
  {
    id: "bonnie-chicken",
    name: "BONNİE Tavuk Etli Yetişkin Kedi Maması ",
    category: "kedi",
    brand: "BONNİE",
    description: "10 kg",
    price: 900,
    rating: 4.8,
    stock: "Stokta",
    image: "/images/KEDİ-BONNİE-Tavuk-Etli-Yetişkin-Kedi-Maması .webp",
    objectPosition: "64% 60%"
  }
  ,
  {
    id: "felicia-salmon",
    name: "Felicia Tahılsız Sterilised Somonlu Yaş Kedi Maması ",
    category: "kedi",
    brand: " Felicia",
    description: "Felicia Tahılsız 85 gr Sterilised Somonlu Yaş Kedi Maması, kısırlaştırılmış yetişkin kediler için özel olarak geliştirilmiş, somonlu ve tahılsız tam yaş mamadır. Lezzetli içeriğiyle günlük beslenmeyi destekler ve hassas sindirime uygundur.",
    price: 45,
    rating: 4.8,
    stock: "Stokta",
    image: "/images/Felicia-Tahılsız-Sterilised-Somonlu-Yaş-Kedi-Maması.jpg",
    objectPosition: "64% 60%"
  }
  ,
  {
    id: " felicia-chicken",
    name: "Felicia Tahılsız 85 gr Sterilised Tavuklu Yaş Kedi Maması",
    category: "kedi",
    brand: " Felicia",
    description: "Felicia Tahılsız 85 gr Sterilised Tavuklu Yaş Kedi Maması, kısırlaştırılmış yetişkin kediler için özel olarak geliştirilmiş tam ve dengeli bir yaş mamadır. Tahılsız formülü ve lezzetli tavuk içeriğiyle günlük beslenmeyi destekler.",
    price: 45,
    rating: 4.8,
    stock: "Stokta",
    image: "/images/Felicia Tahılsız 85 gr Sterilised Tavuklu Yaş Kedi Maması.jpg",
    objectPosition: "64% 60%"
  }
  ,
  {
    id: "gourmet-gold-cifte-lezzet",
    name: "Gourmet Gold Çifte Lezzet Hindili ve Ördekli 85 gr Yaş Kedi Maması",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Çifte Lezzet Hindili ve Ördekli 85 gr, özenle hazırlanan hindi ve ördek etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.8,
    stock: "Stokta",
    image: "/images/Gourmet Gold Çifte Lezzet Hindili ve Ördekli 85 gr.jpeg",
    objectPosition: "64% 60%"
  }
   ,
  {
    id: "gourmet-gold-kiyilmis-sigir-etli",
    name: "Gourmet Gold Kıyılmış Sığır Etli Kedi Konservesi 85 gr",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Kıyılmış Sığır Etli Kedi Konservesi 85 gr, özenle seçilmiş sığır etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.8,
    stock: "Stokta",
    image: "/images/Gourmet Gold Kıyılmış Sığır Etli Kedi Konservesi 85 gr.jpg",
    objectPosition: "64% 60%"
  }
  ,{
    id: "Gourmet-Gold",
    name: "Gourmet Gold Çifte Lezzet Ciğerli&Tavşanlı Yaş Kedi Maması 85 g",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Çifte Lezzet Ciğerli & Tavşanlı 85 gr, ciğer ve tavşan etinin lezzetini bir araya getiren, yetişkin kediler için tam ve dengeli yaş mamadır. Günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/pro-plan-gourmet-gold-hindili-ordekli-konserve-kedi-mamasi-85-g-11037-510x510.jpg",
    objectPosition: "64% 60%"
  },
  ,{
    id: "Gourmet-Gold-Kiyilmis-Tavuklu",
    name: "Gourmet Gold Kıyılmış Tavuklu Yaş Kedi Maması, Yetişkin, 85 g",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Kıyılmış Tavuklu Yaş Kedi Maması, Yetişkin, 85 g, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Gourmet Gold Kıyılmış Tavuklu Yaş Kedi Maması, Yetişkin, 85 g.jpg",
    objectPosition: "64% 60%"
  },
  {
    id: "Gourmet-Gold-Parca-Etli-ve-Soslu-Alabalik-ve-Sebzeli",
    name: "Gourmet Gold Parça Etli ve Soslu Alabalık ve Sebzeli 85 gr",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Parça Etli ve Soslu Alabalık ve Sebzeli 85 gr, özenle hazırlanan alabalık ve sebzelerle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Gourmet Gold Parça Etli ve Soslu Alabalık ve Sebzeli 85 gr.webp",
    objectPosition: "64% 60%"
  },

  {
    id: "Gourmet-Gold-Kiyilmis-Hindili",
    name: "Gourmet Gold Kıyılmış Hindili 85 Gr",
    category: "kedi",
    brand: "Gourmet Gold",
    description: "Gourmet Gold Kıyılmış Hindili 85 Gr, özenle seçilmiş hindili etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Gurme Gold Kıyılmış Hindili 85 Gr.jpg",
    objectPosition: "64% 60%"
  },
   {
    id: "HILL’S-SCIENCE-PLAN-Sensitive-Stomach-&-Skin-Adult-Cat-Food-with-Chicken",
    name: "HILL’S SCIENCE PLAN Sensitive Stomach & Skin Adult Cat Food with Chicken",
    category: "kedi",
    brand: "HILL’S SCIENCE PLAN",
    description: "HILL’S SCIENCE PLAN Sensitive Stomach & Skin Adult Cat Food with Chicken, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 1800,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/HILL’S SCIENCE PLAN Sensitive Stomach & Skin Adult Cat Food with Chicken.jpg",
    objectPosition: "64% 60%"
  },
   {
    id: "HILL’S-Sterilised-Tavuklu-Kisirlastirilmis-Yetiskin-Kedi-Mamasi-1.5-KG",
    name: "Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG",
    category: "kedi",
    brand: "HILL’S SCIENCE PLAN",
    description: "Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 1700,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG.jpg",
    objectPosition: "64% 60%"
  },
  {
    id: "HILL’S-Sterilised-Tavuklu-Kisirlastirilmis-Yetiskin-Kedi-Mamasi-1.5-KG",
    name: "Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG",
    category: "kedi",
    brand: "HILL’S SCIENCE PLAN",
    description: "Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 1700,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Hill’s Sterilised Tavuklu Kısırlaştırılmış Yetişkin Kedi Maması 1.5 KG.jpg",
    objectPosition: "64% 60%"
  },
];

export const campaigns: Campaign[] = [
  {
    title: "Kedi ve köpek mamalarında hafta sonu fırsatı",
    description: "Seçili premium mamalarda sepette ekstra indirim ve aynı gün servis.",
    eyebrow: "Hafta Sonu",
    tone: "leaf"
  },
  {
    title: "Akvaryum başlangıç setlerinde danışmanlık bizden",
    description: "Filtre, yem, dekor ve bakım ürünlerini tek seferde doğru kurun.",
    eyebrow: "Akvaryum",
    tone: "aqua"
  },
  {
    title: "Oyuncak ve ödül ürünlerinde 3 al 2 öde",
    description: "Enerji atan dostlar için seçili oyuncak ve ödül ürünleri.",
    eyebrow: "Oyun",
    tone: "coral"
  }
];

export const testimonials = [
  {
    name: "Derya K.",
    text: "Mama seçimi konusunda çok iyi yönlendirdiler. Sipariş aynı gün evime geldi.",
    pet: "British Shorthair sahibi"
  },
  {
    name: "Mert A.",
    text: "Akvaryum kurulumunda ihtiyacım olan her şeyi tek tek anlattılar. Çok güvenilir.",
    pet: "Akvaryum hobisi"
  },
  {
    name: "Selin T.",
    text: "Köpeğimin hassas midesi için doğru mamayı burada bulduk. İlgi çok iyi.",
    pet: "Golden Retriever sahibi"
  }
];

export const blogPosts = [
  {
    title: "Kedilerde mama değişimi nasıl yapılmalı?",
    date: "12 Haziran 2026",
    excerpt: "Ani geçişler yerine 7 günlük kontrollü planla sindirimi koruyun.",
    href: "/blog"
  },
  {
    title: "Yaz aylarında köpek patisi bakımı",
    date: "04 Haziran 2026",
    excerpt: "Alanya sıcaklarında yürüyüş saatleri ve pati kremi seçimi önem kazanır.",
    href: "/blog"
  },
  {
    title: "Yeni akvaryumda ilk 14 gün",
    date: "24 Mayıs 2026",
    excerpt: "Su dengesi, yemleme ve filtre düzeni için pratik başlangıç rehberi.",
    href: "/blog"
  }
];

export const stats = [
  { value: "7/24", label: "WhatsApp destek" },
  { value: "500 TL+", label: "Ücretsiz servis" },
  { value: "12+", label: "Premium marka" },
  { value: "470+", label: "Seçili ürün" }
];
