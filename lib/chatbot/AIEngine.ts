import { brands, campaigns, categories, products, storeInfo } from "@/data/site";
import type { Product } from "@/data/site";
import {
  breedSizeLabels,
  getProductProfile,
  grainPreferenceLabels,
  lifeStageLabels,
  normalizeTerm,
  type GrainPreference,
  type LifeStage
} from "@/lib/product-intelligence";
import { buildExpandedFallback, getExpandedSupportReply } from "@/lib/chatbot/expanded-support";
import { formatPrice } from "@/lib/utils";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type Animal = "kedi" | "kopek" | "kus" | "akvaryum" | "kemirgen";
type ProductNeed = "mama" | "kuru-mama" | "yas-mama" | "odul" | "oyuncak" | "vitamin" | "kum" | "tasma" | "bakim" | "akvaryum";
type ProductSort = "price-asc" | "price-desc" | "alphabetic" | "rating" | "protein";

type LocalProfile = {
  animal?: Animal;
  age?: number;
  ageUnit?: "ay" | "yil";
  weightKg?: number;
  breed?: string;
  sterilized?: boolean;
  grain?: GrainPreference;
  budget?: number;
  lifeStage?: LifeStage;
  need?: ProductNeed;
  brand?: string;
  brands?: string[];
  flavor?: string;
  sort?: ProductSort;
  compare?: boolean;
  proteinFocus?: boolean;
  symptoms: string[];
  terms: string[];
};

type ProductCandidate = {
  product: Product;
  score: number;
  reasons: string[];
};

const severeSymptoms = ["kan", "nefes alam", "nobet", "bayil", "zehir", "ates", "idrar yapam", "ciddi yara", "bilinc"];
const urgentIngestionTerms = [
  "cikolata",
  "uzum",
  "sogan",
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
];
const healthSymptoms = [
  "kus",
  "ishal",
  "kasin",
  "tuy",
  "istah",
  "alerji",
  "kabiz",
  "pire",
  "kene",
  "agiz kok",
  "idrar",
  "kulak",
  "mantar",
  "derisi",
  "deride",
  "yara",
  "topall",
  "hapsir",
  "oksur",
  "titri",
  "halsiz",
  "kilo kay",
  "kilo al",
  "zayif",
  "goz",
  "burun",
  "nefes",
  "su icm",
  "yem yem",
  "kan",
  "pati",
  "disleri",
  "dis eti",
  "goz akinti",
  "gozunu acam",
  "gozu kiz",
  "burnu ak",
  "surekli uyu",
  "hasta gibi",
  "karni sis"
];
const flavorTerms = ["kuzu", "tavuk", "somon", "balik", "hindi", "ordek", "geyik", "biftek", "ton", "alabalik", "karides", "balkabagi", "nar", "bildircin", "morina"];
const breedTerms = ["golden", "labrador", "husky", "maltese", "pomeranian", "chihuahua", "terrier", "kangal", "doberman", "rottweiler", "british", "scottish", "tekir", "iran", "van", "ankara", "alman"];
const stopWords = new Set([
  "icin",
  "olan",
  "bana",
  "bir",
  "var",
  "yok",
  "gore",
  "gibi",
  "daha",
  "hangi",
  "nedir",
  "nasil",
  "urun",
  "mama",
  "kedi",
  "kopek",
  "istiyorum",
  "oner",
  "tavsiye",
  "lira",
  "butce"
]);

const symptomLabels: Record<string, string> = {
  kusma: "kusma",
  ishal: "ishal",
  kasinti: "kaşıntı",
  tuy: "tüy dökülmesi",
  istah: "iştah değişikliği",
  alerji: "alerji şüphesi",
  kabiz: "kabızlık",
  pire: "pire",
  kene: "kene",
  "agiz kok": "ağız kokusu",
  idrar: "idrar sorunu",
  kulak: "kulak sorunu",
  mantar: "mantar şüphesi",
  deri: "deri sorunu",
  yara: "yara",
  topall: "topallama",
  hapsir: "hapşırma",
  oksur: "öksürük",
  titreme: "titreme",
  halsiz: "halsizlik",
  "kilo kay": "kilo kaybı",
  "goz akinti": "göz akıntısı"
};

export class AIEngine {
  constructor(private userId: string) {
    void this.userId;
  }

  public reply(message: string, history: ChatMessage[] = []): string {
    const current = message.trim();
    const text = normalizeTerm(current);

    if (!current) return this.opening();

    if (this.hasAny(text, ["temizle", "sifirla", "bastan", "yeniden basla"])) {
      return [
        "\u{1F504} Tamam, temiz bir sayfa açtık!",
        "Evcil dostunuzun türünü, yaşını ve ne aradığınızı yazın; birlikte en uygun seçeneği bulalım. \u{1F43E}"
      ].join("\n");
    }

    const usableHistory = history.length > 0 ? history : [{ role: "user" as const, content: current }];
    const currentProfile = this.extractTurnProfile(text);
    const profile = this.extractProfile(usableHistory, current);

    if (this.isGreeting(text)) return this.opening();
    if (this.hasAny(text, ["tesekkur", "sag ol", "eyvallah"])) {
      return "\u{1F60A} Rica ederim! Başka bir ürün, beslenme veya bakım sorunuz varsa buradayım.";
    }
    if (this.hasAny(text, ["gorusuruz", "hoscakal", "bye"])) {
      return "\u{1F44B} Görüşmek üzere! Minik dostunuza bol oyunlu, sağlıklı günler.";
    }
    if (this.hasAny(text, ["nasilsin", "iyi misin", "napÄ±yorsun", "napiyorsun", "burada misin"])) {
      return "\u{1F60A} Gayet iyiyim, teşekkür ederim! Bugün minik dostunuz için neye bakalım: mama, bakım, oyuncak, sağlık bilgisi veya mağaza desteği?";
    }
    if (this.hasAny(text, ["seni seviyorum", "cok tatlisin", "harikasin"])) {
      return "\u{1F49A} Bunu duymak çok güzel! Ben de minik dostunuz için burada olmaktan mutluyum. Bugün ona ne seçiyoruz?";
    }

    const unsupportedAnimal = this.detectUnsupportedAnimal(text);
    if (unsupportedAnimal) return this.unsupportedAnimalAnswer(unsupportedAnimal);

    const expandedSupportReply = getExpandedSupportReply(current, profile);
    if (expandedSupportReply) return expandedSupportReply;
    if (this.isAvailabilityQuestion(text, profile)) return this.availabilityAnswer(text, profile);
    if (this.isHealthQuestion(text, currentProfile)) return this.healthAnswer({ ...profile, symptoms: currentProfile.symptoms }, text);
    if (this.isStoreQuestion(text)) return this.storeAnswer(text);
    if (this.isNutritionQuestion(text)) return this.nutritionAnswer(text, profile);
    if (currentProfile.compare || this.isCompareQuestion(text)) return this.compareAnswer(profile, text);
    if (this.isCatalogQuestion(text)) return this.catalogAnswer(text);
    if (this.isCareQuestion(text)) return this.careAnswer(text, profile);
    if (this.isProductQuestion(text, currentProfile, profile)) return this.productAnswer(profile, text);
    if (this.hasProfileDetails(currentProfile)) return this.profileAcknowledgement(profile, currentProfile);

    return this.universalAnswer(current, profile);
  }

  private opening() {
    return [
      "\u{1F44B} Merhaba! Ben Pozitif Petshop Asistanı.",
      "Minik dostunuzu biraz tanıyınca katalogdaki ürünleri yaşına, kilosuna, bütçenize ve özel ihtiyaçlarına göre eşleştirebilirim. \u{1F43E}",
      "",
      "\u{1F4AC} Bana şunlar gibi yazabilirsiniz:",
      "- 2 yaşında 5 kg kısır kedim için 1500 TL altı tahılsız mama öner",
      "- En ucuz köpek mamalarını artan fiyata göre sırala",
      "- N&D ile Pro Plan arasında hangisi daha uygun?",
      "- Kedim tüy döküyor, ne yapmalıyım?",
      "- Mama değişimini nasıl yapmalıyım?",
      "- Mağaza adresi, saatleri ve teslimat bilgisi nedir?"
    ].join("\n");
  }

  private extractProfile(history: ChatMessage[], current: string): LocalProfile {
    const userMessages = history.filter((item) => item.role === "user" && item.content.trim()).map((item) => item.content);
    if (!userMessages.length || userMessages[userMessages.length - 1].trim() !== current.trim()) {
      userMessages.push(current);
    }

    let profile: LocalProfile = { symptoms: [], terms: [] };

    for (const userMessage of userMessages.slice(-12)) {
      const text = normalizeTerm(userMessage);
      const turn = this.extractTurnProfile(text);

      if (this.hasAny(text, ["yeni bir hayvan", "baska bir hayvan", "diger evcil", "profili temizle"])) {
        profile = { symptoms: [], terms: [] };
      }

      if (turn.animal && profile.animal && turn.animal !== profile.animal) {
        profile = { symptoms: [], terms: [] };
      }

      for (const key of [
        "animal",
        "age",
        "ageUnit",
        "lifeStage",
        "weightKg",
        "breed",
        "sterilized",
        "grain",
        "budget",
        "need",
        "brand",
        "brands",
        "flavor",
        "sort",
        "proteinFocus"
      ] as const) {
        const value = turn[key];
        if (value !== undefined) Object.assign(profile, { [key]: value });
      }
    }

    const currentTurn = this.extractTurnProfile(normalizeTerm(current));
    profile.compare = currentTurn.compare;
    profile.symptoms = currentTurn.symptoms;
    profile.terms = currentTurn.terms;

    if (profile.age !== undefined && profile.ageUnit) {
      profile.lifeStage = this.lifeStageFromAge(profile.age, profile.ageUnit, profile.animal);
    } else if (currentTurn.lifeStage) {
      profile.lifeStage = currentTurn.lifeStage;
    }

    return profile;
  }

  private extractTurnProfile(text: string): LocalProfile {
    const profile: LocalProfile = { symptoms: [], terms: this.extractTerms(text) };

    if (this.hasAny(text, ["kedi", "kedim", "cat", "kitten"])) profile.animal = "kedi";
    if (this.hasAny(text, ["kopek", "kopegim", "dog", "puppy"])) profile.animal = "kopek";
    if (this.hasAny(text, ["muhabbet", "kanarya", "papagan", "kus yemi"]) || this.hasWord(text, "kus")) profile.animal = "kus";
    if (this.hasAny(text, ["akvaryum", "balik", "japon baligi", "lepistes", "tetra"])) profile.animal = "akvaryum";
    if (this.hasAny(text, ["hamster", "tavsan", "guinea", "kemirgen"])) profile.animal = "kemirgen";

    const ageAfterNumber = text.match(/(\d+(?:[,.]\d+)?)\s*(yasinda|yas|yil|aylik|ay)\b/);
    const ageAfterLabel = text.match(/(?:yasi|yas|age)\s*[:=-]?\s*(\d+(?:[,.]\d+)?)\s*(ay|yil)?\b/);
    const ageMatch = ageAfterNumber ?? ageAfterLabel;
    if (ageMatch) {
      profile.age = this.toNumber(ageMatch[1]);
      profile.ageUnit = ageMatch[2]?.includes("ay") ? "ay" : "yil";
    }

    if (this.hasAny(text, ["yavru", "kitten", "puppy", "junior"])) profile.lifeStage = "yavru";
    if (this.hasAny(text, ["yetiskin", "adult"])) profile.lifeStage = "yetiskin";
    if (this.hasAny(text, ["senior", "yasli", "7+"])) profile.lifeStage = "senior";

    const weightAfterNumber = text.match(/(\d+(?:[,.]\d+)?)\s*(kg|kilo(?:gram)?)\b/);
    const weightAfterLabel = text.match(/(?:kilosu|kilo|agirligi)\s*[:=-]?\s*(\d+(?:[,.]\d+)?)/);
    const weightMatch = weightAfterNumber ?? weightAfterLabel;
    if (weightMatch) profile.weightKg = this.toNumber(weightMatch[1]);

    profile.budget = this.extractBudget(text);

    if (this.hasAny(text, ["kisir degil", "kisirlasmadi", "kisirlastirilmadi", "kisir olmayan", "normal yetiskin"])) {
      profile.sterilized = false;
    } else if (this.hasAny(text, ["kisir", "sterilised", "sterilized", "kisirlastirilmis"])) {
      profile.sterilized = true;
    }

    if (this.hasAny(text, ["tahilsiz", "grain free"])) profile.grain = "tahilsiz";
    else if (this.hasAny(text, ["dusuk tahilli", "low grain"])) profile.grain = "dusuk-tahilli";
    else if (this.hasAny(text, ["tahilli"])) profile.grain = "tahilli";

    profile.need = this.detectNeed(text);
    profile.sort = this.detectSort(text);
    profile.compare = this.isCompareQuestion(text);
    profile.proteinFocus = this.hasAny(text, ["protein", "yuksek protein", "protein orani"]);
    profile.flavor = flavorTerms.find((term) => this.hasPhrase(text, term));
    profile.breed = breedTerms.find((term) => this.hasPhrase(text, term));
    profile.brands = brands.filter((brand) => this.brandMentioned(text, brand));
    profile.brand = profile.brands[0];
    profile.symptoms = healthSymptoms.filter((symptom) => text.includes(symptom));

    return profile;
  }

  private productAnswer(profile: LocalProfile, text: string) {
    const candidates = this.rankProducts(profile, text);

    if (candidates.length === 0) {
      if (!profile.animal) {
        return [
          "\u{1F50D} Daha isabetli oneride bulunabilmem icin once dostunuzun turunu netlestirelim.",
          "Kedi, kopek, kus, balik/akvaryum veya kemirgen oldugunu yazarsaniz; tahilli, tahilsiz, premium veya ekonomik secenekleri daha dogru ayirabilirim.",
          "",
          "\u{1F4AC} Ornek: 'Kedi icin tahilli mama oner' veya 'Kopegim icin 1500 TL alti mama ara'."
        ].join("\n");
      }

      const nearest = profile.budget
        ? this.rankProducts({ ...profile, budget: undefined }, text)
            .filter((candidate) => candidate.product.price > profile.budget!)
            .sort((first, second) => first.product.price - second.product.price)
            .slice(0, 2)
        : [];

      if (nearest.length) {
        return [
          "\u{1F50E} Bütçenize tam uyan bir ürün bulamadım",
          "Belirttiğiniz üst sınır " + formatPrice(profile.budget!) + ". Katalogdaki en yakın seçenekler şunlar:",
          "",
          ...nearest.flatMap((candidate, index) => this.productCard(candidate, index)),
          "",
          "\u{1F4A1} Bütçeyi biraz yükseltebilir veya yaş mama, açık mama ya da farklı bir marka isteyebilirsiniz."
        ].join("\n");
      }

      return [
        "\u{1F50E} Bu ölçütlerin hepsine uyan bir ürün bulamadım.",
        "",
        "Bir ölçütü esneterek tekrar deneyebiliriz:",
        "- Bütçeyi değiştirebilirsiniz.",
        "- Tahılsız yerine düşük tahıllı seçebilirsiniz.",
        "- Kuru mama yerine yaş mama isteyebilirsiniz.",
        "- Marka sınırlamasını kaldırabilirsiniz."
      ].join("\n");
    }

    const top = candidates.slice(0, 3);
    const productLines = top.flatMap((candidate, index) => this.productCard(candidate, index));
    const missing = this.missingProfileHints(profile);

    return [
      "\u{1F43E} Harika, " + candidates.length + " uygun seçenek buldum!",
      "",
      "\u{1F4CC} Anladığım bilgiler",
      ...this.profileSummaryLines(profile),
      "",
      "\u{1F6D2} Size en uygun ürünler",
      ...productLines,
      "",
      missing
        ? "\u{1F4A1} Öneriyi daha da netleştirmek için " + missing + " bilgisini de yazabilirsiniz."
        : "\u{1F4A1} İsterseniz bu sonuçları fiyat, protein veya alfabetik sıraya göre yeniden düzenleyebilirim."
    ]
      .filter(Boolean)
      .join("\n");
  }

  private compareAnswer(profile: LocalProfile, text: string) {
    const candidates = this.compareCandidates(profile, text);

    if (candidates.length < 2) {
      if (profile.brands && profile.brands.length >= 2) {
        return [
          "\u{2696}\u{FE0F} Marka karsilastirmasi icin dogru zemini kuralim",
          `${profile.brands.join(" ile ")} karsilastirmasinda tek basina marka adi yetmez; tur, yas donemi, kisir durumu, hassasiyet ve butce sonucu ciddi bicimde etkiler.`,
          "",
          "En saglikli karsilastirma icin",
          "- Hangi dostunuz icin baktiginizi yazin.",
          "- Yavru, yetiskin veya senior oldugunu ekleyin.",
          "- Tahilli, dusuk tahilli veya tahilsiz tercihiniz varsa belirtin.",
          "- Butce araliginizi yazin.",
          "",
          "\u{1F4AC} Bunlari yazarsaniz iki markayi fiyat, icerik mantigi ve kullanim amacina gore daha net ayirayim."
        ].join("\n");
      }
      return [
        "\u{1F50E} Karşılaştırma için iki uygun seçenek bulamadım.",
        "İki marka veya ürün adı yazın; örneğin “N&D ile Pro Plan kısır kedi mamasını karşılaştır”."
      ].join("\n");
    }

    const cheapest = [...candidates].sort((a, b) => this.priceForSort(a.product, "asc") - this.priceForSort(b.product, "asc"))[0];
    const strongest = [...candidates].sort((a, b) => b.score - a.score)[0];
    const proteinPick = [...candidates].sort((a, b) => (getProductProfile(b.product).proteinPercent ?? 0) - (getProductProfile(a.product).proteinPercent ?? 0))[0];

    return [
      "\u{2696}\u{FE0F} Karşılaştırma sonucu",
      "",
      ...candidates.flatMap((candidate, index) => this.productCard(candidate, index, true)),
      "",
      "\u{1F4B0} Fiyat avantajı: " + cheapest.product.name + " (" + this.priceLabel(cheapest.product) + ").",
      "\u{2705} Genel uyum: " + strongest.product.name + ".",
      getProductProfile(proteinPick.product).proteinPercent
        ? "\u{1F969} Protein odağı: " + proteinPick.product.name + " (%" + getProductProfile(proteinPick.product).proteinPercent + " protein)."
        : "\u{2139}\u{FE0F} Protein oranı her üründe yazmadığı için bu başlıkta kesin bir kazanan seçmedim.",
      "",
      "\u{1F4A1} Benim kısa yorumum: Bütçe öncelikliyse " +
        cheapest.product.brand.trim() +
        ", özel beslenme uyumu öncelikliyse " +
        strongest.product.brand.trim() +
        " tarafı daha mantıklı görünüyor."
    ].join("\n");
  }

  private compareCandidates(profile: LocalProfile, text: string) {
    if (profile.brands && profile.brands.length > 1) {
      const grouped = profile.brands.flatMap((brand) => this.rankProducts({ ...profile, brand, brands: [brand] }, text).slice(0, 2));
      return Array.from(new Map(grouped.map((candidate) => [candidate.product.id, candidate])).values()).slice(0, 4);
    }

    return this.rankProducts(profile, text).slice(0, 4);
  }

  private rankProducts(profile: LocalProfile, text: string): ProductCandidate[] {
    const terms = this.extractTerms(text).filter((term) => term.length >= 3);

    return products
      .filter((product) => {
        const productText = normalizeTerm(product.name + " " + product.brand + " " + product.description + " " + product.category);
        const productProfile = getProductProfile(product);
        const isCareProduct = profile.need === "bakim" && product.category === "bakim";

        if (profile.animal && product.category !== profile.animal && !isCareProduct) return false;
        if (profile.need && this.scoreNeed(productText, product.category, profile.need) <= 0) return false;
        if (profile.budget && (product.price <= 0 || product.price > profile.budget)) return false;
        if (profile.flavor && !productText.includes(profile.flavor)) return false;

        if (profile.brand) {
          const productBrand = normalizeTerm(product.brand.trim());
          if (!productBrand.includes(normalizeTerm(profile.brand.trim()))) return false;
        }

        if (profile.grain && profile.grain !== "belirsiz" && productProfile.isFood && productProfile.grainPreference !== profile.grain) {
          return false;
        }

        if (
          profile.lifeStage &&
          profile.lifeStage !== "belirsiz" &&
          productProfile.isFood &&
          productProfile.lifeStage !== "belirsiz" &&
          productProfile.lifeStage !== profile.lifeStage
        ) {
          return false;
        }

        if (profile.sterilized === false && productProfile.isFood && this.isSterilizedProduct(productText)) return false;
        return true;
      })
      .map((product) => {
        const productText = normalizeTerm(`${product.name} ${product.brand} ${product.description} ${product.category}`);
        const productProfile = getProductProfile(product);
        let score = 0;
        const reasons: string[] = [];

        if (profile.animal && product.category === profile.animal) {
          score += 70;
          reasons.push(this.animalLabel(profile.animal));
        }

        if (!profile.animal && this.hasAny(productText, ["mama", "konserve", "yem", "ödül", "odul"])) score += 8;

        if (profile.need) {
          const needScore = this.scoreNeed(productText, product.category, profile.need);
          score += needScore;
          if (needScore > 0) reasons.push(this.needLabel(profile.need));
        }

        const matchedBrand = profile.brands?.find((brand) => normalizeTerm(product.brand.trim()).includes(normalizeTerm(brand.trim())));
        if (matchedBrand) {
          score += 45;
          reasons.push(`${product.brand.trim()} markası`);
        } else if (profile.brand && normalizeTerm(product.brand.trim()).includes(normalizeTerm(profile.brand.trim()))) {
          score += 45;
          reasons.push(`${product.brand.trim()} markası`);
        } else if (profile.compare && profile.brands && profile.brands.length > 1) {
          score -= 30;
        }

        if (profile.flavor && productText.includes(profile.flavor)) {
          score += 18;
          reasons.push(`${profile.flavor} içerikli`);
        }

        if (profile.lifeStage && productProfile.lifeStage === profile.lifeStage) {
          score += 24;
          reasons.push(lifeStageLabels[profile.lifeStage]);
        }

        if (profile.grain && productProfile.grainPreference === profile.grain) {
          score += 22;
          reasons.push(grainPreferenceLabels[profile.grain]);
        }

        if (profile.sterilized && this.isSterilizedProduct(productText)) {
          score += 18;
          reasons.push("kısır dostlara uygun");
        } else if (profile.sterilized === false && productProfile.isFood) {
          score += 8;
          reasons.push("kısır olmayan yetişkinlere uygun");
        }

        if (profile.proteinFocus && productProfile.proteinPercent) {
          score += Math.min(30, productProfile.proteinPercent / 2);
          reasons.push(`%${productProfile.proteinPercent} protein`);
        }

        if (profile.weightKg && product.category === "kopek") {
          if (profile.weightKg && profile.weightKg <= 10 && productProfile.breedSize === "kucuk") {
            score += 16;
            reasons.push(breedSizeLabels.kucuk);
          }
          if (profile.weightKg && profile.weightKg >= 22 && productProfile.breedSize === "orta-buyuk") {
            score += 16;
            reasons.push(breedSizeLabels["orta-buyuk"]);
          }
        }

        if (profile.budget) {
          if (product.price > 0 && product.price <= profile.budget) {
            score += 16;
            reasons.push("bütçe içinde");
          } else if (product.price > profile.budget) {
            score -= 18;
          }
        }

        const termHits = terms.filter((term) => productText.includes(term));
        score += termHits.length * 7;
        if (termHits.length > 0) reasons.push("ürün açıklaması isteğinizle eşleşiyor");

        score += Math.round((product.rating ?? 0) * 2);
        if (product.stock === "Stokta") score += 4;

        return { product, score, reasons: Array.from(new Set(reasons)) };
      })
      .filter((candidate) => candidate.score > 8)
      .sort((first, second) => {
        if (profile.sort === "price-asc") return this.priceForSort(first.product, "asc") - this.priceForSort(second.product, "asc");
        if (profile.sort === "price-desc") return this.priceForSort(second.product, "desc") - this.priceForSort(first.product, "desc");
        if (profile.sort === "alphabetic") return first.product.name.localeCompare(second.product.name, "tr-TR");
        if (profile.sort === "rating") return second.product.rating - first.product.rating || second.score - first.score;
        if (profile.sort === "protein" || profile.proteinFocus) {
          return (getProductProfile(second.product).proteinPercent ?? 0) - (getProductProfile(first.product).proteinPercent ?? 0) || second.score - first.score;
        }
        return second.score - first.score || second.product.rating - first.product.rating;
      });
  }

  private healthAnswer(profile: LocalProfile, text: string) {
    const urgent = severeSymptoms.some((symptom) => text.includes(symptom));
    const symptomText = profile.symptoms.length
      ? profile.symptoms.map((symptom) => symptomLabels[symptom] ?? symptom).join(", ")
      : "anlattığınız belirti";

    const lines = [
      "\u{1FA7A} Durumu anladım: " + symptomText,
      "Tanı koyamam ama güvenli ilk adımları ve ne zaman veterinere gidilmesi gerektiğini netleştirebilirim.",
      "",
      urgent
        ? "\u{26A0}\u{FE0F} Acil: Nefes alamama, nöbet, bayılma, zehirlenme, idrar yapamama, ciddi kanama veya bilinç değişikliği varsa beklemeden en yakın veterinere gidin."
        : "\u{1F4CC} İlk kontrol",
      "- Temiz suyu ulaşılabilir tutun ve genel enerjisini izleyin.",
      "- Belirtinin ne zaman başladığını, kaç kez tekrar ettiğini ve iştahını not alın.",
      "- İnsan ilacı vermeyin; ani mama veya takviye değişikliği yapmayın."
    ];

    if (text.includes("tuy") || text.includes("deri") || text.includes("kasinti")) {
      lines.push(
        "",
        "\u{1F9FC} Tüy ve deri için",
        "- Mevsimsel dökülmede düzenli tarama ve dengeli beslenme yardımcı olur.",
        "- Bölgesel kellik, kızarıklık, yara, yoğun kaşıntı veya kötü koku varsa parazit, mantar ya da alerji değerlendirmesi gerekir.",
        "- Omega desteğini rastgele dozlamayın; yaşı ve kilosuna uygun ürünü veterinerle netleştirin."
      );
    }
    if (text.includes("ishal") || text.includes("kusma")) {
      lines.push(
        "",
        "\u{1F4A7} Sindirim için",
        "- Su kaybını, dışkıda veya kusmukta kanı ve karın ağrısını takip edin.",
        "- Tekrarlayan kusma, kanlı ishal, belirgin halsizlik veya su içememe varsa aynı gün veterinerle görüşün.",
        "- Yavru, senior ve kronik hastalığı olan dostlarda daha erken yardım alın."
      );
    }
    if (this.hasAny(text, ["yemiyor", "mama yemiyor", "hic yemiyor", "su icmiyor", "cok su iciyor"])) {
      lines.push(
        "",
        "\u{1F37D}\u{FE0F} Yeme ve su içme düzeni için",
        "- Tam yememe, su içmeme veya belirgin su artışı tek başına önemli bir işaret olabilir.",
        "- Kedilerde bir günü bulan yememe özellikle ciddiye alınmalıdır.",
        "- Ani değişimin süresi, kullandığı mama ve enerji düzeyi not edilmelidir."
      );
    }
    if (text.includes("istah") || text.includes("halsiz") || text.includes("kilo kay")) {
      lines.push(
        "",
        "\u{1F37D}\u{FE0F} İştah ve enerji için",
        "- Mama kabı, ağız/diş hassasiyeti, stres ve yakın zamanda yapılan mama değişimini kontrol edin.",
        "- Kedilerde bir günü bulan yememe, yavrularda birkaç öğün üst üste yememe önemlidir; veterineri geciktirmeyin."
      );
    }
    if (this.hasAny(text, urgentIngestionTerms)) {
      lines.push(
        "",
        "\u{26A0}\u{FE0F} Yutma/zehirlenme uyarısı",
        "- Ne yediğini, miktarı ve saati not alın; ambalajı saklayın.",
        "- Zorla kusturmaya çalışmayın.",
        "- Nefes zorlanması, titreme, tekrar eden kusma veya ani durgunluk varsa acil yardım alın."
      );
    }
    if (text.includes("pire") || text.includes("kene")) {
      lines.push(
        "",
        "\u{1F6E1}\u{FE0F} Dış parazit için",
        "- Ürün mutlaka türe, yaşa ve kiloya uygun olmalı; köpek ürünü kedide kullanılmamalıdır.",
        "- Keneyi yağla veya kolonya ile çıkarmaya çalışmayın; ağız parçası içeride kalırsa veteriner desteği alın."
      );
    }
    if (text.includes("idrar")) {
      lines.push(
        "",
        "\u{26A0}\u{FE0F} İdrar uyarısı",
        "- Sık sık kuma gidip yapamama, ağlayarak zorlanma veya kan görme özellikle erkek kedilerde acil olabilir."
      );
    }
    if (text.includes("kulak")) {
      lines.push("", "\u{1F442} Kulak için", "- Kulak çubuğunu kanala sokmayın. Kötü koku, koyu akıntı veya baş sallama varsa muayene gerekir.");
    }
    if (text.includes("oksur") || text.includes("hapsir") || text.includes("goz akinti")) {
      lines.push(
        "",
        "\u{1F32C}\u{FE0F} Solunum ve göz için",
        "- Ortamı dumansız ve iyi havalanır tutun. Nefes zorlanması, sarı-yeşil akıntı veya yememe varsa veterinerle görüşün."
      );
    }

    lines.push(
      "",
      "\u{1F4AC} Daha net yönlendirmem için yaşını, kilosunu, belirtinin süresini ve iştah/enerji durumunu yazabilirsiniz."
    );
    return lines.join("\n");
  }

  private nutritionAnswer(text: string, profile: LocalProfile) {
    if (
      (text.includes("tahilsiz") && text.includes("tahilli")) ||
      this.hasAny(text, ["tahilsiz fark", "tahil gerekli", "grain free"])
    ) {
      return [
        "\u{1F33E} Tahıllı mı, tahılsız mı?",
        "Tahılsız mama otomatik olarak daha kaliteli demek değildir. Önemli olan mamanın toplam içeriği, hayvansal protein kaynağı, kalori dengesi ve minik dostunuzun toleransıdır.",
        "",
        "- Tahıla karşı doğrulanmış hassasiyet varsa tahılsız seçenek düşünülebilir.",
        "- Hassasiyet yoksa iyi formüle edilmiş tahıllı veya düşük tahıllı mama da uygun olabilir.",
        "- Kaşıntı ya da sindirim sorunu varsa sorumlu içerik çoğu zaman yalnızca tahıl değildir; veteriner eşliğinde eleme diyeti daha güvenilir olur.",
        "",
        "\u{1F4A1} Yaş, kilo, tür ve varsa hassasiyetini yazarsanız katalogdan iki grubu da karşılaştırabilirim."
      ].join("\n");
    }

    if (this.hasAny(text, ["kisir mama", "kisirlastirma sonrasi", "sterilised", "sterilized"])) {
      return [
        "\u{2696}\u{FE0F} Kısırlaştırma sonrası beslenme",
        "Kısırlaştırma sonrasında enerji ihtiyacı azalabilir, iştah ise artabilir. Bu nedenle porsiyon kontrolü ve kilo takibi mamanın adından daha önemlidir.",
        "",
        "- Kısır dostlara uygun mamalar genellikle kalori ve mineral dengesine odaklanır.",
        "- Geçişi 7-10 günde kademeli yapın.",
        "- Ayda bir kilo ve vücut kondisyonu kontrolü yapın.",
        "- Su tüketimini destekleyin; özellikle kedilerde yaş mama eklemek faydalı olabilir."
      ].join("\n");
    }

    if (this.hasAny(text, ["protein", "yuksek protein", "protein orani"])) {
      return [
        "\u{1F969} Protein oranı nasıl değerlendirilmeli?",
        "Tek başına en yüksek yüzdeyi seçmek doğru değildir. Proteinin kaynağı, sindirilebilirliği, toplam kalori ve hayvanın yaşı birlikte değerlendirilir.",
        "",
        "- Yavru ve aktif dostların ihtiyacı yetişkinlerden farklıdır.",
        "- Böbrek, karaciğer veya idrar yolu sorunu varsa oran veteriner tarafından belirlenmelidir.",
        "- Etiketlerdeki yüzdeler farklı nem oranlarına sahip kuru ve yaş mamalar arasında doğrudan kıyaslanmamalıdır.",
        "",
        "\u{1F4A1} “Protein oranına göre kedi mamalarını sırala” yazarak katalogdaki oranı bilinen ürünleri görebilirsiniz."
      ].join("\n");
    }

    if (this.hasAny(text, ["yas mama mi", "kuru mama mi", "yas ve kuru", "konserve mi"])) {
      return [
        "\u{1F963} Yaş mama ve kuru mama",
        "- Yaş mama su alımını destekler ve seçici dostlarda daha iştah açıcı olabilir.",
        "- Kuru mama porsiyonlaması ve saklaması kolaydır; gram başına kalorisi daha yüksektir.",
        "- İkisi birlikte verilebilir, ancak günlük toplam kalori aşılmamalıdır.",
        "- Yaş mama tek başına kullanılacaksa etikette “tam ve dengeli” ibaresi aranmalıdır.",
        "",
        "\u{1F4A1} Yaşını, kilosunu ve mevcut mama düzenini yazarsanız daha uygun bir plan önerebilirim."
      ].join("\n");
    }

    if (this.hasAny(text, ["sut", "cikolata", "sogan", "sarimsak", "uzum", "insan yemegi", "ne yiyebilir", "ev yemegi"])) {
      return [
        "\u{26A0}\u{FE0F} Evdeki yiyecekler konusunda dikkat",
        "Çikolata, soğan, sarımsak, üzüm/kuru üzüm, ksilitol içeren ürünler, alkol, kafein ve pişmiş kemikler verilmemelidir.",
        "",
        "- İnek sütü birçok kedi ve köpekte ishal yapabilir.",
        "- Tuzlu, yağlı ve baharatlı yemeklerden kaçının.",
        "- Ödül olarak verilecek ek gıdalar günlük kalorinin yaklaşık %10’unu geçmemelidir.",
        "",
        "Şüpheli bir şey yediyse ürünün adını, miktarını, ne zaman yediğini ve kilosunu yazarak hemen veterinerden destek alın."
      ].join("\n");
    }

    return [
      "\u{1F37D}\u{FE0F} Beslenme konusunda yardımcı olabilirim.",
      "Türünü, yaşını, kilosunu, kısır durumunu ve merak ettiğiniz konuyu yazın. Mama seçimi, porsiyon, içerik, yaş-kuru mama dengesi ve geçiş planını birlikte değerlendirebiliriz."
    ].join("\n");
  }

  private careAnswer(text: string, profile: LocalProfile) {
    if (this.hasAny(text, ["mama degis", "mama değiş", "gecis", "geçiş", "yeni mamaya"])) {
      return [
        "\u{1F963} Mama geçiş planı",
        "- 1-2. gün: %75 eski mama + %25 yeni mama",
        "- 3-4. gün: %50 eski + %50 yeni",
        "- 5-6. gün: %25 eski + %75 yeni",
        "- 7. gün: tamamen yeni mama",
        "",
        "Hassas mide, yavru/senior yaş veya ishal eğilimi varsa planı 10 güne yayın."
      ].join("\n");
    }

    if (this.hasAny(text, ["ne kadar mama", "gunluk mama", "günlük mama", "olcu", "ölçü", "kac gram", "kaç gram"])) {
      const weight = profile.weightKg ? `${profile.weightKg} kg` : "kilosuna";
      return [
        "\u{2696}\u{FE0F} Günlük mama miktarı",
        `Net miktar ${weight}, yaş, kısır durumu, aktivite ve seçilen mamanın kalori değerine göre değişir.`,
        "- Paketin arkasındaki tabloyu baz alın.",
        "- Ödül maması veriyorsanız ana mamadan biraz azaltın.",
        "- Kısır dostlarda kilo kontrolü için porsiyonları ölçerek verin.",
        "",
        "Mama adını yazarsanız daha net aralık söyleyebilirim."
      ].join("\n");
    }

    if (this.hasAny(text, ["su", "icmiyor", "içmiyor", "az iciyor", "az içiyor"])) {
      return [
        "\u{1F4A7} Su içmeyi artırma önerileri",
        "- Su kabını günde birkaç kez yenileyin.",
        "- Plastik yerine seramik veya çelik kap deneyin.",
        "- Yaş mama/çorba ile sıvı alımını destekleyin.",
        "- Kedilerde sessiz su pınarı işe yarayabilir.",
        "",
        "Hiç su içmeme, aşırı su içme veya halsizlik varsa veterinerle görüşün."
      ].join("\n");
    }

    if (this.hasAny(text, ["kum", "tuvalet", "koku", "çiş", "cis"])) {
      return [
        "\u{1F9F9} Tuvalet ve koku düzeni",
        "- Topaklanan kaliteli kum kullanın.",
        "- Kum kabını her gün temizleyin, haftalık tam değişim yapın.",
        "- Kedi tuvalet dışına yapıyorsa kum tipi, stres, kabın yeri veya sağlık sorunu olabilir.",
        "- İdrarda kan, zorlanma veya sık tuvalete gitme varsa acildir."
      ].join("\n");
    }

    if (this.hasAny(text, ["oyuncak", "sıkılıyor", "sikiliyor", "enerji", "egzersiz", "eğlence"])) {
      return [
        "\u{1F3BE} Oyun ve enerji önerisi",
        "- Kediler için olta, top, tırmalama ve zeka oyuncağı iyi çalışır.",
        "- Köpekler için dayanıklı çiğneme oyuncağı, top ve ödüllü zeka oyuncakları uygundur.",
        "- Yavru dostlarda daha yumuşak, büyük ırklarda daha dayanıklı ürün seçin."
      ].join("\n");
    }

    if (this.hasAny(text, ["kac ogun", "ogun sayisi", "gunde kac kez", "besleme sikligi"])) {
      return [
        "\u{1F552} Öğün düzeni",
        "- Yavrular genellikle yaşına göre günde 3-4 küçük öğüne ihtiyaç duyar.",
        "- Sağlıklı yetişkin kedi ve köpeklerde günlük miktarı 2 veya daha fazla öğüne bölmek uygundur.",
        "- Hızlı yiyen dostlarda yavaş yeme kabı ve küçük porsiyonlar kullanılabilir.",
        "- Diyabet, mide hassasiyeti veya özel hastalıkta düzeni veteriner belirlemelidir.",
        "",
        "Yaşını, kilosunu ve kullandığınız mamanın adını yazarsanız daha net bir düzen kurabiliriz."
      ].join("\n");
    }

    if (this.hasAny(text, ["dis bakimi", "dis fircala", "agiz bakimi", "dis tasi"])) {
      return [
        "\u{1F9B7} Ağız ve diş bakımı",
        "- Petlere özel diş macunu ve yumuşak fırça kullanın; insan diş macunu kullanmayın.",
        "- Alıştırmaya önce dudak ve diş etine kısa dokunuşlarla başlayın.",
        "- Diş ödülleri destek olabilir ancak fırçalamanın ve muayenenin yerini tutmaz.",
        "- Kötü koku, kanama, salya artışı veya yemede zorlanma varsa veteriner kontrolü gerekir."
      ].join("\n");
    }

    if (this.hasAny(text, ["yolculuk", "seyahat", "arabada", "tasima cantasi"])) {
      return [
        "\u{1F697} Güvenli yolculuk",
        "- Taşıma çantasını yolculuktan önce evde açık bırakıp olumlu bir alana dönüştürün.",
        "- Araçta serbest dolaştırmayın; çantayı veya güvenlik kemerini sabitleyin.",
        "- Yol öncesi çok büyük öğün vermeyin, temiz su ve mola planlayın.",
        "- Sakinleştirici ilaçları veteriner önerisi olmadan kullanmayın."
      ].join("\n");
    }

    if (this.hasAny(text, ["banyo", "yikama", "yıkama", "sampuan", "şampuan", "tarak", "tırnak", "tirnak"])) {
      return [
        "\u{1F9FC} Bakım rutini",
        "- İnsan şampuanı kullanmayın; petlere özel şampuan seçin.",
        "- Tüy tipine göre tarak seçmek dökülmeyi ve düğümlenmeyi azaltır.",
        "- Tırnak kesiminde canlı dokuya yaklaşmayın; emin değilseniz profesyonel destek alın.",
        "- Kulak ve göz çevresinde parfümlü/alkollü ürün kullanmayın."
      ].join("\n");
    }

    return [
      "\u{1F43E} Bakım konusunda yardımcı olabilirim.",
      "Daha net bir öneri için türünü, yaşını, kilosunu ve merak ettiğiniz konuyu yazın.",
      "Mama düzeni, su tüketimi, tuvalet, tüy/deri, oyun, diş, banyo, tırnak veya yolculuk hakkında sorabilirsiniz."
    ].join("\n");
  }

  private storeAnswer(text: string) {
    const wantsContact = this.hasAny(text, ["telefon", "whatsapp", "ara", "iletisim"]);
    const wantsAddress = this.hasAny(text, ["adres", "nerede", "konum", "harita"]);
    const wantsHours = this.hasAny(text, ["saat", "acik", "kapan", "calisma"]);
    const wantsDelivery = this.hasAny(text, ["teslimat", "servis", "kargo", "ucretsiz"]);
    const showAll = !wantsContact && !wantsAddress && !wantsHours && !wantsDelivery;
    const lines = ["\u{1F3EA} " + storeInfo.shortName, storeInfo.tagline];

    if (wantsAddress || showAll) {
      lines.push("", "\u{1F4CD} Adres", storeInfo.address);
    }
    if (wantsHours || showAll) {
      lines.push("", "\u{1F552} Çalışma saatleri", storeInfo.hours);
    }
    if (wantsDelivery || showAll) {
      lines.push("", "\u{1F69A} Teslimat", storeInfo.freeDelivery + ".");
    }
    if (wantsContact || wantsDelivery || showAll) {
      lines.push("", "\u{260E}\u{FE0F} İletişim", "Telefon: " + storeInfo.phone, "WhatsApp: +" + storeInfo.whatsapp);
    }

    lines.push("", "\u{1F4A1} Stok teyidi veya sipariş için ürün adını WhatsApp üzerinden iletebilirsiniz.");
    return lines.join("\n");
  }

  private catalogAnswer(text: string) {
    const wantsBrands = this.hasAny(text, ["marka", "markalar"]);
    const wantsCategories = this.hasAny(text, ["kategori", "kategoriler", "neler var"]);
    const wantsCampaigns = this.hasAny(text, ["kampanya", "indirim", "firsat"]);
    const lines = [
      "\u{1F4E6} Katalog özeti",
      products.length + " ürün, " + brands.length + " marka ve " + categories.length + " ana kategori bulunuyor."
    ];

    if (wantsBrands) {
      lines.push("", "\u{1F3F7}\u{FE0F} Öne çıkan markalar", brands.slice(0, 22).join(", "));
    }
    if (wantsCategories) {
      lines.push("", "\u{1F5C2}\u{FE0F} Kategoriler", ...categories.map((category) => "- " + category.name + ": " + category.description));
    }
    if (wantsCampaigns) {
      lines.push(
        "",
        "\u{1F389} Kampanyalar",
        ...campaigns.map(
          (campaign) => "- " + campaign.title + ": " + campaign.discountLabel + ". Geçerlilik: " + campaign.validUntil + "."
        )
      );
    }

    lines.push("", "\u{1F4A1} Marka, fiyat, yaş, tahıl, protein veya ürün türü yazarak listeyi daraltabilirsiniz.");
    return lines.join("\n");
  }

  private profileAcknowledgement(profile: LocalProfile, current: LocalProfile) {
    const lines = ["\u{2705} Bilgiyi not aldım.", "", ...this.profileSummaryLines(profile), ""];

    if (current.age !== undefined && current.ageUnit === "yil" && current.age > 20) {
      lines.push(
        "\u{1F4A1} " +
          current.age +
          " yaş doğruysa oldukça ileri bir yaş. “22 aylık” demek istediyseniz ay bilgisini özellikle yazabilirsiniz."
      );
    }

    if (!profile.animal) {
      lines.push("\u{1F4AC} Bu hangi dostumuz: kedi, köpek, kuş, balık veya kemirgen?");
    } else if (!profile.need) {
      lines.push("\u{1F4AC} Onun için ne arıyorsunuz: mama, ödül, oyuncak, bakım ürünü, kum veya tasma?");
    } else if (!profile.age && (profile.animal === "kedi" || profile.animal === "kopek")) {
      lines.push("\u{1F4AC} Yaşını da yazarsanız yavru, yetişkin veya senior ürünleri doğru eşleştirebilirim.");
    } else {
      lines.push("\u{1F4AC} Hazırım. “Öner” yazabilir veya bütçe, marka ve içerik tercihi ekleyebilirsiniz.");
    }

    return lines.join("\n");
  }

  private universalAnswer(question: string, profile: LocalProfile) {
    const text = normalizeTerm(question);

    if (this.hasAny(text, ["sen kimsin", "adin ne", "ne yaparsin", "ne ise yararsin", "yardim"])) return this.opening();
    if (this.hasAny(text, ["kac yasindasin", "senin yasin"])) {
      return "\u{1F916} Benim biyolojik bir yaşım yok; ama pet ürünleri ve temel bakım konularında oldukça dolu bir bilgi çantam var.";
    }
    if (this.hasAny(text, ["anlamadin", "yanlis cevap", "ise yaramiyor", "kotu cevap"])) {
      return [
        "\u{1F64F} Haklısınız, o mesajı doğru yorumlayamadım.",
        "Tekrar deneyelim: Evcil dostunuzun türünü ve ne istediğinizi tek cümlede yazın. Önceki bilgileri silmek için sohbet başlığındaki yenile düğmesini de kullanabilirsiniz."
      ].join("\n");
    }

    if (profile.animal || profile.age || profile.weightKg) {
      return [
        "\u{1F914} Sorunuzu tam olarak anlayamadım ama minik dostunuzla ilgili bilgileri hatırlıyorum:",
        "",
        ...this.profileSummaryLines(profile),
        "",
        "\u{1F4AC} Mama önerisi, fiyat sıralaması, bakım, beslenme, başlangıç listesi veya mağaza desteği şeklinde biraz daha açık yazabilir misiniz?"
      ].join("\n");
    }

    return buildExpandedFallback(profile);
  }

  private productCard(candidate: ProductCandidate, index: number, compact = false) {
    const { product, reasons } = candidate;
    const profile = getProductProfile(product);
    const unitPrice =
      product.price > 0 && profile.packageWeightKg
        ? formatPrice(Math.round(product.price / profile.packageWeightKg)) + "/kg"
        : null;
    const details = [
      "\u{1F3F7}\u{FE0F} " + product.brand.trim(),
      "\u{1F4B0} " + this.priceLabel(product),
      unitPrice ? "Birim: " + unitPrice : null,
      "\u{2B50} " + product.rating.toFixed(1),
      product.stock === "Stokta" ? "\u{2705} Stokta" : "\u{23F3} Az kaldı",
      profile.proteinPercent ? `%${profile.proteinPercent} protein` : null,
      profile.packageWeightKg ? `${profile.packageWeightKg} kg` : null,
      profile.grainPreference !== "belirsiz" ? grainPreferenceLabels[profile.grainPreference] : null
    ].filter(Boolean);

    if (compact) {
      return [
        `${index + 1}. ${product.name}`,
        "   " + details.join("  •  "),
        "   \u{2705} Neden: " + (reasons.slice(0, 3).join(", ") || "genel katalog uyumu yüksek")
      ];
    }

    return [
      "",
      `${index + 1}. ${product.name}`,
      "   " + details.join("  •  "),
      "   \u{2705} Neden önerdim: " + (reasons.slice(0, 4).join(", ") || "genel katalog uyumu yüksek")
    ];
  }

  private isGreeting(text: string) {
    const greeting = text.replace(/[.!?,]/g, "").trim();
    return ["merhaba", "selam", "selamlar", "gunaydin", "iyi gunler", "iyi aksamlar", "hey", "hello"].includes(greeting);
  }

  private isStoreQuestion(text: string) {
    return this.hasAny(text, [
      "telefon",
      "whatsapp",
      "adres",
      "internet siteniz",
      "konum",
      "saat",
      "acik",
      "teslimat",
      "servis",
      "kargo",
      "iletisim",
      "nerede",
      "magazada",
      "gelip al",
      "hemen al",
      "magaza",
      "internette",
      "sube",
      "subeleriniz",
      "baska magazaniz",
      "gonderiyor",
      "cumartesi",
      "pazar",
      "resmi tatil"
    ]);
  }

  private isCatalogQuestion(text: string) {
    return this.hasAny(text, [
      "markalar neler",
      "hangi markalar",
      "marka listesi",
      "kategoriler",
      "hangi kategoriler",
      "kampanya",
      "indirim",
      "firsat",
      "neler var"
    ]);
  }

  private isHealthQuestion(text: string, profile: LocalProfile) {
    if (
      this.hasAny(text, [
        "veteriner misiniz",
        "veteriner hizmeti",
        "asi yapiyor",
        "cip takiyor",
        "tirnak kesiyor",
        "pet kuafor",
        "otel var mi",
        "pansiyon var mi"
      ])
    ) {
      return false;
    }

    return (
      profile.symptoms.length > 0 ||
      this.hasAny(text, [
        "hasta",
        "veteriner",
        "alerji",
        "belirti",
        "rahatsiz",
        "iyi degil",
        "yemiyor",
        "su icmiyor",
        "cok su iciyor",
        "mama yemiyor",
        "kanli",
        "yuttu",
        "zehir",
        "nefes alamiyor",
        "cikolata",
        "uzum",
        "sogan",
        "sarimsak",
        "fare zehri",
        "camasir suyu",
        "ilac yedi",
        "ilac kullaniyor",
        "ameliyat oldu",
        "midesi bozuldu",
        "yaslandi",
        "kilo vermeli",
        "kilo almali",
        "gozunu acamiyor",
        "gozu kizardi",
        "goz akiyor",
        "burnu akiyor",
        "agzi kokuyor",
        "surekli uyuyor",
        "yem yemiyor",
        "hasta gibi",
        "karni sis",
        "topalliyor",
        "nefes alirken ses",
        "agzini acip nefes aliyor",
        "avokado"
      ]) ||
      this.hasWord(text, "acil")
    );
  }

  private isNutritionQuestion(text: string) {
    const directSafetyQuestion = this.hasAny(text, [
      "sut verebilir",
      "yogurt verebilir",
      "peynir verebilir",
      "ton baligi verebilir",
      "tavuk verebilir",
      "ciger verebilir",
      "yumurta verebilir",
      "ekmek verebilir",
      "kemik verebilir",
      "cikolata",
      "sogan",
      "sarimsak",
      "uzum",
      "avokado",
      "insan yemegi",
      "ev yemegi",
      "ne yiyebilir"
    ]);
    const explanationQuestion = this.hasAny(text, ["neden", "nedir", "gerekli mi", "mi daha", "farki", "zararli mi", "olur mu", "nasil olmali"]);
    const nutritionTopic = this.hasAny(text, [
      "tahilli",
      "tahilsiz",
      "protein",
      "kisir mama",
      "yas mama mi",
      "kuru mama mi",
      "beslenme"
    ]);
    return directSafetyQuestion || (nutritionTopic && explanationQuestion);
  }

  private isCareQuestion(text: string) {
    return this.hasAny(text, [
      "mama degis",
      "gecis",
      "ne kadar mama",
      "gunluk mama",
      "su icm",
      "az su",
      "kum",
      "tuvalet",
      "koku",
      "oyuncak",
      "sikiliyor",
      "banyo",
      "sampuan",
      "tarak",
      "tirnak",
      "kac gram",
      "kac ogun",
      "ogun sayisi",
      "gunde kac kez",
      "besleme sikligi",
      "dis bakimi",
      "dis fircala",
      "agiz bakimi",
      "dis tasi",
      "yolculuk",
      "seyahat",
      "arabada",
      "tasima cantasi"
    ]);
  }

  private isProductQuestion(text: string, current: LocalProfile, context: LocalProfile) {
    const directRequest = this.hasAny(text, [
      "oner",
      "tavsiye",
      "fiyat",
      "ucuz",
      "premium",
      "mama",
      "urun",
      "stok",
      "listele",
      "sirala",
      "goster",
      "ariyorum"
    ]);
    const currentProductDetail = Boolean(current.need || current.brand || current.flavor);
    const followUpFilter = Boolean(
      (current.budget || current.grain || current.sort || current.proteinFocus) &&
        (context.need || context.brand)
    );
    return directRequest || currentProductDetail || followUpFilter;
  }

  private isCompareQuestion(text: string) {
    return this.hasAny(text, ["karsilastir", "farki", "hangisi daha", "mi daha iyi", "mu daha iyi", "versus", " vs "]);
  }

  private detectNeed(text: string): ProductNeed | undefined {
    if (this.hasAny(text, ["yas mama", "konserve", "corba", "vitaldrink", "pouch"])) return "yas-mama";
    if (this.hasAny(text, ["odul", "egitim", "kraker", "kracker"])) return "odul";
    if (this.hasAny(text, ["kuru mama", "mama", "food"])) return "kuru-mama";
    if (this.hasAny(text, ["beslenme"])) return "mama";
    if (this.hasAny(text, ["oyuncak", "top", "olta", "kemirme"])) return "oyuncak";
    if (this.hasAny(text, ["vitamin", "takviye", "omega", "malt"])) return "vitamin";
    if (this.hasAny(text, ["kum", "tuvalet"])) return "kum";
    if (this.hasAny(text, ["tasma", "gogus", "kayis"])) return "tasma";
    if (this.hasAny(text, ["bakim", "sampuan", "tarak", "paste"])) return "bakim";
    if (this.hasAny(text, ["akvaryum", "filtre", "yem", "balik"])) return "akvaryum";
    return undefined;
  }

  private detectSort(text: string): LocalProfile["sort"] {
    if (this.hasAny(text, ["alfabetik", "a-z", "isme gore"])) return "alphabetic";
    if (this.hasAny(text, ["protein oranina gore", "proteini yuksek", "protein sirala"])) return "protein";
    if (this.hasAny(text, ["puana gore", "en begenilen", "en kaliteli", "rating", "premium"])) return "rating";
    if (this.hasAny(text, ["azalan", "pahalidan ucuza", "fiyat yuksekten", "en pahali"])) return "price-desc";
    if (this.hasAny(text, ["artan", "ucuzdan pahaliya", "ucuz", "en uygun", "ekonomik", "dusuk fiyat"])) return "price-asc";
    return undefined;
  }

  private scoreNeed(productText: string, category: string, need: ProductNeed) {
    const isWet = this.hasAny(productText, ["yas mama", "konserve", "corba", "vitaldrink", "pouch"]);
    const isTreat = this.hasAny(productText, ["odul", "kracker", "kraker"]);
    const isMainFood = this.hasAny(productText, ["mama", "food", "konserve"]) && !isTreat;

    if (need === "mama" && isMainFood) return isWet ? 26 : 34;
    if (need === "kuru-mama" && isMainFood && !isWet) return 38;
    if (need === "yas-mama" && isWet) return 38;
    if (need === "odul" && isTreat) return 34;
    if (need === "oyuncak" && this.hasAny(productText, ["oyuncak", "top", "olta"])) return 34;
    if (need === "vitamin" && this.hasAny(productText, ["vitamin", "malt", "omega", "vitaldrink"])) return 30;
    if (need === "kum" && this.hasAny(productText, ["kum", "tuvalet"])) return 34;
    if (need === "tasma" && this.hasAny(productText, ["tasma", "gogus"])) return 34;
    if (need === "bakim" && (category === "bakim" || this.hasAny(productText, ["bakim", "paste", "tarak", "sampuan"]))) return 30;
    if (need === "akvaryum" && (category === "akvaryum" || this.hasAny(productText, ["akvaryum", "flakes", "yem"]))) return 36;
    return 0;
  }

  private needLabel(need: ProductNeed) {
    const labels: Record<ProductNeed, string> = {
      mama: "mama ihtiyacı",
      "kuru-mama": "kuru mama ihtiyacı",
      "yas-mama": "yaş mama/konserve ihtiyacı",
      odul: "ödül maması ihtiyacı",
      oyuncak: "oyuncak ihtiyacı",
      vitamin: "vitamin/takviye ihtiyacı",
      kum: "kum ihtiyacı",
      tasma: "tasma ihtiyacı",
      bakim: "bakım ürünü ihtiyacı",
      akvaryum: "akvaryum ihtiyacı"
    };
    return labels[need];
  }

  private profileSummaryLines(profile: LocalProfile) {
    const lines: string[] = [];
    const sortLabels: Record<ProductSort, string> = {
      "price-asc": "Fiyat: düşükten yükseğe",
      "price-desc": "Fiyat: yüksekten düşüğe",
      alphabetic: "Alfabetik",
      rating: "Puana göre",
      protein: "Protein oranına göre"
    };

    if (profile.animal) lines.push("- Tür: " + this.animalLabel(profile.animal));
    if (profile.age !== undefined && profile.ageUnit) {
      const ageLabel = profile.ageUnit === "ay" ? profile.age + " aylık" : profile.age + " yaşında";
      lines.push("- Yaş: " + ageLabel + (profile.lifeStage ? " (" + lifeStageLabels[profile.lifeStage] + ")" : ""));
    } else if (profile.lifeStage) {
      lines.push("- Yaş dönemi: " + lifeStageLabels[profile.lifeStage]);
    }
    if (profile.weightKg) lines.push("- Kilo: " + profile.weightKg + " kg");
    if (profile.breed) lines.push("- Irk: " + profile.breed);
    if (profile.sterilized !== undefined) lines.push("- Kısır durumu: " + (profile.sterilized ? "kısır" : "kısır değil"));
    if (profile.grain) lines.push("- Tahıl tercihi: " + grainPreferenceLabels[profile.grain]);
    if (profile.need) lines.push("- Aranan: " + this.needLabel(profile.need));
    if (profile.brand) lines.push("- Marka: " + profile.brand.trim());
    if (profile.flavor) lines.push("- İçerik tercihi: " + profile.flavor);
    if (profile.budget) lines.push("- Bütçe: en fazla " + formatPrice(profile.budget));
    if (profile.sort) lines.push("- Sıralama: " + sortLabels[profile.sort]);

    return lines.length ? lines : ["- Genel katalog eşleşmesi"];
  }

  private missingProfileHints(profile: LocalProfile) {
    const missing: string[] = [];
    if (!profile.animal) missing.push("tür");
    if (!profile.age && !profile.lifeStage) missing.push("yaş");
    if (!profile.weightKg && profile.animal === "kopek") missing.push("kilo/ırk boyutu");
    if (!profile.budget) missing.push("bütçe");
    if (!profile.need) missing.push("ürün tipi");
    return missing.length ? missing.join(", ") : "";
  }

  private animalLabel(animal: Animal) {
    const labels: Record<Animal, string> = {
      kedi: "kedi",
      kopek: "köpek",
      kus: "kuş",
      akvaryum: "akvaryum/balık",
      kemirgen: "kemirgen"
    };
    return labels[animal];
  }

  private detectUnsupportedAnimal(text: string) {
    const matches: Array<[string, string[]]> = [
      ["kaplumbağa", ["kaplumbaga"]],
      ["kirpi", ["kirpi"]],
      ["iguana", ["iguana"]],
      ["yılan", ["yilan"]],
      ["gelincik", ["gelincik", "ferret"]]
    ];

    return matches.find(([, terms]) => this.hasAny(text, terms))?.[0];
  }

  private unsupportedAnimalAnswer(animal: string) {
    return [
      "\u{1F98E} " + animal + " için genel yönlendirme yapabilirim.",
      "Mevcut katalog yapısı daha çok kedi, köpek, kuş, akvaryum ve kemirgen tarafına odaklı; bu nedenle egzotik türlerde kesin ürün eşleşmesi yerine güvenli genel bilgi vermek daha doğru olur.",
      "",
      "\u{1F4CC} En faydalı ilerleme şekli",
      "- Türü ve yaş dönemini yazın.",
      "- Mama, yaşam alanı, ısı, UV, altlık veya genel bakım tarafında neye ihtiyacınız olduğunu belirtin.",
      "- İştahsızlık, halsizlik, nefes sorunu veya yara gibi belirti varsa bunu baştan ekleyin.",
      "",
      "\u{1F4AC} İsterseniz " + animal + " için başlangıç listesi veya temel bakım kontrol listesi çıkarayım."
    ].join("\n");
  }

  private lifeStageFromAge(age: number, unit: "ay" | "yil", animal?: Animal): LifeStage {
    const months = unit === "ay" ? age : age * 12;
    if (months < 12) return "yavru";
    if (animal === "kopek" && months >= 96) return "senior";
    if (animal === "kedi" && months >= 132) return "senior";
    if (!animal && months >= 96) return "senior";
    return "yetiskin";
  }

  private extractTerms(text: string) {
    return Array.from(new Set(text.split(/[^a-z0-9]+/).filter((term) => term.length >= 3 && !stopWords.has(term))));
  }

  private extractBudget(text: string) {
    const amount = "(\\d{1,3}(?:[.\\s]\\d{3})+|\\d{1,6}(?:[,.]\\d+)?)";
    const patterns = [
      new RegExp(amount + "\\s*(?:tl|lira)(?:m|lik)?\\b"),
      new RegExp("(?:butcem?|butce|en fazla|maksimum|max|ust sinir)\\D{0,12}" + amount),
      new RegExp(amount + "\\s*(?:tl|lira)?\\s*['’]?(?:den|dan)?\\s*(?:az|alti|altinda|gecmesin)\\b"),
      new RegExp(amount + "\\s*(?:tl|lira)?\\s*['’]?(?:ye|e|ya|a)?\\s*kadar\\b"),
      new RegExp(amount + "\\s*(?:tl|lira)?\\s*['’]?u?\\s*gecmesin\\b")
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (!match) continue;
      const value = this.toNumber(match[1]);
      if (Number.isFinite(value) && value > 0) return value;
    }
    return undefined;
  }

  private hasProfileDetails(profile: LocalProfile) {
    return Boolean(
      profile.animal ||
        profile.age !== undefined ||
        profile.weightKg ||
        profile.breed ||
        profile.sterilized !== undefined ||
        profile.budget ||
        profile.grain
    );
  }

  private isSterilizedProduct(productText: string) {
    return this.hasAny(productText, ["sterilised", "sterilized", "kisir", "kisirlastirilmis"]);
  }

  private priceForSort(product: Product, direction: "asc" | "desc") {
    if (product.price > 0) return product.price;
    return direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  }

  private priceLabel(product: Product) {
    return product.price > 0 ? formatPrice(product.price) : "Fiyat için mağazayla iletişime geçin";
  }

  private toNumber(value: string) {
    const compact = value.replace(/\s/g, "");
    if (/^\d{1,3}(?:\.\d{3})+$/.test(compact)) return Number(compact.replace(/\./g, ""));
    return Number(compact.replace(",", "."));
  }

  private hasWord(text: string, word: string) {
    return new RegExp(`(^|\\s)${normalizeTerm(word)}($|\\s)`).test(text);
  }

  private hasPhrase(text: string, phrase: string) {
    const normalized = normalizeTerm(phrase)
      .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      .replace(/\s+/g, "\\s+");
    return new RegExp(`(^|\\b)${normalized}(?=$|\\b)`).test(text);
  }

  private compactText(value: string) {
    return normalizeTerm(value).replace(/[^a-z0-9]+/g, "");
  }

  private brandMentioned(text: string, brand: string) {
    const normalizedBrand = normalizeTerm(brand).replace(/[^a-z0-9\s]+/g, " ").replace(/\s+/g, " ").trim();
    const compactBrand = this.compactText(brand);
    const compactMatch = compactBrand.length >= 4 ? this.compactText(text).includes(compactBrand) : false;
    const firstToken = normalizedBrand.split(" ")[0];
    const firstTokenMatch = firstToken && firstToken.length >= 4 ? this.hasPhrase(text, firstToken) : false;
    return this.hasPhrase(text, normalizedBrand) || compactMatch || firstTokenMatch;
  }

  private isAvailabilityQuestion(text: string, profile: LocalProfile) {
    const availabilityTerms = [
      "stok",
      "var mi",
      "magazada",
      "gelip al",
      "hemen al",
      "internette",
      "ne zaman gelir",
      "ayni gun al",
      "rezerve",
      "ayirt"
    ];

    return Boolean(
      this.hasAny(text, availabilityTerms) &&
        (profile.brand || this.hasAny(text, ["magazada var mi", "hemen alabilir miyim", "gelip alabilir miyim", "internette var mi"]))
    );
  }

  private availabilityAnswer(text: string, profile: LocalProfile) {
    const brandLine = profile.brand ? `${profile.brand} icin` : "Bu urun icin";
    const pickupLine = this.hasAny(text, ["gelip al", "hemen al", "magazada"]) ? "- Magazaya ugrama saatinizi da ekleyin." : "";
    const lines = [
      "\u{1F4E6} Stok ve hazirlik destegi",
      `${brandLine} canli stok kilidini bu ekrandan acamam; en hizli ve guvenli yol WhatsApp veya telefonla anlik teyit gecmektir.`,
      "",
      "Hizli teyit icin",
      "- Urunun tam adini veya markasini yazin.",
      "- Varsa gramajini ve kac adet istediginizi ekleyin.",
      pickupLine,
      "",
      `WhatsApp: +${storeInfo.whatsapp}`,
      `Telefon: ${storeInfo.phone}`,
      "",
      "\u{1F4AC} Isterseniz gondereceginiz kisa stok teyidi mesajini sizin icin hazirlayayim."
    ].filter(Boolean);

    return lines.join("\n");
  }

  private hasAny(text: string, terms: string[]) {
    return terms.some((term) => text.includes(normalizeTerm(term)) || text.includes(term));
  }
}



