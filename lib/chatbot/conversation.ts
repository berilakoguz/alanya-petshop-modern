import { getMemory } from "./memory";

export type ConversationStep =
  | "animal"
  | "age"
  | "weight"
  | "sterilized"
  | "grain"
  | "budget"
  | "complete";

export function getConversationStep(userId: string): ConversationStep {
  const memory = getMemory(userId);

  if (!memory.animal) return "animal";

  if (memory.age === undefined) return "age";

  if (memory.weight === undefined) return "weight";

  if (memory.sterilized === undefined) return "sterilized";

  if (!memory.grain) return "grain";

  if (!memory.budget) return "budget";

  return "complete";
}