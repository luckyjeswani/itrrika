import { motion } from "framer-motion";

export default function Policy() {
  return (
    <div className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-28 max-w-3xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-4">Policies</span>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6">No Return Policy</h1>
          <div className="w-16 h-px bg-primary mb-12" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-10 text-muted-foreground leading-relaxed"
        >
          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">All Sales Are Final</h2>
            <p className="text-base font-light">
              At ITRRIKA Fragrances, all purchases are considered final at the time of order confirmation. Due to the intimate and personal nature of fragrance products, we do not accept returns, exchanges, or offer refunds under any circumstances once an order has been placed and confirmed.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Why We Have This Policy</h2>
            <p className="text-base font-light">
              Fragrances are highly personal products. For reasons of hygiene, safety, and product integrity, opened or used bottles cannot be resold or reused. We take every measure to ensure our products are sealed, genuine, and of the highest quality before dispatch. Once a product leaves our atelier, we are unable to guarantee its condition upon return.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Damaged or Incorrect Orders</h2>
            <p className="text-base font-light">
              In the rare event that your order arrives damaged in transit, or if you receive an incorrect item, please contact us within 24 hours of delivery via WhatsApp or Instagram DM with photographic evidence. We will review each case individually and, at our sole discretion, offer a replacement or store credit.
            </p>
            <p className="mt-4 text-base font-light">
              Damage claims submitted after 24 hours of delivery will not be considered. ITRRIKA Fragrances reserves the right to make the final decision on all damage claims.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Order Cancellations</h2>
            <p className="text-base font-light">
              Orders may be cancelled only before they have been dispatched. Once your order has been shipped, cancellation requests cannot be accepted. To request a pre-dispatch cancellation, contact us immediately via WhatsApp at +91 91984 47537.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-xl text-foreground mb-3">Contact Us</h2>
            <p className="text-base font-light">
              If you have any questions about your order or this policy, please reach out to us before making a purchase. We are happy to answer questions about any fragrance in our collection.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/919198447537"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-primary text-primary px-6 py-3 text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/itrrika_fragrance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Instagram DM
              </a>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-8">
            <p className="text-xs uppercase tracking-widest text-primary/60">
              Last updated: June 2026 · ITRRIKA Fragrances · All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
