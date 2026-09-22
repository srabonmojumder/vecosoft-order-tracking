import {
  Phone,
  Mail,
  MessageCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import "./SupportSection.css";

export default function SupportSection({ order }) {
  return (
    <div className="support-card animate-fade-in-up animate-delay-5">
      <h3 className="section-title">Need Help?</h3>

      <div className="support-actions">
        <button className="support-btn" aria-label="Call support">
          <div className="support-btn-icon support-btn-phone">
            <Phone size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Call Us</span>
            <span className="support-btn-sub">Mon-Fri, 9am-6pm</span>
          </div>
          <ChevronRight size={16} className="support-chevron" />
        </button>

        <button className="support-btn" aria-label="Email support">
          <div className="support-btn-icon support-btn-email">
            <Mail size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Email Support</span>
            <span className="support-btn-sub">Response in 24h</span>
          </div>
          <ChevronRight size={16} className="support-chevron" />
        </button>

        <button className="support-btn" aria-label="Live chat">
          <div className="support-btn-icon support-btn-chat">
            <MessageCircle size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Live Chat</span>
            <span className="support-btn-sub">Available now</span>
          </div>
          <div className="live-indicator" />
          <ChevronRight size={16} className="support-chevron" />
        </button>
      </div>

      {order.status === "not-received" && (
        <button className="report-issue-btn">
          <AlertCircle size={18} />
          <span>File a Missing Package Claim</span>
          <ChevronRight size={16} />
        </button>
      )}

      {order.status === "delayed" && (
        <button className="report-issue-btn report-issue-warning">
          <AlertCircle size={18} />
          <span>Request Delivery Update</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
