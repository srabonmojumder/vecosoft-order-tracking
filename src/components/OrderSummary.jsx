import {
  Headphones,
  BookOpen,
  ShieldCheck,
  Smartphone,
  Package,
  Receipt,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "../utils/helpers";
import "./OrderSummary.css";

// Simple icon mapping for mock product images
const productIcons = {
  headphones: Headphones,
  cable: Smartphone,
  airpods: Headphones,
  kindle: BookOpen,
  cover: ShieldCheck,
  protector: Smartphone,
};

export default function OrderSummary({ order, onToast }) {
  const [expanded, setExpanded] = useState(true);

  const handleDownloadInvoice = () => {
    if (onToast) {
      onToast(`Invoice #${order.orderNumber}.pdf downloaded!`, "success");
    }
  };

  return (
    <div className="order-summary-card animate-fade-in-up animate-delay-3">
      <div className="summary-header-row">
        <h3 className="section-title">
          Order Summary
          <span className="item-count">
            {order.items.length} item{order.items.length > 1 ? "s" : ""}
          </span>
        </h3>
        <button
          type="button"
          className="collapse-toggle-btn"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-label="Toggle items list"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="items-list animate-fade">
          {order.items.map((item) => {
            const ItemIcon = productIcons[item.image] || Package;
            return (
              <div key={item.id} className="item-row">
                <div className="item-image">
                  <ItemIcon size={22} strokeWidth={1.5} />
                </div>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <div className="item-meta">
                    <span className="item-variant">{item.variant}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                </div>
                <span className="item-price">{formatCurrency(item.price)}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="total-row">
          <span>Shipping</span>
          <span className="text-free-shipping">
            {order.shipping === 0 ? "Free Shipping" : formatCurrency(order.shipping)}
          </span>
        </div>
        <div className="total-row">
          <span>Estimated Sales Tax</span>
          <span>{formatCurrency(order.tax)}</span>
        </div>
        <div className="total-row total-row-final">
          <span>Order Total</span>
          <span className="final-price">{formatCurrency(order.total)}</span>
        </div>
      </div>

      <button
        type="button"
        className="invoice-download-btn"
        onClick={handleDownloadInvoice}
      >
        <Receipt size={15} />
        <span>Download Receipt (PDF)</span>
        <Download size={14} className="download-icon" />
      </button>
    </div>
  );
}
