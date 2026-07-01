import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { getPerfume, getRecommendations } from "@/lib/data";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useWishlist } from "@/context/wishlist-context";
import NotFound from "./not-found";

export default function PerfumeDetail() {
  const { id } = useParams();
  const perfume = id ? getPerfume(id) : undefined;
  const { toggle, has } = useWishlist();
  const wished = perfume ? has(perfume.id) : false;
  const recommendations = perfume ? getRecommendations(perfume.id, 3) : [];

  if (!perfume) {
    return <NotFound />;
  }

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center lg:items-start">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[3/4] bg-secondary/20 rounded-sm overflow-hidden p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent z-10" />
              <img
                src={perfume.image}
                alt={perfume.name}
                className="w-full h-full object-contain relative z-20 drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-1/2 pt-4"
          >
            <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-2">
              {perfume.category}
            </span>
            <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-3">
              {perfume.name}
            </h1>

            <p className="text-muted-foreground text-sm italic mb-5">{perfume.inspiration}</p>

            <div className="flex items-center gap-6 mb-8 text-sm uppercase tracking-widest text-muted-foreground">
              <span>{perfume.size}</span>
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              <span className="text-primary">{perfume.price}</span>
            </div>

            <p className="text-lg font-light leading-relaxed text-muted-foreground mb-10">
              {perfume.description}
            </p>

            {/* Scent Notes */}
            <div className="mb-10 border border-primary/20 divide-y divide-primary/10">
              <div className="p-5 flex gap-6 items-start">
                <span className="text-primary text-xs uppercase tracking-widest w-20 shrink-0 pt-1">Top</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{perfume.topNotes.join("  ·  ")}</p>
              </div>
              <div className="p-5 flex gap-6 items-start">
                <span className="text-primary text-xs uppercase tracking-widest w-20 shrink-0 pt-1">Heart</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{perfume.middleNotes.join("  ·  ")}</p>
              </div>
              <div className="p-5 flex gap-6 items-start">
                <span className="text-primary text-xs uppercase tracking-widest w-20 shrink-0 pt-1">Base</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{perfume.baseNotes.join("  ·  ")}</p>
              </div>
            </div>

            {/* Wishlist toggle */}
            <div className="mb-8">
              <button
                onClick={() => toggle(perfume)}
                data-testid={`button-wishlist-detail-${perfume.id}`}
                className={`w-full py-3 border text-sm uppercase tracking-widest transition-all duration-300 ${
                  wished
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {wished ? "✦ Added to Wishlist" : "+ Add to Wishlist"}
              </button>
            </div>

            {/* Order CTA */}
            <div className="space-y-4 pt-8 border-t border-border">
              <h3 className="font-serif text-2xl text-foreground">Enquire &amp; Order</h3>
              <p className="text-muted-foreground text-sm">
                Our fragrances are crafted in limited batches. Secure yours via direct message.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://www.instagram.com/itrrika_fragrance"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-instagram-order"
                  className="flex-1 flex items-center justify-center gap-3 bg-white text-black py-4 px-6 hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-medium"
                >
                  <SiInstagram size={18} />
                  Instagram DM
                </a>
                <a
                  href="https://wa.me/919198447537"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-whatsapp-order"
                  className="flex-1 flex items-center justify-center gap-3 border border-primary text-primary py-4 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-widest text-sm font-medium"
                >
                  <SiWhatsapp size={18} />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-10 bg-secondary/30 p-8 border border-primary/10">
              <h4 className="uppercase tracking-widest text-xs text-primary mb-4">The Atelier Guarantee</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3"><span className="text-primary">✦</span> Authenticity certified</li>
                <li className="flex gap-3"><span className="text-primary">✦</span> Complimentary luxury packaging</li>
                <li className="flex gap-3"><span className="text-primary">✦</span> Worldwide secure shipping available</li>
              </ul>
            </div>

          </motion.div>
        </div>
      </div>

      {/* You May Also Like */}
      {recommendations.length > 0 && (
        <div className="border-t border-primary/10 mt-8 py-20 bg-secondary/10">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p className="text-primary text-xs uppercase tracking-[0.3em] text-center mb-2">
                Scent Affinities
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12">
                You May Also Like
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10">
                {recommendations.map((rec, i) => {
                  const recWished = has(rec.id);
                  const sharedNotes = [
                    ...perfume.topNotes,
                    ...perfume.middleNotes,
                    ...perfume.baseNotes,
                  ]
                    .map(n => n.toLowerCase())
                    .filter(n =>
                      [...rec.topNotes, ...rec.middleNotes, ...rec.baseNotes]
                        .map(r => r.toLowerCase())
                        .some(rn => rn.includes(n) || n.includes(rn)),
                    )
                    .slice(0, 3);

                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                      className="group flex flex-col border border-primary/10 bg-background hover:border-primary/30 transition-colors duration-300"
                    >
                      {/* Image */}
                      <Link href={`/perfume/${rec.id}`}>
                        <div className="relative aspect-square bg-secondary/20 overflow-hidden cursor-pointer">
                          <div className="absolute inset-0 bg-gradient-to-br from-background/30 to-transparent z-10" />
                          <img
                            src={rec.image}
                            alt={rec.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </Link>

                      {/* Info */}
                      <div className="p-5 flex-1 flex flex-col">
                        <Link href={`/perfume/${rec.id}`}>
                          <h3 className="font-serif text-xl text-foreground mb-1 hover:text-primary transition-colors cursor-pointer">
                            {rec.name}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-xs italic mb-3">{rec.inspiration}</p>

                        {sharedNotes.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {sharedNotes.map(note => (
                              <span
                                key={note}
                                className="text-[10px] uppercase tracking-wider border border-primary/20 text-primary/70 px-2 py-0.5"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto flex items-center justify-between pt-3 border-t border-primary/10">
                          <span className="text-primary font-serif text-lg">{rec.price}</span>
                          <button
                            onClick={() => toggle(rec)}
                            className={`text-xs uppercase tracking-widest px-3 py-1.5 border transition-all duration-200 ${
                              recWished
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
                            }`}
                          >
                            {recWished ? "✦ Added" : "+ Wishlist"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}
