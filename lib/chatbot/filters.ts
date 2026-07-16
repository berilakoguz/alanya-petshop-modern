import { products } from "@/data/site";
import { PetProfile } from "./analyzer";

export function filterProducts(profile: PetProfile) {

    let result = [...products];

    //--------------------------------
    // Tür
    //--------------------------------

    if(profile.animal){

        result=result.filter(product=>{

            return product.category===profile.animal;

        });

    }

    //--------------------------------
    // Bütçe
    //--------------------------------

    if(profile.budget){

        result=result.filter(product=>{

            return product.price<=profile.budget!;

        });

    }

    //--------------------------------
    // Ürün adı eşleşmesi
    //--------------------------------

    if(profile.sterilized){

        const steril=result.filter(product=>{

            return product.name.toLowerCase().includes("sterilised")
                || product.name.toLowerCase().includes("sterilized")
                || product.name.toLowerCase().includes("kısır")
                || product.name.toLowerCase().includes("kisir");

        });

        if(steril.length>0)
            result=steril;

    }

    //--------------------------------
    // Tahılsız
    //--------------------------------

    if(profile.grain=="tahilsiz"){

        const grain=result.filter(product=>{

            return product.description.toLowerCase().includes("tahılsız")
                || product.description.toLowerCase().includes("tahilsiz")
                || product.name.toLowerCase().includes("tahılsız")
                || product.name.toLowerCase().includes("tahilsiz");

        });

        if(grain.length>0)
            result=grain;

    }

    //--------------------------------
    // Yaş
    //--------------------------------

    if(profile.kitten){

        const kitten=result.filter(product=>{

            const text=(product.name+" "+product.description).toLowerCase();

            return text.includes("kitten")
                || text.includes("yavru");

        });

        if(kitten.length>0)
            result=kitten;

    }

    if(profile.puppy){

        const puppy=result.filter(product=>{

            const text=(product.name+" "+product.description).toLowerCase();

            return text.includes("puppy")
                || text.includes("yavru");

        });

        if(puppy.length>0)
            result=puppy;

    }

    //--------------------------------
    // Mama
    //--------------------------------

    if(profile.interests.includes("mama")){

        result=result.filter(product=>{

            return product.category===profile.animal;

        });

    }

    return result;

}