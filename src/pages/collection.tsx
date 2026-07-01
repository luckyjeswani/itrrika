import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import { perfumes, type Perfume } from "@/lib/data";
import { PerfumeCard } from "@/components/ui/perfume-card";
import { useWishlist } from "@/context/wishlist-context";
import { formatPrice } from "@/lib/bundle-pricing";

const BUNDLE_TIERS = [
  { id: "trio",   count: 3, name: "Trio",            price: 749,  single: 897  },
  { id: "sextet", count: 6, name: "Sextet",          price: 1499, single: 1794 },
  { id: "full",   count: 9, name: "Full Collection", price: 2199, single: 2691 },
];

export default function Collection() {
  const [activeTier, setActiveTier] = useState<string | null>(null);
  const [picks, setPicks]           = useState<Perfume[]>([]);
  const { toggle, clear }           = useWishlist();
  const [, navigate]                = useLocation();

  const tier     = BUNDLE_TIERS.find(t => t.id === activeTier) ?? null;
  const maxPicks = tier?.count ?? 0;
  const isFull   = picks.length === maxPicks && maxPicks > 0;
  const slotsLeft = maxPicks - picks.length;

  function selectTier(id: string) {
    setActiveTier(prev => (prev === id ? null : id));
    setPicks([]);
  }

  function togglePick(perfume: Perfume) {
    if (!tier) return;
    const isIn = picks.some(p => p.id === perfume.id);
    if (isIn) {
      setPicks(prev => prev.filter(p => p.id !== perfume.id));
    } else if (picks.length < maxPicks) {
      setPicks(prev => [...prev, perfume]);
    }
  }

  function handleCheckout() {
    if (!tier || !isFull) return;
    clear();
    picks.forEach(p => toggle(p));
    navigate("/checkout");
  }

  function cancelBundle() {
    setActiveTier(null);
    setPicks([]);
  }

  return (
    <div className="w-full bg-background min-h-screen pt-12 pb-44">
      <div className="container mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl text-primary mb-6"
          >
            The Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-muted-foreground font-light leading-relaxed"
          >
            Every scent is a masterpiece, crafted with uncompromising elegance.
            Discover the essence that speaks to your royal spirit.
          </motion.p>
        </div>

        {/* Bundle Tier Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-primary/10" />
            <p className="text-primary text-xs uppercase tracking-[0.3em] shrink-0">
              Build a Bundle &amp; Save
            </p>
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BUNDLE_TIERS.map(t => {
              const isActive = activeTier === t.id;
              const savings  = t.single - t.price;
              return (
                <button
                  key={t.id}
                  onClick={() => selectTier(t.id)}
                  className={`relative text-left p-6 border transition-all duration-300 group ${
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-4 right-4 text-primary">✦</span>
                  )}
                  <p className={`text-[10px] uppercase tracking-[0.25em] mb-1.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    Choose any {t.count}
                  </p>
                  <p className="font-serif text-2xl text-foreground mb-3">{t.name}</p>
                  <p className="font-serif text-3xl text-primary mb-2">{formatPrice(t.price)}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-muted-foreground text-xs line-through">{formatPrice(t.single)}</span>
                    <span className="text-green-400 text-xs font-medium">Save {formatPrice(savings)}</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {formatPrice(Math.round(t.price / t.count))} per fragrance
                  </p>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {tier && (
              <motion.p
                key="hint"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="text-center text-muted-foreground text-sm mt-5"
              >
                {isFull ? (
                  <>All <span className="text-primary">{maxPicks}</span> slots filled — scroll down to checkout ✦</>
                ) : (
                  <>Choose <span className="text-primary">{slotsLeft}</span> more fragrance{slotsLeft !== 1 ? "s" : ""} to complete your <span className="text-primary">{tier.name}</span> bundle</>
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Perfume Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {perfumes.map((perfume, index) => {
            if (!tier) {
              return <PerfumeCard key={perfume.id} perfume={perfume} index={index} />;
            }

            const isInBundle  = picks.some(p => p.id === perfume.id);
            const slotNum     = picks.findIndex(p => p.id === perfume.id) + 1;
            const isBundleFull = picks.length >= maxPicks;
            const canAdd      = !isInBundle && !isBundleFull;

            return (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: index * 0.05, ease: "easeOut" }}
                className="group"
              >
                {/* Image */}
                <div
                  onClick={() => togglePick(perfume)}
                  className={`relative aspect-[3/4] overflow-hidden bg-secondary/30 rounded-sm mb-6 cursor-pointer transition-all duration-300 ${
                    isInBundle
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : canAdd
                        ? "hover:ring-1 hover:ring-primary/40 hover:ring-offset-1 hover:ring-offset-background"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isInBundle ? "scale-[1.04]" : canAdd ? "group-hover:scale-[1.04]" : ""
                    }`}
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 text-xs uppercase tracking-widest bg-background/80 backdrop-blur-md border border-primary/20 text-primary">
                      {perfume.category}
                    </span>
                  </div>

                  {/* Slot number badge */}
                  {isInBundle && (
                    <motion.div
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      className="absolute top-4 right-4 z-30 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center"
                    >
                      {slotNum}
                    </motion.div>
                  )}

                  {/* Full overlay on others */}
                  {!isInBundle && isBundleFull && (
                    <div className="absolute inset-0 z-20 bg-background/50 flex items-center justify-center">
                      <p className="text-muted-foreground text-[10px] uppercase tracking-widest">Bundle Full</p>
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="text-center">
                  <h3 className="font-serif text-xl md:text-2xl text-primary mb-2">{perfume.name}</h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
                    {perfume.size} · ₹299
                  </p>
                  <button
                    onClick={() => togglePick(perfume)}
                    disabled={!canAdd && !isInBundle}
                    className={`w-full py-2.5 text-xs uppercase tracking-widest border transition-all duration-300 ${
                      isInBundle
                        ? "border-primary bg-primary/10 text-primary"
                        : canAdd
                          ? "border-primary/30 text-muted-foreground hover:border-primary hover:text-primary"
                          : "border-primary/10 text-primary/20 cursor-not-allowed"
                    }`}
                  >
                    {isInBundle
                      ? `✦ Slot ${slotNum} — Remove`
                      : canAdd
                        ? `+ Add to ${tier.name}`
                        : "Bundle Full"}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Sticky Bundle Bar ─────────────────────────────────────── */}
      <AnimatePresence>
        {tier && (
          <motion.div
            key="bundle-bar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-primary/20 shadow-2xl"
          >
            <div className="container mx-auto px-4 md:px-8 py-4 flex items-center gap-4 md:gap-6">

              {/* Mini slot thumbnails */}
              <div className="flex gap-1.5 shrink-0">
                {Array.from({ length: maxPicks }).map((_, i) => {
                  const p = picks[i];
                  return (
                    <div
                      key={i}
                      className={`relative w-9 h-11 border overflow-hidden transition-all duration-300 ${
                        p ? "border-primary" : "border-primary/15"
                      }`}
                    >
                      {p ? (
                        <>
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          <button
                            onClick={() => setPicks(prev => prev.filter(x => x.id !== p.id))}
                            className="absolute inset-0 bg-background/80 opacity-0 hover:opacity-100 flex items-center justify-center text-primary transition-opacity text-base leading-none"
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-primary/20 text-[10px]">
                          {i + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bundle info */}
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg text-foreground leading-tight truncate">
                  {tier.name} Bundle
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-primary font-serif text-xl">{formatPrice(tier.price)}</span>
                  <span className="text-muted-foreground text-xs line-through">{formatPrice(tier.single)}</span>
                  <span className="text-green-400 text-xs">Save {formatPrice(tier.single - tier.price)}</span>
                </div>
              </div>

              {/* Progress counter */}
              <div className="text-center shrink-0 hidden sm:block">
                <p className="font-serif text-2xl text-foreground leading-none">
                  {picks.length}
                  <span className="text-muted-foreground text-base">/{maxPicks}</span>
                </p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">Slots</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={cancelBundle}
                  className="text-muted-foreground text-[10px] uppercase tracking-widest hover:text-foreground transition-colors hidden sm:block"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={handleCheckout}
                  disabled={!isFull}
                  animate={isFull ? { scale: [1, 1.03, 1] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
                  className={`px-6 md:px-10 py-3 text-xs md:text-sm uppercase tracking-widest transition-all duration-300 ${
                    isFull
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-primary/15 text-primary/30 cursor-not-allowed"
                  }`}
                >
                  {isFull
                    ? "Proceed to Checkout →"
                    : `${slotsLeft} slot${slotsLeft !== 1 ? "s" : ""} left`}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
