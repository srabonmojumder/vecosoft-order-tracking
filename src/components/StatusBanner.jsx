import {
  AlertTriangle,
  PackageX,
  Clock,
  RefreshCw,
  Headphones,
  ChevronRight,
  Bell,
  Check,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
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

export default function StatusBanner({ order, onOpenReport, onOpenChat, onNotifyMe }) {
  const [subscribed, setSubscribed] = useState(false);
  const config = bannerConfig[order.status];
  if (!config) return null;

  const Icon = config.icon;

  const handleNotify = () => {
    setSubscribed(true);
    if (onNotifyMe) onNotifyMe();
  };

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
                "Your delivery has been delayed due to regional weather. We're prioritizing your parcel."}
            </p>
          )}
          {order.status === "not-received" && (
            <p className="banner-description">
              Our courier records show this was delivered on{" "}
              <strong>
                {new Date(order.actualDelivery).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </strong>
              . If you didn't receive it, we're here to help immediately.
            </p>
          )}
          {order.status === "no-tracking" && (
            <p className="banner-description">
              Your order is confirmed and being prepared in the fulfillment hub. Tracking will be assigned once it ships.
            </p>
          )}
        </div>
      </div>

      {order.status === "delayed" && order.revisedDelivery && (
        <div className="banner-eta-row">
          <div className="banner-eta">
            <RefreshCw size={14} className="spin-slow" />
            <span>
              New ETA:{" "}
              <strong>
                {new Date(order.revisedDelivery).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </strong>
            </span>
          </div>

          <button
            type="button"
            className="banner-mini-action"
            onClick={onOpenChat}
          >
            <MessageSquare size={13} />
            <span>Ask Support</span>
          </button>
        </div>
      )}

      {order.status === "not-received" && (
        <button
          type="button"
          className="banner-action banner-action-error"
          onClick={onOpenReport}
        >
          <Headphones size={16} />
          <span>Report Missing Package (Instant Resolution)</span>
          <ChevronRight size={16} />
        </button>
      )}

      {order.status === "no-tracking" && (
        <div className="banner-actions-no-tracking">
          <div className="banner-reassurance">
            <div className="reassurance-dot" />
            <span>We'll notify you automatically via SMS & Email</span>
          </div>
          <button
            type="button"
            className={`notify-toggle-btn ${subscribed ? "subscribed" : ""}`}
            onClick={handleNotify}
          >
            {subscribed ? (
              <>
                <Check size={14} />
                <span>Alerts Enabled</span>
              </>
            ) : (
              <>
                <Bell size={14} />
                <span>Get SMS Alerts</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
