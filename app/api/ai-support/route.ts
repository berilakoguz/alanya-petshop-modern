import { NextResponse } from "next/server";
import { AIEngine } from "@/lib/chatbot/AIEngine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: "Geçersiz istek."
      },
      {
        status: 400
      }
    );
  }

  const messages = normalizeMessages(body);
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    return NextResponse.json(
      {
        error: "Mesaj bulunamadı."
      },
      {
        status: 400
      }
    );
  }

  const ai = new AIEngine("guest");
  const answer = ai.reply(latestUserMessage.content, messages);

  return NextResponse.json({
    message: answer
  });
}

function normalizeMessages(body: unknown): ChatMessage[] {
  if (!body || typeof body !== "object" || !("messages" in body) || !Array.isArray(body.messages)) {
    return [];
  }

  return body.messages
    .map((message): ChatMessage | null => {
      if (!message || typeof message !== "object") return null;
      if (!("role" in message)) return null;
      if (!("content" in message)) return null;
      if (message.role !== "assistant" && message.role !== "user") return null;
      if (typeof message.content !== "string") return null;

      return {
        role: message.role,
        content: message.content.trim()
      };
    })
    .filter((message): message is ChatMessage => Boolean(message));
}
