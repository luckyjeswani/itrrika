import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useWishlist } from "@/context/wishlist-context";
import { useLocation } from "wouter";
import { getBundleInfo, formatPrice } from "@/lib/bundle-pricing";

export function WishlistPanel() {
  const { items, remove, clear } = useWishlist();
  const [open, setOpen] = useState(false);
  const [, navigate] = useLocation();
  const [copied, setCopied] = useState(false);

  const count = items.length;
  const bundle = getBundleInfo(count);

  const buildMessage = () => {
    const list = items.map((p, i) => `${i + 1}. ${p.name} (${p.size})`).join("\n");
    const priceNote = bundle.isBundle
      ? `Bundle: ${bundle.name} — ${formatPrice(bundle.price)}`
      : `Total: ${formatPrice(bundle.price)}`;
    return `Hi ITRRIKA! I'd like to order the following fragrances:\n\n${list}\n\n${priceNote}\n\nPlease let me know how to proceed. Thank you!`;
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/919198447537?text=${text}`, "_blank");
  };

  const handleInstagram = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      /* clipboard unavailable */
    }
    window.open("https://www.instagram.com/itrrika_fragrance", "_blank");
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        data-testid="button-open-wishlist"
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors duration-300 uppercase tracking-widest text-xs font-medium"
        aria-label="Open wishlist"
      >
        <span>Wishlist</span>
        {count > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-foreground text-primary text-xs font-bold">
            {count}
          </span>
        )}
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Slide-in panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 bg-background border-l border-primary/20 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-primary/10">
              <div>
                <h2 className="font-serif text-2xl text-foreground">My Wishlist</h2>
                <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                  {count === 0
                    ? "No items selected"
                    : bundle.isBundle
                      ? `${count} fragrances · ${bundle.name}`
                      : `${count} fragrance${count > 1 ? "s" : ""} selected`}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="button-close-wishlist"
                className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none"
                aria-label="Close wishlist"
              >
                ×
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
              {count === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Browse the collection and add fragrances you love.
                  </p>
                  <button
                    onClick={() => setOpen(false)}
                    className="mt-6 text-primary text-xs uppercase tracking-widest border-b border-primary/30 pb-1 hover:border-primary transition-colors"
                  >
                    Explore Collection
                  </button>
                </div>
              ) : (
                <>
                  {items.map(p => (
                    <div
                      key={p.id}
                      data-testid={`wishlist-item-${p.id}`}
                      className="flex items-center gap-4 border border-primary/10 p-4 group"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-20 object-cover object-center shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-foreground truncate">{p.name}</p>
                        <p className="text-muted-foreground text-xs uppercase tracking-widest mt-1">
                          {p.size} · {p.price}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(p.id)}
                        data-testid={`button-remove-${p.id}`}
                        className="text-muted-foreground hover:text-primary transition-colors text-lg leading-none shrink-0"
                        aria-label={`Remove ${p.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={clear}
                    data-testid="button-clear-wishlist"
                    className="text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest transition-colors pt-2"
                  >
                    Clear all
                  </button>
                </>
              )}
            </div>

            {/* Footer CTAs */}
            {count > 0 && (
              <div className="px-8 py-6 border-t border-primary/10 space-y-3">

                {/* Bundle price summary */}
                <div className="flex items-center justify-between mb-1">
                  <div>
                    {bundle.isBundle ? (
                      <>
                        <p className="text-xs uppercase tracking-widest text-primary">{bundle.name} Bundle</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-muted-foreground text-xs line-through">{formatPrice(count * 299)}</span>
                          <span className="text-green-400 text-xs">Save {formatPrice(bundle.savings)}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{count} fragrance{count !== 1 ? "s" : ""}</p>
                    )}
                  </div>
                  <span className="font-serif text-2xl text-primary">{formatPrice(bundle.price)}</span>
                </div>

                {/* Next bundle nudge */}
                {bundle.nextBundle && (
                  <p className="text-xs text-muted-foreground leading-relaxed bg-primary/5 border border-primary/10 px-3 py-2">
                    Add <span className="text-primary">{bundle.nextBundle.count - count}</span> more for the{" "}
                    <span className="text-primary">{bundle.nextBundle.name}</span> at{" "}
                    <span className="text-primary">{formatPrice(bundle.nextBundle.price)}</span>
                    {" "}· save {formatPrice(bundle.nextBundle.count * 299 - bundle.nextBundle.price)}
                  </p>
                )}

                <button
                  onClick={() => { setOpen(false); navigate("/checkout"); }}
                  data-testid="button-go-checkout"
                  className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm font-medium"
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-primary/10" />
                  <span className="text-muted-foreground text-xs">or share</span>
                  <div className="flex-1 h-px bg-primary/10" />
                </div>

                <button
                  onClick={handleWhatsApp}
                  data-testid="button-send-whatsapp"
                  className="w-full flex items-center justify-center gap-3 border border-primary text-primary py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300 uppercase tracking-widest text-sm"
                >
                  <SiWhatsapp size={15} />
                  Send via WhatsApp
                </button>

                <button
                  onClick={handleInstagram}
                  data-testid="button-send-instagram"
                  className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm"
                >
                  <SiInstagram size={15} />
                  {copied ? "Copied! Opening Instagram..." : "Send via Instagram DM"}
                </button>

                {copied && (
                  <p className="text-primary text-xs text-center leading-relaxed">
                    Your list is copied — just paste it in the DM.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
