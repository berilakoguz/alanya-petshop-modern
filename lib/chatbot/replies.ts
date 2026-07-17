import { AIEngine } from "./AIEngine";

export function createLocalReply(message: string, userId = "guest") {
  const ai = new AIEngine(userId);
  return ai.reply(message);
}
