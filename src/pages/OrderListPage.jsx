import { Link } from "react-router-dom";
import {
  AlertTriangle,
  PackageX,
  Clock,
  ChevronRight,
  Package,
} from "lucide-react";
import { getOrderList } from "../data/orders";
import { formatCurrency, formatDate } from "../utils/helpers";
import Navbar from "../components/Navbar";
import "./OrderListPage.css";

const statusConfig = {
  delayed: {
    icon: AlertTriangle,
    color: "warning",
    label: "Delayed",
    bg: "card-bg-warning",
  },
  "not-received": {
    icon: PackageX,
    color: "error",
    label: "Not Received",
    bg: "card-bg-error",
  },
  "no-tracking": {
    icon: Clock,
    color: "info",
    label: "No Tracking",
    bg: "card-bg-info",
  },
};

export default function OrderListPage() {
  const orders = getOrderList();

  return (
    <div className="app-container">
      <Navbar title="Order Tracking" showBack={false} />
      <main className="order-list-page">
        <div className="page-intro animate-fade-in-up">
          <div className="intro-icon">
            <Package size={24} />
          </div>
          <h2 className="page-heading">Your Orders</h2>
          <p className="page-sub">
            Track your deliveries and manage your orders
          </p>
        </div>

        <div className="order-cards">
          {orders.map((order, index) => {
            const config = statusConfig[order.status];
            const StatusIcon = config?.icon || Package;
            return (
              <Link
                to={`/order/${order.id}`}
                key={order.id}
                className={`order-card ${config?.bg || ""} animate-fade-in-up animate-delay-${index + 1}`}
                aria-label={`View ${order.orderNumber} - ${config?.label}`}
              >
                <div className="card-header">
                  <div className={`card-status-icon card-icon-${config?.color}`}>
                    <StatusIcon size={20} strokeWidth={2} />
                  </div>
                  <div className="card-info">
                    <span className="card-order-num">{order.orderNumber}</span>
                    <span className="card-date">
                      {formatDate(order.placedAt)}
                    </span>
                  </div>
                  <ChevronRight size={18} className="card-chevron" />
                </div>
                <div className="card-body">
                  <span className="card-item-name">{order.firstItemName}</span>
                  {order.itemCount > 1 && (
                    <span className="card-more">
                      +{order.itemCount - 1} more
                    </span>
                  )}
                </div>
                <div className="card-footer">
                  <span className={`card-badge card-badge-${config?.color}`}>
                    {config?.label}
                  </span>
                  <span className="card-total">{formatCurrency(order.total)}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="demo-note animate-fade-in-up animate-delay-5">
          <p>
            ↑ Each card demonstrates a different tracking state. Tap to explore.
          </p>
        </div>
      </main>
    </div>
  );
}
