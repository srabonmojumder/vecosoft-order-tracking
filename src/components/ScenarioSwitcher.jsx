import { AlertTriangle, PackageX, Clock, Loader2, AlertOctagon } from "lucide-react";
import "./ScenarioSwitcher.css";

export default function ScenarioSwitcher({
  currentId,
  currentStatus,
  isLoading,
  isError,
  onSelectScenario,
  onToggleLoading,
  onToggleError,
}) {
  const scenarios = [
    {
      id: "order-delayed",
      label: "1. Delayed Order",
      tag: "Delayed",
      icon: AlertTriangle,
      color: "warning",
      desc: "ETA passed due to weather delay",
    },
    {
      id: "order-not-received",
      label: "2. Not Received",
      tag: "Missing",
      icon: PackageX,
      color: "error",
      desc: "Marked delivered, customer missing it",
    },
    {
      id: "order-no-tracking",
      label: "3. No Tracking",
      tag: "Pending",
      icon: Clock,
      color: "info",
      desc: "Order confirmed, pending tracking ID",
    },
  ];

  return (
    <div className="scenario-switcher-bar">
      <div className="scenario-header">
        <div className="scenario-title-badge">
          <span className="live-pulsing-dot" />
          <span>Interactive Assessment Mode</span>
        </div>
        <div className="scenario-meta">Select state to test:</div>
      </div>

      <div className="scenario-pill-list" role="tablist" aria-label="Assessment scenarios">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isActive = currentId === sc.id && !isLoading && !isError;

          return (
            <button
              key={sc.id}
              role="tab"
              aria-selected={isActive}
              className={`scenario-pill scenario-pill-${sc.color} ${isActive ? "active" : ""}`}
              onClick={() => onSelectScenario(sc.id)}
            >
              <Icon size={14} className="pill-icon" />
              <span className="pill-label">{sc.tag}</span>
            </button>
          );
        })}

        <button
          className={`scenario-pill scenario-pill-neutral ${isLoading ? "active" : ""}`}
          onClick={onToggleLoading}
          title="Preview Loading Skeleton State"
        >
          <Loader2 size={14} className={isLoading ? "spin-icon" : ""} />
          <span className="pill-label">Loading</span>
        </button>

        <button
          className={`scenario-pill scenario-pill-danger ${isError ? "active" : ""}`}
          onClick={onToggleError}
          title="Preview Error & Retry State"
        >
          <AlertOctagon size={14} />
          <span className="pill-label">Error</span>
        </button>
      </div>
    </div>
  );
}
