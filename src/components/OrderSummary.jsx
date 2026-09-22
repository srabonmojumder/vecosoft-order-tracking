import {
  Headphones,
  Laptop,
  BookOpen,
  ShieldCheck,
  Smartphone,
  Package,
} from "lucide-react";
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

export default function OrderSummary({ order }) {
  return (
    <div className="order-summary-card animate-fade-in-up animate-delay-3">
      <h3 className="section-title">
        Order Summary
        <span className="item-count">
          {order.items.length} item{order.items.length > 1 ? "s" : ""}
        </span>
      </h3>

      <div className="items-list">
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

      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="total-row">
          <span>Shipping</span>
          <span>{order.shipping === 0 ? "Free" : formatCurrency(order.shipping)}</span>
        </div>
        <div className="total-row">
          <span>Tax</span>
          <span>{formatCurrency(order.tax)}</span>
        </div>
        <div className="total-row total-row-final">
          <span>Total</span>
          <span>{formatCurrency(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
