import { PetProfile } from "./analyzer";

export function getNextQuestion(profile: PetProfile): string | null {

    if (!profile.animal) {
        return "🐾 Öncelikle evcil dostunuz kedi mi, köpek mi?";
    }

    if (profile.age === undefined) {
        return "🎂 Kaç yaşında?";
    }

    if (profile.weight === undefined) {
        return "⚖️ Yaklaşık kaç kilo?";
    }

    if (profile.sterilized === undefined) {
        return "✂️ Kısırlaştırıldı mı?";
    }

    if (!profile.interests.includes("mama")) {
        return "🥣 Kuru mama mı, yaş mama mı, ödül maması mı arıyorsunuz?";
    }

    return null;
}