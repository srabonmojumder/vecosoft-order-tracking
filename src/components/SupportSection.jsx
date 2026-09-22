import {
  Phone,
  Mail,
  MessageCircle,
  AlertCircle,
  ChevronRight,
  Shield,
} from "lucide-react";
import "./SupportSection.css";

export default function SupportSection({
  order,
  onOpenChat,
  onOpenReport,
  onCallSupport,
  onEmailSupport,
}) {
  return (
    <div className="support-card animate-fade-in-up animate-delay-5">
      <div className="support-card-header">
        <h3 className="section-title">Need Help with this Order?</h3>
        <span className="guarantee-chip">
          <Shield size={12} />
          Protected by VecoCare
        </span>
      </div>

      <div className="support-actions">
        <button
          type="button"
          className="support-btn"
          onClick={onOpenChat}
          aria-label="Start live chat"
        >
          <div className="support-btn-icon support-btn-chat">
            <MessageCircle size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Live Support Chat</span>
            <span className="support-btn-sub">Instant response • 24/7 Available</span>
          </div>
          <div className="live-indicator" />
          <ChevronRight size={16} className="support-chevron" />
        </button>

        <button
          type="button"
          className="support-btn"
          onClick={onCallSupport}
          aria-label="Call priority support"
        >
          <div className="support-btn-icon support-btn-phone">
            <Phone size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Toll-Free Phone Support</span>
            <span className="support-btn-sub">1-800-555-VECO • Dedicated Desk</span>
          </div>
          <ChevronRight size={16} className="support-chevron" />
        </button>

        <button
          type="button"
          className="support-btn"
          onClick={onEmailSupport}
          aria-label="Email support"
        >
          <div className="support-btn-icon support-btn-email">
            <Mail size={18} />
          </div>
          <div className="support-btn-content">
            <span className="support-btn-label">Email Support Desk</span>
            <span className="support-btn-sub">support@vecosoft.com</span>
          </div>
          <ChevronRight size={16} className="support-chevron" />
        </button>
      </div>

      {order.status === "not-received" && (
        <button
          type="button"
          className="report-issue-btn"
          onClick={onOpenReport}
        >
          <AlertCircle size={18} />
          <span>File a Missing Package Claim (Instant Resolution)</span>
          <ChevronRight size={16} />
        </button>
      )}

      {order.status === "delayed" && (
        <button
          type="button"
          className="report-issue-btn report-issue-warning"
          onClick={onOpenChat}
        >
          <AlertCircle size={18} />
          <span>Ask Agent for Weather Delay Update</span>
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
