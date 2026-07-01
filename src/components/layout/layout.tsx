import { ReactNode } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { WishlistProvider } from "@/context/wishlist-context";
import { WishlistPanel } from "@/components/wishlist-panel";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <WishlistPanel />
      </div>
    </WishlistProvider>
  );
}
