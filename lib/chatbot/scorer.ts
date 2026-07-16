import { Product } from "@/data/site";
import { PetProfile } from "./analyzer";

export function scoreProducts(products: Product[], profile: PetProfile) {

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

            //--------------------
            // KISIR
            //--------------------

            if(profile.sterilized){

                if(
                    text.includes("kısır") ||
                    text.includes("kisir") ||
                    text.includes("sterilised") ||
                    text.includes("sterilized")
                ){

                    score += 80;

                }

            }

            //--------------------
            // TAHILSIZ
            //--------------------

            if(profile.grain=="tahilsiz"){

                if(
                    text.includes("tahılsız") ||
                    text.includes("tahilsiz")
                ){

                    score += 60;

                }

            }

            //--------------------
            // DÜŞÜK TAHIL
            //--------------------

            if(profile.grain=="dusuk-tahilli"){

                if(
                    text.includes("düşük tahıllı") ||
                    text.includes("dusuk tahilli")
                ){

                    score += 50;

                }

            }

            //--------------------
            // YAVRU
            //--------------------

            if(profile.kitten || profile.puppy){

                if(
                    text.includes("yavru") ||
                    text.includes("kitten") ||
                    text.includes("puppy")
                ){

                    score += 70;

                }

            }

            //--------------------
            // YETİŞKİN
            //--------------------

            if(profile.age && profile.age>=1){

                if(
                    text.includes("yetişkin") ||
                    text.includes("yetiskin") ||
                    text.includes("adult")
                ){

                    score += 50;

                }

            }

            //--------------------
            // KÜÇÜK IRK
            //--------------------

            if(profile.breed){

                const smallBreeds=[

                    "maltese",
                    "pomeranian",
                    "chihuahua",
                    "yorkshire"

                ];

                if(

                    smallBreeds.includes(profile.breed) &&

                    (

                        text.includes("küçük ırk") ||
                        text.includes("kucuk irk") ||
                        text.includes("mini")

                    )

                ){

                    score += 90;

                }

            }

            //--------------------
            // BÜYÜK IRK
            //--------------------

            if(profile.breed){

                const largeBreeds=[

                    "golden",
                    "labrador",
                    "akita",
                    "rottweiler",
                    "doberman",
                    "husky"

                ];

                if(

                    largeBreeds.includes(profile.breed) &&

                    (

                        text.includes("büyük ırk") ||
                        text.includes("buyuk irk") ||
                        text.includes("medium")
                    )

                ){

                    score += 90;

                }

            }

            //--------------------
            // Protein
            //--------------------

            if(text.includes("kuzu")) score+=10;

            if(text.includes("somon")) score+=10;

            if(text.includes("tavuk")) score+=10;

            if(text.includes("balık")) score+=10;

            if(text.includes("ördek")) score+=10;

            //--------------------
            // Marka Puanı

            if(product.rating>=4.8)
                score+=15;

            //--------------------

            return {

                ...product,

                score

            };

        })

        .sort((a,b)=>b.score-a.score);

}