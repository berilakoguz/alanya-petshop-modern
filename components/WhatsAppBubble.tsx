import { MessageCircle } from "lucide-react";
import { storeInfo } from "@/data/site";

export function WhatsAppBubble() {
  return (
    <a
      href={`https://wa.me/${storeInfo.whatsapp}`}
      aria-label="WhatsApp ile iletişime geç"
      className="fixed bottom-4 right-4 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-5 sm:right-5"
      target="_blank"
      rel="noreferrer"
    >
      <MessageCircle size={27} strokeWidth={2.6} />
    </a>
  );
}
