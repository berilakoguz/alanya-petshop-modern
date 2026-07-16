import { getMemory, saveMemory } from "./memory";
import { parseAnswer, ParserState } from "./parser";
import { PetProfile } from "./types";

export class ConversationManager {

    constructor(private userId:string){}

    //-----------------------------------------
    // Profili Güncelle
    //-----------------------------------------

    public update(message:string){

        const memory=getMemory(this.userId);

        const state=this.getCurrentState(memory);

        const profile=parseAnswer(
            message,
            state,
            memory
        );

        saveMemory(this.userId,profile);

        return profile;

    }

    //-----------------------------------------
    // Eksik Bilgi
    //-----------------------------------------

    public getCurrentState(profile:PetProfile):ParserState{

        if(!profile.animal){

            return "animal";

        }

        if(profile.age===undefined){

            return "age";

        }

        if(profile.weight===undefined){

            return "weight";

        }

        if(profile.sterilized===undefined){

            return "sterilized";

        }

        if(!profile.grain){

            return "grain";

        }

        if(!profile.budget){

            return "budget";

        }

        return "interest";

    }

    //-----------------------------------------
    // Tamamlandı mı?
    //-----------------------------------------

    public completed(profile:PetProfile){

        return(

            profile.animal&&

            profile.age!==undefined&&

            profile.weight!==undefined&&

            profile.sterilized!==undefined&&

            profile.grain&&

            profile.budget

        );

    }

    //-----------------------------------------
    // Sonraki Soru
    //-----------------------------------------

    public nextQuestion(profile:PetProfile){

        const step=this.getCurrentState(profile);

        switch(step){

            case "animal":

                return "🐾 Evcil dostunuz kedi mi yoksa köpek mi?";

            case "age":

                return "🎂 Kaç yaşında?";

            case "weight":

                return "⚖️ Yaklaşık kaç kilo?";

            case "sterilized":

                return "✂️ Kısırlaştırıldı mı? (Evet / Hayır)";

            case "grain":

                return "🌾 Tahılsız mama tercih ediyor musunuz?";

            case "budget":

                return "💰 Yaklaşık bütçeniz nedir?";

            case "interest":

                return `🥣 Ne arıyorsunuz?

• Kuru Mama

• Yaş Mama

• Ödül Maması

• Vitamin

• Oyuncak`;

        }

    }

}