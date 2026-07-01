export interface BundleInfo {
  name: string;
  price: number;
  isBundle: boolean;
  savings: number;
  nextBundle: { count: number; name: string; price: number } | null;
}

const BUNDLES: { count: number; name: string; price: number }[] = [
  { count: 1, name: "Single",          price: 299  },
  { count: 3, name: "Trio",            price: 749  },
  { count: 6, name: "Sextet",          price: 1499 },
  { count: 9, name: "Full Collection", price: 2199 },
];

export function getBundleInfo(count: number): BundleInfo {
  if (count <= 0) {
    return { name: "—", price: 0, isBundle: false, savings: 0, nextBundle: BUNDLES[1] };
  }

  const normalPrice = count * 299;

  // Exact bundle match
  const exact = BUNDLES.find(b => b.count === count);
  if (exact) {
    const next = BUNDLES.find(b => b.count > count) ?? null;
    return {
      name: exact.name,
      price: exact.price,
      isBundle: exact.count > 1,
      savings: normalPrice - exact.price,
      nextBundle: next ? { count: next.count, name: next.name, price: next.price } : null,
    };
  }

  // Combo: largest bundle that fits + remainder at ₹299 each
  // e.g. 4 = Trio (₹749) + 1×₹299 = ₹1048
  //      7 = Sextet (₹1499) + 1×₹299 = ₹1798
  const bundleTiers = [...BUNDLES]
    .filter(b => b.count > 1 && b.count < count)
    .reverse(); // largest first

  const bestBundle = bundleTiers[0] ?? null;

  if (bestBundle) {
    const remainder = count - bestBundle.count;
    const price = bestBundle.price + remainder * 299;
    const next = BUNDLES.find(b => b.count > count) ?? null;
    return {
      name: `${bestBundle.name} + ${remainder}`,
      price,
      isBundle: true,
      savings: normalPrice - price,
      nextBundle: next ? { count: next.count, name: next.name, price: next.price } : null,
    };
  }

  // count = 2 (below first bundle tier)
  const next = BUNDLES.find(b => b.count > count) ?? null;
  return {
    name: `${count} Fragrances`,
    price: normalPrice,
    isBundle: false,
    savings: 0,
    nextBundle: next ? { count: next.count, name: next.name, price: next.price } : null,
  };
}

export function formatPrice(amount: number): string {
  return `₹${amount}`;
}
