import {
  MapPin,
  Truck,
  Copy,
  CalendarClock,
  Check,
} from "lucide-react";
import { formatDate } from "../utils/helpers";
import { useState } from "react";
import "./DeliveryInfo.css";

export default function DeliveryInfo({ order }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (order.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="delivery-info-card animate-fade-in-up animate-delay-4">
      <h3 className="section-title">Delivery Details</h3>

      {/* Estimated / Actual Delivery */}
      <div className="info-group">
        <div className="info-icon-wrapper info-icon-calendar">
          <CalendarClock size={16} />
        </div>
        <div className="info-content">
          <span className="info-label">
            {order.actualDelivery
              ? "Delivered On"
              : order.revisedDelivery
              ? "Revised Delivery"
              : "Estimated Delivery"}
          </span>
          <span className="info-value">
            {formatDate(
              order.actualDelivery ||
                order.revisedDelivery ||
                order.estimatedDelivery
            )}
          </span>
          {order.revisedDelivery && !order.actualDelivery && (
            <span className="info-original">
              Originally: {formatDate(order.estimatedDelivery)}
            </span>
          )}
        </div>
      </div>

      {/* Tracking Number */}
      {order.trackingNumber ? (
        <div className="info-group">
          <div className="info-icon-wrapper info-icon-truck">
            <Truck size={16} />
          </div>
          <div className="info-content">
            <span className="info-label">
              {order.carrier} Tracking
            </span>
            <div className="tracking-row">
              <span className="tracking-number">{order.trackingNumber}</span>
              <button
                className="copy-btn"
                onClick={handleCopy}
                aria-label="Copy tracking number"
              >
                {copied ? (
                  <Check size={14} className="copy-check" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="info-group">
          <div className="info-icon-wrapper info-icon-truck">
            <Truck size={16} />
          </div>
          <div className="info-content">
            <span className="info-label">Tracking Number</span>
            <span className="info-value info-value-pending">
              Pending — will be assigned once shipped
            </span>
          </div>
        </div>
      )}

      {/* Shipping Address */}
      <div className="info-group">
        <div className="info-icon-wrapper info-icon-pin">
          <MapPin size={16} />
        </div>
        <div className="info-content">
          <span className="info-label">Shipping Address</span>
          <address className="info-address">
            {order.shippingAddress.name}
            <br />
            {order.shippingAddress.street}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </address>
        </div>
      </div>
    </div>
  );
}
