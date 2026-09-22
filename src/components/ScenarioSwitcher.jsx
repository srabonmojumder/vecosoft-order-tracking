import { useRef, useState } from "react";
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
  const scrollRef = useRef(null);
  const isMouseDown = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const hasDragged = useRef(false);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    hasDragged.current = false;
    setIsGrabbing(true);
    dragStartX.current = e.pageX - scrollRef.current.offsetLeft;
    dragStartScroll.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    if (Math.abs(x - dragStartX.current) > 4) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = dragStartScroll.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isMouseDown.current = false;
    setIsGrabbing(false);
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0 && scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handlePillClick = (action) => {
    if (hasDragged.current) return; // Prevent triggering click after dragging
    action();
  };

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
        <div className="scenario-meta">Drag or scroll to select state:</div>
      </div>

      <div
        ref={scrollRef}
        className={`scenario-pill-list ${isGrabbing ? "grabbing" : ""}`}
        role="tablist"
        aria-label="Assessment scenarios"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onWheel={handleWheel}
      >
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isActive = currentId === sc.id && !isLoading && !isError;

          return (
            <button
              key={sc.id}
              role="tab"
              aria-selected={isActive}
              className={`scenario-pill scenario-pill-${sc.color} ${isActive ? "active" : ""}`}
              onClick={() => handlePillClick(() => onSelectScenario(sc.id))}
            >
              <Icon size={14} className="pill-icon" />
              <span className="pill-label">{sc.tag}</span>
            </button>
          );
        })}

        <button
          className={`scenario-pill scenario-pill-neutral ${isLoading ? "active" : ""}`}
          onClick={() => handlePillClick(onToggleLoading)}
          title="Preview Loading Skeleton State"
        >
          <Loader2 size={14} className={isLoading ? "spin-icon" : ""} />
          <span className="pill-label">Loading</span>
        </button>

        <button
          className={`scenario-pill scenario-pill-danger ${isError ? "active" : ""}`}
          onClick={() => handlePillClick(onToggleError)}
          title="Preview Error & Retry State"
        >
          <AlertOctagon size={14} />
          <span className="pill-label">Error</span>
        </button>
      </div>
    </div>
  );
}
