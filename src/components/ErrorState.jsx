import { AlertOctagon, RefreshCw, Headphones } from "lucide-react";
import "./ErrorState.css";

export default function ErrorState({ onRetry }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon-wrapper">
        <AlertOctagon size={40} strokeWidth={1.5} />
      </div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">
        We couldn't load your order details. Please check your connection and try again.
      </p>
      <div className="error-actions">
        <button className="error-retry-btn" onClick={onRetry}>
          <RefreshCw size={16} />
          <span>Try Again</span>
        </button>
        <button className="error-support-btn">
          <Headphones size={16} />
          <span>Contact Support</span>
        </button>
      </div>
    </div>
  );
}
