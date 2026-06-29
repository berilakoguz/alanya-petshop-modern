"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import type { Product } from "@/data/site";
import { storeInfo } from "@/data/site";
import { formatPrice } from "@/lib/utils";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  decreaseItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("pozitif-petshop-cart");

    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart) as CartItem[]);
      } catch {
        window.localStorage.removeItem("pozitif-petshop-cart");
      }
    }

    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      window.localStorage.setItem("pozitif-petshop-cart", JSON.stringify(items));
    }
  }, [hasHydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return {
      items,
      totalItems,
      totalPrice,
      isOpen,
      addItem: (product) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.product.id === product.id);

          if (existingItem) {
            return currentItems.map((item) =>
              item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          }

          return [...currentItems, { product, quantity: 1 }];
        });
        setIsOpen(true);
      },
      decreaseItem: (productId) => {
        setItems((currentItems) =>
          currentItems
            .map((item) => (item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem: (productId) => {
        setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
      },
      clearCart: () => setItems([]),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false)
    };
  }, [isOpen, items]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart, decreaseItem, addItem, removeItem, clearCart } = useCart();
  const whatsappText = `Merhaba, sepetimdeki ürünler için bilgi almak istiyorum:\n${items
    .map((item) => `- ${item.product.name} x ${item.quantity}`)
    .join("\n")}\nToplam: ${formatPrice(totalPrice)}`;

  return (
    <>
      <button
        type="button"
        aria-label="Sepeti kapat"
        onClick={closeCart}
        className={`fixed inset-0 z-[70] bg-ink/45 backdrop-blur-sm transition ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Sepet"
        className={`fixed right-0 top-0 z-[80] grid h-svh w-full max-w-md grid-rows-[auto_1fr_auto] bg-white shadow-lift transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-4 border-b hairline p-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-leaf-600">Sepetim</p>
            <h2 className="mt-1 text-2xl font-black text-ink">{totalItems} ürün</h2>
          </div>
          <button
            type="button"
            aria-label="Sepeti kapat"
            onClick={closeCart}
            className="grid size-11 place-items-center rounded-full border hairline bg-white text-ink transition hover:bg-bone"
          >
            <X size={21} />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="grid h-full min-h-80 place-items-center rounded-[8px] bg-bone p-8 text-center">
              <div>
                <ShoppingBag size={42} className="mx-auto text-leaf-600" />
                <h3 className="mt-5 text-xl font-black text-ink">Sepetiniz boş</h3>
                <p className="mt-2 text-sm leading-7 text-neutral-600">
                  Ürün kartlarındaki Sepete Ekle butonuna basınca ürünler burada görünecek.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <article key={item.product.id} className="grid grid-cols-[92px_1fr] gap-4 rounded-[8px] border hairline p-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="aspect-square rounded-[8px] object-cover"
                    style={{ objectPosition: item.product.objectPosition }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="line-clamp-2 text-sm font-black leading-6 text-ink">{item.product.name}</h3>
                        <p className="mt-1 text-sm font-bold text-leaf-600">{formatPrice(item.product.price)}</p>
                      </div>
                      <button
                        type="button"
                        aria-label={`${item.product.name} ürününü sepetten kaldır`}
                        onClick={() => removeItem(item.product.id)}
                        className="grid size-9 shrink-0 place-items-center rounded-full bg-bone text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-[8px] border hairline">
                        <button
                          type="button"
                          aria-label="Adedi azalt"
                          onClick={() => decreaseItem(item.product.id)}
                          className="grid size-9 place-items-center text-ink hover:bg-bone"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="grid min-w-9 place-items-center text-sm font-black text-ink">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Adedi artır"
                          onClick={() => addItem(item.product)}
                          className="grid size-9 place-items-center text-ink hover:bg-bone"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-black text-ink">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="border-t hairline bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-black uppercase tracking-[0.14em] text-neutral-500">Toplam</span>
            <span className="text-2xl font-black text-ink">{formatPrice(totalPrice)}</span>
          </div>
          <div className="mt-4 grid gap-3">
            <a
              href={`https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-leaf-500 px-5 text-sm font-black text-white transition hover:bg-leaf-600"
            >
              WhatsApp ile Sipariş Ver
            </a>
            {items.length > 0 ? (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] border hairline px-5 text-sm font-black text-neutral-700 transition hover:bg-bone"
              >
                Sepeti Temizle
              </button>
            ) : null}
          </div>
        </div>
      </aside>
    </>
  );
}
