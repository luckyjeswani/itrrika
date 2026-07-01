import { motion } from "framer-motion";
import { perfumes } from "@/lib/data";
import { PerfumeCard } from "@/components/ui/perfume-card";
import HeroCollage from "@assets/1782584582555_1782589991487.png";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  const featuredPerfumes = perfumes.filter(p => ["qawhwa-elixir", "red-velvet", "blossom-muse", "pink-nectar"].includes(p.id));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={HeroCollage} 
            alt="ITRRIKA Fragrances Collection" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-primary text-sm md:text-base uppercase tracking-[0.3em] mb-6"
          >
            A Royal Atelier
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight mb-8"
          >
            Luxury & Elegance
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <a 
              href="#collection" 
              className="inline-block border border-primary/50 text-primary px-8 py-4 uppercase tracking-widest text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-500"
            >
              Explore Collection
            </a>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-primary mb-8">The Weight of Gold</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-12">
              ITRRIKA is not merely a fragrance; it is an heirloom. Rooted in the opulence of black marble and molten gold, our scents are crafted for those who command the room. Every drop is a whisper of white orchids and amber—a profound statement of undeniable royalty.
            </p>
            <div className="w-px h-24 bg-gradient-to-b from-primary to-transparent mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Featured Collection Grid */}
      <section id="collection" className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">The Signatures</h2>
              <p className="text-muted-foreground uppercase tracking-widest text-sm">Curated masterpieces</p>
            </div>
            <a href="/collection" className="text-primary uppercase tracking-widest text-sm border-b border-primary/30 pb-1 hover:border-primary transition-colors">
              View All
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {featuredPerfumes.map((perfume, index) => (
              <PerfumeCard key={perfume.id} perfume={perfume} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Atmospheric Section — L'Art De La Parfumerie */}
      <section className="py-32 relative overflow-hidden bg-background">
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* Giant staggered heading */}
          <div className="text-center mb-20 overflow-hidden">
            {["L'Art", "De La", "Parfumerie"].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="block font-serif leading-none select-none"
                  style={{
                    fontSize: "clamp(3.5rem, 12vw, 10rem)",
                    WebkitTextStroke: i === 1 ? "1px hsl(var(--primary))" : undefined,
                    color: i === 1 ? "transparent" : "hsl(var(--primary) / 0.12)",
                    letterSpacing: i === 1 ? "0.15em" : "0.05em",
                  }}
                >
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-primary/10 border border-primary/10">
            {[
              {
                number: "01",
                title: "Origin",
                text: "Every ingredient is sourced from the world's most revered botanical regions — petals from Grasse, oud from Assam, vanilla from Madagascar."
              },
              {
                number: "02",
                title: "Craft",
                text: "Our master blenders work by intuition and memory, layering volatile top notes over a lingering heart until the composition breathes like a living thing."
              },
              {
                number: "03",
                title: "Legacy",
                text: "ITRRIKA fragrances are not made to be worn once. They are made to become yours — to mark moments, to carry memories, to outlast seasons."
              }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="bg-background p-10 group hover:bg-primary/5 transition-colors duration-500"
              >
                <span className="block font-serif text-6xl text-primary/15 group-hover:text-primary/30 transition-colors duration-500 mb-6 leading-none">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl text-foreground mb-4 uppercase tracking-[0.2em]">{pillar.title}</h3>
                <div className="w-8 h-px bg-primary mb-6" />
                <p className="text-muted-foreground text-sm leading-relaxed font-light">{pillar.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Floating quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-24 text-center max-w-3xl mx-auto"
          >
            <p className="font-serif text-2xl md:text-3xl text-foreground/60 italic leading-relaxed">
              "A fragrance is the invisible part of a person's personality that speaks louder than words."
            </p>
            <span className="block mt-6 text-primary text-xs uppercase tracking-[0.4em]">The ITRRIKA Atelier</span>
          </motion.blockquote>
        </div>
      </section>

      {/* Bundle Pricing Section */}
      <section className="py-24 bg-background border-t border-primary/10">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Curate Your Collection</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-sm">Choose your indulgence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Single */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-primary/20 p-8 flex flex-col items-center text-center hover:border-primary/60 transition-colors duration-300"
            >
              <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4">Single</span>
              <p className="font-serif text-5xl text-foreground mb-2">₹299</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">per bottle</p>
              <div className="w-8 h-px bg-primary/40 mb-6" />
              <p className="text-muted-foreground text-sm leading-relaxed">Any one fragrance of your choice · 15ml · Parfum</p>
            </motion.div>

            {/* Set of 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-primary/20 p-8 flex flex-col items-center text-center hover:border-primary/60 transition-colors duration-300"
            >
              <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4">Trio</span>
              <p className="font-serif text-5xl text-foreground mb-2">₹749</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">set of 3</p>
              <div className="w-8 h-px bg-primary/40 mb-6" />
              <p className="text-muted-foreground text-sm leading-relaxed">Any three fragrances · 15ml each · Parfum</p>
            </motion.div>

            {/* Set of 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-primary bg-primary/5 p-8 flex flex-col items-center text-center relative hover:bg-primary/10 transition-colors duration-300"
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-widest px-4 py-1">Popular</span>
              <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4">Sextet</span>
              <p className="font-serif text-5xl text-foreground mb-2">₹1499</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">set of 6</p>
              <div className="w-8 h-px bg-primary/40 mb-6" />
              <p className="text-muted-foreground text-sm leading-relaxed">Any six fragrances · 15ml each · Parfum</p>
            </motion.div>

            {/* Full Collection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border border-primary/20 p-8 flex flex-col items-center text-center hover:border-primary/60 transition-colors duration-300"
            >
              <span className="text-primary text-xs uppercase tracking-[0.3em] mb-4">Full Collection</span>
              <p className="font-serif text-5xl text-foreground mb-2">₹2199</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-6">all 9 bottles</p>
              <div className="w-8 h-px bg-primary/40 mb-6" />
              <p className="text-muted-foreground text-sm leading-relaxed">The complete ITRRIKA experience · 15ml each · Parfum</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center text-muted-foreground text-sm mt-12"
          >
            To order any set, message us on Instagram or WhatsApp with your selection.
          </motion.p>
        </div>
      </section>

      {/* Connect / Social Section */}
      <section id="connect" className="py-24 md:py-32 bg-secondary/20 border-t border-border relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-primary mb-6"
            >
              Connect With Us
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg mb-16"
            >
              Step into our world. Order your signature scent via direct message.
            </motion.p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="p-4 bg-white rounded-lg">
                  <QRCodeSVG 
                    value="https://www.instagram.com/itrrika_fragrance" 
                    size={160}
                    fgColor="#000000"
                    bgColor="#ffffff"
                    level="Q"
                  />
                </div>
                <a 
                  href="https://www.instagram.com/itrrika_fragrance" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors"
                >
                  <SiInstagram className="text-primary" size={24} />
                  @itrrika_fragrance
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                <a 
                  href="https://wa.me/919198447537" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-48 h-48 rounded-full border-2 border-primary flex flex-col items-center justify-center gap-4 hover:bg-primary/10 transition-all duration-500 group"
                >
                  <SiWhatsapp className="text-primary group-hover:scale-110 transition-transform duration-500" size={48} />
                  <span className="uppercase tracking-widest text-sm font-medium">WhatsApp Us</span>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
