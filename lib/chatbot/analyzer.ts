export type PetProfile = {
  animal?: "kedi" | "kopek";
  age?: number;
  weight?: number;
  sterilized?: boolean;
  gender?: "erkek" | "disi";
  breed?: string;
  grain?: "tahilsiz" | "dusuk-tahilli" | "normal";
  budget?: number;
  puppy?: boolean;
  kitten?: boolean;
  symptoms: string[];
  interests: string[];
};

export function analyzeMessage(message: string): PetProfile {

    const text = message.toLowerCase();

    const pet: PetProfile = {

        symptoms: [],
        interests: []

    };

    //-------------------
    // Tür
    //-------------------

    if(text.includes("kedi"))
        pet.animal="kedi";

    if(
        text.includes("köpek") ||
        text.includes("kopek") ||
        text.includes("dog")
    )
        pet.animal="kopek";

    //-------------------
    // Yaş
    //-------------------

    const age=text.match(/(\d+)\s*yaş/);

    if(age){

        pet.age=Number(age[1]);

        if(pet.animal=="kedi"){

            if(pet.age<1)
                pet.kitten=true;

        }

        if(pet.animal=="kopek"){

            if(pet.age<1)
                pet.puppy=true;

        }

    }

    //-------------------
    // Kilo
    //-------------------

    const weight=text.match(/(\d+)\s*kg/);

    if(weight){

        pet.weight=Number(weight[1]);

    }
//-------------------
// Kısır Durumu
//-------------------

if (
        text.includes("evet") ||
    text.includes("Evet") ||
    text.includes("aynen") ||
    text.includes("Aynen") ||
    text.includes("kısır") ||
    text.includes("kisir") ||
    text.includes("sterilised") ||
    text.includes("sterilized")
) {
    pet.sterilized = true;
}

if (
    text.includes("hayır") ||
    text.includes("hayir") ||
    text.includes("değil") ||
    text.includes("degil") ||
    text === "hayır" ||
    text === "hayir" ||
    text === "hayır." ||
    text === "hayir." ||
    text === "yok"
) {
    pet.sterilized = false;
}

    //-------------------
    // Cinsiyet
    //-------------------

    if(text.includes("erkek"))
        pet.gender="erkek";

    if(

        text.includes("dişi") ||
        text.includes("disi")

    )

        pet.gender="disi";

    //-------------------
    // Tahıl
    //-------------------

    if(text.includes("tahılsız") || text.includes("tahilsiz"))
        pet.grain="tahilsiz";

    if(text.includes("düşük tahıllı") || text.includes("dusuk tahilli"))
        pet.grain="dusuk-tahilli";

    //-------------------
    // Bütçe
    //-------------------

    const budget=text.match(/(\d+)\s*tl/);

    if(budget){

        pet.budget=Number(budget[1]);

    }

    //-------------------
    // Irklar
    //-------------------

    const breeds=[

        "golden",
        "labrador",
        "husky",
        "pomeranian",
        "maltese",
        "chihuahua",
        "akita",
        "doberman",
        "rottweiler",
        "british",
        "scottish",
        "tekir",
        "iran",
        "van",
        "ankara"

    ];

    breeds.forEach(b=>{

        if(text.includes(b))

            pet.breed=b;

    });

    //-------------------
    // Belirtiler
    //-------------------

    const symptoms=[

        "kusma",
        "ishal",
        "tüy dök",
        "tuy dok",
        "kaşıntı",
        "kasinti",
        "iştahsız",
        "istahsiz",
        "alerji",
        "kabız",
        "kabiz"

    ];

    symptoms.forEach(s=>{

        if(text.includes(s))

            pet.symptoms.push(s);

    });

    //-------------------
    // İlgi Alanı
    //-------------------

    const interests=[

        "mama",
        "ödül",
        "odul",
        "oyuncak",
        "kum",
        "tasma",
        "vitamin",
        "konserve",
        "yaş mama",
        "yas mama"

    ];

    interests.forEach(i=>{

        if(text.includes(i))

            pet.interests.push(i);

    });

    return pet;

}