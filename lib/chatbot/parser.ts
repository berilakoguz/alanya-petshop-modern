import { PetProfile } from "./types";

export type ParserState =
  | "animal"
  | "age"
  | "weight"
  | "sterilized"
  | "grain"
  | "budget"
  | "interest";

export function parseAnswer(
  answer: string,
  state: ParserState,
  profile: PetProfile
): PetProfile {

  const text = answer.toLowerCase().trim();

  const updated = {
    ...profile,
    symptoms: [...profile.symptoms],
    interests: [...profile.interests],
  };

  switch (state) {

    case "animal":

      if (
        text.includes("kedi")
      ) {
        updated.animal = "kedi";
      }

      if (
        text.includes("köpek") ||
        text.includes("kopek")
      ) {
        updated.animal = "kopek";
      }

      break;

    case "age":

      const age = Number(text);

      if (!isNaN(age)) {

        updated.age = age;

        if (age < 1)
          updated.lifeStage = "yavru";

        else if (age < 8)
          updated.lifeStage = "yetiskin";

        else
          updated.lifeStage = "senior";

      }

      break;

    case "weight":

      const weight = Number(text);

      if (!isNaN(weight)) {

        updated.weight = weight;

      }

      break;

    case "sterilized":

      if (

        text == "evet" ||
        text == "kısır" ||
        text == "kisir"

      ) {

        updated.sterilized = true;

      }

      if (

        text == "hayır" ||
        text == "hayir" ||
        text == "değil" ||
        text == "degil"

      ) {

        updated.sterilized = false;

      }

      break;

    case "grain":

      if (

        text == "evet"

      ) {

        updated.grain = "tahilsiz";

      }

      if (

        text == "hayır"

      ) {

        updated.grain = "normal";

      }

      break;

    case "budget":

      const budget = Number(text);

      if (!isNaN(budget)) {

        updated.budget = budget;

      }

      break;

    case "interest":

      if (
        text.includes("kuru")
      ) {

        updated.interests.push("mama");

      }

      if (
        text.includes("yaş")
      ) {

        updated.interests.push("yas-mama");

      }

      if (
        text.includes("ödül") ||
        text.includes("odul")
      ) {

        updated.interests.push("odul");

      }

      break;

  }

  return updated;

}