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
  name: "Pozitif Petshop ",
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
  { label: "Kategoriler", href: "/#kategoriler" },,
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
    image: "/images/golden.jpg",
    objectPosition: "18% 8%",
    count: 126
  },
  {
    name: "Kedi",
    slug: "kedi",
    description: "Sterilised, yavru, hassas sindirim ve tüy topağı çözümleri.",
    icon: "cat",
    accent: "#635e5d4b",
    image: "/images/sevimli-komik-kedi-yavrusu_23-2151923237.avif",
    objectPosition: "78% 14%",
    count: 142
  },
  {
    name: "Kuş",
    slug: "kus",
    description: "Yem, vitamin, kraker, oyuncak ve kafes ekipmanları.",
    icon: "bird",
    accent: "#ffc507",
    image: "/images/pngtree-adorable-little-yellow-budgie-in-the-wild-image_15687870.jpg",
    objectPosition: "50% 33%",
    count: 54
  },
  {
    name: "Balık",
    slug: "akvaryum",
    description: "Balık yemi, dekor, filtre, bakım ve akvaryum aksesuarları.",
    icon: "fish",
    accent: "#1aa6a6",
    image: "/images/shutterstock_440173831.jpg",
    objectPosition: "23% 88%",
    count: 1
  },
  {
    name: "Kemirgen",
    slug: "kemirgen",
    description: "Hamster, tavşan ve guinea pig için doğal ürünler.",
    icon: "rabbit",
    accent: "#8d6e63",
    image: "/images/guinea-pig-appreciation-day.jpg",
    objectPosition: "78% 88%",
    count: 3
  },
  {
    name: "Fırsat Ürünleri",
    slug: "kampanyalar",
    description: "Tüy, pati, deri, ağız ve hijyen bakımı için seçili ürünler.",
    icon: "sparkles",
    accent: "#6c63ff",
    image: "/images/ChatGPT Image 29 Haz 2026 18_17_35.png",
    objectPosition: "80% 10%",
    count: 49
  }
];

export const brands = [
  "Acana",
  "Advance",
  "Animonda",
  "Beaphar",
  "BONNİE",
  "Brit Care",
  "Catit",
  "Cute Faces",
  "Daisy Premium Pet",
  "Decent",
  "Eastland",
  "Felicia",
  "Forlance",
  "Gold Wings",
  "Gourmet Gold",
  "Hill's Science Plan",
  "Liva",
  "Me-O",
  "Miamor",
  "Mito",
  "N&D",
  "Pro Plan",
  "Reflex",
  "Royal Canin",
  "Tetra",
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
    id: "Cute-Faces-Yavru-Köpek" ,
    name: "Cute Faces Kuzu Parça Etli Soslu Yavru Köpek Konservesi 400 Gr",
    category: "kopek",
    brand: "Cute Faces",
    description: "Kuzu etli, soslu tam yaş mama. Yavru köpeklerin günlük beslenmesini destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Cute-Faces-Kuzu-Parca-Etli-Soslu-Yavru-Kopek-Konservesi-400-Gr.jpg",
    objectPosition: "50% 50%"
  },
  {
  id: "Cute-Faces-Yetiskin-Kopek",
  name: "Cute Faces Kuzu Parça Etli Soslu Yetişkin Köpek Konservesi 400 Gr",
  category: "kopek",
  brand: "Cute Faces",
  description: "Kuzu etli, soslu tam yaş mama. Yetişkin köpeklerin günlük beslenmesini destekler.",
  price: 50,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/Cute-Faces-Kuzu-Parca-Etli-Soslu-Yetiskin-Kopek-Konservesi-400-Gr-510x510.jpg",
  objectPosition: "50% 50%"
},
{
  id: "Daisy-Premium-Pet-Yavru-Kopek",
  name: "Daisy Premium Pet Kuzu Etli Yavru Köpek Konservesi 415 Gr",
  category: "kopek",
  brand: "Daisy Premium Pet",
  description: "Yavru köpekler için kuzu etli, tam ve dengeli yaş mama.",
  price: 50,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/Daisy-Premium-Pet-Kuzu-Etli-Yavru-Kopek-Konservesi-415-Gr-510x510.jpg",
  objectPosition: "50% 50%"
},
{
  id: "Daisy-Premium-Pet-Yetiskin-Kopek",
  name: "Daisy Premium Pet Kuzu Etli Yetişkin Köpek Konservesi 415 Gr",
  category: "kopek",
  brand: "Daisy Premium Pet",
  description: "Yetişkin köpekler için kuzu etli, tam ve dengeli yaş mama.",
  price: 50,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/Daisy-Premium-Pet-Kuzu-Etli-Yetiskin-Kopek-Konservesi-415-Gr-510x510.jpg",
  objectPosition: "50% 50%"
},
{
  id: "Decent-Kuzu-Etli-Acik-1kg",
  name: "Decent Kuzu Etli Köpek Maması Açık 1 Kg",
  category: "kopek",
  brand: "Decent",
  description: "Köpekler için kuzu etli, tam ve dengeli kuru mama.",
  price: 120,
  rating: 4.7,
  stock: "Stokta",
  image: "/images/WhatsApp-Image-2021-07-10-at-16.33.57-510x510.jpeg",
  objectPosition: "50% 50%"
},
{
  id: "Forlance-Yavru-Kopek-15kg",
  name: "Forlance Yavru Köpek Maması Kuzu Etli 15 Kg",
  category: "kopek",
  brand: "Forlance",
  description: "Yavru köpekler için kuzu etli, tam ve dengeli kuru mama.",
  price: 0,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/forlance-yavru-kopek.webp",
  objectPosition: "50% 50%"
},
{
  id: "Forlance-Yavru-Kucuk-Irk-Acik-1kg",
  name: "Forlance Yavru ve Küçük Irk Köpek Maması Açık 1 Kg",
  category: "kopek",
  brand: "Forlance",
  description: "Yavru ve küçük ırklar için tam ve dengeli kuru mama.",
  price: 0,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/fourlance-yavru-kopek-mamasi-510x510.jpg",
  objectPosition: "50% 50%"
},
{
  id: "Liva-Yavru-Kopek-15kg",
  name: "Liva Kuzu Etli Yavru Köpek Maması 15 Kg",
  category: "kopek",
  brand: "Liva",
  description: "Yavru köpekler için kuzu etli, tam ve dengeli kuru mama.",
  price: 0,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/liva-yavru-kopek.webp",
  objectPosition: "50% 50%"
},
{
  id: "Liva-Yetiskin-Kopek-15kg",
  name: "Liva Kuzu Etli Yetişkin Köpek Maması 15 Kg",
  category: "kopek",
  brand: "Liva",
  description: "Yetişkin köpekler için kuzu etli, tam ve dengeli kuru mama.",
  price: 0,
  rating: 4.8,
  stock: "Stokta",
  image: "/images/liva-yet-kop.webp",
  objectPosition: "50% 50%"
},
{
  id: "ND-Ordek-Balkabagi-Kopek-Konservesi-140gr",
  name: "N&D Ördek & Balkabağı Köpek Konservesi 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için ördek etli, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-pumpkin-canine-140g-duck@web-x-site.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Ringa-Baligi-Karides-Kopek-Konservesi-140gr",
  name: "N&D Ringa Balığı & Karides Köpek Konservesi 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için ringa balıklı, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-ocean-canine-140g-herring-shrimp.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Ringa-Baligi-Karides-Yas-Mama-140gr",
  name: "N&D Ringa Balığı & Karides Yaş Mama 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için ringa balıklı, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/ndrr.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Skin-Coat-Geyik-Etli-Yas-Mama-140gr",
  name: "N&D Skin&Coat Geyik Etli Yaş Mama 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için geyik etli, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-sk.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Tavuk-Nar-Kopek-Konservesi-140gr",
  name: "N&D Tavuk & Nar Köpek Konservesi 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için tavuk etli, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-2277-mini-prime-tavuk-ve-nar-kopek-konserve-mamasi-140-gr-kopek-yas-mamalari-nd-116538-80-O.jpg",
  objectPosition: "50% 50%"
},
{
  id: "ND-Tavuk-Balkabagi-Nar-Yavru-Kopek-Yas-Mama-140gr",
  name: "N&D Tavuk, Balkabağı & Nar Yavru Köpek Yaş Mama 140 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Yavru köpekler için tavuk etli, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-pupy.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Dusuk-Tahilli-Kuzulu-Yabanmersinli-Kucuk-Irk-Yavru-25kg",
  name: "N&D Düşük Tahıllı Kuzulu ve Yabanmersinli Küçük Irk Yavru Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yavru köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1500,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/400_04_400_09_nd-ancestral-puppy-mini-lamb-spelt-blueberry-400x600pxl@img_farmina_site.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Dusuk-Tahilli-Kuzulu-Yabanmersinli-Kucuk-Irk-Yetiskin-25kg",
  name: "N&D Düşük Tahıllı Kuzulu ve Yabanmersinli Küçük Irk Yetişkin Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yetişkin köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1500,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/119_33_119_18_ND-Low-Ancestral-Grain-canine-Adult-Mini-LAMB@web.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Dusuk-Tahilli-Kuzulu-Yabanmersinli-Orta-Buyuk-Irk-25kg",
  name: "N&D Düşük Tahıllı Kuzulu ve Yabanmersinli Orta ve Büyük Irk Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yetişkin köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1500,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/401_19_401_37_nd-ancestral-puppy-medium-maxi-lamb-spelt-blueberry-400x600pxl@img_farmina_site.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Dusuk-Tahilli-Tavuklu-Narli-Kucuk-Irk-25kg",
  name: "N&D Düşük Tahıllı Tavuklu ve Narlı Küçük Irk Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Küçük ırk köpekler için tam ve dengeli kuru mama.",
  price: 1500,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-dusuk-tahil-mini-light-kucuk-irk-tavuk-nar-kopek-mamasi-2-5-kg-kopek-kuru-mamalari-nd-112776-12-O.jpg",
  objectPosition: "50% 50%"
},
{
  id: "ND-Alabalik-Somon-Baligi-Kopek-Konservesi-285gr",
  name: "N&D Alabalık & Somon Balığı Köpek Konservesi 285 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için alabalıklı, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-o.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Kuzu-Yabanmersini-Kopek-Konservesi-285gr",
  name: "N&D Kuzu & Yabanmersini Köpek Konservesi 285 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için kuzulu, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/ND-PR.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Geyik-Balkabagi-Kopek-Konservesi-285gr",
  name: "N&D Geyik & Balkabağı Köpek Konservesi 285 Gr",
  category: "kopek",
  brand: "N&D",
  description: "Köpekler için geyik etli, tam ve dengeli yaş mama.",
  price: 225,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/ND-PK.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Prime-Tahilsiz-Tavuk-Nar-Kucuk-Irk-Yavru-25kg",
  name: "N&D Prime Tahılsız Tavuk & Nar Küçük Irk Yavru Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yavru köpekler için tavuklu, tam ve dengeli kuru mama.",
  price: 1985,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-prime-mini-tavuk.jpg",
  objectPosition: "50% 50%"
},
{
  id: "ND-Tahilsiz-Kuzu-Yabanmersinli-Kucuk-Irk-Yetiskin-25kg",
  name: "N&D Tahılsız Kuzu Yaban Mersinli Küçük Irk Yetişkin Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yetişkin köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1985,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/nd-p-mini-adult-510x765.jpg",
  objectPosition: "50% 50%"
},
{
  id: "ND-Tahilsiz-Kuzulu-Balkabakli-Kucuk-Irk-Yavru-25kg",
  name: "N&D Tahılsız Kuzulu Balkabaklı Küçük Irk Yavru Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yavru köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1985,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/388_16_388_16_nd-pumpkin-puppy-mini-lamb-pumpkin-blueberry-400x600pxl@img_farmina_site.png",
  objectPosition: "50% 50%"
},
{
  id: "ND-Tahilsiz-Kuzulu-Balkabakli-Kucuk-Irk-Yetiskin-25kg",
  name: "N&D Tahılsız Kuzulu Balkabaklı Küçük Irk Yetişkin Köpek Maması 2,5 Kg",
  category: "kopek",
  brand: "N&D",
  description: "Yetişkin köpekler için kuzulu, tam ve dengeli kuru mama.",
  price: 1985,
  rating: 4.9,
  stock: "Stokta",
  image: "/images/392_49_nd-pumpkin-adult-mini-lamb-pumpkin-and-blueberry@img-site.png",
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
    brand: "Felicia",
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
    brand: "Hill's Science Plan",
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
    id: "Hills-Science-Plan-Adult-Kisirlastirilmis-Kediler-Icin-Somon-Balikli-Kedi-Mamasi-1.5-Kg",
    name: "Hills Science Plan Adult Kısırlaştırılmış Kediler Için Somon Balıklı Kedi Maması -1,5 Kg",
    category: "kedi",
    brand: "HILL’S SCIENCE PLAN",
    description: "Hills Science Plan Adult Kısırlaştırılmış Kediler Için Somon Balıklı Kedi Maması -1,5 Kg, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 1800,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Hills Science Plan Adult Kısırlaştırılmış Kediler Için Somon Balıklı Kedi Maması -1,5 Kg.jpg",
    objectPosition: "50% 50%"
  },
  {
    id: " Me-o Ton Balığı ve Peynirli",
    name: "Me-o Ton Balığı ve Peynirli 80 gr.",
    category: "kedi",
    brand: "Me-O",
    description: "Me-o Ton Balığı ve Peynirli 80 gr., özenle hazırlanan ton balığı ve peynirle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Me-o Ton Balığı ve Peynirli 80 gr..jpeg",
    objectPosition: "64% 60%"
  },
  {
    id: " Me-o Ton Balığı ve Sebzeli",
    name: "Me-o Ton Balığı ve Sebzeli 80 gr.",
    category: "kedi",
    brand: "Me-o",
    description: "Me-o Ton Balığı ve Sebzeli 80 gr., özenle hazırlanan ton balığı ve sebzelerle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Me-o Ton Balığı ve Sebzeli 80 gr..jpeg",
    objectPosition: "64% 60%"
  },
  {
    id: " Me-o Ton Balığı ve Tavuklu",
    name: "Me-o Ton Balığı ve Tavuklu 80 gr.",
    category: "kedi",
    brand: "Me-o",
    description: "Me-o Ton Balığı ve Tavuklu 80 gr., özenle hazırlanan ton balığı ve tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Me-o Ton Balığı ve Tavuklu 80 gr..jpeg",
    objectPosition: "64% 60%"
  },
   {
    id: "Me-o Ton Balıklı 80 gr.",
    name: "Me-o Ton Balıklı 80 gr.",
    category: "kedi",
    brand: "Me-o",
    description: "Me-o Ton Balıklı 80 gr., özenle hazırlanan ton balığıyla yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 50,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Me-o Ton Balıklı 80 gr..jpeg",
    objectPosition: "64% 60%"
  },{
    id: "Miamor VITALDRINK Ördekli Yetişkin Kedi Çorbası 135 ml",
    name: "Miamor VITALDRINK Ördekli Yetişkin Kedi Çorbası 135 ml",
    category: "kedi",
    brand: "Miamor",
    description: "Miamor VITALDRINK Ördekli Yetişkin Kedi Çorbası 135 ml, özenle hazırlanan ördük etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 90,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Miamor VITALDRINK Ördekli Yetişkin Kedi Çorbası 135 ml.jpg",
    objectPosition: "64% 60%"
  },
  {
    id: "MIAMOR VITALDRINK TAVUK ETLİ KEDİ ÇORBASI 135ML",
    name: "MIAMOR VITALDRINK TAVUK ETLİ KEDİ ÇORBASI 135ML",
    category: "kedi",
    brand: "Miamor",
    description: "MIAMOR VITALDRINK TAVUK ETLİ KEDİ ÇORBASI 135ML, özenle hazırlanan tavuk etiyle yetişkin kediler için tam ve dengeli yaş mamadır. Lezzetli formülüyle günlük beslenmeyi destekler.",
    price: 90,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/MIAMOR VITALDRINK TAVUK ETLİ KEDİ ÇORBASI 135ML.jpg",
    objectPosition: "64% 60%"
  },
  {
    id: "Mito Renkli Kedi maması Açık 1 kg",
    name: "Mito Renkli Kedi maması Açık 1 kg",
    category: "kedi",
    brand: "Mito",
    description: "15 kg lık ambalajlardan bölünerek hava almadan özenle paketlenmiş açık mama",
    price: 150,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Mito Renkli Kedi maması Açık 1 kg.jpeg",
    objectPosition: "64% 60%"
  },
  {
    id: "Mito Tavuklu Kedi maması Açık 1 kg",
    name: "Mito Tavuklu Kedi maması Açık 1 kg",
    category: "kedi",
    brand: "Mito",
    description: "15 kg lık ambalajlardan bölünerek hava almadan özenle paketlenmiş açık mama",
    price: 150,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/Mito Tavuklu Kedi maması Açık 1 kg.jpeg",
    objectPosition: "64% 60%"
  },
  {
    id: " N&D Geyik & Balkabağı Yaş Mama 80gr",
    name: "N&D Geyik & Balkabağı Yaş Mama 80gr",
    category: "kedi",
    brand: "N&D",
    description: "%35 geyik kol eti, tavuk fileto, tavuk budu, %5 balkabağı, balık yağı, hayvansal yağ, az haşlanmış pirinç, fruktooligosakkaritler (FOS), kondroitin sülfat, glukozamin, vitaminler ve mineraller.",
    price: 80,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Geyik & Balkabağı Yaş Mama 80gr.png",
    objectPosition: "64% 60%"
  },
  {
    id: "N&D Geyik-Kinoa yaş mama 80 gr",
    name: "N&D Geyik-Kinoa yaş mama 80 gr",
    category: "kedi",
    brand: "N&D",
    description:"N&D Geyik Etli ve Kinoalı Kedi Yaş Maması 80 Gr, yüksek kaliteli geyik eti ve besleyici kinoa ile hazırlanmış, yetişkin kediler için tam ve dengeli premium yaş mamadır.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Geyik-Kinoa yaş mama 80 gr.png",
    objectPosition: "64% 60%"
  },
  {
    id: "N&D Kuzu – yaban mersini yaş mama 80 gr",
    name: "N&D Kuzu – yaban mersini yaş mama 80 gr",
    category: "kedi",
    brand: "N&D",
    description: "N&D Kuzu Etli ve Yaban Mersinli Kedi Yaş Maması 80 Gr, yüksek kaliteli kuzu eti ve besleyici yaban mersini ile hazırlanmış, yetişkin kediler için tam ve dengeli premium yaş mamadır.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Kuzu – yaban mersini yaş mama.png",
    objectPosition: "64% 60%"
  },
  {
    id: "N&D Kuzu, balkabağı & yaban mersini 80gr",
    name: "N&D Kuzu, balkabağı & yaban mersini 80gr",
    category: "kedi",
    brand: "N&D",
    description: "kuzu budu (%50), kuzu karaciğeri, balkabağı (%5), yaban mersini (%4), balık yağı, hayvansal yağ, az haşlanmış pirinç, fruktooligosakkaritler, kondroitin sülfat, glukozamin, vitaminler, mineraller.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Kuzu, balkabağı & yaban mersini 80gr.png",
    objectPosition: "64% 60%"
  },
   {
    id: "N&D NATURAL CHICKEN yaş mama 80gr",
    name: "N&D NATURAL CHICKEN yaş mama 80gr",
    category: "kedi",
    brand: "N&D",
    description: "N&D NATURAL CHICKEN yaş mama 80gr, yüksek kaliteli tavuk eti ve besleyici içeriklerle hazırlanmış, yetişkin kediler için tam ve dengeli premium yaş mamadır.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D NATURAL CHICKEN yaş mama.png",
    objectPosition: "64% 60%"
  },
   {
    id: "N&D Tavuk-Nar Yavru kedi yaş maması (kitten)",
    name: "N&D Tavuk-Nar Yavru kedi yaş maması (kitten)",
    category: "kedi",
    brand: "N&D",
    description: "N&D Tavuk-Nar Yavru kedi yaş maması (kitten), yüksek kaliteli tavuk eti ve besleyici içeriklerle hazırlanmış, yavru kediler için tam ve dengeli premium yaş mamadır.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Tavuk-Nar Yavru kedi yaş maması (kitten).png",
    objectPosition: "64% 60%"
  },
    {
    id: "N&D Ton balığı & Karides Yaş Mama 80gr",
    name: "N&D Ton balığı & Karides Yaş Mama 80gr",
    category: "kedi",
    brand: "N&D",
    description: "Ton balığı (%65), karides (%5), balık yağı, hayvansal yağ, fruktooligosakkaritler (FOS), kondroitin sülfat, glukozamin, vitaminler ve mineraller.",
    price: 95,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Ton balığı & Karides Yaş Mama 80gr.png",
    objectPosition: "64% 60%"
  },
    {
    id: "N&D Ton balığı & Somon Yaş Mama 80gr",
    name: "N&D Ton balığı & Somon Yaş Mama 80gr",
    category: "kedi",
    brand: "N&D",
    description: "Ton balığı (%60), somon filetosu (%10), balık yağı, hayvansal yağ, fruktooligosakkaritler (FOS), kondroitin sülfat, glukozamin, vitaminler ve mineraller.",
    price: 80,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Ton balığı & Somon Yaş Mama 80gr.png",
    objectPosition: "64% 60%"
  },
    {
    id: "N&D Ton balığı, Sardalya & Karides YAŞ MAMA",
    name: "N&D Ton balığı, Sardalya & Karides YAŞ MAMA",
    category: "kedi",
    brand: "N&D",
    description: "Ton balığı (%55), sardalya (%10), karides (%5), balık yağı, hayvansal yağ, fruktooligosakkaritler (FOS), kondroitin sülfat, glukozamin, vitaminler ve mineraller.",
    price: 80,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/N&D Ton balığı, Sardalya & Karides YAŞ MAMA.png",
    objectPosition: "64% 60%"
  },
    {
    id: "N&D Bal Kabaklı Bıldırcınlı Kedi Maması 1,5 kg",
    name: "N&D Bal Kabaklı Bıldırcınlı Kedi Maması 1,5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Bıldırcın, balkabağı ve nar içeren, yetişkin kediler için tam ve dengeli mama. Ham protein %44, ham yağ %20, ham lif %1,8, nem %8, ham kül %8,7, kalsiyum %1,1, fosfor %0,9, magnezyum %0,09, Omega-6 %3,3, Omega-3 %0,9, DHA %0,5 ve EPA %0,3 içerir.",
    price: 1635,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Bal Kabaklı Bıldırcınlı Kedi Maması 1,5 kg.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Balkabaklı Kuzu Etli Yaban Mersinli Tahılsız Kısır Kedi Maması 1.5 Kg",
    name: "N&DBalkabaklı Kuzu Etli Yaban Mersinli Tahılsız Kısır Kedi Maması 1.5 Kg",
    category: "kedi",
    brand: "N&D",
    description: "Kuzu, balkabağı ve yaban mersini içeren, yetişkin kısırlaştırılmış kediler için formüle edilmiş tam mama. Ham protein %46, ham yağ %11, ham lif %5,1, nem %8, ham kül %8,9, kalsiyum %1,2, fosfor %1, magnezyum %0,09, Omega-6 %2, Omega-3 %0,45, DHA %0,3 ve EPA %0,1 içerir.",
    price: 1635,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Balkabaklı Kuzu Etli Yaban Mersinli Tahılsız Kısır Kedi Maması 1.5 Kg.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Düşük Tahıllı Kuzulu Kedi Maması 1,5 KG",
    name: "ND Düşük Tahıllı Kuzulu Kedi Maması 1,5 KG",
    category: "kedi",
    brand: "N&D",
    description: "Yetişkin kediler için formüle edilmiş tam mama. Ham protein %36, ham yağ %20, ham lif %1,9, nem %8, ham kül %8,1, kalsiyum %1,1, fosfor %0,9, magnezyum %0,09, Omega-6 %3,4, Omega-3 %0,9, DHA %0,5 ve EPA %0,3 içerir.",
    price: 1165,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Düşük Tahıllı Kuzulu Kedi Maması 1,5 KG.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Düşük Tahıllı Tavuklu ve Narlı Kısırlaştırılmış Kedi Maması 1,5 KG",
    name: "ND Düşük Tahıllı Tavuklu ve Narlı Kısırlaştırılmış Kedi Maması 1,5 KG",
    category: "kedi",
    brand: "N&D",
    description: "Yetişkin kısırlaştırılmış kediler için formüle edilmiş tam mama. Ham protein %38, ham yağ %10, ham lif %5,5, nem %8, ham kül %8,3, kalsiyum %1,1, fosfor %0,9, magnezyum %0,08, Omega-6 %1,8, Omega-3 %0,4, DHA %0,25 ve EPA %0,15 içerir.",
    price: 1165,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Düşük Tahıllı Tavuklu ve Narlı Kısırlaştırılmış Kedi Maması 1,5 KG.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Nd Ocean Tahılsız Ringa Balığı Ve Portakallı Kısır Kedi Maması 1.5 kg",
    name: "ND Nd Ocean Tahılsız Ringa Balığı Ve Portakallı Kısır Kedi Maması 1.5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Ringa balığı ve portakal içeren, yetişkin kısırlaştırılmış kediler için formüle edilmiş tam mama. Ham protein %46, ham yağ %11, ham lif %5,1, nem %8, ham kül %8,9, kalsiyum %1, fosfor %0,9, magnezyum %0,08, Omega-6 %1,8, Omega-3 %0,6, DHA %0,35 ve EPA %0,15 içerir.",
    price: 1435,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Nd Ocean Tahılsız Ringa Balığı Ve Portakallı Kısır Kedi Maması 1.5 kg.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Ocean Morina, Balkabağı Karides & Kavun Kıtten 1,5 kg",
    name: "ND Ocean Morina, Balkabağı Karides & Kavun Kıtten 1,5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Morina balığı, karides, balkabağı ve kavun içeren, yavru kediler ile gebe ve emziren dişi kediler için formüle edilmiş tam mama. Ham protein %44, ham yağ %20, ham lif %1,8, nem %8, ham kül %8,5, kalsiyum %1, fosfor %0,9, magnezyum %0,08, Omega-6 %3,1, Omega-3 %1,4, DHA %0,7 ve EPA %0,4 içerir.",
    price: 1435,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Ocean Morina, Balkabağı Karides & Kavun Kıtten 1,5 kg.jpg",
    objectPosition: "64% 60%"
  },
    {
    id: "ND Prime Tahılsız Kuzulu Ve Yaban Mersinli Yetişkin Kedi Maması 1,5 Kg",
    name: "ND Prime Tahılsız Kuzulu Ve Yaban Mersinli Yetişkin Kedi Maması 1,5 Kg",
    category: "kedi",
    brand: "N&D",
    description: " Kuzu ve yaban mersini içeren, yetişkin kediler için formüle edilmiş tam mama. Ham protein %46, ham yağ %11, ham lif %5,1, nem %8, ham kül %8,9, kalsiyum %1, fosfor %0,9, magnezyum %0,08, Omega-6 %1,8, Omega-3 %0,6, DHA %0,35 ve EPA %0,15 içerir.",
    price: 1505,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Prime Tahılsız Kuzulu Ve Yaban Mersinli Yetişkin Kedi Maması 1,5 Kg.jpg",
    objectPosition: "64% 60%"
  },
     {
    id: "ND Pumpkin Tahılsız Bıldırcın Etli Balkabaklı ve Narlı Kısırlaştırılmış Kedi Maması – 1.5 kg",
    name: "ND Pumpkin Tahılsız Bıldırcın Etli Balkabaklı ve Narlı Kısırlaştırılmış Kedi Maması – 1.5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Bıldırcın, balkabağı ve nar içeren, yetişkin kısırlaştırılmış kediler için formüle edilmiş tam mama. Ham protein %46, ham yağ %11, ham lif %5,1, nem %8, ham kül %8,9, kalsiyum %1, fosfor %0,9, magnezyum %0,08, Omega-6 %1,8, Omega-3 %0,6, DHA %0,35 ve EPA %0,15 içerir.",
    price: 1635,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Pumpkin Tahılsız Bıldırcın Etli Balkabaklı ve Narlı Kısırlaştırılmış Kedi Maması – 1.5 kg.jpg",
    objectPosition: "64% 60%"
  }, 
      {
    id: "ND Tahılsız Bal Kabaklı Geyikli Kedi Maması 1,5 kg",
    name: "ND Tahılsız Bal Kabaklı Geyikli Kedi Maması 1,5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Geyik, balkabağı ve elma içeren, yetişkin kediler için tam ve dengeli mama. Ham protein %42, ham yağ %20, ham lif %1,8, nem %8, ham kül %8,7, kalsiyum %1,1, fosfor %0,9, magnezyum %0,09, Omega-6 %3,4, Omega-3 %0,9, DHA %0,5 ve EPA %0,3 içerir.",
    price: 1635,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Tahılsız Bal Kabaklı Geyikli Kedi Maması 1,5 kg.jpg",
    objectPosition: "64% 60%"
  },
        {
    id: "ND Tahılsız Bal Kabaklı Ördekli Kedi Maması 1,5 kg",
    name: "ND Tahılsız Bal Kabaklı Ördekli Kedi Maması 1,5 kg",
    category: "kedi",
    brand: "N&D",
    description: "Ördek, balkabağı ve kavun içeren, yetişkin kediler için formüle edilmiş tam mama. Ham protein %44, ham yağ %20, ham lif %1,8, nem %8, ham kül %8,7, kalsiyum %1,1, fosfor %0,9, magnezyum %0,09, Omega-6 %3,3, Omega-3 %0,9, DHA %0,5 ve EPA %0,3 içerir.",
    price: 1635,
    rating: 4.9,
    stock: "Stokta",
    image: "/images/ND Tahılsız Bal Kabaklı Ördekli Kedi Maması.jpg",
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
