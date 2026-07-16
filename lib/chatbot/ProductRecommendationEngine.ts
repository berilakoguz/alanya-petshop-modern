import { products } from "@/data/site";
import { PetProfile } from "./types";

export class ProductRecommendationEngine {

    recommend(profile: PetProfile) {

        return products
            .map(product => {

                let score = 0;

                const text = (
                    product.name +
                    " " +
                    product.description +
                    " " +
                    product.brand
                ).toLowerCase();

                //----------------------------------
                // Tür
                //----------------------------------

                if (profile.animal) {

                    if (
                        profile.animal === "kedi" &&
                        product.category === "kedi"
                    ) {
                        score += 100;
                    }

                    if (
                        profile.animal === "kopek" &&
                        product.category === "kopek"
                    ) {
                        score += 100;
                    }

                }

                //----------------------------------
                // Yaş
                //----------------------------------

                if (profile.lifeStage === "yavru") {

                    if (
                        text.includes("yavru") ||
                        text.includes("kitten") ||
                        text.includes("puppy")
                    ) {

                        score += 40;

                    }

                }

                if (profile.lifeStage === "yetiskin") {

                    if (
                        text.includes("adult") ||
                        text.includes("yetişkin") ||
                        text.includes("yetiskin")
                    ) {

                        score += 40;

                    }

                }

                if (profile.lifeStage === "senior") {

                    if (
                        text.includes("senior")
                    ) {

                        score += 40;

                    }

                }

                //----------------------------------
                // Kısır
                //----------------------------------

                if (profile.sterilized === true) {

                    if (
                        text.includes("sterilised") ||
                        text.includes("sterilized") ||
                        text.includes("kısır") ||
                        text.includes("kisir")
                    ) {

                        score += 35;

                    }

                }

                if (profile.sterilized === false) {

                    if (
                        text.includes("sterilised") ||
                        text.includes("sterilized") ||
                        text.includes("kısır") ||
                        text.includes("kisir")
                    ) {

                        score -= 100;

                    }

                }

                //----------------------------------
                // Tahılsız
                //----------------------------------

                if (profile.grain === "tahilsiz") {

                    if (
                        text.includes("tahılsız") ||
                        text.includes("tahilsiz") ||
                        text.includes("grain free")
                    ) {

                        score += 30;

                    }

                }

                //----------------------------------
                // Bütçe
                //----------------------------------

                if (profile.budget) {

                    if (product.price <= profile.budget) {

                        score += 25;

                    } else {

                        score -= 20;

                    }

                }

                //----------------------------------
                // Puan
                //----------------------------------

                score += Math.round((product.rating ?? 0) * 5);

                return {

                    ...product,

                    score

                };

            })

            .sort((a, b) => b.score - a.score);

    }

}