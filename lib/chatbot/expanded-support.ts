import { brands, campaigns, categories, storeInfo } from "@/data/site";
import {
  grainPreferenceLabels,
  lifeStageLabels,
  normalizeTerm,
  type GrainPreference,
  type LifeStage
} from "@/lib/product-intelligence";

type Animal = "kedi" | "kopek" | "kus" | "akvaryum" | "kemirgen";
type ProductNeed =
  | "mama"
  | "kuru-mama"
  | "yas-mama"
  | "odul"
  | "oyuncak"
  | "vitamin"
  | "kum"
  | "tasma"
  | "bakim"
  | "akvaryum";
type SupportMode = "overview" | "steps" | "compare";

export type ExpandedSupportProfile = {
  animal?: Animal;
  age?: number;
  ageUnit?: "ay" | "yil";
  weightKg?: number;
  sterilized?: boolean;
  grain?: GrainPreference;
  budget?: number;
  lifeStage?: LifeStage;
  need?: ProductNeed;
  brand?: string;
  flavor?: string;
};

type SupportContext = {
  mode: SupportMode;
  profile: ExpandedSupportProfile;
  text: string;
};

type SupportTopic = {
  id: string;
  keywords: string[];
  minScore?: number;
  build: (context: SupportContext) => string[];
};

const supportTopics: SupportTopic[] = [
  {
    id: "capabilities",
    keywords: ["ne yaparsin", "neler yapabiliyorsun", "hangi konularda", "yardim menusu", "ornek soru", "nasil kullanayim"],
    minScore: 1,
    build: () => [
      "✨ Size sadece tek bir ürün değil, çok daha geniş bir destek akışı sunabilirim.",
      "",
      "📌 Yardımcı olabildiğim başlıklar",
      "- Ürün önerisi, fiyat sıralaması ve marka karşılaştırması",
      "- Yavru, yetişkin, senior, kısır veya hassas dostlar için yönlendirme",
      "- Beslenme, porsiyon, mama geçişi, su tüketimi ve günlük bakım",
      "- Tüy, deri, hassas mide, kilo kontrolü gibi genel bakım senaryoları",
      "- Mağaza, kampanya, teslimat, stok teyidi ve alışveriş hazırlığı",
      "- Yeni sahiplenilen dost için başlangıç listesi ve ihtiyaç planı",
      "",
      "💬 Şöyle yazabilirsiniz",
      "- Yavru kedi için başlangıç listesi çıkar",
      "- Bütçeme göre mama ve kum planı yap",
      "- Hassas sindirimli köpek için nelere dikkat etmeliyim?",
      "- Mağazaya gelmeden önce stok nasıl teyit edilir?"
    ]
  },
  {
    id: "new-pet-checklist",
    keywords: [
      "sahiplendim",
      "yeni kedi",
      "yeni kopek",
      "ilk kez",
      "evime yeni",
      "yavru aldim",
      "baslangic listesi",
      "neler almaliyim",
      "yeni sahiplendim",
      "ilk defa kedi besliyorum",
      "ilk defa kopek besliyorum",
      "ilk defa yavru kedi aldim",
      "ilk defa yavru kopek aldim",
      "yeni evcil hayvan",
      "yeni evcil hayvan aldim"
    ],
    minScore: 1,
    build: ({ profile, text }) => {
      const animal = inferAnimal(text, profile);
      const starterList = starterChecklist(animal);
      return [
        "🐾 Yeni dost için hızlı başlangıç planı",
        firstLineForAnimal(animal),
        "",
        "🧺 İlk ihtiyaç listesi",
        ...starterList.map((item) => "- " + item),
        "",
        "📌 İlk 48 saatte dikkat",
        "- Ani mama değişimi yapmayın; mevcut düzeni öğrenip kademeli geçiş yapın.",
        "- Sessiz bir dinlenme alanı ve temiz suyu hazır tutun.",
        "- Tuvalet, iştah ve enerji durumunu ilk günlerde yakından izleyin.",
        "",
        "💬 İsterseniz bunu bütçenize göre ekonomik, orta veya premium alışveriş listesine de çevirebilirim."
      ];
    }
  },
  {
    id: "budget-planning",
    keywords: ["butce plani", "az butce", "ekonomik", "fiyat performans", "uygun fiyat", "butceyi nasil boleyim", "minimum alisveris"],
    minScore: 1,
    build: ({ profile }) => {
      const budgetLine =
        profile.budget && profile.budget > 0
          ? `Elinizde yaklaşık ${profile.budget} TL üst sınır varsa önce temel ihtiyaçları güvene alalım.`
          : "Bütçe çalışırken önce temel ihtiyaçları güvene almak en sağlıklısı olur.";

      return [
        "💸 Bütçeyi akıllı dağıtma planı",
        budgetLine,
        "",
        "1. Öncelik",
        "   Ana mama, temiz su kabı ve gerekiyorsa tuvalet/kum gibi temel ihtiyaçlar.",
        "2. İkinci katman",
        "   Ödül, oyuncak, taşıma çantası veya bakım ürünü gibi günlük konfor kalemleri.",
        "3. İhtiyaca bağlı ürünler",
        "   Vitamin, özel bakım veya premium içerik talepleri.",
        "",
        "📌 Tasarruf için",
        "- Her üründe en pahalı seçeneği almak yerine ana mamayı doğru seçmek daha kritiktir.",
        "- Aynı anda çok fazla ürün almak yerine önce temel düzen kurun.",
        "- Marka, içerik ve gramaja göre fiyat/performans karşılaştırması yapabilirim.",
        "",
        "💬 Türü, yaşını ve toplam bütçeyi yazarsanız size hazır bir sepet planı çıkarayım."
      ];
    }
  },
  {
    id: "shopping-guidance",
    keywords: [
      "hangisini onerirsin",
      "hangisini almalıyım",
      "hangisini almaliyim",
      "kararsiz kaldim",
      "sence hangisi daha iyi",
      "bunu alayim mi",
      "bu urun nasil",
      "butcem kisitli",
      "hem kaliteli hem ucuz",
      "en kaliteli ama uygun fiyatli"
    ],
    minScore: 1,
    build: ({ profile }) => {
      const animalLine = profile.animal ? `Su an tur olarak ${animalLabel(profile.animal)} bilgisini not ettim.` : "Tur bilgisini de eklerseniz secim daha net olur.";
      return [
        "🧭 Dogru urunu secmek icin kisa yol",
        animalLine,
        "",
        "En hizli karar sirasi",
        "- Kedi mi kopek mi oldugunu netlestirin.",
        "- Yavru, yetiskin veya senior oldugunu ekleyin.",
        "- Kisirlik, hassas mide, alerji veya kilo kontrolu gibi ihtiyaclari yazin.",
        "- Butce araligi ve premium ya da ekonomik beklentinizi belirtin.",
        "",
        "💬 Isterseniz tek mesajda tur + yas + butce + mama tipi yazin; ben bunu hazir secim planina cevireyim."
      ];
    }
  },
  {
    id: "stock-and-reservation",
    keywords: [
      "stokta var mi",
      "stok teyidi",
      "ayirt",
      "rezerve",
      "gelmeden once",
      "elden ayirma",
      "urunu ayir",
      "magazada var mi",
      "hemen alabilir miyim",
      "gelip alabilir miyim",
      "internette var mi",
      "ayni gun alabilir miyim",
      "ne zaman gelir",
      "stok gorunmuyor",
      "hill's",
      "hills",
      "orijen",
      "mio",
      "lavital",
      ...brands.map((brand) => normalizeTerm(brand))
    ],
    minScore: 1,
    build: () => [
      "📦 Stok ve ayırtma desteği",
      "Bu sohbetten canlı stok kilitleyemem; en doğru yöntem mağazaya ürün adıyla hızlı teyit geçmektir.",
      "",
      "✅ En pratik akış",
      "- Ürünün tam adını, gramajını ve mümkünse fotoğrafını gönderin.",
      "- Kaç adet istediğinizi belirtin.",
      "- Mağazaya uğrayacağınız saat veya servis isteğiniz varsa ekleyin.",
      "",
      "📱 En güvenli kanal",
      `WhatsApp: +${storeInfo.whatsapp}`,
      `Telefon: ${storeInfo.phone}`,
      "",
      "💬 İsterseniz yazacağınız stok teyidi mesajını da sizin için hazırlayabilirim."
    ]
  },
  {
    id: "payment-and-invoice",
    keywords: [
      "odeme",
      "kart",
      "nakit",
      "havale",
      "eft",
      "fatura",
      "fis",
      "kredi karti",
      "kapida odeme",
      "taksit",
      "uyelik gerekiyor mu",
      "hesap acmadan",
      "online siparis",
      "indirim kodu",
      "kampanya kodu",
      "sadakat puani"
    ],
    minScore: 1,
    build: () => [
      "💳 Ödeme ve fiş/fatura süreci",
      "Bu ekranda sabit ödeme yöntemi listesi görünmüyor; bu yüzden kesin bilgi vermek yerine güvenli teyit akışını önereceğim.",
      "",
      "📌 En doğru teyit için",
      "- Kart mı, nakit mi, EFT/havale mi kullanacağınızı belirtin.",
      "- Teslimat mı mağazadan teslim mi istediğinizi yazın.",
      "- Kurumsal fatura gerekiyorsa bunu baştan ekleyin.",
      "",
      "📱 Hızlı teyit",
      `WhatsApp: +${storeInfo.whatsapp}`,
      "",
      "💬 İsterseniz ödeme ve fatura için tek mesajda gönderilecek kısa bir hazır metin oluşturayım."
    ]
  },
  {
    id: "return-and-exchange",
    keywords: ["iade", "degisim", "yanlis urun", "hasarli urun", "paket acilmadi", "degistirmek istiyorum", "mama bayat cikti", "paketi actim"],
    minScore: 1,
    build: () => [
      "🔁 İade ve değişim konusunda güvenli yol",
      "Kesin mağaza politikası ürün tipine ve ambalaj durumuna göre değişebilir; bu yüzden size risksiz ilerleme planını vereyim.",
      "",
      "📌 Hazır edin",
      "- Ürünün adı ve gramajı",
      "- Fiş, ödeme kaydı veya sipariş bilgisi",
      "- Ürün açıldı mı açılmadı mı bilgisi",
      "- Hasar veya yanlış ürün varsa net fotoğraf",
      "",
      "✅ Genelde süreci kolaylaştıran durumlar",
      "- Açılmamış ambalaj",
      "- Hızlı bildirim",
      "- Net fotoğraf ve fiş kaydı",
      "",
      `💬 En pratik teyit için WhatsApp üzerinden durumu kısaca iletebilirsiniz: +${storeInfo.whatsapp}`
    ]
  },
  {
    id: "delivery-planning",
    keywords: ["ayni gun", "ne zaman gelir", "servis suresi", "kurye", "teslim ne kadar surer", "bugun gelir mi", "ucretsiz servis"],
    minScore: 1,
    build: () => [
      "🚚 Teslimat planı",
      storeInfo.freeDelivery + ".",
      "",
      "📌 Süreyi en çok etkileyenler",
      "- Ürünün stok durumu",
      "- Mahalle veya teslimat bölgesi",
      "- Gün içi yoğunluk ve rota planı",
      "- Sipariş saatinin mağaza çalışma saatlerine yakınlığı",
      "",
      "⏱️ Hızlandırmak için",
      "- Ürün adını ve adetini net yazın.",
      "- Mahalle veya konum bilgisini ekleyin.",
      "- Acil ihtiyaçsa bunu baştan belirtin.",
      "",
      `💬 Aynı gün uygunluğu için en hızlı teyit kanalı WhatsApp'tır: +${storeInfo.whatsapp}`
    ]
  },
  {
    id: "campaign-guidance",
    keywords: ["kampanya", "indirim", "firsat", "sepette", "avantaj", "hangi kampanya", "promosyon"],
    minScore: 1,
    build: ({ profile }) => {
      const animal = profile.animal;
      const filteredCampaigns = animal
        ? campaigns.filter((campaign) => campaign.categorySlugs.includes(animal))
        : campaigns;
      const visibleCampaigns = filteredCampaigns.slice(0, 3);

      return [
        "🎉 Kampanya yönlendirmesi",
        visibleCampaigns.length
          ? "Şu an öne çıkan kampanyalardan bazıları:"
          : "Genel kampanyaları profilinize göre birlikte filtreleyebiliriz.",
        "",
        ...(
          visibleCampaigns.length
            ? visibleCampaigns.map(
                (campaign) =>
                  "- " + campaign.title + ": " + campaign.discountLabel + ". Geçerlilik: " + campaign.validUntil + "."
              )
            : ["- Tür veya ürün tipi belirtirseniz size uygun kampanyayı öne çıkarayım."]
        ),
        "",
        "💡 En iyi sonuç için bana türü, ürün tipini ve yaklaşık bütçeyi yazın; gereksiz kampanyaları elemiş oluruz."
      ];
    }
  },
  {
    id: "brand-guidance",
    keywords: [
      "hangi marka iyi",
      "en iyi marka",
      "premium mu",
      "fiyat performans marka",
      "marka secemiyorum",
      "hangi marka daha mantikli",
      "hangi marka daha guvenilir",
      "hangi markayi sen secerdin",
      "sen olsan hangisini alirdin"
    ],
    minScore: 1,
    build: ({ profile, mode }) => {
      const premiumBrands = brands.filter((brand) =>
        ["N&D", "Pro Plan", "Royal Canin", "Hill's Science Plan", "Brit Care", "Acana"].includes(brand)
      );

      return [
        mode === "compare" ? "⚖️ Marka seçimini kıyaslayalım" : "🏷️ Marka seçerken kısa yol",
        "Tek başına marka adı değil; yaşam dönemi, hassasiyet, kısır durumu ve bütçe birlikte karar verdirir.",
        "",
        "📌 Önce şu sırayla düşünün",
        "- Tür ve yaş dönemi",
        "- Kısır, hassas sindirim veya deri/tüy gibi özel ihtiyaç",
        "- Tahıllı, düşük tahıllı veya tahılsız tercih",
        "- Bütçe ve paket gramajı",
        "",
        "⭐ Premium tarafta sık bakılan markalar",
        premiumBrands.join(", "),
        "",
        profile.brand
          ? `💬 İsterseniz ${profile.brand} için alternatif marka veya daha uygun fiyatlı yakın seçenekleri çıkarayım.`
          : "💬 İki marka adı yazarsanız onları içerik, fiyat ve kullanım amacı açısından karşılaştırayım."
      ];
    }
  },
  {
    id: "accessory-selection",
    keywords: [
      "su pinari",
      "isitici",
      "mama kabi",
      "su kabi",
      "tasima cantasi",
      "tasima kafesi",
      "yatak uygun",
      "kedi yatagi",
      "kopek yatagi",
      "oyuncag",
      "top oner",
      "kemirme oyuncagi",
      "hangi kum uygun",
      "hangi oyuncak uygun",
      "hangi yatak uygun",
      "hangi tasma uygun",
      "hangi sampuan uygun",
      "gps tasma",
      "gogus tasmasi",
      "gezdirme tasmasi",
      "kulak temizleyici",
      "goz temizleyici",
      "firca oner",
      "tirnak makasi",
      "eklem destegi",
      "bagisiklik vitamini",
      "odul cubugu",
      "dis temizleme urunu"
    ],
    minScore: 1,
    build: ({ text, profile }) => {
      const animal = inferAnimal(text, profile);
      const animalLine = animal ? `${animalLabel(animal)} icin secim yaparken kullanim amaci ve boyut once netlesmeli.` : "Tur bilgisi secimi bir anda daha dogru hale getirir.";
      return [
        "🛍️ Aksesuar ve bakim urunlerinde secim rehberi",
        animalLine,
        "",
        "Bakarken en kritik noktalar",
        "- Boyut, yas ve gunluk kullanim yogunlugu",
        "- Kolay temizlenme ve malzeme kalitesi",
        "- Hassas cilt, dis, eklem veya stres gibi ozel ihtiyaclar",
        "- Evdeki alan ve tasima rutini",
        "",
        "💡 Isterseniz urun tipini ve dostunuzun turunu yazin; size ekonomik, orta ve daha guclu secenek mantigini ayirayim."
      ];
    }
  },
  {
    id: "multi-pet-home",
    keywords: ["iki kedim var", "iki kopegim var", "birden fazla", "ayni mamayi yerler mi", "coklu evcil", "ayni evde"],
    minScore: 1,
    build: () => [
      "🐾 Birden fazla dost varsa beslenme düzeni",
      "- Yaş dönemi farklıysa tek mama ile ilerlemek çoğu zaman iyi sonuç vermez.",
      "- Kısır ve yavru dostların ihtiyaçları aynı olmayabilir.",
      "- Ayrı kap ve ölçülü porsiyon kullanmak kilo takibini kolaylaştırır.",
      "- Hızlı yiyen veya mama çalan dostlarda öğünleri ayrı alanlarda vermek işe yarar.",
      "",
      "💡 Bana her dostu tek tek yazarsanız ortak ürünler ile ayrı tutulması gerekenleri ayırabilirim."
    ]
  },
  {
    id: "bird-starter",
    keywords: ["kus", "muhabbet", "kanarya", "papagan", "kus yemi", "kus icin ne lazim", "kusum var", "muhabbet kusum var"],
    minScore: 2,
    build: () => [
      "🐦 Kuş için başlangıç rehberi",
      "- Ana yem karışımı ve taze su temel ihtiyaçtır.",
      "- Kalamar kemiği veya mineral desteği faydalı olabilir.",
      "- Tünek, salıncak ve güvenli oyuncaklar hareket sağlar.",
      "- Ani yem değişimi yerine kademeli alışma daha iyi olur.",
      "- İştahsızlık, kabarma, halsizlik veya dışkı değişimi varsa geciktirmeden kuş veterinerine danışın.",
      "",
      "💬 Türünü yazarsanız muhabbet kuşu, kanarya veya papağana göre daha net liste çıkarayım."
    ]
  },
  {
    id: "aquarium-starter",
    keywords: [
      "akvaryum",
      "balik",
      "filtre",
      "ilk akvaryum",
      "yeni akvaryum",
      "su degisimi",
      "akvaryumum var",
      "baligim var",
      "isitici",
      "akvaryum kumu",
      "canli bitki"
    ],
    minScore: 2,
    build: () => [
      "🐠 Akvaryumda güvenli başlangıç",
      "- Filtreyi düzenli çalıştırın; sık kapatıp açmayın.",
      "- İlk günlerde fazla yemleme yapmayın.",
      "- Ani ve büyük su değişimlerinden kaçının.",
      "- Balıkları bir anda çok sayıda eklemek yerine temkinli ilerleyin.",
      "- Su hazırlayıcı ve temel bakım ürünlerini doğru dozda kullanın.",
      "",
      "💬 İsterseniz başlangıç seti, yem ve bakım ürünlerini adım adım listeleyebilirim."
    ]
  },
  {
    id: "aquarium-trouble",
    keywords: ["baligim oldu", "baligim yuzmuyor", "baligim ters donuyor", "su bulanik", "akvaryum suyu bulanik"],
    minScore: 1,
    build: () => [
      "🐠 Akvaryumda ani kayip veya dengesizlik varsa su kosullarini ilk siraya alin.",
      "- Son su degisimi, yemleme miktari ve filtre durumunu kontrol edin.",
      "- Ani isi degisimi, oksijen dusuklugu veya su degeri bozulmasi baligi hizli etkileyebilir.",
      "- Bir anda cok buyuk su degisimi yapmak yerine kontrollu ilerleyin.",
      "- Birden fazla balik etkileniyorsa su kalitesi tarafini onceleyin.",
      "",
      "💬 Isterseniz akvaryum hacmi, filtre durumu ve son gozlemlerinizi yazin; daha sistemli ariza sirasi cikarayim."
    ]
  },
  {
    id: "rodent-starter",
    keywords: ["hamster", "tavsan", "kemirgen", "guinea", "tavsan icin", "hamster icin ne lazim", "hamsterim var", "tavsanim var"],
    minScore: 2,
    build: () => [
      "🐹 Kemirgen için temel ihtiyaç planı",
      "- Güvenli taban malzemesi ve temiz su düzeni kurun.",
      "- Saklanma alanı ve kemirme ihtiyacını karşılayacak ürünler ekleyin.",
      "- Türe uygun ana yem seçin; hamster ile tavşan aynı şekilde beslenmez.",
      "- Tavşan ve guinea pig tarafında kuru ot düzeni çok önemlidir.",
      "",
      "💬 Türünü net yazarsanız hamster, tavşan veya guinea pig için ayrı liste çıkarayım."
    ]
  },
  {
    id: "summer-heat",
    keywords: ["sicak hava", "yaz sicagi", "sicakta", "gunes", "pati yaniyor", "sogutma", "terliyor"],
    minScore: 1,
    build: () => [
      "☀️ Sıcak hava döneminde dikkat",
      "- Su kabını daha sık tazeleyin ve gölgeli alan sağlayın.",
      "- Köpek yürüyüşlerini sabah erken veya akşam serinliğine alın.",
      "- Sıcak zeminde pati kontrolü yapın; uzun yürüyüşü öğle saatine bırakmayın.",
      "- Araç içinde tek başına bırakmayın.",
      "- Halsizlik, aşırı soluma, denge bozulması veya kusma varsa acil destek alın.",
      "",
      "💬 İsterseniz yaz sıcakları için bakım ve ürün listesi de hazırlayabilirim."
    ]
  },
  {
    id: "food-storage",
    keywords: ["mama nasil saklanir", "saklama", "paketi acinca", "bozulur mu", "ne kadar dayanir", "son kullanma"],
    minScore: 1,
    build: () => [
      "🧺 Mama saklama düzeni",
      "- Serin, kuru ve doğrudan güneş almayan yerde saklayın.",
      "- Torbayı açık bırakmayın; hava almasını azaltın.",
      "- Büyük paketi küçük kullanım kabına bölmek pratik olabilir ama parti bilgisini kaybetmeyin.",
      "- Eski ve yeni mamayı uzun süre gelişigüzel karıştırmayın.",
      "- Koku, renk veya yapı belirgin değişirse kullanmayın.",
      "",
      "💬 İsterseniz yaş mama ve kuru mama için ayrı saklama önerisi de verebilirim."
    ]
  },
  {
    id: "weight-management",
    keywords: ["kilo verdir", "kilo kontrolu", "fazla kilolu", "sisman", "zayiflama", "porsiyon azaltma"],
    minScore: 1,
    build: ({ profile }) => {
      const profileLine =
        profile.sterilized
          ? "Kısır dostlarda kilo kontrolü için porsiyon takibi özellikle önemlidir."
          : "Kilo yönetiminde mamanın yanında porsiyon, ödül ve hareket düzeni birlikte düşünülmelidir.";

      return [
        "⚖️ Kilo kontrolü için temel çerçeve",
        profileLine,
        "",
        "- Ölçüsüz doldurmak yerine gram veya ölçü kabı kullanın.",
        "- Ödülleri günlük toplam kalorinin küçük bir kısmında tutun.",
        "- Haftalık tartı veya aylık kondisyon takibi yapın.",
        "- Bir anda çok sert kesinti yerine kontrollü düzenleme yapın.",
        "",
        "💬 Türü, kilosu, yaşını ve mevcut mama adını yazarsanız daha hedefli plan kurabilirim."
      ];
    }
  },
  {
    id: "sensitive-digestion",
    keywords: ["hassas mide", "hassas sindirim", "alerji mamasi", "sindirimi hassas", "midesi bozuluyor", "gaz yapiyor"],
    minScore: 1,
    build: () => [
      "🌿 Hassas sindirimde güvenli yaklaşım",
      "- Yeni mamaya 7-10 günde kademeli geçin.",
      "- Aynı anda birden fazla değişiklik yapmayın; hangi ürünün etki ettiğini izlemek kolaylaşır.",
      "- Dışkı yapısı, iştah ve su tüketimini not edin.",
      "- Şiddetli kusma, kanlı dışkı, belirgin halsizlik veya su içememe varsa veteriner görüşünü geciktirmeyin.",
      "",
      "💬 Türü, yaşı ve mevcut kullandığınız mamanın adını yazarsanız daha uygun seçenekleri daraltabilirim."
    ]
  }
  ,
  {
    id: "cat-behavior",
    keywords: [
      "kedim neden",
      "surekli uyuyor",
      "surekli miyav",
      "gece kos",
      "koltugu tirmal",
      "perdeye tirman",
      "isiriyor",
      "tirmaliyor",
      "saklaniyor",
      "stres",
      "agresif",
      "saldiriyor",
      "beni takip ediyor",
      "geceleri uyutmuyor"
    ],
    minScore: 2,
    build: () => [
      "🐱 Kedi davranışını okurken önce bağlama bakmak gerekir.",
      "- Gece koşma, enerji atma, dikkat isteme veya oyun eksikliğiyle ilişkili olabilir.",
      "- Miyavlama; açlık, rutin değişikliği, ilgi isteme, çiftleşme dönemi veya stres kaynaklı olabilir.",
      "- Tırmalama çoğu zaman tırnak bakımı, alan işaretleme ve esneme ihtiyacıdır; uygun tırmalama alanı sunmak gerekir.",
      "- Saklanma ve ani agresyon çoğu zaman korku, ağrı veya çevresel streste artar.",
      "",
      "✅ İlk adım",
      "- Günlük oyun süresini artırın.",
      "- Güvenli saklanma alanı sağlayın.",
      "- Rutinini bir anda değiştirmeyin.",
      "- Ağrı, iştahsızlık veya tuvalet değişimi eşlik ediyorsa sağlık tarafını da düşünün.",
      "",
      "💬 İsterseniz davranışı tek tek yazın; nedenlerini ve en mantıklı çözüm sırasını ayırayım."
    ]
  },
  {
    id: "dog-behavior",
    keywords: [
      "kopegim neden",
      "havliyor",
      "uluyor",
      "esyalari kemir",
      "ayakkabi kemir",
      "yalniz kalamiyor",
      "beni takip ediyor",
      "kapiyi tirmal",
      "agresif",
      "yabancilara havliyor",
      "cok hareketli",
      "enerjisini nasil atar"
    ],
    minScore: 2,
    build: () => [
      "🐶 Köpek davranışlarında çoğu sorun ihtiyaç, enerji veya stres kaynaklı olur.",
      "- Havlama; uyarı, sıkılma, korku, yalnız kalma stresi veya heyecan olabilir.",
      "- Kemirme özellikle yavrulukta, diş değişiminde ve enerji fazlasında çok yaygındır.",
      "- Eve tuvalet yapma; rutin oturmaması, kaygı veya eğitim eksikliğiyle ilişkili olabilir.",
      "- Takip etme ve yalnız kalamama ayrılık hassasiyeti işareti olabilir.",
      "",
      "✅ İlk adım",
      "- Günlük yürüyüş ve zihin çalıştıran oyun ekleyin.",
      "- Uygun çiğneme oyuncağı verin.",
      "- Doğru davranışı ödülle güçlendirin; sadece kızmak çoğu zaman yetmez.",
      "- Agresyon, ani davranış değişimi veya ağrı şüphesi varsa sağlık tarafını atlamayın.",
      "",
      "💬 Yaşını, ırkını ve sorunun ne zaman arttığını yazarsanız daha hedefli plan çıkarayım."
    ]
  },
  {
    id: "general-pet-behavior",
    keywords: ["evcil hayvanim cok havliyor", "evcil hayvanim miyavliyor", "evcil hayvanim agresiflesti"],
    minScore: 1,
    build: () => [
      "🐾 Tur net olmasa da davranis degisikliklerinde once rutin, enerji ve stres kaynaklarina bakmak gerekir.",
      "- Ani seslenme artisi, havlama veya miyavlama ilgi isteme, korku ya da aliskanlik kaynakli olabilir.",
      "- Agresiflesme bazen korku, alan savunma ya da agrinin yansimasi olabilir.",
      "- Ceza yerine ortam duzenleme, dogru yonlendirme ve odullendirme daha saglikli sonuc verir.",
      "",
      "💬 Kedi mi kopek mi ve davranisin ne zaman arttigini yazarsaniz daha hedefli yol cizeyim."
    ]
  },
  {
    id: "training-and-commands",
    keywords: [
      "tuvalet egitimi",
      "otur komutu",
      "gel komutu",
      "bekle komutu",
      "egitim almamis",
      "isirmayi birakmiyor",
      "tasma taktirmiyor",
      "agizlik gerekli mi"
    ],
    minScore: 1,
    build: () => [
      "🎓 Eğitimde en iyi sonuç kısa, tutarlı ve ödül odaklı çalışmayla gelir.",
      "",
      "1. Tuvalet eğitimi",
      "   Sık dışarı çıkarma, doğru yere yaptığında anında ödül ve sabit rutin gerekir.",
      "2. Temel komutlar",
      "   Otur, gel ve bekle gibi komutları kısa seanslarla ve aynı kelimeyle çalışın.",
      "3. Tasma uyumu",
      "   Tasmayı önce evde kısa pozitif denemelerle tanıtın; zorlayarak takmayın.",
      "4. Isırma ve kemirme",
      "   Uygun alternatif verin, oyunu durdurup doğru objeye yönlendirin.",
      "",
      "💡 Ceza yerine yönlendirme ve ödül çoğu zaman daha kalıcı sonuç verir.",
      "💬 İsterseniz yaşına göre 7 günlük mini eğitim planı hazırlayayım."
    ]
  },
  {
    id: "litter-and-house-soiling",
    keywords: [
      "kum disina",
      "kum degistirmek istiyorum",
      "kum degistirmek",
      "kum degistir",
      "yataga cis",
      "koltuga cis",
      "kumu kullanmiyor",
      "tuvaletini eve yapiyor",
      "tuvalet yapmiyor",
      "kum kabina girmiyor",
      "eseliyor ama yapmiyor"
    ],
    minScore: 1,
    build: () => [
      "🚽 Tuvalet düzenindeki bozulma hem davranışsal hem sağlık kaynaklı olabilir.",
      "- Kum tipi, kum kabının yeri, temizlik sıklığı ve ev içi stres çok etkiler.",
      "- Sık girip yapamama, ağlama, az az yapma veya kan görme ise sağlık uyarısıdır.",
      "- Köpeklerde eve yapma çoğu zaman rutin, eğitim veya kaygı ile ilişkilidir.",
      "",
      "✅ İlk adım",
      "- Kum kabını temiz ve kolay ulaşılır tutun.",
      "- Ani kum değişimini yavaş yapın.",
      "- Kedi için kabı sessiz bir noktaya alın.",
      "- Köpek için düzenli dışarı çıkış ve ödüllü tekrar kurun.",
      "",
      "💬 Kedi mi köpek mi, ne zamandır böyle ve sağlık belirtisi eşlik ediyor mu yazarsanız daha net ayırayım."
    ]
  },
  {
    id: "separation-and-stress",
    keywords: [
      "yalniz kaliyor",
      "yalniz kalamiyor",
      "cok korkuyor",
      "eve alisamadi",
      "yeni eve tasindi",
      "misafir gorunce kaciyor",
      "stres",
      "saklaniyor",
      "beni surekli takip ediyor"
    ],
    minScore: 1,
    build: () => [
      "🏠 Uyum ve ayrılık stresi rutin değişince artabilir.",
      "- Yeni ev, yeni hayvan, misafir trafiği veya uzun yalnız kalma süresi tetikleyebilir.",
      "- Önce güvenli alan ve öngörülebilir rutin kurmak gerekir.",
      "- Zorla sosyalleştirmek yerine kontrollü ve kısa maruziyet daha sağlıklıdır.",
      "",
      "✅ İlk adım",
      "- Mama, oyun ve dinlenme saatlerini mümkün olduğunca sabitleyin.",
      "- Güvenli saklanma veya dinlenme alanı hazırlayın.",
      "- Ayrılmadan önce ve döndüğünüzde aşırı heyecanı azaltın.",
      "- Gerekirse meşguliyet oyuncağı veya çiğneme alternatifi ekleyin.",
      "",
      "💬 Türü ve stresin en çok ne zaman arttığını yazarsanız günlük plan çıkarayım."
    ]
  },
  {
    id: "pregnancy-and-newborn",
    keywords: [
      "hamile",
      "dogum yapti",
      "yavrulari oldu",
      "yavruladi",
      "emziriyor",
      "ciftlesti",
      "hamile olabilir",
      "yeni dogum yapti",
      "yavru dogurdu"
    ],
    minScore: 1,
    build: () => [
      "🍼 Hamilelik, doğum ve emzirme döneminde beslenme ve takip daha dikkatli yapılmalıdır.",
      "- İştah, su tüketimi, enerji ve yuvalanma davranışları değişebilir.",
      "- Ani halsizlik, akıntı kokusu, uzun süren zorlanma veya yavrulara ilgisizlik acil değerlendirilmelidir.",
      "- Emziren annelerde su ve düzenli beslenme desteği çok önemlidir.",
      "",
      "✅ İlk adım",
      "- Sessiz, temiz ve güvenli alan hazırlayın.",
      "- Mama değişikliği yapacaksanız acele etmeyin.",
      "- Anne ve yavruların genel durumunu düzenli gözlemleyin.",
      "",
      "💬 Kedi mi köpek mi, kaç yavru var ve şu an en çok hangi konuda zorlanıyorsunuz yazın; daha hedefli yönlendireyim."
    ]
  },
  {
    id: "lost-pet",
    keywords: ["kacti", "kayboldu", "eve gelmedi", "bulamiyorum", "kaybettim"],
    minScore: 1,
    build: () => [
      "🔎 Kayıp dost için ilk saatler çok önemlidir.",
      "1. En son görülen alanı sakin ama hızlı şekilde tarayın.",
      "2. Mama, su, taşıma çantası veya sevdiği örtüyü yakın noktaya bırakın.",
      "3. Yakın çevre, apartman görevlisi ve komşulara kısa bilgi verin.",
      "4. Fotoğraf ve iletişim numarasıyla yerel ilan paylaşın.",
      "",
      "📌 Kedi korktuysa yakın ve sessiz alanlara saklanabilir; köpek daha geniş alana açılabilir.",
      "💬 İsterseniz kayıp ilanı için kısa, paylaşılabilir bir metin hazırlayayım."
    ]
  },
  {
    id: "emergency-ingestion",
    keywords: [
      "cikolata yedi",
      "uzum yedi",
      "sogan yedi",
      "sarimsak",
      "fare zehri",
      "camasir suyu",
      "ilac yedi",
      "ip yuttu",
      "plastik yedi",
      "oyuncak yuttu",
      "lastik yuttu",
      "kemik yuttu",
      "cicek yedi"
    ],
    minScore: 1,
    build: () => [
      "🚨 Bu tür yutma ve zehirlenme senaryolarında beklemek riskli olabilir.",
      "- Ne yediğini, yaklaşık miktarı ve ne zaman olduğunu not edin.",
      "- Zorla kusturmaya çalışmayın.",
      "- Ürün ambalajı veya içerik bilgisini saklayın.",
      "- Nefes darlığı, bayılma, tekrar eden kusma, aşırı halsizlik veya karın ağrısı varsa acil değerlendirme gerekir.",
      "",
      "📌 Özellikle çikolata, üzüm, soğan-sarımsak, ilaçlar, temizlik ürünleri ve rodentisitler ciddiye alınmalıdır.",
      "💬 Türünü, kilosunu, yediği şeyi ve yaklaşık zamanı yazarsanız risk çerçevesini daha net anlatayım; ama acil belirti varsa gecikmeyin."
    ]
  },
  {
    id: "order-support",
    keywords: [
      "siparisim nerede",
      "siparisimi iptal",
      "siparisimi duzenle",
      "kargo gecikti",
      "kargom nerede kaldi",
      "kargom kayip",
      "takip numaram yok",
      "yanlis urun geldi",
      "eksik urun geldi",
      "urun hasarli geldi",
      "beni biri arasin"
    ],
    minScore: 1,
    build: () => [
      "📦 Sipariş desteğinde en hızlı sonuç için kısa bir kayıt metni hazırlamak iyi olur.",
      "",
      "📌 Hazır edin",
      "- Sipariş adı veya ürün adı",
      "- Telefon numarası veya siparişte kullanılan iletişim bilgisi",
      "- Sorunun tipi: gecikme, eksik ürün, yanlış ürün, hasar, iptal veya adres değişikliği",
      "- Varsa fotoğraf ve teslim tarihi",
      "",
      "✅ Hızlı çözüm için",
      `WhatsApp: +${storeInfo.whatsapp}`,
      `Telefon: ${storeInfo.phone}`,
      "",
      "💬 İsterseniz mağazaya göndereceğiniz tek mesajlık destek metnini şimdi hazırlayabilirim."
    ]
  },
  {
    id: "site-support",
    keywords: [
      "urun cikmiyor",
      "stok gorunmuyor",
      "sepete eklenmiyor",
      "odeme olmuyor",
      "site cok yavas",
      "sayfa acilmiyor",
      "fotograflar yuklenmiyor",
      "urun resmi gorunmuyor",
      "fiyat yanlis",
      "adres ekleyemiyorum",
      "telefon numarasi kabul etmiyor",
      "urun aciklamasi eksik",
      "sepette fiyat degisti",
      "filtreyi temizle",
      "arama yap",
      "urunu bulamiyorum"
    ],
    minScore: 1,
    build: () => [
      "💻 Site ve sipariş akışında teknik sorun varsa önce basit kontrollerle başlayalım.",
      "- Sayfayı yenileyin ve mümkünse farklı tarayıcıda tekrar deneyin.",
      "- VPN, reklam engelleyici veya otomatik çeviri eklentisi açıksa kısa süre kapatıp tekrar bakın.",
      "- Sepet ve ödeme tarafında adres veya telefon biçimini yeniden kontrol edin.",
      "- Sorun sürüyorsa ekran görüntüsü ve saat bilgisiyle destek istemek en hızlı yoldur.",
      "",
      "📱 Alternatif akış",
      `WhatsApp üzerinden ürün veya sipariş bilgisini iletebilirsiniz: +${storeInfo.whatsapp}`,
      "",
      "💬 Hangi ekranda kaldığını yazarsanız daha hedefli sorun giderme sırası çıkarayım."
    ]
  },
  {
    id: "services-and-policy",
    keywords: [
      "veteriner misiniz",
      "veteriner hizmeti veriyor musunuz",
      "asi yapiyor musunuz",
      "cip takiyor musunuz",
      "tirnak kesiyor musunuz",
      "banyo hizmeti",
      "pet kuafor",
      "otel var mi",
      "pansiyon var mi",
      "evcil hayvan oteli",
      "evcil hayvan pansiyonu",
      "instagram hesabi",
      "google yorumlar",
      "kedi sahiplendirme",
      "kopek sahiplendirme",
      "whatsapp destek",
      "telefon acabilir miyim",
      "musteri hizmetleri"
    ],
    minScore: 1,
    build: () => [
      "ℹ️ Bu sohbette görünen veriler ürün ve mağaza bilgisine daha çok odaklı.",
      "Veterinerlik, kuaför, pansiyon, çip, aşı veya sosyal medya gibi başlıklarda kesin bilgi vermek yerine doğrudan teyit önermek daha güvenli olur.",
      "",
      "📱 En doğru teyit için",
      `Telefon: ${storeInfo.phone}`,
      `WhatsApp: +${storeInfo.whatsapp}`,
      "",
      "💬 İsterseniz soracağınız hizmeti tek cümlede netleştirip gönderilecek kısa mesajı hazırlayayım."
    ]
  },
  {
    id: "donation-and-community",
    keywords: [
      "mama bagisi",
      "bagis kabul ediyor musunuz",
      "sokak kedileri icin mama",
      "sokak kopekleri icin mama",
      "barinak icin mama",
      "toplu alim indirimi",
      "50 kilo mama",
      "10 paket alirsam indirim olur mu",
      "toplu alim",
      "sokak hayvanlarina yardim",
      "en ucuz sokak mamasi"
    ],
    minScore: 1,
    build: () => [
      "🤝 Sokak hayvanları veya toplu ihtiyaçlar için planlı ilerlemek en doğrusu olur.",
      "- Tür ve yaklaşık ihtiyaç miktarını netleştirin.",
      "- Ekonomik ama dengeli ürünleri öne almak daha sürdürülebilir olabilir.",
      "- Toplu alım, stok ve teslimat tarafı için doğrudan teyit almak gerekir.",
      "",
      "📱 En hızlı koordinasyon",
      `WhatsApp: +${storeInfo.whatsapp}`,
      "",
      "💬 İsterseniz bağış veya toplu alım için hazır istek metni ve ürün öncelik sırası çıkarayım."
    ]
  },
  {
    id: "content-and-freshness",
    keywords: [
      "icerigi temiz",
      "koruyucusuz",
      "renklendiricisiz",
      "tavuksuz",
      "baliksiz",
      "kuzulu",
      "somonlu",
      "ordekli",
      "hindili",
      "helal mi",
      "gdo var mi",
      "yerli uretim mi",
      "ithal mi",
      "son kullanma tarihi",
      "paket acilmamis",
      "bayat cikti"
    ],
    minScore: 1,
    build: () => [
      "🧾 İçerik ve tazelik tarafında en iyi yaklaşım beklentiyi netleştirmektir.",
      "- İstenmeyen içerikleri baştan söyleyin: tavuk, balık, tahıl gibi.",
      "- Koruyucu, renklendirici veya ithal veya yerli beklentiniz varsa bunu filtre olarak kullanabiliriz.",
      "- Son kullanma tarihi, ambalaj durumu ve parti bilgisi özellikle hassas ürünlerde önemlidir.",
      "",
      "📌 Eğer üründe bayatlık, koku veya ambalaj sorunu varsa fotoğrafla birlikte hızlı kayıt açmak gerekir.",
      "💬 İsterseniz içerik kriterlerinize göre size uygun marka veya ürün daraltması yapayım."
    ]
  },
  {
    id: "package-and-size",
    keywords: [
      "kucuk paket",
      "deneme boyu",
      "numune",
      "en buyuk mama hangisi",
      "15 kg",
      "20 kg",
      "400 gram",
      "2 kg",
      "3 kg",
      "ayni urunun buyugu",
      "ayni urunun kucugu",
      "benzer urun",
      "muadil",
      "daha ucuzunu goster",
      "daha kalitelisini goster"
    ],
    minScore: 1,
    build: () => [
      "📏 Paket boyu seçerken sadece fiyat değil kullanım süresi ve saklama şartı da önemlidir.",
      "- Yeni denenecek mamada daha küçük paket daha güvenli olabilir.",
      "- Düzen oturduysa büyük paket birim fiyat avantajı sağlayabilir.",
      "- Çok büyük paket alırken saklama koşulunu ve tüketim hızını düşünün.",
      "",
      "💬 İsterseniz belirli ürün için küçük-büyük paket mantığını birlikte değerlendirelim."
    ]
  },
  {
    id: "catalog-navigation",
    keywords: [
      "en yeni urunler",
      "yeni gelen urunler",
      "bugun eklenen urunler",
      "stoktakileri goster",
      "sadece kedi urunlerini goster",
      "sadece kopek urunlerini goster",
      "kus urunlerini goster",
      "akvaryum urunlerini goster",
      "kemirgen urunlerini goster",
      "tavsan urunlerini goster",
      "markaya gore listele",
      "fiyata gore sirala",
      "puanina gore sirala",
      "cok satanlara gore sirala"
    ],
    minScore: 1,
    build: () => [
      "🗂️ Listeyi daraltirken en hizli yol once turu, sonra urun tipini ve fiyat yonunu netlestirmektir.",
      "- Kedi, kopek, kus, akvaryum veya kemirgen diye baslayin.",
      "- Sonra mama, odul, kum, oyuncak, bakim veya aksesuar ihtiyacini ekleyin.",
      "- Gerekirse fiyat, puan, protein ya da marka sirasi isteyin.",
      "",
      "💬 Ornek: 'Kedi icin en ucuz yas mamalari sirala' veya 'Kopek oyuncaklarini puana gore goster'."
    ]
  },
  {
    id: "age-and-breed-estimate",
    keywords: [
      "kac aylik bilmiyorum",
      "kac yasinda bilmiyorum",
      "cinsi ne olabilir",
      "cinsini ogrenebilir miyim",
      "fotografini atsam bakar misin"
    ],
    minScore: 1,
    build: () => [
      "🔎 Yas ve cins tahmininde kesin konusmak zor olur ama guclu ipuclari ayiklayabiliriz.",
      "- Dis yapisi, boyut, tuy dokusu ve genel vucut formu yas tahmini icin yardimci olur.",
      "- Kulak yapisi, yuz formu, tuy tipi ve kuyruk ozellikleri cins benzerligi verebilir.",
      "- Tek bir fotograftan net soy ya da irk soylemek her zaman mumkun olmayabilir.",
      "",
      "💬 Isterseniz yandan ve onden net bir foto ile yaklasik yas, cins benzerligi ve bakim notlarini birlikte yorumlayayim."
    ]
  },
  {
    id: "information-only",
    keywords: ["sadece bilgi almak", "urun istemiyorum", "mama istemiyorum", "sadece soru soracagim", "filtreyi temizle"],
    minScore: 1,
    build: () => [
      "💬 Elbette, ürün önermeden de ilerleyebiliriz.",
      "Beslenme, bakım, davranış, mağaza süreci veya genel güvenlik konularında sadece bilgi odaklı cevap verebilirim.",
      "",
      "📌 İsterseniz soruyu tek tek gönderin; ürün tarafına çekmeden sadece açıklayıcı yanıtlayayım."
    ]
  }
];

export function getExpandedSupportReply(message: string, profile: ExpandedSupportProfile): string | null {
  const text = normalizeTerm(message);
  const mode = detectMode(text);
  const match = supportTopics
    .map((topic) => ({ topic, score: scoreTopic(text, topic) }))
    .filter(({ topic, score }) => score >= (topic.minScore ?? 1))
    .sort((first, second) => second.score - first.score)[0];

  if (!match) return null;

  return match.topic
    .build({ mode, profile, text })
    .filter(Boolean)
    .join("\n");
}

function scoreTopic(text: string, topic: SupportTopic) {
  return topic.keywords.reduce((score, keyword) => {
    return text.includes(normalizeTerm(keyword)) ? score + keywordScore(keyword) : score;
  }, 0);
}

function keywordScore(keyword: string) {
  return keyword.includes(" ") ? 2 : 1;
}

function detectMode(text: string): SupportMode {
  if (hasAny(text, ["karsilastir", "hangisi daha", "farki", "mi daha iyi", "mu daha iyi"])) {
    return "compare";
  }

  if (hasAny(text, ["adim adim", "nasil yapayim", "sirayla", "once ne yapayim", "plan yap"])) {
    return "steps";
  }

  return "overview";
}

function inferAnimal(text: string, profile: ExpandedSupportProfile): Animal | undefined {
  if (profile.animal) return profile.animal;
  if (hasAny(text, ["kedi", "kedim", "kitten"])) return "kedi";
  if (hasAny(text, ["kopek", "kopegim", "dog", "puppy"])) return "kopek";
  if (hasAny(text, ["muhabbet", "kanarya", "papagan", "kus"])) return "kus";
  if (hasAny(text, ["akvaryum", "balik", "tetra"])) return "akvaryum";
  if (hasAny(text, ["hamster", "tavsan", "guinea", "kemirgen"])) return "kemirgen";
  return undefined;
}

function firstLineForAnimal(animal?: Animal) {
  if (animal === "kedi") {
    return "Kedi için ilk günlerde güvenli alan, doğru mama ve kum düzeni en kritik başlıklardır.";
  }

  if (animal === "kopek") {
    return "Köpek için ilk günlerde rutin, su-mama düzeni ve güvenli yürüyüş ekipmanı en önemli temel taşlardır.";
  }

  if (animal === "kus") {
    return "Kuş için önce sakin bir alan, doğru yem ve düzenli su planı kurmak gerekir.";
  }

  if (animal === "akvaryum") {
    return "Akvaryumda en kritik konu acele etmeden su dengesini oturtmaktır.";
  }

  if (animal === "kemirgen") {
    return "Kemirgende önce türüne uygun barınma, altlık ve yem düzeni kurulmalıdır.";
  }

  return "İlk günlerde güvenli alan, temel beslenme düzeni ve stresin azaltılması en iyi başlangıcı sağlar.";
}

function starterChecklist(animal?: Animal) {
  if (animal === "kedi") {
    return [
      "Yaşına uygun ana mama",
      "Su kabı ve mama kabı",
      "Kum kabı ve uygun kedi kumu",
      "Taşıma çantası",
      "Tırmalama ve temel oyuncak",
      "Tarak veya bakım ekipmanı"
    ];
  }

  if (animal === "kopek") {
    return [
      "Yaşına uygun ana mama",
      "Su kabı ve mama kabı",
      "Göğüs tasması/tasma ve gezdirme kayışı",
      "Yatak veya dinlenme alanı",
      "Ödül maması",
      "Güvenli çiğneme veya oyun oyuncağı"
    ];
  }

  if (animal === "kus") {
    return [
      "Türüne uygun ana yem",
      "Taze su düzeni",
      "Mineral veya kalamar kemiği",
      "Tünek ve temel oyuncak",
      "Kafes hijyen ekipmanı"
    ];
  }

  if (animal === "akvaryum") {
    return [
      "Uygun hacimde akvaryum",
      "Filtre ve temel bakım ekipmanı",
      "Su düzenleyici",
      "Türüne uygun yem",
      "Kontrollü dekor ve saklanma alanı"
    ];
  }

  if (animal === "kemirgen") {
    return [
      "Türüne uygun ana yem",
      "Suluk veya su kabı",
      "Güvenli altlık",
      "Saklanma alanı",
      "Kemirme veya meşguliyet ürünleri"
    ];
  }

  return [
    "Yaşına ve türüne uygun ana mama veya yem",
    "Temiz su düzeni",
    "Temel hijyen ve bakım ürünleri",
    "Güvenli dinlenme alanı",
    "Yaşam alanına uygun oyun veya meşguliyet ürünü"
  ];
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(normalizeTerm(term)));
}

export function buildProfileSnapshot(profile: ExpandedSupportProfile) {
  const lines: string[] = [];

  if (profile.animal) lines.push("- Tür: " + animalLabel(profile.animal));
  if (profile.lifeStage && profile.lifeStage !== "belirsiz") lines.push("- Yaş dönemi: " + lifeStageLabels[profile.lifeStage]);
  if (profile.weightKg) lines.push("- Kilo: " + profile.weightKg + " kg");
  if (profile.sterilized !== undefined) lines.push("- Kısır durumu: " + (profile.sterilized ? "kısır" : "kısır değil"));
  if (profile.grain && profile.grain !== "belirsiz") lines.push("- Tahıl tercihi: " + grainPreferenceLabels[profile.grain]);
  if (profile.budget) lines.push("- Bütçe üst sınırı: " + profile.budget + " TL");

  return lines;
}

function animalLabel(animal: Animal) {
  const labels: Record<Animal, string> = {
    kedi: "kedi",
    kopek: "köpek",
    kus: "kuş",
    akvaryum: "balık/akvaryum",
    kemirgen: "kemirgen"
  };

  return labels[animal];
}

export function buildExpandedFallback(profile: ExpandedSupportProfile) {
  const profileLines = buildProfileSnapshot(profile);
  const lines = ["🤝 İsterseniz konuyu biraz daha netleştirelim."];

  if (profileLines.length) {
    lines.push("", "📌 Şu ana kadar anladığım profil", ...profileLines);
  }

  lines.push(
    "",
    "Şu başlıklardan biriyle devam edebilirsiniz:",
    "- ürün önerisi veya fiyat karşılaştırması",
    "- başlangıç alışveriş listesi",
    "- beslenme, bakım veya günlük rutin",
    "- mağaza, stok veya teslimat desteği",
    "",
    "💬 Örnek: “Yavru kedi için başlangıç listesi çıkar” veya “Bütçeme göre mama ve kum planı yap”."
  );

  return lines.join("\n");
}
