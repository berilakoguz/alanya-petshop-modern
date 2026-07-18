import { AIEngine } from "../lib/chatbot/AIEngine";
import { normalizeTerm } from "../lib/product-intelligence";

type Scenario = {
  category: string;
  input: string;
  expectedAny: string[];
};

type ScenarioGroup = {
  category: string;
  expectedAny: string[];
  inputs: string[];
};

const baseGroups: ScenarioGroup[] = [
  {
    category: "greeting",
    expectedAny: ["merhaba", "pozitif petshop", "yardim", "gayet iyiyim"],
    inputs: [
      "Merhaba",
      "Selam",
      "Selamlar",
      "İyi günler",
      "İyi akşamlar",
      "Günaydın",
      "Nasılsın",
      "Burada mısın",
      "Yardım eder misin",
      "Bana yardımcı ol"
    ]
  },
  {
    category: "profile",
    expectedAny: ["bilgiyi not aldim", "ne ariyorsunuz", "hazirim", "yasi", "baslangic rehberi", "guvenli baslangic", "kemirgen", "akvaryum"],
    inputs: [
      "Kedim var",
      "Köpeğim var",
      "Muhabbet kuşum var",
      "Akvaryumum var",
      "Hamsterım var",
      "Tavşanım var",
      "2 kedim var",
      "3 köpeğim var",
      "Yavru kedim var",
      "Yavru köpeğim var",
      "2 yaşında kedim var",
      "10 yaşında kedim var",
      "3 aylık köpeğim var",
      "British kedim var",
      "Scottish kedim var",
      "Golden köpeğim var",
      "Labrador köpeğim var",
      "Pomeranian köpeğim var",
      "Chihuahua köpeğim var"
    ]
  },
  {
    category: "new-pet",
    expectedAny: ["baslangic", "ilk ihtiyac", "ilk 48", "yeni dost"],
    inputs: [
      "Yeni sahiplendim",
      "Sokak kedisi sahiplendim",
      "Sokak köpeği sahiplendim",
      "İlk defa kedi besliyorum",
      "İlk defa köpek besliyorum",
      "Yeni evcil hayvan aldım",
      "İlk defa yavru kedi aldım",
      "İlk defa yavru köpek aldım",
      "Yeni sahiplendiğim yavru kedi için başlangıç listesi çıkar",
      "Yavru köpek için başlangıç listesi hazırla"
    ]
  },
  {
    category: "pregnancy",
    expectedAny: ["hamilelik", "dogum", "emzir", "anne", "yavrular"],
    inputs: [
      "Kedim hamile",
      "Köpeğim hamile",
      "Kedim yavruladı",
      "Kedim doğum yaptı",
      "Kedim emziriyor",
      "Kedim hamile olabilir",
      "Kedim çiftleşti",
      "Köpeğim yavru doğurdu",
      "Köpeğim hamile olabilir",
      "Köpeğim emziriyor",
      "Yeni doğum yaptı",
      "Yavruları oldu"
    ]
  },
  {
    category: "food-product",
    expectedAny: ["urun", "mama", "secenek", "oner", "katalog", "hangi dostumuz", "butce"],
    inputs: [
      "Mama öner",
      "Mama lazım",
      "Mama arıyorum",
      "En iyi mama hangisi",
      "En kaliteli mama",
      "Ucuz mama öner",
      "Premium mama öner",
      "Tahılsız mama öner",
      "Tahıllı mama öner",
      "Yaş mama öner",
      "Kuru mama öner",
      "Yavru mama öner",
      "Yetişkin mama öner",
      "Yaşlı kedi maması öner",
      "Kısır kedi maması öner",
      "Kısır köpek maması öner",
      "Protein oranı yüksek mama",
      "Diyet mama öner",
      "Veteriner önerisi mama",
      "Mama alacağım",
      "En çok satılan mama hangisi",
      "Hangisini önerirsin",
      "Royal Canin mi Pro Plan mı",
      "N&D mi Brit Care mi",
      "Hangisi daha kaliteli",
      "Hangisi daha ekonomik",
      "Hangisini almalıyım",
      "1000 TL altı mama",
      "500 TL altı mama",
      "1500 TL bütçem var",
      "Bütçem kısıtlı",
      "En ucuz mama",
      "En pahalı mama",
      "Bu mama iyi mi",
      "Bu mama kötü mü",
      "Bunu önerir misin",
      "Bunu alayım mı",
      "Bu ürün nasıl",
      "En doğal mama hangisi",
      "İçeriği temiz mama öner",
      "Koruyucusuz ürün istiyorum",
      "Renklendiricisiz ürün istiyorum"
    ]
  },
  {
    category: "brand-stock",
    expectedAny: ["stok", "whatsapp", "telefon", "urun", "marka"],
    inputs: [
      "Mama stoğunuz var mı",
      "Royal Canin var mı",
      "Pro Plan var mı",
      "N&D var mı",
      "Brit Care var mı",
      "Reflex var mı",
      "Hill's var mı",
      "Acana var mı",
      "Orijen var mı",
      "Felicia var mı",
      "Bonnie var mı",
      "Mio var mı",
      "Lavital var mı",
      "Stokta var mı",
      "Ne zaman gelir",
      "Hemen alabilir miyim",
      "Gelip alabilir miyim",
      "Mağazada var mı",
      "İnternette var mı",
      "Aynı gün alabilir miyim"
    ]
  },
  {
    category: "accessory-guidance",
    expectedAny: ["uygun", "secim", "ihtiyac", "dikkat", "oner", "kum", "bakim", "tuvalet", "aksesuar"],
    inputs: [
      "Kedi kumu öner",
      "Topaklanan kum öner",
      "Kristal kum öner",
      "Bentonit kum öner",
      "Koku yapmayan kum",
      "Tozsuz kum",
      "Oyuncak öner",
      "Lazer oyuncak var mı",
      "Top öner",
      "Zeka oyuncağı öner",
      "Köpek oyuncağı öner",
      "Kemirme oyuncağı öner",
      "Kedi oyuncağı öner",
      "Şampuan öner",
      "Kulak temizleyici öner",
      "Göz temizleyici öner",
      "Tarak öner",
      "Fırça öner",
      "Tırnak makası öner",
      "Vitamin öner",
      "Omega 3 öner",
      "Eklem desteği öner",
      "Bağışıklık vitamini öner",
      "Malt öner",
      "Probiyotik öner",
      "Ödül maması öner",
      "Ödül çubuğu öner",
      "Kemik öner",
      "Diş temizleme ürünü öner",
      "Su pınarı öner",
      "Mama kabı öner",
      "Su kabı öner",
      "Taşıma çantası öner",
      "Taşıma kafesi öner",
      "Kedi yatağı öner",
      "Köpek yatağı öner",
      "Tasma öner",
      "Göğüs tasması öner",
      "Gezdirme tasması öner",
      "GPS tasma var mı",
      "Kedime hangi kum uygun",
      "Kedime hangi oyuncak uygun",
      "Kedime hangi yatak uygun",
      "Kedime hangi taşıma çantası uygun",
      "Köpeğime hangi yatak uygun",
      "Köpeğime hangi oyuncak uygun",
      "Köpeğime hangi tasma uygun",
      "Köpeğime hangi şampuan uygun"
    ]
  },
  {
    category: "cat-health",
    expectedAny: ["veteriner", "acil", "ilk kontrol", "durumu anladim", "yutma", "davranis", "ilk adim"],
    inputs: [
      "Kedim kusuyor",
      "Kedim ishal oldu",
      "Kedim yemek yemiyor",
      "Kedim su içmiyor",
      "Kedim çok su içiyor",
      "Kedim halsiz",
      "Kedim sürekli uyuyor",
      "Kedim kaşınıyor",
      "Kedim tüy döküyor",
      "Kedim gözünü açamıyor",
      "Kedim burnu akıyor",
      "Kedim hapşırıyor",
      "Kedim öksürüyor",
      "Kedim nefes alamıyor",
      "Kedim iyi değil",
      "Kedim hasta galiba",
      "Kedim çok zayıfladı",
      "Kedim kilo almıyor",
      "Kedim kan kustu",
      "Kedim kanlı ishal",
      "Kedim ağzı kokuyor",
      "Kedimin dişleri sarardı",
      "Kedimin pati kanıyor",
      "Kedimin gözü kızardı",
      "Kedimin üzerinde pire gördüm",
      "Kedimin üzerinde kene gördüm"
    ]
  },
  {
    category: "dog-health",
    expectedAny: ["veteriner", "acil", "ilk kontrol", "durumu anladim", "yutma", "davranis", "ilk adim"],
    inputs: [
      "Köpeğim kusuyor",
      "Köpeğim ishal",
      "Köpeğim yemek yemiyor",
      "Köpeğim su içmiyor",
      "Köpeğim çok su içiyor",
      "Köpeğim topallıyor",
      "Köpeğim titriyor",
      "Köpeğim kaşınıyor",
      "Köpeğim pire oldu",
      "Köpeğim kene oldu",
      "Köpeğimin kulağı kokuyor",
      "Köpeğimin gözü kızardı",
      "Köpeğimin tüyü dökülüyor",
      "Köpeğimin derisi kızardı",
      "Köpeğimin karnı şiş",
      "Köpeğimin midesi bozuldu",
      "Köpeğim ilaç kullanıyor",
      "Köpeğim ameliyat oldu",
      "Köpeğim yaşlandı",
      "Köpeğim kilo vermeli",
      "Köpeğim kilo almalı"
    ]
  },
  {
    category: "toxins",
    expectedAny: ["acil", "yutma", "zehirlenme", "veteriner", "kusturmaya"],
    inputs: [
      "Kedim çikolata yedi",
      "Kedim üzüm yedi",
      "Kedim soğan yedi",
      "Kedim ilaç yedi",
      "Kedim çamaşır suyu içti",
      "Kedim ip yuttu",
      "Kedim plastik yedi",
      "Kedim çiçek yedi",
      "Kedim oyuncak yuttu",
      "Köpeğim çikolata yedi",
      "Köpeğim fare zehri yedi",
      "Köpeğim üzüm yedi",
      "Köpeğim kemik yuttu",
      "Köpeğim avokado yedi",
      "Köpeğim soğan yedi"
    ]
  },
  {
    category: "bird-fish-rodent",
    expectedAny: ["kus", "akvaryum", "kemirgen", "takip", "denge", "guvenli", "baslangic", "veteriner", "yonlendirme", "aksesuar", "secim"],
    inputs: [
      "Kuşum yem yemiyor",
      "Kuşum tüy döküyor",
      "Kuşum hasta gibi",
      "Balığım öldü",
      "Balığım yüzmüyor",
      "Balığım ters dönüyor",
      "Akvaryum suyu bulanık",
      "Filtre öner",
      "Isıtıcı öner",
      "Akvaryum kumu öner",
      "Canlı bitki öner",
      "Hamsterım var neye dikkat etmeliyim",
      "Tavşanım var ne önerirsin",
      "Kaplumbağam var neye dikkat etmeliyim",
      "Kirpim var ne yapmalıyım",
      "Papağanım var",
      "İguanam var",
      "Yılanım var",
      "Gelincik besliyorum"
    ]
  },
  {
    category: "store",
    expectedAny: ["adres", "telefon", "whatsapp", "calisma", "teslimat", "teyit"],
    inputs: [
      "Mağazanız nerede",
      "Adresiniz nedir",
      "Telefon numaranız nedir",
      "WhatsApp var mı",
      "Bugün açık mısınız",
      "Saat kaçta açılıyorsunuz",
      "Saat kaçta kapanıyorsunuz",
      "Pazar açık mısınız",
      "Kargo var mı",
      "Kurye var mı",
      "Aynı gün teslimat var mı",
      "Çalışma saatleri nedir",
      "Öğle arasında açık mısınız",
      "Resmi tatilde açık mısınız",
      "Cumartesi açık mısınız",
      "Akşam kaça kadar açıksınız",
      "Şubeleriniz var mı",
      "Başka mağazanız var mı",
      "Alanya dışına gönderiyor musunuz",
      "Türkiye geneline gönderiyor musunuz",
      "Yurtdışına gönderiyor musunuz"
    ]
  },
  {
    category: "delivery-payment",
    expectedAny: ["odeme", "kargo", "whatsapp", "telefon", "teslimat", "teyit", "kampanya", "indirim"],
    inputs: [
      "Ücretsiz kargo var mı",
      "Kaç TL üstü kargo bedava",
      "Kargo kaç TL",
      "Kapıda ödeme var mı",
      "Taksit oluyor mu",
      "İndirim kodu var mı",
      "Kampanya kodu var mı",
      "İlk alışveriş indirimi var mı",
      "Sadakat puanı var mı",
      "Üyelik gerekiyor mu",
      "Hesap açmadan alabilir miyim",
      "Kredi kartı geçiyor mu",
      "Havale olur mu",
      "EFT olur mu",
      "Nakit ödeme olur mu",
      "Online sipariş verebilir miyim",
      "İnternet siteniz var mı"
    ]
  },
  {
    category: "order-support",
    expectedAny: ["siparis", "whatsapp", "telefon", "destek", "kargo"],
    inputs: [
      "Siparişim nerede",
      "İade yapabilir miyim",
      "Değişim oluyor mu",
      "Siparişimi iptal edebilir miyim",
      "Yanlış ürün aldım",
      "Ürünü değiştirmek istiyorum",
      "İade süresi kaç gün",
      "Paketi açtım iade olur mu",
      "Mama bayat çıktı",
      "Ürün hasarlı geldi",
      "Yanlış ürün geldi",
      "Eksik ürün geldi",
      "Kargom kayıp",
      "Kargo gecikti",
      "Kargom nerede kaldı",
      "Takip numaram yok",
      "Siparişimi düzenlemek istiyorum",
      "Kargo adresini değiştirmek istiyorum",
      "Beni biri arasın",
      "Müşteri hizmetleri var mı",
      "WhatsApp destek var mı",
      "Telefon açabilir miyim"
    ]
  },
  {
    category: "site-support",
    expectedAny: ["tarayici", "ekran", "whatsapp", "yenileyin", "sorun", "temiz bir sayfa"],
    inputs: [
      "Ürün çıkmıyor",
      "Stok görünmüyor",
      "Sepete eklenmiyor",
      "Ödeme olmuyor",
      "Site çok yavaş",
      "Sayfa açılmıyor",
      "Fotoğraflar yüklenmiyor",
      "Ürün resmi görünmüyor",
      "Ürün açıklaması eksik",
      "Fiyat yanlış görünüyor",
      "Sepette fiyat değişti",
      "Adres ekleyemiyorum",
      "Telefon numarası kabul etmiyor",
      "Filtreyi temizle",
      "Arama yap",
      "Ürünü bulamıyorum"
    ]
  },
  {
    category: "behavior",
    expectedAny: ["davranis", "ilk adim", "stres", "oyun", "rutin", "egitim"],
    inputs: [
      "Evcil hayvanım çok korkuyor",
      "Evcil hayvanım yalnız kalıyor",
      "Evcil hayvanım çok havlıyor",
      "Evcil hayvanım miyavlıyor",
      "Evcil hayvanım eşyaları kemiriyor",
      "Evcil hayvanım koltuğu tırmalıyor",
      "Evcil hayvanım tuvaletini dışarı yapıyor",
      "Evcil hayvanım agresifleşti",
      "Evcil hayvanım sürekli beni takip ediyor",
      "Kedim neden sürekli uyuyor",
      "Kedim neden gece koşuyor",
      "Kedim sürekli miyavlıyor",
      "Kedim geceleri uyutmuyor",
      "Kedim koltuğu parçaladı",
      "Kedim perdeye tırmanıyor",
      "Kedim saldırıyor",
      "Kedim ısırıyor",
      "Kedim tırmalıyor",
      "Kedim korkuyor",
      "Kedim misafir görünce kaçıyor",
      "Kedim köpekten korkuyor",
      "Kedim başka kediyi sevmiyor",
      "Kedim eve alışamadı",
      "Kedim streste",
      "Kedim korkudan saklanıyor",
      "Kedim yalnız kalınca miyavlıyor",
      "Kedim sürekli cama çıkıyor",
      "Köpeğim neden havlıyor",
      "Köpeğim neden uluyor",
      "Köpeğim neden eşyaları kemiriyor",
      "Köpeğim neden tuvaletini eve yapıyor",
      "Köpeğim neden korkuyor",
      "Köpeğim neden saldırgan",
      "Köpeğim neden beni takip ediyor",
      "Köpeğim neden geceleri havlıyor",
      "Köpeğim çok havlıyor",
      "Köpeğim yalnız kalamıyor",
      "Köpeğim beni takip ediyor",
      "Köpeğim evde tuvalet yapıyor",
      "Köpeğim ayakkabımı parçaladı",
      "Köpeğim çöp karıştırıyor",
      "Köpeğim yerde ne bulsa yiyor",
      "Köpeğim sürekli pati yalıyor",
      "Köpeğim kuyruğunu kovalıyor",
      "Köpeğim yabancılara havlıyor",
      "Köpeğim çocuklardan korkuyor",
      "Köpeğim diğer köpekleri sevmiyor",
      "Köpeğim kedileri kovalıyor",
      "Köpeğim misafir görünce havlıyor",
      "Köpeğim kapıyı tırmalıyor"
    ]
  },
  {
    category: "training",
    expectedAny: ["egitim", "odul", "komut", "tasma", "rutin", "yonlendirme"],
    inputs: [
      "Tuvalet eğitimi nasıl verilir",
      "Otur komutu nasıl öğretilir",
      "Gel komutu nasıl öğretilir",
      "Bekle komutu nasıl öğretilir",
      "Tasmasız gezdirebilir miyim",
      "Ağızlık gerekli mi",
      "En sağlam tasma hangisi",
      "En sağlam oyuncak hangisi",
      "Oyuncağı hemen parçalıyor",
      "Isırmayı bırakmıyor",
      "Enerjisini nasıl atar",
      "Köpeğim eğitim almamış",
      "Köpeğim tasma taktırmıyor"
    ]
  },
  {
    category: "litter-house",
    expectedAny: ["tuvalet", "kum", "koku", "ilk adim", "saglik"],
    inputs: [
      "Kum çok kokuyor",
      "Kum dışarı taşıyor",
      "Kedim kumu kullanmıyor",
      "Kum değiştirmek istiyorum",
      "Kedim kuma gitmiyor",
      "Kedim tuvalet yapmıyor",
      "Kedim kum kabına girmiyor",
      "Kedim kumu eşeliyor ama yapmıyor",
      "Kedim yatağa çiş yaptı",
      "Kedim koltuğa çiş yaptı",
      "Koku giderici var mı",
      "Kum kokusunu nasıl önlerim"
    ]
  },
  {
    category: "nutrition",
    expectedAny: ["beslenme", "verilmemelidir", "mama", "kalori", "olmaz", "saklama", "ogun", "risk", "degerlendirme"],
    inputs: [
      "Mama değiştirsem olur mu",
      "Mama değiştirirken nelere dikkat edeyim",
      "Mama kaç gün gider",
      "Mama nasıl saklanır",
      "Mama bozulur mu",
      "Mama son kullanma tarihi nerede",
      "Mama açıldıktan sonra kaç gün kullanılır",
      "Yaş mama dolapta saklanır mı",
      "Kuru mama açıkta durur mu",
      "Kedime köpek maması verilir mi",
      "Köpeğime kedi maması verilir mi",
      "Yavru kedi yetişkin maması yer mi",
      "Yavru köpek yetişkin maması yer mi",
      "Hamile kedi ne yer",
      "Hamile köpek ne yer",
      "Emziren kedi ne yer",
      "Emziren köpek ne yer",
      "Kedime süt verebilir miyim",
      "Kedime yoğurt verebilir miyim",
      "Kedime peynir verebilir miyim",
      "Kedime ton balığı verebilir miyim",
      "Kedime tavuk verebilir miyim",
      "Kedime ciğer verebilir miyim",
      "Kedime yumurta verebilir miyim",
      "Kedime ekmek verebilir miyim",
      "Köpeğime kemik verebilir miyim",
      "Köpeğime süt verebilir miyim",
      "Köpeğime yoğurt verebilir miyim",
      "Köpeğime çikolata verirsem ne olur",
      "Köpeğime üzüm verirsem ne olur",
      "Köpeğime avokado verirsem ne olur",
      "Köpeğime soğan verirsem ne olur",
      "Köpeğime sarımsak verirsem ne olur",
      "Kedim kaç öğün yemeli",
      "Köpeğim kaç öğün yemeli",
      "Günde ne kadar mama vermeliyim",
      "Kaç gram mama vermeliyim"
    ]
  },
  {
    category: "information-only",
    expectedAny: ["sadece bilgi", "urun onermeden", "beslenme", "davranis"],
    inputs: [
      "Ben sadece bilgi almak istiyorum",
      "Ürün istemiyorum",
      "Mama istemiyorum",
      "Sadece soru soracağım"
    ]
  },
  {
    category: "services-policy",
    expectedAny: ["teyit", "telefon", "whatsapp", "hizmet", "guvenli"],
    inputs: [
      "Veteriner misiniz",
      "Veteriner hizmeti veriyor musunuz",
      "Aşı yapıyor musunuz",
      "Çip takıyor musunuz",
      "Tırnak kesiyor musunuz",
      "Banyo hizmetiniz var mı",
      "Pet kuaför var mı",
      "Evcil hayvan oteli var mı",
      "Evcil hayvan pansiyonu var mı",
      "Kedi sahiplendirme yapıyor musunuz",
      "Köpek sahiplendirme yapıyor musunuz",
      "Instagram hesabınız var mı",
      "Google yorumlarınız nasıl"
    ]
  },
  {
    category: "donation",
    expectedAny: ["toplu", "bagis", "whatsapp", "stok", "koordinasyon"],
    inputs: [
      "Sokak hayvanlarına yardım ediyor musunuz",
      "Mama bağışı yapabilir miyim",
      "Mama bağışı kabul ediyor musunuz",
      "Sokak kedileri için mama lazım",
      "Sokak köpekleri için mama lazım",
      "En ucuz sokak maması hangisi",
      "Toplu alım indirimi var mı",
      "10 paket alırsam indirim olur mu",
      "50 kilo mama lazım",
      "Barınak için mama lazım"
    ]
  },
  {
    category: "sorting",
    expectedAny: ["urun", "liste", "sirala", "kategori", "marka", "daralt", "goster", "kum"],
    inputs: [
      "En çok satan kedi maması",
      "En çok satan köpek maması",
      "En çok satılan kedi kumu",
      "En çok satılan oyuncak",
      "En çok satılan ödül maması",
      "Kampanyalı ürün göster",
      "İndirimli mamaları göster",
      "Stoktakileri göster",
      "Sadece kedi ürünlerini göster",
      "Sadece köpek ürünlerini göster",
      "Kuş ürünlerini göster",
      "Akvaryum ürünlerini göster",
      "Tavşan ürünlerini göster",
      "Kemirgen ürünlerini göster",
      "En yeni ürünler",
      "Yeni gelen ürünler",
      "Bugün eklenen ürünler",
      "Fiyatı en düşük ürünler",
      "Fiyatı en yüksek ürünler",
      "Markaya göre listele",
      "Fiyata göre sırala",
      "Puana göre sırala",
      "Çok satanlara göre sırala",
      "Daha ucuzunu göster",
      "Daha kalitelisini göster",
      "Aynı özellikte başka ürün var mı",
      "Benzer ürün göster",
      "Bu ürünün muadili var mı",
      "Aynı ürünün büyüğü var mı",
      "Aynı ürünün küçüğü var mı"
    ]
  },
  {
    category: "age-breed",
    expectedAny: ["yas", "cins", "foto", "ipuclari", "tahmin"],
    inputs: [
      "Kedim kaç aylık bilmiyorum",
      "Kedim kaç yaşında bilmiyorum",
      "Kedimin cinsi ne olabilir",
      "Kedimin cinsini öğrenebilir miyim",
      "Kedimin fotoğrafını atsam bakar mısın"
    ]
  }
];

function createGeneratedScenarios() {
  const generated: Scenario[] = [];

  const toxins = ["çikolata yedi", "üzüm yedi", "soğan yedi", "ilaç yedi", "ip yuttu", "plastik yedi"];
  for (const prefix of ["Kedim", "Köpeğim"]) {
    for (const toxin of toxins) {
      generated.push({
        category: "generated-toxins",
        input: `${prefix} ${toxin}`,
        expectedAny: ["acil", "yutma", "zehirlenme", "veteriner"]
      });
    }
  }

  const catBehaviors = [
    "neden miyavlıyor",
    "neden kum kazıyor",
    "neden koltuğu tırmalıyor",
    "neden beni ısırıyor",
    "neden mama yemiyor",
    "neden su içmiyor",
    "neden çok su içiyor",
    "neden tüy döküyor",
    "neden kusuyor",
    "neden ishal oldu",
    "neden korkuyor",
    "neden saklanıyor"
  ];
  for (const behavior of catBehaviors) {
    generated.push({
      category: "generated-cat-behavior",
      input: `Kedim ${behavior}`,
      expectedAny: ["davranis", "veteriner", "ilk adim", "stres"]
    });
  }

  const dogBehaviors = [
    "neden havlıyor",
    "neden uluyor",
    "neden eşyaları kemiriyor",
    "neden ayakkabı kemiriyor",
    "neden tuvaletini eve yapıyor",
    "neden mama yemiyor",
    "neden su içmiyor",
    "neden çok su içiyor",
    "neden kusuyor",
    "neden ishal",
    "neden halsiz",
    "neden topallıyor"
  ];
  for (const behavior of dogBehaviors) {
    generated.push({
      category: "generated-dog-behavior",
      input: `Köpeğim ${behavior}`,
      expectedAny: ["davranis", "veteriner", "ilk adim", "stres"]
    });
  }

  const accessoryTemplates = [
    "hangi mama uygun",
    "hangi yatak uygun",
    "hangi oyuncak uygun",
    "hangi tasma uygun",
    "hangi şampuan uygun"
  ];
  for (const prefix of ["Kedime", "Köpeğime"]) {
    for (const template of accessoryTemplates) {
      generated.push({
        category: "generated-accessory",
        input: `${prefix} ${template}`,
        expectedAny: ["uygun", "secim", "dikkat", "ihtiyac", "aksesuar", "bakim"]
      });
    }
  }

  const flavorInputs = ["tavuksuz", "balıksız", "kuzulu", "somonlu", "ördekli", "hindili"];
  for (const flavor of flavorInputs) {
    generated.push({
      category: "generated-flavor",
      input: `${flavor} mama istiyorum`,
      expectedAny: ["urun", "mama", "icerik", "kriter"]
    });
  }

  return generated;
}

function toAsciiTurkish(value: string) {
  return value
    .replace(/ç/g, "c")
    .replace(/Ç/g, "C")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "G")
    .replace(/ı/g, "i")
    .replace(/İ/g, "I")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "O")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "S")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "U");
}

function expandInputVariants(input: string) {
  const base = input.trim().replace(/\s+/g, " ");
  const ascii = toAsciiTurkish(base);
  return Array.from(
    new Set(
      [
        base,
        base.toLocaleLowerCase("tr-TR"),
        ascii,
        ascii.toLocaleLowerCase("tr-TR"),
        base.replace(/[?!.,]/g, ""),
        ascii.replace(/[?!.,]/g, ""),
        `${base}?`
      ]
        .map((item) => item.trim().replace(/\s+/g, " "))
        .filter(Boolean)
    )
  );
}

function normalizeForCheck(value: string) {
  return normalizeTerm(value).replace(/\s+/g, " ").trim();
}

function buildScenarioPool() {
  const pool: Scenario[] = [];

  for (const group of baseGroups) {
    for (const input of group.inputs) {
      for (const variant of expandInputVariants(input)) {
        pool.push({
          category: group.category,
          input: variant,
          expectedAny: group.expectedAny
        });
      }
    }
  }

  for (const scenario of createGeneratedScenarios()) {
    for (const variant of expandInputVariants(scenario.input)) {
      pool.push({ ...scenario, input: variant });
    }
  }

  const seen = new Set<string>();
  return pool.filter((scenario) => {
    const key = `${scenario.category}::${normalizeForCheck(scenario.input)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const weakReplyMarkers = [
  "isterseniz konuyu biraz daha netlestirelim",
  "sorunuzu tam olarak anlayamadim",
  "bu olcutlerin hepsine uyan bir urun bulamadim"
];

function evaluateScenario(engine: AIEngine, scenario: Scenario) {
  const response = engine.reply(scenario.input);
  const normalizedResponse = normalizeForCheck(response);
  const passed =
    scenario.expectedAny.some((item) => normalizedResponse.includes(normalizeForCheck(item))) &&
    !weakReplyMarkers.some((item) => normalizedResponse.includes(item));

  return {
    ...scenario,
    response,
    passed
  };
}

function main() {
  const engine = new AIEngine("scenario-audit");
  const scenarios = buildScenarioPool();
  const results = scenarios.map((scenario) => evaluateScenario(engine, scenario));
  const failures = results.filter((result) => !result.passed);
  const groupedFailures = new Map<string, number>();

  for (const failure of failures) {
    groupedFailures.set(failure.category, (groupedFailures.get(failure.category) ?? 0) + 1);
  }

  console.log(`Toplam senaryo: ${results.length}`);
  console.log(`Basarili: ${results.length - failures.length}`);
  console.log(`Basarisiz: ${failures.length}`);

  if (groupedFailures.size) {
    console.log("\nKategori bazli aciklar:");
    for (const [category, count] of [...groupedFailures.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`- ${category}: ${count}`);
    }
  }

  if (failures.length) {
    console.log("\nIlk 60 basarisiz senaryo:");
    for (const failure of failures.slice(0, 60)) {
      console.log(`\n[${failure.category}] ${failure.input}`);
      console.log(failure.response);
    }
    process.exitCode = 1;
    return;
  }

  console.log("\nTum senaryolar gecti.");
}

main();
