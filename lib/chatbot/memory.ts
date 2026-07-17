import type { PetProfile } from "./types";

const memory = new Map<string, PetProfile>();

export function getMemory(userId: string): PetProfile {

    if(!memory.has(userId)){

        memory.set(userId,{
            symptoms:[],
            interests:[]
        });

    }

    return memory.get(userId)!;

}

export function saveMemory(userId:string, profile:PetProfile){

    const current=getMemory(userId);

    memory.set(userId,{

        ...current,

        ...profile,

        symptoms:[
            ...new Set([
                ...current.symptoms,
                ...profile.symptoms
            ])
        ],

        interests:[
            ...new Set([
                ...current.interests,
                ...profile.interests
            ])
        ]

    });

}

export function clearMemory(userId:string){

    memory.delete(userId);

}
