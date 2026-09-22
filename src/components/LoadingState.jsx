import "./LoadingState.css";

export default function LoadingState() {
  return (
    <div className="loading-container" role="status" aria-label="Loading order details">
      <span className="sr-only">Loading order details...</span>

      {/* Banner skeleton */}
      <div className="skeleton-banner">
        <div className="skeleton-row">
          <div className="skeleton skeleton-circle-lg" />
          <div className="skeleton-col" style={{ flex: 1 }}>
            <div className="skeleton skeleton-text-md" style={{ width: "60%" }} />
            <div className="skeleton skeleton-text-sm" style={{ width: "90%" }} />
          </div>
        </div>
      </div>

      {/* Timeline skeleton */}
      <div className="skeleton-card">
        <div className="skeleton skeleton-text-md" style={{ width: "45%", marginBottom: "16px" }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton-timeline-step">
            <div className="skeleton skeleton-circle" />
            <div className="skeleton-col" style={{ flex: 1 }}>
              <div className="skeleton skeleton-text-sm" style={{ width: `${70 - i * 5}%` }} />
              <div className="skeleton skeleton-text-xs" style={{ width: `${50 - i * 3}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary skeleton */}
      <div className="skeleton-card">
        <div className="skeleton skeleton-text-md" style={{ width: "40%", marginBottom: "12px" }} />
        {[1, 2].map((i) => (
          <div key={i} className="skeleton-item-row">
            <div className="skeleton skeleton-square" />
            <div className="skeleton-col" style={{ flex: 1 }}>
              <div className="skeleton skeleton-text-sm" style={{ width: "75%" }} />
              <div className="skeleton skeleton-text-xs" style={{ width: "45%" }} />
            </div>
            <div className="skeleton skeleton-text-sm" style={{ width: "50px" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
