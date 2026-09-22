import { Link } from "react-router-dom";
import {
  AlertTriangle,
  PackageX,
  Clock,
  ChevronRight,
  Package,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { getOrderList } from "../data/orders";
import { formatCurrency, formatDate } from "../utils/helpers";
import Navbar from "../components/Navbar";
import "./OrderListPage.css";

const statusConfig = {
  delayed: {
    icon: AlertTriangle,
    color: "warning",
    label: "Delayed Order",
    badgeLabel: "ETA Passed",
    scenarioNum: "Situation 1",
    tagline: "Estimated delivery time passed due to severe weather delay.",
    bg: "card-bg-warning",
  },
  "not-received": {
    icon: PackageX,
    color: "error",
    label: "Delivered / Missing",
    badgeLabel: "Issue Reported",
    scenarioNum: "Situation 2",
    tagline: "Marked delivered by courier, customer reports package not found.",
    bg: "card-bg-error",
  },
  "no-tracking": {
    icon: Clock,
    color: "info",
    label: "Tracking Pending",
    badgeLabel: "Processing",
    scenarioNum: "Situation 3",
    tagline: "Order confirmed & packing in fulfillment hub; tracking coming soon.",
    bg: "card-bg-info",
  },
};

export default function OrderListPage() {
  const orders = getOrderList();

  return (
    <div className="app-container">
      <Navbar title="Order Tracking Hub" showBack={false} />

      <main className="order-list-page">
        {/* Assessment Banner */}
        <div className="assessment-badge-card animate-fade-in-up">
          <div className="badge-sparkle-row">
            <span className="star-icon">⭐</span>
            <span className="badge-text">Frontend Developer Assessment</span>
          </div>
          <h2 className="assessment-title">Mobile Order Tracking Redesign</h2>
          <p className="assessment-sub">
            Designed for 360–430px mobile viewports. Demonstrates all 3 required tracking states with animated milestones, interactive claim filing, and support triage.
          </p>
        </div>

        <div className="section-divider">
          <span>Select a Delivery Scenario to Test</span>
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
                <div className="scenario-tag-row">
                  <span className={`scenario-number-tag tag-${config?.color}`}>
                    {config?.scenarioNum}
                  </span>
                  <span className="card-date">Placed {formatDate(order.placedAt)}</span>
                </div>

                <div className="card-header">
                  <div className={`card-status-icon card-icon-${config?.color}`}>
                    <StatusIcon size={20} strokeWidth={2.2} />
                  </div>
                  <div className="card-info">
                    <span className="card-order-num">{order.orderNumber}</span>
                    <span className="card-scenario-title">{config?.label}</span>
                  </div>
                  <div className="card-enter-btn">
                    <ArrowRight size={16} />
                  </div>
                </div>

                <div className="card-scenario-desc">
                  <p>{config?.tagline}</p>
                </div>

                <div className="card-body">
                  <div className="card-items-preview">
                    <Package size={14} className="box-preview-icon" />
                    <span className="card-item-name">{order.firstItemName}</span>
                    {order.itemCount > 1 && (
                      <span className="card-more">+{order.itemCount - 1} more</span>
                    )}
                  </div>
                </div>

                <div className="card-footer">
                  <span className={`card-badge card-badge-${config?.color}`}>
                    {config?.badgeLabel}
                  </span>
                  <div className="card-price-group">
                    <span className="total-label">Total</span>
                    <span className="card-total">{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="guarantee-footer-card animate-fade-in-up animate-delay-4">
          <ShieldCheck size={20} className="shield-icon" />
          <div>
            <strong>Vecosoft Delivery Protection</strong>
            <p>Every shipment backed by instant replacements or full refund guarantee.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
