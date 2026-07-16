"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const welcomeMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Merhaba, ben Pozitif Petshop yapay zeka destek asistanı. Evcil dostunuzun türünü, yaşını, kilosunu ve ihtiyacını yazın; katalogdaki ürünlere göre yardımcı olayım."
};

export function AiSupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages]);

  async function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setDraft("");
    setIsSending(true);

    try {
      const response = await fetch("/api/ai-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content }))
        })
      });
      const payload = (await response.json()) as { message?: string; error?: string };

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            payload.message ??
            payload.error ??
            "Şu an yapay zeka desteğine ulaşılamıyor. Biraz sonra tekrar deneyebilirsiniz."
        }
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Bağlantı kurulamadı. İnternet veya sunucu ayarlarını kontrol edip tekrar deneyin."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-24 right-5 z-[60] inline-flex min-h-14 max-w-[calc(100vw-40px)] items-center gap-3 rounded-full bg-ink px-5 text-sm font-black text-white shadow-lift transition hover:-translate-y-1 hover:bg-leaf-600 focus:outline-none focus:ring-4 focus:ring-leaf-100",
          isOpen && "pointer-events-none opacity-0"
        )}
      >
        <Sparkles size={20} className="text-amber" aria-hidden="true" />
        Yapay zeka desteği al
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-[70] w-[calc(100vw-40px)] max-w-md overflow-hidden rounded-[8px] border hairline bg-white shadow-lift transition duration-300",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b hairline bg-ink p-4 text-white">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-white/12 text-amber">
              <Bot size={21} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-white/62">Gerçek AI model desteği</p>
              <h2 className="mt-1 text-lg font-black leading-tight">Pozitif Petshop Asistanı</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Yapay zeka sohbetini kapat"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 transition hover:bg-white/18"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid max-h-[72svh] min-h-[420px] grid-rows-[1fr_auto]">
          <div className="overflow-y-auto bg-bone p-4">
            <div className="grid gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[86%] rounded-[8px] px-4 py-3 text-sm font-semibold leading-7",
                      message.role === "user" ? "bg-leaf-600 text-white" : "border hairline bg-white text-neutral-700"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isSending ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-[8px] border hairline bg-white px-4 py-3 text-sm font-black text-neutral-600">
                    <Loader2 size={17} className="animate-spin text-leaf-600" aria-hidden="true" />
                    Yanıt hazırlanıyor
                  </div>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t hairline bg-white p-3">
            <div className="flex items-end gap-2">
              <label className="sr-only" htmlFor="ai-support-message">
                Yapay zeka desteğine mesaj yaz
              </label>
              <textarea
                id="ai-support-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Örn: 2 yaşında 7 kg Maltese için tahılsız mama öner"
                rows={2}
                className="max-h-28 min-h-12 flex-1 resize-none rounded-[8px] border hairline bg-bone px-3 py-3 text-sm font-semibold leading-6 outline-none transition focus:border-leaf-500 focus:bg-white focus:ring-4 focus:ring-leaf-100"
              />
              <button
                type="submit"
                disabled={!draft.trim() || isSending}
                aria-label="Mesaj gönder"
                className="grid size-12 shrink-0 place-items-center rounded-[8px] bg-leaf-600 text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                {isSending ? <Loader2 size={19} className="animate-spin" /> : <Send size={19} />}
              </button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-[11px] font-bold leading-5 text-neutral-500">
              <MessageCircle size={13} aria-hidden="true" />
              Sağlık sorularında veteriner görüşü yerine geçmez.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
