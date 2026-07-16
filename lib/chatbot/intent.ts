export type Intent =
  | "greeting"
  | "smalltalk"
  | "thanks"
  | "goodbye"
  | "recommendation"
  | "health"
  | "shopping"
  | "price"
  | "pet_info"
  | "unknown";

export function detectIntent(message: string): Intent {
  const text = message.toLowerCase();

  // Selamlaşma
  if (
    text.includes("merhaba") ||
    text.includes("selam") ||
    text.includes("günaydın") ||
    text.includes("iyi akşamlar")
  ) {
    return "greeting";
  }

  // Hal hatır
  if (
    text.includes("nasılsın") ||
    text.includes("iyi misin") ||
    text.includes("napıyorsun")
  ) {
    return "smalltalk";
  }

  // Teşekkür
  if (
    text.includes("teşekkür") ||
    text.includes("sağ ol") ||
    text.includes("eyvallah")
  ) {
    return "thanks";
  }

  // Vedalaşma
  if (
    text.includes("görüşürüz") ||
    text.includes("hoşçakal") ||
    text.includes("bye")
  ) {
    return "goodbye";
  }

  // Sağlık
  if (
    text.includes("kus") ||
    text.includes("ishal") ||
    text.includes("kaşıntı") ||
    text.includes("tüy") ||
    text.includes("iştahsız")
  ) {
    return "health";
  }

  // Ürün önerisi
  if (
    text.includes("öner") ||
    text.includes("mama") ||
    text.includes("hangi mama") ||
    text.includes("tavsiye")
  ) {
    return "recommendation";
  }

  // Fiyat
  if (
    text.includes("kaç tl") ||
    text.includes("fiyat") ||
    text.includes("ne kadar")
  ) {
    return "price";
  }

  // Pet bilgisi
  if (
    text.includes("kedim") ||
    text.includes("köpeğim") ||
    text.includes("kopegim") ||
    text.includes("yaşında") ||
    text.includes("kg")
  ) {
    return "pet_info";
  }

  return "unknown";
}