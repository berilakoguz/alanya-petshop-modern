export type AnimalType =
  | "kedi"
  | "kopek";

export type Gender =
  | "erkek"
  | "disi";

export type GrainPreference =
  | "tahilsiz"
  | "dusuk-tahilli"
  | "normal";

export type ProductInterest =
  | "mama"
  | "yas-mama"
  | "odul"
  | "oyuncak"
  | "vitamin"
  | "kum"
  | "tasma"
  | "bakim";

export interface PetProfile {

  animal?: AnimalType;

  age?: number;

  weight?: number;

  gender?: Gender;

  sterilized?: boolean;

  breed?: string;

  grain?: GrainPreference;

  budget?: number;

  lifeStage?: "yavru" | "yetiskin" | "senior";

  symptoms:string[];

  interests:ProductInterest[];

}

export interface ChatMemory{

  profile:PetProfile;

  currentQuestion?:
    | "animal"
    | "age"
    | "weight"
    | "sterilized"
    | "grain"
    | "budget"
    | "interest"
    | "complete";

}

export interface ProductScore{

  id:string;

  score:number;

}

export type Intent=

| "greeting"

| "smalltalk"

| "recommendation"

| "health"

| "thanks"

| "goodbye"

| "price"

| "shopping"

| "petinfo"

| "unknown";