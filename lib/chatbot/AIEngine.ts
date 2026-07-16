import { ProductSearchEngine } from "./ProductSearchEngine";
import { ProductRecommendationEngine } from "./ProductRecommendationEngine";
import { ConversationManager } from "./ConversationManager";
import { detectIntent } from "./intent";
import { filterProducts } from "./filters";
import { scoreProducts } from "./scorer";
import { searchKnowledge } from "./knowledge";
import { getMemory, saveMemory } from "./memory";
import type { Intent, PetProfile } from "./types";

export class AIEngine {

    constructor(private userId: string) {}

    public reply(message: string): string {
        //--------------------------------
// Direkt Ürün Arama
//--------------------------------

const searchEngine = new ProductSearchEngine();

const foundProducts = searchEngine.search(message);

if (foundProducts.length > 0) {

    return this.replyProducts(
        getMemory(this.userId),
        foundProducts
    );

}

        //-----------------------------
        // Intent Analizi
        //-----------------------------

        const intent = detectIntent(message);

        switch(intent){

            case "greeting":
                return this.replyGreeting();

            case "smalltalk":
                return this.replySmallTalk();

            case "thanks":
                return this.replyThanks();

            case "goodbye":
                return this.replyGoodbye();

            case "health":
                return this.replyHealth(message);

        }

        //---------------------------------------------
// Sohbet Yöneticisi
//---------------------------------------------

const manager = new ConversationManager(this.userId);

const profile = manager.update(message);

if (!manager.completed(profile)) {

    return manager.nextQuestion(profile);

}

//---------------------------------------------
// Hafızadaki son profil
//---------------------------------------------

const memory = getMemory(this.userId);

        //-----------------------------
        // Ürün Önerisi
        //-----------------------------

       const engine = new ProductRecommendationEngine();

const recommendations = engine.recommend(memory);

return this.replyProducts(memory, recommendations);

    }

    //--------------------------------
    // SELAM
    //--------------------------------

    private replyGreeting(){

        return `🐾 Merhaba 😊

Ben Pozitif Petshop AI Asistanıyım.

Size;

🐶 Mama önerileri

🐱 Bakım tavsiyeleri

💊 Vitamin desteği

🦴 Ödül mamaları

🧸 Oyuncak önerileri

🩺 Genel sağlık bilgileri

konularında yardımcı olabilirim.

Evcil dostunuz hakkında biraz bilgi verir misiniz?`;

    }

    //--------------------------------
    // SMALL TALK
    //--------------------------------

    private replySmallTalk(){

        return `😊 İyiyim, teşekkür ederim.

Bugün patili dostunuz için nasıl yardımcı olabilirim?`;

    }

    //--------------------------------
    // TEŞEKKÜR
    //--------------------------------

    private replyThanks(){

        return `🐾 Rica ederim.

Başka merak ettiğiniz bir konu varsa sormaktan çekinmeyin 😊`;

    }

    //--------------------------------
    // GÖRÜŞÜRÜZ
    //--------------------------------

    private replyGoodbye(){

        return `🐾 Görüşmek üzere.

Sağlıklı günler dilerim.`;

    }

    //--------------------------------
    // SAĞLIK
    //--------------------------------

    private replyHealth(message:string){

        const info = searchKnowledge(message);

        if(info){

            return info.answer;

        }

        return `Bu konuda kesin tanı koyamam.

Belirtiler devam ediyorsa mutlaka veteriner hekiminize danışmanızı öneririm.`;

    }
        //--------------------------------
    // SORU SOR
    //--------------------------------

    private askQuestion(step: string): string {

        switch (step) {

            case "animal":

                return `🐾 Öncelikle evcil dostunuzun türünü öğrenebilir miyim?

🐱 Kedi

🐶 Köpek`;

            case "age":

                return `🎂 Harika.

Kaç yaşında?`;

            case "weight":

                return `⚖️ Yaklaşık kaç kilo?`;

            case "sterilized":

                return `✂️ Kısırlaştırıldı mı?

(Evet / Hayır)`;

            case "grain":

                return `🌾 Tahılsız mama tercih ediyor musunuz?

(Evet / Hayır)`;

            case "budget":

                return `💰 Yaklaşık bütçeniz nedir?

Örneğin:

• 1000 TL

• 1500 TL

• 2500 TL`;

        }

        return "";
    }

    //--------------------------------
    // ÜRÜN CEVABI
    //--------------------------------

    private replyProducts(profile: PetProfile, products: any[]): string {

        if (products.length === 0) {

            return `😔 Size uygun ürün bulamadım.

Biraz daha ayrıntı verebilir misiniz?`;

        }

        let text = "";

        text += "🐾 Analiz tamamlandı.\n\n";

        text += "Evcil dostunuz için en uygun ürünleri seçtim.\n\n";

        //--------------------------------
        // İlk 3 ürün
        //--------------------------------

        products
            .slice(0, 3)
            .forEach((product, index) => {

                text += "━━━━━━━━━━━━━━━━━━━━━━\n";

                text += `🥇 ${index + 1}. ${product.name}\n\n`;

                text += `🏷️ Marka : ${product.brand}\n`;

                text += `💰 Fiyat : ${product.price} TL\n`;

                if (product.rating) {

                    text += `⭐ Puan : ${product.rating}\n`;

                }

                if (product.stock) {

                    text += `📦 ${product.stock}\n`;

                }

                text += "\n";

                text += this.buildReason(profile, product);

                text += "\n\n";

            });

        text += "💬 Farklı bütçe, farklı marka veya başka ihtiyaçlarınız varsa bana yazabilirsiniz.";

        return text;

    }

    //--------------------------------
    // NEDEN ÖNERDİ?
    //--------------------------------

    private buildReason(profile: PetProfile, product: any): string {

        let reason = "Bu ürünü seçme nedenim:\n";

        const search = (
            product.name +
            " " +
            product.description
        ).toLowerCase();

        if (profile.animal) {

            reason += `• ${profile.animal === "kedi" ? "Kediniz" : "Köpeğiniz"} için uygun\n`;

        }

        if (profile.lifeStage) {

            reason += `• ${profile.lifeStage} dönemine uygun\n`;

        }

        if (profile.sterilized) {

            if (
                search.includes("sterilised") ||
                search.includes("sterilized") ||
                search.includes("kısır") ||
                search.includes("kisir")
            ) {

                reason += "• Kısırlaştırılmış dostlar için uygun\n";

            }

        }

        if (profile.grain === "tahilsiz") {

            if (
                search.includes("tahılsız") ||
                search.includes("tahilsiz")
            ) {

                reason += "• Tahılsız formül\n";

            }

        }

        if (profile.budget) {

            if (product.price <= profile.budget) {

                reason += "• Bütçenize uygun\n";

            }

        }

        return reason;

    }
        //--------------------------------
    // ÜRÜNLERİ SIRALA
    //--------------------------------

    private sortProducts(products: any[]) {

        return [...products].sort((a, b) => {

            if (b.score !== a.score) {
                return b.score - a.score;
            }

            if ((b.rating ?? 0) !== (a.rating ?? 0)) {
                return (b.rating ?? 0) - (a.rating ?? 0);
            }

            return (a.price ?? 0) - (b.price ?? 0);

        });

    }

    //--------------------------------
    // ALTERNATİF ÜRÜNLER
    //--------------------------------

    private buildAlternatives(products: any[]): string {

        if (products.length <= 3) {

            return "";

        }

        let text = "\n\n🔄 Diğer alternatifler\n\n";

        products
            .slice(3, 6)
            .forEach((product) => {

                text += `• ${product.name}\n`;

            });

        return text;

    }

    //--------------------------------
    // PROFİL ÖZETİ
    //--------------------------------

    private buildProfile(profile: PetProfile): string {

        let text = "📋 Analiz\n\n";

        if (profile.animal) {

            text += `🐾 Tür : ${profile.animal}\n`;

        }

        if (profile.age !== undefined) {

            text += `🎂 Yaş : ${profile.age}\n`;

        }

        if (profile.weight !== undefined) {

            text += `⚖️ Kilo : ${profile.weight} kg\n`;

        }

        if (profile.sterilized !== undefined) {

            text += `✂️ Kısır : ${profile.sterilized ? "Evet" : "Hayır"}\n`;

        }

        if (profile.grain) {

            text += `🌾 Tahıl : ${profile.grain}\n`;

        }

        if (profile.budget) {

            text += `💰 Bütçe : ${profile.budget} TL\n`;

        }

        return text;

    }

    //--------------------------------
    // KAPANIŞ
    //--------------------------------

    private buildFooter(): string {

        return `

━━━━━━━━━━━━━━━━━━━━━━

💬 İsterseniz;

• Daha ekonomik ürünler

• Premium ürünler

• Aynı ürünün farklı kilogramları

• Benzer mamalar

• Vitamin önerileri

• Ödül mamaları

hakkında da yardımcı olabilirim.`;

    }

}