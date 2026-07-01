import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";

const ADMIN_KEY = "itrrika-admin-2024";

interface OrderItem {
  id: string;
  name: string;
  size: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  customerName: string;
  phone: string;
  email?: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  paymentMethod: string;
  totalAmount: string;
  status: string;
  notes?: string;
  createdAt: string;
}

type Status = "pending" | "confirmed" | "shipped" | "delivered";

const STATUS_META: Record<Status, { label: string; color: string; next: Status | null; nextLabel: string; waMsg: (o: Order) => string }> = {
  pending: {
    label: "Pending",
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    next: "confirmed",
    nextLabel: "Confirm Order",
    waMsg: (o) => `Hi ${o.customerName}! 🎉 Your ITRRIKA order #${o.id} (${o.totalAmount}) has been confirmed. We're preparing your fragrances and will update you when dispatched. Thank you for choosing ITRRIKA! 🌹`,
  },
  confirmed: {
    label: "Confirmed",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/5",
    next: "shipped",
    nextLabel: "Mark Shipped",
    waMsg: (o) => `Hi ${o.customerName}! 📦 Great news — your ITRRIKA order #${o.id} has been shipped! Your fragrances are on their way. Contact us if you need any help. ✨`,
  },
  shipped: {
    label: "Shipped",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/5",
    next: "delivered",
    nextLabel: "Mark Delivered",
    waMsg: (o) => `Hi ${o.customerName}! ✅ Your ITRRIKA order #${o.id} has been delivered. We hope you love your fragrances! Please share your experience with us on Instagram @itrrika_fragrance 🌸`,
  },
  delivered: {
    label: "Delivered",
    color: "text-green-400 border-green-400/30 bg-green-400/5",
    next: null,
    nextLabel: "",
    waMsg: () => "",
  },
};

const getStatusMeta = (status: string) =>
  STATUS_META[status as Status] ?? STATUS_META.pending;

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [updating, setUpdating] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleLogin = async () => {
    if (password !== ADMIN_KEY) { setError("Incorrect password"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders?adminKey=${encodeURIComponent(ADMIN_KEY)}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setOrders(data);
      setAuthed(true);
    } catch {
      setError("Failed to load orders. Check your connection.");
    } finally {
      setLoading(false);
    }
  };
  const deleteOrder = async (orderId: number) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
  try {
    const res = await fetch(`/api/orders/${orderId}?adminKey=${encodeURIComponent(ADMIN_KEY)}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error();
    setOrders(prev => prev.filter(o => o.id !== orderId));
  } catch {
    alert("Failed to delete order. Please try again.");
  }
};
  
};

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?adminKey=${encodeURIComponent(ADMIN_KEY)}`);
      const data = await res.json();
      setOrders(data);
    } catch { /* silently fail */ }
    finally { setLoading(false); }
  };

  const updateStatus = async (order: Order, newStatus: Status) => {
    setUpdating(order.id);
    try {
      const res = await fetch(`/api/orders/${order.id}/status?adminKey=${encodeURIComponent(ADMIN_KEY)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error();
      const updated: Order = await res.json();
      setOrders(prev => prev.map(o => o.id === order.id ? updated : o));
    } catch {
      alert("Failed to update order status. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="text-center mb-10">
            <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-3">ITRRIKA</span>
            <h1 className="font-serif text-3xl text-foreground">Admin Dashboard</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground block mb-2">Password</label>
              <input
                data-testid="input-admin-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Enter admin password"
                className="w-full bg-secondary/20 border border-primary/20 text-foreground placeholder:text-muted-foreground px-4 py-3 text-sm focus:outline-none focus:border-primary/60 transition-colors"
              />
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              data-testid="button-admin-login"
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Enter"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const totalRevenue = orders.reduce((sum, o) => sum + (parseInt(o.totalAmount.replace(/[^\d]/g, ""), 10) || 0), 0);
  const filtered = filterStatus === "all" ? orders : orders.filter(o => o.status === filterStatus);

  return (
    <div className="w-full bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-primary text-xs uppercase tracking-[0.3em] block mb-2">Admin</span>
            <h1 className="font-serif text-4xl text-foreground">Order Book</h1>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1"
          >
            {loading ? "Refreshing..." : "↻ Refresh"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Orders", value: orders.length.toString() },
            { label: "Total Revenue", value: `₹${totalRevenue}` },
            { label: "Pending", value: orders.filter(o => o.status === "pending").length.toString() },
            { label: "Delivered", value: orders.filter(o => o.status === "delivered").length.toString() },
          ].map(stat => (
            <div key={stat.label} className="border border-primary/20 p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{stat.label}</p>
              <p className="font-serif text-3xl text-primary">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["all", "pending", "confirmed", "shipped", "delivered"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
                filterStatus === s
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-primary/15 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {s === "all" ? `All (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>

        {/* Orders */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <p className="font-serif text-2xl mb-2">No orders {filterStatus !== "all" ? `with status "${filterStatus}"` : "yet"}</p>
            <p className="text-sm">Orders placed through the website will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order, i) => {
              const meta = getStatusMeta(order.status);
              const isExpanded = expanded === order.id;
              const isUpdating = updating === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="border border-primary/15 hover:border-primary/25 transition-colors"
                  data-testid={`order-row-${order.id}`}
                >
                  {/* Collapsed row */}
                  <div className="flex flex-wrap items-center gap-3 p-4">
                    <button
                      className="flex flex-wrap items-center gap-3 flex-1 text-left min-w-0"
                      onClick={() => setExpanded(isExpanded ? null : order.id)}
                    >
                      <span className="text-primary font-serif text-base w-10 shrink-0">#{order.id}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium truncate text-sm">{order.customerName}</p>
                        <p className="text-muted-foreground text-xs">{order.phone} · {order.city}, {order.state}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-primary font-serif">{order.totalAmount}</p>
                        <p className="text-muted-foreground text-xs uppercase">{order.paymentMethod}</p>
                      </div>
                      <span className={`text-xs uppercase tracking-widest border px-2 py-1 shrink-0 ${meta.color}`}>
                        {meta.label}
                      </span>
                      <span className="text-muted-foreground text-xs shrink-0 hidden sm:block">{formatDate(order.createdAt)}</span>
                      <span className="text-primary">{isExpanded ? "−" : "+"}</span>
                    </button>

                    {/* Quick status action — visible even when collapsed */}
                    {meta.next && (
                      <button
                        onClick={() => updateStatus(order, meta.next!)}
                        disabled={isUpdating}
                        data-testid={`button-status-${order.id}`}
                        className="shrink-0 text-xs uppercase tracking-widest border border-primary/40 text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-40"
                      >
                        {isUpdating ? "..." : meta.nextLabel}
                      </button>
                    )}
                  </div>

                  {/* Expanded detail */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-primary/10 p-5 grid grid-cols-1 md:grid-cols-2 gap-8">

                          {/* Address + Actions */}
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-primary mb-4">Delivery Address</h4>
                            <p className="text-foreground text-sm font-medium">{order.customerName}</p>
                            <p className="text-muted-foreground text-sm">{order.addressLine}</p>
                            <p className="text-muted-foreground text-sm">{order.city}, {order.state} — {order.pincode}</p>
                            <p className="text-muted-foreground text-sm mt-1">📞 {order.phone}</p>
                            {order.email && <p className="text-muted-foreground text-sm">✉️ {order.email}</p>}
                            {order.notes && (
                              <p className="text-muted-foreground text-xs mt-3 italic border-l-2 border-primary/20 pl-3">
                                Note: {order.notes}
                              </p>
                            )}

                            {/* Status pipeline */}
                            <div className="mt-6">
                              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Update Status</p>
                              <div className="flex flex-wrap gap-2">
                                {(["pending", "confirmed", "shipped", "delivered"] as Status[]).map(s => (
                                  <button
                                    key={s}
                                    onClick={() => updateStatus(order, s)}
                                    disabled={isUpdating || order.status === s}
                                    className={`text-xs uppercase tracking-widest px-3 py-2 border transition-all disabled:opacity-40 ${
                                      order.status === s
                                        ? `${getStatusMeta(s).color} cursor-default`
                                        : "border-primary/20 text-muted-foreground hover:border-primary hover:text-primary"
                                    }`}
                                  >
                                    {isUpdating && order.status !== s ? "..." : getStatusMeta(s).label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* WhatsApp actions */}
                            <div className="mt-5 flex flex-wrap gap-2">
                              <a
                                href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(meta.waMsg(order))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary border border-primary/30 px-3 py-2 hover:bg-primary/10 transition-colors"
                              >
                                <SiWhatsapp size={12} />
                                Send Status Update
                              </a>
                              <a
                                href={`https://wa.me/91${order.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground border border-primary/15 px-3 py-2 hover:border-primary/40 hover:text-primary transition-colors"
                              >
                                <SiWhatsapp size={12} />
                                Open Chat
                              </a>
                              <button
  onClick={() => deleteOrder(order.id)}
  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 border border-red-400/30 px-3 py-2 hover:bg-red-400/10 transition-colors"
>
  Delete Order
</button>
                            </div>
                          </div>

                          {/* Items ordered */}
                          <div>
                            <h4 className="text-xs uppercase tracking-widest text-primary mb-4">Items Ordered</h4>
                            <div className="space-y-3 mb-4">
                              {(order.items as OrderItem[]).map((item, j) => (
                                <div key={j} className="flex justify-between text-sm border-b border-primary/5 pb-3">
                                  <div>
                                    <p className="text-foreground">{item.name}</p>
                                    <p className="text-muted-foreground text-xs">{item.size} · Qty: {item.quantity}</p>
                                  </div>
                                  <span className="text-primary shrink-0">{item.price}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center pt-1">
                              <span className="text-muted-foreground text-xs uppercase tracking-widest">Total</span>
                              <span className="font-serif text-xl text-primary">{order.totalAmount}</span>
                            </div>

                            {/* Order meta */}
                            <div className="mt-6 border border-primary/10 p-4 space-y-2">
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground uppercase tracking-widest">Payment</span>
                                <span className="text-foreground uppercase">{order.paymentMethod}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground uppercase tracking-widest">Ordered</span>
                                <span className="text-foreground">{formatDate(order.createdAt)}</span>
                              </div>
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground uppercase tracking-widest">Status</span>
                                <span className={`uppercase tracking-widest ${meta.color.split(" ")[0]}`}>{meta.label}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
