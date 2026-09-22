import { formatDate } from "../utils/helpers";
import { getStatusColor } from "../utils/helpers";
import { Calendar, Hash } from "lucide-react";
import "./OrderHeader.css";

const statusLabels = {
  delayed: "Delayed",
  "not-received": "Issue Reported",
  "no-tracking": "Processing",
  delivered: "Delivered",
};

export default function OrderHeader({ order }) {
  const colorScheme = getStatusColor(order.status);

  return (
    <div className="order-header animate-fade-in-up animate-delay-1">
      <div className="order-header-top">
        <div className="order-number-group">
          <div className="order-number-icon">
            <Hash size={14} strokeWidth={2.5} />
          </div>
          <span className="order-number">{order.orderNumber}</span>
        </div>
        <span className={`status-badge status-badge-${colorScheme}`}>
          {statusLabels[order.status] || order.statusLabel}
        </span>
      </div>
      <div className="order-date">
        <Calendar size={13} />
        <span>Placed on {formatDate(order.placedAt)}</span>
      </div>
    </div>
  );
}
