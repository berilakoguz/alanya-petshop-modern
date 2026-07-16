export type KnowledgeItem = {

    keywords:string[];

    answer:string;

    priority:number;

};

export const knowledge:KnowledgeItem[]=[

{

keywords:[

"merhaba",
"selam",
"iyi günler",
"iyi aksamlar",
"günaydın"

],

priority:100,

answer:
`🐾 Merhaba 😊

Pozitif Petshop AI Asistanına hoş geldiniz.

Size;

🐶 Köpek mamaları

🐱 Kedi mamaları

💊 Vitaminler

🦴 Ödül mamaları

🧸 Oyuncaklar

🪮 Bakım ürünleri

hakkında yardımcı olabilirim.

Evcil dostunuz hakkında biraz bilgi verirseniz size en uygun ürünleri önerebilirim.`

},

{

keywords:[

"teşekkür",
"tesekkur"

],

priority:90,

answer:
`Rica ederim 😊

Başka bir konuda da yardımcı olmamı isterseniz her zaman buradayım.`

},

{

keywords:[

"görüşürüz",
"gorusuruz",
"hoşçakal",
"hoscakal"

],

priority:90,

answer:
`Sağlıklı günler dilerim. 🐾

Pozitif Petshop'u tekrar ziyaret etmeyi unutmayın 😊`

},

{

keywords:[

"tüy döküyor",
"tuy dokuyor",
"tüy dökme",
"tuy dokme"

],

priority:95,

answer:
`🐱 Tüy dökülmesi mevsimsel olabilir.

Fakat;

• Kalitesiz mama

• Omega 3 eksikliği

• Stres

• Parazit

gibi nedenlerden de kaynaklanabilir.

Omega 3 bakımından zengin mamaları tercih etmenizi öneririm.`

},

{

keywords:[

"kusuyor",
"kusma"

],

priority:95,

answer:
`⚠️ Kusma uzun sürüyorsa mutlaka veteriner kontrolü gerekir.

Tek seferlik kusmalarda;

• 8-12 saat mama vermemek

• Temiz su bulundurmak

• Daha sonra hassas mide mamasına geçmek

faydalı olabilir.`

},

{

keywords:[

"ishal"

],

priority:95,

answer:
`İshal birkaç günden uzun sürüyorsa veteriner kontrolü önerilir.

Bu süreçte;

• Bol su

• Hafif sindirilebilir mama

• Ani mama değişiminden kaçınma

önemlidir.`

},

{

keywords:[

"aşı",
"asi"

],

priority:90,

answer:
`🐶 Düzenli aşılar evcil dostunuzun sağlığı için oldukça önemlidir.

Aşı takvimi yaşına göre değişeceği için veteriner hekiminizin programını takip etmenizi öneririm.`

},

{

keywords:[

"ödül",
"odul"

],

priority:80,

answer:
`🦴 Ödül mamaları eğitim sırasında kullanılmalıdır.

Günlük kalorinin yaklaşık %10'unu geçmemesine dikkat edilmelidir.`

},

{

keywords:[

"oyuncak"

],

priority:80,

answer:
`🧸 Oyuncaklar hem fiziksel hem zihinsel gelişim için önemlidir.

Irkına ve yaşına uygun oyuncak seçmenizi öneririm.`

},

{

keywords:[

"vitamin"

],

priority:80,

answer:
`💊 Vitamin kullanımı mutlaka ihtiyaca göre olmalıdır.

Gereksiz vitamin kullanımı faydadan çok zarar verebilir.`

}

];
export function searchKnowledge(message:string){

const text=message.toLowerCase();

let best=null;

for(const item of knowledge){

let score=0;

item.keywords.forEach(keyword=>{

if(text.includes(keyword))

score++;

});

if(score>0){

if(!best){

best={

...item,

score

};

continue;

}

if(score>best.score){

best={

...item,

score

};

}

}

}

return best;
}