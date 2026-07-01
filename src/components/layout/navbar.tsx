import { Link } from "wouter";
import LogoImg from "@assets/IMG_0724_1782589991493.PNG";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img 
            src={LogoImg} 
            alt="ITRRIKA Logo" 
            className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
          />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
          <Link href="/" className="text-foreground/80 hover:text-primary transition-colors duration-300">
            Home
          </Link>
          <Link href="/collection" className="text-foreground/80 hover:text-primary transition-colors duration-300">
            Collection
          </Link>
          <Link href="/quiz" className="flex items-center gap-1.5 text-primary border border-primary/30 px-4 py-1.5 hover:bg-primary/10 transition-colors duration-300">
            <span className="text-primary text-xs">✦</span>
            Find Your Scent
          </Link>
          <a href="#connect" className="text-foreground/80 hover:text-primary transition-colors duration-300">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
