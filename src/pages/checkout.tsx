import { useState } from "react";
import { motion } from "framer-motion";
import { useWishlist } from "@/context/wishlist-context";
import { SiWhatsapp } from "react-icons/si";
import { getBundleInfo, formatPrice } from "@/lib/bundle-pricing";

type PaymentMethod = "upi" | "cod";
type Step = "address" | "payment" | "confirmation";

interface FormData {
  customerName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

const EMPTY_FORM: FormData = {
  customerName: "",
  phone: "",
  email: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const UPI_ID = "itrrika@upi";

export default function Checkout() {
  const { items, clear } = useWishlist();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [step, setStep] = useState<Step>("address");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const bundle = getBundleInfo(items.length);
  const totalStr = formatPrice(bundle.price);

  const handleField = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const validateAddress = () => {
    const required: (keyof FormData)[] = ["customerName", "phone", "addressLine", "city", "state", "pincode"];
    for (const f of required) {
      if (!form[f].trim()) return `Please fill in: ${f.replace(/([A-Z])/g, " $1").toLowerCase()}`;
    }
    if (!/^\d{10}$/.test(form.phone)) return "Phone number must be 10 digits";
    if (!/^\d{6}$/.test(form.pincode)) return "Pincode must be 6 digits";
    return null;
  };

  const handleAddressNext = () => {
    const err = validateAddress();
    if (err) { setError(err); return; }
    setError("");
    setStep("payment");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          phone: form.phone,
          email: form.email || undefined,
          addressLine: form.addressLine,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          notes: form.notes || undefined,
          items: items.map(p => ({ id: p.id, name: p.name, size: p.size, price: p.price, quantity: 1 })),
          paymentMethod,
          totalAmount: totalStr,
        }),
      });
      if (!res.ok) throw new Error("Order failed");
      const data = await res.json();
      setOrderId(data.id);
      clear();
      setStep("confirmation");
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <h2 className="font-serif text-3xl text-foreground mb-4">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground mb-8 font-light">Add fragrances to your wishlist before checking out.</p>
          <a href="/collection" className="text-primary text-sm uppercase tracking-widest border-b border-primary/30 pb-1 hover:border-primary transition-colors">
            Browse Collection
          </a>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-secondary/20 border border-primary/20 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors";

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-20 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-3">Checkout</span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-10">Complete Your Order</h1>
        </motion.div>

        {step !== "confirmation" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left — Form */}
            <div className="lg:col-span-2 space-y-8">

              {/* Step 1 — Address */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                  <span className="text-primary text-sm">01</span> Delivery Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Full Name *</label>
                      <input data-testid="input-name" className={inputClass} placeholder="Your full name" value={form.customerName} onChange={e => handleField("customerName", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Phone *</label>
                      <input data-testid="input-phone" className={inputClass} placeholder="10-digit mobile number" maxLength={10} value={form.phone} onChange={e => handleField("phone", e.target.value.replace(/\D/g, ""))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Email (optional)</label>
                    <input data-testid="input-email" className={inputClass} placeholder="your@email.com" type="email" value={form.email} onChange={e => handleField("email", e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Address *</label>
                    <input data-testid="input-address" className={inputClass} placeholder="House no., Street, Area" value={form.addressLine} onChange={e => handleField("addressLine", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">City *</label>
                      <input data-testid="input-city" className={inputClass} placeholder="City" value={form.city} onChange={e => handleField("city", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">State *</label>
                      <input data-testid="input-state" className={inputClass} placeholder="State" value={form.state} onChange={e => handleField("state", e.target.value)} />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Pincode *</label>
                      <input data-testid="input-pincode" className={inputClass} placeholder="6-digit pincode" maxLength={6} value={form.pincode} onChange={e => handleField("pincode", e.target.value.replace(/\D/g, ""))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Order Notes (optional)</label>
                    <textarea data-testid="input-notes" className={`${inputClass} resize-none`} rows={2} placeholder="Any special instructions..." value={form.notes} onChange={e => handleField("notes", e.target.value)} />
                  </div>
                </div>
              </motion.div>

              {/* Step 2 — Payment Method */}
              {step === "payment" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <h2 className="font-serif text-2xl text-foreground mb-6 flex items-center gap-3">
                    <span className="text-primary text-sm">02</span> Payment Method
                  </h2>
                  <div className="space-y-4">
                    {/* UPI */}
                    <label data-testid="option-upi" className={`flex items-start gap-4 border p-5 cursor-pointer transition-colors duration-300 ${paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40"}`}>
                      <input type="radio" name="payment" className="mt-1 accent-yellow-600" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                      <div>
                        <p className="text-foreground text-sm uppercase tracking-widest font-medium">UPI Payment</p>
                        <p className="text-muted-foreground text-xs mt-1">Pay via any UPI app (Google Pay, PhonePe, Paytm). UPI ID will be shown after confirming.</p>
                      </div>
                    </label>
                    {/* COD */}
                    <label data-testid="option-cod" className={`flex items-start gap-4 border p-5 cursor-pointer transition-colors duration-300 ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-primary/20 hover:border-primary/40"}`}>
                      <input type="radio" name="payment" className="mt-1 accent-yellow-600" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                      <div>
                        <p className="text-foreground text-sm uppercase tracking-widest font-medium">Cash on Delivery</p>
                        <p className="text-muted-foreground text-xs mt-1">Pay with cash when your order arrives. Available across India.</p>
                      </div>
                    </label>
                  </div>

                  <p className="text-muted-foreground text-xs mt-4 leading-relaxed border-l-2 border-primary/30 pl-3">
                    By placing this order you agree to our{" "}
                    <a href="/policy" className="text-primary underline underline-offset-2">No Return Policy</a>.
                    All sales are final once confirmed.
                  </p>
                </motion.div>
              )}

              {error && (
                <p className="text-red-400 text-sm border border-red-400/30 bg-red-400/5 px-4 py-3">{error}</p>
              )}

              {step === "address" && (
                <button data-testid="button-continue-payment" onClick={handleAddressNext} className="w-full py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors">
                  Continue to Payment
                </button>
              )}
              {step === "payment" && (
                <div className="flex gap-4">
                  <button onClick={() => setStep("address")} className="flex-1 py-4 border border-primary/30 text-muted-foreground text-sm uppercase tracking-widest hover:border-primary/60 transition-colors">
                    Back
                  </button>
                  <button data-testid="button-place-order" onClick={handleSubmit} disabled={submitting} className="flex-2 flex-1 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50">
                    {submitting ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              )}
            </div>

            {/* Right — Order Summary */}
            <div>
              <div className="border border-primary/20 p-6 sticky top-28">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl text-foreground">Order Summary</h3>
                  {bundle.isBundle && (
                    <span className="text-xs uppercase tracking-widest border border-primary/40 text-primary px-2 py-1">
                      {bundle.name}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-xs mb-6">{items.length} fragrance{items.length !== 1 ? "s" : ""}</p>

                <div className="space-y-4 mb-6">
                  {items.map(p => (
                    <div key={p.id} className="flex items-center gap-3">
                      <img src={p.image} alt={p.name} className="w-12 h-16 object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-foreground text-sm truncate">{p.name}</p>
                        <p className="text-muted-foreground text-xs">{p.size}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-primary/10 pt-4 space-y-2">
                  {bundle.isBundle && (
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Standard price</span>
                      <span className="text-muted-foreground line-through">{formatPrice(items.length * 299)}</span>
                    </div>
                  )}
                  {bundle.savings > 0 && (
                    <div className="flex justify-between text-xs">
                      <span className="text-green-400">You save</span>
                      <span className="text-green-400 font-medium">{formatPrice(bundle.savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-muted-foreground text-sm uppercase tracking-widest">Total</span>
                    <span className="font-serif text-2xl text-primary">{totalStr}</span>
                  </div>
                </div>

                {bundle.nextBundle && (
                  <div className="mt-4 border border-primary/10 bg-primary/5 px-4 py-3 text-xs text-muted-foreground leading-relaxed">
                    Add {bundle.nextBundle.count - items.length} more fragrance{bundle.nextBundle.count - items.length !== 1 ? "s" : ""} for the{" "}
                    <span className="text-primary">{bundle.nextBundle.name}</span> bundle at{" "}
                    <span className="text-primary">{formatPrice(bundle.nextBundle.price)}</span>{" "}
                    and save {formatPrice(bundle.nextBundle.count * 299 - bundle.nextBundle.price)}.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {step === "confirmation" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto text-center py-12"
          >
            <div className="text-primary text-4xl mb-6">✦</div>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">Order Confirmed</h2>
            <p className="text-muted-foreground mb-2">Order #{orderId}</p>
            <p className="text-muted-foreground text-lg font-light mb-10">
              Thank you for your order. We will contact you shortly to confirm delivery details.
            </p>

            {paymentMethod === "upi" && (
              <div className="border border-primary/20 bg-primary/5 p-8 mb-10 text-left">
                <h3 className="font-serif text-xl text-foreground mb-4">Complete Your UPI Payment</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Please send <span className="text-primary font-medium">{totalStr}</span> to the UPI ID below and send the payment screenshot to our WhatsApp to confirm your order.
                </p>
                <div className="border border-primary/30 px-6 py-4 text-center mb-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">UPI ID</p>
                  <p className="font-serif text-2xl text-primary">{UPI_ID}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  After payment, send the screenshot to WhatsApp. Orders are dispatched only after payment confirmation.
                </p>
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="border border-primary/20 bg-primary/5 p-6 mb-10 text-left">
                <h3 className="font-serif text-lg text-foreground mb-2">Cash on Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Your order will be dispatched soon. Please keep <span className="text-primary font-medium">{totalStr}</span> ready at the time of delivery.
                </p>
              </div>
            )}

            <a
              href={`https://wa.me/919198447537?text=${encodeURIComponent(`Hi ITRRIKA! I just placed Order #${orderId}. Please confirm my order. Payment method: ${paymentMethod === "upi" ? "UPI" : "Cash on Delivery"}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-primary text-primary px-8 py-4 text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <SiWhatsapp size={16} />
              Confirm on WhatsApp
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
