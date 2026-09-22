import { useState } from "react";
import {
  Truck,
  MapPin,
  Compass,
  AlertTriangle,
  Camera,
  CheckCircle2,
  Building,
  Navigation,
} from "lucide-react";
import "./DeliveryMap.css";

export default function DeliveryMap({ order, onOpenReport }) {
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  return (
    <div className="delivery-map-card animate-fade-in-up">
      <div className="map-radar-container">
        {/* Decorative Grid Lines */}
        <div className="map-grid-bg" />

        {/* Status 1: DELAYED / OUT FOR DELIVERY */}
        {order.status === "delayed" && (
          <div className="map-state-active">
            <svg className="map-transit-path" viewBox="0 0 320 120" preserveAspectRatio="none">
              <path
                d="M 20 80 Q 90 20 160 65 T 300 40"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              <path
                d="M 20 80 Q 90 20 160 65"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="4"
                className="path-animated"
              />
            </svg>

            {/* Warehouse origin marker */}
            <div className="map-pin origin-pin" style={{ left: "20px", top: "72px" }}>
              <div className="pin-dot">
                <Building size={14} />
              </div>
              <span className="pin-tooltip">UPS Depot</span>
            </div>

            {/* Courier driver live marker */}
            <div className="map-pin driver-pin" style={{ left: "152px", top: "48px" }}>
              <div className="radar-ping radar-warning" />
              <div className="pin-badge pin-badge-warning">
                <Truck size={16} />
              </div>
              <div className="driver-speech-bubble">
                <AlertTriangle size={12} />
                <span>Heavy snowfall delay</span>
              </div>
            </div>

            {/* Destination marker */}
            <div className="map-pin destination-pin" style={{ right: "18px", top: "30px" }}>
              <div className="pin-dot pin-dot-home">
                <MapPin size={14} />
              </div>
              <span className="pin-tooltip">Your Home</span>
            </div>
          </div>
        )}

        {/* Status 2: NOT RECEIVED / MARKED DELIVERED */}
        {order.status === "not-received" && (
          <div className="map-state-delivered">
            <div className="map-pin delivered-pin" style={{ left: "50%", top: "45%" }}>
              <div className="radar-ping radar-error" />
              <div className="pin-badge pin-badge-error">
                <MapPin size={20} />
              </div>
            </div>

            <div className="delivery-dropoff-card">
              <div className="dropoff-header">
                <CheckCircle2 size={16} className="text-emerald" />
                <span>Courier reported delivered to Front Door</span>
              </div>
              <p className="dropoff-sub">
                Carrier: USPS Priority • GPS Logged Dec 14, 3:32 PM
              </p>
              <button
                type="button"
                className="proof-photo-btn"
                onClick={() => setShowPhotoModal(true)}
              >
                <Camera size={14} />
                <span>View Delivery Proof Photo</span>
              </button>
            </div>
          </div>
        )}

        {/* Status 3: TRACKING NOT AVAILABLE YET */}
        {order.status === "no-tracking" && (
          <div className="map-state-pending">
            <div className="pending-warehouse-visual">
              <div className="warehouse-icon-glow">
                <Building size={28} />
              </div>
              <div className="conveyor-dots">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="pending-text-wrap">
              <strong>Fulfillment Center Dispatch Center</strong>
              <p>Your package is being securely packaged & awaiting carrier pickup.</p>
            </div>
          </div>
        )}

        {/* Floating Map Overlay Badge */}
        <div className="map-top-bar">
          <div className="map-carrier-chip">
            <Navigation size={12} />
            <span>
              {order.status === "delayed"
                ? "Live Courier Transit Route"
                : order.status === "not-received"
                ? "Delivery Drop-Off Location"
                : "Fulfillment Origin"}
            </span>
          </div>

          {order.status === "delayed" && (
            <div className="live-gps-badge">
              <span className="gps-live-dot" />
              <span>GPS Active</span>
            </div>
          )}
        </div>
      </div>

      {/* Proof Photo Modal */}
      {showPhotoModal && (
        <div className="photo-modal-backdrop" onClick={() => setShowPhotoModal(false)}>
          <div className="photo-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="photo-modal-header">
              <strong>Courier Delivery Proof Photo</strong>
              <button className="photo-close" onClick={() => setShowPhotoModal(false)}>
                ✕
              </button>
            </div>
            <div className="photo-display">
              {/* Simulated delivery snapshot */}
              <div className="mock-porch-photo">
                <div className="camera-timestamp">
                  USPS DRIVER CAM • DEC 14, 2024 15:32:04 EST
                </div>
                <div className="photo-package-box">
                  <div className="box-tape" />
                  <span className="box-label">ORD-2024-65219</span>
                </div>
                <div className="door-mat">WELCOME</div>
              </div>
            </div>
            <div className="photo-footer">
              <p>Recognize this door or porch? If this is not your residence:</p>
              <button
                className="photo-dispute-btn"
                onClick={() => {
                  setShowPhotoModal(false);
                  if (onOpenReport) onOpenReport();
                }}
              >
                <span>This isn't my house — File Dispute</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
