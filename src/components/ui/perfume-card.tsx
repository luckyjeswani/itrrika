import { Link } from "wouter";
import { motion } from "framer-motion";
import { Perfume } from "@/lib/data";
import { useWishlist } from "@/context/wishlist-context";

interface PerfumeCardProps {
  perfume: Perfume;
  index: number;
}

export function PerfumeCard({ perfume, index }: PerfumeCardProps) {
  const { toggle, has } = useWishlist();
  const wished = has(perfume.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
      className="group"
      data-testid={`card-product-${perfume.id}`}
    >
      <Link href={`/perfume/${perfume.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30 rounded-sm mb-6">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-60 mix-blend-multiply" />
          <motion.img
            src={perfume.image}
            alt={perfume.name}
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs uppercase tracking-widest bg-background/80 backdrop-blur-md border border-primary/20 text-primary">
              {perfume.category}
            </span>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-xl md:text-2xl text-primary mb-2 group-hover:text-primary/80 transition-colors">
            {perfume.name}
          </h3>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
            {perfume.size} | {perfume.price}
          </p>
          <div className="inline-flex items-center justify-center border-b border-primary/30 pb-1 text-sm uppercase tracking-widest text-foreground hover:text-primary hover:border-primary transition-colors duration-300">
            Discover
          </div>
        </div>
      </Link>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => toggle(perfume)}
          data-testid={`button-wishlist-${perfume.id}`}
          className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all duration-300 ${
            wished
              ? "border-primary bg-primary/10 text-primary"
              : "border-primary/20 text-muted-foreground hover:border-primary/60 hover:text-primary"
          }`}
        >
          {wished ? "✦ In Wishlist" : "+ Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}
