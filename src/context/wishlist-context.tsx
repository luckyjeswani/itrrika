import { createContext, useContext, useState, ReactNode } from "react";
import { Perfume } from "@/lib/data";

interface WishlistContextType {
  items: Perfume[];
  toggle: (perfume: Perfume) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Perfume[]>([]);

  const toggle = (perfume: Perfume) => {
    setItems(prev =>
      prev.find(p => p.id === perfume.id)
        ? prev.filter(p => p.id !== perfume.id)
        : [...prev, perfume]
    );
  };

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);
  const has = (id: string) => items.some(p => p.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggle, remove, clear, has }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
