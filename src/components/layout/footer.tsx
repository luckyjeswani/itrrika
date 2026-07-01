import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-12">
          <div>
            <h3 className="font-serif text-2xl text-primary mb-2">ITRRIKA Fragrances</h3>
            <p className="text-muted-foreground tracking-widest text-sm uppercase">Perfumes | Luxury & Elegance</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3 text-xs uppercase tracking-widest">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
            <Link href="/collection" className="text-muted-foreground hover:text-primary transition-colors">Collection</Link>
            <Link href="/checkout" className="text-muted-foreground hover:text-primary transition-colors">Checkout</Link>
            <Link href="/policy" className="text-muted-foreground hover:text-primary transition-colors">No Return Policy</Link>
            <a href="#connect" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/itrrika_fragrance"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <SiInstagram size={18} />
            </a>
            <a
              href="https://wa.me/919198447537"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <SiWhatsapp size={18} />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-border/50 pt-8">
          <p className="text-muted-foreground text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} ITRRIKA Fragrances. All rights reserved.
          </p>
          <Link href="/policy" className="text-muted-foreground text-xs uppercase tracking-wider hover:text-primary transition-colors">
            No Return Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
