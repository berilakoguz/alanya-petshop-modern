import type { Product } from "@/data/site";

export type LifeStage = "yavru" | "yetiskin" | "senior" | "belirsiz";
export type BreedSize = "kucuk" | "orta-buyuk" | "tum" | "belirsiz";
export type GrainPreference = "tahilsiz" | "dusuk-tahilli" | "tahilli" | "belirsiz";
export type ProductSpecies = "kedi" | "kopek";
export type AgeUnit = "ay" | "yil";
export type PackageWeightBucket = "mini" | "small" | "medium" | "large" | "belirsiz";

export type ProductProfile = {
  lifeStage: LifeStage;
  breedSize: BreedSize;
  grainPreference: GrainPreference;
  proteinPercent?: number;
  packageWeightKg?: number;
  isFood: boolean;
};

export type PetAssistantInput = {
  species: ProductSpecies;
  breed: string;
  ageValue: number;
  ageUnit: AgeUnit;
  weightKg: number;
  grainPreference: GrainPreference | "all";
  maxPrice?: number;
};

export type ProductRecommendation = {
  product: Product;
  score: number;
  reasons: string[];
};

export const lifeStageLabels: Record<LifeStage, string> = {
  yavru: "Yavru",
  yetiskin: "Yetişkin",
  senior: "Senior",
  belirsiz: "Yaş bilgisi yok"
};

export const breedSizeLabels: Record<BreedSize, string> = {
  kucuk: "Küçük ırk",
  "orta-buyuk": "Orta/Büyük ırk",
  tum: "Tüm ırklar",
  belirsiz: "Irk bilgisi yok"
};

export const grainPreferenceLabels: Record<GrainPreference, string> = {
  tahilsiz: "Tahılsız",
  "dusuk-tahilli": "Düşük tahıllı",
  tahilli: "Tahıllı",
  belirsiz: "Tahıl bilgisi yok"
};

export const packageWeightLabels: Record<PackageWeightBucket, string> = {
  mini: "500 gr altı",
  small: "500 gr - 2 kg",
  medium: "2 - 5 kg",
  large: "5 kg üzeri",
  belirsiz: "Kilo bilgisi yok"
};

export function normalizeTerm(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

export function getProductProfile(product: Product): ProductProfile {
  const text = getProductSearchText(product);
  const lifeStage = inferLifeStage(text);
  const breedSize = inferBreedSize(product, text);
  const grainPreference = inferGrainPreference(text);
  const proteinPercent = extractProteinPercent(`${product.name} ${product.description}`);
  const packageWeightKg = extractPackageWeight(product);
  const isFood = inferFoodProduct(product, text);

  return {
    lifeStage,
    breedSize,
    grainPreference,
    proteinPercent,
    packageWeightKg,
    isFood
  };
}

export function getProductSearchText(product: Product) {
  return normalizeTerm(`${product.name} ${product.brand} ${product.description}`);
}

export function getPackageWeightBucket(weightKg?: number): PackageWeightBucket {
  if (!weightKg) return "belirsiz";
  if (weightKg < 0.5) return "mini";
  if (weightKg <= 2) return "small";
  if (weightKg <= 5) return "medium";
  return "large";
}

export function matchesPackageWeightBucket(weightKg: number | undefined, bucket: PackageWeightBucket | "all") {
  if (bucket === "all") return true;
  return getPackageWeightBucket(weightKg) === bucket;
}

export function inferPetLifeStage(species: ProductSpecies, ageValue: number, ageUnit: AgeUnit, weightKg: number): LifeStage {
  const safeAge = Number.isFinite(ageValue) ? Math.max(ageValue, 0) : 0;
  const ageInMonths = ageUnit === "yil" ? safeAge * 12 : safeAge;

  if (ageInMonths <= 0) return "belirsiz";
  if (ageInMonths < 12) return "yavru";

  if (species === "kopek") {
    const seniorThreshold = weightKg >= 25 ? 72 : 96;
    return ageInMonths >= seniorThreshold ? "senior" : "yetiskin";
  }

  return ageInMonths >= 132 ? "senior" : "yetiskin";
}

export function inferBreedSizeFromInput(species: ProductSpecies, breed: string, weightKg: number): BreedSize {
  if (species !== "kopek") return "tum";

  const normalizedBreed = normalizeTerm(breed);
  const smallBreeds = ["chihuahua", "yorkshire", "pomeranian", "maltese", "pinscher", "toy", "mini", "kucuk"];
  const largeBreeds = ["golden", "labrador", "husky", "alman", "rottweiler", "doberman", "kangal", "akita", "samoyed", "buyuk"];

  if (smallBreeds.some((term) => normalizedBreed.includes(term)) || (weightKg > 0 && weightKg <= 10)) {
    return "kucuk";
  }

  if (largeBreeds.some((term) => normalizedBreed.includes(term)) || weightKg >= 22) {
    return "orta-buyuk";
  }

  return "tum";
}

export function recommendProductsForPet(products: Product[], input: PetAssistantInput, limit = 3): ProductRecommendation[] {
  const targetLifeStage = inferPetLifeStage(input.species, input.ageValue, input.ageUnit, input.weightKg);
  const targetBreedSize = inferBreedSizeFromInput(input.species, input.breed, input.weightKg);

  return products
    .map((product) => scoreProduct(product, input, targetLifeStage, targetBreedSize))
    .filter((recommendation) => recommendation.score > 0)
    .sort((first, second) => second.score - first.score || first.product.price - second.product.price)
    .slice(0, limit);
}

function scoreProduct(
  product: Product,
  input: PetAssistantInput,
  targetLifeStage: LifeStage,
  targetBreedSize: BreedSize
): ProductRecommendation {
  const profile = getProductProfile(product);

  if (product.category !== input.species || !profile.isFood) {
    return { product, score: -100, reasons: [] };
  }

  const reasons: string[] = [];
  let score = product.rating * 2;

  if (targetLifeStage !== "belirsiz" && profile.lifeStage === targetLifeStage) {
    score += 34;
    reasons.push(`${lifeStageLabels[targetLifeStage]} yaşa uygun`);
  } else if (profile.lifeStage === "belirsiz") {
    score += 8;
    reasons.push("Genel beslenme seçeneği");
  } else if (targetLifeStage !== "belirsiz") {
    score -= 14;
  }

  if (input.species === "kopek") {
    if (targetBreedSize !== "tum" && profile.breedSize === targetBreedSize) {
      score += 24;
      reasons.push(breedSizeLabels[targetBreedSize]);
    } else if (profile.breedSize === "tum") {
      score += 7;
      reasons.push("Irk geneline uygun");
    } else if (targetBreedSize !== "tum") {
      score -= 10;
    }
  }

  if (input.grainPreference !== "all") {
    if (profile.grainPreference === input.grainPreference) {
      score += 18;
      reasons.push(grainPreferenceLabels[input.grainPreference]);
    } else if (profile.grainPreference === "belirsiz") {
      score += 2;
    } else {
      score -= 20;
    }
  }

  if (profile.proteinPercent) {
    if (targetLifeStage === "yavru" && profile.proteinPercent >= 36) score += 10;
    if (targetLifeStage === "yetiskin" && profile.proteinPercent >= 30) score += 8;
    if (targetLifeStage === "senior" && profile.proteinPercent >= 28) score += 6;
    reasons.push(`%${profile.proteinPercent} protein`);
  }

  if (input.maxPrice && input.maxPrice > 0) {
    if (product.price > 0 && product.price <= input.maxPrice) {
      score += 12;
      reasons.push("Bütçeye uygun");
    } else {
      score -= 26;
    }
  }

  if (product.price <= 0) score -= 8;

  return { product, score, reasons: reasons.slice(0, 4) };
}

function inferLifeStage(text: string): LifeStage {
  if (hasAny(text, ["yavru", "puppy", "kitten", "junior"])) return "yavru";
  if (hasAny(text, ["senior", "yasli", "7+"])) return "senior";
  if (hasAny(text, ["yetiskin", "adult", "sterilised", "sterilized", "kisir", "kisirlastirilmis"])) return "yetiskin";
  return "belirsiz";
}

function inferBreedSize(product: Product, text: string): BreedSize {
  if (product.category !== "kopek") return "tum";
  if (hasAny(text, ["kucuk irk", "mini", "small breed"])) return "kucuk";
  if (hasAny(text, ["orta ve buyuk", "orta buyuk", "buyuk irk", "maxi", "medium", "large"])) return "orta-buyuk";
  return "tum";
}

function inferGrainPreference(text: string): GrainPreference {
  if (hasAny(text, ["dusuk tahilli", "dusuk tahil", "low grain", "low ancestral grain"])) return "dusuk-tahilli";
  if (hasAny(text, ["tahilsiz", "grain free", "no grain"])) return "tahilsiz";
  if (hasAny(text, ["tahilli", "tahil", "spelt"])) return "tahilli";
  return "belirsiz";
}

function inferFoodProduct(product: Product, text: string) {
  const foodTerms = ["mama", "konserve", "yem", "flakes", "kracker", "odul", "corba", "vitaldrink"];
  const nonFoodTerms = ["su pinari", "tasma", "bakim", "filtre", "dekor"];
  return hasAny(text, foodTerms) && !hasAny(text, nonFoodTerms) && product.category !== "bakim";
}

function extractProteinPercent(value: string) {
  const match = value.match(/protein\s*%?\s*([0-9]+(?:[,.][0-9]+)?)/i);
  return match ? parseLocaleNumber(match[1]) : undefined;
}

function extractPackageWeight(product: Product) {
  const nameWeight = extractWeights(product.name)[0];
  if (nameWeight) return nameWeight;
  return extractWeights(product.description)[0];
}

function extractWeights(value: string) {
  const matches = Array.from(value.matchAll(/([0-9]+(?:[,.][0-9]+)?)\s*(kg|kilogram|gr|g)(?:\b|\s|$)/gi));
  return matches
    .map((match) => {
      const amount = parseLocaleNumber(match[1]);
      const unit = match[2].toLocaleLowerCase("tr-TR");
      return unit === "kg" || unit === "kilogram" ? amount : amount / 1000;
    })
    .filter((weight) => Number.isFinite(weight) && weight > 0);
}

function parseLocaleNumber(value: string) {
  return Number(value.replace(",", "."));
}

function hasAny(value: string, terms: string[]) {
  return terms.some((term) => value.includes(normalizeTerm(term)));
}
