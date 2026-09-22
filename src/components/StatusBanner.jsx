import {
  AlertTriangle,
  PackageX,
  Clock,
  RefreshCw,
  Headphones,
  ChevronRight,
} from "lucide-react";
import "./StatusBanner.css";

const bannerConfig = {
  delayed: {
    icon: AlertTriangle,
    title: "Delivery Delayed",
    colorClass: "banner-warning",
    iconBg: "icon-bg-warning",
  },
  "not-received": {
    icon: PackageX,
    title: "Not Received?",
    colorClass: "banner-error",
    iconBg: "icon-bg-error",
  },
  "no-tracking": {
    icon: Clock,
    title: "Tracking Coming Soon",
    colorClass: "banner-info",
    iconBg: "icon-bg-info",
  },
};

export default function StatusBanner({ order }) {
  const config = bannerConfig[order.status];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div
      className={`status-banner ${config.colorClass} animate-fade-in-up`}
      role="status"
      aria-live="polite"
    >
      <div className="banner-content">
        <div className={`banner-icon ${config.iconBg}`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
        <div className="banner-text">
          <h2 className="banner-title">{config.title}</h2>
          {order.status === "delayed" && (
            <p className="banner-description">
              {order.delayReason ||
                "Your delivery has been delayed. We're working to get it to you as soon as possible."}
            </p>
          )}
          {order.status === "not-received" && (
            <p className="banner-description">
              Our records show this was delivered on{" "}
              <strong>
                {new Date(order.actualDelivery).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </strong>
              . If you didn't receive it, we're here to help.
            </p>
          )}
          {order.status === "no-tracking" && (
            <p className="banner-description">
              Your order is confirmed and being prepared. Tracking details will
              be available once it ships.
            </p>
          )}
        </div>
      </div>

      {order.status === "delayed" && order.revisedDelivery && (
        <div className="banner-eta">
          <RefreshCw size={14} />
          <span>
            New estimated delivery:{" "}
            <strong>
              {new Date(order.revisedDelivery).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </strong>
          </span>
        </div>
      )}

      {order.status === "not-received" && (
        <button className="banner-action banner-action-error">
          <Headphones size={16} />
          <span>Report Missing Package</span>
          <ChevronRight size={16} />
        </button>
      )}

      {order.status === "no-tracking" && (
        <div className="banner-reassurance">
          <div className="reassurance-dot" />
          <span>We'll notify you when tracking is available</span>
        </div>
      )}
    </div>
  );
}
