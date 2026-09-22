import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import "./Toast.css";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: CheckCircle,
    warning: AlertCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[toast.type] || CheckCircle;

  return (
    <div className={`toast-banner toast-${toast.type} animate-slide-down`}>
      <div className="toast-icon">
        <Icon size={18} />
      </div>
      <div className="toast-message">{toast.message}</div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={15} />
      </button>
    </div>
  );
}
