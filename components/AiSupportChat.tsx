"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
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
    "\u{1F44B} Merhaba! Ben Pozitif Petshop Asistanı.\n\nMinik dostunuzun türünü, yaşını, kilosunu ve ihtiyacını yazın; katalogdaki ürünlerden size uygun seçenekleri birlikte bulalım. \u{1F43E}"
};

const quickPrompts = [
  {
    label: "\u{1F43E} Mama öner",
    text: "2 yaşında 5 kg kısır kedim için tahılsız mama öner"
  },
  {
    label: "\u{1F4B0} Ucuz sırala",
    text: "En uygun fiyatlı köpek mamalarını artan fiyata göre sırala"
  },
  {
    label: "\u{1F9FC} Tüy sorunu",
    text: "Kedim çok tüy döküyor, ne yapmalıyım?"
  },
  {
    label: "\u{1F3EA} Mağaza bilgisi",
    text: "Adres, çalışma saatleri ve teslimat bilgisi nedir?"
  }
];

const headingPrefixes = [
  "\u{1F44B}",
  "\u{1F43E}",
  "\u{1F4AC}",
  "\u{1F504}",
  "\u{1F50E}",
  "\u{1F4CC}",
  "\u{1F6D2}",
  "\u{1F4A1}",
  "\u{2696}\u{FE0F}",
  "\u{1FA7A}",
  "\u{26A0}\u{FE0F}",
  "\u{1F9FC}",
  "\u{1F4A7}",
  "\u{1F37D}\u{FE0F}",
  "\u{1F6E1}\u{FE0F}",
  "\u{1F3EA}",
  "\u{1F4E6}",
  "\u{1F963}",
  "\u{1F969}",
  "\u{1F552}",
  "\u{1F9B7}",
  "\u{1F697}",
  "\u{1F3BE}",
  "\u{1F914}",
  "\u{1F64F}"
];

function MessageContent({ content }: { content: string }) {
  return (
    <div className="grid gap-1.5">
      {content.split("\n").map((line, index) => {
        const trimmed = line.trim();
        const key = `${index}-${line}`;

        if (!trimmed) return <span key={key} className="h-1" aria-hidden="true" />;

        if (headingPrefixes.some((prefix) => trimmed.startsWith(prefix))) {
          return (
            <p key={key} className={cn("font-black leading-6 text-ink", index > 0 && "mt-1")}>
              {trimmed}
            </p>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <div key={key} className="grid grid-cols-[12px_1fr] gap-1.5 leading-6">
              <span className="font-black text-leaf-600" aria-hidden="true">
                •
              </span>
              <span>{trimmed.slice(2)}</span>
            </div>
          );
        }

        if (/^\d+\./.test(trimmed)) {
          return (
            <p key={key} className="mt-1 font-extrabold leading-6 text-neutral-900">
              {trimmed}
            </p>
          );
        }

        if (line.startsWith("   ")) {
          return (
            <p key={key} className="pl-2 text-[13px] font-medium leading-5 text-neutral-600">
              {trimmed}
            </p>
          );
        }

        return (
          <p key={key} className="leading-6">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

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

  async function sendMessage(rawContent: string) {
    const content = rawContent.trim();
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
            "\u{26A0}\u{FE0F} Şu an asistana ulaşılamıyor. Biraz sonra tekrar deneyebilirsiniz."
        }
      ]);
    } catch {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "\u{26A0}\u{FE0F} Bağlantı kurulamadı. Lütfen biraz sonra tekrar deneyin."
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    void sendMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  function resetConversation() {
    if (isSending) return;
    setMessages([{ ...welcomeMessage, id: crypto.randomUUID() }]);
    setDraft("");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Yapay zeka desteği al"
        className={cn(
          "fixed bottom-20 right-4 z-[60] grid size-14 place-items-center rounded-full bg-ink p-0 text-white shadow-lift transition hover:-translate-y-1 hover:bg-leaf-600 focus:outline-none focus:ring-4 focus:ring-leaf-100 sm:bottom-24 sm:right-5 sm:inline-flex sm:min-h-14 sm:w-auto sm:max-w-[calc(100vw-40px)] sm:gap-3 sm:px-5",
          isOpen && "pointer-events-none opacity-0"
        )}
      >
        <Sparkles size={22} className="text-amber sm:size-5" aria-hidden="true" />
        <span className="hidden sm:inline">Yapay zeka desteği al</span>
      </button>

      <div
        className={cn(
          "fixed inset-x-2 bottom-2 top-2 z-[70] flex flex-col overflow-hidden rounded-[8px] border hairline bg-white shadow-lift transition duration-300 sm:inset-x-auto sm:bottom-24 sm:right-5 sm:top-auto sm:h-[min(720px,calc(100dvh-8rem))] sm:w-[calc(100vw-40px)] sm:max-w-md",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b hairline bg-ink p-3 text-white sm:gap-4 sm:p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-[8px] bg-white/12 text-amber">
              <Bot size={21} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.12em] text-white/62 sm:text-xs sm:tracking-[0.16em]">Akıllı katalog ve bakım desteği</p>
              <h2 className="mt-1 text-base font-black leading-tight sm:text-lg">Pozitif Petshop Asistanı</h2>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={resetConversation}
              disabled={isSending}
              aria-label="Yeni sohbet başlat"
              title="Yeni sohbet"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw size={18} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Yapay zeka sohbetini kapat"
              title="Sohbeti kapat"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/18"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_auto]">
          <div className="overflow-y-auto bg-bone p-4">
            <div className="grid gap-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[92%] break-words rounded-[8px] px-4 py-3 text-sm leading-6 sm:max-w-[88%]",
                      message.role === "user"
                        ? "bg-leaf-600 font-semibold text-white"
                        : "border hairline bg-white font-medium text-neutral-700"
                    )}
                  >
                    {message.role === "assistant" ? <MessageContent content={message.content} /> : message.content}
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
            {messages.length === 1 ? (
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    onClick={() => void sendMessage(prompt.text)}
                    disabled={isSending}
                    className="rounded-full border hairline bg-bone px-3 py-2 text-xs font-black text-neutral-700 transition hover:border-leaf-500 hover:bg-leaf-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>
            ) : null}
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
